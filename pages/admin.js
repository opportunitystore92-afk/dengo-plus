import { useEffect, useState } from "react";

export default function AdminPage() {
  const [users, setUsers] = useState([]);
  const [total, setTotal] = useState(0);
  const [busca, setBusca] = useState("");
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState("");
  const [busyId, setBusyId] = useState(null);

  async function carregarUsers() {
    setLoading(true);
    setErro("");
    try {
      const resp = await fetch("/api/users");
      const data = await resp.json();
      if (!resp.ok || !data?.ok) {
        throw new Error(data?.error || "Falha ao carregar utilizadores.");
      }
      setUsers(data.users || []);
      setTotal(data.total ?? (data.users ? data.users.length : 0));
    } catch (err) {
      setErro(err?.message || "Erro ao consultar /api/users");
    } finally {
      setLoading(false);
    }
  }

  async function alternarStatus(user) {
    const proximoStatus = user.status === "blocked" ? "active" : "blocked";
    setBusyId(user.id);
    setErro("");
    try {
      const resp = await fetch("/api/users", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: user.id, status: proximoStatus })
      });
      const data = await resp.json();
      if (!resp.ok || !data?.ok) {
        throw new Error(data?.error || "Falha ao atualizar estado.");
      }
      setUsers((prev) =>
        prev.map((item) =>
          item.id === user.id ? { ...item, status: proximoStatus } : item
        )
      );
    } catch (err) {
      setErro(err?.message || "Erro ao alterar estado do utilizador.");
    } finally {
      setBusyId(null);
    }
  }

  useEffect(() => {
    carregarUsers();
  }, []);

  const filtrados = users.filter((u) => {
    const termo = busca.trim().toLowerCase();
    if (!termo) return true;
    return (
      String(u.username || "").toLowerCase().includes(termo) ||
      String(u.contact || "").toLowerCase().includes(termo) ||
      String(u.status || "").toLowerCase().includes(termo)
    );
  });

  const ativos = users.filter((u) => u.status !== "blocked").length;
  const bloqueados = users.filter((u) => u.status === "blocked").length;

  return (
    <div style={{ maxWidth: 960, margin: "32px auto", padding: "0 16px", fontFamily: "sans-serif" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
        <div>
          <h1 style={{ margin: 0 }}>Painel Admin — Dengo</h1>
          <p style={{ margin: "4px 0 0", color: "#555" }}>Base centralizada no Cloudflare D1</p>
        </div>
        <button
          type="button"
          onClick={carregarUsers}
          style={{ padding: "8px 14px", cursor: "pointer" }}
        >
          Atualizar lista
        </button>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 12, marginTop: 20 }}>
        <div style={{ border: "1px solid #ddd", borderRadius: 8, padding: 14 }}>
          <div style={{ fontSize: 13, color: "#666" }}>Total de utilizadores</div>
          <div style={{ fontSize: 28, fontWeight: "bold", marginTop: 4 }}>{total}</div>
        </div>
        <div style={{ border: "1px solid #ddd", borderRadius: 8, padding: 14 }}>
          <div style={{ fontSize: 13, color: "#666" }}>Ativos</div>
          <div style={{ fontSize: 28, fontWeight: "bold", marginTop: 4 }}>{ativos}</div>
        </div>
        <div style={{ border: "1px solid #ddd", borderRadius: 8, padding: 14 }}>
          <div style={{ fontSize: 13, color: "#666" }}>Bloqueados</div>
          <div style={{ fontSize: 28, fontWeight: "bold", marginTop: 4 }}>{bloqueados}</div>
        </div>
      </div>

      <div style={{ marginTop: 20 }}>
        <input
          type="text"
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
          placeholder="Pesquisar por utilizador, contacto ou estado..."
          style={{ width: "100%", padding: "10px 12px", borderRadius: 6, border: "1px solid #ccc", boxSizing: "border-box" }}
        />
      </div>

      {erro && (
        <p style={{ color: "#b91c1c", marginTop: 12 }}>{erro}</p>
      )}

      {loading ? (
        <p style={{ marginTop: 20 }}>A carregar utilizadores...</p>
      ) : (
        <div style={{ overflowX: "auto", marginTop: 20 }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ borderBottom: "2px solid #e5e7eb", textAlign: "left" }}>
                <th style={{ padding: 10 }}>ID</th>
                <th style={{ padding: 10 }}>Utilizador</th>
                <th style={{ padding: 10 }}>Contacto</th>
                <th style={{ padding: 10 }}>Estado</th>
                <th style={{ padding: 10 }}>Ultimo login</th>
                <th style={{ padding: 10 }}>Acao</th>
              </tr>
            </thead>
            <tbody>
              {filtrados.length === 0 ? (
                <tr>
                  <td colSpan={6} style={{ padding: 16, textAlign: "center", color: "#666" }}>
                    Nenhum utilizador encontrado.
                  </td>
                </tr>
              ) : (
                filtrados.map((u) => {
                  const isBlocked = u.status === "blocked";
                  return (
                    <tr key={u.id} style={{ borderBottom: "1px solid #eee" }}>
                      <td style={{ padding: 10 }}>{u.id}</td>
                      <td style={{ padding: 10 }}>@{u.username}</td>
                      <td style={{ padding: 10 }}>{u.contact || "—"}</td>
                      <td style={{ padding: 10 }}>{isBlocked ? "Bloqueado" : "Ativo"}</td>
                      <td style={{ padding: 10 }}>{u.last_login || u.created_at || "—"}</td>
                      <td style={{ padding: 10 }}>
                        <button
                          type="button"
                          disabled={busyId === u.id}
                          onClick={() => alternarStatus(u)}
                          style={{ padding: "6px 10px", cursor: "pointer" }}
                        >
                          {busyId === u.id
                            ? "A guardar..."
                            : isBlocked
                            ? "Desbloquear"
                            : "Bloquear"}
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}