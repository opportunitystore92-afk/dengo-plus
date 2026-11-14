export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const path = url.pathname.replace(/^\/+|\/+$/g, "");

    const corsHeaders = {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Range",
      "Access-Control-Expose-Headers":
        "Content-Range, Accept-Ranges, Content-Length, ETag",
    };

    const jsonResponse = (data, status = 200, extraHeaders = {}) =>
      new Response(JSON.stringify(data), {
        status,
        headers: {
          ...corsHeaders,
          ...extraHeaders,
          "Content-Type": "application/json; charset=utf-8",
        },
      });

    if (request.method === "OPTIONS") {
      return new Response(null, {
        status: 204,
        headers: corsHeaders,
      });
    }

    const bucket = env.MY_BUCKET;
    const db = env.DB;

    if (request.method === "POST" && path === "posts") {
  if (!db) {
    return jsonResponse(
      { error: "Associação D1 DB não configurada." },
      500
    );
  }

  let post;

  try {
    post = await request.json();
  } catch {
    return jsonResponse({ error: "JSON inválido." }, 400);
  }

  const id = String(post?.id || "").trim();
  const username = String(post?.username || "").trim();
  const videoUrl = String(
    post?.video_url || post?.videoUrl || ""
  ).trim();

  const thumbnailUrl = String(
    post?.thumbnail_url || post?.thumbnailUrl || ""
  ).trim() || null;

  if (!id || !username || !videoUrl) {
    return jsonResponse(
      {
        error: "Campos obrigatórios: id, username e video_url."
      },
      400
    );
  }

  try {
    const result = await db.prepare(
      `INSERT INTO posts
       (id, username, profile_image, caption, video_url,
        thumbnail_url, topic)
       VALUES (?, ?, ?, ?, ?, ?, ?)`
    ).bind(
      id,
      username,
      post.profile_image || post.profileImage || null,
      String(post.caption || ""),
      videoUrl,
      thumbnailUrl,
      post.topic || null
    ).run();

    return jsonResponse(
      {
        success: true,
        id,
        databaseSuccess: result.success
      },
      201
    );
  } catch (error) {
    console.error("Erro ao salvar publicação no D1:", error);
    return jsonResponse(
      {
        error: "Falha ao salvar publicação no D1.",
        details: String(error?.message || error)
      },
      500
    );
  }
}

    // POST /posts — gravar publicação no D1
    if (request.method === "POST" && path === "posts") {
  if (!db) {
    return jsonResponse(
      { error: "Associação D1 DB não configurada." },
      500
    );
  }

  let post;

  try {
    post = await request.json();
  } catch {
    return jsonResponse({ error: "JSON inválido." }, 400);
  }

  const id = String(post?.id || "").trim();
  const username = String(post?.username || "").trim();
  const videoUrl = String(
    post?.video_url || post?.videoUrl || ""
  ).trim();

  const thumbnailUrl = String(
    post?.thumbnail_url || post?.thumbnailUrl || ""
  ).trim() || null;

  if (!id || !username || !videoUrl) {
    return jsonResponse(
      {
        error: "Campos obrigatórios: id, username e video_url."
      },
      400
    );
  }

  try {
    const result = await db.prepare(
      `INSERT INTO posts
       (id, username, profile_image, caption, video_url,
        thumbnail_url, topic)
       VALUES (?, ?, ?, ?, ?, ?, ?)`
    ).bind(
      id,
      username,
      post.profile_image || post.profileImage || null,
      String(post.caption || ""),
      videoUrl,
      thumbnailUrl,
      post.topic || null
    ).run();

    return jsonResponse(
      {
        success: true,
        id,
        databaseSuccess: result.success
      },
      201
    );
  } catch (error) {
    console.error("Erro ao salvar publicação no D1:", error);
    return jsonResponse(
      {
        error: "Falha ao salvar publicação no D1.",
        details: String(error?.message || error)
      },
      500
    );
  }
}

    // GET /list — listar arquivos do R2
    if (
      request.method === "GET" &&
      (path === "list" || path === "")
    ) {
      if (!bucket) {
        return jsonResponse(
          { error: "Bucket R2 não configurado." },
          500
        );
      }

      try {
        const listed = await bucket.list();

        return jsonResponse(
          listed.objects.map((obj) => ({
            key: obj.key,
            size: obj.size,
            uploaded: obj.uploaded,
          }))
        );
      } catch (error) {
        console.error("Erro ao listar arquivos do R2:", error);

        return jsonResponse(
          {
            error: "Não foi possível listar os arquivos.",
            details: String(error?.message || error),
          },
          500
        );
      }
    }

    if (!bucket) {
      return jsonResponse(
        { error: "Bucket R2 não configurado." },
        500
      );
    }

    // PUT — enviar arquivo ao R2
    if (request.method === "PUT") {
      if (
        !path ||
        path === "list" ||
        path === "posts" ||
        !request.body
      ) {
        return jsonResponse(
          { error: "Arquivo ou nome inválido." },
          400
        );
      }

      try {
        const contentType =
          request.headers.get("Content-Type") ||
          "application/octet-stream";

        await bucket.put(path, request.body, {
          httpMetadata: { contentType },
        });

        return jsonResponse({
          success: true,
          key: path,
        });
      } catch (error) {
        console.error("Erro ao enviar arquivo ao R2:", error);

        return jsonResponse(
          {
            error: "Não foi possível enviar o arquivo.",
            details: String(error?.message || error),
          },
          500
        );
      }
    }

    // DELETE — apagar publicação do D1 e arquivo do R2
    if (request.method === "DELETE") {
      const idParam = url.searchParams.get("id");

      if (path === "posts" || idParam) {
        if (!db) {
          return jsonResponse(
            { error: "Associação D1 DB não configurada." },
            500
          );
        }

        const postId = idParam || path;

        if (!postId || postId === "posts") {
          return jsonResponse(
            { error: "ID obrigatório para apagar a publicação." },
            400
          );
        }

        try {
          const postRow = await db
            .prepare(`SELECT video_url FROM posts WHERE id = ?`)
            .bind(postId)
            .first();

          await db
            .prepare(`DELETE FROM posts WHERE id = ?`)
            .bind(postId)
            .run();

          if (postRow && postRow.video_url) {
            try {
              const urlObj = new URL(postRow.video_url);
              const fileKey = urlObj.pathname.replace(/^\/+/, "");
              if (fileKey) {
                await bucket.delete(fileKey);
              }
            } catch (e) {
              // Ignora
            }
          }

          return jsonResponse({
            success: true,
            id: postId,
          });
        } catch (error) {
          console.error("Erro ao apagar publicação do D1:", error);

          return jsonResponse(
            {
              error: "Falha ao apagar publicação.",
              details: String(error?.message || error),
            },
            500
          );
        }
      }

      const deleteKey = url.searchParams.get("key") || path;

      if (!deleteKey || deleteKey === "list") {
        return jsonResponse(
          { error: "Chave inválida." },
          400
        );
      }

      try {
        await bucket.delete(deleteKey);

        return jsonResponse({
          success: true,
          key: deleteKey,
        });
      } catch (error) {
        console.error("Erro ao apagar arquivo do R2:", error);

        return jsonResponse(
          {
            error: "Não foi possível apagar o arquivo.",
            details: String(error?.message || error),
          },
          500
        );
      }
    }

    // GET — reproduzir vídeo com suporte a intervalos de bytes
    if (request.method === "GET" && path) {
      try {
        const rangeHeader = request.headers.get("Range");
        let rangeOptions;
        let status = 200;

        if (rangeHeader) {
          const match = /^bytes=(\d*)-(\d*)$/.exec(
            rangeHeader.trim()
          );

          if (!match || (!match[1] && !match[2])) {
            return new Response("Intervalo inválido", {
              status: 416,
              headers: corsHeaders,
            });
          }

          const head = await bucket.head(path);

          if (!head) {
            return new Response("Vídeo não encontrado", {
              status: 404,
              headers: corsHeaders,
            });
          }

          const size = head.size;
          let start;
          let end;

          if (match[1] === "") {
            const suffixLength = Number(match[2]);

            if (
              !Number.isSafeInteger(suffixLength) ||
              suffixLength <= 0
            ) {
              return new Response("Intervalo inválido", {
                status: 416,
                headers: corsHeaders,
              });
            }

            start = Math.max(0, size - suffixLength);
            end = size - 1;
          } else {
            start = Number(match[1]);
            end =
              match[2] === "" ? size - 1 : Number(match[2]);
          }

          if (
            !Number.isSafeInteger(start) ||
            !Number.isSafeInteger(end) ||
            start < 0 ||
            start >= size ||
            end < start
          ) {
            return new Response("Intervalo fora do arquivo", {
              status: 416,
              headers: {
                ...corsHeaders,
                "Content-Range": `bytes */${size}`,
              },
            });
          }

          end = Math.min(end, size - 1);

          rangeOptions = {
            range: {
              offset: start,
              length: end - start + 1,
            },
          };

          status = 206;
        }

        const object = await bucket.get(path, rangeOptions);

        if (!object) {
          return new Response("Vídeo não encontrado", {
            status: 404,
            headers: corsHeaders,
          });
        }

        const headers = new Headers(corsHeaders);
        object.writeHttpMetadata(headers);

        if (!headers.has("Content-Type")) {
          headers.set(
            "Content-Type",
            "application/octet-stream"
          );
        }

        headers.set("ETag", object.httpEtag);
        headers.set("Accept-Ranges", "bytes");

        if (status === 206 && object.range) {
          const start = object.range.offset;
          const length = object.range.length;

          headers.set(
            "Content-Range",
            `bytes ${start}-${start + length - 1}/${object.size}`
          );
          headers.set("Content-Length", String(length));
        } else {
          headers.set("Content-Length", String(object.size));
        }

        return new Response(object.body, {
          status,
          headers,
        });
      } catch (error) {
        console.error("Erro ao carregar vídeo do R2:", error);

        return jsonResponse(
          {
            error: "Não foi possível carregar o vídeo.",
            details: String(error?.message || error),
          },
          500
        );
      }
    }

    return new Response("Método não permitido", {
      status: 405,
      headers: corsHeaders,
    });
  },
};