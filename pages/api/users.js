export const runtime = 'edge';

function getDB(req) {
  try {
    const ctx = getRequestContext();
    if (ctx?.env?.DB) return ctx.env.DB;
  } catch (_) {}
  if (req?.env?.DB) return req.env.DB;
  if (typeof globalThis !== 'undefined' && globalThis.DB) return globalThis.DB;
  if (typeof process !== 'undefined' && process.env?.DB) return process.env.DB;
  return null;
}

async function readBody(req) {
  if (req?.body && typeof req.body === 'object' && !(typeof req.body.getReader === 'function')) {
    return req.body;
  }
  if (typeof req?.json === 'function') {
    try {
      return await req.json();
    } catch (_) {
      return {};
    }
  }
  if (typeof req?.text === 'function') {
    try {
      const txt = await req.text();
      return txt ? JSON.parse(txt) : {};
    } catch (_) {
      return {};
    }
  }
  if (req?.body && typeof req.body.getReader === 'function') {
    try {
      const txt = await new Response(req.body).text();
      return txt ? JSON.parse(txt) : {};
    } catch (_) {
      return {};
    }
  }
  return {};
}

function sendJson(res, status, data) {
  if (res && typeof res.status === 'function' && typeof res.json === 'function') {
    return res.status(status).json(data);
  }
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json' }
  });
}

export default async function handler(req, res) {
  const db = getDB(req);

  if (!db) {
    return sendJson(res, 500, {
      ok: false,
      error: 'Binding DB nao encontrado neste ambiente.'
    });
  }

  try {
    if (req.method === 'GET') {
      const { results } = await db
        .prepare('SELECT id, username, contact, status, created_at, last_login FROM users ORDER BY id DESC')
        .all();

      const list = results || [];
      return sendJson(res, 200, {
        ok: true,
        total: list.length,
        users: list
      });
    }

    if (req.method === 'POST') {
      const { username, contact } = await readBody(req);
      const cleanUsername = String(username || '').trim();
      const cleanContact = String(contact || '').trim();

      if (!cleanUsername) {
        return sendJson(res, 400, { ok: false, error: 'Username obrigatorio.' });
      }

      const existing = await db
        .prepare('SELECT id, username, contact, status FROM users WHERE LOWER(username) = LOWER(?)')
        .bind(cleanUsername)
        .first();

      if (existing) {
        if (existing.status === 'blocked') {
          return sendJson(res, 403, {
            ok: false,
            blocked: true,
            error: 'Esta conta esta bloqueada pelo administrador.'
          });
        }

        await db
          .prepare("UPDATE users SET contact = COALESCE(NULLIF(?, ''), contact), last_login = CURRENT_TIMESTAMP WHERE id = ?")
          .bind(cleanContact, existing.id)
          .run();

        return sendJson(res, 200, {
          ok: true,
          user: { ...existing, contact: cleanContact || existing.contact }
        });
      }

      await db
        .prepare("INSERT INTO users (username, contact, status, last_login) VALUES (?, ?, 'active', CURRENT_TIMESTAMP)")
        .bind(cleanUsername, cleanContact)
        .run();

      const created = await db
        .prepare('SELECT id, username, contact, status, created_at, last_login FROM users WHERE LOWER(username) = LOWER(?)')
        .bind(cleanUsername)
        .first();

      return sendJson(res, 201, { ok: true, user: created });
    }

    if (req.method === 'PATCH') {
      const { id, status } = await readBody(req);
      const nextStatus = status === 'blocked' ? 'blocked' : 'active';

      if (!id) {
        return sendJson(res, 400, { ok: false, error: 'ID do utilizador obrigatorio.' });
      }

      await db
        .prepare('UPDATE users SET status = ? WHERE id = ?')
        .bind(nextStatus, id)
        .run();

      return sendJson(res, 200, { ok: true, id, status: nextStatus });
    }

    if (res && typeof res.setHeader === 'function') {
      res.setHeader('Allow', ['GET', 'POST', 'PATCH']);
    }
    return sendJson(res, 405, { ok: false, error: 'Metodo nao permitido.' });
  } catch (err) {
    return sendJson(res, 500, {
      ok: false,
      error: err?.message || 'Erro interno ao consultar o banco D1.'
    });
  }
}