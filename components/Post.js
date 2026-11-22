import { useEffect, useRef, useState } from 'react'

function getVideoMimeType(url = '') {
  const clean = String(url).split('?')[0].toLowerCase()
  if (clean.endsWith('.webm')) return 'video/webm'
  if (clean.endsWith('.mov')) return 'video/quicktime'
  if (clean.endsWith('.m4v')) return 'video/x-m4v'
  return 'video/mp4'
}

let somDestravadoGlobal = false

export default function Post({ post, isCreating }) {
  const videoRef = useRef(null)
  const containerRef = useRef(null)
  const [isVisible, setIsVisible] = useState(false)
  const [isMuted, setIsMuted] = useState(!somDestravadoGlobal)

  // Destrava o som no primeiro toque - vale pra todos
  useEffect(() => {
    const destravarSom = () => {
      somDestravadoGlobal = true
      setIsMuted(false)
      window.dispatchEvent(new Event('dengo-som-ligado'))
    }
    const ouvirDestrave = () => setIsMuted(false)

    window.addEventListener('touchstart', destravarSom, { once: true })
    window.addEventListener('click', destravarSom, { once: true })
    window.addEventListener('dengo-som-ligado', ouvirDestrave)
    return () => {
      window.removeEventListener('touchstart', destravarSom)
      window.removeEventListener('click', destravarSom)
      window.removeEventListener('dengo-som-ligado', ouvirDestrave)
    }
  }, [])

  // Vê se esse vídeo tá na tela
  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting && entry.intersectionRatio >= 0.6)
      },
      { threshold: [0.6] }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  // Só toca o que tá visível, pausa o resto NA HORA
  useEffect(() => {
    const v = videoRef.current
    if (!v) return

    const pausarOutros = () => {
      if (!isVisible) {
        v.pause()
      }
    }
    // Quando outro vídeo começa, esse pausa
    window.addEventListener('dengo-video-tocando', pausarOutros)

    if (isCreating || !isVisible) {
      v.pause()
      return () => window.removeEventListener('dengo-video-tocando', pausarOutros)
    }

    v.muted = isMuted
    // Avisa os outros pra calarem
    window.dispatchEvent(new Event('dengo-video-tocando'))
    v.play().catch(() => {
      v.muted = true
      v.play().catch(() => {})
    })

    return () => window.removeEventListener('dengo-video-tocando', pausarOutros)
  }, [isCreating, isVisible, isMuted])

  // Quando sai da tela, garante que parou
  useEffect(() => {
    return () => {
      if (videoRef.current) videoRef.current.pause()
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full bg-black snap-start flex items-center justify-center overflow-hidden"
    >
      <video
        ref={videoRef}
        poster={post.thumbnail_url || undefined}
        loop
        muted={isMuted}
        playsInline
        preload="metadata"
        className="w-full h-full object-cover"
      >
        <source src={post.video_url} type={getVideoMimeType(post.video_url)} />
      </video>

      <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-black/80 via-black/30 to-transparent pointer-events-none" />

      <div className="absolute bottom-6 left-4 right-16 text-white text-sm z-10">
        <p className="font-bold text-[16px] drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">@{post.username || 'utilizador'}</p>
        <p className="mt-1 leading-snug drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">{post.caption}</p>
        {post.sound_name && (
          <p className="mt-2 text-[13px] opacity-90 drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">♪ {post.sound_name}</p>
        )}
      </div>
    </div>
  )
}