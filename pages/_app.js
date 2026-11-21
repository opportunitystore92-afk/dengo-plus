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
        <meta name="theme-color" content="#000000" />
        <link rel="manifest" href="/manifest.json?v=8" />
        <link rel="apple-touch-icon" href="/icon-512.png?v=8" />
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
            src="/splash-icon.png?v=8"
            alt="Dengo Plus"
            style={{
              display: 'block',
              width: '460px',
              maxWidth: '92vw',
              height: 'auto',
              objectFit: 'contain',
              transform: fadeOut ? 'scale(1.15)' : 'scale(1.35)',
              transition: 'transform 300ms ease',
            }}
          />
        </div>
      )}

      <Component {...pageProps} />
    </>
  );
}