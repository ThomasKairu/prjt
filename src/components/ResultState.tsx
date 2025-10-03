import { Stack, Typography, Button, Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

const AdBanner = styled(Box)(({ theme }) => ({
  width: '100%',
  maxWidth: '728px',
  height: '90px',
  backgroundColor: theme.palette.grey[50],
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: theme.shape.borderRadius,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  marginTop: theme.spacing(3),
}));

const AnimatedCheckmark = styled(CheckCircleOutlineIcon)(({ theme }) => ({
  fontSize: 64,
  color: theme.palette.success.main,
  animation: 'drawCheckmark 500ms ease-out',
}));

interface ResultStateProps {
  onDownload: () => void;
  onProcessAnother: () => void;
  message?: string;
  savingsMessage?: string;
}

export default function ResultState({
  onDownload,
  onProcessAnother,
  message = 'Your file is ready!',
  savingsMessage,
}: ResultStateProps) {
  return (
    <Stack spacing={3} alignItems="center" sx={{ width: '100%', maxWidth: '600px', py: 4 }}>
      <AnimatedCheckmark className="fade-in" />
      <Typography variant="h3" sx={{ fontWeight: 600, textAlign: 'center' }}>
        {message}
      </Typography>
      {savingsMessage && (
        <Typography variant="h4" color="success.main" sx={{ fontWeight: 600, textAlign: 'center' }}>
          {savingsMessage}
        </Typography>
      )}
      
      
      
      <Button
        variant="contained"
        size="large"
        onClick={onDownload}
        sx={{
          minWidth: 250,
          py: 2,
          fontSize: '18px',
          animation: 'pulse 2s ease-in-out infinite',
        }}
      >
        Download File
      </Button>
      <Button
        variant="text"
        onClick={onProcessAnother}
        sx={{
          color: 'text.secondary',
          '&:hover': {
            backgroundColor: 'transparent',
            color: 'primary.main',
          },
        }}
      >
        Process another file
      </Button>
      <AdBanner>
        <Typography variant="caption" color="text.secondary">
          Advertisement (728x90)
        </Typography>
      </AdBanner>
    </Stack>
  );
}