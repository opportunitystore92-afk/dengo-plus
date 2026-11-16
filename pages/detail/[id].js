import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { firestore } from "../../firebase/firebase";
import { doc, getDoc } from "firebase/firestore";

export default function Detail() {
  const router = useRouter();
  const [video, setVideo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [finalId, setFinalId] = useState(null);

  // Pega o ID da URL direto, não depende do router.query
  useEffect(() => {
    if (typeof window !== "undefined") {
      const parts = window.location.pathname.split("/").filter(Boolean);
      const idFromUrl = parts[parts.length - 1];
      if (idFromUrl && idFromUrl !== "detail") {
        setFinalId(String(idFromUrl));
        return;
      }
    }
    if (router.query?.id) setFinalId(String(router.query.id));
  }, [router.query]);

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
          caption: data.caption || data.title || data.titulo || "",
          description: data.description || data.caption || "",
          url: data.url || data.src || data.videoUrl || "",
          src: data.url || data.src || data.videoUrl || "",
          videoUrl: data.url || data.src || data.videoUrl || "",
          image: data.image || data.thumbnail || data.cover || data.poster || data.thumb || "",
          thumbnail: data.image || data.thumbnail || data.cover || data.poster || data.thumb || "",
        });
        setLoading(false);
      })
      .catch((err) => {
        console.log("Erro firestore:", err);
        setLoading(false);
      });
  }, [finalId]);

  const rawThumb = video?.thumbnail || video?.image || "";
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
        <meta property="og:title" content={title} />
        <meta property="og:description" content={desc} />
        <meta property="og:image" content={thumb} />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={desc} />
        <meta name="twitter:image" content={thumb} />
      </Head>
      <div style={{ maxWidth: 800, margin: "0 auto", padding: 16, fontFamily: "sans-serif", color: "#000", background: "#fff", minHeight: "100vh" }}>
        {loading && <p>A carregar vídeo... ID: {finalId || "a procurar..."}</p>}
        {!loading && notFound && <p>Vídeo não encontrado - ID: {finalId}</p>}
        {!loading && video && (
          <>
            <h2 style={{ fontSize: 20 }}>{video.title}</h2>
            {videoUrl ? (
              <video src={videoUrl} controls autoPlay playsInline style={{ width: "100%", background: "#000", borderRadius: 8 }} poster={thumb} />
            ) : (
              <p>Sem URL de vídeo neste post</p>
            )}
            {video.caption ? <p>{video.caption}</p> : null}
          </>
        )}
      </div>
    </>
  );
}