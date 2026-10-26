import React from 'react';

export default function Sidebar() {
  return (
    <div className="w-[348px] hidden md:flex flex-col gap-6 p-4 border-r border-gray-100 min-h-[calc(100vh-60px)] bg-white">
      <div className="flex flex-col gap-2">
        <button className="flex items-center gap-3 p-3 rounded-lg text-red-500 font-bold bg-red-50 text-sm cursor-pointer">
          <span className="text-xl">🏠</span>
          <span>Para Si</span>
        </button>
        <button className="flex items-center gap-3 p-3 rounded-lg text-gray-700 font-semibold hover:bg-gray-50 text-sm cursor-pointer transition-colors">
          <span className="text-xl">👥</span>
          <span>A Seguir</span>
        </button>
        <button className="flex items-center gap-3 p-3 rounded-lg text-gray-700 font-semibold hover:bg-gray-50 text-sm cursor-pointer transition-colors">
          <span className="text-xl">🎥</span>
          <span>Live</span>
        </button>
      </div>

      <hr className="border-gray-100" />

      <div>
        <p className="text-xs font-semibold text-gray-400 mb-3 px-3">Contas sugeridas</p>
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-lg cursor-pointer">
            <div className="w-8 h-8 bg-black text-white rounded-full flex items-center justify-center text-xs font-bold">
              DP
            </div>
            <div>
              <p className="text-xs font-semibold text-gray-900">Dengo Creator</p>
              <p className="text-[10px] text-gray-400">@dengocreator</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}