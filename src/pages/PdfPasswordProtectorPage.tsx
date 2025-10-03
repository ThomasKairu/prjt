import { useState } from 'react';
import { Container, Stack, Typography, TextField, InputAdornment, IconButton, Box, Alert } from '@mui/material';
import { styled } from '@mui/material/styles';
import Header from '../components/Header';
import Footer from '../components/Footer';
import DropZone from '../components/DropZone';
import SEO from '../components/SEO';
import ProcessingState from '../components/ProcessingState';
import ResultState from '../components/ResultState';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { protectPDF, downloadBlob } from '../utils/pdfProcessor';

type PageState = 'upload' | 'password' | 'processing' | 'complete';
type PasswordStrength = 'weak' | 'good' | 'strong';

const SecurityCard = styled(Box)(({ theme }) => ({
  padding: theme.spacing(4),
  borderRadius: `${(theme.shape.borderRadius as number) * 2}px`,
  background: `linear-gradient(135deg, ${theme.palette.primary.main}08 0%, ${theme.palette.primary.light}05 100%)`,
  border: `2px solid ${theme.palette.primary.main}40`,
  maxWidth: 500,
  width: '100%',
}));

const StrengthIndicator = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'strength',
})<{ strength: PasswordStrength }>(({ theme, strength }) => {
  const colors = {
    weak: theme.palette.error.main,
    good: theme.palette.warning.main,
    strong: theme.palette.success.main,
  };
  
  const widths = {
    weak: '33%',
    good: '66%',
    strong: '100%',
  };

  return {
    height: 8,
    borderRadius: 4,
    backgroundColor: theme.palette.grey[200],
    position: 'relative',
    overflow: 'hidden',
    '&::after': {
      content: '""',
      position: 'absolute',
      left: 0,
      top: 0,
      height: '100%',
      width: widths[strength],
      backgroundColor: colors[strength],
      transition: 'all 300ms ease-out',
    },
  };
});

export default function PdfPasswordProtectorPage() {
  const [state, setState] = useState<PageState>('upload');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState<PasswordStrength>('weak');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [resultBlob, setResultBlob] = useState<Blob | null>(null);
  const [error, setError] = useState('');

  const calculatePasswordStrength = (pwd: string): PasswordStrength => {
    if (pwd.length < 6) return 'weak';
    if (pwd.length < 10) return 'good';
    if (pwd.length >= 10 && /[A-Z]/.test(pwd) && /[0-9]/.test(pwd) && /[^A-Za-z0-9]/.test(pwd)) {
      return 'strong';
    }
    return 'good';
  };

  const handlePasswordChange = (value: string) => {
    setPassword(value);
    setPasswordStrength(calculatePasswordStrength(value));
    setError('');
  };

  const handleFileSelect = (file: File) => {
    setSelectedFile(file);
    setState('password');
  };

  const handleProtect = async () => {
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    if (password.length < 4) {
      setError('Password must be at least 4 characters');
      return;
    }
    if (!selectedFile) return;

    setState('processing');
    setError('');

    try {
      console.log('🚀 Starting PDF protection process');
      console.log('📁 Selected file:', selectedFile?.name, selectedFile?.size);
      console.log('🔐 Password length:', password.length);
      
      const result = await protectPDF(selectedFile, password);
      console.log('✅ PDF protection completed successfully');
      console.log('📦 Result blob size:', result.blob.size);
      console.log('📋 Encryption info:', result.encryptionInfo);
      
      setResultBlob(result.blob);
      setState('complete');
    } catch (err) {
      console.error('❌ Error protecting PDF:', err);
      setError('Failed to protect PDF. Please try again.');
      setState('password');
    }
  };

  const handleDownload = () => {
    if (resultBlob && selectedFile) {
      console.log('📥 Starting download of protected PDF');
      console.log('📁 Original filename:', selectedFile.name);
      console.log('📦 Blob size:', resultBlob.size);
      downloadBlob(resultBlob, `protected_${selectedFile.name}`);
    }
  };

  const handleProcessAnother = () => {
    setState('upload');
    setPassword('');
    setConfirmPassword('');
    setSelectedFile(null);
    setResultBlob(null);
    setError('');
  };

  return (
    <>
      <SEO
        title="PDF Password Protector"
        description="Secure your PDF files with password encryption. Add password protection to PDFs online for free. 100% client-side processing ensures your files never leave your device."
        keywords="password protect pdf, encrypt pdf, secure pdf, add password to pdf, pdf security, protect pdf online free"
        canonical="https://fileswift.app/pdf-password-protector"
      />
      <Header />
      <Container maxWidth="lg" sx={{ py: 8, minHeight: '70vh' }}>
        <Stack spacing={4} alignItems="center">
          <Stack spacing={2} alignItems="center" sx={{ maxWidth: 600 }}>
            <LockOutlinedIcon sx={{ fontSize: 48, color: 'primary.main' }} />
            <Typography variant="h1" sx={{ textAlign: 'center' }}>
              PDF Password Protector
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ textAlign: 'center' }}>
              Secure your PDF with a password. Only those with the password can open the file.
            </Typography>
          </Stack>

          {state === 'upload' && (
            <DropZone
              onFileSelect={handleFileSelect}
              acceptedFormats=".pdf"
              maxSize={100}
              fileType="PDF"
            />
          )}

          {state === 'password' && (
            <SecurityCard>
              <Stack spacing={3}>
                <Typography variant="h6" sx={{ fontWeight: 600, textAlign: 'center' }}>
                  Set Password Protection
                </Typography>

                <TextField
                  fullWidth
                  label="Enter Password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => handlePasswordChange(e.target.value)}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => setShowPassword(!showPassword)}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOffOutlinedIcon /> : <VisibilityOutlinedIcon />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />

                {password && (
                  <Stack spacing={1}>
                    <StrengthIndicator strength={passwordStrength} />
                    <Typography
                      variant="caption"
                      sx={{
                        color: passwordStrength === 'weak' ? 'error.main' : passwordStrength === 'good' ? 'warning.main' : 'success.main',
                        fontWeight: 600,
                      }}
                    >
                      Password Strength: {passwordStrength.toUpperCase()}
                    </Typography>
                  </Stack>
                )}

                <TextField
                  fullWidth
                  label="Confirm Password"
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          edge="end"
                        >
                          {showConfirmPassword ? <VisibilityOffOutlinedIcon /> : <VisibilityOutlinedIcon />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />

                {error && (
                  <Alert severity="error" sx={{ mt: 2 }}>
                    {error}
                  </Alert>
                )}

                <Alert severity="warning" icon={<LockOutlinedIcon />}>
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>
                    Warning: If you forget this password, the file cannot be recovered.
                  </Typography>
                </Alert>

                <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
                  <button
                    onClick={() => setState('upload')}
                    style={{
                      flex: 1,
                      padding: '12px',
                      border: '2px solid #E0E0E0',
                      borderRadius: '8px',
                      background: 'white',
                      cursor: 'pointer',
                      fontSize: '16px',
                      fontWeight: 600,
                    }}
                  >
                    Back
                  </button>
                  <button
                    onClick={handleProtect}
                    disabled={!password || !confirmPassword || password !== confirmPassword}
                    style={{
                      flex: 1,
                      padding: '12px',
                      border: 'none',
                      borderRadius: '8px',
                      background: password && confirmPassword && password === confirmPassword ? '#0066FF' : '#BDC3C7',
                      color: 'white',
                      cursor: password && confirmPassword && password === confirmPassword ? 'pointer' : 'not-allowed',
                      fontSize: '16px',
                      fontWeight: 600,
                    }}
                  >
                    Protect PDF
                  </button>
                </Stack>
              </Stack>
            </SecurityCard>
          )}

          {state === 'processing' && (
            <ProcessingState message="Securing your PDF..." />
          )}

          {state === 'complete' && (
            <ResultState
              onDownload={handleDownload}
              onProcessAnother={handleProcessAnother}
              message="Your PDF is now password protected!"
            />
          )}
        </Stack>
      </Container>
      <Footer />
    </>
  );
}