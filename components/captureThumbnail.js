export async function captureThumbnail(
  file,
  { width = 1200, height = 630, maxBytes = 300 * 1024 } = {}
) {
  const url = URL.createObjectURL(file);
  try {
    const video = document.createElement('video');
    video.muted = true;
    video.playsInline = true;
    video.preload = 'auto';
    video.src = url;

    await new Promise((resolve, reject) => {
      video.onloadedmetadata = resolve;
      video.onerror = () => reject(new Error('Não foi possível ler o vídeo'));
    });

    const dur = Number.isFinite(video.duration) ? video.duration : 0;

    // Testa vários tempos e fica com o mais claro
    const times = dur > 0
      ? [...new Set([0.5, 1, 2, 3, dur / 2, dur * 0.8].filter(t => t < dur))]
      : [0];

    let bestCanvas = null;
    let bestScore = -1;

    for (const t of times) {
      await new Promise((resolve) => {
        video.onseeked = resolve;
        video.onerror = resolve;
        video.currentTime = t;
      });
      await new Promise(r => setTimeout(r, 300));

      const vw = video.videoWidth;
      const vh = video.videoHeight;
      if (!vw || !vh) continue;

      const c = document.createElement('canvas');
      c.width = width; c.height = height;
      const ctx = c.getContext('2d');
      ctx.fillStyle = '#000';
      ctx.fillRect(0, 0, width, height);
      const scale = Math.min(width / vw, height / vh);
      const w = vw * scale; const h = vh * scale;
      ctx.drawImage(video, (width - w) / 2, (height - h) / 2, w, h);

      // Mede o brilho médio - pega o frame mais claro
      const data = ctx.getImageData(0, 0, width, height).data;
      let sum = 0;
      for (let i = 0; i < data.length; i += 4 * 100) {
        sum += data[i] + data[i+1] + data[i+2];
      }
      const score = sum / (data.length / 400);
      if (score > bestScore) { bestScore = score; bestCanvas = c; }
      if (score > 40) break; // já achou um frame bom, não precisa testar mais
    }

    if (!bestCanvas) throw new Error('Vídeo sem dimensões');

    for (const q of [0.85, 0.75, 0.65, 0.55, 0.45]) {
      const blob = await new Promise((r) => bestCanvas.toBlob(r, 'image/jpeg', q));
      if (blob && blob.size <= maxBytes) return blob;
    }
    return await new Promise((r) => bestCanvas.toBlob(r, 'image/jpeg', 0.35));
  } finally {
    URL.revokeObjectURL(url);
  }
}