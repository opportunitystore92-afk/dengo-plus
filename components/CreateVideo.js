import React, { useState, useEffect } from 'react';
import { X, Upload, Video as VideoIcon } from 'lucide-react';

const WORKER_URL = 'https://dengo-upload-worker.dnctraderoperation.workers.dev';

export default function CreateVideo({ onClose, onPublish }) {
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');
  const [caption, setCaption] = useState('');
  const [username, setUsername] = useState('usuario');
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setUsername(localStorage.getItem('dengoo_username') || 'usuario');
    }
  }, []);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.type.startsWith('video/')) {
      setFile(selectedFile);
      setPreviewUrl(URL.createObjectURL(selectedFile));
    } else {
      alert('Por favor, selecciona um ficheiro de vídeo válido.');
    }
  };

  const generateThumbnail = (videoFile) => {
    return new Promise((resolve) => {
      const video = document.createElement('video');
      video.src = URL.createObjectURL(videoFile);
      video.muted = true;
      video.playsInline = true;
      video.currentTime = 0.5;

      let resolved = false;

      // Timeout de segurança: se demorar mais de 2 segundos, desiste da capa para não travar o envio
      const timer = setTimeout(() => {
        if (!resolved) {
          resolved = true;
          resolve(null);
        }
      }, 2000);

      video.onseeked = () => {
        if (resolved) return;
        resolved = true;
        clearTimeout(timer);
        try {
          const canvas = document.createElement('canvas');
          canvas.width = video.videoWidth || 720;
          canvas.height = video.videoHeight || 1280;
          const ctx = canvas.getContext('2d');
          ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
          
          canvas.toBlob((blob) => {
            resolve(blob);
          }, 'image/jpeg', 0.85);
        } catch (err) {
          resolve(null);
        }
      };

      video.onerror = () => {
        if (!resolved) {
          resolved = true;
          clearTimeout(timer);
          resolve(null);
        }
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return;

    try {
      setUploading(true);
      const newId = String(Date.now() + '-' + Math.floor(Math.random() * 1000000));
      
      const thumbBlob = await generateThumbnail(file);

      if (thumbBlob) {
        await fetch(`${WORKER_URL}/thumbnails/${newId}.jpg`, {
          method: 'PUT',
          headers: { 'Content-Type': 'image/jpeg' },
          body: thumbBlob
        }).catch(() => {});
      }

      const videoKey = `videos/${newId}.mp4`;
      const uploadResponse = await fetch(`${WORKER_URL}/${videoKey}`, {
        method: 'PUT',
        headers: { 'Content-Type': file.type || 'video/mp4' },
        body: file
      });

      const uploadResult = await uploadResponse.json().catch(() => ({}));
      if (!uploadResponse.ok || !uploadResult.success) {
        throw new Error(uploadResult.error || 'Erro ao enviar o vídeo.');
      }

      const permanentVideoUrl = `${WORKER_URL}/${videoKey}`;
      const permanentThumbnailUrl = thumbBlob ? `${WORKER_URL}/thumbnails/${newId}.jpg` : 'https://main.dengo-plus.pages.dev/logo.png';

      const avatar = typeof window !== 'undefined' ? localStorage.getItem('dengoo_avatar') : '/default-avatar.png';

      const postData = {
        id: newId,
        username: username,
        caption: caption || 'Novo vídeo no Dengo Plus!',
        videoUrl: permanentVideoUrl,
        thumbnailUrl: permanentThumbnailUrl,
        profileImage: avatar || '/default-avatar.png'
      };

      await fetch(`${WORKER_URL}/posts`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(postData)
      });

      if (onPublish) {
        onPublish(postData, file);
      } else {
        onClose();
      }
    } catch (err) {
      alert('Erro: ' + err.message);
      setUploading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[300] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="relative w-full max-w-md bg-[#18181b] border border-zinc-800 rounded-2xl p-6 text-white shadow-2xl">
        <button onClick={onClose} className="absolute top-4 right-4 text-zinc-400 hover:text-white">
          <X className="h-5 w-5" />
        </button>

        <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
          <VideoIcon className="text-pink-500" /> Publicar Novo Vídeo
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {!previewUrl ? (
            <label className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-zinc-700 rounded-xl cursor-pointer bg-zinc-900/50 hover:bg-zinc-900 transition">
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <Upload className="w-10 h-10 mb-3 text-zinc-400" />
                <p className="mb-2 text-sm text-zinc-300"><span className="font-semibold">Clica para enviar</span> ou arrasta o vídeo</p>
                <p className="text-xs text-zinc-500">MP4, WebM (Qualquer tamanho)</p>
              </div>
              <input type="file" accept="video/*" onChange={handleFileChange} className="hidden" />
            </label>
          ) : (
            <div className="relative w-full h-40 bg-black rounded-xl overflow-hidden flex items-center justify-center">
              <video src={previewUrl} className="h-full object-contain" />
              <button type="button" onClick={() => { setFile(null); setPreviewUrl(''); }} className="absolute top-2 right-2 bg-black/70 p-1 rounded-full text-white hover:bg-red-600 transition">
                <X className="h-4 w-4" />
              </button>
            </div>
          )}

          <div>
            <label className="block text-xs font-medium text-zinc-400 mb-1">Legenda / Descrição</label>
            <textarea
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              placeholder="Escreve uma legenda cativante..."
              className="w-full bg-zinc-900 border border-zinc-800 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-pink-500 resize-none h-20"
            />
          </div>

          <button
            type="submit"
            disabled={!file || uploading}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-400 to-pink-500 text-white font-semibold shadow-lg hover:opacity-90 transition disabled:opacity-50"
          >
            {uploading ? 'A enviar vídeo...' : 'Publicar Vídeo'}
          </button>
        </form>
      </div>
    </div>
  );
}