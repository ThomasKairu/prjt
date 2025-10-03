import { useState } from 'react';
import { Container, Stack, Typography, ToggleButtonGroup, ToggleButton } from '@mui/material';
import Header from '../components/Header';
import Footer from '../components/Footer';
import SEO from '../components/SEO';
import DropZone from '../components/DropZone';
import ProcessingState from '../components/ProcessingState';
import ResultState from '../components/ResultState';
import { convertToWebP, compressImage, downloadBlob, formatFileSize } from '../utils/imageProcessor';

type PageState = 'upload' | 'processing' | 'complete';
type ConversionMode = 'to-webp' | 'from-webp';

export default function WebpConverterPage() {
  const [state, setState] = useState<PageState>('upload');
  const [mode, setMode] = useState<ConversionMode>('to-webp');
  const [resultBlob, setResultBlob] = useState<Blob | null>(null);
  const [originalFileName, setOriginalFileName] = useState<string>('');
  const [savingsInfo, setSavingsInfo] = useState<string>('');

  const handleModeChange = (_: React.MouseEvent<HTMLElement>, newMode: ConversionMode | null) => {
    if (newMode !== null) {
      setMode(newMode);
    }
  };

  const handleFileSelect = async (file: File) => {
    console.log('File selected:', file.name);
    setOriginalFileName(file.name);
    setState('processing');

    try {
      if (mode === 'to-webp') {
        const webpBlob = await convertToWebP(file, 0.9);
        setResultBlob(webpBlob);
        const savings = Math.round(((file.size - webpBlob.size) / file.size) * 100);
        setSavingsInfo(
          `Reduced from ${formatFileSize(file.size)} to ${formatFileSize(webpBlob.size)} (${savings}% savings)`
        );
      } else {
        // Convert from WebP to JPG
        const result = await compressImage(file, { quality: 0.95, format: 'jpeg' });
        setResultBlob(result.blob);
        setSavingsInfo('');
      }
      setState('complete');
    } catch (error) {
      console.error('Error converting image:', error);
      alert('Failed to convert image. Please try again.');
      setState('upload');
    }
  };

  const handleDownload = () => {
    if (resultBlob) {
      let filename = originalFileName;
      if (mode === 'to-webp') {
        filename = originalFileName.replace(/\.(jpg|jpeg|png)$/i, '.webp');
      } else {
        filename = originalFileName.replace(/\.webp$/i, '.jpg');
      }
      downloadBlob(resultBlob, filename);
    }
  };

  const handleProcessAnother = () => {
    setState('upload');
    setResultBlob(null);
    setSavingsInfo('');
  };

  return (
    <>
      <SEO
        title="WebP Converter"
        description="Convert images to WebP format online for free. Convert JPG/PNG to WebP or WebP to JPG. Reduce file size with modern image format."
        keywords="webp converter, convert to webp, webp to jpg, image converter, optimize images"
        canonical="https://fileswift.app/webp-converter"
      />
      <Header />
      <Container maxWidth="lg" sx={{ py: 8, minHeight: '70vh' }}>
        <Stack spacing={4} alignItems="center">
          <Stack spacing={2} alignItems="center" sx={{ maxWidth: 600 }}>
            <Typography variant="h1" sx={{ textAlign: 'center' }}>
              WebP Converter
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ textAlign: 'center' }}>
              Convert images to modern WebP format for better compression, or convert WebP back to JPG/PNG.
            </Typography>
          </Stack>

          {state === 'upload' && (
            <Stack spacing={3} alignItems="center">
              <ToggleButtonGroup
                value={mode}
                exclusive
                onChange={handleModeChange}
                aria-label="conversion mode"
                sx={{ mb: 2 }}
              >
                <ToggleButton value="to-webp" aria-label="convert to webp" sx={{ px: 4, py: 1.5 }}>
                  <Typography variant="button">Convert TO WebP</Typography>
                </ToggleButton>
                <ToggleButton value="from-webp" aria-label="convert from webp" sx={{ px: 4, py: 1.5 }}>
                  <Typography variant="button">Convert FROM WebP</Typography>
                </ToggleButton>
              </ToggleButtonGroup>
              <DropZone
                onFileSelect={handleFileSelect}
                acceptedFormats={mode === 'to-webp' ? '.jpg,.jpeg,.png' : '.webp'}
                maxSize={50}
                fileType={mode === 'to-webp' ? 'JPG/PNG image' : 'WebP image'}
              />
            </Stack>
          )}

          {state === 'processing' && (
            <ProcessingState message="Converting your image..." />
          )}

          {state === 'complete' && (
            <ResultState
              onDownload={handleDownload}
              onProcessAnother={handleProcessAnother}
              message="Your image is converted!"
              savingsMessage={savingsInfo || undefined}
            />
          )}
        </Stack>
      </Container>
      <Footer />
    </>
  );
}