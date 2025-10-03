import { useState } from 'react';
import { Container, Stack, Typography } from '@mui/material';
import Header from '../components/Header';
import Footer from '../components/Footer';
import SEO from '../components/SEO';
import DropZone from '../components/DropZone';
import ProcessingState from '../components/ProcessingState';
import ResultState from '../components/ResultState';
import { convertHeicToJpg, downloadBlob } from '../utils/imageProcessor';

type PageState = 'upload' | 'processing' | 'complete';

export default function HeicConverterPage() {
  const [state, setState] = useState<PageState>('upload');
  const [resultBlob, setResultBlob] = useState<Blob | null>(null);
  const [originalFileName, setOriginalFileName] = useState<string>('');

  const handleFileSelect = async (file: File) => {
    console.log('File selected:', file.name);
    setOriginalFileName(file.name);
    setState('processing');

    try {
      const jpgBlob = await convertHeicToJpg(file);
      setResultBlob(jpgBlob);
      setState('complete');
    } catch (error) {
      console.error('Error converting HEIC:', error);
      alert('Failed to convert HEIC file. Please try again.');
      setState('upload');
    }
  };

  const handleDownload = () => {
    if (resultBlob) {
      const filename = originalFileName.replace(/\.heic$/i, '.jpg');
      downloadBlob(resultBlob, filename);
    }
  };

  const handleProcessAnother = () => {
    setState('upload');
    setResultBlob(null);
  };

  return (
    <>
      <SEO
        title="HEIC to JPG Converter"
        description="Convert iPhone HEIC photos to JPG format online for free. Fast, secure, client-side conversion. No file upload to servers."
        keywords="heic to jpg, heic converter, convert heic, iphone photo converter, heic to jpeg"
        canonical="https://fileswift.app/heic-converter"
      />
      <Header />
      <Container maxWidth="lg" sx={{ py: 8, minHeight: '70vh' }}>
        <Stack spacing={4} alignItems="center">
          <Stack spacing={2} alignItems="center" sx={{ maxWidth: 600 }}>
            <Typography variant="h1" sx={{ textAlign: 'center' }}>
              HEIC to JPG Converter
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ textAlign: 'center' }}>
              Convert iPhone HEIC photos to universal JPG format for easy sharing.
            </Typography>
          </Stack>

          {state === 'upload' && (
            <DropZone
              onFileSelect={handleFileSelect}
              acceptedFormats=".heic,.heif"
              maxSize={50}
              fileType="HEIC image"
            />
          )}

          {state === 'processing' && (
            <ProcessingState message="Converting to JPG..." />
          )}

          {state === 'complete' && (
            <ResultState
              onDownload={handleDownload}
              onProcessAnother={handleProcessAnother}
              message="Your image is converted!"
            />
          )}
        </Stack>
      </Container>
      <Footer />
    </>
  );
}