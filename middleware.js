import { NextResponse } from 'next/server';

function achaImagem(obj, vistos = new Set()) {
  if (!obj || typeof obj !== 'object' || vistos.has(obj)) return null;
  vistos.add(obj);
  // 1º: procura campo que parece capa
  for (const [k, v] of Object.entries(obj)) {
    if (typeof v === 'string' && v.startsWith('http') && /thumbnail|thumb|cover|poster|preview|image|img|photo|pic/i.test(k)) return v;
  }
  // 2º: procura qualquer link de imagem
  for (const v of Object.values(obj)) {
    if (typeof v === 'string' && v.startsWith('http') && /\.(jpg|jpeg|png|webp|gif)(\?|$)/i.test(v)) return v;
  }
  // 3º: entra dentro de objetos / arrays
  for (const v of Object.values(obj)) {
    const r = achaImagem(v, vistos);
    if (r) return r;
  }
  return null;
}

export async function middleware(request) {
  const url = request.nextUrl;
  const ua = request.headers.get('user-agent') || '';
  const isBot = /WhatsApp|facebookexternalhit|Twitterbot|TelegramBot|Discordbot|Slackbot|LinkedInBot|Googlebot|bingbot/i.test(ua);
  if (!isBot || !url.pathname.startsWith('/detail/')) return NextResponse.next();

  const fullId = url.pathname.split('/detail/')[1]?.split('/')[0] || '';
  const shortId = fullId.split('-').pop();

  let thumb = 'https://dengo-plus.pages.dev/logo.png';
  let title = 'Dengo Plus';
  let desc = 'Ve os videos mais quentes e divertidos no Dengo Plus.';

  try {
    const res = await fetch('https://dengo-upload-worker.dnctraderoperation.workers.dev/posts', { headers: { 'Accept': 'application/json' } });
    if (res.ok) {
      const data = await res.json();
      const list = Array.isArray(data) ? data : (data.posts || data.data || data.items || []);
      const p = list.find(x => {
        const candidates = [x.id, x.postId, x._id, x.slug, x.key].map(v => String(v || ''));
        return candidates.some(c => c === fullId || c === shortId || fullId.includes(c) || c.includes(shortId) || c.endsWith(shortId));
      });
      if (p) {
        const img = achaImagem(p);
        if (img) thumb = img;
        if (p.caption || p.title) { title = p.caption || p.title; desc = p.caption || p.title; }
        if (p.description) desc = p.description;
      }
    }
  } catch (e) {}

  const safeTitle = String(title).replace(/"/g, '').replace(/</g, '');
  const safeDesc = String(desc).replace(/"/g, '').replace(/</g, '');
  const safeThumb = String(thumb).replace(/"/g, '');
  const html = `<!DOCTYPE html><html><head><meta charset="utf-8"><title>${safeTitle} - Dengo Plus</title><meta property="og:type" content="website" /><meta property="og:title" content="${safeTitle}" /><meta property="og:description" content="${safeDesc}" /><meta property="og:image" content="${safeThumb}" /><meta property="og:image:secure_url" content="${safeThumb}" /><meta property="og:image:width" content="1200" /><meta property="og:image:height" content="630" /><meta property="og:url" content="https://dengo-plus.pages.dev/detail/${fullId}" /><meta property="og:site_name" content="Dengo Plus" /><meta name="twitter:card" content="summary_large_image" /><meta name="twitter:title" content="${safeTitle}" /><meta name="twitter:description" content="${safeDesc}" /><meta name="twitter:image" content="${safeThumb}" /></head><body>Redirecionando...</body></html>`;
  return new Response(html, { headers: { 'Content-Type': 'text/html;charset=UTF-8', 'Cache-Control': 'no-cache' } });
}
export const config = { matcher: ['/detail/:path*'] };