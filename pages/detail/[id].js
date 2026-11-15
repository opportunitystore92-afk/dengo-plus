import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Detail({ video: initialVideo, id }) {
  const router = useRouter();
  const { id: queryId } = router.query;
  // Usa o vídeo que já veio pronto do servidor. Se não vier, busca no cliente como antes
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

  // Se ainda não tem vídeo, mostra carregando sem Head de vídeo
  if (video === null) return <p style={{ color: "#fff", padding: 20 }}>Carregando...</p>;
  if (video === false) return <p style={{ color: "#fff", padding: 20 }}>Vídeo não achado</p>;

  const title = video.title || "Vídeo no Dengo Plus";
  const videoUrl = video.videoUrl || "";
  const thumb = video.thumbnail || "";
  // Garante que a imagem é URL completa, senão o WhatsApp não mostra
  const thumbAbsolute = thumb.startsWith("http") ? thumb : `https://main.dengo-plus.pages.dev${thumb.startsWith("/") ? thumb : "/" + thumb}`;
  const pageUrl = `https://main.dengo-plus.pages.dev/detail/${finalId}`;

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta property="og:title" content={title} />
        <meta property="og:description" content={title} />
        <meta property="og:type" content="video.other" />
        <meta property="og:url" content={pageUrl} />
        {/* A FOTINHA do vídeo que aparece no WhatsApp */}
        {thumb && <meta property="og:image" content={thumbAbsolute} />}
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        {/* O VÍDEO pra dar play no Telegram / Facebook */}
        {videoUrl && <meta property="og:video" content={videoUrl} />}
        {videoUrl && <meta property="og:video:type" content="video/mp4" />}
        {videoUrl && <meta property="og:video:width" content="720" />}
        {videoUrl && <meta property="og:video:height" content="1280" />}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        {thumb && <meta name="twitter:image" content={thumbAbsolute} />}
      </Head>

      <div style={{ background: "#000", minHeight: "100vh", color: "#fff", padding: 20 }}>
        <h1>{video.title}</h1>
        <video src={video.videoUrl} controls poster={video.thumbnail} style={{ width: "100%", maxWidth: 700 }} />
        <div style={{ marginTop: 20, display: "flex", gap: 10 }}>
          <a href={video.videoUrl} download style={{ background: "#25D366", color: "#000", padding: "12px 20px", borderRadius: 8, textDecoration: "none", fontWeight: "bold" }}>Baixar</a>
          <button onClick={() => navigator.clipboard.writeText(window.location.href)} style={{ background: "#fff", color: "#000", padding: "12px 20px", borderRadius: 8, fontWeight: "bold" }}>Copiar link</button>
        </div>
      </div>
    </>
  );
}

// O SEGREDO: busca o vídeo ANTES de entregar a página pro WhatsApp
export async function getServerSideProps(context) {
  const { id } = context.params;
  try {
    const res = await fetch("https://main.dengo-plus.pages.dev/videos.json");
    const videos = await res.json();
    const video = videos.find((x) => String(x.id) === String(id)) || null;
    return { props: { video, id } };
  } catch {
    return { props: { video: null, id } };
  }
}