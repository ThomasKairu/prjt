import { Stack, Typography, CircularProgress, LinearProgress, Box } from '@mui/material';
import { styled } from '@mui/material/styles';

const AdPlaceholder = styled(Box)(({ theme }) => ({
  width: '300px',
  height: '250px',
  backgroundColor: theme.palette.grey[50],
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: theme.shape.borderRadius,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  '@media (max-width: 768px)': {
    width: '100%',
    marginTop: theme.spacing(3),
  },
}));

interface ProcessingStateProps {
  message?: string;
  progress?: number;
  showProgress?: boolean;
}

export default function ProcessingState({
  message = 'Processing your file...',
  progress,
  showProgress = false,
}: ProcessingStateProps) {
  return (
    <Stack
      direction={{ xs: 'column', md: 'row' }}
      spacing={3}
      sx={{
        width: '100%',
        maxWidth: '900px',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Stack spacing={3} sx={{ flex: 1, alignItems: 'center', py: 4 }}>
        <CircularProgress size={48} thickness={4} sx={{ color: 'primary.main' }} />
        <Typography variant="h4" sx={{ fontWeight: 600, textAlign: 'center' }}>
          {message}
        </Typography>
        {showProgress && progress !== undefined && (
          <Stack spacing={1} sx={{ width: '100%', maxWidth: 400 }}>
            <LinearProgress
              variant="determinate"
              value={progress}
              sx={{
                height: 8,
                borderRadius: 4,
                backgroundColor: 'grey.200',
                '& .MuiLinearProgress-bar': {
                  borderRadius: 4,
                },
              }}
            />
            <Typography variant="caption" color="text.secondary" sx={{ textAlign: 'center' }}>
              {progress}% complete
            </Typography>
          </Stack>
        )}
        {!showProgress && (
          <Typography variant="body1" color="text.secondary" sx={{ textAlign: 'center' }}>
            Almost done...
          </Typography>
        )}
      </Stack>
      <AdPlaceholder>
        <Typography variant="caption" color="text.secondary">
          Advertisement (300x250)
        </Typography>
      </AdPlaceholder>
    </Stack>
  );
}