import Head from 'next/head';

export default function DetailPage({ video }) {
  const title = video?.titulo || video?.title || 'Dengo Plus';
  const description = video?.descricao || video?.description || 'Vê este vídeo no Dengo Plus';
  const rawThumbnail = video?.thumbnail || '/logo.png';
  const thumbnail = rawThumbnail.startsWith('http') ? rawThumbnail : `https://main.dengo-plus.pages.dev${rawThumbnail}`;

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={thumbnail} />
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:image" content={thumbnail} />
      </Head>

      <div className="container" style={{ padding: '20px', color: '#fff', background: '#000', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <h1>{title}</h1>
        <p>{description}</p>
        {thumbnail && (
          <video 
            src={video?.url || thumbnail} 
            controls 
            style={{ width: '100%', maxWidth: '400px', borderRadius: '8px', marginTop: '20px' }} 
          />
        )}
      </div>
    </>
  );
}

export async function getServerSideProps({ params }) {
  const { id } = params;

  // Objeto base do vídeo para a página e para as meta tags do Open Graph
  const video = {
    id,
    titulo: `Vídeo ${id}`,
    descricao: 'Vê este vídeo incrível no Dengo Plus',
    thumbnail: '/logo.png' // Podes alterar para a miniatura real se a tens guardada ou mapeada
  };

  return {
    props: {
      video,
    },
  };
}