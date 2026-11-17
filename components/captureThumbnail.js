// captureThumbnail.js
// Recebe o File do vídeo (galeria OU câmera) e devolve um Blob JPG 1200x630.
// Tenta ficar com no máximo ~300 KB (limite seguro para o WhatsApp).
// Se algo falhar, lança erro: no upload, use try/catch e envie o vídeo mesmo sem capa.

export async function captureThumbnail(
  file,
  { at = 1, width = 1200, height = 630, maxBytes = 300 * 1024 } = {}
) {
  const url = URL.createObjectURL(file);
  try {
    const video = document.createElement('video');
    video.muted = true;
    video.playsInline = true;
    video.preload = 'auto';
    video.src = url;

    await new Promise((resolve, reject) => {
      video.onloadeddata = resolve;
      video.onerror = () => reject(new Error('Não foi possível ler o vídeo'));
      video.load();
    });

    // Vai para ~1s (ou metade do vídeo, se for mais curto).
    // Gravações da câmera em .webm podem ter duração "Infinity": nesse caso usa o 1º frame.
    const dur = Number.isFinite(video.duration) ? video.duration : 0;
    const t = dur > 0 ? Math.min(at, dur / 2) : 0;
    if (t > 0) {
      await new Promise((resolve, reject) => {
        video.onseeked = resolve;
        video.onerror = () => reject(new Error('Falha ao posicionar o vídeo'));
        video.currentTime = t;
      });
    }

    const vw = video.videoWidth;
    const vh = video.videoHeight;
    if (!vw || !vh) throw new Error('Vídeo sem dimensões');

    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');

    // Fundo preto e frame centralizado SEM cortar (bom para vídeo vertical).
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, width, height);
    const scale = Math.min(width / vw, height / vh);
    const w = vw * scale;
    const h = vh * scale;
    ctx.drawImage(video, (width - w) / 2, (height - h) / 2, w, h);

    // Reduz a qualidade até caber em maxBytes.
    for (const q of [0.85, 0.75, 0.65, 0.55, 0.45]) {
      const blob = await new Promise((r) => canvas.toBlob(r, 'image/jpeg', q));
      if (blob && blob.size <= maxBytes) return blob;
    }
    return await new Promise((r) => canvas.toBlob(r, 'image/jpeg', 0.35));
  } finally {
    URL.revokeObjectURL(url);
  }
}