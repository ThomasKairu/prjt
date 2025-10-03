import { Box, Container, Stack, Typography, Link as MuiLink, Divider } from '@mui/material';
import { Link } from 'react-router-dom';

const toolLinks = [
  { name: 'PDF Compressor', path: '/pdf-compressor' },
  { name: 'PDF Merger', path: '/pdf-merger' },
  { name: 'PDF Splitter', path: '/pdf-splitter' },
  { name: 'PDF Password Protector', path: '/pdf-password-protector' },
  { name: 'Watermark Adder', path: '/watermark-adder' },
  { name: 'Image Compressor', path: '/image-compressor' },
  { name: 'HEIC to JPG', path: '/heic-converter' },
  { name: 'Social Media Resizer', path: '/social-media-resizer' },
  { name: 'WebP Converter', path: '/webp-converter' },
];

export default function Footer() {
  return (
    <Box component="footer" sx={{ bgcolor: 'background.paper', py: 8, mt: 8 }}>
      <Container maxWidth="lg">
        <Divider sx={{ mb: 4 }} />
        <Stack spacing={4}>
          <Stack direction={{ xs: 'column', md: 'row' }} spacing={4} justifyContent="space-between">
            <Stack spacing={2}>
              <Typography variant="h4" sx={{ fontWeight: 700 }}>
                FileSwift
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ maxWidth: 300 }}>
                Free online tools for PDF and image manipulation. Fast, secure, and easy to use.
              </Typography>
            </Stack>
            <Stack spacing={2}>
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                Tools
              </Typography>
              <Stack spacing={1}>
                {toolLinks.slice(0, 5).map((tool) => (
                  <MuiLink
                    key={tool.path}
                    component={Link}
                    to={tool.path}
                    color="text.secondary"
                    underline="hover"
                    sx={{ fontSize: '14px' }}
                  >
                    {tool.name}
                  </MuiLink>
                ))}
              </Stack>
            </Stack>
            <Stack spacing={2}>
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                More Tools
              </Typography>
              <Stack spacing={1}>
                {toolLinks.slice(5).map((tool) => (
                  <MuiLink
                    key={tool.path}
                    component={Link}
                    to={tool.path}
                    color="text.secondary"
                    underline="hover"
                    sx={{ fontSize: '14px' }}
                  >
                    {tool.name}
                  </MuiLink>
                ))}
              </Stack>
            </Stack>
          </Stack>
          <Divider />
          <Stack direction="row" spacing={3} justifyContent="center">
            <Typography variant="caption" color="text.secondary">
              © 2025 FileSwift. All rights reserved.
            </Typography>
            <MuiLink component={Link} to="/privacy" color="text.secondary" underline="hover" sx={{ fontSize: '14px' }}>
              Privacy Policy
            </MuiLink>
            <MuiLink component={Link} to="/terms" color="text.secondary" underline="hover" sx={{ fontSize: '14px' }}>
              Terms of Service
            </MuiLink>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
}