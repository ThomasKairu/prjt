import { AppBar, Toolbar, Typography, Container, Stack } from '@mui/material';
import { Link } from 'react-router-dom';
import { styled } from '@mui/material/styles';

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
  boxShadow: 'none',
  borderBottom: `1px solid ${theme.palette.divider}`,
}));

const Logo = styled(Typography)(({ theme }) => ({
  fontWeight: 700,
  fontSize: '24px',
  background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.light} 100%)`,
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  textDecoration: 'none',
  cursor: 'pointer',
}));

const AdBanner = styled(Stack)(({ theme }) => ({
  width: '100%',
  height: '90px',
  backgroundColor: theme.palette.grey[50],
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: theme.shape.borderRadius,
  justifyContent: 'center',
  alignItems: 'center',
  marginBottom: theme.spacing(2),
}));

export default function Header() {
  return (
    <>
      <Container maxWidth="lg" sx={{ mt: 2 }}>
        <AdBanner>
          <Typography variant="caption" color="text.secondary">
            Advertisement (728x90)
          </Typography>
        </AdBanner>
      </Container>
      <StyledAppBar position="static">
        <Container maxWidth="lg">
          <Toolbar disableGutters sx={{ py: 2 }}>
            <Link to="/" style={{ textDecoration: 'none' }}>
              <Logo>FileSwift</Logo>
            </Link>
          </Toolbar>
        </Container>
      </StyledAppBar>
    </>
  );
}