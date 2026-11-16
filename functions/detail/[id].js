export async function onRequest(context) {
  const { params, request } = context;
  const id = params.id;
  const url = new URL(request.url);
  const userAgent = request.headers.get('user-agent') || '';
  const isBot = /WhatsApp|facebookexternalhit|Twitterbot|TelegramBot|Discordbot|Slackbot|LinkedInBot/i.test(userAgent);

  if (!isBot) {
    return context.next();
  }

  let thumb = 'https://dengo-plus.pages.dev/logo.png';
  let title = 'Dengo Plus';
  let desc = 'Ve os videos mais quentes e divertidos no Dengo Plus.';

  try {
    const WORKER_URL = 'https://dengo-upload-worker.dnctraderoperation.workers.dev';
    const res = await fetch(`${WORKER_URL}/posts/${id}`);
    if (res.ok) {
      const data = await res.json();
      const p = data.post || data;
      if (p.thumbnailUrl) thumb = p.thumbnailUrl;
      if (p.caption || p.title) {
        title = p.caption || p.title;
        desc = p.caption || p.title;
      }
    }
  } catch (e) {}

  const safeTitle = title.replace(/"/g, '');
  const safeDesc = desc.replace(/"/g, '');

  const html = `<!DOCTYPE html><html><head><meta charset="utf-8"><title>${safeTitle} - Dengo Plus</title><meta property="og:type" content="video.other" /><meta property="og:title" content="${safeTitle}" /><meta property="og:description" content="${safeDesc}" /><meta property="og:image" content="${thumb}" /><meta property="og:url" content="${url.href}" /><meta http-equiv="refresh" content="0; url=/detail/${id}" /></head><body>Redirecionando...</body></html>`;

  return new Response(html, { headers: { 'Content-Type': 'text/html;charset=UTF-8' } });
}