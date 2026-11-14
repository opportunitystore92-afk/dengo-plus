export async function onRequest(context) {
  const { request, env } = context;
  const url = new URL(request.url);

  if (!url.pathname.includes("/detail") || !url.searchParams.has("id")) {
    return context.next();
  }

  const id = url.searchParams.get("id");
  
  let thumbnail = "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800";
  let title = "Dengo Plus - Vídeo Exclusivo";

  try {
    if (env && env.DB) {
      const stmt = env.DB.prepare("SELECT * FROM posts WHERE id = ?");
      const post = await stmt.bind(id).first();

      if (post) {
        if (post.caption) {
          title = `Dengo Plus - ${post.caption}`;
        } else if (post.title) {
          title = `Dengo Plus - ${post.title}`;
        }
        
        const dbImg = post.thumbnail_url || post.thumbnail || post.image_url || post.image || post.cover;
        if (dbImg) {
          thumbnail = dbImg;
        }
      }
    }
  } catch (err) {
    // Mantém os fallbacks em caso de erro na BD
  }

  const response = await context.next();
  const contentType = response.headers.get("content-type") || "";

  if (!contentType.includes("text/html")) {
    return response;
  }

  let rewriter = new HTMLRewriter()
    .on('meta[property="og:image"]', { element(e) { e.remove(); } })
    .on('meta[property="og:title"]', { element(e) { e.remove(); } })
    .on('meta[name="twitter:image"]', { element(e) { e.remove(); } })
    .on('meta[name="twitter:title"]', { element(e) { e.remove(); } })
    .on("head", {
      element(element) {
        element.append(
          `<meta property="og:title" content="${title}">
           <meta property="og:image" content="${thumbnail}">
           <meta name="twitter:title" content="${title}">
           <meta name="twitter:image" content="${thumbnail}">`,
          { html: true }
        );
      }
    });

  return rewriter.transform(response);
}