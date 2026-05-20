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
  useTheme,
  TextField
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
    <Box sx={{ bgcolor: 'background.default', overflowX: 'hidden', width: '100%', maxWidth: '100vw' }}>
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

        <Container maxWidth="xl">
          <Grid container spacing={8} alignItems="center" sx={{ minHeight: '80vh' }}>
            <Grid size={{ xs: 12, md: 7 }} sx={{ textAlign: { xs: 'center', md: 'left' } }}>
              <motion.div variants={fadeInUp}>
                <Typography 
                  variant="overline" 
                  sx={{ 
                    color: theme.palette.primary.main, 
                    fontWeight: 900, 
                    letterSpacing: 4, 
                    display: 'block', 
                    mb: { xs: 2, md: 3 },
                    fontSize: { xs: '0.8rem', md: '1rem' }
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
                    fontSize: { xs: '2.5rem', sm: '3.5rem', md: '5.5rem' },
                    lineHeight: { xs: 1.1, md: 1.1 },
                    textShadow: '0 8px 16px rgba(0,0,0,0.4)',
                    color: 'white'
                  }}
                >
                  Smart Health <br />
                  <span style={{ color: theme.palette.primary.main }}>For OAU Students.</span>
                </Typography>
              </motion.div>

              <motion.div variants={fadeInUp}>
                <Typography 
                  variant="h6" 
                  sx={{ 
                    mb: 5, 
                    fontWeight: 300, 
                    opacity: 0.85, 
                    lineHeight: 1.7,
                    fontSize: { xs: '1rem', md: '1.3rem' },
                    maxWidth: { xs: '100%', md: '85%' },
                    color: 'white'
                  }}
                >
                  Experience seamless medical services at OAU. 
                  Book appointments, access records, and receive prescriptions 
                  securely through the official digital health portal.
                </Typography>
              </motion.div>

              <motion.div variants={fadeInUp}>
                <Stack 
                  direction={{ xs: 'column', sm: 'row' }} 
                  spacing={3} 
                  justifyContent={{ xs: 'center', md: 'flex-start' }}
                  sx={{ width: '100%', mb: 8 }}
                >
                  <Button 
                    component={Link}
                    href="/registrationpage"
                    variant="contained" 
                    size="large"
                    sx={{ 
                      bgcolor: theme.palette.primary.main, 
                      color: 'white', 
                      px: 6, 
                      py: 2.5, 
                      borderRadius: 3, 
                      fontWeight: 900,
                      fontSize: '1.1rem',
                      boxShadow: '0 12px 32px rgba(25, 118, 210, 0.4)',
                      '&:hover': { transform: 'translateY(-4px)', bgcolor: theme.palette.primary.dark }
                    }}
                  >
                    Get Started Now
                  </Button>
                  <Button 
                    component={Link}
                    href="/loginpage"
                    variant="outlined" 
                    size="large"
                    sx={{ 
                      borderColor: 'rgba(255,255,255,0.4)', 
                      color: 'white', 
                      px: 6, 
                      py: 2.5, 
                      borderRadius: 3, 
                      fontWeight: 900,
                      fontSize: '1.1rem',
                      backdropFilter: 'blur(10px)',
                      '&:hover': { borderColor: 'white', bgcolor: 'rgba(255,255,255,0.1)', transform: 'translateY(-4px)' }
                    }}
                  >
                    Portal Login
                  </Button>
                </Stack>
              </motion.div>

              {/* Added: Professional Search Bar Placeholder */}
              <motion.div variants={fadeInUp}>
                <Paper
                    elevation={0}
                    sx={{
                        p: 0.5,
                        pl: 3,
                        alignItems: 'center',
                        maxWidth: 550,
                        borderRadius: 5,
                        bgcolor: 'rgba(255,255,255,0.1)',
                        border: '1px solid rgba(255,255,255,0.2)',
                        backdropFilter: 'blur(20px)',
                        mb: 8,
                        display: { xs: 'none', lg: 'flex' },
                        boxShadow: '0 20px 40px rgba(0,0,0,0.2)'
                    }}
                >
                    <Box sx={{ flexGrow: 1 }}>
                        <TextField 
                            fullWidth 
                            variant="standard" 
                            placeholder="Find services, clinics or health tips..." 
                            InputProps={{ disableUnderline: true, sx: { color: 'white', fontSize: '0.95rem' } }}
                        />
                    </Box>
                    <Button 
                      variant="contained" 
                      sx={{ 
                        borderRadius: 4, 
                        px: 4, 
                        py: 1.5, 
                        fontWeight: 900,
                        bgcolor: 'white',
                        color: 'primary.main',
                        '&:hover': { bgcolor: '#f0f0f0' }
                      }}
                    >
                      Search
                    </Button>
                </Paper>
              </motion.div>

              {/* Trust/Stats indicators */}
              <motion.div variants={fadeInUp}>
                <Grid container spacing={6} sx={{ justifyContent: { xs: 'center', md: 'flex-start' } }}>
                  {[
                    { label: 'Active Students', val: '35,000+' },
                    { label: 'Staff Radiologists', val: '24/7' },
                    { label: 'Verified Profile', val: 'Security Enabled' }
                  ].map((stat, i) => (
                    <Grid size={{ xs: 12, sm: 4 }} key={i}>
                      <Typography variant="h4" sx={{ fontWeight: 900, color: 'primary.main', mb: 0.5 }}>{stat.val}</Typography>
                      <Typography variant="caption" sx={{ color: 'white', opacity: 0.6, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1.5 }}>{stat.label}</Typography>
                    </Grid>
                  ))}
                </Grid>
              </motion.div>
            </Grid>

            <Grid size={{ xs: 12, md: 5 }} sx={{ display: { xs: 'none', md: 'block' } }}>
              <motion.div
                initial={{ opacity: 0, x: 50, scale: 0.9 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                transition={{ duration: 1.2, ease: 'easeOut' }}
              >
                <Box 
                  sx={{ 
                    position: 'relative',
                    zIndex: 2,
                    '&::before': {
                      content: '""',
                      position: 'absolute',
                      top: '15%',
                      left: '15%',
                      width: '70%',
                      height: '70%',
                      bgcolor: 'primary.main',
                      filter: 'blur(150px)',
                      opacity: 0.3,
                      zIndex: -1
                    }
                  }}
                >
                  <img 
                    src="/hero_medical_illustration_1779299682139.png" 
                    alt="Digital Health Interface" 
                    style={{ 
                      width: '100%', 
                      height: 'auto', 
                      display: 'block',
                      filter: 'drop-shadow(0 30px 60px rgba(0,0,0,0.6))'
                    }} 
                  />
                </Box>
              </motion.div>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* 1.5 QUICK ACTIONS BAR */}
      <Box 
        sx={{ 
          position: 'relative', 
          zIndex: 10, 
          mt: -5, 
          px: { xs: 2, md: 0 } 
        }}
      >
        <Container>
          <Paper 
            elevation={24}
            sx={{ 
              p: { xs: 3, md: 4 }, 
              borderRadius: 4, 
              bgcolor: 'background.paper',
              boxShadow: '0 20px 40px rgba(0,0,0,0.15)',
              border: '1px solid',
              borderColor: 'divider'
            }}
          >
            <Grid container spacing={3} alignItems="center">
              {[
                { icon: <HealthAndSafetyIcon />, label: 'Emergency', sub: '24/7 Hotline', color: '#f44336' },
                { icon: <EventAvailableIcon />, label: 'Appointments', sub: 'Book Online', color: '#2196f3' },
                { icon: <SpeedIcon />, label: 'Lab Results', sub: 'Check Status', color: '#4caf50' },
                { icon: <MedicationIcon />, label: 'Pharmacy', sub: 'E-Prescriptions', color: '#ff9800' }
              ].map((action, i) => (
                <Grid size={{ xs: 6, md: 3 }} key={i}>
                  <Box 
                    sx={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: 2,
                      cursor: 'pointer',
                      transition: '0.2s',
                      '&:hover': { transform: 'translateY(-3px)' }
                    }}
                  >
                    <Box 
                      sx={{ 
                        p: 1.5, 
                        bgcolor: `${action.color}15`, 
                        color: action.color, 
                        borderRadius: 2,
                        display: 'flex'
                      }}
                    >
                      {action.icon}
                    </Box>
                    <Box>
                      <Typography variant="subtitle2" sx={{ fontWeight: 800, lineHeight: 1.2 }}>{action.label}</Typography>
                      <Typography variant="caption" color="text.secondary">{action.sub}</Typography>
                    </Box>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Paper>
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
      <Box sx={{ py: { xs: 8, md: 14 }, px: { xs: 2, md: 0 } }}>
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

      {/* 3.5 DEPARTMENTS SECTION */}
      <Box sx={{ py: { xs: 10, md: 16 }, bgcolor: 'background.default', position: 'relative' }}>
        <Container>
          <Grid container spacing={6} alignItems="center">
            <Grid size={{ xs: 12, md: 5 }}>
              <Typography variant="overline" sx={{ color: 'primary.main', fontWeight: 900, letterSpacing: 2 }}>Our Specializations</Typography>
              <Typography variant="h3" sx={{ fontWeight: 900, mt: 2, mb: 4, lineHeight: 1.2 }}>Comprehensive care for the OAU community.</Typography>
              <Typography color="text.secondary" sx={{ mb: 6, fontSize: '1.1rem' }}>
                Our health center is equipped with various specialized departments to cater to all your medical needs without leaving campus.
              </Typography>
              <Stack spacing={3}>
                {[
                  'General Practice & Primary Care',
                  'Dental & Oral Health Clinic',
                  'Optometry & Eye Care',
                  'Laboratory & Diagnostic Services',
                  'Radiology & X-Ray Unit',
                  'Maternal & Reproductive Health'
                ].map((dept, i) => (
                  <Box key={i} sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Box sx={{ width: 8, height: 8, bgcolor: 'primary.main', borderRadius: '50%' }} />
                    <Typography variant="body1" sx={{ fontWeight: 700 }}>{dept}</Typography>
                  </Box>
                ))}
              </Stack>
            </Grid>
            <Grid size={{ xs: 12, md: 7 }}>
              <Grid container spacing={3}>
                {[
                  { title: 'In-Patient', img: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80' },
                  { title: 'Emergency', img: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80' },
                  { title: 'Laboratory', img: 'https://images.unsplash.com/photo-1581093458791-9f3c3250bb8b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80' },
                  { title: 'Pharmacy', img: 'https://images.unsplash.com/photo-1586015555751-63bb77f4322a?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80' }
                ].map((item, i) => (
                  <Grid size={{ xs: 6, md: 6 }} key={i}>
                    <Box 
                      sx={{ 
                        position: 'relative', 
                        height: { xs: 200, md: 280 }, 
                        borderRadius: 4, 
                        overflow: 'hidden',
                        mt: i % 2 !== 0 ? { md: 4 } : 0,
                        '&:hover .overlay': { opacity: 1 },
                        '&:hover img': { scale: '1.1' }
                      }}
                    >
                      <img 
                        src={item.img} 
                        alt={item.title} 
                        style={{ width: '100%', height: '100%', objectFit: 'cover', transition: '0.6s' }} 
                      />
                      <Box 
                        className="overlay"
                        sx={{ 
                          position: 'absolute', 
                          inset: 0, 
                          bgcolor: 'rgba(25, 118, 210, 0.8)', 
                          display: 'flex', 
                          alignItems: 'center', 
                          justifyContent: 'center',
                          opacity: 0,
                          transition: '0.4s'
                        }}
                      >
                        <Typography variant="h6" sx={{ color: 'white', fontWeight: 900 }}>{item.title}</Typography>
                      </Box>
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* 4. WHY CHOOSE US SECTION */}
      <Box sx={{ py: { xs: 8, md: 16 }, px: { xs: 2, md: 0 }, bgcolor: theme.palette.mode === 'dark' ? '#0f172a' : '#0c1221', color: 'white', position: 'relative', overflow: 'hidden' }}>
        <Container>
          <Grid container spacing={10} alignItems="center">
            <Grid size={{ xs: 12, md: 6 }}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
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
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
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
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
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
      <Box sx={{ py: { xs: 8, md: 14 }, px: { xs: 2, md: 0 } }}>
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
      <Container sx={{ py: { xs: 6, md: 10 } }}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <Paper 
              elevation={0}
              sx={{ 
                  p: { xs: 4, md: 10 }, 
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


      {/* 7. LATEST HEALTH NEWS SECTION */}
      <Box sx={{ py: 14, bgcolor: 'background.default' }}>
        <Container>
          <Box sx={{ mb: 8, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
            <Box>
              <Typography variant="overline" color="primary" sx={{ fontWeight: 900, letterSpacing: 2 }}>Campus Wellness</Typography>
              <Typography variant="h3" sx={{ fontWeight: 900, mt: 1 }}>Latest Health Updates</Typography>
            </Box>
            <Button variant="text" sx={{ fontWeight: 800 }}>View All News</Button>
          </Box>
          <Grid container spacing={4}>
            {[
              { 
                tag: 'Vaccination', 
                title: 'Upcoming COVID-19 Booster Clinic at Health Center', 
                date: 'May 24, 2024',
                image: 'https://images.unsplash.com/photo-1584036561566-baf8f5f1b144?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
              },
              { 
                tag: 'Insurance', 
                title: 'New NHIS Registration Guidelines for Freshers', 
                date: 'May 20, 2024',
                image: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
              },
              { 
                tag: 'Wellness', 
                title: 'Mental Health Awareness Week: Resources and Events', 
                date: 'May 15, 2024',
                image: 'https://images.unsplash.com/photo-1527137342181-19aab11a8ee1?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
              }
            ].map((news, i) => (
              <Grid size={{ xs: 12, md: 4 }} key={i}>
                <Card elevation={0} sx={{ borderRadius: 6, bgcolor: 'transparent', height: '100%', '&:hover img': { transform: 'scale(1.05)' } }}>
                  <Box sx={{ height: 240, borderRadius: 6, overflow: 'hidden', mb: 3 }}>
                    <img src={news.image} alt={news.title} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: '0.6s' }} />
                  </Box>
                  <Typography variant="caption" sx={{ fontWeight: 800, color: 'primary.main', textTransform: 'uppercase', letterSpacing: 1 }}>{news.tag}</Typography>
                  <Typography variant="h6" sx={{ fontWeight: 900, mt: 1, mb: 2, lineHeight: 1.3 }}>{news.title}</Typography>
                  <Typography variant="body2" color="text.secondary">{news.date}</Typography>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* 8. QUICK CONTACT / EMERGENCY BANNER */}
      <Box sx={{ py: 6, bgcolor: '#0f172a' }}>
        <Container>
          <Paper 
            elevation={0} 
            sx={{ 
                p: { xs: 4, md: 6 }, 
                borderRadius: 8, 
                background: 'linear-gradient(135deg, #1976d2 0%, #1565c0 100%)',
                color: 'white',
                display: 'flex',
                flexDirection: { xs: 'column', md: 'row' },
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: 4
            }}
          >
            <Box>
              <Typography variant="h4" sx={{ fontWeight: 900, mb: 1 }}>Medical Emergency?</Typography>
              <Typography sx={{ opacity: 0.9 }}>Our emergency response team is available 24/7 for on-campus student assistance.</Typography>
            </Box>
            <Stack direction="row" spacing={3} alignItems="center">
              <Box sx={{ textAlign: { xs: 'center', md: 'right' } }}>
                <Typography variant="h3" sx={{ fontWeight: 900 }}>2223</Typography>
                <Typography variant="caption" sx={{ opacity: 0.7, textTransform: 'uppercase' }}>Campus Emergency Line</Typography>
              </Box>
              <Button 
                variant="contained" 
                sx={{ 
                    bgcolor: 'white', 
                    color: 'primary.main', 
                    px: 4, 
                    py: 2, 
                    borderRadius: 3, 
                    fontWeight: 900,
                    '&:hover': { bgcolor: '#f0f0f0' }
                }}
              >
                Call Now
              </Button>
            </Stack>
          </Paper>
        </Container>
      </Box>
    </Box>
  );
};

export default HomePage;
