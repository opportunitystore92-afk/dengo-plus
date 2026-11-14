import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Detail() {
  const router = useRouter();
  const { id } = router.query;
  const [video, setVideo] = useState(null);

  useEffect(() => {
    if (!id) return;
    fetch("https://main.dengo-plus.pages.dev/videos.json")
      .then((r) => r.json())
      .then((videos) => {
        const v = videos.find((x) => String(x.id) === String(id));
        setVideo(v || false);
      });
  }, [id]);

  if (video === null) return <p style={{ color: "#fff", padding: 20 }}>Carregando...</p>;
  if (video === false) return <p style={{ color: "#fff", padding: 20 }}>Vídeo não achado</p>;

  return (
    <div style={{ background: "#000", minHeight: "100vh", color: "#fff", padding: 20 }}>
      <h1>{video.title}</h1>
      <video src={video.videoUrl} controls poster={video.thumbnail} style={{ width: "100%", maxWidth: 700 }} />
      <div style={{ marginTop: 20, display: "flex", gap: 10 }}>
        <a href={video.videoUrl} download style={{ background: "#25D366", color: "#000", padding: "12px 20px", borderRadius: 8, textDecoration: "none", fontWeight: "bold" }}>Baixar</a>
        <button onClick={() => navigator.clipboard.writeText(window.location.href)} style={{ background: "#fff", color: "#000", padding: "12px 20px", borderRadius: 8, fontWeight: "bold" }}>Copiar link</button>
      </div>
    </div>
  );
}