import { Container, Stack, Typography, Box, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import { styled } from '@mui/material/styles';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import GavelOutlinedIcon from '@mui/icons-material/GavelOutlined';

const HeroSection = styled(Box)(({ theme }) => ({
  background: `linear-gradient(135deg, ${theme.palette.primary.main}15 0%, ${theme.palette.background.default} 100%)`,
  padding: theme.spacing(8, 0),
  marginBottom: theme.spacing(6),
}));

export default function TermsOfServicePage() {
  return (
    <>
      <Header />
      <HeroSection>
        <Container maxWidth="md">
          <Stack spacing={3} alignItems="center">
            <GavelOutlinedIcon sx={{ fontSize: 64, color: 'primary.main' }} />
            <Typography variant="h1" sx={{ textAlign: 'center' }}>
              Terms of Service
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ textAlign: 'center', fontSize: '18px' }}>
              Effective Date: January 1, 2025
            </Typography>
          </Stack>
        </Container>
      </HeroSection>

      <Container maxWidth="md" sx={{ pb: 8 }}>
        <Stack spacing={4}>
          <Accordion defaultExpanded>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                1. Agreement to Terms
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant="body1">
                By accessing and using FileSwift.app ("the Service"), you accept and agree to be bound by the terms and
                provision of this agreement. If you do not agree to abide by the above, please do not use this service.
              </Typography>
            </AccordionDetails>
          </Accordion>

          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                2. Description of the Service
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant="body1">
                FileSwift.app is a free, ad-supported suite of online tools designed to help you manipulate digital
                files, including PDFs and images. The service operates primarily on a client-side basis, processing
                files directly in your web browser. Certain advanced tools may utilize a secure, server-side API for
                processing, as detailed in our Privacy Policy.
              </Typography>
            </AccordionDetails>
          </Accordion>

          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                3. User Responsibilities and Conduct
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Stack spacing={2}>
                <Typography variant="body1">
                  You are solely responsible for your use of the Service. You agree not to:
                </Typography>
                <Box component="ul" sx={{ pl: 3 }}>
                  <li>
                    <Typography variant="body1" sx={{ mb: 1 }}>
                      Use the Service for any illegal or unauthorized purpose, including copyright infringement.
                    </Typography>
                  </li>
                  <li>
                    <Typography variant="body1" sx={{ mb: 1 }}>
                      Upload files that contain viruses, trojans, worms, or other malicious code.
                    </Typography>
                  </li>
                  <li>
                    <Typography variant="body1" sx={{ mb: 1 }}>
                      Attempt to gain unauthorized access to our systems, interfere with or disrupt the Service or
                      servers connected to the Service.
                    </Typography>
                  </li>
                  <li>
                    <Typography variant="body1">
                      Use the Service in a manner that exceeds reasonable use or burdens our infrastructure (e.g.,
                      automated or bulk processing).
                    </Typography>
                  </li>
                </Box>
              </Stack>
            </AccordionDetails>
          </Accordion>

          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                4. Intellectual Property Rights and Your Files
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Stack spacing={2}>
                <Box>
                  <Typography variant="body1" sx={{ fontWeight: 600, mb: 1 }}>
                    Your Files
                  </Typography>
                  <Typography variant="body1">
                    You retain all ownership, rights, and title to any and all files you process using the Service. We
                    do not claim any ownership of your content. By using the Service, you grant us a limited, revocable
                    license to use our technology to process your files for the sole purpose of providing the service to
                    you.
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="body1" sx={{ fontWeight: 600, mb: 1 }}>
                    Our Service
                  </Typography>
                  <Typography variant="body1">
                    The Service, including its original content, features, and functionality, is owned by FileSwift and
                    is protected by international copyright, trademark, and other intellectual property laws. You may not
                    copy, modify, or distribute our service without our express written permission.
                  </Typography>
                </Box>
              </Stack>
            </AccordionDetails>
          </Accordion>

          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                5. Service Availability and Disclaimers
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Stack spacing={2}>
                <Box component="ul" sx={{ pl: 3 }}>
                  <li>
                    <Typography variant="body1" sx={{ mb: 1 }}>
                      <strong>"As Is" Basis:</strong> The Service is provided on an "as is" and "as available" basis. We
                      make no guarantees, express or implied, about the reliability, availability, or timeliness of the
                      Service.
                    </Typography>
                  </li>
                  <li>
                    <Typography variant="body1" sx={{ mb: 1 }}>
                      <strong>No Warranties:</strong> We disclaim all warranties, including but not limited to warranties
                      of merchantability, fitness for a particular purpose, and non-infringement.
                    </Typography>
                  </li>
                  <li>
                    <Typography variant="body1" sx={{ mb: 1 }}>
                      <strong>File Processing:</strong> You are responsible for backing up your files. While we strive
                      for high-quality results, we are not responsible for any data loss, corruption, or damage to your
                      files that may occur during processing. You use the Service at your own risk.
                    </Typography>
                  </li>
                  <li>
                    <Typography variant="body1">
                      <strong>Technical Limitations:</strong> The Service may have file size or format limitations. These
                      are in place to ensure stable performance, especially for client-side processing.
                    </Typography>
                  </li>
                </Box>
              </Stack>
            </AccordionDetails>
          </Accordion>

          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                6. The Hybrid AI Tools
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant="body1">
                By using the specific tools that require server-side processing (e.g., AI Image Upscaler, Background
                Remover), you explicitly consent to the temporary, secure transmission of your file to a third-party API
                provider for the sole purpose of processing, as detailed in our Privacy Policy.
              </Typography>
            </AccordionDetails>
          </Accordion>

          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                7. Limitation of Liability
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant="body1">
                To the maximum extent permitted by law, FileSwift shall not be liable for any indirect, incidental,
                special, consequential, or punitive damages, including without limitation, loss of profits, data, use, or
                other intangible losses, resulting from your use of the Service.
              </Typography>
            </AccordionDetails>
          </Accordion>

          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                8. Privacy
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant="body1">
                Your use of the Service is also governed by our Privacy Policy, which outlines how we handle data and
                protect your privacy.
              </Typography>
            </AccordionDetails>
          </Accordion>

          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                9. Termination
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant="body1">
                We may, in our sole discretion, terminate or suspend your access to the Service immediately, without
                prior notice or liability, for any reason, including if you breach the Terms of Service.
              </Typography>
            </AccordionDetails>
          </Accordion>

          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                10. Governing Law
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant="body1">
                These Terms of Service and any separate agreements whereby we provide you Services shall be governed by
                and construed in accordance with the laws of [Your State/Country].
              </Typography>
            </AccordionDetails>
          </Accordion>

          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                11. Changes to Terms
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant="body1">
                We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision
                is material, we will provide at least 30 days' notice prior to any new terms taking effect. Your
                continued use of the Service after the effective date of the revised Terms constitutes acceptance of the
                changes.
              </Typography>
            </AccordionDetails>
          </Accordion>

          <Box sx={{ bgcolor: 'grey.50', p: 4, borderRadius: 2, mt: 4 }}>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
              Contact Us
            </Typography>
            <Typography variant="body1" sx={{ mb: 1 }}>
              If you have any questions about these Terms of Service, please contact us at:
            </Typography>
            <Typography variant="body1" sx={{ mb: 0.5 }}>
              <strong>Email:</strong> legal@fileswift.app
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