import { useState, useRef } from 'react';
import { Container, Stack, Typography, Button, Box, IconButton, Paper } from '@mui/material';
import { styled } from '@mui/material/styles';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ProcessingState from '../components/ProcessingState';
import SEO from '../components/SEO';
import ResultState from '../components/ResultState';
import CloudUploadOutlinedIcon from '@mui/icons-material/CloudUploadOutlined';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import PictureAsPdfOutlinedIcon from '@mui/icons-material/PictureAsPdfOutlined';
import { mergePDFs, downloadBlob } from '../utils/pdfProcessor';

type PageState = 'upload' | 'processing' | 'complete';

const FileCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(2),
  cursor: 'move',
  transition: 'all 200ms ease-out',
  '&:hover': {
    boxShadow: theme.shadows[4],
    transform: 'translateY(-2px)',
  },
}));

interface FileItem {
  id: string;
  file: File;
  name: string;
  size: string;
}

export default function PdfMergerPage() {
  const [state, setState] = useState<PageState>('upload');
  const [files, setFiles] = useState<FileItem[]>([]);
  const [resultBlob, setResultBlob] = useState<Blob | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = event.target.files;
    if (selectedFiles) {
      const newFiles: FileItem[] = Array.from(selectedFiles).map((file) => ({
        id: Math.random().toString(36).substr(2, 9),
        file,
        name: file.name,
        size: `${(file.size / 1024 / 1024).toFixed(2)} MB`,
      }));
      setFiles([...files, ...newFiles]);
    }
    // Reset input value to allow selecting the same file again
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleRemoveFile = (id: string) => {
    setFiles(files.filter((file) => file.id !== id));
  };

  const handleMerge = async () => {
    if (files.length < 2) {
      alert('Please select at least 2 PDF files to merge');
      return;
    }

    setState('processing');

    try {
      const fileObjects = files.map((f) => f.file);
      const mergedBlob = await mergePDFs(fileObjects);
      setResultBlob(mergedBlob);
      setState('complete');
    } catch (error) {
      console.error('Error merging PDFs:', error);
      alert('Failed to merge PDFs. Please try again.');
      setState('upload');
    }
  };

  const handleDownload = () => {
    if (resultBlob) {
      downloadBlob(resultBlob, 'merged.pdf');
    }
  };

  const handleProcessAnother = () => {
    setState('upload');
    setFiles([]);
    setResultBlob(null);
  };

  return (
    <>
      <SEO
        title="PDF Merger"
        description="Merge multiple PDF files into one document online for free. Combine PDFs easily with drag-and-drop reordering. 100% client-side processing."
        keywords="merge pdf, combine pdf, join pdf, pdf merger, merge pdf files, combine pdf online free"
        canonical="https://fileswift.app/pdf-merger"
      />
      <Header />
      <Container maxWidth="lg" sx={{ py: 8, minHeight: '70vh' }}>
        <Stack spacing={4} alignItems="center">
          <Stack spacing={2} alignItems="center" sx={{ maxWidth: 600 }}>
            <Typography variant="h1" sx={{ textAlign: 'center' }}>
              PDF Merger
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ textAlign: 'center' }}>
              Combine multiple PDF files into a single document. Drag to reorder pages before merging.
            </Typography>
          </Stack>

          {state === 'upload' && (
            <Stack spacing={3} sx={{ width: '100%', maxWidth: 600 }}>
              <Button
                variant="outlined"
                component="label"
                size="large"
                startIcon={<CloudUploadOutlinedIcon />}
                sx={{ py: 2 }}
              >
                Select PDF Files
                <input
                  type="file"
                  hidden
                  multiple
                  accept=".pdf"
                  onChange={handleFileSelect}
                />
              </Button>

              {files.length > 0 && (
                <Stack spacing={2}>
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    Selected Files ({files.length})
                  </Typography>
                  {files.map((file) => (
                    <FileCard key={file.id} elevation={1}>
                      <DragIndicatorIcon sx={{ color: 'text.secondary', cursor: 'grab' }} />
                      <PictureAsPdfOutlinedIcon sx={{ color: 'error.main', fontSize: 32 }} />
                      <Box sx={{ flex: 1 }}>
                        <Typography variant="body1" sx={{ fontWeight: 500 }}>
                          {file.name}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {file.size}
                        </Typography>
                      </Box>
                      <IconButton
                        size="small"
                        onClick={() => handleRemoveFile(file.id)}
                        sx={{ color: 'error.main' }}
                      >
                        <DeleteOutlineIcon />
                      </IconButton>
                    </FileCard>
                  ))}
                  <Button
                    variant="contained"
                    size="large"
                    onClick={handleMerge}
                    disabled={files.length < 2}
                    sx={{ mt: 2 }}
                  >
                    Merge {files.length} PDFs
                  </Button>
                </Stack>
              )}
            </Stack>
          )}

          {state === 'processing' && (
            <ProcessingState message="Merging your PDFs..." />
          )}

          {state === 'complete' && (
            <ResultState
              onDownload={handleDownload}
              onProcessAnother={handleProcessAnother}
              message="Your PDFs are merged!"
            />
          )}
        </Stack>
      </Container>
      <Footer />
    </>
  );
}