import React, { useEffect, useRef, useState } from 'react';
import { Plus, Home, Users, MessageSquare, User, X, Search, Repeat, Link2, Flag, HeartCrack, PlusCircle, Heart, Send, Bookmark } from 'lucide-react';
import CreateVideo from '../components/CreateVideo';

const WORKER_URL = 'https://dengo-upload-worker.dnctraderoperation.workers.dev';

function normalizePost(post) {
  return {
    ...post,
    id: String(post.id || Math.random()),
    username: post.username && post.username !== 'usuario' ? post.username : 'Dengo Oficial',
    caption: post.caption || 'Novo vídeo publicado!',
    videoUrl: post.videoUrl || post.video_url || post.mediaUrl || '',
    avatar: post.avatar || post.profileImage || post.profile_image || '/default-avatar.png',
    profileImage: post.profileImage || post.profile_image || post.avatar || '/default-avatar.png'
  };
}

function getVideoExtension(file) {
  const extensions = { 'video/mp4': 'mp4', 'video/webm': 'webm', 'video/quicktime': 'mov', 'video/ogg': 'ogv', 'video/x-m4v': 'm4v' };
  return extensions[file.type] || 'mp4';
}

function AuthModal({ onClose }) {
  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose}></div>
      <div className="relative z-10 w-full max-w-sm bg-[#18181b] border border-zinc-800 rounded-2xl p-6 text-center shadow-2xl">
        <button onClick={onClose} className="absolute top-4 right-4 text-zinc-400 hover:text-white">X</button>
        <div className="h-12 w-12 rounded-full bg-white mx-auto flex items-center justify-center mb-4 text-black font-bold text-xl">D</div>
        <h3 className="text-lg font-bold text-white mb-2">Cadastra-te no Dengo</h3>
        <p className="text-sm text-zinc-400 mb-6">Precisas de ter uma conta para curtir, comentar e interagir com os vídeos.</p>
        <button onClick={() => window.location.href = '/auth'} className="w-full py-3 rounded-xl bg-white text-black font-semibold shadow-lg hover:opacity-90 transition">Fazer Cadastro / Login</button>
      </div>
    </div>
  );
}

function ShareSheet({ video, onClose, onRequireAuth }) {
  const [copied, setCopied] = useState(false);
  
  const rawVideo = video || {};
  let videoId = rawVideo.id || rawVideo._id || '';
  if (!videoId && rawVideo.videoUrl) {
    videoId = String(rawVideo.videoUrl).split('/').pop().replace(/\.mp4$/i, '').trim();
  }
  const detailUrl = `https://dengo-plus.pages.dev/detail/${videoId}`;

  const handleCopyLink = async () => {
    try { 
      await navigator.clipboard.writeText(detailUrl); 
      setCopied(true); 
      setTimeout(() => setCopied(false), 2000); 
    } catch { 
      alert('Link: ' + detailUrl); 
    }
  };

  const shareWhatsApp = () => { 
    window.open(`https://wa.me/?text=${encodeURIComponent(`Olha esse vídeo no Dengo: ${detailUrl}`)}`, '_blank'); 
  };
  
  const shareFacebook = () => { 
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(detailUrl)}`, '_blank'); 
  };

  return (
    <div className="fixed inset-0 z-[100] flex flex-col justify-end">
      <div className="absolute inset-0 bg-black/60" onClick={onClose}></div>
      <div className="relative z-10 w-full bg-[#121212] rounded-t-[18px] max-h-[85vh] overflow-y-auto">
        <div className="sticky top-0 bg-[#121212] flex items-center justify-between px-4 py-4 border-b border-zinc-800">
          <Search className="h-6 w-6 text-white" />
          <h2 className="font-bold text-white text-[18px]">Enviar para</h2>
          <button onClick={onClose}><X className="h-6 w-6 text-white" /></button>
        </div>
        <div className="flex gap-5 overflow-x-auto no-scrollbar px-4 py-5">
          <button onClick={handleCopyLink} className="flex flex-col items-center min-w-[70px]">
            <div className="h-[56px] w-[56px] rounded-full bg-[#2B7AFF] flex items-center justify-center">
              <Link2 className="h-7 w-7 text-white" />
            </div>
            <span className="text-[11px] text-white mt-2">{copied ? 'Copiado!' : 'Copiar Link'}</span>
          </button>
          <button onClick={shareWhatsApp} className="flex flex-col items-center min-w-[70px]">
            <div className="h-[56px] w-[56px] rounded-full bg-[#25D366] flex items-center justify-center">
              <MessageSquare className="h-7 w-7 text-white" />
            </div>
            <span className="text-[11px] text-white mt-2">WhatsApp</span>
          </button>
          <button onClick={shareFacebook} className="flex flex-col items-center min-w-[70px]">
            <div className="h-[56px] w-[56px] rounded-full bg-[#1877F2] flex items-center justify-center text-white font-bold text-[28px]">f</div>
            <span className="text-[11px] text-white mt-2">Facebook</span>
          </button>
        </div>
      </div>
    </div>
  );
}

function CommentSheet({ video, onClose, onRequireAuth }) {
  const [comment, setComment] = useState('');
  const [showEmojis, setShowEmojis] = useState(false);
  const emojis = ["😂","❤️","😍","😭","🥺","😊","🙏","👏","🔥","🤣","😅","😮","🥰","😎","💀","🤔","👍","🎉","✨","💯","🙌","😁","😆","🥲","🫶","❤️‍🔥","😳","🤩","😋","🤤"];
  const [comments, setComments] = useState([
    { id: 1, user: 'aparecida_franca', text: 'Muito bom! 👏👏', likes: 12, time: '2h', avatar: 'https://i.pravatar.cc/100?u=aparecida' },
    { id: 2, user: 'gaucho_esquerda', text: 'Fato em 1 min sempre traz a verdade', likes: 45, time: '1h', avatar: 'https://i.pravatar.cc/100?u=gaucho' },
    { id: 3, user: 'laides_alves', text: 'Compartilhei no grupo da família', likes: 8, time: '30m', avatar: 'https://i.pravatar.cc/100?u=laides' },
  ]);

  const handleSend = () => {
    const user = localStorage.getItem('dengoo_user');
    if (!user) { onRequireAuth(); return; }
    if (!comment.trim()) return;
    setComments([{ id: Date.now(), user: 'meu_perfil', text: comment, likes: 0, time: 'agora', avatar: '/default-avatar.png' }, ...comments]);
    setComment(''); setShowEmojis(false);
  };

  return (
    <div className="fixed inset-0 z-[100] flex flex-col justify-end">
      <div className="absolute inset-0 bg-black/60" onClick={onClose}></div>
      <div className="relative z-10 w-full bg-[#121212] rounded-t-[18px] h-[75vh] flex flex-col">
        <div className="flex items-center justify-between px-4 py-4 border-b border-zinc-800">
          <div className="w-6"></div><h2 className="font-bold text-white text-[16px]">601 comentários</h2><button onClick={onClose}><X className="h-5 w-5 text-white" /></button>
        </div>
        <div className="flex-1 overflow-y-auto px-4 py-3 space-y-4 no-scrollbar">
          {comments.map((c) => (
            <div key={c.id} className="flex gap-3">
              <img src={c.avatar} className="h-8 w-8 rounded-full mt-1" />
              <div className="flex-1">
                <div className="flex items-center gap-2"><span className="text-[13px] font-bold text-zinc-400">@{c.user}</span><span className="text-[11px] text-zinc-500">{c.time}</span></div>
                <p className="text-[14px] text-white mt-1">{c.text}</p>
                <div className="flex gap-4 mt-2"><span className="text-[12px] text-zinc-500">Responder</span><span className="text-[12px] text-zinc-500">Ver tradução</span></div>
              </div>
              <div className="flex flex-col items-center gap-1">
                <button onClick={() => { const user = localStorage.getItem('dengoo_user'); if (!user) { onRequireAuth(); } }}><Heart className="h-5 w-5 text-zinc-500 hover:text-red-500" /></button>
                <span className="text-[11px] text-zinc-500">{c.likes}</span>
              </div>
            </div>
          ))}
        </div>
        <div className="border-t border-zinc-800 bg-[#121212]">
          {showEmojis && (
            <div className="grid grid-cols-7 gap-1 p-3 max-h-[160px] overflow-y-auto no-scrollbar bg-[#1A1A1A]">
              {emojis.map((e,i)=>(<button key={i} onClick={()=>setComment(prev=>prev+e)} className="text-[26px] p-2 hover:bg-zinc-700 rounded-lg active:scale-125 transition">{e}</button>))}
            </div>
          )}
          <div className="p-3 flex items-center gap-2">
            <button onClick={()=>setShowEmojis(!showEmojis)} className="h-9 w-9 flex items-center justify-center rounded-full bg-[#2A2A2A] text-[20px]">{showEmojis ? '⌨️' : '😊'}</button>
            <input value={comment} onChange={(e)=>setComment(e.target.value)} placeholder="Adicionar comentário..." className="flex-1 bg-[#2A2A2A] rounded-full px-4 py-2.5 text-[14px] text-white placeholder-zinc-500 outline-none" onFocus={()=>setShowEmojis(false)} />
            <button onClick={handleSend} className="bg-white rounded-full p-2.5 active:scale-90 transition"><Send className="h-4 w-4 text-black" /></button>
          </div>
        </div>
      </div>
    </div>
  );
}

function FeedVideoItem({ video, onShare, onComment, onRequireAuth, isActive}) {
    const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const formatTime = (t) => { if (!t || isNaN(t)) return "0:00"; const m = Math.floor(t / 60); const s = Math.floor(t % 60); return `${m}:${s.toString().padStart(2, "0")}`; };
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  const [muted, setMuted] = useState(false);
  const videoRef = useRef(null);

  useEffect(() => {
    if (!videoRef.current) return;
    if (isActive) {
      setMuted(false);
      videoRef.current.play().catch(() => {});
    } else {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  }, [isActive]);

  return (
    <div className="relative flex h-[100dvh] w-full shrink-0 flex-col justify-between overflow-hidden bg-black snap-start md:max-w-[420px] md:mx-auto md:my-4 md:h-[calc(100dvh-32px)] md:rounded-2xl md:border md:border-zinc-800">
      <video 
        ref={videoRef} 
        src={video.videoUrl} 
        muted={muted}
                onTimeUpdate={() => setCurrentTime(videoRef.current?.currentTime || 0)}
        onLoadedMetadata={() => setDuration(videoRef.current?.duration || 0)} 
        preload="metadata" 
        playsInline 
        loop 
        onClick={() => { if (videoRef.current.paused) videoRef.current.play(); else videoRef.current.pause(); }} 
        className="absolute inset-0 h-full w-full object-cover bg-black" 
      />
            {/* Barra de progresso */}
      <div className="absolute inset-x-0 bottom-0 z-30 px-3 pb-[85px] pointer-events-none">
        <div className="flex items-center gap-2">
          <div className="flex-1 h-[4px] bg-white/30 rounded-full overflow-hidden">
            <div className="h-full bg-red-600 transition-all" style={{ width: `${duration ? (currentTime / duration) * 100 : 0}%` }} />
          </div>
          <span className="text-[11px] font-medium text-white drop-shadow">{formatTime(currentTime)} / {formatTime(duration)}</span>
        </div>
      </div>
   
           <div className="absolute inset-x-0 bottom-0 z-10 bg-gradient-to-t from-black/90 via-black/40 to-transparent p-4 pb-24 text-white">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-full bg-red-600 flex items-center justify-center font-bold text-white overflow-hidden">
{video.avatar ? <img src={video.avatar} alt="" className="w-full h-full object-cover" /> : "D"}
</div>
          <p className="font-semibold">@{video.username}</p>
        </div>
        <p className="text-sm text-zinc-300 mt-1">{video.caption}</p>
      </div>
      <div className="absolute right-3 bottom-24 z-20 flex flex-col items-center gap-4">
        <button onClick={() => setLiked(!liked)} className="flex flex-col items-center gap-1">
          <span className={`flex h-12 w-12 items-center justify-center rounded-full bg-zinc-900/80 ${liked ? 'text-red-500' : 'text-white'}`}><Heart fill={liked ? 'currentColor' : 'none'} /></span>
          <span className="text-xs">{(video.likes || 0) + (liked ? 1 : 0)}</span>
        </button>
        <button onClick={() => onComment(video)} className="flex flex-col items-center gap-1">
          <span className="flex h-12 w-12 items-center justify-center rounded-full bg-zinc-900/80 text-white"><MessageSquare /></span>
          <span className="text-xs">{video.comments || 0}</span>
        </button>
        <button onClick={() => setSaved(!saved)} className="flex flex-col items-center gap-1">
          <span className={`flex h-12 w-12 items-center justify-center rounded-full bg-zinc-900/80 ${saved ? 'text-yellow-400' : 'text-white'}`}><Bookmark fill={saved ? 'currentColor' : 'none'} /></span>
          <span className="text-xs">Salvar</span>
        </button>
        <button onClick={() => onShare(video)} className="flex flex-col items-center gap-1">
          <span className="flex h-12 w-12 items-center justify-center rounded-full bg-zinc-900/80 text-white"><Send /></span>
          <span className="text-xs">Compartilhar</span>
        </button>
        <button onClick={() => onShare(video)} className="flex flex-col items-center gap-1">
          <span className="flex h-12 w-12 items-center justify-center rounded-full bg-zinc-900/80 text-white"><Repeat /></span>
          <span className="text-xs">Repost</span>
        </button>
      </div>
    </div>
  );
}

export default function HomeFeed() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [videosList, setVideosList] = useState([]);
  const [feedError, setFeedError] = useState('');
  const [shareVideo, setShareVideo] = useState(null);
  const [commentVideo, setCommentVideo] = useState(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const feedContainerRef = useRef(null);

  useEffect(() => {
    let cancelled = false;
    const loadPosts = async () => {
      try {
        const response = await fetch(`${WORKER_URL}/posts`);
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        const data = await response.json();
        if (!Array.isArray(data)) throw new Error('Resposta inválida.');
        if (!cancelled) {
          const posts = data.map(normalizePost).filter((post) => post.videoUrl);
          setVideosList(posts);
          setFeedError('');
        }
      } catch { if (!cancelled) setFeedError('Não foi possível atualizar as publicações salvas.'); }
    };
    loadPosts();
    return () => { cancelled = true; };
  }, []);

  const handleNewVideo = (newVideoData) => {
  if (!newVideoData) return;
  setVideosList((current) => [normalizePost(newVideoData), ...current.filter((item) => item.id !== newVideoData.id)]);
  setFeedError('');
  setTimeout(() => { if (feedContainerRef.current) feedContainerRef.current.scrollTop = 0; }, 100);
};

  return (
    <div className="relative flex h-[100dvh] w-full flex-col overflow-hidden bg-black">
      <main ref={feedContainerRef} onScroll={(e) => { const s = e.currentTarget.scrollTop; setActiveIndex(Math.round(s / window.innerHeight)); }} className="no-scrollbar relative flex h-[100dvh] w-full flex-1 flex-col snap-y snap-mandatory overflow-y-auto overflow-x-hidden overscroll-contain">
        {feedError && <div role="status" className="absolute left-3 right-3 top-3 z-20 rounded-lg bg-black/80 p-2 text-center text-xs text-white">{feedError}</div>}
        {videosList.length === 0 ? (
          <div className="flex h-full w-full items-center justify-center text-zinc-500 text-sm">Nenhum vídeo no feed. Clica no + para publicar!</div>
        ) : (
          videosList.map((video, index) => (
            <FeedVideoItem 
              key={video.id} 
              video={video}
              isActive={index === activeIndex} 
              onShare={setShareVideo} 
              onComment={setCommentVideo} 
              onRequireAuth={() => setIsAuthModalOpen(true)}
            />
          ))
        )}
      </main>

      {showCreateModal && <CreateVideo onClose={() => setShowCreateModal(false)} onPublish={handleNewVideo} />}
      {shareVideo && <ShareSheet video={shareVideo} onClose={() => setShareVideo(null)} onRequireAuth={() => setIsAuthModalOpen(true)} />}
      {commentVideo && <CommentSheet video={commentVideo} onClose={() => setCommentVideo(null)} onRequireAuth={() => setIsAuthModalOpen(true)} />}
      {isAuthModalOpen && <AuthModal onClose={() => setIsAuthModalOpen(false)} />}

      <nav className="fixed bottom-0 left-0 right-0 z-40 flex items-center justify-between border-t border-gray-800 bg-black/95 px-6 py-2 text-white h-14">
        <button type="button" onClick={() => window.location.href = '/'} className="flex flex-col items-center gap-1 text-xs cursor-pointer"><Home className="h-6 w-6" /><span>Início</span></button>
        <button type="button" onClick={() => window.location.href = '/following'} className="flex flex-col items-center gap-1 text-xs text-gray-400 hover:text-white cursor-pointer"><Users className="h-6 w-6" /><span>Amigos</span></button>
        <button type="button" onClick={() => setShowCreateModal(true)} className="relative rounded-lg bg-white p-[2px] focus:outline-none cursor-pointer"><div className="flex items-center justify-center rounded-md bg-white px-3 py-1 text-black"><Plus className="h-5 w-5 stroke-[3]" /></div></button>
        <button type="button" onClick={() => window.location.href = '/explore'} className="flex flex-col items-center gap-1 text-xs text-gray-400 hover:text-white cursor-pointer"><MessageSquare className="h-6 w-6" /><span>Caixa</span></button>
        <button type="button" onClick={() => window.location.href = '/profile'} className="flex flex-col items-center gap-1 text-xs text-gray-400 hover:text-white cursor-pointer"><User className="h-6 w-6" /><span>Perfil</span></button>
      </nav>
    </div>
  );
}