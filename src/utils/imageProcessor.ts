import heic2any from 'heic2any';
import JSZip from 'jszip';

export interface CompressionOptions {
  quality: number; // 0.1 to 1.0
  format?: 'jpeg' | 'png' | 'webp';
}

export interface ResizeOptions {
  width: number;
  height: number;
  maintainAspectRatio?: boolean;
}

export interface WatermarkOptions {
  text?: string;
  image?: HTMLImageElement;
  opacity: number;
  position: 'center' | 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
  fontSize?: number;
  color?: string;
}

export interface SocialMediaTemplate {
  name: string;
  width: number;
  height: number;
  aspectRatio: string;
}

export const SOCIAL_MEDIA_TEMPLATES: SocialMediaTemplate[] = [
  { name: 'Instagram Post', width: 1080, height: 1080, aspectRatio: '1:1' },
  { name: 'Instagram Story', width: 1080, height: 1920, aspectRatio: '9:16' },
  { name: 'Facebook Post', width: 1200, height: 630, aspectRatio: '1.91:1' },
  { name: 'Facebook Cover', width: 820, height: 312, aspectRatio: '2.63:1' },
  { name: 'Twitter Post', width: 1200, height: 675, aspectRatio: '16:9' },
  { name: 'Twitter Header', width: 1500, height: 500, aspectRatio: '3:1' },
  { name: 'LinkedIn Post', width: 1200, height: 627, aspectRatio: '1.91:1' },
  { name: 'LinkedIn Cover', width: 1584, height: 396, aspectRatio: '4:1' },
  { name: 'YouTube Thumbnail', width: 1280, height: 720, aspectRatio: '16:9' },
  { name: 'Pinterest Pin', width: 1000, height: 1500, aspectRatio: '2:3' },
];

/**
 * Load an image file into an HTMLImageElement
 */
export function loadImage(file: File): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const url = URL.createObjectURL(file);

    img.onload = () => {
      URL.revokeObjectURL(url);
      resolve(img);
    };

    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error('Failed to load image'));
    };

    img.src = url;
  });
}

/**
 * Compress an image file
 */
export async function compressImage(
  file: File,
  options: CompressionOptions
): Promise<{ blob: Blob; originalSize: number; compressedSize: number; savings: number }> {
  const img = await loadImage(file);
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');

  if (!ctx) {
    throw new Error('Failed to get canvas context');
  }

  canvas.width = img.width;
  canvas.height = img.height;
  ctx.drawImage(img, 0, 0);

  const format = options.format || 'jpeg';
  const mimeType = `image/${format}`;

  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (!blob) {
          reject(new Error('Failed to compress image'));
          return;
        }

        const originalSize = file.size;
        const compressedSize = blob.size;
        const savings = Math.round(((originalSize - compressedSize) / originalSize) * 100);

        resolve({
          blob,
          originalSize,
          compressedSize,
          savings,
        });
      },
      mimeType,
      options.quality
    );
  });
}

/**
 * Convert HEIC images to JPG
 */
export async function convertHeicToJpg(file: File): Promise<Blob> {
  try {
    const result = await heic2any({
      blob: file,
      toType: 'image/jpeg',
      quality: 0.9,
    });

    // heic2any can return Blob or Blob[]
    if (Array.isArray(result)) {
      return result[0];
    }
    return result;
  } catch (error) {
    throw new Error(`Failed to convert HEIC: ${error}`);
  }
}

/**
 * Convert multiple HEIC files to JPG and package as ZIP
 */
export async function convertMultipleHeicToJpg(files: File[]): Promise<Blob> {
  const zip = new JSZip();

  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const jpgBlob = await convertHeicToJpg(file);
    const filename = file.name.replace(/\.heic$/i, '.jpg');
    zip.file(filename, jpgBlob);
  }

  return await zip.generateAsync({ type: 'blob' });
}

/**
 * Convert image to WebP format
 */
export async function convertToWebP(file: File, quality: number = 0.9): Promise<Blob> {
  const img = await loadImage(file);
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');

  if (!ctx) {
    throw new Error('Failed to get canvas context');
  }

  canvas.width = img.width;
  canvas.height = img.height;
  ctx.drawImage(img, 0, 0);

  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (!blob) {
          reject(new Error('Failed to convert to WebP'));
          return;
        }
        resolve(blob);
      },
      'image/webp',
      quality
    );
  });
}

/**
 * Resize an image for social media
 */
export async function resizeForSocialMedia(
  file: File,
  template: SocialMediaTemplate,
  cropData?: { x: number; y: number; scale: number }
): Promise<Blob> {
  const img = await loadImage(file);
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');

  if (!ctx) {
    throw new Error('Failed to get canvas context');
  }

  canvas.width = template.width;
  canvas.height = template.height;

  // Fill with white background
  ctx.fillStyle = '#FFFFFF';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Calculate scaling and positioning
  const scale = cropData?.scale || 1;
  const offsetX = cropData?.x || 0;
  const offsetY = cropData?.y || 0;

  // Calculate dimensions to maintain aspect ratio
  const imgAspect = img.width / img.height;
  const canvasAspect = canvas.width / canvas.height;

  let drawWidth = canvas.width;
  let drawHeight = canvas.height;
  let drawX = 0;
  let drawY = 0;

  if (imgAspect > canvasAspect) {
    // Image is wider
    drawHeight = canvas.height;
    drawWidth = drawHeight * imgAspect;
    drawX = (canvas.width - drawWidth) / 2;
  } else {
    // Image is taller
    drawWidth = canvas.width;
    drawHeight = drawWidth / imgAspect;
    drawY = (canvas.height - drawHeight) / 2;
  }

  // Apply scale and offset
  drawWidth *= scale;
  drawHeight *= scale;
  drawX += offsetX;
  drawY += offsetY;

  ctx.drawImage(img, drawX, drawY, drawWidth, drawHeight);

  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (!blob) {
          reject(new Error('Failed to resize image'));
          return;
        }
        resolve(blob);
      },
      'image/jpeg',
      0.95
    );
  });
}

/**
 * Add a watermark to an image
 */
export async function addWatermarkToImage(
  file: File,
  options: WatermarkOptions
): Promise<Blob> {
  const img = await loadImage(file);
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');

  if (!ctx) {
    throw new Error('Failed to get canvas context');
  }

  canvas.width = img.width;
  canvas.height = img.height;
  ctx.drawImage(img, 0, 0);

  // Set opacity
  ctx.globalAlpha = options.opacity;

  if (options.text) {
    const fontSize = options.fontSize || Math.floor(canvas.width / 20);
    const color = options.color || '#FFFFFF';

    ctx.font = `bold ${fontSize}px Arial`;
    ctx.fillStyle = color;
    ctx.strokeStyle = 'rgba(0, 0, 0, 0.5)';
    ctx.lineWidth = 2;

    const textMetrics = ctx.measureText(options.text);
    const textWidth = textMetrics.width;
    const textHeight = fontSize;

    let x = 0;
    let y = 0;

    switch (options.position) {
      case 'center':
        x = (canvas.width - textWidth) / 2;
        y = canvas.height / 2;
        break;
      case 'top-left':
        x = 50;
        y = 50 + textHeight;
        break;
      case 'top-right':
        x = canvas.width - textWidth - 50;
        y = 50 + textHeight;
        break;
      case 'bottom-left':
        x = 50;
        y = canvas.height - 50;
        break;
      case 'bottom-right':
        x = canvas.width - textWidth - 50;
        y = canvas.height - 50;
        break;
    }

    ctx.strokeText(options.text, x, y);
    ctx.fillText(options.text, x, y);
  } else if (options.image) {
    const watermarkImg = options.image;
    const maxWidth = canvas.width * 0.3;
    const maxHeight = canvas.height * 0.3;

    let wmWidth = watermarkImg.width;
    let wmHeight = watermarkImg.height;

    // Scale watermark if too large
    if (wmWidth > maxWidth || wmHeight > maxHeight) {
      const scale = Math.min(maxWidth / wmWidth, maxHeight / wmHeight);
      wmWidth *= scale;
      wmHeight *= scale;
    }

    let x = 0;
    let y = 0;

    switch (options.position) {
      case 'center':
        x = (canvas.width - wmWidth) / 2;
        y = (canvas.height - wmHeight) / 2;
        break;
      case 'top-left':
        x = 50;
        y = 50;
        break;
      case 'top-right':
        x = canvas.width - wmWidth - 50;
        y = 50;
        break;
      case 'bottom-left':
        x = 50;
        y = canvas.height - wmHeight - 50;
        break;
      case 'bottom-right':
        x = canvas.width - wmWidth - 50;
        y = canvas.height - wmHeight - 50;
        break;
    }

    ctx.drawImage(watermarkImg, x, y, wmWidth, wmHeight);
  }

  // Reset opacity
  ctx.globalAlpha = 1.0;

  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (!blob) {
          reject(new Error('Failed to add watermark'));
          return;
        }
        resolve(blob);
      },
      'image/jpeg',
      0.95
    );
  });
}

/**
 * Download a blob as a file
 */
export function downloadBlob(blob: Blob, filename: string): void {
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

/**
 * Format file size in human-readable format
 */
export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
}
