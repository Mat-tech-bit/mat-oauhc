import React from 'react';
import { Box, Container, Grid, Typography, Link, Divider } from '@mui/material';

const Footer = () => {
  const footerLinks = [
    { text: 'Privacy Statement', href: '#' },
    { text: 'Terms and Conditions of Use', href: '#' },
    { text: 'Legal Notice', href: '#' },
    { text: 'FAQ', href: '#' },
    { text: 'Lecture Time Table', href: '#' },
  ];

  const helpLinks = [
    { text: 'Examination Time Table', href: '#' },
    { text: 'Contact Us', href: '#' },
    { text: 'Student Help', href: '#' },
    { text: 'Staff Help', href: '#' },
  ];

  return (
    <Box
      component="footer"
      sx={{
        bgcolor: 'black',
        color: 'white',
        py: 6,
        px: 2,
        mt: 'auto',
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4} justifyContent="flex-start">
          {/* Column 1 */}
          <Grid size={{xs: 12, md: 6, sm: 4}}>
            {footerLinks.map((link) => (
              <Link
                key={link.text}
                href={link.href}
                display="block"
                underline="none"
                sx={{
                  color: '#1976d2', // Mimics the blue in the screenshot
                  fontSize: '0.95rem',
                  mb: 1.5,
                  '&:hover': { textDecoration: 'underline' },
                }}
              >
                {link.text}
              </Link>
            ))}
          </Grid>

          {/* Column 2 */}
          <Grid size={{xs: 12, sm: 6, md: 4}}>
            {helpLinks.map((link, index) => (
              <Link
                key={link.text}
                href={link.href}
                display="block"
                underline="none"
                sx={{
                  // The image shows white for some links and blue for others
                  color: index === helpLinks.length - 1 ? '#1976d2' : 'white',
                  fontSize: '0.95rem',
                  mb: 1.5,
                  '&:hover': { textDecoration: 'underline' },
                }}
              >
                {link.text}
              </Link>
            ))}
          </Grid>
        </Grid>

        {/* Bottom Section */}
        <Box sx={{ mt: 8 }}>
          <Typography variant="body2" sx={{ fontWeight: 500 }}>
            © 2006 - 2026 Obafemi Awolowo University
          </Typography>
          
          {/* Placeholder for the Payment Options strip shown in the image */}
          <Box 
            sx={{ 
              mt: 2, 
              borderTop: '1px solid #333', 
              pt: 1,
              color: '#4caf50', // Greenish text seen at the bottom
              fontSize: '0.8rem'
            }}
          >
            Payment Options
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;