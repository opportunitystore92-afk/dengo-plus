import { useEffect, useRef } from 'react'

export default function Post({ post, isCreating }) {
  const videoRef = useRef(null)

  useEffect(() => {
  const v = videoRef.current
  if (!v) return
  v.muted = true
  if (isCreating) {
    v.pause()
  } else {
    v.play().catch(() => {})
  }
}, [isCreating])

  return (
    <div className="relative w-full h-full bg-black snap-start flex items-center justify-center overflow-hidden">
    <video
  ref={videoRef}
  src={post.video_url}
  autoPlay
  loop
  muted
  playsInline
  preload="auto"
  className="w-full h-full object-cover"
  onCanPlay={(e) => e.currentTarget.play().catch(() => {})}
/>

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