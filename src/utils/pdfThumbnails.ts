import * as pdfjsLib from 'pdfjs-dist';

// Set up the worker - use the bundled worker from node_modules
// This avoids CDN issues and version mismatches
pdfjsLib.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url
).toString();

export interface PDFPageThumbnail {
  pageNumber: number;
  dataUrl: string;
  width: number;
  height: number;
}

/**
 * Generate thumbnails for all pages in a PDF
 */
export async function generatePDFThumbnails(
  file: File,
  maxWidth: number = 200
): Promise<PDFPageThumbnail[]> {
  try {
    const arrayBuffer = await file.arrayBuffer();
    
    const loadingTask = pdfjsLib.getDocument({
      data: arrayBuffer,
      useWorkerFetch: false,
      isEvalSupported: false,
      useSystemFonts: true,
    });
    
    const pdf = await loadingTask.promise;

    const thumbnails: PDFPageThumbnail[] = [];

    for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
      const page = await pdf.getPage(pageNum);
      const viewport = page.getViewport({ scale: 1 });

      // Calculate scale to fit maxWidth
      const scale = maxWidth / viewport.width;
      const scaledViewport = page.getViewport({ scale });

      // Create canvas
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');

      if (!context) {
        throw new Error('Failed to get canvas context');
      }

      canvas.width = scaledViewport.width;
      canvas.height = scaledViewport.height;

      // Render page to canvas
      await page.render({
        canvasContext: context,
        viewport: scaledViewport,
      }).promise;

      // Convert to data URL
      const dataUrl = canvas.toDataURL('image/jpeg', 0.8);

      thumbnails.push({
        pageNumber: pageNum,
        dataUrl,
        width: scaledViewport.width,
        height: scaledViewport.height,
      });
    }

    return thumbnails;
  } catch (error) {
    console.error('PDF thumbnail generation error:', error);
    if (error instanceof Error) {
      throw new Error(`PDF loading failed: ${error.message}`);
    }
    throw new Error('Failed to load PDF. The file may be corrupted or password protected.');
  }
}

/**
 * Get PDF metadata
 */
export async function getPDFMetadata(file: File): Promise<{
  numPages: number;
  title?: string;
  author?: string;
  subject?: string;
  keywords?: string;
  creator?: string;
  producer?: string;
  creationDate?: Date;
  modificationDate?: Date;
}> {
  const arrayBuffer = await file.arrayBuffer();
  const loadingTask = pdfjsLib.getDocument({ data: arrayBuffer });
  const pdf = await loadingTask.promise;
  const metadata = await pdf.getMetadata();

  const info = metadata.info as any;

  return {
    numPages: pdf.numPages,
    title: info?.Title,
    author: info?.Author,
    subject: info?.Subject,
    keywords: info?.Keywords,
    creator: info?.Creator,
    producer: info?.Producer,
    creationDate: info?.CreationDate,
    modificationDate: info?.ModDate,
  };
}
