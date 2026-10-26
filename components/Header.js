import React, { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Header() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('dengo_dark_mode');
    if (savedTheme === 'true') {
      setIsDarkMode(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleDarkMode = () => {
    const nextMode = !isDarkMode;
    setIsDarkMode(nextMode);
    if (nextMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('dengo_dark_mode', 'true');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('dengo_dark_mode', 'false');
    }
  };

  return (
    <div className="fixed top-0 inset-x-0 h-[60px] bg-white dark:bg-[#121212] border-b border-gray-200 dark:border-gray-800 flex items-center justify-between px-6 z-50 transition-colors">
      <Link href="/">
        <div className="flex items-center gap-2 cursor-pointer">
          <div className="bg-[#FE2C55] text-white font-black px-2.5 py-1 rounded-xl text-sm tracking-wider shadow-md">
            DENGO
          </div>
          <span className="font-extrabold text-sm tracking-widest text-gray-900 dark:text-white">PLUS</span>
        </div>
      </Link>

      <div className="hidden md:flex items-center bg-gray-100 dark:bg-gray-800 rounded-full px-4 py-2 w-[380px] border border-transparent focus-within:border-gray-300 dark:focus-within:border-gray-700 transition-all">
        <input
          type="text"
          placeholder="Procurar contas e vídeos"
          className="bg-transparent text-xs w-full focus:outline-none text-gray-800 dark:text-gray-200 placeholder-gray-400"
        />
        <button className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 text-sm">
          🔍
        </button>
      </div>

      <div className="flex items-center gap-3">
        <button
          onClick={toggleDarkMode}
          className="w-9 h-9 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 flex items-center justify-center text-sm shadow-sm hover:scale-105 transition-transform cursor-pointer"
          title="Alternar Modo Escuro"
        >
          {isDarkMode ? '☀️' : '🌙'}
        </button>

        <Link href="/profile">
          <button className="bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200 text-xs font-bold px-4 py-2 rounded-xl transition-all cursor-pointer shadow-sm">
            + Upload
          </button>
        </Link>

        <button className="bg-[#FE2C55] hover:bg-red-600 text-white text-xs font-bold px-5 py-2 rounded-xl transition-all shadow-md cursor-pointer">
          Log in
        </button>
      </div>
    </div>
  );
}