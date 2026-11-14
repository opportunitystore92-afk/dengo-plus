import { useState, useEffect } from 'react';

export default function VideoDetail({ video }) {
  const [curtiu, setCurtiu] = useState(false);
  const [curtidas, setCurtidas] = useState(0);
  const [mostrarComentarios, setMostrarComentarios] = useState(false);
  const [comentario, setComentario] = useState('');
  const [listaComentarios, setListaComentarios] = useState([]);
  const [salvo, setSalvo] = useState(false);
  const [aviso, setAviso] = useState('');

  const videoId = video?.id || 'video';
  const videoUrl = video?.url || video?.src || '';
  const titulo = video?.title || video?.titulo || 'Vídeo Dengo';

  useEffect(() => {
    const salvos = JSON.parse(localStorage.getItem('dengo_salvos') || '[]');
    if (salvos.includes(videoId)) setSalvo(true);
    const comentariosSalvos = JSON.parse(localStorage.getItem('dengo_comentarios_' + videoId) || '[]');
    setListaComentarios(comentariosSalvos);
    const curtidasSalvas = JSON.parse(localStorage.getItem('dengo_curtidas_' + videoId) || '[]');
    setCurtidas(curtidasSalvas.length);
    if (curtidasSalvas.includes('eu')) setCurtiu(true);
  }, [videoId]);

  function mostrarAviso(texto) {
    setAviso(texto);
    setTimeout(() => setAviso(''), 2000);
  }

  function curtir() {
    const curtidasSalvas = JSON.parse(localStorage.getItem('dengo_curtidas_' + videoId) || '[]');
    if (curtiu) {
      const novo = curtidasSalvas.filter((c) => c !== 'eu');
      localStorage.setItem('dengo_curtidas_' + videoId, JSON.stringify(novo));
      setCurtidas(novo.length);
      setCurtiu(false);
    } else {
      curtidasSalvas.push('eu');
      localStorage.setItem('dengo_curtidas_' + videoId, JSON.stringify(curtidasSalvas));
      setCurtidas(curtidasSalvas.length);
      setCurtiu(true);
    }
  }

  function enviarComentario() {
    if (!comentario.trim()) return;
    const novo = [...listaComentarios, comentario.trim()];
    setListaComentarios(novo);
    localStorage.setItem('dengo_comentarios_' + videoId, JSON.stringify(novo));
    setComentario('');
    mostrarAviso('Comentário enviado');
  }

  async function compartilhar() {
    const link = window.location.href;
    if (navigator.share) {
      try {
        await navigator.share({ title: titulo, url: link });
        return;
      } catch (e) {}
    }
    await navigator.clipboard.writeText(link);
    mostrarAviso('Link copiado');
  }

  async function copiar() {
    await navigator.clipboard.writeText(window.location.href);
    mostrarAviso('Link copiado 🔗');
  }

  function salvar() {
    const salvos = JSON.parse(localStorage.getItem('dengo_salvos') || '[]');
    if (salvos.includes(videoId)) {
      const novo = salvos.filter((s) => s !== videoId);
      localStorage.setItem('dengo_salvos', JSON.stringify(novo));
      setSalvo(false);
      mostrarAviso('Removido dos salvos');
    } else {
      salvos.push(videoId);
      localStorage.setItem('dengo_salvos', JSON.stringify(salvos));
      setSalvo(true);
      mostrarAviso('Vídeo salvo ❤️');
    }
  }

  function repostar() {
    mostrarAviso('Repostado no teu feed 🔁');
  }

  const btnStyle = {
    width: '52px',
    height: '52px',
    borderRadius: '50%',
    border: 'none',
    background: '#fff',
    fontSize: '22px',
    cursor: 'pointer',
    boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  };

  return (
    <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start', justifyContent: 'center', padding: '16px' }}>
      <div style={{ flex: 1, maxWidth: '520px' }}>
        {videoUrl ? (
        <video
  src={videoUrl}
  preload="metadata"
  playsInline
  controls
  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
/>
        ) : (
          <p>Vídeo não encontrado</p>
        )}
        <h3>{titulo}</h3>
        {aviso && <p style={{ background: '#000', color: '#fff', padding: '8px 12px', borderRadius: '20px', display: 'inline-block' }}>{aviso}</p>}
        {mostrarComentarios && (
          <div style={{ marginTop: '12px' }}>
            <h4>Comentários ({listaComentarios.length})</h4>
            {listaComentarios.map((c, i) => <p key={i}>💬 {c}</p>)}
            <div style={{ display: 'flex', gap: '8px' }}>
              <input value={comentario} onChange={(e) => setComentario(e.target.value)} placeholder="Escreve um comentário..." style={{ flex: 1, padding: '10px', borderRadius: '20px', border: '1px solid #ccc' }} />
              <button onClick={enviarComentario} style={{ padding: '10px 16px', borderRadius: '20px', border: 'none', background: '#fe2c55', color: '#fff', cursor: 'pointer' }}>Enviar</button>
            </div>
          </div>
        )}
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', alignItems: 'center', paddingTop: '20px' }}>
        <button onClick={curtir} style={{ ...btnStyle, background: curtiu ? '#fe2c55' : '#fff' }}>{curtiu ? '❤️' : '🤍'}</button>
        <span>{curtidas}</span>

        <button onClick={() => setMostrarComentarios(!mostrarComentarios)} style={btnStyle}>💬</button>
        <span>{listaComentarios.length}</span>

        <button onClick={compartilhar} style={btnStyle}>📤</button>
        <span>Compartilhar</span>

        <button onClick={copiar} style={btnStyle}>🔗</button>
        <span>Copiar</span>

        <button onClick={salvar} style={{ ...btnStyle, background: salvo ? '#ffe600' : '#fff' }}>{salvo ? '⭐' : '🔖'}</button>
        <span>Salvar</span>

        <button onClick={repostar} style={btnStyle}>🔁</button>
        <span>Repostar</span>

        <button onClick={() => window.history.back()} style={{ ...btnStyle, fontSize: '16px' }}>← Voltar</button>
      </div>
    </div>
  );
}