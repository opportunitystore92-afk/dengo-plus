import { NextResponse } from 'next/server';

export async function middleware(request) {
  const url = request.nextUrl;
  const ua = request.headers.get('user-agent') || '';
  const isBot = /WhatsApp|facebookexternalhit|Twitterbot|TelegramBot|Discordbot|Slackbot|LinkedInBot|Googlebot|bingbot/i.test(ua);
  if (!isBot || !url.pathname.startsWith('/detail/')) return NextResponse.next();

  const fullId = url.pathname.split('/detail/')[1]?.split('/')[0] || '';
  const shortId = fullId.split('-').pop(); // 132115

  let thumb = 'https://dengo-plus.pages.dev/logo.png';
  let title = 'Dengo Plus';
  let desc = 'Ve os videos mais quentes e divertidos no Dengo Plus.';

  try {
    const res = await fetch('https://dengo-upload-worker.dnctraderoperation.workers.dev/posts', { headers: { 'Accept': 'application/json' } });
    if (res.ok) {
      const data = await res.json();
      const list = Array.isArray(data) ? data : (data.posts || data.data || data.items || []);
      // Procura por qualquer parte do ID
      const p = list.find(x => {
        const candidates = [x.id, x.postId, x._id, x.slug, x.key].map(v => String(v || ''));
        return candidates.some(c => c === fullId || c === shortId || fullId.includes(c) || c.includes(shortId) || c.endsWith(shortId));
      });
      if (p) {
        thumb = p.thumbnailUrl || p.thumbnail || p.thumb || p.poster || p.preview || p.cover || p.coverImage || p.image || p.imageUrl || p.media || p.videoThumbnail || thumb;
        // Se a capa vier como objeto
        if (typeof thumb === 'object' && thumb !== null) thumb = thumb.url || thumb.src || 'https://dengo-plus.pages.dev/logo.png';
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