export async function onRequest(context) {
  const userAgent = context.request.headers.get("User-Agent") || "";
  const isBot = /facebookexternalhit|WhatsApp|Twitterbot|facebookcatalog|Meta|TelegramBot|LinkedInBot|Discordbot|Slackbot/i.test(userAgent);

  if (!isBot) {
    return context.next();
  }

  const id = context.params.id;
  const origin = new URL(context.request.url).origin;
  const WORKER_URL = "https://dengo-upload-worker.dnctraderoperation.workers.dev";

  let video = null;
  let videoUrl = "";

  // Tenta 1: Lista do Worker - onde estão os teus vídeos reais
  try {
    const res = await fetch(`${WORKER_URL}/`);
    if (res.ok) {
      const data = await res.json();
      const list = Array.isArray(data) ? data : data.files || data.posts || [];
      // O id do teu link é tipo 1794579844412-588522, a key é tipo 17928...mp4
      // Então procuramos se a key começa com o id ou contém o id
      const found = list.find((v) => {
        const key = String(v.key || v.id || "");
        return key.includes(String(id)) || String(id).includes(key.replace(".mp4", ""));
      });
      if (found) {
        const key = found.key || found.id;
        videoUrl = `${WORKER_URL}/${key}`;
        video = { title: key, videoUrl };
      }
    }
  } catch {}

  // Tenta 2: videos.json - vídeos antigos
  if (!video) {
    try {
      const res2 = await fetch(`${origin}/videos.json`);
      if (res2.ok) {
        const data2 = await res2.json();
        const list2 = Array.isArray(data2) ? data2 : data2.posts || data2.videos || [];
        video = list2.find((v) => String(v.id) === String(id));
        if (video) {
          videoUrl = video.videoUrl || video.video || video.src || video.url || "";
          if (videoUrl && !videoUrl.startsWith("http")) {
            videoUrl = videoUrl.startsWith("/") ? origin + videoUrl : origin + "/" + videoUrl;
          }
        }
      }
    } catch {}
  }

  const esc = (s) => String(s || "").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const title = video ? (video.title || video.caption || "Vídeo no Dengo Plus") : "Dengo Plus";
  const desc = video ? (video.description || video.caption || "Assiste esse vídeo no Dengo Plus") : "Assiste vídeos curtos no Dengo Plus";

  let thumb = video ? (video.thumbnail || video.cover || video.poster || video.image || "") : "";
  if (thumb && !thumb.startsWith("http")) {
    thumb = thumb.startsWith("/") ? origin + thumb : origin + "/" + thumb;
  }
  // Se não tem miniatura, usa a capa genérica - nunca dá 404
  if (!thumb) thumb = origin + "/logo.png";

  const html = `<!DOCTYPE html>
<html><head>
<meta charset="utf-8" />
<title>${esc(title)} - Dengo Plus</title>
<meta property="og:title" content="${esc(title)}" />
<meta property="og:description" content="${esc(desc)}" />
<meta property="og:image" content="${thumb}" />
<meta property="og:image:width" content="1200" />
<meta property="og:image:height" content="630" />
<meta property="og:type" content="website" />
<meta property="og:url" content="${origin}/detail/${id}" />
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="${esc(title)}" />
<meta name="twitter:description" content="${esc(desc)}" />
<meta name="twitter:image" content="${thumb}" />
${videoUrl ? `<meta property="og:video" content="${videoUrl}" />
<meta property="og:video:type" content="video/mp4" />` : ""}
</head><body></body></html>`;

  return new Response(html, { headers: { "Content-Type": "text/html; charset=utf-8" } });
}