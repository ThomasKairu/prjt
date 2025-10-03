import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { ThemeProvider } from '@mui/material/styles';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import CssBaseline from '@mui/material/CssBaseline';
import './index.css';
import App from './App.tsx';
import theme from './theme.ts';

const emotionCache = createCache({
  key: 'mui',
  prepend: true,
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <CacheProvider value={emotionCache}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <App />
      </ThemeProvider>
    </CacheProvider>
  </StrictMode>,
);