import { useState, useRef, useEffect } from 'react'
import { useRouter } from 'next/router'
import { IoClose, IoCameraReverseOutline, IoImageOutline } from 'react-icons/io5'

const WORKER_URL = 'https://dengo-upload-worker.dnctraderoperation.workers.dev'

export default function CreateVideo({ onClose, onPublish }) {
  const [videoFile, setVideoFile] = useState(null)
  const [videoUrl, setVideoUrl] = useState('')
  const [caption, setCaption] = useState('')
  const [isRecording, setIsRecording] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [facingMode, setFacingMode] = useState('user')
  const [username, setUsername] = useState('usuario')
  const [coverFile, setCoverFile] = useState(null);
  const videoRef = useRef(null)
  const previewVideoRef = useRef(null)
  const mediaRecorderRef = useRef(null)
  const chunksRef = useRef([])
  const router = useRouter()

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setUsername(localStorage.getItem('dengoo_username') || 'usuario')
    }
  }, [])

  useEffect(() => {
    document.querySelectorAll('video').forEach(v => {
      if (v !== previewVideoRef.current) {
        v.pause()
        v.muted = true
      }
    })
    return () => {
      if (videoUrl) URL.revokeObjectURL(videoUrl)
      if (previewVideoRef.current) previewVideoRef.current.pause()
    }
  }, [])

  const stopCameraTracks = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject
      stream.getTracks().forEach(track => {
        track.enabled = false
        track.stop()
      })
      videoRef.current.srcObject = null
    }
  }

  const revokeOldUrl = (url) => {
    if (url && url.startsWith('blob:')) {
      URL.revokeObjectURL(url)
    }
  }

  // --- CORREÇÃO SOM DO FEED ---
  useEffect(() => {
    const silenceFeed = () => {
      document.querySelectorAll('video').forEach((v) => {
        if (v !== videoRef.current && v !== previewVideoRef.current) {
          v.pause()
          v.muted = true
        }
      })
      document.querySelectorAll('audio').forEach((a) => a.pause())
    }
    silenceFeed()
    const interval = setInterval(silenceFeed, 500)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    let isMounted = true
    if (videoUrl) return
    const initCamera = async () => {
      await new Promise(resolve => setTimeout(resolve, 300))
      if (!isMounted) return
      if (videoUrl) return
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: facingMode },
          audio: true
        })
        if (isMounted && videoRef.current) {
          videoRef.current.srcObject = stream
          await videoRef.current.play().catch(() => {})
        } else {
          stream.getTracks().forEach(track => track.stop())
        }
      } catch (err) {
        console.error("Erro ao abrir câmara:", err)
      }
    }
    initCamera()
    return () => {
      isMounted = false
      if (videoRef.current && videoRef.current.srcObject) {
        const stream = videoRef.current.srcObject
        stream.getTracks().forEach(track => track.stop())
        videoRef.current.srcObject = null
      }
    }
  }, [facingMode, videoUrl])

  useEffect(() => {
    if (!videoUrl) return
    const v = previewVideoRef.current
    if (!v) return
    v.muted = true
    v.loop = true
    v.play().catch(() => {})
  }, [videoUrl])

  useEffect(() => {
    return () => {
      if (videoUrl && videoUrl.startsWith('blob:')) URL.revokeObjectURL(videoUrl)
    }
  }, [videoUrl])

  const toggleRecording = () => {
    if (isRecording) {
      if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
        mediaRecorderRef.current.stop()
      }
      setIsRecording(false)
    } else {
      chunksRef.current = []
      const stream = videoRef.current?.srcObject
      if (!stream) return
      const mimeType = MediaRecorder.isTypeSupported('video/webm;codecs=vp8,opus') 
        ? 'video/webm;codecs=vp8,opus' 
        : 'video/webm'
      try {
        mediaRecorderRef.current = new MediaRecorder(stream, { mimeType })
      } catch {
        mediaRecorderRef.current = new MediaRecorder(stream)
      }
      mediaRecorderRef.current.ondataavailable = (e) => {
        if (e.data && e.data.size > 0) chunksRef.current.push(e.data)
      }
      mediaRecorderRef.current.onstop = () => {
        stopCameraTracks()
        const blob = new Blob(chunksRef.current, { type: 'video/webm' })
        const file = new File([blob], 'recording.webm', { type: 'video/webm' })
        setVideoFile(file)
        setVideoUrl((prev) => {
          revokeOldUrl(prev)
          return URL.createObjectURL(blob)
        })
      }
      mediaRecorderRef.current.start()
      setIsRecording(true)
    }
  }

  const switchCamera = () => {
    setFacingMode(prev => (prev === 'user' ? 'environment' : 'user'))
  }

  const gerarCapaDoVideo = (arquivoVideo) => {
  return new Promise((resolve) => {
    const video = document.createElement('video');
    video.preload = 'metadata';
    video.muted = true;
    video.playsInline = true;
    video.src = URL.createObjectURL(arquivoVideo);
    video.onloadeddata = () => { video.currentTime = 1; };
    video.onseeked = () => {
      const canvas = document.createElement('canvas');
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      canvas.getContext('2d').drawImage(video, 0, 0);
      URL.revokeObjectURL(video.src);
      canvas.toBlob((blob) => resolve(blob), 'image/jpeg', 0.8);
    };
  });
};

const handleFileSelect = async (e) => {
  const file = e.target.files[0]
  if (file) {
    stopCameraTracks()
    setVideoFile(file)
    setVideoUrl((prev) => {
      revokeOldUrl(prev)
      return URL.createObjectURL(file)
    })
    // NOVO: tira a capa sozinha e guarda
    try {
      const capa = await gerarCapaDoVideo(file);
      setCoverFile(capa);
    } catch (err) {}
  }
}

  const handleClosePreview = () => {
    if (previewVideoRef.current) {
      previewVideoRef.current.pause()
      previewVideoRef.current.src = ''
    }
    setVideoUrl((prev) => {
      revokeOldUrl(prev)
      return ''
    })
    setVideoFile(null)
  }

  // ===== AQUI ESTÁ O MOTOR BOM DO ATUAL - SÓ A MINIATURA =====
  const generateThumbnail = (videoFile) => {
    return new Promise((resolve) => {
      const video = document.createElement('video');
      video.src = URL.createObjectURL(videoFile);
      video.muted = true;
      video.playsInline = true;
      video.preload = 'auto';
video.onloadedmetadata = () => { try { video.currentTime = 0.5; } catch(e) {} };
      let resolved = false;
      const timer = setTimeout(() => {
        if (!resolved) {
          resolved = true;
          resolve(null);
        }
      }, 2000);
      video.onseeked = () => {
        if (resolved) return;
        resolved = true;
        clearTimeout(timer);
        try {
          const canvas = document.createElement('canvas');
          canvas.width = video.videoWidth || 720;
          canvas.height = video.videoHeight || 1280;
          const ctx = canvas.getContext('2d');
          ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
          canvas.toBlob((blob) => {
            resolve(blob);
          }, 'image/jpeg', 0.85);
        } catch (err) {
          resolve(null);
        }
      };
      video.onerror = () => {
        if (!resolved) {
          resolved = true;
          clearTimeout(timer);
          resolve(null);
        }
      };
    });
  };

  // ===== UPLOAD NOVO COM MINIATURA - substitui o antigo =====
  const handleUpload = async () => {
    if (!videoFile) return
    if (previewVideoRef.current) {
      previewVideoRef.current.pause()
    }
    try {
      setUploading(true)
      setUploadProgress(0)
      const newId = String(Date.now() + '-' + Math.floor(Math.random() * 1000000))

      // 1. Gera miniatura
      const thumbBlob = await generateThumbnail(videoFile)
      if (thumbBlob) {
        await fetch(`${WORKER_URL}/thumbnails/${newId}.jpg`, {
          method: 'PUT',
          headers: { 'Content-Type': 'image/jpeg' },
          body: thumbBlob
        }).catch(() => {})
      }

      // 2. Envia vídeo
      const videoKey = `videos/${newId}.mp4`
      const uploadResponse = await fetch(`${WORKER_URL}/${videoKey}`, {
        method: 'PUT',
        headers: { 'Content-Type': videoFile.type || 'video/mp4' },
        body: videoFile
      })
      const uploadResult = await uploadResponse.json().catch(() => ({}))
      if (!uploadResponse.ok || !uploadResult.success) {
        throw new Error(uploadResult.error || 'Erro ao enviar o vídeo.')
      }

      const permanentVideoUrl = `${WORKER_URL}/${videoKey}`
      const permanentThumbnailUrl = thumbBlob ? `${WORKER_URL}/thumbnails/${newId}.jpg` : 'https://dengo-plus.pages.dev/logo.png'
      const avatar = typeof window !== 'undefined' ? localStorage.getItem('dengoo_avatar') : '/default-avatar.png'

      const postData = {
        id: newId,
        username: username,
        caption: caption || 'Novo vídeo no Dengo Plus!',
        videoUrl: permanentVideoUrl,
        thumbnailUrl: permanentThumbnailUrl,
        profileImage: avatar || '/default-avatar.png'
      }

      await fetch(`${WORKER_URL}/posts`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(postData)
      })

     setUploading(false)
if (onPublish) { onPublish(postData, videoFile) }
if (onClose) { onClose() }
setVideoFile(null)
setVideoUrl(null)
setCaption('')
    } catch (err) {
      console.error(err)
      alert('Erro: ' + err.message)
      setUploading(false)
    }
  }

  return (
    <div className="fixed inset-0 z-[99999] bg-black text-white flex flex-col justify-between overflow-hidden">
      {!videoUrl ? (
        <div className="relative w-full h-full flex flex-col justify-between bg-black">
          <video 
            ref={videoRef} 
            autoPlay 
            playsInline 
            muted 
            disablePictureInPicture
            style={{ transform: facingMode === 'user' ? 'scaleX(-1)' : 'none' }}
            className="absolute inset-0 w-full h-full object-cover z-0" 
          />
          <div className="relative z-30 flex justify-between items-center p-4 bg-gradient-to-b from-black/80 to-transparent">
            <button onClick={onClose} className="p-2 text-white"><IoClose size={32} /></button>
            <span className="font-bold text-lg">Criar Vídeo</span>
            <button onClick={switchCamera} className="p-2 text-white flex flex-col items-center">
              <IoCameraReverseOutline size={30} />
            </button>
          </div>
          <div className="relative z-30 pb-12 pt-6 px-8 flex items-center justify-between w-full bg-gradient-to-t from-black/90 via-black/40 to-transparent">
            <label className="flex flex-col items-center justify-center cursor-pointer p-2">
              <div className="w-12 h-12 rounded-full bg-zinc-800/80 flex items-center justify-center border border-zinc-600">
                <IoImageOutline size={24} />
              </div>
              <span className="text-xs mt-1 font-medium">Galeria</span>
              <input type="file" accept="video/*" className="hidden" onChange={handleFileSelect} />
            </label>
            <button 
              onClick={toggleRecording} 
              className="w-20 h-20 rounded-full border-4 border-white flex items-center justify-center p-1 bg-transparent active:scale-95 transition-transform"
            >
              <div className={`w-full h-full rounded-full transition-all ${isRecording ? 'bg-red-600 scale-50 rounded-lg' : 'bg-red-600'}`} />
            </button>
            <div className="w-12" />
          </div>
        </div>
      ) : (
        <div className="relative w-full h-full flex flex-col bg-black z-30">
          <video
            key={videoUrl}
            ref={previewVideoRef}
            src={videoUrl}
            playsInline
            preload="auto"
            autoPlay
            muted
            loop
            style={{ transform: 'none' }}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-4 left-4 z-40">
            <button onClick={handleClosePreview} className="bg-black/60 p-2.5 rounded-full text-white">
              <IoClose size={26} />
            </button>
          </div>
          <div className="absolute bottom-0 left-0 right-0 p-4 pb-8 bg-gradient-to-t from-black via-black/80 to-transparent flex flex-col gap-3 z-40">
            <input 
              type="text" 
              placeholder="Adicionar legenda..." 
              value={caption} 
              onChange={(e) => setCaption(e.target.value)} 
              className="w-full p-3.5 bg-zinc-900/90 border border-zinc-700 rounded-xl text-white outline-none text-base"
            />
            <button 
              onClick={handleUpload} 
              disabled={uploading} 
              className="w-full bg-red-600 text-white py-3.5 rounded-xl font-bold text-lg shadow-lg active:opacity-90 relative overflow-hidden"
            >
              {uploading ? (
  <span className="flex items-center justify-center gap-2">
    <span className="w-5 h-5 border-2 border-white/40 border-t-white rounded-full animate-spin"></span>
    Publicando...
  </span>
) : 'Publicar'}
            </button>
          </div>
        </div>
      )}
    </div>
  )
}