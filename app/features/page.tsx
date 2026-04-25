"use client";

import React from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Avatar,
  Button,
  Stack,
  useTheme
} from '@mui/material';
import { motion } from 'framer-motion';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import MedicalInformationIcon from '@mui/icons-material/MedicalInformation';
import MedicationIcon from '@mui/icons-material/Medication';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import SecurityIcon from '@mui/icons-material/Security';
import SmartphoneIcon from '@mui/icons-material/Smartphone';
import { useRouter } from 'next/navigation';

const systemFeatures = [
  {
    title: "Online Appointment Booking",
    description: "Skip the long queues. Secure your consultation slot with health professionals directly from your student portal.",
    icon: <CalendarMonthIcon sx={{ fontSize: 32 }} />,
    color: "#1976d2",
  },
  {
    title: "Electronic Health Records",
    description: "Your medical history, allergy records, and bio-data are securely stored and accessible to authorized physicians 24/7.",
    icon: <MedicalInformationIcon sx={{ fontSize: 32 }} />,
    color: "#2e7d32",
  },
  {
    title: "Digital Prescriptions",
    description: "Receive and view your medical prescriptions digitally. No more lost papers or illegible pharmacist instructions.",
    icon: <MedicationIcon sx={{ fontSize: 32 }} />,
    color: "#ed6c02",
  },
  {
    title: "Emergency Response",
    description: "Integrated emergency protocols for quick student assistance within the University campus during critical hours.",
    icon: <LocalHospitalIcon sx={{ fontSize: 32 }} />,
    color: "#d32f2f",
  },
  {
    title: "Secure Data Privacy",
    description: "Your sensitive health data is encrypted and protected with industry-standard security and strict access controls.",
    icon: <SecurityIcon sx={{ fontSize: 32 }} />,
    color: "#7b1fa2",
  },
  {
    title: "Mobile Optimization",
    description: "Register, book, and view records on the go. Our system is fully optimized for smartphones and personal tablets.",
    icon: <SmartphoneIcon sx={{ fontSize: 32 }} />,
    color: "#0288d1",
  },
];

const FeaturesPage = () => {
  const router = useRouter();
  const theme = useTheme();

  return (
    <Box sx={{ bgcolor: 'background.default', minHeight: '100vh', py: { xs: 8, md: 12 } }}>
      <Container maxWidth="lg">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Box sx={{ textAlign: 'center', mb: 10 }}>
            <Typography
              variant="overline"
              color="primary"
              sx={{ fontWeight: 800, letterSpacing: 2, display: 'block', mb: 1 }}
            >
              Digital Health Ecosystem
            </Typography>
            <Typography
              variant="h3"
              component="h1"
              sx={{ fontWeight: 800, color: 'text.primary', mb: 3, fontSize: { xs: '2rem', md: '3rem' } }}
            >
              Advanced Features for a<br />Healthy Campus Lifecycle
            </Typography>
            <Typography
              variant="body1"
              color="text.secondary"
              sx={{ maxWidth: 700, mx: 'auto', lineHeight: 1.8 }}
            >
              The OAU Health Center Digital Portal streamlines every aspect of your healthcare journey,
              from initial registration to specialized medical recovery.
            </Typography>
          </Box>
        </motion.div>

        {/* Features Grid */}
        <Grid container spacing={4}>
          {systemFeatures.map((feature, index) => (
            <Grid size={{ xs: 12, sm: 6, md: 4 }} key={index}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card
                  elevation={0}
                  sx={{
                    height: '100%',
                    borderRadius: 4,
                    border: '1px solid',
                    borderColor: 'divider',
                    bgcolor: 'background.paper',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-8px)',
                      boxShadow: theme.palette.mode === 'dark' ? '0 20px 40px rgba(0,0,0,0.4)' : '0 20px 40px rgba(0,0,0,0.08)',
                      borderColor: feature.color,
                    }
                  }}
                >
                  <CardContent sx={{ p: 4 }}>
                    <Avatar
                      sx={{
                        bgcolor: `${feature.color}15`,
                        color: feature.color,
                        width: 60,
                        height: 60,
                        mb: 3,
                        borderRadius: 2
                      }}
                    >
                      {feature.icon}
                    </Avatar>
                    <Typography variant="h6" sx={{ fontWeight: 700, mb: 2, color: 'text.primary' }}>
                      {feature.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.7 }}>
                      {feature.description}
                    </Typography>
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>

        {/* CTA Section */}
        <motion.div
           initial={{ opacity: 0, scale: 0.95 }}
           whileInView={{ opacity: 1, scale: 1 }}
           viewport={{ once: true }}
           transition={{ duration: 0.6 }}
        >
          <Box
            sx={{
              mt: 12,
              p: { xs: 4, md: 8 },
              bgcolor: 'primary.main',
              borderRadius: 6,
              textAlign: 'center',
              color: 'white',
              boxShadow: '0 24px 48px rgba(25, 118, 210, 0.25)'
            }}
          >
            <Typography variant="h4" sx={{ fontWeight: 800, mb: 2 }}>
              Ready to experience better healthcare?
            </Typography>
            <Typography variant="body1" sx={{ mb: 5, opacity: 0.9 }}>
              Join thousands of OAU students already using the digital health portal.
            </Typography>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} justifyContent="center">
              <Button
                variant="contained"
                size="large"
                onClick={() => router.push('/registrationpage')}
                sx={{
                  bgcolor: 'white',
                  color: 'primary.main',
                  px: 6,
                  py: 2,
                  fontWeight: 800,
                  transition: '0.3s',
                  '&:hover': { bgcolor: '#f0f0f0', transform: 'translateY(-3px)' }
                }}
              >
                Get Started Now
              </Button>
              <Button
                variant="outlined"
                size="large"
                onClick={() => router.push('/loginpage')}
                sx={{
                  borderColor: 'white',
                  color: 'white',
                  px: 6,
                  py: 2,
                  fontWeight: 800,
                  transition: '0.3s',
                  '&:hover': { borderColor: '#e0e0e0', bgcolor: 'rgba(255,255,255,0.1)', transform: 'translateY(-3px)' }
                }}
              >
                Access Member Login
              </Button>
            </Stack>
          </Box>
        </motion.div>
      </Container>
    </Box>
  );
};

export default FeaturesPage;