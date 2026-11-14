import React, { useState } from 'react';
import { X, Film } from 'lucide-react';

export default function CreateVideo({ onClose, onPublish }) {
  const [caption, setCaption] = useState('');
  const [previewUrl, setPreviewUrl] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  const handlePublish = () => {
    if (!previewUrl) return;

    onPublish({
      videoUrl: previewUrl,
      caption: caption || 'Novo vídeo publicado!',
      username: 'meu_perfil',
      avatar: '/default-avatar.png'
    });
  };

  return (
    <div className="fixed inset-0 z-50 bg-black text-white flex flex-col justify-between overflow-y-auto">
      <div className="flex items-center justify-between px-4 py-4 border-b border-gray-800">
        <button onClick={onClose} className="p-2">
          <X className="w-6 h-6 text-white" />
        </button>
        <span className="font-bold text-base">Publicar vídeo</span>
        <button 
          onClick={handlePublish}
          disabled={!previewUrl}
          className={`font-bold px-5 py-1.5 rounded-full text-sm transition ${
            previewUrl 
              ? 'bg-red-500 hover:bg-red-600 text-white cursor-pointer' 
              : 'bg-gray-800 text-gray-500 cursor-not-allowed'
          }`}
        >
          Publicar
        </button>
      </div>

      <div className="flex-1 flex flex-col md:flex-row items-center justify-center p-6 gap-6 max-w-4xl mx-auto w-full">
        <div className="relative w-full max-w-[280px] h-[440px] bg-zinc-900 rounded-2xl overflow-hidden border border-gray-800 flex items-center justify-center shadow-2xl">
          {previewUrl ? (
            <video src={previewUrl} className="w-full h-full object-cover" autoPlay loop muted playsInline />
          ) : (
            <label className="cursor-pointer flex flex-col items-center gap-3 text-gray-400 hover:text-white transition">
              <div className="p-4 bg-zinc-800 rounded-full">
                <Film className="w-8 h-8" />
              </div>
              <span className="text-sm font-semibold">Escolher vídeo</span>
              <input type="file" accept="video/*" onChange={handleFileChange} className="hidden" />
            </label>
          )}
        </div>

        <div className="flex-1 flex flex-col gap-4 w-full max-w-md">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-gray-300">Legenda</label>
            <textarea
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              placeholder="Descreve o teu vídeo, adiciona hashtags..."
              className="w-full bg-zinc-900 border border-gray-800 rounded-xl p-3 text-sm text-white resize-none focus:outline-none focus:border-red-500 h-28"
            />
          </div>

          {previewUrl && (
            <button
              onClick={() => setPreviewUrl(null)}
              className="text-xs text-red-400 hover:underline text-left"
            >
              Escolher outro vídeo
            </button>
          )}
        </div>
      </div>
    </div>
  );
}