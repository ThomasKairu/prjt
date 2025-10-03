import { Container, Stack, Typography, Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ToolCard from '../components/ToolCard';
import SEO from '../components/SEO';
import CompressOutlinedIcon from '@mui/icons-material/CompressOutlined';
import ContentCopyOutlinedIcon from '@mui/icons-material/ContentCopyOutlined';
import ContentCutOutlinedIcon from '@mui/icons-material/ContentCut';
import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined';
import FitScreenOutlinedIcon from '@mui/icons-material/FitScreenOutlined';
import TransformOutlinedIcon from '@mui/icons-material/TransformOutlined';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import BrushOutlinedIcon from '@mui/icons-material/BrushOutlined';

const HeroSection = styled(Box)(({ theme }) => ({
  minHeight: '70vh',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  background: `linear-gradient(135deg, ${theme.palette.background.default} 0%, ${theme.palette.grey[50]} 100%)`,
  position: 'relative',
  overflow: 'hidden',
  padding: theme.spacing(8, 0),
  '&::before': {
    content: '""',
    position: 'absolute',
    top: '-50%',
    right: '-20%',
    width: '600px',
    height: '600px',
    background: `radial-gradient(circle, ${theme.palette.primary.main}15 0%, transparent 70%)`,
    borderRadius: '50%',
    animation: 'pulse 4s ease-in-out infinite',
  },
  '&::after': {
    content: '""',
    position: 'absolute',
    bottom: '-30%',
    left: '-10%',
    width: '400px',
    height: '400px',
    background: `radial-gradient(circle, ${theme.palette.primary.light}10 0%, transparent 70%)`,
    borderRadius: '50%',
    animation: 'pulse 3s ease-in-out infinite',
  },
}));

const TrustBadge = styled(Stack)(({ theme }) => ({
  flexDirection: 'row',
  gap: theme.spacing(3),
  color: theme.palette.text.secondary,
  fontSize: '14px',
  fontWeight: 500,
}));

const tools = [
  {
    icon: CompressOutlinedIcon,
    title: 'PDF Compressor',
    description: 'Reduce PDF file size while maintaining quality',
    path: '/pdf-compressor',
  },
  {
    icon: ContentCopyOutlinedIcon,
    title: 'PDF Merger',
    description: 'Combine multiple PDFs into a single document',
    path: '/pdf-merger',
  },
  {
    icon: ContentCutOutlinedIcon,
    title: 'PDF Splitter',
    description: 'Extract pages or split PDF into multiple files',
    path: '/pdf-splitter',
  },
  {
    icon: LockOutlinedIcon,
    title: 'PDF Password Protector',
    description: 'Secure your PDFs with password encryption',
    path: '/pdf-password-protector',
  },
  {
    icon: BrushOutlinedIcon,
    title: 'Watermark Adder',
    description: 'Add custom watermarks to PDFs and images',
    path: '/watermark-adder',
  },
  {
    icon: ImageOutlinedIcon,
    title: 'Image Compressor',
    description: 'Optimize images for web and reduce file size',
    path: '/image-compressor',
  },
  {
    icon: ImageOutlinedIcon,
    title: 'HEIC to JPG',
    description: 'Convert iPhone photos to universal JPG format',
    path: '/heic-converter',
  },
  {
    icon: FitScreenOutlinedIcon,
    title: 'Social Media Resizer',
    description: 'Resize images for Instagram, Facebook, and more',
    path: '/social-media-resizer',
  },
  {
    icon: TransformOutlinedIcon,
    title: 'WebP Converter',
    description: 'Convert images to and from modern WebP format',
    path: '/webp-converter',
  },
];

export default function HomePage() {
  return (
    <>
      <SEO
        title="Home"
        description="Free online tools for PDF and image manipulation. Compress, merge, split PDFs, convert images, add watermarks, and more. Fast, secure, and easy to use. No signup required."
        keywords="pdf compressor, pdf merger, pdf splitter, image compressor, heic to jpg, watermark pdf, password protect pdf, free pdf tools, online pdf editor"
        canonical="https://fileswift.app/"
      />
      <Header />
      <HeroSection>
        <Container maxWidth="lg">
          <Stack spacing={4} alignItems="center" sx={{ position: 'relative', zIndex: 1 }}>
            <Typography
              variant="h1"
              sx={{
                textAlign: 'center',
                maxWidth: 800,
                background: 'linear-gradient(135deg, #2C3E50 0%, #0066FF 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
              className="slide-up"
            >
              Free Online Tools for PDF & Image Manipulation
            </Typography>
            <Typography
              variant="body1"
              color="text.secondary"
              sx={{ textAlign: 'center', maxWidth: 600, fontSize: '20px' }}
              className="slide-up"
            >
              Fast, secure, and easy to use. No signup required. Process your files in seconds.
            </Typography>
            <TrustBadge className="fade-in">
              <Typography>✓ Free</Typography>
              <Typography>✓ No signup</Typography>
              <Typography>✓ Secure</Typography>
            </TrustBadge>
          </Stack>
        </Container>
      </HeroSection>

      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Stack spacing={6}>
          <Stack spacing={2} alignItems="center">
            <Typography variant="h2" sx={{ textAlign: 'center', fontWeight: 700 }}>
              Choose Your Tool
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ textAlign: 'center', maxWidth: 600 }}>
              Select from our suite of powerful tools designed to solve your file manipulation needs
            </Typography>
          </Stack>

          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: {
                xs: '1fr',
                sm: 'repeat(2, 1fr)',
                md: 'repeat(3, 1fr)',
              },
              gap: 3,
            }}
          >
            {tools.map((tool, index) => (
              <Box
                key={tool.path}
                className="slide-up"
                sx={{
                  animationDelay: `${index * 50}ms`,
                }}
              >
                <ToolCard {...tool} />
              </Box>
            ))}
          </Box>
        </Stack>
      </Container>

      <Box sx={{ bgcolor: 'grey.50', py: 8 }}>
        <Container maxWidth="lg">
          <Stack spacing={6}>
            <Typography variant="h2" sx={{ textAlign: 'center', fontWeight: 700 }}>
              How It Works
            </Typography>
            <Stack
              direction={{ xs: 'column', md: 'row' }}
              spacing={4}
              justifyContent="space-around"
              alignItems="center"
            >
              {[
                { step: '1', title: 'Upload', description: 'Drag & drop or click to select your file' },
                { step: '2', title: 'Process', description: 'We handle the conversion automatically' },
                { step: '3', title: 'Download', description: 'Get your processed file instantly' },
              ].map((item) => (
                <Stack key={item.step} spacing={2} alignItems="center" sx={{ maxWidth: 300 }}>
                  <Box
                    sx={{
                      width: 80,
                      height: 80,
                      borderRadius: '50%',
                      bgcolor: 'primary.main',
                      color: 'white',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      fontSize: '32px',
                      fontWeight: 700,
                    }}
                  >
                    {item.step}
                  </Box>
                  <Typography variant="h4" sx={{ fontWeight: 600 }}>
                    {item.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center' }}>
                    {item.description}
                  </Typography>
                </Stack>
              ))}
            </Stack>
          </Stack>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Stack spacing={4} alignItems="center">
          <Typography variant="h2" sx={{ textAlign: 'center', fontWeight: 700 }}>
            Trusted by Thousands
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ textAlign: 'center', maxWidth: 700 }}>
            All processing happens locally in your browser. Your files never leave your device, ensuring maximum privacy. No server storage or cloud processing required.
          </Typography>
        </Stack>
      </Container>

      <Footer />
    </>
  );
}