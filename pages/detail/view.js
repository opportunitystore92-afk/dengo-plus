import React, { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { ArrowLeft, Heart, MessageSquare, Send, Bookmark, Home, Users, Plus, User, X } from 'lucide-react';
import CreateVideo from '../../components/CreateVideo';

const WORKER_URL = 'https://dengo-upload-worker.dnctraderoperation.workers.dev';

function normalizePost(post) {
  return {
    ...post,
    id: String(post.id || Math.random()),
    username: post.username || 'usuario',
    caption: post.caption || 'Novo vídeo publicado no Dengo Plus!',
    videoUrl: post.videoUrl || post.video_url || post.mediaUrl || '',
    profileImage: post.profileImage || post.profile_image || post.avatar || '/default-avatar.png'
  };
}

function AuthModal({ onClose }) {
  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose}></div>
      <div className="relative z-10 w-full max-w-sm bg-[#18181b] border border-zinc-800 rounded-2xl p-6 text-center shadow-2xl">
        <button onClick={onClose} className="absolute top-4 right-4 text-zinc-400 hover:text-white"><X className="h-5 w-5" /></button>
        <div className="h-12 w-12 rounded-full bg-gradient-to-tr from-cyan-400 to-pink-500 mx-auto flex items-center justify-center mb-4 text-white font-bold text-xl">D</div>
        <h3 className="text-lg font-bold text-white mb-2">Cadastra-te no Dengo</h3>
        <p className="text-sm text-zinc-400 mb-6">Precisas de ter uma conta para curtir, comentar e interagir com os vídeos.</p>
        <button onClick={() => window.location.href = '/auth'} className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-400 to-pink-500 text-white font-semibold shadow-lg hover:opacity-90 transition">Fazer Cadastro / Login</button>
      </div>
    </div>
  );
}

export default function DetailPage() {
  const router = useRouter();
  const { id } = router.query;
  const [video, setVideo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const videoRef = useRef(null);

  useEffect(() => {
    if (!id) return;

    fetch(`${WORKER_URL}/posts`)
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          const posts = data.map(normalizePost);
          const found = posts.find(p => {
            const pId = String(p.id).trim();
            const urlName = String(p.videoUrl || '').split('/').pop().replace(/\.mp4$/i, '').trim();
            return pId === String(id).trim() || urlName === String(id).trim();
          });

          if (found) {
            setVideo(found);
          }
        }
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, [id]);

  const shareTitle = video ? `@${video.username} no Dengo Plus` : 'Dengo Plus - Vídeos Curtos';
  const shareDescription = video ? video.caption : 'Vê os vídeos mais divertidos no Dengo Plus.';
  const shareImage = video && video.profileImage && video.profileImage.startsWith('http') ? video.profileImage : 'https://main.dengo-plus.pages.dev/logo.png';
  const currentUrl = typeof window !== 'undefined' ? window.location.href : 'https://main.dengo-plus.pages.dev';

  if (loading) {
    return <div className="relative flex h-[100dvh] w-full items-center justify-center bg-black text-white text-sm">A carregar...</div>;
  }

  if (!video) {
    return <div className="relative flex h-[100dvh] w-full items-center justify-center bg-black text-white text-sm">Vídeo não encontrado.</div>;
  }

  const handleInteraction = (actionCallback) => {
    const user = localStorage.getItem('dengoo_user');
    if (!user) { setIsAuthModalOpen(true); return; }
    actionCallback();
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({ title: shareTitle, text: shareDescription, url: currentUrl }).catch(() => {});
    } else {
      navigator.clipboard.writeText(currentUrl);
      alert('Link copiado!');
    }
  };

  const handleNewVideo = async (newVideoData, videoFile) => {
    if (!videoFile || !videoFile.type.startsWith('video/')) throw new Error('O ficheiro de vídeo não é válido.');
    const newId = String(newVideoData.id || crypto.randomUUID());
    const key = `videos/${newId}.mp4`;
    const uploadResponse = await fetch(`${WORKER_URL}/${key}`, { method: 'PUT', headers: { 'Content-Type': videoFile.type || 'video/mp4' }, body: videoFile });
    const uploadResult = await uploadResponse.json().catch(() => ({}));
    if (!uploadResponse.ok || !uploadResult.success) throw new Error(uploadResult.error || 'Erro ao enviar vídeo.');
    const permanentVideoUrl = `${WORKER_URL}/${key}`;
    const post = { id: newId, username: newVideoData.username || 'meu_perfil', profileImage: newVideoData.profileImage || newVideoData.avatar || '/default-avatar.png', caption: newVideoData.caption || 'Novo vídeo!', videoUrl: permanentVideoUrl };
    await fetch(`${WORKER_URL}/posts`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(post) });
    setShowCreateModal(false);
    router.push('/');
  };

  return (
    <div className="relative flex h-[100dvh] w-full flex-col justify-between overflow-hidden bg-black">
      <Head>
        <title>{shareTitle}</title>
        <meta name="description" content={shareDescription} />
        <meta property="og:site_name" content="Dengo Plus" />
        <meta property="og:title" content={shareTitle} />
        <meta property="og:description" content={shareDescription} />
        <meta property="og:image" content={shareImage} />
        <meta property="og:image:width" content="800" />
        <meta property="og:image:height" content="800" />
        <meta property="og:type" content="video.other" />
        <meta property="og:url" content={currentUrl} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={shareTitle} />
        <meta name="twitter:description" content={shareDescription} />
        <meta name="twitter:image" content={shareImage} />
      </Head>

      <video
        ref={videoRef}
        src={video.videoUrl}
        className="absolute inset-0 h-full w-full object-cover bg-black"
        autoPlay
        playsInline
        webkit-playsinline="true"
        loop
        preload="metadata"
        onLoadedData={() => {
          if (videoRef.current) {
            videoRef.current.play().catch(() => {});
          }
        }}
        onClick={() => {
          if (videoRef.current) {
            if (videoRef.current.paused) videoRef.current.play();
            else videoRef.current.pause();
          }
        }}
      />

      <div className="absolute top-4 left-4 z-20">
        <button onClick={() => router.push('/')} className="flex h-10 w-10 items-center justify-center rounded-full bg-black/60 text-white backdrop-blur-md active:scale-90 transition">
          <ArrowLeft className="h-5 w-5" />
        </button>
      </div>

      <div className="absolute inset-x-0 bottom-14 z-10 bg-gradient-to-t from-black/90 via-black/40 to-transparent p-4 pb-12">
        <p className="font-semibold text-white">@{video.username}</p>
        <p className="text-sm text-zinc-300">{video.caption}</p>
      </div>

      <div className="absolute right-3 bottom-32 z-20 flex flex-col items-center gap-4">
        <button onClick={() => handleInteraction(() => setLiked(!liked))} className="flex flex-col items-center gap-1">
          <span className={`flex h-12 w-12 items-center justify-center rounded-full bg-zinc-900/80 ${liked ? 'text-red-500' : 'text-white'}`}>
            <Heart fill={liked ? 'currentColor' : 'none'} />
          </span>
          <span className="text-xs text-white">{(video.likes || 0) + (liked ? 1 : 0)}</span>
        </button>

        <button onClick={() => handleInteraction(() => alert('Comentários'))} className="flex flex-col items-center gap-1">
          <span className="flex h-12 w-12 items-center justify-center rounded-full bg-zinc-900/80 text-white">
            <MessageSquare />
          </span>
          <span className="text-xs text-white">{video.comments || 0}</span>
        </button>

        <button onClick={() => handleInteraction(() => setSaved(!saved))} className="flex flex-col items-center gap-1">
          <span className={`flex h-12 w-12 items-center justify-center rounded-full bg-zinc-900/80 ${saved ? 'text-yellow-400' : 'text-white'}`}>
            <Bookmark fill={saved ? 'currentColor' : 'none'} />
          </span>
          <span className="text-xs text-white">Salvar</span>
        </button>

        <button onClick={handleShare} className="flex flex-col items-center gap-1">
          <span className="flex h-12 w-12 items-center justify-center rounded-full bg-zinc-900/80 text-white">
            <Send />
          </span>
          <span className="text-xs text-white">Compartilhar</span>
        </button>
      </div>

      {showCreateModal && <CreateVideo onClose={() => setShowCreateModal(false)} onPublish={handleNewVideo} />}
      {isAuthModalOpen && <AuthModal onClose={() => setIsAuthModalOpen(false)} />}

      <nav className="fixed bottom-0 left-0 right-0 z-40 flex items-center justify-between border-t border-gray-800 bg-black/95 px-6 py-2 text-white h-14">
        <button type="button" onClick={() => router.push('/')} className="flex flex-col items-center gap-1 text-xs cursor-pointer"><Home className="h-6 w-6" /><span>Início</span></button>
        <button type="button" onClick={() => router.push('/following')} className="flex flex-col items-center gap-1 text-xs text-gray-400 hover:text-white cursor-pointer"><Users className="h-6 w-6" /><span>Amigos</span></button>
        <button type="button" onClick={() => handleInteraction(() => setShowCreateModal(true))} className="relative rounded-lg bg-gradient-to-r from-cyan-400 to-pink-500 p-[2px] focus:outline-none cursor-pointer"><div className="flex items-center justify-center rounded-md bg-white px-3 py-1 text-black"><Plus className="h-5 w-5 stroke-[3]" /></div></button>
        <button type="button" onClick={() => router.push('/explore')} className="flex flex-col items-center gap-1 text-xs text-gray-400 hover:text-white cursor-pointer"><MessageSquare className="h-6 w-6" /><span>Caixa</span></button>
        <button type="button" onClick={() => router.push('/profile')} className="flex flex-col items-center gap-1 text-xs text-gray-400 hover:text-white cursor-pointer"><User className="h-6 w-6" /><span>Perfil</span></button>
      </nav>
    </div>
  );
}