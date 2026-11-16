export async function onRequest(context) {
  const { params, request, next } = context;
  const id = params.id;
  const url = new URL(request.url);
  const userAgent = request.headers.get('user-agent') || '';
  const isBot = /WhatsApp|facebookexternalhit|Twitterbot|TelegramBot|Discordbot|Slackbot|LinkedInBot|Googlebot|bingbot/i.test(userAgent);

  if (!isBot) {
    return next();
  }

  let thumb = 'https://dengo-plus.pages.dev/logo.png';
  let title = 'Dengo Plus';
  let desc = 'Ve os videos mais quentes e divertidos no Dengo Plus.';

  try {
    const WORKER_URL = 'https://dengo-upload-worker.dnctraderoperation.workers.dev';
    // O Worker NAO tem /posts/ID, ele so tem a lista. Entao busca a lista e procura o id
    const res = await fetch(`${WORKER_URL}/posts`);
    if (res.ok) {
      const data = await res.json();
      const list = Array.isArray(data) ? data : (data.posts || data.data || []);
      const p = list.find(x => String(x.id) === String(id) || String(x.postId) === String(id) || String(x._id) === String(id));
      if (p) {
        if (p.thumbnailUrl) thumb = p.thumbnailUrl;
        else if (p.thumbnail) thumb = p.thumbnail;
        else if (p.cover) thumb = p.cover;
        else if (p.image) thumb = p.image;
        if (p.caption || p.title) {
          title = p.caption || p.title;
          desc = p.caption || p.title;
        }
      }
    }
  } catch (e) {}

  const safeTitle = String(title).replace(/"/g, '').replace(/</g, '').replace(/>/g, '');
  const safeDesc = String(desc).replace(/"/g, '').replace(/</g, '').replace(/>/g, '');
  const safeThumb = String(thumb).replace(/"/g, '');

  const html = `<!DOCTYPE html><html><head><meta charset="utf-8"><title>${safeTitle} - Dengo Plus</title><meta property="og:type" content="video.other" /><meta property="og:title" content="${safeTitle}" /><meta property="og:description" content="${safeDesc}" /><meta property="og:image" content="${safeThumb}" /><meta property="og:image:secure_url" content="${safeThumb}" /><meta property="og:url" content="https://dengo-plus.pages.dev/detail/${id}" /><meta property="og:site_name" content="Dengo Plus" /><meta name="twitter:card" content="summary_large_image" /><meta name="twitter:title" content="${safeTitle}" /><meta name="twitter:description" content="${safeDesc}" /><meta name="twitter:image" content="${safeThumb}" /><meta http-equiv="refresh" content="0; url=/detail/${id}" /></head><body>Redirecionando...</body></html>`;

  return new Response(html, { headers: { 'Content-Type': 'text/html;charset=UTF-8', 'Cache-Control': 'no-cache' } });
}