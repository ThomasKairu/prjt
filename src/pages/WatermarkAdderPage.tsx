import { useState, useRef, useEffect } from 'react';
import {
  Container,
  Stack,
  Typography,
  ToggleButtonGroup,
  ToggleButton,
  TextField,
  Slider,
  Box,
  Button,
  Paper,
  Grid,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import Header from '../components/Header';
import Footer from '../components/Footer';
import DropZone from '../components/DropZone';
import SEO from '../components/SEO';
import ProcessingState from '../components/ProcessingState';
import ResultState from '../components/ResultState';
import BrushOutlinedIcon from '@mui/icons-material/BrushOutlined';
import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined';
import TextFieldsOutlinedIcon from '@mui/icons-material/TextFieldsOutlined';
import { addWatermarkToPDF } from '../utils/pdfProcessor';

type PageState = 'upload' | 'customize' | 'processing' | 'complete';
type WatermarkType = 'text' | 'image';
type FileType = 'pdf' | 'image';
type Position = 'center' | 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';

const CustomizationPanel = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  borderRadius: `${(theme.shape.borderRadius as number) * 2}px`,
  maxWidth: 800,
  width: '100%',
}));

const PreviewCanvas = styled(Box)(({ theme }) => ({
  width: '100%',
  height: 400,
  backgroundColor: theme.palette.grey[100],
  borderRadius: theme.shape.borderRadius,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  position: 'relative',
  overflow: 'hidden',
  border: `2px solid ${theme.palette.divider}`,
}));

const PositionButton = styled(Button, {
  shouldForwardProp: (prop) => prop !== 'isSelected',
})<{ isSelected: boolean }>(({ theme, isSelected }) => ({
  minWidth: 80,
  height: 60,
  border: `2px solid ${isSelected ? theme.palette.primary.main : theme.palette.divider}`,
  backgroundColor: isSelected ? `${theme.palette.primary.main}15` : 'white',
  '&:hover': {
    backgroundColor: isSelected ? `${theme.palette.primary.main}25` : theme.palette.grey[50],
  },
}));

export default function WatermarkAdderPage() {
  const [state, setState] = useState<PageState>('upload');
  const [watermarkType, setWatermarkType] = useState<WatermarkType>('text');
  const [watermarkText, setWatermarkText] = useState('CONFIDENTIAL');
  const [textColor, setTextColor] = useState('#000000');
  const [opacity, setOpacity] = useState(50);
  const [position, setPosition] = useState<Position>('center');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [fileType, setFileType] = useState<FileType>('image');
  const [watermarkedUrl, setWatermarkedUrl] = useState<string>('');
  const [previewUrl, setPreviewUrl] = useState<string>('');
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const positions: Position[] = [
    'top-left', 'center', 'top-right',
    'bottom-left', 'bottom-right',
  ];

  const handleFileSelect = (file: File) => {
    setSelectedFile(file);
    const isPdf = file.type === 'application/pdf';
    setFileType(isPdf ? 'pdf' : 'image');
    
    if (!isPdf) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreviewUrl(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
    
    setState('customize');
  };

  useEffect(() => {
    if (state === 'customize' && fileType === 'image' && previewUrl && canvasRef.current) {
      drawWatermarkPreview();
    }
  }, [watermarkText, textColor, opacity, position, previewUrl, state, fileType]);

  const drawWatermarkPreview = () => {
    const canvas = canvasRef.current;
    if (!canvas || !previewUrl) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const img = new Image();
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);

      // Draw watermark
      ctx.globalAlpha = opacity / 100;
      ctx.fillStyle = textColor;
      ctx.font = `${Math.max(20, img.width / 20)}px Arial`;

      const textMetrics = ctx.measureText(watermarkText);
      const textWidth = textMetrics.width;
      const textHeight = Math.max(20, img.width / 20);

      let x = 0, y = 0;
      switch (position) {
        case 'top-left':
          x = 20;
          y = textHeight + 20;
          break;
        case 'top-right':
          x = canvas.width - textWidth - 20;
          y = textHeight + 20;
          break;
        case 'center':
          x = (canvas.width - textWidth) / 2;
          y = canvas.height / 2;
          break;
        case 'bottom-left':
          x = 20;
          y = canvas.height - 20;
          break;
        case 'bottom-right':
          x = canvas.width - textWidth - 20;
          y = canvas.height - 20;
          break;
      }

      ctx.fillText(watermarkText, x, y);
      ctx.globalAlpha = 1;
    };
    img.src = previewUrl;
  };

  const handleApplyWatermark = async () => {
    if (!selectedFile) return;
    setState('processing');

    try {
      if (fileType === 'image') {
        await applyImageWatermark();
      } else {
        await applyPdfWatermark();
      }
      setState('complete');
    } catch (err) {
      console.error('Error applying watermark:', err);
      setState('customize');
    }
  };

  const applyImageWatermark = async () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    canvas.toBlob((blob) => {
      if (blob) {
        const url = URL.createObjectURL(blob);
        setWatermarkedUrl(url);
      }
    }, 'image/png');
  };

  const applyPdfWatermark = async () => {
    if (!selectedFile) return;

    const hexToRgb = (hex: string) => {
      const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
      return result ? {
        r: parseInt(result[1], 16) / 255,
        g: parseInt(result[2], 16) / 255,
        b: parseInt(result[3], 16) / 255,
      } : { r: 0, g: 0, b: 0 };
    };

    const color = hexToRgb(textColor);

    const blob = await addWatermarkToPDF(selectedFile, {
      text: watermarkText,
      opacity: opacity / 100,
      position,
      color,
    });

    const url = URL.createObjectURL(blob);
    setWatermarkedUrl(url);
  };

  const handleDownload = () => {
    if (watermarkedUrl) {
      const link = document.createElement('a');
      link.href = watermarkedUrl;
      link.download = `watermarked_${selectedFile?.name || 'file'}`;
      link.click();
    }
  };

  const handleProcessAnother = () => {
    setState('upload');
    setSelectedFile(null);
    setWatermarkedUrl('');
    setPreviewUrl('');
    setWatermarkText('CONFIDENTIAL');
  };

  return (
    <>
      <SEO
        title="Watermark Adder"
        description="Add custom text watermarks to your PDFs and images online for free. Protect your content with watermarks. Customize position, color, and opacity. 100% client-side processing."
        keywords="add watermark to pdf, watermark image, pdf watermark, image watermark, watermark tool, protect content, brand images"
        canonical="https://fileswift.app/watermark-adder"
      />
      <Header />
      <Container maxWidth="lg" sx={{ py: 8, minHeight: '70vh' }}>
        <Stack spacing={4} alignItems="center">
          <Stack spacing={2} alignItems="center" sx={{ maxWidth: 600 }}>
            <BrushOutlinedIcon sx={{ fontSize: 48, color: 'primary.main' }} />
            <Typography variant="h1" sx={{ textAlign: 'center' }}>
              Watermark Adder
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ textAlign: 'center' }}>
              Add custom text watermarks to your PDFs and images to protect your content.
            </Typography>
          </Stack>

          {state === 'upload' && (
            <DropZone
              onFileSelect={handleFileSelect}
              acceptedFormats=".pdf,.jpg,.jpeg,.png,.webp"
              maxSize={50}
              fileType="PDF or image"
            />
          )}

          {state === 'customize' && (
            <CustomizationPanel elevation={3}>
              <Stack spacing={3}>
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  Customize Watermark
                </Typography>

                <ToggleButtonGroup
                  value={watermarkType}
                  exclusive
                  onChange={(_, value) => value && setWatermarkType(value)}
                  fullWidth
                >
                  <ToggleButton value="text">
                    <TextFieldsOutlinedIcon sx={{ mr: 1 }} />
                    Text
                  </ToggleButton>
                  <ToggleButton value="image" disabled>
                    <ImageOutlinedIcon sx={{ mr: 1 }} />
                    Image (Coming Soon)
                  </ToggleButton>
                </ToggleButtonGroup>

                {watermarkType === 'text' && (
                  <>
                    <TextField
                      fullWidth
                      label="Watermark Text"
                      value={watermarkText}
                      onChange={(e) => setWatermarkText(e.target.value)}
                    />

                    <Stack direction="row" spacing={2} alignItems="center">
                      <Typography variant="body2" sx={{ minWidth: 80 }}>
                        Color:
                      </Typography>
                      <input
                        type="color"
                        value={textColor}
                        onChange={(e) => setTextColor(e.target.value)}
                        style={{ width: 60, height: 40, border: 'none', cursor: 'pointer' }}
                      />
                    </Stack>

                    <Box>
                      <Typography variant="body2" gutterBottom>
                        Opacity: {opacity}%
                      </Typography>
                      <Slider
                        value={opacity}
                        onChange={(_, value) => setOpacity(value as number)}
                        min={10}
                        max={100}
                        valueLabelDisplay="auto"
                      />
                    </Box>

                    <Box>
                      <Typography variant="body2" gutterBottom sx={{ mb: 2 }}>
                        Position:
                      </Typography>
                      <Grid container spacing={1}>
                        {positions.map((pos) => (
                          <Grid key={pos} size={{ xs: 4 }}>
                            <PositionButton
                              fullWidth
                              isSelected={position === pos}
                              onClick={() => setPosition(pos)}
                            >
                              {pos.replace('-', ' ')}
                            </PositionButton>
                          </Grid>
                        ))}
                      </Grid>
                    </Box>
                  </>
                )}

                {fileType === 'image' && previewUrl && (
                  <Box>
                    <Typography variant="body2" gutterBottom>
                      Preview:
                    </Typography>
                    <PreviewCanvas>
                      <canvas
                        ref={canvasRef}
                        style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }}
                      />
                    </PreviewCanvas>
                  </Box>
                )}

                <Stack direction="row" spacing={2}>
                  <Button
                    variant="outlined"
                    onClick={() => setState('upload')}
                    sx={{ flex: 1 }}
                  >
                    Back
                  </Button>
                  <Button
                    variant="contained"
                    onClick={handleApplyWatermark}
                    sx={{ flex: 1 }}
                  >
                    Apply Watermark
                  </Button>
                </Stack>
              </Stack>
            </CustomizationPanel>
          )}

          {state === 'processing' && (
            <ProcessingState message="Applying watermark..." />
          )}

          {state === 'complete' && (
            <ResultState
              onDownload={handleDownload}
              onProcessAnother={handleProcessAnother}
              message="Watermark applied successfully!"
            />
          )}
        </Stack>
      </Container>
      <Footer />
    </>
  );
}