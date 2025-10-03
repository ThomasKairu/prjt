import { useState } from 'react';
import { Container, Stack, Typography, Grid, Card, CardMedia, CardContent, Checkbox, Button, Box } from '@mui/material';
import Header from '../components/Header';
import Footer from '../components/Footer';
import SEO from '../components/SEO';
import DropZone from '../components/DropZone';
import ProcessingState from '../components/ProcessingState';
import ResultState from '../components/ResultState';
import { generatePDFThumbnails, type PDFPageThumbnail } from '../utils/pdfThumbnails';
import { splitPDF, downloadBlob } from '../utils/pdfProcessor';

type PageState = 'upload' | 'selecting' | 'processing' | 'complete';

export default function PdfSplitterPage() {
  const [state, setState] = useState<PageState>('upload');
  const [thumbnails, setThumbnails] = useState<PDFPageThumbnail[]>([]);
  const [selectedPages, setSelectedPages] = useState<Set<number>>(new Set());
  const [originalFile, setOriginalFile] = useState<File | null>(null);
  const [resultBlob, setResultBlob] = useState<Blob | null>(null);

  const handleFileSelect = async (file: File) => {
    console.log('File selected:', file.name);
    setOriginalFile(file);
    setState('processing');

    try {
      const thumbs = await generatePDFThumbnails(file, 200);
      setThumbnails(thumbs);
      setState('selecting');
    } catch (error) {
      console.error('Error generating thumbnails:', error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      alert(`Failed to load PDF: ${errorMessage}\n\nPlease ensure:\n- The file is a valid PDF\n- The file is not corrupted\n- The file is not password protected`);
      setState('upload');
    }
  };

  const handlePageToggle = (pageNumber: number) => {
    const newSelected = new Set(selectedPages);
    if (newSelected.has(pageNumber)) {
      newSelected.delete(pageNumber);
    } else {
      newSelected.add(pageNumber);
    }
    setSelectedPages(newSelected);
  };

  const handleExtract = async () => {
    if (!originalFile || selectedPages.size === 0) {
      alert('Please select at least one page to extract');
      return;
    }

    setState('processing');

    try {
      // Convert to 0-based indices
      const pageIndices = Array.from(selectedPages).map(p => p - 1);
      const blob = await splitPDF(originalFile, pageIndices);
      setResultBlob(blob);
      setState('complete');
    } catch (error) {
      console.error('Error splitting PDF:', error);
      alert('Failed to split PDF. Please try again.');
      setState('selecting');
    }
  };

  const handleDownload = () => {
    if (resultBlob) {
      downloadBlob(resultBlob, 'extracted_pages.pdf');
    }
  };

  const handleProcessAnother = () => {
    setState('upload');
    setThumbnails([]);
    setSelectedPages(new Set());
    setOriginalFile(null);
    setResultBlob(null);
  };

  return (
    <>
      <SEO
        title="PDF Splitter"
        description="Split PDF files online for free. Extract specific pages from PDF documents. Easy page selection with thumbnails. 100% client-side processing."
        keywords="split pdf, extract pdf pages, pdf splitter, separate pdf pages, pdf page extractor"
        canonical="https://fileswift.app/pdf-splitter"
      />
      <Header />
      <Container maxWidth="lg" sx={{ py: 8, minHeight: '70vh' }}>
        <Stack spacing={4} alignItems="center">
          <Stack spacing={2} alignItems="center" sx={{ maxWidth: 600 }}>
            <Typography variant="h1" sx={{ textAlign: 'center' }}>
              PDF Splitter
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ textAlign: 'center' }}>
              Extract specific pages or split your PDF into multiple files.
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

          {state === 'selecting' && (
            <Box sx={{ width: '100%' }}>
              <Stack spacing={3}>
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  Select Pages to Extract ({selectedPages.size} selected)
                </Typography>
                <Grid container spacing={2}>
                  {thumbnails.map((thumb) => (
                    <Grid size={{ xs: 6, sm: 4, md: 3 }} key={thumb.pageNumber}>
                      <Card
                        sx={{
                          cursor: 'pointer',
                          border: selectedPages.has(thumb.pageNumber) ? 2 : 0,
                          borderColor: 'primary.main',
                          transition: 'all 0.2s',
                          '&:hover': {
                            transform: 'scale(1.05)',
                            boxShadow: 4,
                          },
                        }}
                        onClick={() => handlePageToggle(thumb.pageNumber)}
                      >
                        <Box sx={{ position: 'relative' }}>
                          <CardMedia
                            component="img"
                            image={thumb.dataUrl}
                            alt={`Page ${thumb.pageNumber}`}
                            sx={{ width: '100%', height: 'auto' }}
                          />
                          <Checkbox
                            checked={selectedPages.has(thumb.pageNumber)}
                            sx={{
                              position: 'absolute',
                              top: 8,
                              right: 8,
                              bgcolor: 'background.paper',
                              '&:hover': { bgcolor: 'background.paper' },
                            }}
                          />
                        </Box>
                        <CardContent>
                          <Typography variant="body2" align="center">
                            Page {thumb.pageNumber}
                          </Typography>
                        </CardContent>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
                <Button
                  variant="contained"
                  size="large"
                  onClick={handleExtract}
                  disabled={selectedPages.size === 0}
                  sx={{ maxWidth: 400, alignSelf: 'center' }}
                >
                  Extract {selectedPages.size} Page{selectedPages.size !== 1 ? 's' : ''}
                </Button>
              </Stack>
            </Box>
          )}

          {state === 'processing' && (
            <ProcessingState message="Extracting pages..." />
          )}

          {state === 'complete' && (
            <ResultState
              onDownload={handleDownload}
              onProcessAnother={handleProcessAnother}
              message="Your pages are extracted!"
            />
          )}
        </Stack>
      </Container>
      <Footer />
    </>
  );
}