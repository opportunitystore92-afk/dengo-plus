export async function onRequest(context) {
  const userAgent = context.request.headers.get("User-Agent") || "";
  const isBot = /facebookexternalhit|WhatsApp|Twitterbot|facebookcatalog|Meta/i.test(userAgent);

  // Se for tu, deixa passar normal para a página com botões
  if (!isBot) {
    return context.next();
  }

  // Se for o robô do WhatsApp, devolve só a capinha certa
  const id = context.params.id;
  const res = await fetch("https://main.dengo-plus.pages.dev/videos.json");
  const videos = await res.json();
  const video = videos.find(v => String(v.id) === String(id));

  if (!video) return new Response("Não achado", { status: 404 });

  const html = `<!DOCTYPE html>
  <html><head>
    <title>${video.title} - Dengo Plus</title>
    <meta property="og:title" content="${video.title}" />
    <meta property="og:image" content="${video.thumbnail}" />
    <meta property="og:type" content="video.other" />
    <meta property="og:url" content="https://main.dengo-plus.pages.dev/detail/${id}" />
  </head><body></body></html>`;

  return new Response(html, { headers: { "Content-Type": "text/html" } });
}