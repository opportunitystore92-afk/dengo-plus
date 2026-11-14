import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import {
  Grid3X3,
  Lock,
  Heart,
  Settings,
  Camera,
  ArrowLeft,
  X,
  Check,
  UserRound,
  Users
} from 'lucide-react';

export default function ProfilePreview() {
  const [name, setName] = useState('Alves');
  const [bio, setBio] = useState('Bem-vindo ao meu perfil no Dengo Plus!');
  const [tab, setTab] = useState('videos');
  const [editing, setEditing] = useState(false);
  const [draftName, setDraftName] = useState(name);
  const [draftBio, setDraftBio] = useState(bio);
  const [userPosts, setUserPosts] = useState([]);
  const [username, setUsername] = useState('alves_dengo');

  useEffect(() => {
    try {
      const savedSession = localStorage.getItem('dengo_user_session');
      const currentUser = savedSession ? JSON.parse(savedSession) : null;

      if (!currentUser?.username) return;

      setUsername(currentUser.username);

      const savedFeed = localStorage.getItem('dengo_feed_items');
      const allItems = savedFeed ? JSON.parse(savedFeed) : [];

      const myPosts = allItems.filter(
        post => post.username === currentUser.username
      );

      setUserPosts(myPosts);
    } catch (error) {
      console.error('Erro ao carregar vídeos do perfil:', error);
    }
  }, []);

  function saveProfile(e) {
    e.preventDefault();
    setName(draftName.trim() || name);
    setBio(draftBio);
    setEditing(false);
  }

  const tabs = [
    { id: 'videos', label: 'Vídeos', icon: Grid3X3 },
    { id: 'private', label: 'Privados', icon: Lock },
    { id: 'liked', label: 'Curtidos', icon: Heart }
  ];

  return (
    <>
      <Head>
        <title>Meu Perfil — Dengo Plus</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <main className="min-h-screen bg-white text-gray-900 pb-20">
        <header className="sticky top-0 z-30 flex h-14 items-center justify-between border-b bg-white px-4">
          <button aria-label="Voltar" onClick={() => window.history.back()}>
            <ArrowLeft size={23} />
          </button>

          <div className="flex items-center gap-1">
            <span className="rounded-md bg-[#FE2C55] px-2 py-1 text-sm font-black text-white">
              DENGO
            </span>
            <span className="text-sm font-black tracking-widest">PLUS</span>
          </div>

          <button aria-label="Configurações" onClick={() => alert('Configurações serão integradas posteriormente.')}>
            <Settings size={22} />
          </button>
        </header>

        <section className="mx-auto max-w-xl px-5 pt-7">
          <div className="flex items-center gap-5">
            <div className="relative flex h-24 w-24 shrink-0 items-center justify-center rounded-full border-2 border-[#FE2C55] bg-pink-50 text-4xl font-black text-[#FE2C55]">
              {name.charAt(0).toUpperCase()}
              <span className="absolute bottom-0 right-0 rounded-full border-2 border-white bg-[#FE2C55] p-1 text-white">
                <Camera size={14} />
              </span>
            </div>

            <div className="min-w-0">
              <h1 className="truncate text-xl font-bold">{name}</h1>
              <p className="mt-1 text-sm text-gray-500">@{username}</p>
              <p className="mt-2 text-xs text-gray-400">Perfil de demonstração</p>
            </div>
          </div>

          <div className="mt-7 grid grid-cols-3 border-y border-gray-100 py-4 text-center">
            <div>
              <strong className="block text-lg">{userPosts.length}</strong>
              <span className="text-xs text-gray-500">Publicações</span>
            </div>
            <div>
              <strong className="block text-lg">0</strong>
              <span className="text-xs text-gray-500">Seguidores</span>
            </div>
            <div>
              <strong className="block text-lg">0</strong>
              <span className="text-xs text-gray-500">Seguindo</span>
            </div>
          </div>

          <div className="py-4">
            <p className="whitespace-pre-wrap text-sm">{bio}</p>
          </div>

          <button
            onClick={() => {
              setDraftName(name);
              setDraftBio(bio);
              setEditing(true);
            }}
            className="w-full rounded-lg border border-gray-200 py-2.5 text-sm font-bold transition hover:bg-gray-50"
          >
            Editar perfil
          </button>

          <div className="mt-7 grid grid-cols-3 border-b border-gray-200">
            {tabs.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setTab(id)}
                className={`flex flex-col items-center gap-2 border-b-2 py-3 text-xs font-semibold ${
                  tab === id
                    ? 'border-[#FE2C55] text-[#FE2C55]'
                    : 'border-transparent text-gray-400'
                }`}
              >
                <Icon size={21} />
                {label}
              </button>
            ))}
          </div>

          <div className="mt-5 grid grid-cols-3 gap-2">
            {tab === 'videos' && userPosts.map((post) => (
              <div key={post.id} className="aspect-[9/16] overflow-hidden rounded-lg bg-black">
                <video
                  src={post.videoUrl || post.mediaUrl}
                  controls
                  playsInline
                  className="h-full w-full object-cover"
                />
              </div>
            ))}

            {tab === 'videos' && userPosts.length === 0 && (
              <p className="col-span-3 py-12 text-center text-sm text-gray-400">
                Você ainda não publicou vídeos.
              </p>
            )}

            {tab === 'private' && (
              <p className="col-span-3 py-12 text-center text-sm text-gray-400">
                Seus vídeos privados aparecerão aqui.
              </p>
            )}

            {tab === 'liked' && (
              <p className="col-span-3 py-12 text-center text-sm text-gray-400">
                Seus vídeos curtidos aparecerão aqui.
              </p>
            )}
          </div>
        </section>

        <nav className="fixed bottom-0 left-0 right-0 z-30 flex h-16 items-center justify-around border-t border-gray-200 bg-white">
          <button aria-label="Início" onClick={() => window.location.href = '/'}>
            <Grid3X3 className="text-gray-500" />
          </button>
          <button aria-label="Amigos">
            <Users className="text-gray-500" />
          </button>
          <button aria-label="Criar publicação" onClick={() => window.location.href = '/'}>
            <span className="rounded-lg bg-[#FE2C55] px-4 py-1 text-2xl font-bold text-white">+</span>
          </button>
          <button aria-label="Caixa">
            <Heart className="text-gray-500" />
          </button>
          <button aria-label="Perfil">
            <UserRound className="text-[#FE2C55]" />
          </button>
        </nav>

        {editing && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
            <form onSubmit={saveProfile} className="w-full max-w-md rounded-2xl bg-white p-5 shadow-xl">
              <div className="mb-5 flex items-center justify-between">
                <h2 className="font-bold">Editar perfil</h2>
                <button type="button" onClick={() => setEditing(false)}>
                  <X size={22} />
                </button>
              </div>

              <label className="mb-1 block text-xs font-semibold">Nome</label>
              <input
                value={draftName}
                onChange={e => setDraftName(e.target.value)}
                maxLength={50}
                className="mb-4 w-full rounded-lg border border-gray-200 p-3 text-sm outline-none focus:border-[#FE2C55]"
              />

              <label className="mb-1 block text-xs font-semibold">Biografia</label>
              <textarea
                value={draftBio}
                onChange={e => setDraftBio(e.target.value)}
                maxLength={160}
                rows={4}
                className="w-full resize-none rounded-lg border border-gray-200 p-3 text-sm outline-none focus:border-[#FE2C55]"
              />

              <button
                type="submit"
                className="mt-5 flex w-full items-center justify-center gap-2 rounded-lg bg-[#FE2C55] py-3 text-sm font-bold text-white"
              >
                <Check size={18} />
                Salvar alterações
              </button>
            </form>
          </div>
        )}
      </main>
    </>
  );
}