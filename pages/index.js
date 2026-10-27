import React, { useState } from 'react';
import Head from 'next/head';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import CreateVideo from '../components/CreateVideo';
import Post from '../components/Post';

export default function Home() {
  const [posts, setPosts] = useState([
    {
      id: 1,
      username: 'dengofficial',
      profileImage: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100',
      caption: 'Bem-vindo ao DENGO PLUS! A nova plataforma de criadores de conteúdo. 🚀🔥 #dengoplus #tech',
      videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-tree-branches-in-the-breeze-1192-large.mp4',
      topic: 'dengoplus',
      timestamp: 'Agora mesmo',
    }
  ]);

  const handleNewVideo = (newPost) => {
    setPosts([newPost, ...posts]);
  };

  return (
    <div className="bg-[#F1F1F2] dark:bg-black min-h-screen font-sans select-none transition-colors">
      <Head>
        <title>DENGO PLUS - Vídeos Curtos</title>
      </Head>

      <Header />

      <div className="flex pt-[60px] justify-center">
        <Sidebar />

        <main className="flex-1 max-w-[690px] px-4 py-6 ml-[240px] md:ml-[240px] sm:ml-[70px]">
          <CreateVideo onVideoCreated={handleNewVideo} />

          <div className="flex flex-col gap-6">
            {posts.map((post) => (
              <Post key={post.id} {...post} />
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}