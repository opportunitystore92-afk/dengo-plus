import Head from 'next/head';

export default function DetailPage({ video }) {
  const title = video?.titulo || video?.title || 'Dengo Plus';
  const description = video?.descricao || 'Vê este vídeo no Dengo Plus';
  const thumbnail = video?.thumbnail || video?.url || '';

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

      <div className="container" style={{ padding: '20px', color: '#fff', background: '#000', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <h1>{title}</h1>
        {thumbnail && (
          <video 
            src={thumbnail} 
            controls 
            style={{ width: '100%', maxWidth: '400px', borderRadius: '8px', marginTop: '20px' }} 
          />
        )}
      </div>
    </>
  );
}

export async function getServerSideProps(context) {
  const { id } = context.query;

  try {
    const res = await fetch(`https://dengo-upload-worker.dnctraderoperation.workers.dev/posts?id=${id}`);
    const data = await res.json();
    const video = data?.post || data || null;

    return {
      props: {
        video,
      },
    };
  } catch (err) {
    return {
      props: {
        video: null,
      },
    };
  }
}