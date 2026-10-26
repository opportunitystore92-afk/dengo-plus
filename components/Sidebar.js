import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function Sidebar() {
  const router = useRouter();

  const menuItems = [
    { label: 'Para Si', path: '/', icon: '🏠' },
    { label: 'Explorar', path: '/explore', icon: '🔍' },
    { label: 'A Seguir', path: '/following', icon: '👥' },
    { label: 'O meu Perfil', path: '/profile', icon: '👤' },
    { label: 'LIVE', path: '/', icon: '🎥' },
  ];

  return (
    <div className="w-[240px] hidden md:flex flex-col gap-6 p-4 sticky top-[60px] h-[calc(100vh-60px)] border-r border-gray-200 dark:border-gray-800 bg-white dark:bg-[#121212] transition-colors">
      <div className="flex flex-col gap-1">
        {menuItems.map((item) => {
          const isActive = router.pathname === item.path;
          return (
            <Link key={item.label} href={item.path}>
              <div
                className={`flex items-center gap-3 p-3 rounded-xl font-bold text-sm cursor-pointer transition-all ${
                  isActive
                    ? 'text-[#FE2C55] bg-red-50 dark:bg-red-950/40'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                }`}
              >
                <span className="text-lg">{item.icon}</span>
                <span>{item.label}</span>
              </div>
            </Link>
          );
        })}
      </div>

      <hr className="border-gray-100 dark:border-gray-800" />

      <div className="px-3">
        <p className="text-xs font-semibold text-gray-400 dark:text-gray-500 mb-3">Contas sugeridas</p>
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2.5 cursor-pointer hover:opacity-80">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-yellow-400 to-red-500 flex items-center justify-center text-white text-xs font-bold">
              D
            </div>
            <div>
              <p className="text-xs font-bold text-gray-800 dark:text-gray-200 leading-none">Dengo Official</p>
              <p className="text-[10px] text-gray-400">@dengoplus</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}