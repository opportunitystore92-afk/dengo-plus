import { useRouter } from 'next/router';
import Head from 'next/head';

export default function Detail({ postData }) {
  const router = useRouter();
  
  const title = postData?.caption || postData?.title || "Dengo Plus - Vídeo Exclusivo";
  const thumbnail = postData?.thumbnail_url || postData?.thumbnail || postData?.image_url || "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800";

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta property="og:title" content={title} />
        <meta property="og:image" content={thumbnail} />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:image" content={thumbnail} />
      </Head>

      <div className="w-full min-h-screen bg-black text-white flex flex-col items-center justify-center p-4">
        <h1 className="text-xl font-bold mb-4">{title}</h1>
        {thumbnail && (
          <img src={thumbnail} alt="Thumbnail" className="max-w-md rounded shadow-lg" />
        )}
      </div>
    </>
  );
}

export async function getServerSideProps(context) {
  const { query, req } = context;
  const id = query.id;

  let postData = null;

  try {
    const env = req?.env || process.env;
    if (env && env.DB) {
      const stmt = env.DB.prepare("SELECT * FROM posts WHERE id = ?");
      postData = await stmt.bind(id).first();
    }
  } catch (err) {
    // Fallback silencioso
  }

  return {
    props: {
      postData: postData || null,
    },
  };
}