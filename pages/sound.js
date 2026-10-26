import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';

export default function SoundPage() {
  const [soundPosts, setSoundPosts] = useState([]);
  const [isSavedSound, setIsSavedSound] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const soundInfo = {
    title: 'Som Original - DENGO PLUS Oficial',
    creator: 'dengoplus',
    usesCount: '1.4K publicações',
    cover: '🎵'
  };

  useEffect(() => {
    const savedFeed = localStorage.getItem('dengo_feed_items');
    if (savedFeed) {
      try {
        const allItems = JSON.parse(savedFeed);
        setSoundPosts(allItems);
      } catch (e) {
        console.error('Erro ao carregar posts do som:', e);
      }
    }
  }, []);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3000);
  };

  const handleToggleSaveSound = () => {
    const nextState = !isSavedSound;
    setIsSavedSound(nextState);
    showToast(nextState ? 'Áudio adicionado aos favoritos!' : 'Áudio removido dos favoritos');
  };

  return (
    <div className="bg-[#F1F1F2] dark:bg-black min-h-screen relative font-sans select-none transition-colors">
      <Head>
        <title>{soundInfo.title} - DENGO PLUS</title>
        <meta name="description" content="Explora vídeos criados com este som no DENGO PLUS" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      {toastMessage && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 bg-black/90 dark:bg-white/90 text-white dark:text-black px-5 py-2.5 rounded-full text-xs font-semibold z-50 shadow-xl border border-gray-700 dark:border-gray-200 animate-bounce">
          {toastMessage}
        </div>
      )}

      <div className="flex mx-auto max-w-[1150px] w-full pt-[60px]">
        <Sidebar />

        <div className="flex-1 min-h-[calc(100vh-60px)] p-6">
          <div className="max-w-[700px] mx-auto flex flex-col gap-6">

            {/* Cabeçalho do Som */}
            <div className="bg-white dark:bg-[#1a1a1a] p-6 rounded-3xl shadow-sm border border-gray-200 dark:border-gray-800 flex flex-col sm:flex-row items-center gap-6 transition-colors">
              <div className="w-24 h-24 bg-gradient-to-tr from-purple-600 via-pink-600 to-red-500 rounded-2xl flex items-center justify-center text-4xl shadow-md shrink-0 animate-pulse">
                {soundInfo.cover}
              </div>

              <div className="flex-1 text-center sm:text-left">
                <h1 className="text-lg font-black text-gray-900 dark:text-white leading-tight mb-1">{soundInfo.title}</h1>
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">Criado por <span className="font-bold text-gray-800 dark:text-gray-200">@{soundInfo.creator}</span></p>
                <p className="text-xs font-bold text-[#FE2C55] mb-4">{soundInfo.usesCount}</p>

                <button
                  onClick={handleToggleSaveSound}
                  className={`px-6 py-2 rounded-xl text-xs font-bold transition-all shadow-sm cursor-pointer ${
                    isSavedSound
                      ? 'bg-black dark:bg-white text-white dark:text-black'
                      : 'bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700'
                  }`}
                >
                  {isSavedSound ? '⭐ Áudio Guardado' : '⭐ Adicionar aos Favoritos'}
                </button>
              </div>
            </div>

            {/* Grelha de Vídeos que usam o Som */}
            <div className="bg-white dark:bg-[#1a1a1a] p-6 rounded-3xl shadow-sm border border-gray-200 dark:border-gray-800 transition-colors">
              <h2 className="text-sm font-bold text-gray-800 dark:text-gray-200 mb-4 flex items-center gap-2">
                <span>📹</span> Vídeos com este som ({soundPosts.length})
              </h2>

              {soundPosts.length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {soundPosts.map((item) => (
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
                        <span>@{item.user?.username}</span>
                        <span>❤️ {item.likes || 0}</span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 text-gray-400 dark:text-gray-500">
                  <p className="text-2xl mb-2">🎵</p>
                  <p className="text-xs font-semibold">Nenhum vídeo encontrado a utilizar este som.</p>
                </div>
              )}
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}