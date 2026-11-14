'use client';
import { useState } from 'react';
import { TikTokDeleteModal } from './TikTokDeleteModal.js';

export default function CustomPosts({ posts, setPosts }) {
    const [deletingId, setDeletingId] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteTargetId, setDeleteTargetId] = useState(null);

  const openDeleteModal = (id) => {
    setDeleteTargetId(id);
    setShowDeleteModal(true);
  };
  const closeDeleteModal = () => {
    setShowDeleteModal(false);
    setDeleteTargetId(null);
  };

  const handleDelete = async (id) => {
    const targetId = id || deleteTargetId;
    if (!targetId) return;
    setDeletingId(targetId);
    closeDeleteModal();
    try {
      const res = await fetch(`https://dengo-upload-worker.dnctraderoperation.workers.dev/posts?id=${targetId}`, {
        method: 'DELETE'
      });
      const data = await res.json();
      if (data.success) {
        setPosts(prev => prev.filter(p => p.id !== targetId));
      } else {
        alert('Erro: ' + data.error);
      }
    } catch (e) {
      alert('Erro de rede');
    }
    setDeletingId(null);
  };

  if (!posts?.length) return <div className="text-zinc-500 text-center mt-10">Nenhum vídeo</div>;

  return (
    <div className="grid grid-cols-2 gap-2 p-2">
      {posts.map((post, i) => (
        <div key={post.id} className="relative bg-zinc-900 rounded-xl overflow-hidden aspect-[9/16] border border-zinc-800">
          {/* Preview real */}
          <video src={post.video_url || post.videoUrl} className="w-full h-full object-cover" muted playsInline preload="metadata" />

          {/* Badge número */}
          <div className="absolute top-2 left-2 bg-black/70 text-white text-[10px] px-2 py-1 rounded-full">
            #{i+1}
          </div>

          {/* BOTÃO LIXEIRA */}
          <button
            onClick={() => openDeleteModal(post.id)}
            className="absolute top-2 right-2 bg-red-600/90 hover:bg-red-600 text-white w-8 h-8 rounded-full flex items-center justify-center z-20 backdrop-blur"
          >
            {deletingId === post.id ? (
              <span className="text-xs">...</span>
            ) : (
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            )}
          </button>

          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black/50 to-transparent p-2">
            <p className="text-white text-[11px] truncate">{post.caption?.substring(0,25) || 'Novo vídeo!'}</p>
          </div>
        </div>
      ))}
    </div>
  );
             <TikTokDeleteModal
        open={showDeleteModal}
        videoId={deleteTargetId}
        onCancel={closeDeleteModal}
        onConfirm={handleDelete}
      />
}