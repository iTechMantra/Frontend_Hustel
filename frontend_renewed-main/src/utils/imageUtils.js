// Client-side image compression to ~200KB using canvas
export async function compressImageToDataUrl(file, maxSizeKB = 200, maxWidth = 1280) {
  const img = await fileToImage(file);
  const { canvas, ctx } = createCanvasFitting(img, maxWidth);
  ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
  let quality = 0.85;
  let dataUrl = canvas.toDataURL('image/jpeg', quality);
  while (dataUrl.length / 1024 > maxSizeKB && quality > 0.4) {
    quality -= 0.05;
    dataUrl = canvas.toDataURL('image/jpeg', quality);
  }
  return dataUrl;
}

function fileToImage(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = reject;
      img.src = reader.result;
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

function createCanvasFitting(img, maxWidth) {
  const canvas = document.createElement('canvas');
  const ratio = img.width > maxWidth ? maxWidth / img.width : 1;
  canvas.width = Math.round(img.width * ratio);
  canvas.height = Math.round(img.height * ratio);
  const ctx = canvas.getContext('2d');
  return { canvas, ctx };
}


