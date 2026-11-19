import { useEffect, useRef, useState } from 'react'

function getVideoMimeType(url = '') {
  const clean = String(url).split('?')[0].toLowerCase()
  if (clean.endsWith('.webm')) return 'video/webm'
  if (clean.endsWith('.mov')) return 'video/quicktime'
  if (clean.endsWith('.m4v')) return 'video/x-m4v'
  return 'video/mp4'
}

export default function Post({ post, isCreating }) {
  const videoRef = useRef(null)
  const containerRef = useRef(null)
  const [isVisible, setIsVisible] = useState(false)

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

  useEffect(() => {
    const v = videoRef.current
    if (!v) return

    if (isCreating || !isVisible) {
      v.pause()
      return
    }

    const startPlayback = () => {
      v.play().catch(() => {
        v.muted = true
        v.play().catch(() => {})
      })
    }

    if (v.readyState >= 2) {
      startPlayback()
    } else {
      v.addEventListener('canplay', startPlayback, { once: true })
      v.load()
      return () => {
        v.removeEventListener('canplay', startPlayback)
      }
    }
  }, [isCreating, isVisible])

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full bg-black snap-start flex items-center justify-center overflow-hidden"
    >
      <video
        ref={videoRef}
        poster={post.thumbnail_url || undefined}
        loop
        muted
        playsInline
        preload="metadata"
        className="w-full h-full object-cover"
      >
        <source src={post.video_url} type={getVideoMimeType(post.video_url)} />
      </video>

      {/* Sombra de baixo para o texto ler bem */}
      <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-black/80 via-black/30 to-transparent pointer-events-none" />

      {/* Texto por cima do vídeo */}
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