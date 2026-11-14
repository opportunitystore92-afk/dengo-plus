import React from 'react';

export default function BottomNav() {
  return (
    <div className="fixed bottom-0 left-0 right-0 h-14 bg-black border-t border-gray-800 flex items-center justify-around z-50 md:hidden text-gray-400">
      <button onClick={() => window.location.href = '/'} className="flex flex-col items-center gap-0.5 text-white cursor-pointer">
        <span className="text-xs font-medium">Início</span>
      </button>
      <button onClick={() => window.location.href = '/following'} className="flex flex-col items-center gap-0.5 hover:text-white transition-colors cursor-pointer">
        <span className="text-xs font-medium">Amigos</span>
      </button>
      
      {/* Botão Central de Upload estilo TikTok */}
      <button onClick={() => window.location.href = '/#upload'} className="flex items-center justify-center w-10 h-7 bg-gradient-to-r from-[#FE2C55] to-[#25F4EE] rounded-lg text-white shadow-lg cursor-pointer">
        <span className="text-base font-bold leading-none">+</span>
      </button>

      <button onClick={() => window.location.href = '/explore'} className="flex flex-col items-center gap-0.5 hover:text-white transition-colors cursor-pointer">
        <span className="text-xs font-medium">Caixa</span>
      </button>
      <button onClick={() => window.location.href = '/profile'} className="flex flex-col items-center gap-0.5 hover:text-white transition-colors cursor-pointer">
        <span className="text-xs font-medium">Perfil</span>
      </button>
    </div>
  );
}