import React from 'react';
import Sidebar from '../components/Sidebar';

export default function FollowingFeed() {
  const followingitems = [];

  return (
    <div className="flex mx-auto max-w-[1150px] w-full pt-[60px]">
      <Sidebar />

      <div className="flex-1 min-h-[calc(100vh-60px)] pb-10">
        <div className="max-w-[620px] mx-auto flex flex-col gap-6 p-4">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-5">
            <h1 className="text-lg font-bold text-gray-900 flex items-center gap-2">
              Feed &quot;A Seguir&quot;
            </h1>
            <p className="text-xs text-gray-500 mt-1">
              Publicações exclusivas dos criadores que segues na plataforma.
            </p>
          </div>

          {followingitems.length > 0 ? (
            followingitems.map((item) => (
              <div key={item.id} className="bg-transparent flex flex-col items-center justify-center relative my-4 w-full">
                <div className="relative flex items-end gap-3 justify-center w-full">
                  {/* Conteúdo do item */}
                </div>
              </div>
            ))
          ) : (
            <div className="flex flex-col items-center justify-center py-20 text-center bg-white rounded-2xl border border-gray-200 p-8 shadow-sm">
              <div className="text-4xl mb-3">👥</div>
              <h3 className="text-base font-bold text-gray-900 mb-1">Ainda não segues ninguém</h3>
              <p className="text-xs text-gray-500 max-w-xs">
                Explora o feed principal para descobrir criadores incríveis e começar a segui-los.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}