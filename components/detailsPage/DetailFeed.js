import React, { useEffect, useState } from 'react';
import VideoDetail from './VideoDetail';

export default function DetailFeed({ id }) {
  const [video, setVideo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  useEffect(() => {
    if (!id) {
      setVideo(null);
      setLoading(false);
      return;
    }

    let cancelado = false;
    setLoading(true);

    fetch(`/api/videos/${id}`)
      .then((res) => res.json())
      .then((data) => {
        if (cancelado) return;
        // CORREÇÃO: a API não devolve id, então forçamos o id da URL, que nunca muda
        // Antes ele usava video.url como id, e o url muda a cada refresh - por isso o comentário sumia
        const videoFinal = {
          ...(Array.isArray(data) ? data[0] : data),
          id: id,
          post_id: id,
        };
        setVideo(videoFinal);
        setLoading(false);
      })
      .catch(() => {
        if (cancelado) return;
        setLoading(false);
      });

    return () => {
      cancelado = true;
    };
  }, [id]);

  const handleProtectedAction = (actionCallback) => {
    const user = localStorage.getItem('dengoo_user');
    if (!user) {
      setIsAuthModalOpen(true);
      return;
    }
    if (actionCallback) actionCallback();
  };

  if (loading) {
    return <div style={{ color: '#fff', textAlign: 'center', padding: '40px' }}>A carregar vídeo...</div>;
  }

  if (!video) {
    return <div style={{ color: '#fff', textAlign: 'center', padding: '40px' }}>Vídeo não encontrado.</div>;
  }

  return (
    <div>
      <VideoDetail
        video={video}
        onInteract={handleProtectedAction}
      />

      {isAuthModalOpen && (
        <div style={modalOverlayStyle}>
          <div style={modalContentStyle}>
            <button onClick={() => setIsAuthModalOpen(false)} style={closeButtonStyle}>×</button>
            <h2 style={{ marginBottom: '20px', color: '#333' }}>Cadastra-te no Dengo</h2>
            <p style={{ marginBottom: '20px', color: '#666' }}>Precisas de uma conta para curtir, comentar ou interagir com os vídeos.</p>
            <button
              onClick={() => { window.location.href = '/auth'; }}
              style={submitButtonStyle}
            >
              Fazer Cadastro / Login
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

const modalOverlayStyle = {
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100vw',
  height: '100vh',
  backgroundColor: 'rgba(0, 0, 0, 0.6)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  zIndex: 1000,
};

const modalContentStyle = {
  backgroundColor: '#fff',
  padding: '30px',
  borderRadius: '12px',
  width: '90%',
  maxWidth: '400px',
  textAlign: 'center',
  position: 'relative',
};

const closeButtonStyle = {
  position: 'absolute',
  top: '10px',
  right: '15px',
  background: 'none',
  border: 'none',
  fontSize: '24px',
  cursor: 'pointer',
};

const submitButtonStyle = {
  padding: '12px 20px',
  borderRadius: '6px',
  border: 'none',
  backgroundColor: '#ff3b5c',
  color: '#fff',
  fontSize: '16px',
  fontWeight: 'bold',
  cursor: 'pointer',
  width: '100%',
};