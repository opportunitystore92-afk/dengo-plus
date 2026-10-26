import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';

export default function ProfilePage() {
  const [userPosts, setUserPosts] = useState([]);
  const [activeTab, setActiveTab] = useState('videos');
  const [isEditing, setIsEditing] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  
  // Dados do perfil do utilizador logado
  const [profileData, setProfileData] = useState({
    name: 'Alves Creator',
    username: 'alves_dengo',
    bio: 'Criador de conteúdo oficial no DENGO PLUS 🚀 Partilhando o melhor do desenvolvimento e tecnologia.',
    followersCount: 1450,
    followingCount: 320,
    likesCount: 9840
  });

  const [editName, setEditName] = useState('');
  const [editBio, setEditBio] = useState('');

  useEffect(() => {
    // Carregar dados salvos do perfil se existirem
    const savedProfile = localStorage.getItem('dengo_user_profile');
    if (savedProfile) {
      try {
        const parsed = JSON.parse(savedProfile);
        setProfileData(parsed);
        setEditName(parsed.name);
        setEditBio(parsed.bio);
      } catch (e) {
        console.error('Erro ao carregar perfil:', e);
      }
    } else {
      setEditName(profileData.name);
      setEditBio(profileData.bio);
    }

    // Carregar publicações do feed para filtrar as do próprio utilizador ou simular
    const savedFeed = localStorage.getItem('dengo_feed_items');
    if (savedFeed) {
      try {
        const allItems = JSON.parse(savedFeed);
        // Filtrar publicações do utilizador ou usar todas se for demonstração
        setUserPosts(allItems);
      } catch (e) {
        console.error('Erro ao carregar posts:', e);
      }
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
      name: editName,
      bio: editBio
    };
    setProfileData(updated);
    localStorage.setItem('dengo_user_profile', JSON.stringify(updated));
    setIsEditing(false);
    showToast('Perfil atualizado com sucesso!');
  };

  return (
    <div className="bg-[#F1F1F2] min-h-screen relative font-sans select-none">
      <Head>
        <title>O meu Perfil - DENGO PLUS</title>
        <meta name="description" content="Gerencia o teu perfil e publicações no DENGO PLUS" />
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

      {/* Modal de Edição de Perfil */}
      {isEditing && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl relative">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-sm font-bold text-gray-900">Editar Perfil</h3>
              <button 
                onClick={() => setIsEditing(false)}
                className="w-7 h-7 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center text-xs font-bold text-gray-600 cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveProfile} className="flex flex-col gap-4">
              <div>
                <label className="block text-[11px] font-bold text-gray-600 mb-1">Nome de Exibição</label>
                <input
                  type="text"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className="w-full bg-gray-100 border border-gray-200 rounded-xl px-3 py-2 text-xs text-gray-800 focus:outline-none focus:border-black"
                  required
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-gray-600 mb-1">Biografia</label>
                <textarea
                  value={editBio}
                  onChange={(e) => setEditBio(e.target.value)}
                  rows="3"
                  className="w-full bg-gray-100 border border-gray-200 rounded-xl px-3 py-2 text-xs text-gray-800 focus:outline-none focus:border-black resize-none"
                />
              </div>

              <div className="flex justify-end gap-2 mt-2">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="px-4 py-2 rounded-xl text-xs font-bold bg-gray-200 text-gray-700 hover:bg-gray-300 cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl text-xs font-bold bg-[#FE2C55] text-white hover:bg-red-600 cursor-pointer shadow-md"
                >
                  Guardar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="flex mx-auto max-w-[1150px] w-full pt-[60px]">
        <Sidebar />

        <div className="flex-1 min-h-[calc(100vh-60px)] p-6">
          <div className="max-w-[700px] mx-auto flex flex-col gap-6">

            {/* Cabeçalho do Perfil */}
            <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-200 flex flex-col items-center text-center relative">
              
              <div className="w-24 h-24 bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-600 rounded-full p-[3px] mb-3 shadow-md">
                <div className="w-full h-full bg-white rounded-full flex items-center justify-center font-extrabold text-3xl text-gray-800">
                  {profileData.name.charAt(0)}
                </div>
              </div>

              <h1 className="text-lg font-black text-gray-900 leading-tight">{profileData.name}</h1>
              <p className="text-xs text-gray-400 font-medium mb-3">@{profileData.username}</p>

              <button
                onClick={() => setIsEditing(true)}
                className="px-6 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-xl text-xs font-bold transition-all shadow-sm mb-4 cursor-pointer"
              >
                Editar Perfil
              </button>

              {/* Estatísticas */}
              <div className="flex items-center justify-around w-full max-w-[400px] py-3 border-y border-gray-100 mb-4">
                <div>
                  <p className="text-sm font-bold text-gray-900">{profileData.followingCount}</p>
                  <p className="text-[11px] text-gray-400 font-medium">A seguir</p>
                </div>
                <div className="w-[1px] h-6 bg-gray-200"></div>
                <div>
                  <p className="text-sm font-bold text-gray-900">{profileData.followersCount}</p>
                  <p className="text-[11px] text-gray-400 font-medium">Seguidores</p>
                </div>
                <div className="w-[1px] h-6 bg-gray-200"></div>
                <div>
                  <p className="text-sm font-bold text-gray-900">{profileData.likesCount}</p>
                  <p className="text-[11px] text-gray-400 font-medium">Gostos</p>
                </div>
              </div>

              <p className="text-xs text-gray-600 max-w-[450px] leading-relaxed">
                {profileData.bio}
              </p>
            </div>

            {/* Abas de Conteúdo (Vídeos / Gostos) */}
            <div className="bg-white rounded-3xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="flex border-b border-gray-200">
                <button
                  onClick={() => setActiveTab('videos')}
                  className={`flex-1 py-3 text-xs font-bold transition-all cursor-pointer ${
                    activeTab === 'videos'
                      ? 'text-black border-b-2 border-black bg-gray-50'
                      : 'text-gray-400 hover:text-gray-600'
                  }`}
                >
                  Vídeos ({userPosts.length})
                </button>
                <button
                  onClick={() => setActiveTab('liked')}
                  className={`flex-1 py-3 text-xs font-bold transition-all cursor-pointer ${
                    activeTab === 'liked'
                      ? 'text-black border-b-2 border-black bg-gray-50'
                      : 'text-gray-400 hover:text-gray-600'
                  }`}
                >
                  Gostos 🤍
                </button>
              </div>

              {/* Grelha de Vídeos do Perfil */}
              <div className="p-6">
                {userPosts.length > 0 ? (
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {userPosts.map((item) => (
                      <div
                        key={item.id}
                        className="aspect-[9/16] bg-black rounded-xl overflow-hidden relative group shadow-sm"
                      >
                        {item.mediaUrl ? (
                          item.mediaType === 'video' ? (
                            <video src={item.mediaUrl} className="w-full h-full object-cover" />
                          ) : (
                            <img src={item.mediaUrl} alt="Post" className="w-full h-full object-cover" />
                          )
                        ) : (
                          <div className="w-full h-full bg-gradient-to-b from-gray-800 to-gray-900 flex flex-col items-center justify-center text-gray-400 p-2 text-center">
                            <span className="text-2xl mb-1">📹</span>
                            <span className="text-[10px] font-semibold">Vídeo DEMO</span>
                          </div>
                        )}

                        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-3 text-white flex items-center justify-between text-[11px] font-bold">
                          <span>❤️ {item.likes || 0}</span>
                          <span>💬 {item.comments?.length || 0}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12 text-gray-400">
                    <p className="text-2xl mb-2">📭</p>
                    <p className="text-xs font-semibold">Ainda não publicaste nenhum vídeo.</p>
                  </div>
                )}
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}