

function getDB(req) {
  if (req?.env?.DB) return req.env.DB;
  if (typeof globalThis !== 'undefined' && globalThis.DB) return globalThis.DB;
  if (typeof process !== 'undefined' && process.env?.DB) return process.env.DB;
  return null;
}

export default async function handler(req, res) {
  const db = getDB(req);

  if (!db) {
    return res.status(500).json({
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
      return res.status(200).json({
        ok: true,
        total: list.length,
        users: list
      });
    }

    if (req.method === 'POST') {
      const { username, contact } = req.body || {};
      const cleanUsername = String(username || '').trim();
      const cleanContact = String(contact || '').trim();

      if (!cleanUsername) {
        return res.status(400).json({ ok: false, error: 'Username obrigatorio.' });
      }

      const existing = await db
        .prepare('SELECT id, username, contact, status FROM users WHERE LOWER(username) = LOWER(?)')
        .bind(cleanUsername)
        .first();

      if (existing) {
        if (existing.status === 'blocked') {
          return res.status(403).json({
            ok: false,
            blocked: true,
            error: 'Esta conta esta bloqueada pelo administrador.'
          });
        }

        await db
          .prepare("UPDATE users SET contact = COALESCE(NULLIF(?, ''), contact), last_login = CURRENT_TIMESTAMP WHERE id = ?")
          .bind(cleanContact, existing.id)
          .run();

        return res.status(200).json({
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

      return res.status(201).json({ ok: true, user: created });
    }

    if (req.method === 'PATCH') {
      const { id, status } = req.body || {};
      const nextStatus = status === 'blocked' ? 'blocked' : 'active';

      if (!id) {
        return res.status(400).json({ ok: false, error: 'ID do utilizador obrigatorio.' });
      }

      await db
        .prepare('UPDATE users SET status = ? WHERE id = ?')
        .bind(nextStatus, id)
        .run();

      return res.status(200).json({ ok: true, id, status: nextStatus });
    }

    res.setHeader('Allow', ['GET', 'POST', 'PATCH']);
    return res.status(405).json({ ok: false, error: 'Metodo nao permitido.' });
  } catch (err) {
    return res.status(500).json({
      ok: false,
      error: err?.message || 'Erro interno ao consultar o banco D1.'
    });
  }
}