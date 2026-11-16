export const runtime = 'edge';
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export async function getServerSideProps(context) {
  const { id } = context.params;
  try {
    const res = await fetch("https://main.dengo-plus.pages.dev/videos.json");
    const videos = await res.json();
    const video = videos.find((x) => String(x.id) === String(id)) || null;
    return { props: { video, id: String(id) } };
  } catch (e) {
    return { props: { video: null, id: String(id) } };
  }
}

export default function Detail({ video: initialVideo, id }) {
  const router = useRouter();
  const { id: queryId } = router.query;
  const [video, setVideo] = useState(initialVideo || null);
  const finalId = id || queryId;

  useEffect(() => {
    if (video || !finalId) return;
    fetch("https://main.dengo-plus.pages.dev/videos.json")
      .then((r) => r.json())
      .then((videos) => {
        const v = videos.find((x) => String(x.id) === String(finalId));
        setVideo(v || false);
      });
  }, [finalId, video]);

 const rawThumb = video?.thumbnail || video?.cover || video?.poster || video?.image || video?.thumbnailUrl || "";
const thumb = rawThumb
  ? (rawThumb.startsWith("http") ? rawThumb : `https://main.dengo-plus.pages.dev${rawThumb.startsWith("/") ? "" : "/"}${rawThumb}`)
  : "https://main.dengo-plus.pages.dev/logo.png";
const title = video?.title || video?.caption || "Dengo Plus";
const desc = video?.caption || video?.description || "Vê este vídeo no Dengo Plus";
const videoUrl = video?.videoUrl || video?.url || video?.src || "";

return (
  <>
    <Head>
      <title>{title} - Dengo Plus</title>
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={desc} />
      <meta property="og:url" content={`https://main.dengo-plus.pages.dev/detail/${finalId}`} />
      <meta property="og:image" content={thumb} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={desc} />
      <meta name="twitter:image" content={thumb} />
      {videoUrl ? <meta property="og:video" content={videoUrl} /> : null}
    </Head>
      <div>
        {video === false && <p>Vídeo não encontrado</p>}
        {video && <p>{video.title || video.caption}</p>}
      </div>
    </>
  );
}