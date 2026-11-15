export async function onRequest(context) {
  const { request, env } = context;
  const url = new URL(request.url);

  // Pega o id de /detail/123 OU de /detail?id=123
  let id = url.searchParams.get("id");
  if (!id) {
    const parts = url.pathname.split("/").filter(Boolean);
    // parts = ["detail", "123"]
    if (parts[0] === "detail" && parts[1]) {
      id = parts[1];
    }
  }

  if (!id) {
    return context.next();
  }

  let thumbnail = "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800";
  let title = "Dengo Plus - Vídeo Exclusivo";

  try {
    if (env && env.DB) {
      const stmt = env.DB.prepare("SELECT * FROM posts WHERE id = ?");
      const post = await stmt.bind(id).first();

      if (post) {
        const rawTitle = post.caption || post.title;
        if (rawTitle) {
          title = `Dengo Plus - ${rawTitle}`;
        }
        const dbImg = post.thumbnail_url || post.thumbnail || post.image_url || post.image || post.cover;
        if (dbImg) {
          thumbnail = dbImg;
        }
      }
    }
  } catch (err) {}

  const response = await context.next();
  const contentType = response.headers.get("content-type") || "";
  if (!contentType.includes("text/html")) {
    return response;
  }

  // Escapa aspas do título para não quebrar o HTML
  const safeTitle = title.replace(/"/g, "&quot;");
  const safeThumb = thumbnail.replace(/"/g, "&quot;");
  const pageUrl = url.href;

  let rewriter = new HTMLRewriter()
    .on('meta[property="og:image"]', { element(e) { e.remove(); } })
    .on('meta[property="og:title"]', { element(e) { e.remove(); } })
    .on('meta[property="og:url"]', { element(e) { e.remove(); } })
    .on('meta[property="og:description"]', { element(e) { e.remove(); } })
    .on('meta[name="twitter:image"]', { element(e) { e.remove(); } })
    .on('meta[name="twitter:title"]', { element(e) { e.remove(); } })
    .on("head", {
      element(element) {
        element.append(
          `<meta property="og:title" content="${safeTitle}">
           <meta property="og:description" content="${safeTitle}">
           <meta property="og:image" content="${safeThumb}">
           <meta property="og:url" content="${pageUrl}">
           <meta property="og:type" content="website">
           <meta name="twitter:card" content="summary_large_image">
           <meta name="twitter:title" content="${safeTitle}">
           <meta name="twitter:image" content="${safeThumb}">`,
          { html: true }
        );
      }
    });

  return rewriter.transform(response);
}