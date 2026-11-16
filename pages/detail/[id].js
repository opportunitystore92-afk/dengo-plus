import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { firestore } from "../../firebase/firebase";
import { doc, getDoc } from "firebase/firestore";

export default function Detail() {
  const router = useRouter();
  const { id: queryId } = router.query;
  const finalId = queryId ? String(queryId) : null;
  const [video, setVideo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (!finalId) return;
    setLoading(true);
    getDoc(doc(firestore, "posts", String(finalId)))
      .then((snap) => {
        if (!snap.exists()) {
          setNotFound(true);
          setLoading(false);
          return;
        }
        const data = snap.data();
        setVideo({
          id: snap.id,
          title: data.title || data.titulo || data.caption || "Video Dengo",
          titulo: data.title || data.titulo || data.caption || "Video Dengo",
          caption: data.caption || data.title || data.titulo || "",
          description: data.description || data.caption || "",
          url: data.url || data.src || data.videoUrl || "",
          src: data.url || data.src || data.videoUrl || "",
          videoUrl: data.url || data.src || data.videoUrl || "",
          image: data.image || data.thumbnail || data.cover || data.poster || data.thumb || "",
          thumbnail: data.image || data.thumbnail || data.cover || data.poster || data.thumb || "",
          cover: data.cover || data.image || data.thumbnail || "",
          poster: data.poster || data.image || data.thumbnail || "",
        });
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, [finalId]);

  const rawThumb = video?.thumbnail || video?.cover || video?.poster || video?.image || video?.thumbnailUrl || "";
  const thumb = rawThumb
    ? (rawThumb.startsWith("http") ? rawThumb : `https://dengo-plus.pages.dev${rawThumb.startsWith("/") ? "" : "/"}${rawThumb}`)
    : "https://dengo-plus.pages.dev/logo.png";
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
        <meta property="og:url" content={`https://dengo-plus.pages.dev/detail/${finalId}`} />
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
        {loading && <p>A carregar vídeo...</p>}
        {!loading && notFound && <p>Vídeo não encontrado</p>}
        {!loading && video && <p>{video.title || video.caption}</p>}
      </div>
    </>
  );
}