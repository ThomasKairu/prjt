import { Container, Stack, Typography, Box, Accordion, AccordionSummary, AccordionDetails, Chip } from '@mui/material';
import { styled } from '@mui/material/styles';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import VerifiedUserOutlinedIcon from '@mui/icons-material/VerifiedUserOutlined';
import BlockOutlinedIcon from '@mui/icons-material/BlockOutlined';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

const HeroSection = styled(Box)(({ theme }) => ({
  background: `linear-gradient(135deg, ${theme.palette.primary.main}15 0%, ${theme.palette.background.default} 100%)`,
  padding: theme.spacing(8, 0),
  marginBottom: theme.spacing(6),
}));

const PromiseCard = styled(Box)(({ theme }) => ({
  padding: theme.spacing(3),
  borderRadius: `${(theme.shape.borderRadius as number) * 2}px`,
  background: `linear-gradient(135deg, ${theme.palette.success.main}08 0%, ${theme.palette.success.light}05 100%)`,
  border: `2px solid ${theme.palette.success.main}40`,
  display: 'flex',
  alignItems: 'flex-start',
  gap: theme.spacing(2),
}));

export default function PrivacyPolicyPage() {
  return (
    <>
      <Header />
      <HeroSection>
        <Container maxWidth="md">
          <Stack spacing={3} alignItems="center">
            <VerifiedUserOutlinedIcon sx={{ fontSize: 64, color: 'primary.main' }} />
            <Typography variant="h1" sx={{ textAlign: 'center' }}>
              Privacy Policy
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ textAlign: 'center', fontSize: '18px' }}>
              Effective Date: January 1, 2025
            </Typography>
            <Chip
              label="Your Privacy is Our Architecture"
              color="primary"
              sx={{ fontSize: '16px', py: 2.5, px: 1 }}
            />
          </Stack>
        </Container>
      </HeroSection>

      <Container maxWidth="md" sx={{ pb: 8 }}>
        <Stack spacing={4}>
          <PromiseCard>
            <CheckCircleOutlineIcon sx={{ color: 'success.main', fontSize: 32, flexShrink: 0 }} />
            <Box>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                Our Promise
              </Typography>
              <Typography variant="body1" color="text.secondary">
                At FileSwift, we believe your files are your business. Period. That's why we've built our service on
                a foundation of privacy. Most of our tools work entirely in your web browser. This means your files
                are processed on your own device and never leave your computer.
              </Typography>
            </Box>
          </PromiseCard>

          <Accordion defaultExpanded>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Stack direction="row" spacing={2} alignItems="center">
                <BlockOutlinedIcon sx={{ color: 'error.main' }} />
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  1. Information We Absolutely DO NOT Collect
                </Typography>
              </Stack>
            </AccordionSummary>
            <AccordionDetails>
              <Stack spacing={2}>
                <Typography variant="body1" sx={{ fontWeight: 600 }}>
                  This is the most important part. For our client-side tools (PDF Compressor, Merger, Splitter, Image
                  Compressor, HEIC to JPG Converter, WebP Converter, Social Media Resizer), we do NOT:
                </Typography>
                <Box component="ul" sx={{ pl: 3 }}>
                  <li>
                    <Typography variant="body1" sx={{ mb: 1 }}>
                      <strong>See, copy, or store your files.</strong> They are processed locally in your browser and
                      are discarded from your browser's temporary memory when you close the tab.
                    </Typography>
                  </li>
                  <li>
                    <Typography variant="body1" sx={{ mb: 1 }}>
                      <strong>Collect your personal information.</strong> We don't have accounts, sign-ups, or ask for
                      your name or email.
                    </Typography>
                  </li>
                  <li>
                    <Typography variant="body1">
                      <strong>Access your files after you close the browser tab.</strong> The processing is temporary
                      and isolated to your session.
                    </Typography>
                  </li>
                </Box>
              </Stack>
            </AccordionDetails>
          </Accordion>

          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                2. Information We DO Collect (The Bare Minimum)
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Stack spacing={3}>
                <Typography variant="body1">
                  To provide a free, ad-supported service and ensure it works reliably, we collect a small amount of
                  non-personal data:
                </Typography>

                <Box>
                  <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                    Browser-Generated Log Data
                  </Typography>
                  <Typography variant="body1">
                    Our server automatically records standard information sent by your browser, such as your IP address
                    (anonymized), browser type, operating system, the date and time of your visit, and the pages you
                    viewed. We use this information to diagnose problems, analyze trends, and protect our service from
                    abuse.
                  </Typography>
                </Box>

                <Box>
                  <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                    Cookies and Local Storage
                  </Typography>
                  <Box component="ul" sx={{ pl: 3 }}>
                    <li>
                      <Typography variant="body1" sx={{ mb: 1 }}>
                        <strong>Cookies:</strong> We use cookies to serve ads, understand how you interact with our
                        site, and remember your preferences. Our ad partners (like Google AdSense) may use cookies to
                        show you ads that are relevant to you based on your visits to our site and other sites on the
                        internet.
                      </Typography>
                    </li>
                    <li>
                      <Typography variant="body1">
                        <strong>Local Storage:</strong> For client-side processing, your browser temporarily stores the
                        file you are working on in its local memory. This is not a server upload and is not accessible
                        to us or anyone else. It is automatically cleared when you finish your task or close the tab.
                      </Typography>
                    </li>
                  </Box>
                </Box>

                <Box>
                  <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                    Analytics Data
                  </Typography>
                  <Typography variant="body1">
                    We use a service like Google Analytics to help us understand how visitors use our site. This data
                    is aggregated and anonymized; it tells us things like which tools are most popular, not what any
                    individual user is doing.
                  </Typography>
                </Box>
              </Stack>
            </AccordionDetails>
          </Accordion>

          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                3. The Hybrid Model: Our Advanced AI Tools
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Stack spacing={2}>
                <Typography variant="body1">
                  Some of our most powerful tools, like the <strong>AI Image Upscaler</strong> and{' '}
                  <strong>Background Remover</strong>, require specialized AI processing that cannot be done in a
                  standard browser.
                </Typography>
                <Box component="ul" sx={{ pl: 3 }}>
                  <li>
                    <Typography variant="body1" sx={{ mb: 1 }}>
                      <strong>Transparency is Key:</strong> Before you use these tools, we will clearly inform you that
                      they require secure server-side processing.
                    </Typography>
                  </li>
                  <li>
                    <Typography variant="body1" sx={{ mb: 1 }}>
                      <strong>Secure Transmission:</strong> If you choose to use these tools, your file is securely
                      transmitted over an encrypted connection (SSL/HTTPS) to a trusted, enterprise-grade third-party
                      API service.
                    </Typography>
                  </li>
                  <li>
                    <Typography variant="body1" sx={{ mb: 1 }}>
                      <strong>Immediate Deletion:</strong> Your file is used only for the specific processing task you
                      requested. It is automatically and permanently deleted from the server immediately after the
                      result is returned to you. We do not store it, back it up, or look at it.
                    </Typography>
                  </li>
                  <li>
                    <Typography variant="body1">
                      <strong>No Training:</strong> We do not use your files to train any AI models.
                    </Typography>
                  </li>
                </Box>
              </Stack>
            </AccordionDetails>
          </Accordion>

          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                4. How We Use Information
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Stack spacing={2}>
                <Typography variant="body1">We use the information we collect solely to:</Typography>
                <Box component="ul" sx={{ pl: 3 }}>
                  <li>
                    <Typography variant="body1">Operate, maintain, and improve our service.</Typography>
                  </li>
                  <li>
                    <Typography variant="body1">Provide customer support (if contacted).</Typography>
                  </li>
                  <li>
                    <Typography variant="body1">Analyze usage trends to optimize the user experience.</Typography>
                  </li>
                  <li>
                    <Typography variant="body1">Display relevant advertisements to support our free service.</Typography>
                  </li>
                  <li>
                    <Typography variant="body1">Detect and prevent fraud, abuse, and security threats.</Typography>
                  </li>
                </Box>
              </Stack>
            </AccordionDetails>
          </Accordion>

          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                5. Data Sharing and Selling
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Stack spacing={2}>
                <Typography variant="body1" sx={{ fontWeight: 600 }}>
                  We will never sell, rent, or share your personal information or your files with third parties for
                  their marketing purposes.
                </Typography>
                <Typography variant="body1">The only exceptions are:</Typography>
                <Box component="ul" sx={{ pl: 3 }}>
                  <li>
                    <Typography variant="body1" sx={{ mb: 1 }}>
                      <strong>Ad Networks:</strong> We share anonymized, aggregated data with ad networks (like Google
                      AdSense) to serve relevant ads. Their use of data is governed by their own privacy policies.
                    </Typography>
                  </li>
                  <li>
                    <Typography variant="body1">
                      <strong>Trusted API Providers:</strong> For the hybrid AI tools, we share your file temporarily
                      and securely with the API provider as described in Section 3, under the strict terms of immediate
                      deletion.
                    </Typography>
                  </li>
                </Box>
              </Stack>
            </AccordionDetails>
          </Accordion>

          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                6. Your Rights
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Stack spacing={2}>
                <Typography variant="body1">You have the right to:</Typography>
                <Box component="ul" sx={{ pl: 3 }}>
                  <li>
                    <Typography variant="body1" sx={{ mb: 1 }}>
                      <strong>Access:</strong> Request a copy of the personal data we hold about you (which is typically
                      limited to anonymized log data).
                    </Typography>
                  </li>
                  <li>
                    <Typography variant="body1" sx={{ mb: 1 }}>
                      <strong>Delete:</strong> Request deletion of your data. Since we don't store personal information
                      or files, there is usually nothing to delete.
                    </Typography>
                  </li>
                  <li>
                    <Typography variant="body1">
                      <strong>Opt-Out:</strong> You can opt out of targeted advertising by visiting the ad industry's
                      opt-out pages or by adjusting your browser's cookie settings.
                    </Typography>
                  </li>
                </Box>
              </Stack>
            </AccordionDetails>
          </Accordion>

          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                7. Security
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant="body1">
                We take security seriously. All data transmitted between your browser and our servers is protected using
                industry-standard SSL/TLS encryption. Our API partners also use encrypted connections for the hybrid
                tools.
              </Typography>
            </AccordionDetails>
          </Accordion>

          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                8. Children's Privacy
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant="body1">
                Our service is not intended for children under the age of 13. We do not knowingly collect personal
                information from children under 13. If you are a parent or guardian and believe your child has provided
                us with information, please contact us.
              </Typography>
            </AccordionDetails>
          </Accordion>

          <Box sx={{ bgcolor: 'grey.50', p: 4, borderRadius: 2, mt: 4 }}>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
              Contact Us
            </Typography>
            <Typography variant="body1" sx={{ mb: 1 }}>
              If you have any questions about this Privacy Policy, please contact us at:
            </Typography>
            <Typography variant="body1" sx={{ mb: 0.5 }}>
              <strong>Email:</strong> privacy@fileswift.app
            </Typography>
            <Typography variant="body1">
              <strong>Address:</strong> [Your Company Address]
            </Typography>
          </Box>
        </Stack>
      </Container>

      <Footer />
    </>
  );
}