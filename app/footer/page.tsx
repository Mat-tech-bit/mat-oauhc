"use client";

import React from 'react';
import { usePathname } from 'next/navigation';
import {
  Box,
  Container,
  Grid,
  Typography,
  Link,
  Divider,
  IconButton,
  Stack,
  useTheme
} from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

const Footer = () => {
  const pathname = usePathname();
  const theme = useTheme();
  const currentYear = new Date().getFullYear();

  // Routes where the landing page footer should NOT show
  const noNavRoutes = ['/dashboard', '/appointments', '/prescriptions', '/settings', '/student-records'];
  if (noNavRoutes.some(route => pathname?.startsWith(route))) {
    return null;
  }

  return (
    <Box
      component="footer"
      id="footer"
      sx={{
        bgcolor: theme.palette.mode === 'dark' ? 'background.paper' : '#1a1a1a', 
        color: theme.palette.mode === 'dark' ? 'text.secondary' : '#e0e0e0',
        pt: 8,
        pb: 4,
        mt: 'auto',
        borderTop: '4px solid',
        borderColor: 'primary.main',
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={5}>
          {/* Column 1: About/Logo */}
          <Grid size={{ xs: 12, md: 4 }}>
            <Typography variant="h6" sx={{ fontWeight: 800, mb: 2, letterSpacing: 1, color: theme.palette.mode === 'dark' ? 'text.primary' : 'white' }}>
              OAU HEALTH CENTER
            </Typography>
            <Typography variant="body2" sx={{ lineHeight: 1.8, mb: 3, opacity: 0.8 }}>
              Providing world-class medical services to the students and staff of Obafemi Awolowo University.
              Our mission is to maintain a healthy academic environment through preventive and curative healthcare.
            </Typography>
            <Stack direction="row" spacing={1}>
              <IconButton
                onClick={() =>
                  window.open(
                    "https://web.facebook.com/matthew.akinyemi.146",
                    "_blank"
                  )
                }
                sx={{ color: theme.palette.mode === 'dark' ? 'text.primary' : "white" }}
              >
                <FacebookIcon fontSize="small" />
              </IconButton>
              <IconButton
                onClick={() =>
                  window.open("https://twitter.com/Mathew7746", "_blank")
                }
                sx={{ color: theme.palette.mode === 'dark' ? 'text.primary' : "white" }}
              >
                <TwitterIcon fontSize="small" />
              </IconButton>
              <IconButton
                onClick={() =>
                  window.open("https://www.instagram.com/ak_mat1", "_blank")
                }
                sx={{ color: theme.palette.mode === 'dark' ? 'text.primary' : "white" }}
              >
                <InstagramIcon fontSize="small" />
              </IconButton>
              <IconButton
                onClick={() => window.open("https://wa.link/9tkk8l", "_blank")}
                size="small"
                sx={{ color: theme.palette.mode === 'dark' ? 'text.primary' : 'white', '&:hover': { bgcolor: '#25D366' } }}
              >
                <WhatsAppIcon fontSize="small" />
              </IconButton>
            </Stack>
          </Grid>

          {/* Column 2: Quick Links */}
          <Grid size={{ xs: 12, sm: 6, md: 2 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 3, color: theme.palette.mode === 'dark' ? 'text.primary' : 'white' }}>
              Quick Links
            </Typography>
            <Stack spacing={1.5}>
              <Link href="/dashboard" underline="none" color="inherit" sx={{ '&:hover': { color: 'primary.main' } }}>Dashboard</Link>
              <Link href="/appointments" underline="none" color="inherit" sx={{ '&:hover': { color: 'primary.main' } }}>Book Appointment</Link>
              <Link href="/prescriptions" underline="none" color="inherit" sx={{ '&:hover': { color: 'primary.main' } }}>My Prescriptions</Link>
              <Link href="/student-records" underline="none" color="inherit" sx={{ '&:hover': { color: 'primary.main' } }}>Medical Records</Link>
            </Stack>
          </Grid>

          {/* Column 3: Hours & Services */}
          <Grid size={{ xs: 12, sm: 6, md: 2 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 3, color: theme.palette.mode === 'dark' ? 'text.primary' : 'white' }}>
              Working Hours
            </Typography>
            <Stack spacing={2}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                <AccessTimeIcon sx={{ color: 'primary.main' }} fontSize="small" />
                <Box>
                  <Typography variant="caption" display="block" sx={{ opacity: 0.6 }}>Monday - Friday</Typography>
                  <Typography variant="body2">8:00 AM - 8:00 PM</Typography>
                </Box>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                <AccessTimeIcon sx={{ color: 'error.main' }} fontSize="small" />
                <Box>
                  <Typography variant="caption" display="block" sx={{ opacity: 0.6 }}>Emergency / Weekend</Typography>
                  <Typography variant="body2">24/7 Available</Typography>
                </Box>
              </Box>
            </Stack>
          </Grid>

          {/* Column 4: Contact */}
          <Grid size={{ xs: 12, md: 3 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 3, color: theme.palette.mode === 'dark' ? 'text.primary' : 'white' }}>
              Contact Us
            </Typography>
            <Stack spacing={2.5}>
              <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1.5 }}>
                <LocationOnIcon sx={{ color: 'primary.main', mt: 0.3 }} fontSize="small" />
                <Typography variant="body2">
                  Health Center Road,<br />
                  Obafemi Awolowo University,<br />
                  Ile-Ife, Osun State.
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                <PhoneIcon sx={{ color: 'primary.main' }} fontSize="small" />
                <Typography variant="body2">+234 902 554 6836</Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                <EmailIcon sx={{ color: 'primary.main' }} fontSize="small" />
                <Typography variant="body2">healthcenter@oauife.edu.ng</Typography>
              </Box>
            </Stack>
          </Grid>
        </Grid>

        <Divider sx={{ my: 6, borderColor: 'divider' }} />

        {/* Footer Bottom */}
        <Box sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: 2
        }}>
          <Typography variant="caption" sx={{ opacity: 0.5 }}>
            © {currentYear} Obafemi Awolowo University. All rights reserved.
          </Typography>
          <Stack direction="row" spacing={3}>
            <Link href="#" underline="hover" color="inherit" sx={{ fontSize: '0.75rem', opacity: 0.5 }}>Privacy Policy</Link>
            <Link href="#" underline="hover" color="inherit" sx={{ fontSize: '0.75rem', opacity: 0.5 }}>Terms of Service</Link>
            <Link href="#" underline="hover" color="inherit" sx={{ fontSize: '0.75rem', opacity: 0.5 }}>NHIS Support</Link>
          </Stack>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;