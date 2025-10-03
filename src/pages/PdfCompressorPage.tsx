import { useState } from 'react';
import { Container, Stack, Typography } from '@mui/material';
import Header from '../components/Header';
import Footer from '../components/Footer';
import SEO from '../components/SEO';
import DropZone from '../components/DropZone';
import ProcessingState from '../components/ProcessingState';
import ResultState from '../components/ResultState';
import { compressPDF, downloadBlob, formatFileSize, type CompressionOptions } from '../utils/pdfProcessor';

type PageState = 'upload' | 'processing' | 'complete';

export default function PdfCompressorPage() {
  const [state, setState] = useState<PageState>('upload');
  const [progress, setProgress] = useState(0);
  const [quality] = useState<'low' | 'medium' | 'high'>('medium');
  const [resultBlob, setResultBlob] = useState<Blob | null>(null);
  const [originalFileName, setOriginalFileName] = useState<string>('');
  const [savingsInfo, setSavingsInfo] = useState<string>('');

  const handleFileSelect = async (file: File) => {
    console.log('File selected:', file.name);
    setOriginalFileName(file.name);
    setState('processing');
    setProgress(0);

    try {
      // Simulate progress updates
      const progressInterval = setInterval(() => {
        setProgress((prev) => Math.min(prev + 15, 90));
      }, 200);

      const options: CompressionOptions = { quality };
      const result = await compressPDF(file, options);

      clearInterval(progressInterval);
      setProgress(100);

      setResultBlob(result.blob);
      setSavingsInfo(
        `Reduced from ${formatFileSize(result.originalSize)} to ${formatFileSize(result.compressedSize)} (${result.savings}% savings)`
      );

      setTimeout(() => {
        setState('complete');
      }, 500);
    } catch (error) {
      console.error('Error compressing PDF:', error);
      alert('Failed to compress PDF. Please try again.');
      setState('upload');
      setProgress(0);
    }
  };

  const handleDownload = () => {
    if (resultBlob) {
      const filename = originalFileName.replace('.pdf', '_compressed.pdf');
      downloadBlob(resultBlob, filename);
    }
  };

  const handleProcessAnother = () => {
    setState('upload');
    setProgress(0);
    setResultBlob(null);
    setSavingsInfo('');
  };

  return (
    <>
      <SEO
        title="PDF Compressor"
        description="Compress PDF files online for free. Reduce PDF file size while maintaining quality. Fast, secure, client-side processing. No file upload to servers."
        keywords="compress pdf, reduce pdf size, pdf compressor, shrink pdf, optimize pdf, free pdf compressor"
        canonical="https://fileswift.app/pdf-compressor"
      />
      <Header />
      <Container maxWidth="lg" sx={{ py: 8, minHeight: '70vh' }}>
        <Stack spacing={4} alignItems="center">
          <Stack spacing={2} alignItems="center" sx={{ maxWidth: 600 }}>
            <Typography variant="h1" sx={{ textAlign: 'center' }}>
              PDF Compressor
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ textAlign: 'center' }}>
              Reduce your PDF file size while maintaining quality. Perfect for email attachments and web uploads.
            </Typography>
          </Stack>

          {state === 'upload' && (
            <DropZone
              onFileSelect={handleFileSelect}
              acceptedFormats=".pdf"
              maxSize={100}
              fileType="PDF"
            />
          )}

          {state === 'processing' && (
            <ProcessingState
              message="Compressing your PDF..."
              progress={progress}
              showProgress={true}
            />
          )}

          {state === 'complete' && (
            <ResultState
              onDownload={handleDownload}
              onProcessAnother={handleProcessAnother}
              message="Your PDF is compressed!"
              savingsMessage={savingsInfo}
            />
          )}
        </Stack>
      </Container>
      <Footer />
    </>
  );
}