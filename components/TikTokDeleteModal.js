import React from 'react';

export function TikTokDeleteModal({ isOpen, onClose, onConfirm, videoIndex }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-end sm:items-center justify-center">
      {/* Fundo escuro */}
      <div onClick={onClose} className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
      
      {/* Modal branquinho estilo TikTok */}
      <div className="relative bg-white w-full sm:max-w-[360px] rounded-t-[20px] sm:rounded-[20px] p-6 animate-in slide-in-from-bottom">
        <div className="w-10 h-1 bg-gray-200 rounded-full mx-auto mb-5 sm:hidden" />
        
        <h3 className="text-center text-[16px] font-bold text-black">
          Apagar vídeo?
        </h3>
        <p className="text-center text-[13px] text-gray-500 mt-2">
          {videoIndex !== null ? `Vídeo #${videoIndex + 1} será apagado permanentemente.` : 'Este vídeo será apagado permanentemente.'}
        </p>

        <div className="mt-6 flex flex-col gap-3">
          <button
            onClick={onConfirm}
            className="w-full bg-[#FE2C55] hover:bg-[#e6264d] text-white py-3.5 rounded-xl text-[15px] font-bold"
          >
            Apagar
          </button>
          <button
            onClick={onClose}
            className="w-full bg-gray-100 hover:bg-gray-200 text-black py-3.5 rounded-xl text-[15px] font-bold"
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
}