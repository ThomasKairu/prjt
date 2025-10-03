import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#0066FF',
      light: '#3385FF',
      dark: '#0052CC',
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#7F8C8D',
      light: '#BDC3C7',
      dark: '#2C3E50',
    },
    success: {
      main: '#2ECC71',
      light: '#58D68D',
      dark: '#27AE60',
    },
    warning: {
      main: '#F39C12',
      light: '#F8C471',
      dark: '#E67E22',
    },
    error: {
      main: '#E74C3C',
      light: '#EC7063',
      dark: '#C0392B',
    },
    background: {
      default: '#FFFFFF',
      paper: '#F7F9FC',
    },
    text: {
      primary: '#2C3E50',
      secondary: '#7F8C8D',
      disabled: '#BDC3C7',
    },
    divider: '#E0E0E0',
    grey: {
      50: '#F7F9FC',
      100: '#ECF0F1',
      200: '#E0E0E0',
      300: '#BDC3C7',
      400: '#95A5A6',
      500: '#7F8C8D',
      600: '#707B7C',
      700: '#566573',
      800: '#34495E',
      900: '#2C3E50',
    },
  },
  typography: {
    fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    fontSize: 16,
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    fontWeightBold: 700,
    h1: {
      fontSize: '40px',
      fontWeight: 700,
      lineHeight: 1.2,
      '@media (max-width:768px)': {
        fontSize: '32px',
      },
    },
    h2: {
      fontSize: '28px',
      fontWeight: 600,
      lineHeight: 1.3,
    },
    h3: {
      fontSize: '24px',
      fontWeight: 600,
      lineHeight: 1.4,
    },
    h4: {
      fontSize: '20px',
      fontWeight: 600,
      lineHeight: 1.5,
    },
    body1: {
      fontSize: '18px',
      fontWeight: 400,
      lineHeight: 1.6,
    },
    body2: {
      fontSize: '16px',
      fontWeight: 400,
      lineHeight: 1.6,
    },
    button: {
      fontSize: '16px',
      fontWeight: 600,
      textTransform: 'none',
    },
    caption: {
      fontSize: '14px',
      fontWeight: 500,
      lineHeight: 1.5,
    },
  },
  shape: {
    borderRadius: 8,
  },
  spacing: 8,
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '8px',
          padding: '16px 40px',
          minWidth: '200px',
          transition: 'all 150ms ease-out',
          '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: '0 4px 12px rgba(0, 102, 255, 0.2)',
          },
          '&:active': {
            transform: 'translateY(0)',
          },
        },
      },
    },
  },
});

export default theme;