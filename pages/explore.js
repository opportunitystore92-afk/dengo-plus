import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';

export default function Explore() {
  const [feedItems, setFeedItems] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('Tudo');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedVideoModal, setSelectedVideoModal] = useState(null);

  const categories = ['Tudo', '🔥 Em Alta', '🎵 Música', '🎮 Gaming', '😂 Comédia', '🎨 Arte', '💻 Tech'];

  const trendingHashtags = [
    { tag: '#DENGOCHALLENGE', views: '2.4M' },
    { tag: '#VIRAL2026', views: '8.1M' },
    { tag: '#TECHLOVERS', views: '950K' },
    { tag: '#MUSICAEMALTA', views: '5.3M' }
  ];

  useEffect(() => {
    const saved = localStorage.getItem('dengo_feed_items');
    if (saved) {
      try {
        setFeedItems(JSON.parse(saved));
      } catch (e) {
        console.error('Erro ao carregar dados do feed:', e);
      }
    }
  }, []);

  // Filtrar os itens da grelha com base na categoria e na barra de pesquisa
  const filteredItems = feedItems.filter(item => {
    const matchesSearch = item.caption?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.user?.username?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

  return (
    <div className="bg-[#F1F1F2] min-h-screen relative font-sans select-none">
      <Head>
        <title>Explorar & Tendências - DENGO PLUS</title>
        <meta name="description" content="Descobre conteúdos populares e hashtags em alta no DENGO PLUS" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      {/* Modal de Antevisão de Vídeo Popover */}
      {selectedVideoModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-sm w-full overflow-hidden shadow-2xl relative">
            <button 
              onClick={() => setSelectedVideoModal(null)}
              className="absolute top-3 right-3 bg-black/60 hover:bg-black text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm z-30 cursor-pointer"
            >
              ✕
            </button>

            <div className="w-full aspect-[9/16] bg-black relative flex items-center justify-center">
              {selectedVideoModal.mediaUrl ? (
                selectedVideoModal.mediaType === 'video' ? (
                  <video src={selectedVideoModal.mediaUrl} controls autoPlay className="w-full h-full object-cover" />
                ) : (
                  <img src={selectedVideoModal.mediaUrl} alt="Media" className="w-full h-full object-cover" />
                )
              ) : (
                <div className="text-white text-center p-4">
                  <span className="text-4xl">📹</span>
                  <p className="text-xs mt-2 font-semibold">Vídeo demonstrativo</p>
                </div>
              )}
            </div>

            <div className="p-4 bg-white text-left">
              <p className="text-xs font-bold text-gray-900">@{selectedVideoModal.user?.username}</p>
              <p className="text-xs text-gray-600 line-clamp-2 mt-1">{selectedVideoModal.caption || 'Sem legenda'}</p>
              <div className="flex items-center gap-4 mt-3 text-xs text-gray-500 font-semibold">
                <span>❤️ {selectedVideoModal.likes || 0}</span>
                <span>💬 {selectedVideoModal.comments?.length || 0}</span>
                <span>⭐ {selectedVideoModal.savedCount || 0}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="flex mx-auto max-w-[1150px] w-full pt-[60px]">
        <Sidebar />

        <div className="flex-1 min-h-[calc(100vh-60px)] p-6">
          <div className="max-w-[800px] mx-auto flex flex-col gap-6">

            {/* Cabeçalho da Seção de Explorar */}
            <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-200">
              <h1 className="text-xl font-black text-gray-900 flex items-center gap-2 mb-1">
                🔍 Explorar & Tendências
              </h1>
              <p className="text-xs text-gray-500 mb-4">
                Vê o que está a acontecer agora no DENGO PLUS
              </p>

              {/* Barra de Pesquisa Interna */}
              <div className="relative w-full mb-4">
                <input
                  type="text"
                  placeholder="Pesquisar hashtags, criadores ou legendas..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-gray-100 border border-gray-200 rounded-xl px-4 py-2.5 pl-10 text-xs text-gray-800 focus:outline-none focus:border-black"
                />
                <span className="absolute left-3.5 top-2.5 text-xs text-gray-400">🔍</span>
              </div>

              {/* Categorias (Filtros) */}
              <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                      selectedCategory === cat
                        ? 'bg-black text-white shadow-md'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Hashtags em Alta (Trending Banner) */}
            <div className="bg-gradient-to-r from-purple-600 via-pink-600 to-red-500 text-white rounded-2xl p-5 shadow-md flex flex-col gap-3">
              <h2 className="text-sm font-bold flex items-center gap-1.5">
                <span>⚡</span> Hashtags Populares
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {trendingHashtags.map((item) => (
                  <div 
                    key={item.tag}
                    onClick={() => setSearchQuery(item.tag)}
                    className="bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-xl p-3 cursor-pointer transition-all border border-white/10"
                  >
                    <p className="text-xs font-extrabold truncate">{item.tag}</p>
                    <p className="text-[10px] text-gray-200">{item.views} visualizações</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Grelha (Grid) de Conteúdo Recomendado */}
            <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-200">
              <h2 className="text-sm font-bold text-gray-800 mb-4 flex items-center gap-2">
                <span>🔥</span> Publicações Populares
              </h2>

              {filteredItems.length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {filteredItems.map((item) => (
                    <div
                      key={item.id}
                      onClick={() => setSelectedVideoModal(item)}
                      className="aspect-[9/16] bg-black rounded-xl overflow-hidden relative cursor-pointer group shadow-sm hover:shadow-xl transition-all"
                    >
                      {item.mediaUrl ? (
                        item.mediaType === 'video' ? (
                          <video src={item.mediaUrl} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                        ) : (
                          <img src={item.mediaUrl} alt="Explorar" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                        )
                      ) : (
                        <div className="w-full h-full bg-gradient-to-b from-gray-800 to-gray-900 flex flex-col items-center justify-center text-gray-400 p-2 text-center">
                          <span className="text-2xl mb-1">📹</span>
                          <span className="text-[10px] font-semibold">Vídeo DEMO</span>
                        </div>
                      )}

                      {/* Overlay com Informações ao Passar o Rato */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-90 group-hover:opacity-100 transition-opacity p-3 flex flex-col justify-end text-white">
                        <p className="text-[11px] font-bold truncate">@{item.user?.username}</p>
                        <p className="text-[10px] text-gray-300 line-clamp-1">{item.caption}</p>
                        <div className="flex items-center gap-2 mt-1 text-[10px] text-gray-300 font-bold">
                          <span>❤️ {item.likes}</span>
                          <span>💬 {item.comments?.length || 0}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-10 text-gray-400">
                  <p className="text-2xl mb-2">🔍</p>
                  <p className="text-xs font-semibold">Nenhuma publicação encontrada para a tua pesquisa.</p>
                </div>
              )}
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}