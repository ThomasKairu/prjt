import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import PdfCompressorPage from './pages/PdfCompressorPage';
import PdfMergerPage from './pages/PdfMergerPage';
import PdfSplitterPage from './pages/PdfSplitterPage';
import HeicConverterPage from './pages/HeicConverterPage';
import ImageCompressorPage from './pages/ImageCompressorPage';
import SocialMediaResizerPage from './pages/SocialMediaResizerPage';
import PdfPasswordProtectorPage from './pages/PdfPasswordProtectorPage';
import WatermarkAdderPage from './pages/WatermarkAdderPage';
import WebpConverterPage from './pages/WebpConverterPage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import TermsOfServicePage from './pages/TermsOfServicePage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/pdf-compressor" element={<PdfCompressorPage />} />
        <Route path="/pdf-merger" element={<PdfMergerPage />} />
        <Route path="/pdf-splitter" element={<PdfSplitterPage />} />
        <Route path="/heic-converter" element={<HeicConverterPage />} />
        <Route path="/image-compressor" element={<ImageCompressorPage />} />
        <Route path="/social-media-resizer" element={<SocialMediaResizerPage />} />
        <Route path="/pdf-password-protector" element={<PdfPasswordProtectorPage />} />
        <Route path="/watermark-adder" element={<WatermarkAdderPage />} />
        <Route path="/webp-converter" element={<WebpConverterPage />} />
        <Route path="/privacy" element={<PrivacyPolicyPage />} />
        <Route path="/terms" element={<TermsOfServicePage />} />
        <Route path="*" element={<HomePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;