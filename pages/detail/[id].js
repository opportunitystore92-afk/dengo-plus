import Link from "next/link";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const WORKER_URL = 'https://dengo-upload-worker.dnctraderoperation.workers.dev';

export default function Detail() {
  const router = useRouter();
  const [video, setVideo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [finalId, setFinalId] = useState(null);
  const [debug, setDebug] = useState("a iniciar - SEM Firebase, a usar Worker...");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const parts = window.location.pathname.split("/").filter(Boolean);
      const idFromUrl = parts[parts.length - 1];
      if (idFromUrl && idFromUrl !== "detail") setFinalId(String(idFromUrl));
    }
    if (router.query?.id) setFinalId(String(router.query.id));
  }, [router.query]);

  useEffect(() => {
    if (!finalId) return;
    setDebug("A buscar no Worker: " + WORKER_URL + "/posts | id procurado: " + finalId);

    // 1. Tenta buscar 1 post direto
    fetch(`${WORKER_URL}/posts/${encodeURIComponent(finalId)}`)
      .then(async (r) => {
        if (!r.ok) throw new Error("posts/id deu HTTP " + r.status);
        const one = await r.json();
        const v = one?.post || one?.data || one;
        if (v && (v.videoUrl || v.video_url || v.mediaUrl)) {
          setDebug("Achou direto em /posts/" + finalId);
          setVideo({ id: String(v.id || finalId), username: v.username || "usuario", caption: v.caption || "", videoUrl: v.videoUrl || v.video_url || v.mediaUrl || "", avatar: v.avatar || v.profileImage || "/default-avatar.png" });
          setLoading(false);
          return true;
        }
        throw new Error("posts/id nao trouxe videoUrl");
      })
      .catch(() => {
        // 2. Se nao deu, busca a lista toda igual a home faz e procura o id
        setDebug("Nao achou direto, a buscar lista toda igual a home...");
        return fetch(`${WORKER_URL}/posts`)
          .then(async (r) => {
            if (!r.ok) throw new Error("lista /posts deu HTTP " + r.status);
            const data = await r.json();
            const list = Array.isArray(data) ? data : (data.posts || data.data || []);
            setDebug("Lista veio com " + list.length + " videos. A procurar id " + finalId + " | ids: " + list.slice(0,5).map(p=>p.id).join(", "));
            const found = list.find((p) => String(p.id) === String(finalId));
            if (!found) {
              setDebug("NAO ACHOU na lista. Total " + list.length + ". Esse id nao existe no Worker. Ids primeiros: " + list.slice(0,5).map(p=>p.id).join(", "));
              setLoading(false);
              return;
            }
            setDebug("ACHOU na lista! caption: " + (found.caption || ""));
            setVideo({ id: String(found.id), username: found.username || "usuario", caption: found.caption || "", videoUrl: found.videoUrl || found.video_url || found.mediaUrl || "", avatar: found.avatar || found.profileImage || "/default-avatar.png" });
            setLoading(false);
          })
          .catch((err) => {
            setDebug("ERRO Worker: " + err.message);
            setLoading(false);
          });
      });
  }, [finalId]);

  const videoUrl = video?.videoUrl || "";
  const thumb = video?.avatar || "https://dengo-plus.pages.dev/logo.png";

  return (
    <>
      <Head>
<title>{video?.caption || "Dengo Plus"} - Dengo Plus</title>
<meta property="og:title" content={video?.caption || "Dengo Plus"} />
<meta property="og:description" content={`Olha esse vídeo no Dengo: ${video?.caption || ""}`} />
<meta property="og:image" content={thumb} />
<meta property="og:url" content={`https://dengo-plus.pages.dev/detail/${finalId}`} />
<meta property="og:type" content="website" />
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:image" content={thumb} />
</Head>
      <div style={{ maxWidth: 800, margin: "0 auto", padding: 16, fontFamily: "sans-serif", color: "#000", background: "#fff", minHeight: "100vh" }}>
        
        {loading && <p style={{marginTop: 16}}>A carregar vídeo... ID: {finalId}</p>}
        {!loading && !video && <p style={{marginTop: 16}}>Vídeo não encontrado no Worker - ID: {finalId}<br/><Link href="/">← Voltar para a home</Link></p>}
        {!loading && video && (
          <>
            <h2 style={{ fontSize: 20 }}>@{video.username}</h2>
            <p>{video.caption}</p>
            {videoUrl ? (
              <video src={videoUrl} controls autoPlay playsInline style={{ width: "100%", background: "#000", borderRadius: 8 }} />
            ) : <p>Sem URL de vídeo</p>}
           <p style={{marginTop: 12}}><Link href="/">← Voltar</Link></p>
          </>
        )}
      </div>
    </>
  );
}