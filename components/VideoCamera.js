import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState
} from 'react';

const VideoCamera = forwardRef(function VideoCamera(
  { onRecorded, facingMode = 'user' },
  ref
) {
  const videoRef = useRef(null);
  const streamRef = useRef(null);
  const recorderRef = useRef(null);
  const chunksRef = useRef([]);
  const [error, setError] = useState('');

  // --- CORREÇÃO: função única para desligar de verdade, sem tocar na câmara ---
  const stopCameraTracks = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => {
        try { track.enabled = false; } catch {}
        try { track.stop(); } catch {}
      });
      streamRef.current = null;
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
  };

  useEffect(() => {
    let cancelled = false;
    let localStream = null;

    async function openCamera() {
      setError('');

      try {
        if (!navigator.mediaDevices?.getUserMedia) {
          throw new Error('A câmera exige HTTPS e um navegador compatível.');
        }

        const constraints = {
          video: { facingMode },
          audio: true
        };

        const stream = await navigator.mediaDevices.getUserMedia(constraints);

        if (cancelled) {
          stream.getTracks().forEach((track) => track.stop());
          return;
        }

        localStream = stream;
        streamRef.current = stream;

        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.muted = true;
          await videoRef.current.play().catch(() => {});
        }
      } catch (err) {
        if (!cancelled) {
          setError(
            err.name === 'NotAllowedError'
              ? 'Permita o acesso à câmera e ao microfone.'
              : err.message || 'Não foi possível abrir a câmera.'
          );
        }
      }
    }

    openCamera();

    return () => {
      cancelled = true;
      if (localStream) {
        localStream.getTracks().forEach((track) => track.stop());
      }
      if (streamRef.current === localStream) {
        streamRef.current = null;
      }
      if (videoRef.current) {
        videoRef.current.srcObject = null;
      }
    };
  }, [facingMode]);

  useImperativeHandle(
    ref,
    () => ({
      startRecording() {
        const stream = streamRef.current;
        if (!stream) {
          setError('A câmera ainda não está pronta.');
          return false;
        }

        if (!window.MediaRecorder) {
          setError('Este navegador não suporta gravação de vídeo.');
          return false;
        }

        if (recorderRef.current?.state === 'recording') {
          return false;
        }

        try {
          const mimeType = [
            'video/webm;codecs=vp9,opus',
            'video/webm;codecs=vp8,opus',
            'video/webm',
            'video/mp4'
          ].find((type) => MediaRecorder.isTypeSupported(type));

          chunksRef.current = [];
          const recorder = new MediaRecorder(
            stream,
            mimeType ? { mimeType } : undefined
          );

          recorderRef.current = recorder;

          recorder.ondataavailable = (event) => {
            if (event.data?.size > 0) {
              chunksRef.current.push(event.data);
            }
          };

          recorder.onerror = () => {
            setError('Ocorreu um erro durante a gravação.');
          };

          recorder.onstop = () => {
            const chunks = chunksRef.current;
            chunksRef.current = [];

            if (!chunks.length) {
              setError('A gravação ficou vazia. Tente novamente.');
              return;
            }

            const type = recorder.mimeType || chunks[0].type || 'video/webm';
            const extension = type.includes('mp4') ? 'mp4' : 'webm';
            const blob = new Blob(chunks, { type });

            if (!blob.size) {
              setError('Não foi possível criar o arquivo de vídeo.');
              return;
            }

            const file = new File(
              [blob],
              `dengo-${Date.now()}.${extension}`,
              { type: blob.type }
            );

            // --- CORREÇÃO PRINCIPAL: desliga o microfone ANTES de mostrar o preview ---
            // Antes ele ficava aberto e ecoava por cima do preview.
            // Agora paramos aqui, o onRecorded mostra o preview limpo, sem eco.
            stopCameraTracks();

            onRecorded?.(file);
          };

          recorder.start();
          setError('');
          return true;
        } catch (err) {
          setError(err.message || 'Não foi possível iniciar a gravação.');
          return false;
        }
      },

      stopRecording() {
        const recorder = recorderRef.current;
        if (recorder && recorder.state !== 'inactive') {
          recorder.stop();
          return true;
        }
        return false;
      },

      // --- CORREÇÃO 2: Novo método para o pai desligar / religar sem danificar ---
      // Usa no CreateVideo quando for para o preview: cameraRef.current?.stopCamera()
      stopCamera() {
        stopCameraTracks();
      },

      // Se o user voltar do preview para a câmara, chama isto para reabrir
      async startCamera() {
        // Se já está aberta, não faz nada
        if (streamRef.current) return true;
        try {
          const stream = await navigator.mediaDevices.getUserMedia({
            video: { facingMode },
            audio: true
          });
          streamRef.current = stream;
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
            videoRef.current.muted = true;
            await videoRef.current.play().catch(() => {});
          }
          return true;
        } catch (err) {
          setError('Permita o acesso à câmera e ao microfone.');
          return false;
        }
      }
    }),
    [onRecorded, facingMode]
  );

  return (
    <div className="absolute inset-0 h-full w-full overflow-hidden touch-none bg-black flex items-center justify-center">
      <video
        ref={videoRef}
        autoPlay
        muted
        playsInline
        className="h-full w-full object-cover"
        style={{
  transform: 'none'
}}
      />

      {error && (
        <div
          role="alert"
          className="absolute bottom-32 left-4 right-4 z-20 rounded-xl bg-black/80 p-3 text-center text-sm text-white"
        >
          {error}
        </div>
      )}
    </div>
  );
});

export default VideoCamera;