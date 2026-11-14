import Head from 'next/head';

export default function DetailPage({ video }) {
  const title = video?.titulo || video?.title || 'Dengo Plus';
  const description = video?.descricao || video?.description || 'Vê este vídeo no Dengo Plus';
  const rawThumbnail = video?.thumbnail || '/logo.png';
  const thumbnail = rawThumbnail.startsWith('http') ? rawThumbnail : `https://main.dengo-plus.pages.dev${rawThumbnail}`;

  return (
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
  );
}

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: 'blocking',
  };
}

export async function getStaticProps({ params }) {
  const { id } = params;
  
  // Como o ID vem limpo, podes retornar os dados básicos ou simular o objeto vídeo
  // Se precisares de buscar à base de dados, podes fazê-lo aqui diretamente.
  const video = {
    id,
    titulo: 'Dengo Plus',
    descricao: 'Vê este vídeo no Dengo Plus',
    thumbnail: '/logo.png'
  };

  return {
    props: {
      video,
    },
    revalidate: 60,
  };
}