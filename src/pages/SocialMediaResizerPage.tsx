import { useState } from 'react';
import { Container, Stack, Typography, Box, Paper } from '@mui/material';
import { styled } from '@mui/material/styles';
import Header from '../components/Header';
import Footer from '../components/Footer';
import SEO from '../components/SEO';
import DropZone from '../components/DropZone';
import ProcessingState from '../components/ProcessingState';
import ResultState from '../components/ResultState';
import CropOutlinedIcon from '@mui/icons-material/CropOutlined';
import { SOCIAL_MEDIA_TEMPLATES, resizeForSocialMedia, downloadBlob, type SocialMediaTemplate } from '../utils/imageProcessor';

type PageState = 'template' | 'upload' | 'processing' | 'complete';

const TemplateCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  textAlign: 'center',
  cursor: 'pointer',
  transition: 'all 200ms ease-out',
  border: `2px solid ${theme.palette.divider}`,
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: theme.shadows[8],
    borderColor: theme.palette.primary.main,
  },
}));

export default function SocialMediaResizerPage() {
  const [state, setState] = useState<PageState>('template');
  const [selectedTemplate, setSelectedTemplate] = useState<SocialMediaTemplate | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [resultBlob, setResultBlob] = useState<Blob | null>(null);

  const handleTemplateSelect = (template: SocialMediaTemplate) => {
    setSelectedTemplate(template);
    setState('upload');
  };

  const handleFileSelect = async (file: File) => {
    console.log('File selected:', file.name);
    setSelectedFile(file);
    setState('processing');

    try {
      if (!selectedTemplate) return;
      
      const blob = await resizeForSocialMedia(file, selectedTemplate);
      setResultBlob(blob);
      setState('complete');
    } catch (error) {
      console.error('Error resizing image:', error);
      alert('Failed to resize image. Please try again.');
      setState('upload');
    }
  };

  const handleDownload = () => {
    if (resultBlob && selectedFile && selectedTemplate) {
      const extension = selectedFile.name.split('.').pop() || 'jpg';
      const filename = selectedFile.name.replace(`.${extension}`, `_${selectedTemplate.name.replace(/\s+/g, '_')}.${extension}`);
      downloadBlob(resultBlob, filename);
    }
  };

  const handleProcessAnother = () => {
    setState('template');
    setSelectedTemplate(null);
    setSelectedFile(null);
    setResultBlob(null);
  };

  return (
    <>
      <SEO
        title="Social Media Image Resizer"
        description="Resize images for social media platforms online for free. Perfect dimensions for Instagram, Facebook, Twitter, LinkedIn, and more. 100% client-side processing."
        keywords="social media resizer, instagram image size, facebook image size, twitter image size, resize for social media, image dimensions"
        canonical="https://fileswift.app/social-media-resizer"
      />
      <Header />
      <Container maxWidth="lg" sx={{ py: 8, minHeight: '70vh' }}>
        <Stack spacing={4} alignItems="center">
          <Stack spacing={2} alignItems="center" sx={{ maxWidth: 600 }}>
            <CropOutlinedIcon sx={{ fontSize: 48, color: 'primary.main' }} />
            <Typography variant="h1" sx={{ textAlign: 'center' }}>
              Social Media Resizer
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ textAlign: 'center' }}>
              Resize images for Instagram, Facebook, Twitter, and more with perfect dimensions.
            </Typography>
          </Stack>

          {state === 'template' && (
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' },
                gap: 3,
                width: '100%',
                maxWidth: 900,
              }}
            >
              {SOCIAL_MEDIA_TEMPLATES.map((template) => (
                <TemplateCard
                  key={template.name}
                  elevation={2}
                  onClick={() => handleTemplateSelect(template)}
                >
                  <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                    {template.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                    {template.width} × {template.height}
                  </Typography>
                  <Typography variant="caption" color="text.disabled">
                    {template.aspectRatio}
                  </Typography>
                </TemplateCard>
              ))}
            </Box>
          )}

          {state === 'upload' && selectedTemplate && (
            <Stack spacing={3} alignItems="center" sx={{ width: '100%' }}>
              <Paper sx={{ p: 3, maxWidth: 500, width: '100%' }}>
                <Stack spacing={2}>
                  <Typography variant="h6" sx={{ fontWeight: 600, textAlign: 'center' }}>
                    {selectedTemplate.name}
                  </Typography>
                  <Box sx={{ textAlign: 'center' }}>
                    <Typography variant="body2" color="text.secondary">
                      Dimensions: {selectedTemplate.width} × {selectedTemplate.height}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Aspect Ratio: {selectedTemplate.aspectRatio}
                    </Typography>
                  </Box>
                </Stack>
              </Paper>
              <DropZone
                onFileSelect={handleFileSelect}
                acceptedFormats=".jpg,.jpeg,.png,.webp"
                maxSize={50}
                fileType="image"
              />
            </Stack>
          )}

          {state === 'processing' && (
            <ProcessingState message="Resizing your image..." />
          )}

          {state === 'complete' && (
            <ResultState
              onDownload={handleDownload}
              onProcessAnother={handleProcessAnother}
              message="Your image is resized!"
            />
          )}
        </Stack>
      </Container>
      <Footer />
    </>
  );
}