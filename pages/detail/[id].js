export async function onRequest(context) {
  const id = context.params.id;
  // Pega a lista de vídeos (do teu videos.json no R2 ou do KV)
  const res = await fetch("https://main.dengo-plus.pages.dev/videos.json");
  const videos = await res.json();
  const video = videos.find(v => String(v.id) === String(id));

  if (!video) return new Response("Não achado", { status: 404 });

  const html = `<!DOCTYPE html>
  <html><head>
    <title>${video.title} - Dengo Plus</title>
    <meta property="og:title" content="${video.title}" />
    <meta property="og:image" content="${video.thumbnail}" />
    <meta property="og:video" content="${video.videoUrl}" />
    <meta property="og:type" content="video.other" />
    <meta http-equiv="refresh" content="0; url=/detail/${id}" />
  </head><body>Carregando...</body></html>`;

  return new Response(html, { headers: { "Content-Type": "text/html" } });
}