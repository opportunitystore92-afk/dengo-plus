import { NextResponse } from 'next/server';

const SITE = 'https://dengo-plus.pages.dev';
const API = 'https://dengo-upload-worker.dnctraderoperation.workers.dev/posts';
const FALLBACK_IMAGE = `${SITE}/logo.png`;

const BOT_RE =
  /facebookexternalhit|facebot|whatsapp|twitterbot|telegrambot|linkedinbot|slackbot|discordbot|skypeuripreview|pinterest/i;
const IMG_RE = /\.(jpe?g|png|webp|gif|avif)(\?.*)?$/i;
// avatar do usuário nunca pode virar capa do vídeo
const SKIP_KEYS = /^(profile_image|avatar|profile_picture)$/i;

function esc(s) {
  return String(s ?? '')
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function abs(u) {
  try {
    return new URL(u, SITE).toString();
  } catch {
    return null;
  }
}

// busca recursiva: devolve a primeira string que bate com o regex, em qualquer nível
function findUrl(node, re, depth = 0) {
  if (node == null || depth > 6) return null;
  if (typeof node === 'string') return re.test(node) ? node : null;
  if (Array.isArray(node)) {
    for (const item of node) {
      const r = findUrl(item, re, depth + 1);
      if (r) return r;
    }
    return null;
  }
  if (typeof node === 'object') {
    for (const [k, v] of Object.entries(node)) {
      if (SKIP_KEYS.test(k)) continue;
      const r = findUrl(v, re, depth + 1);
      if (r) return r;
    }
  }
  return null;
}

// ID completo OU ID curto (depois do último "-"). Sem fallback para o primeiro post.
function matchPost(posts, rawId) {
  let id = rawId;
  try {
    id = decodeURIComponent(rawId);
  } catch {}
  const exact = posts.find((p) => String(p.id) === id);
  if (exact) return exact;
  const short = id.includes('-') ? id.slice(id.lastIndexOf('-') + 1) : id;
  if (!short) return null;
  return (
    posts.find((p) => String(p.id) === short || String(p.id).endsWith('-' + short)) || null
  );
}

function html(res) {
  return new Response(res, {
    status: 200,
    headers: {
      'content-type': 'text/html; charset=utf-8',
      'cache-control': 'no-cache',
    },
  });
}

export async function middleware(request) {
  const ua = request.headers.get('user-agent') || '';
  if (!BOT_RE.test(ua)) return NextResponse.next();

  const { pathname } = new URL(request.url);
  const rawId = pathname.split('/')[2];
  if (!rawId) return NextResponse.next();

  let post = null;
  try {
    const ctrl = new AbortController();
    const t = setTimeout(() => ctrl.abort(), 5000);
    const r = await fetch(API, { signal: ctrl.signal, cache: 'no-store' });
    clearTimeout(t);
    const data = await r.json();
    const posts = Array.isArray(data) ? data : data.posts || data.data || [];
    post = matchPost(posts, rawId);
  } catch {
    return NextResponse.next();
  }
  if (!post) return NextResponse.next();

  const title = post.caption && post.caption.trim() ? post.caption.trim() : 'Dengo Plus';
  const description = `Vídeo de @${post.username || 'dengo'} no Dengo Plus`;
  const pageUrl = `${SITE}/detail/${encodeURIComponent(rawId)}`;

  const imageRaw = findUrl(post, IMG_RE);
  const image = (imageRaw && abs(imageRaw)) || FALLBACK_IMAGE;

  return html(`<!doctype html>
<html lang="pt-BR">
<head>
<meta charset="utf-8">
<title>${esc(title)}</title>
<meta property="og:site_name" content="Dengo Plus">
<meta property="og:type" content="website">
<meta property="og:url" content="${esc(pageUrl)}">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(description)}">
<meta property="og:image" content="${esc(image)}">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${esc(title)}">
<meta name="twitter:description" content="${esc(description)}">
<meta name="twitter:image" content="${esc(image)}">
</head>
<body><a href="${esc(pageUrl)}">${esc(title)}</a></body>
</html>`);
}

export const config = {
  matcher: ['/detail/:path*'],
};