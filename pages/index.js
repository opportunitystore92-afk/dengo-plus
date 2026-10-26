import React, { useState, useEffect, useRef } from 'react';
import Head from 'next/head';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';

export default function Home() {
  const [feedItems, setFeedItems] = useState([
    {
      id: '1',
      user: { 
        name: 'Dengo Plus Official', 
        username: 'dengoplus',
        bio: 'Conta oficial do DENGO PLUS! Criando o futuro dos vídeos curtos. 🚀',
        followingCount: 120,
        followersCount: 45200,
        isFollowing: false
      },
      caption: 'Bem-vindo ao DENGO PLUS! O feed interativo está ativo 🔥 #dengoplus #viral',
      mediaUrl: null,
      mediaType: null,
      likes: 1593,
      comments: [
        { id: 'c1', user: 'Carlos', text: 'Excelente iniciativa!' },
        { id: 'c2', user: 'Ana', text: 'A interface está muito fluida.' }
      ],
      shares: 85,
      savedCount: 109,
      liked: false,
      saved: false,
      isPlaying: false,
      showComments: false,
      showShareModal: false,
      newCommentText: ''
    }
  ]);

  const [newCaption, setNewCaption] = useState('');
  const [selectedMedia, setSelectedMedia] = useState(null);
  const [mediaType, setMediaType] = useState(null);
  const [toastMessage, setToastMessage] = useState('');
  
  const [selectedUserProfile, setSelectedUserProfile] = useState(null);
  
  const videoRefs = useRef({});

  useEffect(() => {
    const saved = localStorage.getItem('dengo_feed_items');
    if (saved) {
      try {
        setFeedItems(JSON.parse(saved));
      } catch (e) {
        console.error('Erro ao carregar dados:', e);
      }
    }
  }, []);

  const updateAndSave = (newItems) => {
    setFeedItems(newItems);
    try {
      localStorage.setItem('dengo_feed_items', JSON.stringify(newItems));
    } catch (e) {
      console.error('Erro ao guardar no localStorage:', e);
    }
  };

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3000);
  };

  const handleMediaChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (uploadEvent) => {
        const result = uploadEvent.target.result;
        setSelectedMedia(result);
        setMediaType(file.type.startsWith('video/') ? 'video' : 'image');
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCreatePost = (e) => {
    e.preventDefault();
    if (!newCaption.trim() && !selectedMedia) return;

    const newPost = {
      id: Date.now().toString(),
      user: { 
        name: 'Meu Perfil', 
        username: 'meuperfil',
        bio: 'Criador no DENGO PLUS ✨ Adoro partilhar momentos.',
        followingCount: 45,
        followersCount: 128,
        isFollowing: false
      },
      caption: newCaption.trim(),
      mediaUrl: selectedMedia,
      mediaType: mediaType,
      likes: 12,
      comments: [],
      shares: 4,
      savedCount: 5,
      liked: false,
      saved: false,
      isPlaying: false,
      showComments: false,
      showShareModal: false,
      newCommentText: ''
    };

    const updated = [newPost, ...feedItems];
    updateAndSave(updated);
    setNewCaption('');
    setSelectedMedia(null);
    setMediaType(null);
    showToast('Publicado com sucesso!');
  };

  const handleToggleFollow = (username, e) => {
    if (e) e.stopPropagation();
    const updated = feedItems.map(item => {
      if (item.user.username === username) {
        const nextFollowing = !item.user.isFollowing;
        return {
          ...item,
          user: {
            ...item.user,
            isFollowing: nextFollowing,
            followersCount: nextFollowing ? item.user.followersCount + 1 : item.user.followersCount - 1
          }
        };
      }
      return item;
    });
    updateAndSave(updated);

    if (selectedUserProfile && selectedUserProfile.username === username) {
      setSelectedUserProfile(prev => ({
        ...prev,
        isFollowing: !prev.isFollowing,
        followersCount: !prev.isFollowing ? prev.followersCount + 1 : prev.followersCount - 1
      }));
    }

    showToast('Estado de seguidor atualizado!');
  };

  const handleLike = (id, e) => {
    e.stopPropagation();
    const updated = feedItems.map(item => {
      if (item.id === id) {
        return {
          ...item,
          likes: item.liked ? item.likes - 1 : item.likes + 1,
          liked: !item.liked
        };
      }
      return item;
    });
    updateAndSave(updated);
  };

  const handleSaveToggle = (id, e) => {
    e.stopPropagation();
    const updated = feedItems.map(item => {
      if (item.id === id) {
        const isSaved = !item.saved;
        showToast(isSaved ? 'Adicionado aos Favoritos!' : 'Removido dos Favoritos');
        return {
          ...item,
          savedCount: isSaved ? item.savedCount + 1 : item.savedCount - 1,
          saved: isSaved
        };
      }
      return item;
    });
    updateAndSave(updated);
  };

  const togglePlay = (id) => {
    const videoEl = videoRefs.current[id];
    
    const updated = feedItems.map(item => {
      if (item.id === id) {
        if (item.mediaType === 'image') return item;

        const nextState = !item.isPlaying;
        if (videoEl) {
          if (nextState) {
            videoEl.play().catch(err => console.log('Erro:', err));
          } else {
            videoEl.pause();
          }
        }
        return { ...item, isPlaying: nextState };
      }
      return item;
    });
    
    updateAndSave(updated);
  };

  const toggleComments = (id, e) => {
    if (e) e.stopPropagation();
    const updated = feedItems.map(item => {
      if (item.id === id) {
        return { ...item, showComments: !item.showComments };
      }
      return item;
    });
    setFeedItems(updated);
  };

  const toggleShareModal = (id, e) => {
    if (e) e.stopPropagation();
    const updated = feedItems.map(item => {
      if (item.id === id) {
        return { ...item, showShareModal: !item.showShareModal };
      }
      return { ...item, showShareModal: false };
    });
    setFeedItems(updated);
  };

  const handleDeletePost = (id) => {
    if (window.confirm('Tens a certeza que desejas eliminar esta publicação?')) {
      const updated = feedItems.filter(item => item.id !== id);
      updateAndSave(updated);
      showToast('Publicação eliminada com sucesso!');
    }
  };

  const handleCopyLink = (id) => {
    navigator.clipboard.writeText(`${window.location.origin}/#post-${id}`);
    showToast('Ligação copiada para a área de transferência!');
    toggleShareModal(id);
  };

  const handleCommentChange = (id, text) => {
    const updated = feedItems.map(item => {
      if (item.id === id) {
        return { ...item, newCommentText: text };
      }
      return item;
    });
    setFeedItems(updated);
  };

  const addComment = (id, e) => {
    e.preventDefault();
    const updated = feedItems.map(item => {
      if (item.id === id && item.newCommentText.trim() !== '') {
        const newC = {
          id: Date.now().toString(),
          user: 'Utilizador',
          text: item.newCommentText.trim()
        };
        return {
          ...item,
          comments: [...item.comments, newC],
          newCommentText: ''
        };
      }
      return item;
    });
    updateAndSave(updated);
  };

  const openUserProfile = (user, e) => {
    if (e) e.stopPropagation();
    const userPosts = feedItems.filter(item => item.user.username === user.username);
    const totalCalculatedLikes = userPosts.reduce((acc, curr) => acc + (curr.likes || 0), 0);

    setSelectedUserProfile({
      ...user,
      totalLikes: totalCalculatedLikes > 0 ? totalCalculatedLikes : (user.totalLikes || 142)
    });
  };

  return (
    <div className="bg-[#F1F1F2] dark:bg-black min-h-screen relative font-sans select-none transition-colors">
      <Head>
        <title>DENGO PLUS</title>
        <meta name="description" content="DENGO PLUS video application" />
        <link rel="icon" href="/favicon.ico" />
        {/* Estilo CSS customizado para garantir barra de scroll visível e escura */}
        <style>{`
          .custom-scrollbar::-webkit-scrollbar {
            width: 8px;
          }
          .custom-scrollbar::-webkit-scrollbar-track {
            background: #f1f1f1;
            border-radius: 9999px;
          }
          .custom-scrollbar::-webkit-scrollbar-thumb {
            background: #888;
            border-radius: 9999px;
          }
          .custom-scrollbar::-webkit-scrollbar-thumb:hover {
            background: #555;
          }
        `}</style>
      </Head>

      <Header />

      {toastMessage && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 bg-black/90 text-white px-5 py-2.5 rounded-full text-xs font-semibold z-50 shadow-xl border border-gray-700 animate-bounce">
          {toastMessage}
        </div>
      )}

      {/* Modal de Perfil com Scroll Customizado e Bem Visível */}
      {selectedUserProfile && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full h-[80vh] shadow-2xl relative flex flex-col overflow-hidden">
            
            {/* Botão de Fechar Fixo no Topo */}
            <div className="w-full flex justify-end p-4 pb-0 z-20 bg-white">
              <button 
                onClick={() => setSelectedUserProfile(null)}
                className="bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm cursor-pointer shadow"
              >
                ✕
              </button>
            </div>

            {/* Conteúdo com Scroll Vertical Estilizado */}
            <div className="flex-1 overflow-y-auto custom-scrollbar p-6 pt-0 flex flex-col items-center text-center">
              
              {/* Avatar */}
              <div className="w-24 h-24 bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-500 rounded-full p-[3px] mb-3 shadow-md">
                <div className="w-full h-full bg-white rounded-full flex items-center justify-center font-extrabold text-2xl text-gray-800">
                  {selectedUserProfile.name.charAt(0)}
                </div>
              </div>

              <h2 className="text-lg font-bold text-gray-900 leading-tight">{selectedUserProfile.name}</h2>
              <p className="text-xs text-gray-500 mb-3">@{selectedUserProfile.username}</p>

              {/* Botão Seguir */}
              <button
                onClick={(e) => handleToggleFollow(selectedUserProfile.username, e)}
                className={`px-8 py-2 rounded-lg text-xs font-bold transition-all shadow-md mb-4 cursor-pointer ${
                  selectedUserProfile.isFollowing
                    ? 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                    : 'bg-[#FE2C55] text-white hover:bg-[#e02649]'
                }`}
              >
                {selectedUserProfile.isFollowing ? 'A seguir' : 'Seguir'}
              </button>

              {/* Estatísticas */}
              <div className="flex items-center justify-around w-full py-3 border-y border-gray-100 text-center mb-4">
                <div>
                  <p className="text-sm font-bold text-gray-900">{selectedUserProfile.followingCount || 42}</p>
                  <p className="text-[11px] text-gray-400 font-medium">A seguir</p>
                </div>
                <div className="w-[1px] h-6 bg-gray-200"></div>
                <div>
                  <p className="text-sm font-bold text-gray-900">{selectedUserProfile.followersCount || 1200}</p>
                  <p className="text-[11px] text-gray-400 font-medium">Seguidores</p>
                </div>
                <div className="w-[1px] h-6 bg-gray-200"></div>
                <div>
                  <p className="text-sm font-bold text-gray-900">{selectedUserProfile.totalLikes}</p>
                  <p className="text-[11px] text-gray-400 font-medium">Gostos</p>
                </div>
              </div>

              <p className="text-xs text-gray-600 mb-4 px-2">
                {selectedUserProfile.bio || 'Sem biografia disponível.'}
              </p>

              {/* Grid de Publicações do Perfil */}
              <div className="w-full text-left pb-6">
                <p className="text-xs font-bold text-gray-800 mb-2">Publicações</p>
                <div className="grid grid-cols-3 gap-2">
                  {feedItems
                    .filter(item => item.user.username === selectedUserProfile.username)
                    .map(userPost => (
                      <div key={userPost.id} className="aspect-[9/16] bg-black rounded-lg overflow-hidden relative shadow-sm">
                        {userPost.mediaUrl ? (
                          userPost.mediaType === 'video' ? (
                            <video src={userPost.mediaUrl} className="w-full h-full object-cover" />
                          ) : (
                            <img src={userPost.mediaUrl} alt="Post" className="w-full h-full object-cover" />
                          )
                        ) : (
                          <div className="w-full h-full bg-gradient-to-b from-gray-800 to-gray-900 flex items-center justify-center text-[10px] text-gray-400 p-1 text-center">
                            DEMO
                          </div>
                        )}
                      </div>
                    ))}
                </div>
              </div>

            </div>
          </div>
        </div>
      )}

      <div className="flex mx-auto max-w-[1150px] w-full pt-[60px]">
        <Sidebar />

        <div className="flex-1 min-h-[calc(100vh-60px)] pb-10">
          <div className="max-w-[620px] mx-auto flex flex-col gap-6 p-4">
            
            {/* Criar Post */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-4 relative">
              <h2 className="text-sm font-bold text-gray-800 mb-2 flex items-center gap-1.5">
                <span>✨</span> Criar nova publicação
              </h2>

              <form onSubmit={handleCreatePost} className="flex flex-col gap-3">
                <textarea
                  rows="2"
                  placeholder="Escreve uma legenda ou hashtag..."
                  value={newCaption}
                  onChange={(e) => setNewCaption(e.target.value)}
                  className="w-full border border-gray-200 rounded-xl p-3 text-xs focus:outline-none focus:border-black resize-none"
                />

                {selectedMedia && (
                  <div className="relative w-[180px] aspect-[9/16] bg-black rounded-xl overflow-hidden flex items-center justify-center mx-auto border shadow-sm">
                    {mediaType === 'video' ? (
                      <video src={selectedMedia} preload="metadata" className="w-full h-full object-cover" />
                    ) : (
                      <img src={selectedMedia} alt="Preview" className="w-full h-full object-cover" />
                    )}
                    <button
                      type="button"
                      onClick={() => { setSelectedMedia(null); setMediaType(null); }}
                      className="absolute top-2 right-2 bg-black/70 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs z-10 cursor-pointer hover:bg-black"
                    >
                      ✕
                    </button>
                  </div>
                )}

                <div className="flex justify-between items-center pt-1">
                  <label className="cursor-pointer flex items-center gap-2 text-xs text-gray-600 hover:text-black font-semibold bg-gray-100 hover:bg-gray-200 px-3 py-2 rounded-lg transition-all">
                    <span>🎬</span> Escolher Ficheiro
                    <input
                      type="file"
                      accept="image/*,video/*"
                      onChange={handleMediaChange}
                      className="hidden"
                    />
                  </label>

                  <button
                    type="submit"
                    className="bg-[#FE2C55] text-white px-5 py-2 rounded-lg text-xs font-bold hover:bg-[#e02649] transition-all shadow-md active:scale-95 cursor-pointer"
                  >
                    Publicar
                  </button>
                </div>
              </form>
            </div>

            {/* Listagem de Posts */}
            {feedItems.map((item) => (
              <div 
                key={item.id} 
                id={`post-${item.id}`} 
                className="bg-transparent flex flex-col items-center justify-center relative my-4 w-full"
              >
                <div className="relative flex items-end gap-3 justify-center w-full">
                  
                  {/* Container do Vídeo 9:16 */}
                  <div 
                    onClick={() => togglePlay(item.id)}
                    className="w-[320px] sm:w-[340px] aspect-[9/16] bg-black rounded-2xl flex flex-col items-center justify-center text-white cursor-pointer relative overflow-hidden group shadow-2xl"
                  >
                    {item.mediaUrl ? (
                      item.mediaType === 'video' ? (
                        <video
                          ref={(el) => (videoRefs.current[item.id] = el)}
                          src={item.mediaUrl}
                          preload="auto"
                          loop
                          playsInline
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <img src={item.mediaUrl} alt="Media" className="w-full h-full object-cover" />
                      )
                    ) : (
                      <div className="w-full h-full bg-gradient-to-b from-gray-800 to-gray-900 flex flex-col items-center justify-center text-gray-400 p-4 text-center">
                        <span className="text-3xl mb-2">📹</span>
                        <p className="text-xs font-semibold">Vídeo demonstrativo DENGO PLUS</p>
                      </div>
                    )}

                    {(!item.mediaUrl || item.mediaType === 'video') && (
                      <div className="absolute inset-0 bg-black/10 group-hover:bg-black/30 transition-colors flex items-center justify-center z-10">
                        <div className="w-14 h-14 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center text-white text-2xl shadow-2xl transition-transform group-hover:scale-110">
                          {item.isPlaying ? '⏸️' : '▶️'}
                        </div>
                      </div>
                    )}

                    {/* Overlay Inferior */}
                    <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent p-4 z-20 flex items-end justify-between text-left">
                      <div className="flex flex-col gap-1.5 max-w-[240px]">
                        <p 
                          onClick={(e) => openUserProfile(item.user, e)}
                          className="text-xs font-bold text-white tracking-wide drop-shadow cursor-pointer hover:underline"
                        >
                          @{item.user.username}
                        </p>
                        {item.caption && (
                          <p className="text-xs text-gray-100 line-clamp-2 leading-snug font-normal drop-shadow">
                            {item.caption}
                          </p>
                        )}
                        <div className="flex items-center gap-2 mt-0.5">
                          <span className="text-xs animate-spin">🎵</span>
                          <p className="text-[11px] text-gray-200 font-medium truncate">
                            Som original - {item.user.name}
                          </p>
                        </div>
                      </div>

                      <div className="w-9 h-9 bg-black rounded-full border-2 border-gray-700 flex items-center justify-center shadow-lg animate-spin">
                        <div className="w-3 h-3 bg-white rounded-full flex items-center justify-center">
                          <div className="w-1 h-1 bg-black rounded-full"></div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Coluna Direita TikTok */}
                  <div className="flex flex-col items-center gap-3.5 pb-4 z-20">
                    
                    {/* Avatar + Botão Seguir */}
                    <div className="relative mb-0.5">
                      <div 
                        onClick={(e) => openUserProfile(item.user, e)}
                        className="w-10 h-10 bg-gray-300 rounded-full border border-white flex items-center justify-center font-bold text-gray-900 text-xs shadow-md cursor-pointer hover:scale-105 transition-transform"
                      >
                        {item.user.name.charAt(0)}
                      </div>
                      
                      <button
                        onClick={(e) => handleToggleFollow(item.user.username, e)}
                        className={`absolute -bottom-2 left-1/2 -translate-x-1/2 rounded-full w-4 h-4 flex items-center justify-center text-[10px] font-black shadow cursor-pointer transition-transform ${
                          item.user.isFollowing ? 'bg-white text-green-600' : 'bg-[#FE2C55] text-white hover:scale-110'
                        }`}
                      >
                        {item.user.isFollowing ? '✓' : '+'}
                      </button>
                    </div>

                    {/* Gostos */}
                    <div className="flex flex-col items-center gap-0.5">
                      <button
                        onClick={(e) => handleLike(item.id, e)}
                        className="w-11 h-11 rounded-full bg-[#161823]/60 hover:bg-[#161823]/80 backdrop-blur-md flex items-center justify-center shadow-lg transition-transform active:scale-75 text-white cursor-pointer"
                      >
                        <svg className={`w-6 h-6 transition-colors ${item.liked ? 'text-[#FE2C55] fill-[#FE2C55]' : 'text-white fill-transparent'}`} viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                        </svg>
                      </button>
                      <span className="text-[11px] font-bold text-gray-800 drop-shadow-sm">{item.likes}</span>
                    </div>

                    {/* Comentários */}
                    <div className="flex flex-col items-center gap-0.5">
                      <button
                        onClick={(e) => toggleComments(item.id, e)}
                        className="w-11 h-11 rounded-full bg-[#161823]/60 hover:bg-[#161823]/80 backdrop-blur-md text-white flex items-center justify-center shadow-lg transition-transform active:scale-75 cursor-pointer"
                      >
                        <svg className="w-6 h-6 text-white fill-white" viewBox="0 0 24 24">
                          <path d="M12 3c-4.97 0-9 3.58-9 8 0 2.34 1.05 4.47 2.76 6.01L4.5 20.5l3.86-1.16C9.4 19.74 10.68 20 12 20c4.97 0 9-3.58 9-8s-4.03-8-9-8zm0 14c-1.12 0-2.18-.3-3.1-.82l-2.16.65.65-2.14C6.8 13.9 6.5 12.98 6.5 12c0-3.31 3.36-6 7.5-6s7.5 2.69 7.5 6-3.36 6-7.5 6z" />
                        </svg>
                      </button>
                      <span className="text-[11px] font-bold text-gray-800 drop-shadow-sm">
                        {item.comments ? item.comments.length : 0}
                      </span>
                    </div>

                    {/* Favoritos */}
                    <div className="flex flex-col items-center gap-0.5">
                      <button
                        onClick={(e) => handleSaveToggle(item.id, e)}
                        className="w-11 h-11 rounded-full bg-[#161823]/60 hover:bg-[#161823]/80 backdrop-blur-md text-white flex items-center justify-center shadow-lg transition-transform active:scale-75 cursor-pointer"
                      >
                        <svg className={`w-6 h-6 transition-colors ${item.saved ? 'text-yellow-400 fill-yellow-400' : 'text-white fill-transparent'}`} viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z" />
                        </svg>
                      </button>
                      <span className="text-[11px] font-bold text-gray-800 drop-shadow-sm">{item.savedCount || 0}</span>
                    </div>

                    {/* Partilhar */}
                    <div className="relative flex flex-col items-center gap-0.5">
                      <button
                        onClick={(e) => toggleShareModal(item.id, e)}
                        className="w-11 h-11 rounded-full bg-[#161823]/60 hover:bg-[#161823]/80 backdrop-blur-md text-white flex items-center justify-center shadow-lg transition-transform active:scale-75 cursor-pointer"
                      >
                        <svg className="w-6 h-6 text-white fill-white" viewBox="0 0 24 24">
                          <path d="M14 9V5l7 7-7 7v-4.1C7 14 4 18 3 22c2-4 5-8 11-9z" />
                        </svg>
                      </button>
                      <span className="text-[11px] font-bold text-gray-800 drop-shadow-sm">
                        {item.shares || '85'}
                      </span>

                      {item.showShareModal && (
                        <div className="absolute left-12 bottom-0 w-48 bg-white rounded-2xl shadow-2xl border border-gray-100 p-2 z-50 flex flex-col gap-1 text-xs">
                          <button
                            onClick={() => handleCopyLink(item.id)}
                            className="w-full text-left px-3 py-2.5 hover:bg-gray-50 rounded-xl flex items-center gap-2 font-semibold text-gray-700"
                          >
                            🔗 Copiar ligação
                          </button>
                          <button
                            onClick={() => {
                              window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(item.caption || 'Vê esta publicação no DENGO PLUS!')}`, '_blank');
                              toggleShareModal(item.id);
                            }}
                            className="w-full text-left px-3 py-2.5 hover:bg-gray-50 rounded-xl flex items-center gap-2 font-semibold text-gray-700"
                          >
                            💬 WhatsApp
                          </button>
                          
                          <hr className="my-1 border-gray-100" />
                          
                          <button
                            onClick={() => handleDeletePost(item.id)}
                            className="w-full text-left px-3 py-2.5 hover:bg-red-50 text-red-600 rounded-xl flex items-center gap-2 font-bold"
                          >
                            🗑️ Eliminar publicação
                          </button>
                        </div>
                      )}
                    </div>

                  </div>
                </div>

                {/* Comentários */}
                {item.showComments && (
                  <div className="w-full max-w-[340px] mt-3 bg-white p-3 rounded-2xl shadow-md border border-gray-200 flex flex-col gap-3 z-30">
                    <h4 className="text-xs font-bold text-gray-700 text-left">Comentários</h4>
                    <div className="flex flex-col gap-2 max-h-48 overflow-y-auto pr-1">
                      {item.comments && item.comments.length > 0 ? (
                        item.comments.map((c) => (
                          <div key={c.id} className="bg-gray-50 p-2.5 rounded-xl text-xs text-left border border-gray-100">
                            <span className="font-bold text-gray-900">{c.user}: </span>
                            <span className="text-gray-700">{c.text}</span>
                          </div>
                        ))
                      ) : (
                        <p className="text-[11px] text-gray-400 italic text-left">Nenhum comentário ainda. Sê o primeiro!</p>
                      )}
                    </div>
                    <form onSubmit={(e) => addComment(item.id, e)} className="flex gap-2 mt-1">
                      <input 
                        type="text"
                        placeholder="Adiciona um comentário..."
                        value={item.newCommentText || ''}
                        onChange={(e) => handleCommentChange(item.id, e.target.value)}
                        className="flex-1 border border-gray-200 rounded-xl px-3.5 py-2 text-xs focus:outline-none focus:border-black"
                      />
                      <button 
                        type="submit"
                        className="bg-black text-white px-4 py-2 rounded-xl text-xs font-bold hover:bg-gray-800 transition-colors cursor-pointer"
                      >
                        Enviar
                      </button>
                    </form>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}