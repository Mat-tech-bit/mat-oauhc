"use client";

import React, { useState } from 'react';
import { 
  TextField, 
  Button, 
  Box, 
  Typography, 
  Container, 
  Paper, 
  Alert, 
  CircularProgress,
  Stack,
  IconButton,
  InputAdornment,
  Avatar,
  useTheme,
  Grid
} from '@mui/material';
import { motion } from 'framer-motion';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { auth } from '@/firebase/firebasefile';
import { resetPassword } from '../library/auth';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const theme = useTheme();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setMessage('');
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push('/dashboard');
    } catch (err: any) {
      setError("Invalid email or password. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async () => {
    if (!email) return setError("Please enter your email address to reset password.");
    try {
      await resetPassword(email);
      setMessage("A password reset link has been sent to your email.");
    } catch (err) {
      setError("Unable to send reset email. Verify your address.");
    }
  };

  return (
    <Box 
      sx={{ 
        minHeight: '600px', 
        display: 'flex', 
        bgcolor: 'background.default',
        overflowY: 'auto'
      }}
    >
      <Grid container sx={{ flexGrow: 1 }}>
        {/* Left Side: Branding & Info (Hidden on mobile) */}
        <Grid 
          size={{ xs: 0, md: 6, lg: 7 }} 
          sx={{ 
            display: { xs: 'none', md: 'flex' },
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'relative',
            bgcolor: '#0f172a',
            color: 'white',
            p: 8,
            textAlign: 'center',
          }}
        >
          {/* Decorative background element */}
          <Box 
            sx={{ 
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundImage: 'url("https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80")',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              opacity: 0.15,
              zIndex: 1
            }}
          />
          
          <Box sx={{ position: 'relative', zIndex: 2, maxWidth: 600, textAlign: 'left' }}>
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <Avatar sx={{ bgcolor: 'white', width: 72, height: 72, mb: 4, boxShadow: '0 10px 40px rgba(0,0,0,0.5)' }}>
                <MedicalServicesIcon sx={{ fontSize: 36, color: 'primary.main' }} />
              </Avatar>
              <Typography variant="h2" sx={{ fontWeight: 900, mb: 3, letterSpacing: -2, lineHeight: 1 }}>
                Healthier <br />
                <span style={{ color: theme.palette.primary.main }}>Campus Life.</span>
              </Typography>
              <Typography variant="h6" sx={{ opacity: 0.7, fontWeight: 300, lineHeight: 1.6, mb: 8, maxWidth: 450 }}>
                Secure access to the OAU Health Center. Your medical history, prescriptions, and appointments in one place.
              </Typography>
              
              <Stack spacing={4}>
                {[
                  { title: 'Data Privacy', desc: 'Compliant with NHIS security standards.' },
                  { title: 'Instant Booking', desc: 'No more long queues under the sun.' },
                  { title: 'Electronic Health Records', desc: 'Your health history is always accessible.' }
                ].map((item, i) => (
                  <Box key={i} sx={{ display: 'flex', gap: 2.5, alignItems: 'center' }}>
                    <Box sx={{ width: 12, height: 12, bgcolor: 'primary.main', borderRadius: '50%' }} />
                    <Box>
                      <Typography variant="subtitle2" sx={{ fontWeight: 800, color: 'white' }}>{item.title}</Typography>
                      <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.5)' }}>{item.desc}</Typography>
                    </Box>
                  </Box>
                ))}
              </Stack>
              
              {/* Trust markers */}
              <Box sx={{ mt: 10, display: 'flex', gap: 4, opacity: 0.5 }}>
                <Typography variant="overline" sx={{ fontWeight: 900, letterSpacing: 2 }}>SECURITY ENABLED</Typography>
                <Typography variant="overline" sx={{ fontWeight: 900, letterSpacing: 2 }}>OAU OFFICIAL</Typography>
              </Box>
            </motion.div>
          </Box>
        </Grid>

        {/* Right Side: Login Form */}
        <Grid 
          size={{ xs: 12, md: 6, lg: 5 }}
          sx={{ 
            display: 'flex', 
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            p: { xs: 4, sm: 6, md: 8 },
            bgcolor: 'background.default'
          }}
        >
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            style={{ width: '100%', maxWidth: 450 }}
          >
            <Paper 
              elevation={0} 
              sx={{ 
                  p: { xs: 4, md: 6 }, 
                  borderRadius: 6, 
                  border: '1px solid',
                  borderColor: 'divider',
                  bgcolor: 'background.paper',
                  boxShadow: theme.palette.mode === 'dark' ? '0 25px 50px -12px rgba(0, 0, 0, 0.5)' : '0 25px 50px -12px rgba(0, 0, 0, 0.05)',
              }}
            >
              <Box sx={{ mb: 4 }}>
                <Box sx={{ display: { md: 'none' }, mb: 3 }}>
                    <Avatar sx={{ bgcolor: 'primary.main', width: 48, height: 48, mb: 2 }}>
                        <MedicalServicesIcon />
                    </Avatar>
                </Box>
                <Typography variant="h4" sx={{ fontWeight: 900, letterSpacing: -1, color: 'text.primary' }}>
                  Welcome Back
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                  Login to your student health portal
                </Typography>
              </Box>

              {error && <Alert severity="error" sx={{ mb: 3, borderRadius: 3 }}>{error}</Alert>}
              {message && <Alert severity="success" sx={{ mb: 3, borderRadius: 3 }}>{message}</Alert>}

              <form onSubmit={handleLogin}>
                <Stack spacing={3}>
                  <TextField 
                    fullWidth 
                    label="Student Email" 
                    variant="outlined"
                    autoFocus
                    onChange={(e) => setEmail(e.target.value)}
                    sx={{ '& .MuiOutlinedInput-root': { borderRadius: 3 } }}
                  />
                  
                  <TextField 
                    fullWidth 
                    label="Portal Password" 
                    type={showPassword ? 'text' : 'password'}
                    variant="outlined"
                    onChange={(e) => setPassword(e.target.value)}
                    sx={{ '& .MuiOutlinedInput-root': { borderRadius: 3 } }}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={() => setShowPassword(!showPassword)}
                            edge="end"
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />

                  <Button 
                    fullWidth 
                    variant="contained" 
                    type="submit" 
                    disabled={loading}
                    sx={{ 
                      height: 56, 
                      borderRadius: 3, 
                      fontWeight: 800, 
                      fontSize: '1rem',
                      mt: 2,
                      boxShadow: '0 8px 24px rgba(25, 118, 210, 0.3)',
                      transition: '0.3s',
                      '&:hover': { transform: 'translateY(-3px)', boxShadow: '0 12px 32px rgba(25, 118, 210, 0.4)' }
                    }}
                  >
                    {loading ? <CircularProgress size={24} color="inherit" /> : "Access Dashboard"}
                  </Button>
                </Stack>
              </form>

              <Box sx={{ mt: 4, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1 }}>
                <Button 
                  onClick={handleForgotPassword} 
                  sx={{ textTransform: 'none', fontWeight: 600, color: 'text.secondary', '&:hover': { textDecoration: 'underline', bgcolor: 'transparent' } }}
                >
                  Having trouble signing in?
                </Button>
                <Typography variant="body2" color="text.secondary">
                  Don't have an account?{' '}
                  <Button 
                    component={Link} 
                    href="/registrationpage" 
                    sx={{ fontWeight: 800, color: 'primary.main', textTransform: 'none', minWidth: 0, p: 0.5, '&:hover': { bgcolor: 'transparent', textDecoration: 'underline' } }}
                  >
                    Register here
                  </Button>
                </Typography>
              </Box>
            </Paper>
            <Typography align="center" variant="caption" sx={{ display: 'block', mt: 4, color: 'text.disabled', fontWeight: 500 }}>
              &copy; {new Date().getFullYear()} Obafemi Awolowo University Health Center
            </Typography>
          </motion.div>
        </Grid>
      </Grid>
    </Box>
  );
}