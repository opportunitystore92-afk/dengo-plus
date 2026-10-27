import React, { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const router = useRouter();

  const handleAuthSubmit = (e) => {
    e.preventDefault();
    setErrorMessage('');

    if (!email || !password || (!isLogin && !username)) {
      setErrorMessage('Por favor, preenche todos os campos obrigatórios.');
      return;
    }

    // Simulação de autenticação bem-sucedida guardando no localStorage
    const userData = {
      username: isLogin ? email.split('@')[0] : username,
      email: email,
      isLoggedIn: true
    };

    localStorage.setItem('dengo_user_session', JSON.stringify(userData));
    
    // Redirecionar para a página principal ou perfil
    router.push('/');
  };

  return (
    <div className="bg-[#F1F1F2] dark:bg-black min-h-screen flex flex-col items-center justify-center font-sans select-none p-4 transition-colors">
      <Head>
        <title>{isLogin ? 'Entrar' : 'Registar'} - DENGO PLUS</title>
      </Head>

      <div className="bg-white dark:bg-[#1a1a1a] p-8 rounded-3xl shadow-lg border border-gray-200 dark:border-gray-800 w-full max-w-[400px] transition-colors">
        
        {/* Logótipo */}
        <div className="flex flex-col items-center mb-6">
          <Link href="/">
            <div className="flex items-center gap-2 cursor-pointer mb-2">
              <div className="bg-[#FE2C55] text-white font-black px-3 py-1 rounded-xl text-base tracking-wider shadow-md">
                DENGO
              </div>
              <span className="font-extrabold text-base tracking-widest text-gray-900 dark:text-white">PLUS</span>
            </div>
          </Link>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            {isLogin ? 'Entra na tua conta para continuar' : 'Cria uma nova conta de criador'}
          </p>
        </div>

        {errorMessage && (
          <div className="mb-4 p-3 bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900 text-red-600 dark:text-red-400 text-xs rounded-xl text-center font-semibold">
            {errorMessage}
          </div>
        )}

        <form onSubmit={handleAuthSubmit} className="flex flex-col gap-4">
          {!isLogin && (
            <div className="flex flex-col gap-1">
              <label className="text-[11px] font-bold text-gray-700 dark:text-gray-300">Nome de Utilizador</label>
              <input
                type="text"
                placeholder="ex: alves_creator"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 px-4 py-2.5 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-[#FE2C55]"
              />
            </div>
          )}

          <div className="flex flex-col gap-1">
            <label className="text-[11px] font-bold text-gray-700 dark:text-gray-300">Email</label>
            <input
              type="email"
              placeholder="teu@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 px-4 py-2.5 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-[#FE2C55]"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-[11px] font-bold text-gray-700 dark:text-gray-300">Palavra-passe</label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 px-4 py-2.5 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-[#FE2C55]"
            />
          </div>

          <button
            type="submit"
            className="mt-2 bg-[#FE2C55] hover:bg-red-600 text-white font-bold py-3 rounded-xl text-xs transition-all shadow-md cursor-pointer"
          >
            {isLogin ? 'Entrar' : 'Registar'}
          </button>
        </form>

        {/* Alternador entre Login e Registo */}
        <div className="mt-6 text-center text-xs text-gray-500 dark:text-gray-400">
          {isLogin ? 'Ainda não tens conta?' : 'Já tens conta?'}
          <button
            onClick={() => {
              setIsLogin(!isLogin);
              setErrorMessage('');
            }}
            className="ml-1 text-[#FE2C55] font-bold hover:underline cursor-pointer"
          >
            {isLogin ? 'Regista-te' : 'Entra aqui'}
          </button>
        </div>

      </div>
    </div>
  );
}