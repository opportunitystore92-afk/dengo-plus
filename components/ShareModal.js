import { useState } from 'react';

export default function ShareModal({ video, usuario }) {
  const [mensagem, setMensagem] = useState('');
const emojis = ['😂','❤️','🔥','👏','😮','😍','🙌','💯'];
  const [visivel, setVisivel] = useState(false);

  // Limpa o id - tira o .mp4 se vier junto
  const cleanId = String(video?.id || '').replace('.mp4', '').trim();

   const url = `https://dengo-plus.pages.dev/detail/${cleanId}`;
  const manchete = video?.titulo || video?.title || video?.descricao || 'Vê este vídeo no Dengo';
  const textoCompleto = `${mensagem ? mensagem + ' ' : ''}Olha esse vídeo no Dengo: ${url}`;

  const partilhar = () => {
    if (!usuario) {
      alert('Crie sua conta para partilhar o vídeo');
      return;
    }
    if (navigator.share) navigator.share({ title: manchete, text: textoCompleto });
    else window.open('https://wa.me/?text=' + encodeURIComponent(textoCompleto));
  };

  const copiar = () => {
    if (!usuario) {
      alert('Crie sua conta para copiar o link');
      return;
    }
    navigator.clipboard.writeText(textoCompleto);
    alert('Link copiado: ' + textoCompleto);
  };

  if (!visivel) return <button onClick={() => setVisivel(true)} style={{ background: '#000', color: '#fff', padding: '12px 20px', borderRadius: 12, border: 'none', cursor: 'pointer' }}>Partilhar vídeo</button>;
  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'flex-end', justifyContent: 'center', zIndex: 9999 }}>
      <div style={{ background: '#fff', width: '100%', maxWidth: 500, borderTopLeftRadius: 24, borderTopRightRadius: 24, padding: 20 }}>
        <div style={{ width: 40, height: 5, background: '#ddd', borderRadius: 10, margin: '0 auto 12px' }} />
        <h3 style={{ textAlign: 'center' }}>{manchete}</h3>
        <textarea value={mensagem} onChange={(e) => setMensagem(e.target.value)} placeholder="Escreva uma mensagem..." style={{ width: '100%', padding: 12, borderRadius: 12, border: '1px solid #ddd', minHeight: 70, marginTop: 8 }} />
<div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginTop: 8 }}>
  {emojis.map((e) => (
    <button key={e} onClick={() => setMensagem((m) => m + e)} style={{ fontSize: 22, background: '#f5f5f5', border: 'none', borderRadius: 10, padding: '6px 10px', cursor: 'pointer' }}>{e}</button>
  ))}
</div>
        <button onClick={partilhar} style={{ width: '100%', padding: 14, borderRadius: 12, border: 'none', marginTop: 10, cursor: 'pointer' }}>Partilhar</button>
        <button onClick={() => window.open('https://wa.me/?text=' + encodeURIComponent(textoCompleto))} style={{ width: '100%', padding: 14, borderRadius: 12, border: 'none', marginTop: 10, cursor: 'pointer' }}>WhatsApp</button>
        <button onClick={copiar} style={{ width: '100%', padding: 14, borderRadius: 12, border: 'none', marginTop: 10, cursor: 'pointer' }}>Copiar link</button>
        <button onClick={() => setVisivel(false)} style={{ width: '100%', padding: 14, borderRadius: 12, border: 'none', marginTop: 10, cursor: 'pointer' }}>Fechar</button>
      </div>
    </div>
  );
}