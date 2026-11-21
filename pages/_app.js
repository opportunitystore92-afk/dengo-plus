import { useEffect, useState } from 'react';
import Head from 'next/head';
import '../styles/globals.css';

export default function MyApp({ Component, pageProps }) {
  const [showSplash, setShowSplash] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const fadeTimer = setTimeout(() => {
      setFadeOut(true);
    }, 900);

    const hideTimer = setTimeout(() => {
      setShowSplash(false);
    }, 1200);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(hideTimer);
    };
  }, []);

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />
        <title>Dengo Plus - A tua rede social de vídeos</title>
        <meta name="description" content="Vê os vídeos mais quentes e divertidos no Dengo Plus." />

        {/* NÃO colocar og:image / twitter:image aqui!
            Se colocar aqui, ele manda pra TODAS as páginas e mata a prévia do vídeo.
            Cada página (home, detail) define a sua própria. */}
      </Head>

      {showSplash && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 99999,
            backgroundColor: '#000000',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            opacity: fadeOut ? 0 : 1,
            transition: 'opacity 300ms ease',
            pointerEvents: 'none',
          }}
        >
          <img
            src="/splash-icon.png"
            alt="Dengo Plus"
            style={{
              width: '130px',
              height: 'auto',
              objectFit: 'contain',
              transform: fadeOut ? 'scale(0.96)' : 'scale(1)',
              transition: 'transform 300ms ease',
            }}
          />
        </div>
      )}

      <Component {...pageProps} />
    </>
  );
}