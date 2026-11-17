import Link from "next/link";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const WORKER_URL = 'https://dengo-upload-worker.dnctraderoperation.workers.dev';

export async function getServerSideProps(context) {
  const id = context.params?.id || context.query?.id || "";
  let serverVideo = null;
  try {
    const r = await fetch(`${WORKER_URL}/posts/${encodeURIComponent(id)}`);
    if (r.ok) {
      const one = await r.json();
      const v = one?.post || one?.data || one;
      if (v && (v.videoUrl || v.video_url || v.mediaUrl)) {
        serverVideo = {
          id: String(v.id || id),
          username: v.username || "usuario",
          caption: v.caption || "",
          videoUrl: v.videoUrl || v.video_url || v.mediaUrl || "",
          thumbnailUrl: v.thumbnailUrl || v.thumbnail_url || v.thumb || "",
          avatar: v.avatar || v.profileImage || "/default-avatar.png",
        };
      }
    }
    if (!serverVideo) {
      const r2 = await fetch(`${WORKER_URL}/posts`);
      if (r2.ok) {
        const data = await r2.json();
        const list = Array.isArray(data) ? data : (data.posts || data.data || []);
        const found = list.find((p) => String(p.id) === String(id));
        if (found) {
          serverVideo = {
            id: String(found.id),
            username: found.username || "usuario",
            caption: found.caption || "",
            videoUrl: found.videoUrl || found.video_url || found.mediaUrl || "",
            thumbnailUrl: found.thumbnailUrl || found.thumbnail_url || found.thumb || "",
            avatar: found.avatar || found.profileImage || "/default-avatar.png",
          };
        }
      }
    }
  } catch (e) {}
  return { props: { serverVideo, serverId: String(id) } };
}

export default function Detail({ serverVideo, serverId }) {
  const router = useRouter();
  const [video, setVideo] = useState(serverVideo || null);
  const [loading, setLoading] = useState(!serverVideo);
  const [finalId, setFinalId] = useState(serverId || null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const parts = window.location.pathname.split("/").filter(Boolean);
      const idFromUrl = parts[parts.length - 1];
      if (idFromUrl && idFromUrl !== "detail") setFinalId(String(idFromUrl));
    }
    if (router.query?.id) setFinalId(String(router.query.id));
  }, [router.query]);

  useEffect(() => {
    if (video || !finalId) return;
    fetch(`${WORKER_URL}/posts/${encodeURIComponent(finalId)}`)
      .then(async (r) => {
        if (!r.ok) throw new Error("posts/id deu HTTP " + r.status);
        const one = await r.json();
        const v = one?.post || one?.data || one;
        if (v && (v.videoUrl || v.video_url || v.mediaUrl)) {
          setVideo({ id: String(v.id || finalId), username: v.username || "usuario", caption: v.caption || "", videoUrl: v.videoUrl || v.video_url || v.mediaUrl || "", thumbnailUrl: v.thumbnailUrl || v.thumbnail_url || v.thumb || "", avatar: v.avatar || v.profileImage || "/default-avatar.png" });
          setLoading(false);
          return true;
        }
        throw new Error("posts/id nao trouxe videoUrl");
      })
      .catch(() => {
        return fetch(`${WORKER_URL}/posts`)
          .then(async (r) => {
            const data = await r.json();
            const list = Array.isArray(data) ? data : (data.posts || data.data || []);
            const found = list.find((p) => String(p.id) === String(finalId));
            if (!found) { setLoading(false); return; }
            setVideo({ id: String(found.id), username: found.username || "usuario", caption: found.caption || "", videoUrl: found.videoUrl || found.video_url || found.mediaUrl || "", thumbnailUrl: found.thumbnailUrl || found.thumbnail_url || found.thumb || "", avatar: found.avatar || found.profileImage || "/default-avatar.png" });
            setLoading(false);
          })
          .catch(() => setLoading(false));
      });
  }, [finalId, video]);

  const videoUrl = video?.videoUrl || "";
  const thumb = video?.thumbnailUrl || "https://dengo-plus.pages.dev/logo.png";

  return (
    <>
      <Head>
        <title>{video?.caption || "Dengo Plus"} - Dengo Plus</title>
        <meta property="og:title" content={video?.caption || "Dengo Plus"} />
        <meta property="og:description" content={`Olha esse vídeo no Dengo: ${video?.caption || ""}`} />
        <meta property="og:image" content={thumb} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
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