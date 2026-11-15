import Head from 'next/head';
import '../styles/globals.css';

export default function MyApp({ Component, pageProps }) {
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
      <Component {...pageProps} />
    </>
  );
}