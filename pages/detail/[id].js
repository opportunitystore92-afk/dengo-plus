import Link from "next/link";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const WORKER_URL = 'https://dengo-upload-worker.dnctraderoperation.workers.dev';

function getLoggedUser() {
  if (typeof window === "undefined") return null;
  const keys = ["dengoo_user", "dengo_user", "dengo_user_session"];
  for (const key of keys) {
    try {
      const raw = localStorage.getItem(key);
      if (!raw || raw === "null" || raw === "undefined") continue;
      const parsed = JSON.parse(raw);
      if (parsed && (parsed.username || parsed.name || parsed.email)) {
        return parsed;
      }
    } catch (_) {}
  }
  return null;
}

export default function Detail() {
  const router = useRouter();
  const [video, setVideo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [finalId, setFinalId] = useState(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const user = getLoggedUser();
    if (user) {
      localStorage.removeItem("dengo_auth_prompted_once");
      return;
    }
    const alreadyPrompted = localStorage.getItem("dengo_auth_prompted_once");
    if (!alreadyPrompted && window.location.pathname !== "/auth/signin") {
      localStorage.setItem("dengo_auth_prompted_once", "1");
      localStorage.setItem(
        "dengo_voltar_para",
        window.location.pathname + window.location.search
      );
      window.location.href = "/auth/signin";
    }
  }, []);

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
    fetch(`${WORKER_URL}/posts/${encodeURIComponent(finalId)}`)
      .then(async (r) => {
        if (!r.ok) throw new Error("posts/id deu HTTP " + r.status);
        const one = await r.json();
        const v = one?.post || one?.data || one;
        if (v && (v.videoUrl || v.video_url || v.mediaUrl)) {
          setVideo({
            id: String(v.id || finalId),
            username: v.username || "usuario",
            caption: v.caption || "",
            videoUrl: v.videoUrl || v.video_url || v.mediaUrl || "",
            thumbnailUrl: v.thumbnailUrl || v.thumbnail_url || v.thumb || "",
            avatar: v.avatar || v.profileImage || "/default-avatar.png"
          });
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
            setVideo({
              id: String(found.id),
              username: found.username || "usuario",
              caption: found.caption || "",
              videoUrl: found.videoUrl || found.video_url || found.mediaUrl || "",
              thumbnailUrl: found.thumbnailUrl || found.thumbnail_url || found.thumb || "",
              avatar: found.avatar || found.profileImage || "/default-avatar.png"
            });
            setLoading(false);
          })
          .catch(() => setLoading(false));
      });
  }, [finalId]);

  const requireAuth = (actionCallback) => {
    const user = getLoggedUser();
    if (!user) {
      if (typeof window !== "undefined") {
        localStorage.setItem("dengo_voltar_para", window.location.pathname + window.location.search);
        window.location.href = "/auth/signin";
      }
      return;
    }
    if (typeof actionCallback === "function") {
      actionCallback(user);
    }
  };

  const handleShare = async () => {
    const shareUrl = typeof window !== "undefined"
      ? window.location.href
      : `https://dengo-plus.pages.dev/detail/${finalId}`;
    try {
      if (navigator.share) {
        await navigator.share({
          title: video?.caption || "Dengo Plus",
          url: shareUrl,
        });
        return;
      }
    } catch (_) {}
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (_) {}
  };

  const videoUrl = video?.videoUrl || "";
  const thumb = video?.thumbnailUrl || "https://dengo-plus.pages.dev/logo.png";

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
        {!loading && !video && <p style={{marginTop: 16}}>Vídeo não encontrado - ID: {finalId}<br/><Link href="/">← Voltar para a home</Link></p>}
        {!loading && video && (
          <>
            <h2 style={{ fontSize: 20 }}>@{video.username}</h2>
            <p>{video.caption}</p>
            {videoUrl ? <video src={videoUrl} controls autoPlay playsInline style={{ width: "100%", background: "#000", borderRadius: 8 }} /> : <p>Sem URL de vídeo</p>}
            <div style={{ marginTop: 12, display: "flex", gap: 12, alignItems: "center" }}>
              <button type="button" onClick={handleShare} style={{ padding: "8px 14px", cursor: "pointer" }}>
                {copied ? "Link copiado!" : "Compartilhar"}
              </button>
              <Link href="/">← Voltar</Link>
            </div>
          </>
        )}
      </div>
    </>
  );
}