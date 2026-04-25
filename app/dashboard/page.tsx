"use client";

import React from 'react';
import { 
  Typography, 
  Box, 
  Grid, 
  Paper, 
  Avatar, 
  Button, 
  Stack, 
  Chip,
  Divider,
  useTheme
} from '@mui/material';
import { motion } from 'framer-motion';
import { useAuth } from '@/firebase/authcontext';
import DashboardLayout from '@/components/layout/DashboardLayout';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import MedicationIcon from '@mui/icons-material/Medication';
import HistoryIcon from '@mui/icons-material/History';
import VerifiedIcon from '@mui/icons-material/Verified';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import Link from 'next/link';

export default function Dashboard() {
  const { profile } = useAuth();
  const theme = useTheme();

  const stats = [
    { label: "Upcoming Appointments", val: "0", icon: <CalendarMonthIcon />, color: '#1976d2', path: '/appointments' },
    { label: "Active Prescriptions", val: "0", icon: <MedicationIcon />, color: '#2e7d32', path: '/prescriptions' },
    { label: "Total Medical Visits", val: "1", icon: <HistoryIcon />, color: '#ed6c02', path: '/student-records' },
  ];

  return (
    <DashboardLayout>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Box sx={{ mb: 6 }}>
          <Typography variant="h4" sx={{ fontWeight: 800, mb: 1, letterSpacing: -1, color: 'text.primary' }}>
            Welcome back, {profile?.fullName?.split(' ')[0] || "Student"}
          </Typography>
          <Typography color="text.secondary" variant="body1">
            Stay on top of your health journey with OAU Health Center.
          </Typography>
        </Box>
      </motion.div>

      {/* Stats Summary Area */}
      <Grid container spacing={3} sx={{ mb: 6 }}>
        {stats.map((stat, i) => (
          <Grid size={{ xs: 12, sm: 4 }} key={i}>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
            >
              <Paper 
                elevation={0} 
                sx={{ 
                  p: 3, 
                  borderRadius: 5, 
                  border: '1px solid',
                  borderColor: 'divider',
                  bgcolor: 'background.paper',
                  transition: '0.3s',
                  '&:hover': { transform: 'translateY(-5px)', boxShadow: theme.palette.mode === 'dark' ? '0 12px 24px rgba(0,0,0,0.4)' : '0 12px 24px rgba(0,0,0,0.05)' }
                }}
              >
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                  <Avatar sx={{ bgcolor: `${stat.color}15`, color: stat.color, borderRadius: 2.5 }}>
                    {stat.icon}
                  </Avatar>
                  <Chip label="Active" size="small" variant="outlined" color="primary" sx={{ fontWeight: 700, borderRadius: 1 }} />
                </Box>
                <Typography variant="h4" sx={{ fontWeight: 900, mb: 0.5, color: 'text.primary' }}>{stat.val}</Typography>
                <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500, mb: 2 }}>{stat.label}</Typography>
                <Button 
                  component={Link}
                  href={stat.path}
                  size="small" 
                  endIcon={<ArrowForwardIcon sx={{ fontSize: 14 }} />}
                  sx={{ textTransform: 'none', fontWeight: 700, color: stat.color, p: 0, '&:hover': { bgcolor: 'transparent', textDecoration: 'underline' } }}
                >
                  View Details
                </Button>
              </Paper>
            </motion.div>
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={4}>
        {/* Profile Identity Card */}
        <Grid size={{ xs: 12, md: 7 }}>
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Paper 
              elevation={0} 
              sx={{ 
                p: { xs: 3, md: 5 }, 
                borderRadius: 6, 
                border: '1px solid',
                borderColor: 'divider',
                bgcolor: 'background.paper',
                position: 'relative',
                overflow: 'hidden'
              }}
            >
              <Box sx={{ position: 'absolute', top: 0, left: 0, right: 0, height: 120, bgcolor: 'action.selected', zIndex: 0 }} />
              
              <Box sx={{ position: 'relative', zIndex: 1 }}>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 4, alignItems: 'flex-end', mb: 5 }}>
                  <Avatar
                    src={profile?.passportUrl || ""}
                    alt="Student Logo"
                    sx={{ 
                      width: 140, 
                      height: 140, 
                      borderRadius: 5, 
                      border: '5px solid', 
                      borderColor: 'background.paper',
                      boxShadow: '0 12px 30px rgba(0,0,0,0.1)' 
                    }}
                  />
                  <Box sx={{ flexGrow: 1 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                      <Typography variant="h5" sx={{ fontWeight: 900, color: 'text.primary' }}>{profile?.fullName || "Student Name"}</Typography>
                      <VerifiedIcon color="primary" sx={{ fontSize: 22 }} />
                    </Box>
                    <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
                      {profile?.matricNumber || "OAU-MAT-XXXX"}
                    </Typography>
                    <Stack direction="row" spacing={1}>
                      <Chip label={"Student"} size="small" sx={{ fontWeight: 700, bgcolor: 'primary.light', color: 'primary.contrastText' }} />
                      <Chip label={profile?.level || "100L"} size="small" variant="outlined" sx={{ fontWeight: 700 }} />
                    </Stack>
                  </Box>
                </Box>

                <Divider sx={{ mb: 4 }} />

                <Grid container spacing={4}>
                  {[
                    { label: "FACULTY", val: profile?.faculty || "N/A" },
                    { label: "PHONE NUMBER", val: profile?.phoneNumber || "N/A" },
                    { label: "GENDER", val: profile?.gender || "N/A" },
                    { label: "DATE OF BIRTH", val: profile?.dob || "N/A" },
                  ].map((item, i) => (
                    <Grid size={{ xs: 12, sm: 6 }} key={i}>
                      <Typography variant="caption" sx={{ fontWeight: 800, color: 'text.secondary', textTransform: 'uppercase', letterSpacing: 1 }}>
                        {item.label}
                      </Typography>
                      <Typography variant="body1" sx={{ fontWeight: 600, mt: 0.5, color: 'text.primary' }}>{item.val}</Typography>
                    </Grid>
                  ))}
                </Grid>
              </Box>
            </Paper>
          </motion.div>
        </Grid>

        {/* Medical Summary Sidebar */}
        <Grid size={{ xs: 12, md: 5 }}>
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            style={{ height: '100%' }}
          >
            <Paper 
              elevation={0} 
              sx={{ 
                p: { xs: 3, md: 5 }, 
                borderRadius: 6, 
                bgcolor: theme.palette.mode === 'dark' ? 'primary.dark' : '#1a1a1a', 
                color: 'white',
                height: '100%',
                display: 'flex',
                flexDirection: 'column'
              }}
            >
              <Typography variant="h6" sx={{ fontWeight: 800, mb: 4, display: 'flex', alignItems: 'center', gap: 1.5 }}>
                <Box sx={{ width: 4, height: 24, bgcolor: 'primary.main', borderRadius: 2 }} />
                Medical Status
              </Typography>

              <Stack spacing={4} sx={{ flexGrow: 1 }}>
                <Box>
                  <Typography variant="caption" sx={{ opacity: 0.6, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1.5 }}>
                    Blood Group
                  </Typography>
                  <Typography variant="h4" sx={{ fontWeight: 900, color: 'white', mt: 0.5 }}>
                    {profile?.bloodGroup || "O+"}
                  </Typography>
                </Box>

                <Box>
                  <Typography variant="caption" sx={{ opacity: 0.6, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1.5 }}>
                    Allergies / History
                  </Typography>
                  <Typography variant="body1" sx={{ mt: 1, lineHeight: 1.8, color: 'rgba(255,255,255,0.8)' }}>
                    {profile?.medicalHistory || "None documented."}
                  </Typography>
                </Box>

                <Box sx={{ p: 3, bgcolor: 'rgba(255,255,255,0.05)', borderRadius: 4, border: '1px solid rgba(255,255,255,0.1)' }}>
                  <Typography variant="caption" sx={{ opacity: 0.6, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1.5 }}>
                    Emergency Contact
                  </Typography>
                  <Typography variant="body1" sx={{ mt: 1, fontWeight: 700, color: 'white' }}>
                    {profile?.emergencyContact || "N/A"}
                  </Typography>
                </Box>
              </Stack>

              <Button 
                component={Link}
                href="/settings"
                variant="contained" 
                fullWidth 
                sx={{ mt: 6, py: 1.5, borderRadius: 2.5, fontWeight: 800, bgcolor: 'white', color: 'black', '&:hover': { bgcolor: '#f0f0f0' } }}
              >
                Update Records
              </Button>
            </Paper>
          </motion.div>
        </Grid>
      </Grid>
    </DashboardLayout>
  );
}