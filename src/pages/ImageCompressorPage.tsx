import { useState } from 'react';
import { Container, Stack, Typography, Slider, Box, Button, Paper } from '@mui/material';
import Header from '../components/Header';
import Footer from '../components/Footer';
import SEO from '../components/SEO';
import DropZone from '../components/DropZone';
import ProcessingState from '../components/ProcessingState';
import ResultState from '../components/ResultState';
import { compressImage, downloadBlob, formatFileSize } from '../utils/imageProcessor';

type PageState = 'upload' | 'adjusting' | 'processing' | 'complete';

export default function ImageCompressorPage() {
  const [state, setState] = useState<PageState>('upload');
  const [quality, setQuality] = useState<number>(0.8);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [resultBlob, setResultBlob] = useState<Blob | null>(null);
  const [originalFileName, setOriginalFileName] = useState<string>('');
  const [savingsInfo, setSavingsInfo] = useState<string>('');

  const handleFileSelect = (file: File) => {
    console.log('File selected:', file.name);
    setSelectedFile(file);
    setOriginalFileName(file.name);
    setState('adjusting');
  };

  const handleCompress = async () => {
    if (!selectedFile) return;

    setState('processing');

    try {
      const result = await compressImage(selectedFile, { quality });
      setResultBlob(result.blob);
      setSavingsInfo(
        `Reduced from ${formatFileSize(result.originalSize)} to ${formatFileSize(result.compressedSize)} (${result.savings}% savings)`
      );
      setState('complete');
    } catch (error) {
      console.error('Error compressing image:', error);
      alert('Failed to compress image. Please try again.');
      setState('adjusting');
    }
  };

  const handleDownload = () => {
    if (resultBlob) {
      const extension = originalFileName.split('.').pop() || 'jpg';
      const filename = originalFileName.replace(`.${extension}`, `_compressed.${extension}`);
      downloadBlob(resultBlob, filename);
    }
  };

  const handleProcessAnother = () => {
    setState('upload');
    setSelectedFile(null);
    setResultBlob(null);
    setSavingsInfo('');
    setQuality(0.8);
  };

  return (
    <>
      <SEO
        title="Image Compressor"
        description="Compress images online for free. Reduce image file size while maintaining quality. Optimize JPG, PNG, WebP images for web. Client-side processing."
        keywords="compress image, reduce image size, image compressor, optimize images, shrink images, compress jpg, compress png"
        canonical="https://fileswift.app/image-compressor"
      />
      <Header />
      <Container maxWidth="lg" sx={{ py: 8, minHeight: '70vh' }}>
        <Stack spacing={4} alignItems="center">
          <Stack spacing={2} alignItems="center" sx={{ maxWidth: 600 }}>
            <Typography variant="h1" sx={{ textAlign: 'center' }}>
              Image Compressor
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ textAlign: 'center' }}>
              Reduce image file size while maintaining visual quality. Perfect for web optimization.
            </Typography>
          </Stack>

          {state === 'upload' && (
            <DropZone
              onFileSelect={handleFileSelect}
              acceptedFormats=".jpg,.jpeg,.png,.webp"
              maxSize={50}
              fileType="image"
            />
          )}

          {state === 'adjusting' && selectedFile && (
            <Paper sx={{ p: 4, width: '100%', maxWidth: 600 }}>
              <Stack spacing={3}>
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  Adjust Compression Quality
                </Typography>
                <Box>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    Quality: {Math.round(quality * 100)}%
                  </Typography>
                  <Slider
                    value={quality}
                    onChange={(_, value) => setQuality(value as number)}
                    min={0.1}
                    max={1.0}
                    step={0.1}
                    marks={[
                      { value: 0.3, label: 'Low' },
                      { value: 0.6, label: 'Medium' },
                      { value: 0.9, label: 'High' },
                    ]}
                    valueLabelDisplay="auto"
                    valueLabelFormat={(value) => `${Math.round(value * 100)}%`}
                  />
                </Box>
                <Typography variant="caption" color="text.secondary">
                  Lower quality = smaller file size. Higher quality = better image.
                </Typography>
                <Button
                  variant="contained"
                  size="large"
                  onClick={handleCompress}
                  fullWidth
                >
                  Compress Image
                </Button>
              </Stack>
            </Paper>
          )}

          {state === 'processing' && (
            <ProcessingState message="Compressing your image..." />
          )}

          {state === 'complete' && (
            <ResultState
              onDownload={handleDownload}
              onProcessAnother={handleProcessAnother}
              message="Your image is compressed!"
              savingsMessage={savingsInfo}
            />
          )}
        </Stack>
      </Container>
      <Footer />
    </>
  );
}