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
  const [debug, setDebug] = useState("a iniciar...");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const parts = window.location.pathname.split("/").filter(Boolean);
      const idFromUrl = parts[parts.length - 1];
      if (idFromUrl && idFromUrl !== "detail") {
        setFinalId(String(idFromUrl));
        setDebug("ID achado na URL: " + idFromUrl);
        return;
      }
    }
    if (router.query?.id) setFinalId(String(router.query.id));
  }, [router.query]);

  useEffect(() => {
    if (!finalId) return;
    setDebug("A buscar no Firebase: posts / " + finalId);
    getDoc(doc(firestore, "posts", String(finalId)))
      .then((snap) => {
        if (!snap.exists()) {
          setDebug("Firebase respondeu: documento NAO EXISTE em posts/" + finalId);
          setNotFound(true);
          setLoading(false);
          return;
        }
        const data = snap.data();
        setDebug("Firebase respondeu: achou! campos: " + Object.keys(data).join(", "));
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
        setDebug("ERRO Firebase: " + (err?.message || String(err)) + " | code: " + err?.code);
        setLoading(false);
      });
  }, [finalId]);

  const thumb = video?.thumbnail || video?.image || "https://dengo-plus.pages.dev/logo.png";
  const title = video?.title || "Dengo Plus";
  const videoUrl = video?.videoUrl || video?.url || video?.src || "";

  return (
    <>
      <Head><title>{title} - Dengo Plus</title></Head>
      <div style={{ maxWidth: 800, margin: "0 auto", padding: 16, fontFamily: "sans-serif", color: "#000", background: "#fff", minHeight: "100vh" }}>
        <div style={{ background: "#ffeeba", padding: 12, borderRadius: 8, fontSize: 13, wordBreak: "break-word" }}>
          <b>DEBUG:</b><br/>{debug}<br/>
          ID: {finalId || "nenhum"}<br/>
          Loading: {String(loading)} | NotFound: {String(notFound)}
        </div>
        {loading && <p style={{marginTop: 16}}>A carregar vídeo... ID: {finalId}</p>}
        {!loading && notFound && <p style={{marginTop: 16}}>Vídeo não encontrado - ID: {finalId}</p>}
        {!loading && video && (
          <>
            <h2 style={{ fontSize: 20 }}>{video.title}</h2>
            {videoUrl ? (
              <video src={videoUrl} controls autoPlay playsInline style={{ width: "100%", background: "#000", borderRadius: 8 }} poster={thumb} />
            ) : (
              <p>Sem URL de vídeo neste post - videoUrl vazio</p>
            )}
            {video.caption ? <p>{video.caption}</p> : null}
          </>
        )}
      </div>
    </>
  );
}