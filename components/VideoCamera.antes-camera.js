
import { useEffect, useRef, useState } from "react";

export default function VideoCamera({ onRecorded, onClose }) {
  const videoRef = useRef(null);
  const streamRef = useRef(null);
  const recorderRef = useRef(null);
  const chunksRef = useRef([]);
  const timerRef = useRef(null);
  const previewUrlRef = useRef("");

  const [facingMode, setFacingMode] = useState("user");
  const [recording, setRecording] = useState(false);
  const [previewUrl, setPreviewUrl] = useState("");
  const [recordedFile, setRecordedFile] = useState(null);
  const [seconds, setSeconds] = useState(0);
  const [error, setError] = useState("");

  const clearTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  const stopCamera = () => {
    clearTimer();

    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }

    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
  };

  const releasePreview = () => {
    if (previewUrlRef.current) {
      URL.revokeObjectURL(previewUrlRef.current);
      previewUrlRef.current = "";
    }
  };

  const startCamera = async (mode) => {
    setError("");
    stopCamera();

    try {
      if (!navigator.mediaDevices?.getUserMedia) {
        throw new Error("A câmera exige HTTPS e um navegador compatível.");
      }

      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: { ideal: mode },
          width: { ideal: 720 },
          height: { ideal: 1280 }
        },
        audio: true
      });

      streamRef.current = stream;

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
      }
    } catch (err) {
      stopCamera();
      setError(
        err.name === "NotAllowedError"
          ? "Permita o acesso à câmera e ao microfone."
          : err.message || "Não foi possível abrir a câmera."
      );
    }
  };

  useEffect(() => {
    startCamera("user");

    return () => {
      clearTimer();

      const recorder = recorderRef.current;
      if (recorder && recorder.state !== "inactive") {
        recorder.onstop = null;
        recorder.stop();
      }

      stopCamera();
      releasePreview();
    };
    // Abre a câmera ao montar e libera os recursos ao desmontar.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const switchCamera = async () => {
    if (recording) return;

    const nextMode = facingMode === "user" ? "environment" : "user";
    setFacingMode(nextMode);
    await startCamera(nextMode);
  };

  const startRecording = () => {
    const stream = streamRef.current;

    if (!stream) {
      setError("A câmera ainda não está pronta.");
      return;
    }

    if (!window.MediaRecorder) {
      setError("Este navegador não suporta gravação de vídeo.");
      return;
    }

    const mimeType = [
      "video/mp4",
      "video/webm;codecs=vp9,opus",
      "video/webm;codecs=vp8,opus",
      "video/webm"
    ].find((type) => MediaRecorder.isTypeSupported(type));

    try {
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
        clearTimer();
        setRecording(false);
        setError("Ocorreu um erro durante a gravação.");
      };

      recorder.onstop = () => {
        clearTimer();

        if (chunksRef.current.length === 0) {
          setRecording(false);
          setError("A gravação ficou vazia. Tente novamente.");
          return;
        }

        const type = recorder.mimeType || chunksRef.current[0].type;
        const extension = type.includes("mp4") ? "mp4" : "webm";
        const blob = new Blob(chunksRef.current, { type });

        if (!blob.size) {
          setRecording(false);
          setError("Não foi possível criar o arquivo de vídeo.");
          return;
        }

        const file = new File(
          [blob],
          `dengo-${Date.now()}.${extension}`,
          { type: blob.type }
        );

        releasePreview();

        const url = URL.createObjectURL(blob);
        previewUrlRef.current = url;

        setRecordedFile(file);
        setPreviewUrl(url);
        setRecording(false);
        stopCamera();
      };

      recorder.start(1000);
      setRecording(true);
      setSeconds(0);

      timerRef.current = setInterval(() => {
        setSeconds((value) => value + 1);
      }, 1000);
    } catch (err) {
      clearTimer();
      setRecording(false);
      setError(err.message || "Não foi possível iniciar a gravação.");
    }
  };

  const stopRecording = () => {
    const recorder = recorderRef.current;

    if (recorder && recorder.state !== "inactive") {
      recorder.stop();
    }
  };

  const retake = async () => {
    releasePreview();
    setPreviewUrl("");
    setRecordedFile(null);
    setSeconds(0);
    await startCamera(facingMode);
  };

  const useVideo = () => {
    if (!recordedFile) return;

    const file = recordedFile;

    // O CreateVideo passa a controlar o arquivo e o envio.
    stopCamera();
    releasePreview();
    setPreviewUrl("");
    setRecordedFile(null);
    onRecorded(file);
  };

  const closeCamera = () => {
    const recorder = recorderRef.current;

    if (recorder && recorder.state !== "inactive") {
      recorder.onstop = null;
      recorder.stop();
    }

    stopCamera();
    releasePreview();
    onClose?.();
  };

  const formatTime = (value) =>
    `${Math.floor(value / 60).toString().padStart(2, "0")}:${(
      value % 60
    ).toString().padStart(2, "0")}`;

  return (
    <div style={styles.overlay}>
      <div style={styles.cameraBox}>
        <div style={styles.topBar}>
          <button type="button" onClick={closeCamera} style={styles.button}>
            ✕
          </button>

          <strong>Dengo Plus</strong>

          {!previewUrl && (
            <button
              type="button"
              onClick={switchCamera}
              disabled={recording}
              style={styles.button}
              aria-label="Trocar câmera"
            >
              🔄
            </button>
          )}
        </div>

        {previewUrl ? (
          <video
            src={previewUrl}
            controls
            playsInline
            autoPlay
            style={styles.video}
          />
        ) : (
          <video
            ref={videoRef}
            autoPlay
            muted
            playsInline
            style={{
              ...styles.video,
              transform: facingMode === "user" ? "scaleX(-1)" : "none"
            }}
          />
        )}

        {recording && (
          <div style={styles.timer}>● {formatTime(seconds)}</div>
        )}

        {error && <p style={styles.error}>{error}</p>}

        <div style={styles.controls}>
          {previewUrl ? (
            <>
              <button type="button" onClick={retake} style={styles.secondary}>
                Gravar novamente
              </button>

              <button type="button" onClick={useVideo} style={styles.primary}>
                Usar este vídeo
              </button>
            </>
          ) : recording ? (
            <button type="button" onClick={stopRecording} style={styles.stop}>
              ■ Parar gravação
            </button>
          ) : (
            <button type="button" onClick={startRecording} style={styles.record}>
              ● Gravar
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

const styles = {
  overlay: {
    position: "fixed",
    inset: 0,
    zIndex: 9999,
    background: "#000",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  cameraBox: {
    position: "relative",
    width: "100%",
    maxWidth: 480,
    height: "100%",
    maxHeight: 900,
    background: "#000",
    color: "#fff",
    display: "flex",
    flexDirection: "column"
  },
  topBar: {
    height: 60,
    flexShrink: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "0 16px"
  },
  video: {
    width: "100%",
    flex: 1,
    minHeight: 0,
    objectFit: "contain",
    background: "#000"
  },
  button: {
    border: 0,
    color: "#fff",
    background: "transparent",
    fontSize: 24,
    padding: 8,
    cursor: "pointer"
  },
  timer: {
    position: "absolute",
    top: 70,
    alignSelf: "center",
    background: "#fe2c55",
    borderRadius: 20,
    padding: "6px 12px"
  },
  error: {
    color: "#ff8da3",
    textAlign: "center",
    padding: "0 16px"
  },
  controls: {
    minHeight: 100,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 12,
    padding: 16,
    flexWrap: "wrap"
  },
  record: {
    width: 150,
    height: 52,
    border: "4px solid #fff",
    borderRadius: 30,
    background: "#fe2c55",
    color: "#fff",
    fontSize: 17,
    fontWeight: "bold"
  },
  stop: {
    padding: "14px 24px",
    border: 0,
    borderRadius: 30,
    background: "#fe2c55",
    color: "#fff",
    fontSize: 16
  },
  primary: {
    padding: "14px 18px",
    border: 0,
    borderRadius: 24,
    background: "#fe2c55",
    color: "#fff",
    fontWeight: "bold"
  },
  secondary: {
    padding: "14px 18px",
    border: "1px solid #fff",
    borderRadius: 24,
    background: "#222",
    color: "#fff"
  }
};
