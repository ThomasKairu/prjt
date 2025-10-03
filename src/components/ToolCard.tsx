import { Card, CardContent, Stack, Typography, Box, type SvgIconProps } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Link } from 'react-router-dom';
import type { ComponentType } from 'react';

const GlassCard = styled(Card)(({ theme }) => ({
  background: `linear-gradient(135deg, ${theme.palette.background.paper} 0%, ${theme.palette.grey[50]} 100%)`,
  backdropFilter: 'blur(10px)',
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: `${(theme.shape.borderRadius as number) * 2}px`,
  transition: 'all 200ms ease-out',
  cursor: 'pointer',
  height: '100%',
  '&:hover': {
    transform: 'translateY(-8px)',
    boxShadow: `0 12px 24px ${theme.palette.primary.main}20`,
    borderColor: theme.palette.primary.main,
  },
}));

const IconWrapper = styled(Box)(({ theme }) => ({
  width: 64,
  height: 64,
  borderRadius: `${(theme.shape.borderRadius as number) * 1.5}px`,
  background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.light} 100%)`,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  color: '#FFFFFF',
  transition: 'all 200ms ease-out',
  '.MuiCard-root:hover &': {
    transform: 'scale(1.1) rotate(5deg)',
  },
}));

interface ToolCardProps {
  icon: ComponentType<SvgIconProps>;
  title: string;
  description: string;
  path: string;
}

export default function ToolCard({ icon: Icon, title, description, path }: ToolCardProps) {
  return (
    <Link to={path} style={{ textDecoration: 'none' }}>
      <GlassCard>
        <CardContent sx={{ p: 3 }}>
          <Stack spacing={2}>
            <IconWrapper>
              <Icon sx={{ fontSize: 32 }} />
            </IconWrapper>
            <Typography variant="h4" sx={{ fontWeight: 600 }}>
              {title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {description}
            </Typography>
          </Stack>
        </CardContent>
      </GlassCard>
    </Link>
  );
}