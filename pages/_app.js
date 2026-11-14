import Head from 'next/head';
import '../styles/globals.css';

export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />
        <title>Dengo Plus - A tua rede social de vídeos</title>
        <meta name="description" content="Vê os vídeos mais quentes e divertidos no Dengo Plus." />
        
        {/* Open Graph para WhatsApp, Facebook e Telegram */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Dengo Plus" />
        <meta property="og:description" content="Vê os vídeos mais quentes e divertidos no Dengo Plus." />
        <meta property="og:image" content="https://main.dengo-plus.pages.dev/logo.png" />
        <meta property="og:url" content="https://main.dengo-plus.pages.dev" />

        {/* Twitter Cards */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Dengo Plus" />
        <meta name="twitter:description" content="Vê os vídeos mais quentes e divertidos no Dengo Plus." />
        <meta name="twitter:image" content="https://main.dengo-plus.pages.dev/logo.png" />
      </Head>
      <Component {...pageProps} />
    </>
  );
}