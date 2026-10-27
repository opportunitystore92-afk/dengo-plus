import React, { useState } from 'react';

export default function CreateVideo({ onVideoCreated }) {
  const [caption, setCaption] = useState('');
  const [videoFile, setVideoFile] = useState(null);
  const [videoPreview, setVideoPreview] = useState('');
  const [loading, setLoading] = useState(false);

  // Lista de emojis populares estilo TikTok para inserção rápida
  const quickEmojis = ['🔥', '❤️', '😂', '✨', '🚀', '👏', '😍', '🎉'];

  const addEmoji = (emoji) => {
    setCaption((prev) => prev + emoji);
  };

  const addHashtag = (tag) => {
    setCaption((prev) => prev + ` #${tag} `);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setVideoFile(file);
      setVideoPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!videoFile || !caption) {
      alert('Por favor, seleciona um vídeo e escreve uma legenda.');
      return;
    }

    setLoading(true);

    const newPost = {
      id: Date.now(),
      user: {
        username: 'alves_creator',
        name: 'Alves',
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100'
      },
      caption: caption,
      videoUrl: videoPreview,
      sound: 'Som Original - alves_creator',
      likes: 0,
      comments: 0,
      shares: 0
    };

    if (onVideoCreated) {
      onVideoCreated(newPost);
    }

    setCaption('');
    setVideoFile(null);
    setVideoPreview('');
    setLoading(false);
    alert('Vídeo publicado com sucesso!');
  };

  return (
    <div className="bg-white dark:bg-[#1a1a1a] p-6 rounded-2xl shadow-md border border-gray-200 dark:border-gray-800 mb-6 transition-colors">
      <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
        <span>✨</span> Criar nova publicação
      </h3>

      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <textarea
          rows="3"
          placeholder="Escreve uma legenda ou hashtag..."
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
          className="bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 p-3 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-[#FE2C55] resize-none"
        />

        {/* Barra de Emojis Rápidos e Hashtags */}
        <div className="flex flex-wrap items-center gap-1.5 py-1">
          <span className="text-[10px] font-bold text-gray-400 mr-1">Emojis:</span>
          {quickEmojis.map((emoji, index) => (
            <button
              key={index}
              type="button"
              onClick={() => addEmoji(emoji)}
              className="bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 px-2 py-1 rounded-lg text-xs transition-all"
            >
              {emoji}
            </button>
          ))}
          <div className="h-4 w-[1px] bg-gray-300 dark:bg-gray-700 mx-1" />
          <button
            type="button"
            onClick={() => addHashtag('trending')}
            className="text-[11px] bg-pink-50 dark:bg-pink-950/30 text-[#FE2C55] px-2 py-1 rounded-lg font-semibold"
          >
            #trending
          </button>
          <button
            type="button"
            onClick={() => addHashtag('dengoplus')}
            className="text-[11px] bg-pink-50 dark:bg-pink-950/30 text-[#FE2C55] px-2 py-1 rounded-lg font-semibold"
          >
            #dengoplus
          </button>
        </div>

        <div className="flex items-center justify-between pt-2">
          <label className="bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200 px-4 py-2 rounded-xl text-xs font-bold cursor-pointer transition-all">
            📁 Escolher Ficheiro
            <input type="file" accept="video/*" onChange={handleFileChange} className="hidden" />
          </label>

          <span className="text-[11px] text-gray-500 dark:text-gray-400 truncate max-w-[150px]">
            {videoFile ? videoFile.name : 'Nenhum ficheiro selecionado'}
          </span>

          <button
            type="submit"
            disabled={loading}
            className="bg-[#FE2C55] hover:bg-red-600 text-white text-xs font-bold px-6 py-2 rounded-xl transition-all shadow-md cursor-pointer disabled:opacity-50"
          >
            {loading ? 'A publicar...' : 'Publicar'}
          </button>
        </div>
      </form>
    </div>
  );
}