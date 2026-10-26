import React, { useState, useEffect, useRef } from 'react';
import Head from 'next/head';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';

export default function FollowingFeed() {
  const [feedItems, setFeedItems] = useState([]);
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

  // Filtrar apenas os posts de utilizadores que o utilizador marcou como "isFollowing: true"
  const followingItems = feedItems.filter(item => item.user && item.user.isFollowing === true);

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
    <div className="bg-[#F1F1F2] min-h-screen relative font-sans select-none">
      <Head>
        <title>A Seguir - DENGO PLUS</title>
        <meta name="description" content="Feed de criadores que segues no DENGO PLUS" />
        <link rel="icon" href="/favicon.ico" />
        <style>{`
          .custom-scrollbar::-webkit-scrollbar { width: 8px; }
          .custom-scrollbar::-webkit-scrollbar-track { background: #f1f1f1; border-radius: 9999px; }
          .custom-scrollbar::-webkit-scrollbar-thumb { background: #888; border-radius: 9999px; }
          .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #555; }
        `}</style>
      </Head>

      <Header />

      {toastMessage && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 bg-black/90 text-white px-5 py-2.5 rounded-full text-xs font-semibold z-50 shadow-xl border border-gray-700 animate-bounce">
          {toastMessage}
        </div>
      )}

      {/* Modal de Perfil */}
      {selectedUserProfile && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full h-[80vh] shadow-2xl relative flex flex-col overflow-hidden">
            <div className="w-full flex justify-end p-4 pb-0 z-20 bg-white">
              <button 
                onClick={() => setSelectedUserProfile(null)}
                className="bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm cursor-pointer shadow"
              >
                ✕
              </button>
            </div>
            <div className="flex-1 overflow-y-auto custom-scrollbar p-6 pt-0 flex flex-col items-center text-center">
              <div className="w-24 h-24 bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-500 rounded-full p-[3px] mb-3 shadow-md">
                <div className="w-full h-full bg-white rounded-full flex items-center justify-center font-extrabold text-2xl text-gray-800">
                  {selectedUserProfile.name.charAt(0)}
                </div>
              </div>
              <h2 className="text-lg font-bold text-gray-900 leading-tight">{selectedUserProfile.name}</h2>
              <p className="text-xs text-gray-500 mb-3">@{selectedUserProfile.username}</p>

              <button
                onClick={(e) => handleToggleFollow(selectedUserProfile.username, e)}
                className="px-8 py-2 rounded-lg text-xs font-bold transition-all shadow-md mb-4 cursor-pointer bg-gray-200 text-gray-800 hover:bg-gray-300"
              >
                A seguir
              </button>

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
            </div>
          </div>
        </div>
      )}

      <div className="flex mx-auto max-w-[1150px] w-full pt-[60px]">
        <Sidebar />

        <div className="flex-1 min-h-[calc(100vh-60px)] pb-10">
          <div className="max-w-[620px] mx-auto flex flex-col gap-6 p-4">
            
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-5">
              <h1 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                👥 Feed "A Seguir"
              </h1>
              <p className="text-xs text-gray-500 mt-1">
                Publicações exclusivas dos criadores que segues na plataforma.
              </p>
            </div>

            {followingItems.length > 0 ? (
              followingItems.map((item) => (
                <div key={item.id} className="bg-transparent flex flex-col items-center justify-center relative my-4 w-full">
                  <div className="relative flex items-end gap-3 justify-center w-full">
                    
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
                          <p className="text-xs font-semibold">Vídeo demonstrativo</p>
                        </div>
                      )}

                      <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent p-4 z-20 flex items-end justify-between text-left">
                        <div className="flex flex-col gap-1.5 max-w-[240px]">
                          <p onClick={(e) => openUserProfile(item.user, e)} className="text-xs font-bold text-white cursor-pointer hover:underline">
                            @{item.user.username}
                          </p>
                          {item.caption && <p className="text-xs text-gray-100 line-clamp-2">{item.caption}</p>}
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col items-center gap-3.5 pb-4 z-20">
                      <div className="flex flex-col items-center gap-0.5">
                        <button
                          onClick={(e) => handleLike(item.id, e)}
                          className="w-11 h-11 rounded-full bg-[#161823]/60 hover:bg-[#161823]/80 backdrop-blur-md flex items-center justify-center shadow-lg transition-transform active:scale-75 text-white cursor-pointer"
                        >
                          <svg className={`w-6 h-6 transition-colors ${item.liked ? 'text-[#FE2C55] fill-[#FE2C55]' : 'text-white fill-transparent'}`} viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                          </svg>
                        </button>
                        <span className="text-[11px] font-bold text-gray-800">{item.likes}</span>
                      </div>

                      <div className="flex flex-col items-center gap-0.5">
                        <button
                          onClick={(e) => toggleComments(item.id, e)}
                          className="w-11 h-11 rounded-full bg-[#161823]/60 hover:bg-[#161823]/80 backdrop-blur-md text-white flex items-center justify-center shadow-lg cursor-pointer"
                        >
                          💬
                        </button>
                        <span className="text-[11px] font-bold text-gray-800">{item.comments?.length || 0}</span>
                      </div>

                      <div className="flex flex-col items-center gap-0.5">
                        <button
                          onClick={(e) => handleSaveToggle(item.id, e)}
                          className="w-11 h-11 rounded-full bg-[#161823]/60 hover:bg-[#161823]/80 backdrop-blur-md text-white flex items-center justify-center shadow-lg cursor-pointer"
                        >
                          ⭐
                        </button>
                        <span className="text-[11px] font-bold text-gray-800">{item.savedCount || 0}</span>
                      </div>
                    </div>

                  </div>
                </div>
              ))
            ) : (
              <div className="bg-white rounded-2xl p-12 text-center shadow-sm border border-gray-200">
                <p className="text-3xl mb-2">👥</p>
                <p className="text-sm font-bold text-gray-800">Ainda não estás a seguir ninguém ou os criadores que segues não têm publicações.</p>
                <p className="text-xs text-gray-500 mt-1">Clica no botão "+" nos avatares dos vídeos no feed principal para começar a seguir criadores!</p>
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
}