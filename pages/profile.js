import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import BottomNav from '../components/BottomNav';
import Post from '../components/Post';
import { TikTokDeleteModal } from '../components/TikTokDeleteModal.js';

export default function ProfilePage() {
  const [userPosts, setUserPosts] = useState([]);
  const [activeTab, setActiveTab] = useState('videos');
  const [isEditing, setIsEditing] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [selectedPost, setSelectedPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteTargetId, setDeleteTargetId] = useState(null);
  const [deleteTargetIndex, setDeleteTargetIndex] = useState(null);
  const [profileData, setProfileData] = useState({
    name: 'Alves',
    username: 'dnctraderoperation',
    bio: '',
    followersCount: 0,
    followingCount: 0
  });

  const [editName, setEditName] = useState('');
  const [editBio, setEditBio] = useState('');

  const fetchUserPosts = async () => {
    setLoading(true);
    try {
      const res = await fetch('https://dengo-upload-worker.dnctraderoperation.workers.dev/posts');
      if (res.ok) {
        const posts = await res.json();
        setUserPosts(posts || []);
      }
    } catch (error) {
      console.error('Erro ao procurar vídeos na API:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    try {
      const savedSession = localStorage.getItem('dengo_user_session');
      const currentUser = savedSession ? JSON.parse(savedSession) : null;

      const savedProfile = localStorage.getItem('dengo_user_profile');
      const oldProfile = savedProfile ? JSON.parse(savedProfile) : {};

      const profile = {
        name: currentUser?.name || currentUser?.fullName || oldProfile.name || 'Alves',
        username: currentUser?.username || oldProfile.username || 'dnctraderoperation',
        bio: currentUser?.bio || oldProfile.bio || '',
        followersCount: oldProfile.followersCount || 0,
        followingCount: oldProfile.followingCount || 0
      };

      setProfileData(profile);
      setEditName(profile.name);
      setEditBio(profile.bio);

      fetchUserPosts();
    } catch (error) {
      console.error('Erro ao carregar perfil:', error);
      setLoading(false);
    }
  }, []);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3000);
  };

  const handleSaveProfile = (e) => {
    e.preventDefault();
    const updated = {
      ...profileData,
      name: editName.trim() || profileData.name,
      bio: editBio
    };
    setProfileData(updated);
    localStorage.setItem('dengo_user_profile', JSON.stringify(updated));
    const savedSession = localStorage.getItem('dengo_user_session');
    if (savedSession) {
      const currentUser = JSON.parse(savedSession);
      localStorage.setItem(
        'dengo_user_session',
        JSON.stringify({
          ...currentUser,
          name: updated.name,
          bio: updated.bio
        })
      );
    }
    setIsEditing(false);
    showToast('Perfil atualizado com sucesso!');
  };

  const handleDeletePost = async (postId) => {
    try {
      const res = await fetch(`https://dengo-upload-worker.dnctraderoperation.workers.dev/posts?id=${postId}`, {
        method: 'DELETE'
      });
      if (!res.ok) console.warn('DELETE respondeu:', res.status);
      setUserPosts(prev => prev.filter(post => (post.id || post._id) !== postId));
      setSelectedPost(null);
      showToast('Vídeo apagado!');
    } catch (error) {
      console.error('Erro ao apagar:', error);
      showToast('Erro ao apagar');
    }
  };

  const openDeleteModal = (id, idx) => {
    setDeleteTargetId(id);
    setDeleteTargetIndex(idx);
    setShowDeleteModal(true);
  };
  const closeDeleteModal = () => {
    setShowDeleteModal(false);
    setDeleteTargetId(null);
    setDeleteTargetIndex(null);
  };
  const confirmDelete = () => {
    if (deleteTargetId) handleDeletePost(deleteTargetId);
    closeDeleteModal();
  };
  const likesCount = userPosts.reduce(
    (total, post) => total + (Number(post.likes) || 0),
    0
  );

  return (
    <div className="bg-white min-h-screen relative font-sans select-none pb-16 md:pb-0">
      <Head>
        <title>Meu Perfil - DENGO PLUS</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      {toastMessage && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 bg-black/90 text-white px-5 py-2.5 rounded-full text-xs font-semibold z-50 shadow-xl">
          {toastMessage}
        </div>
      )}

      {selectedPost && (
        <div className="fixed inset-0 z-50 bg-black flex items-center justify-center">
          <button
            onClick={() => setSelectedPost(null)}
            className="absolute top-4 left-4 z-50 bg-black/50 text-white w-10 h-10 rounded-full flex items-center justify-center text-lg font-bold"
          >
            ✕
          </button>
          <div className="relative w-full h-full">
            <Post post={selectedPost} />
            <button
              onClick={() => {
                const id = selectedPost.id || selectedPost._id;
                openDeleteModal(id, null);
              }}
              className="absolute top-4 right-4 z-50 bg-red-600 text-white px-4 py-2 rounded-xl text-xs font-bold shadow-lg"
            >
              🗑️ Apagar Vídeo
            </button>
          </div>
        </div>
      )}

      {isEditing && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl relative">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-sm font-bold text-gray-900">Editar Perfil</h3>
              <button onClick={() => setIsEditing(false)} className="w-7 h-7 bg-gray-100 rounded-full flex items-center justify-center text-xs font-bold text-gray-600">✕</button>
            </div>
            <form onSubmit={handleSaveProfile} className="flex flex-col gap-4">
              <div>
                <label className="block text-[11px] font-bold text-gray-600 mb-1">Nome de Exibição</label>
                <input type="text" value={editName} onChange={(e) => setEditName(e.target.value)} className="w-full bg-gray-100 border border-gray-200 rounded-xl px-3 py-2 text-xs text-gray-800" required />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-gray-600 mb-1">Biografia</label>
                <textarea value={editBio} onChange={(e) => setEditBio(e.target.value)} rows="3" className="w-full bg-gray-100 border border-gray-200 rounded-xl px-3 py-2 text-xs text-gray-800 resize-none" />
              </div>
              <div className="flex justify-end gap-2 mt-2">
                <button type="button" onClick={() => setIsEditing(false)} className="px-4 py-2 rounded-xl text-xs font-bold bg-gray-200 text-gray-700">Cancelar</button>
                <button type="submit" className="px-5 py-2 rounded-xl text-xs font-bold bg-[#FE2C55] text-white shadow-md">Guardar</button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="flex mx-auto max-w-[1150px] w-full pt-[60px]">
        <Sidebar />
        <main className="flex-1 min-w-0 min-h-[calc(100vh-60px)] p-3 sm:p-6">
          <div className="max-w-[700px] mx-auto flex flex-col gap-5">
            <section className="bg-white p-5 sm:p-6 rounded-3xl shadow-sm border border-gray-200">
              <div className="flex items-center gap-5">
                <div className="w-20 h-20 sm:w-24 sm:h-24 shrink-0 bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-600 rounded-full p-[3px]">
                  <div className="w-full h-full bg-white rounded-full flex items-center justify-center font-extrabold text-3xl text-gray-800">{profileData.name.charAt(0).toUpperCase()}</div>
                </div>
                <div className="min-w-0 flex-1">
                  <h1 className="text-lg font-black text-gray-900 truncate">{profileData.name}</h1>
                  <p className="text-xs text-gray-400 font-medium truncate">@{profileData.username}</p>
                  <button onClick={() => setIsEditing(true)} className="mt-3 px-5 py-2 bg-gray-100 text-gray-800 rounded-xl text-xs font-bold">Editar Perfil</button>
                </div>
              </div>
              <div className="mt-6 grid grid-cols-3 border-y border-gray-100 py-4 text-center">
                <div><strong className="block text-lg">{userPosts.length}</strong><span className="text-xs text-gray-500">Publicações</span></div>
                <div><strong className="block text-lg">{profileData.followersCount}</strong><span className="text-xs text-gray-500">Seguidores</span></div>
                <div><strong className="block text-lg">{likesCount}</strong><span className="text-xs text-gray-500">Gostos</span></div>
              </div>
              <p className="text-sm text-gray-600 whitespace-pre-wrap mt-4">{profileData.bio}</p>
            </section>

            <section className="bg-white rounded-3xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="grid grid-cols-2 border-b border-gray-200">
                <button onClick={() => setActiveTab('videos')} className={`py-4 text-xs font-bold ${activeTab === 'videos' ? 'text-[#FE2C55] border-b-2 border-[#FE2C55]' : 'text-gray-400'}`}>Vídeos ({userPosts.length})</button>
                <button onClick={() => setActiveTab('liked')} className={`py-4 text-xs font-bold ${activeTab === 'liked' ? 'text-[#FE2C55] border-b-2 border-[#FE2C55]' : 'text-gray-400'}`}>Gostos</button>
              </div>

              <div className="p-3 sm:p-5">
                {activeTab === 'videos' && (
                  loading ? (
                    <div className="text-center py-12 text-gray-400 text-xs font-semibold">A carregar os teus vídeos...</div>
                  ) : userPosts.length > 0 ? (
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                      {userPosts.map((item, index) => {
                        const videoSrc = item.video_url || item.videoUrl;
                        return (
                        <div
                          key={item.id || item._id || index}
                          className="aspect-[9/16] bg-black rounded-xl overflow-hidden relative border border-zinc-700 shadow-md group"
                        >
                          {videoSrc ? (
                            <video
                              src={videoSrc}
                              className="absolute inset-0 w-full h-full object-cover"
                              muted
                              playsInline
                              preload="metadata"
                            />
                          ) : (
                            <div className="absolute inset-0 bg-zinc-800" />
                          )}

                          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60 pointer-events-none" />

                          <div className="absolute top-2 left-2 right-2 flex justify-between items-start z-10">
                            <span onClick={() => setSelectedPost(item)} className="bg-black/60 text-white text-[10px] px-2 py-0.5 rounded-full font-bold backdrop-blur-sm cursor-pointer">
                              ▶️ Vídeo #{index + 1}
                            </span>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                openDeleteModal(item.id || item._id, index);
                              }}
                              className="bg-red-600 hover:bg-red-700 text-white w-7 h-7 rounded-full flex items-center justify-center shadow-lg"
                              title="Apagar"
                            >
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                              </svg>
                            </button>
                          </div>

                          <div onClick={() => setSelectedPost(item)} className="absolute inset-0 cursor-pointer" />

                          <div className="absolute bottom-0 left-0 right-0 p-2 pointer-events-none">
                            <p className="text-white text-[11px] font-bold line-clamp-2 drop-shadow">{item.caption || 'Sem legenda'}</p>
                            <div className="flex gap-2 mt-1 text-[10px] text-white/80 font-bold">
                              <span>❤️ {item.likes || 0}</span>
                              <span>💬 {item.comments?.length || 0}</span>
                            </div>
                          </div>
                        </div>
                      )})}
                    </div>
                  ) : (
                    <div className="text-center py-12 text-gray-400">
                      <p className="text-2xl mb-2">📭</p>
                      <p className="text-xs font-semibold">Ainda não publicaste nenhum vídeo.</p>
                    </div>
                  )
                )}
                {activeTab === 'liked' && (
                  <div className="text-center py-12 text-gray-400"><p className="text-xs">Os vídeos de que gostaste aparecerão aqui.</p></div>
                )}
              </div>
            </section>
          </div>
        </main>
      </div>

      {/* MODAL BONITO TIKTOK - SEM MARROM */}
      {showDeleteModal && (
        <TikTokDeleteModal
          isOpen={showDeleteModal}
          onClose={closeDeleteModal}
          onConfirm={confirmDelete}
          videoIndex={deleteTargetIndex}
        />
      )}

      <BottomNav />
    </div>
  );
}