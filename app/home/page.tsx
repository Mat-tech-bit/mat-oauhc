"use client";

import React from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Button, 
  Grid, 
  Card, 
  CardContent, 
  Stack,
  Paper,
  useTheme
} from '@mui/material';
import { motion, Variants } from 'framer-motion';
import Link from 'next/link';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ShieldIcon from '@mui/icons-material/Shield';
import HealthAndSafetyIcon from '@mui/icons-material/HealthAndSafety';
import SpeedIcon from '@mui/icons-material/Speed';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import MedicationIcon from '@mui/icons-material/Medication';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const HomePage = () => {
  const theme = useTheme();

  return (
    <Box sx={{ bgcolor: 'background.default', overflowX: 'hidden' }}>
      {/* 1. HERO SECTION */}
      <Box 
        sx={{ 
          position: 'relative',
          minHeight: { xs: '90vh', md: '95vh' },
          display: 'flex',
          alignItems: 'center',
          overflow: 'hidden',
          bgcolor: theme.palette.mode === 'dark' ? '#0f172a' : '#0c1221',
          color: 'white',
          pt: { xs: 8, md: 0 }
        }}
      >
        {/* Background Image with Overlay */}
        <motion.div
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.35 }}
          transition={{ duration: 2 }}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: `url('/health_center_hero_bg_1777154509472.png')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            zIndex: 1,
          }}
        />
        
        {/* Gradient Overlay */}
        <Box 
          sx={{ 
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: {
              xs: 'radial-gradient(circle, rgba(12, 18, 33, 0.95) 0%, rgba(12, 18, 33, 0.7) 100%)',
              md: 'linear-gradient(90deg, rgba(12, 18, 33, 0.95) 0%, rgba(12, 18, 33, 0.3) 100%)'
            },
            zIndex: 2,
          }}
        />

        <Container sx={{ position: 'relative', zIndex: 3 }}>
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
          >
            <Box sx={{ maxWidth: 800, textAlign: { xs: 'center', md: 'left' }, mx: { xs: 'auto', md: 0 } }}>
              <motion.div variants={fadeInUp}>
                <Typography 
                  variant="overline" 
                  sx={{ 
                    color: theme.palette.primary.main, 
                    fontWeight: 900, 
                    letterSpacing: 4, 
                    display: 'block', 
                    mb: { xs: 2, md: 3 },
                    fontSize: { xs: '0.75rem', md: '0.9rem' }
                  }}
                >
                  ADVANCED CAMPUS HEALTHCARE
                </Typography>
              </motion.div>
              
              <motion.div variants={fadeInUp}>
                <Typography 
                  variant="h1" 
                  sx={{ 
                    fontWeight: 900, 
                    mb: 3, 
                    fontSize: { xs: '2.8rem', sm: '3.5rem', md: '5rem' },
                    lineHeight: { xs: 1.2, md: 1.1 },
                    textShadow: '0 8px 16px rgba(0,0,0,0.4)',
                    color: 'white'
                  }}
                >
                  Smart Healthcare <br />
                  <span style={{ color: theme.palette.primary.main }}>For Every Student.</span>
                </Typography>
              </motion.div>

              <motion.div variants={fadeInUp}>
                <Typography 
                  variant="h6" 
                  sx={{ 
                    mb: 5, 
                    fontWeight: 300, 
                    opacity: 0.85, 
                    lineHeight: 1.8,
                    fontSize: { xs: '1.05rem', md: '1.25rem' },
                    maxWidth: { xs: '100%', md: '90%' },
                    color: 'white'
                  }}
                >
                  Experience seamless medical services at Obafemi Awolowo University. 
                  Book appointments, access your records, and receive prescriptions 
                  securely through our state-of-the-art digital health portal.
                </Typography>
              </motion.div>

              <motion.div variants={fadeInUp}>
                <Stack 
                  direction={{ xs: 'column', sm: 'row' }} 
                  spacing={2} 
                  justifyContent={{ xs: 'center', md: 'flex-start' }}
                  sx={{ width: '100%' }}
                >
                  <Button 
                    component={Link} 
                    href="/registrationpage" 
                    variant="contained" 
                    size="large"
                    endIcon={<ArrowForwardIcon />}
                    sx={{ 
                      py: 2.2, 
                      px: 5, 
                      fontWeight: 900, 
                      borderRadius: 2,
                      fontSize: '1rem',
                      boxShadow: '0 12px 24px rgba(25, 118, 210, 0.4)',
                      transition: '0.3s',
                      '&:hover': { transform: 'translateY(-3px)', boxShadow: '0 15px 30px rgba(25, 118, 210, 0.5)' }
                    }}
                  >
                    Get Started
                  </Button>
                  <Button 
                    component={Link} 
                    href="/loginpage" 
                    variant="outlined" 
                    size="large"
                    sx={{ 
                      py: 2.2, 
                      px: 5, 
                      fontWeight: 900, 
                      borderRadius: 2,
                      fontSize: '1rem',
                      color: 'white',
                      borderColor: 'rgba(255,255,255,0.4)',
                      transition: '0.3s',
                      '&:hover': { borderColor: 'white', bgcolor: 'rgba(255,255,255,0.1)', transform: 'translateY(-3px)' }
                    }}
                  >
                    Portal Login
                  </Button>
                </Stack>
              </motion.div>
            </Box>
          </motion.div>
        </Container>
      </Box>

      {/* 2. STATS SECTION */}
      <Box sx={{ bgcolor: 'action.hover', py: { xs: 8, md: 10 }, borderBottom: '1px solid', borderColor: 'divider' }}>
        <Container>
          <Grid container spacing={6} justifyContent="center" textAlign="center">
            {[
              { label: 'Registered Students', val: '50K+' },
              { label: 'Medical Staff', val: '120+' },
              { label: 'Success Rate', val: '100%' },
              { label: 'Response Time', val: '< 2s' }
            ].map((stat, i) => (
              <Grid size={{ xs: 6, md: i < 4 ? 3 : 6 }} key={i}>
                <motion.div
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                >
                  <Typography variant="h3" sx={{ fontWeight: 900, color: 'primary.main', mb: 1, fontSize: { xs: '2rem', md: '3rem' } }}>{stat.val}</Typography>
                  <Typography variant="body1" color="text.secondary" sx={{ fontWeight: 700, fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: 1 }}>{stat.label}</Typography>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* 3. CORE SERVICES SECTION */}
      <Box sx={{ py: { xs: 12, md: 18 } }}>
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Box sx={{ textAlign: 'center', mb: { xs: 8, md: 12 } }}>
              <Typography variant="h3" sx={{ fontWeight: 900, mb: 3, color: 'text.primary', fontSize: { xs: '2.2rem', md: '3.5rem' } }}>World-Class Care</Typography>
              <Typography color="text.secondary" sx={{ maxWidth: 700, mx: 'auto', fontSize: '1.1rem', lineHeight: 1.8 }}>
                We have redesigned our medical workflow from the ground up to ensure every student 
                receives rapid, high-quality attention.
              </Typography>
            </Box>
          </motion.div>

          <Grid container spacing={5}>
            {[
              { 
                title: 'Easy Registration', 
                desc: 'Digitize your student medical profile in heartbeat. No more manual form filling or long office waits.',
                icon: <HowToRegIcon sx={{ fontSize: 45 }} />,
                bg: theme.palette.mode === 'dark' ? 'rgba(33, 150, 243, 0.1)' : '#e3f2fd', color: '#1976d2'
              },
              { 
                title: 'Live Appointments', 
                desc: 'See exactly when your doctor is available. Book, reschedule, or cancel on the go with real-time sync.',
                icon: <EventAvailableIcon sx={{ fontSize: 45 }} />,
                bg: theme.palette.mode === 'dark' ? 'rgba(76, 175, 80, 0.1)' : '#e8f5e9', color: '#2e7d32'
              },
              { 
                title: 'E-Prescriptions', 
                desc: 'Your prescribed drugs are sent instantly to your dashboard. Pharmacists verify you via your digital ID.',
                icon: <MedicationIcon sx={{ fontSize: 45 }} />,
                bg: theme.palette.mode === 'dark' ? 'rgba(255, 152, 0, 0.1)' : '#fff3e0', color: '#ef6c00'
              }
            ].map((service, i) => (
              <Grid size={{ xs: 12, md: 4 }} key={i}>
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.2 }}
                >
                  <Card 
                    elevation={0}
                    sx={{ 
                      height: '100%', 
                      borderRadius: 5, 
                      border: '1px solid',
                      borderColor: 'divider',
                      bgcolor: 'background.paper',
                      transition: '0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                      '&:hover': { transform: 'translateY(-12px)', boxShadow: theme.palette.mode === 'dark' ? '0 30px 60px rgba(0,0,0,0.4)' : '0 30px 60px rgba(0,0,0,0.08)', borderColor: service.color }
                    }}
                  >
                    <CardContent sx={{ p: { xs: 5, md: 6 }, textAlign: 'center' }}>
                      <Box 
                        sx={{ 
                          width: 90, 
                          height: 90, 
                          bgcolor: service.bg, 
                          borderRadius: 3, 
                          display: 'flex', 
                          alignItems: 'center', 
                          justifyContent: 'center',
                          mb: 4,
                          mx: 'auto',
                          color: service.color,
                          transform: 'rotate(5deg)'
                        }}
                      >
                        {service.icon}
                      </Box>
                      <Typography variant="h5" sx={{ fontWeight: 800, mb: 3, color: 'text.primary' }}>{service.title}</Typography>
                      <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.8 }}>
                        {service.desc}
                      </Typography>
                    </CardContent>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* 4. WHY CHOOSE US SECTION */}
      <Box sx={{ py: { xs: 12, md: 20 }, bgcolor: theme.palette.mode === 'dark' ? '#0f172a' : '#0c1221', color: 'white', position: 'relative' }}>
        <Container>
          <Grid container spacing={10} alignItems="center">
            <Grid size={{ xs: 12, md: 6 }}>
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <Typography variant="h3" sx={{ fontWeight: 900, mb: 5, fontSize: { xs: '2.2rem', md: '3.5rem' } }}>The Digital Edge</Typography>
                <Stack spacing={5}>
                  {[
                    { 
                      icon: <ShieldIcon sx={{ fontSize: 28 }} />, 
                      title: 'Privacy First Architecture', 
                      desc: 'Military-grade encryption ensures your private health history is only seen by you and your designated medical professional.' 
                    },
                    { 
                      icon: <SpeedIcon sx={{ fontSize: 28 }} />, 
                      title: 'Lightning-Fast Retrieval', 
                      desc: 'Doctors access your historic records in less than 2 seconds, allowing for faster diagnosis and life-saving decision making.' 
                    },
                    { 
                      icon: <HealthAndSafetyIcon sx={{ fontSize: 28 }} />, 
                      title: 'Emergency Integration', 
                      desc: 'Direct link to campus security and ambulance services for immediate medical dispatch in critical situations.' 
                    }
                  ].map((item, i) => (
                    <motion.div 
                      key={i} 
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: i * 0.2 }}
                      style={{ display: 'flex', gap: '24px' }}
                    >
                      <Box sx={{ color: 'primary.main', mt: 0.5, p: 1.5, bgcolor: 'rgba(25, 118, 210, 0.1)', borderRadius: 2, height: 'fit-content' }}>{item.icon}</Box>
                      <Box>
                        <Typography variant="h6" sx={{ fontWeight: 800, mb: 1, fontSize: '1.2rem' }}>{item.title}</Typography>
                        <Typography variant="body1" sx={{ opacity: 0.7, lineHeight: 1.7 }}>{item.desc}</Typography>
                      </Box>
                    </motion.div>
                  ))}
                </Stack>
              </motion.div>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <motion.div
                initial={{ opacity: 0, scale: 0.9, x: 50 }}
                whileInView={{ opacity: 1, scale: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <Box 
                  sx={{ 
                    p: 2, 
                    bgcolor: 'rgba(255,255,255,0.03)', 
                    borderRadius: 8, 
                    position: 'relative',
                    '&::after': {
                      content: '""',
                      position: 'absolute',
                      top: -30,
                      right: -30,
                      width: '100%',
                      height: '100%',
                      border: '2px solid',
                      borderColor: 'primary.main',
                      borderRadius: 8,
                      zIndex: -1,
                      display: { xs: 'none', md: 'block' }
                    }
                  }}
                >
                  <img 
                    src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80" 
                    alt="Professional Healthcare" 
                    style={{ width: '100%', borderRadius: '32px', display: 'block', filter: 'grayscale(20%)' }} 
                  />
                </Box>
              </motion.div>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* 5. CAMPUS NEWS / TIPS */}
      <Box sx={{ py: { xs: 12, md: 18 } }}>
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, justifyContent: 'space-between', alignItems: { xs: 'flex-start', sm: 'flex-end' }, mb: 8, gap: 3 }}>
              <Box>
                <Typography variant="h3" sx={{ fontWeight: 900, mb: 1, color: 'text.primary' }}>Public Health Hub</Typography>
                <Typography variant="h6" color="text.secondary" sx={{ fontWeight: 400 }}>Latest campus updates and medical advisories.</Typography>
              </Box>
              <Button 
                variant="outlined" 
                sx={{ 
                    px: 4, 
                    py: 1.5, 
                    fontWeight: 800, 
                    borderRadius: 2, 
                    borderWidth: 2,
                    '&:hover': { borderWidth: 2 }
                }}
              >
                  View Archive
              </Button>
            </Box>
          </motion.div>
          
          <Grid container spacing={5}>
            {[
              { img: 'https://images.unsplash.com/photo-1584036561566-baf8f5f1b144?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80', tag: 'Prevention', title: 'Rainy Season Malaria Advisory for Students' },
              { img: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80', tag: 'Wellness', title: 'Mental Health: Dealing with Academic Pressure' },
              { img: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80', tag: 'Announcement', title: 'Free Hepatitis Screening for Incoming Freshers' }
            ].map((blog, i) => (
              <Grid size={{ xs: 12, md: 4 }} key={i}>
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.2 }}
                >
                  <Box sx={{ cursor: 'pointer', '&:hover img': { transform: 'scale(1.08)' }, transition: '0.4s' }}>
                    <Box sx={{ borderRadius: 5, overflow: 'hidden', mb: 3, boxShadow: theme.palette.mode === 'dark' ? '0 10px 30px rgba(0,0,0,0.4)' : '0 10px 30px rgba(0,0,0,0.1)' }}>
                      <img 
                        src={blog.img} 
                        alt="Health News" 
                        style={{ width: '100%', height: 280, objectFit: 'cover', transition: '0.6s cubic-bezier(0.4, 0, 0.2, 1)' }} 
                      />
                    </Box>
                    <Typography variant="button" color="primary" sx={{ fontWeight: 900, mb: 1, display: 'block' }}>{blog.tag}</Typography>
                    <Typography variant="h5" sx={{ fontWeight: 800, mt: 1, mb: 2, fontSize: '1.3rem', lineHeight: 1.4, color: 'text.primary' }}>{blog.title}</Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.6, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                      Keep your academic session smooth by staying updated with the latest preventative health measures provided by the University staff...
                    </Typography>
                  </Box>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* FINAL CTA BOX */}
      <Container sx={{ py: 10 }}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <Paper 
              elevation={0}
              sx={{ 
                  p: { xs: 6, md: 10 }, 
                  bgcolor: 'primary.main', 
                  borderRadius: 8, 
                  textAlign: 'center', 
                  color: 'white',
                  boxShadow: '0 40px 80px rgba(25, 118, 210, 0.2)'
              }}
          >
              <Typography variant="h3" sx={{ fontWeight: 900, mb: 3 }}>Healthy Students, Successful Leaders.</Typography>
              <Typography variant="h6" sx={{ mb: 6, opacity: 0.9, fontWeight: 300 }}>Join thousands of other OAU students utilizing the digital health ecosystem.</Typography>
              <Button 
                  component={Link}
                  href="/registrationpage"
                  variant="contained" 
                  size="large"
                  sx={{ 
                      bgcolor: 'white', 
                      color: 'primary.main', 
                      px: 8, 
                      py: 2.5, 
                      borderRadius: 3, 
                      fontWeight: 900,
                      fontSize: '1.1rem',
                      transition: '0.3s',
                      '&:hover': { bgcolor: '#f0f0f0', transform: 'scale(1.05)' }
                  }}
              >
                  Register Now
              </Button>
          </Paper>
        </motion.div>
      </Container>
    </Box>
  );
};

export default HomePage;
