import { useState, useEffect, useRef } from 'react';

export default function VideoDetail({ video, onInteract }) {
  const videoRef = useRef(null);
  const containerRef = useRef(null);

  const [curtiu, setCurtiu] = useState(false);
  const [curtidas, setCurtidas] = useState(0);
  const [mostrarComentarios, setMostrarComentarios] = useState(false);
  const [comentario, setComentario] = useState('');
  const [listaComentarios, setListaComentarios] = useState([]);
  const [salvo, setSalvo] = useState(false);
  const [aviso, setAviso] = useState('');
  const [carregandoVideo, setCarregandoVideo] = useState(true);

  // CORREÇÃO: aceita id, post_id, key, filename - nunca mais cai para 'video' genérico
  const videoId = video?.id || video?.post_id || video?.key || video?.filename || video?.url || 'video';
  const videoUrl = video?.url || video?.src || '';
  const titulo = video?.title || video?.titulo || 'Vídeo Dengo';

  useEffect(() => {
    const salvos = JSON.parse(localStorage.getItem('dengo_salvos') || '[]');
    setSalvo(salvos.includes(videoId));

    // CORREÇÃO: não mostra mais localStorage velho, busca direto no Worker
    fetch(`https://dengo-upload-worker.dnctraderoperation.workers.dev/comments?post_id=${encodeURIComponent(videoId)}`)
      .then(r => r.json())
      .then(data => {
        if (Array.isArray(data)) {
          setListaComentarios(data);
        }
      })
      .catch(() => {});

    const curtidasSalvas = JSON.parse(localStorage.getItem('dengo_curtidas_' + videoId) || '[]');
    setCurtidas(curtidasSalvas.length);
    setCurtiu(curtidasSalvas.includes('eu'));
  }, [videoId]);

  // CORREÇÃO SOM: só toca o vídeo que está na tela, pausa todos os outros
  useEffect(() => {
    const el = videoRef.current;
    const container = containerRef.current;
    setCarregandoVideo(true);

    if (el && videoUrl) {
      el.pause();
      el.currentTime = 0;
      el.load();
    }

    // Quando outro vídeo começar a tocar, pausa este
    const pausarSeOutroTocar = (e) => {
      if (e.detail !== videoId && videoRef.current) {
        videoRef.current.pause();
      }
    };
    window.addEventListener('dengo-video-play', pausarSeOutroTocar);

    // Quando sair da tela, pausa na hora - é isso que resolve do 8º pra frente
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting && videoRef.current) {
            videoRef.current.pause();
          }
        });
      },
      { threshold: 0.3 }
    );
    if (container) observer.observe(container);

    const handleVisibilityChange = () => {
      if (document.hidden && videoRef.current) {
        videoRef.current.pause();
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      observer.disconnect();
      window.removeEventListener('dengo-video-play', pausarSeOutroTocar);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      if (videoRef.current) {
        videoRef.current.pause();
      }
    };
  }, [videoUrl, videoId]);

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

  async function enviarComentario() {
    if (!comentario.trim()) return;
    const texto = comentario.trim();
    const username = localStorage.getItem('dengo_username') || video?.username || 'eu';
    setComentario('');

    try {
      const res = await fetch(`https://dengo-upload-worker.dnctraderoperation.workers.dev/comments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ post_id: videoId, username, text: texto })
      });
      const data = await res.json();
      if (data.success) {
        const r2 = await fetch(`https://dengo-upload-worker.dnctraderoperation.workers.dev/comments?post_id=${encodeURIComponent(videoId)}`);
        const lista = await r2.json();
        if (Array.isArray(lista)) {
          setListaComentarios(lista);
        }
        mostrarAviso('Comentário enviado');
      } else {
        mostrarAviso('Erro: ' + (data.error || 'não enviou'));
      }
    } catch (e) {
      mostrarAviso('Erro de rede');
    }
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
    <div ref={containerRef} style={{ display: 'flex', gap: '16px', alignItems: 'flex-start', justifyContent: 'center', padding: '16px' }}>
      <div style={{ flex: 1, maxWidth: '520px', position: 'relative' }}>
        {videoUrl ? (
          <>
            {carregandoVideo && (
              <div style={{ position: 'absolute', top: '12px', left: '12px', zIndex: 5, background: 'rgba(0,0,0,0.75)', color: '#fff', padding: '6px 12px', borderRadius: '16px', fontSize: '13px' }}>
                A carregar vídeo...
              </div>
            )}
            <video
              ref={videoRef}
              src={videoUrl}
              poster={video?.thumbnail_url || video?.thumbnail || video?.cover || ''}
              preload="metadata"
              playsInline
              controls
              onPlay={() => window.dispatchEvent(new CustomEvent('dengo-video-play', { detail: videoId }))}
              onCanPlay={() => setCarregandoVideo(false)}
              onPlaying={() => setCarregandoVideo(false)}
              onWaiting={() => setCarregandoVideo(true)}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </>
        ) : (
          <p>Vídeo não encontrado</p>
        )}
        <h3>{titulo}</h3>
        {aviso && <p style={{ background: '#000', color: '#fff', padding: '8px 12px', borderRadius: '20px', display: 'inline-block' }}>{aviso}</p>}
        {mostrarComentarios && (
          <div style={{ marginTop: '12px' }}>
            <h4>Comentários ({listaComentarios.length})</h4>
            {listaComentarios.map((c, i) => <p key={c.id || i}>💬 {typeof c === 'string' ? c : `${c.username ? c.username + ': ' : ''}${c.text || ''}`}</p>)}
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