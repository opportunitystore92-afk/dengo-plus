import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { firestore } from "../../firebase/firebase";
import { doc, getDoc } from "firebase/firestore";

export async function getServerSideProps(context) {
  const { id } = context.params;
  try {
    const snap = await getDoc(doc(firestore, "posts", String(id)));
    if (!snap.exists()) {
      return { props: { video: null, id: String(id) } };
    }
    const data = snap.data();
    const video = {
      id: snap.id,
      title: data.title || data.titulo || data.caption || "Video Dengo",
      titulo: data.title || data.titulo || data.caption || "Video Dengo",
      caption: data.caption || data.title || data.titulo || "",
      url: data.url || data.src || data.videoUrl || "",
      src: data.url || data.src || data.videoUrl || "",
      image: data.image || data.thumbnail || data.cover || data.poster || data.thumb || "",
      thumbnail: data.image || data.thumbnail || data.cover || data.poster || data.thumb || "",
    };
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
  getDoc(doc(firestore, "posts", String(finalId)))
    .then((snap) => {
      if (!snap.exists()) return;
      const data = snap.data();
      setVideo({
        id: snap.id,
        title: data.title || data.titulo || data.caption || "Video Dengo",
        url: data.url || data.src || data.videoUrl || "",
        image: data.image || data.thumbnail || data.cover || "",
        thumbnail: data.image || data.thumbnail || data.cover || "",
      });
    })
    .catch(() => {});
}, [finalId]);

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