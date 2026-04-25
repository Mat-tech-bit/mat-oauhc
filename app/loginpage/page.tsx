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
  Fade,
  useTheme
} from '@mui/material';
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
        minHeight: '100vh', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        bgcolor: 'background.default',
        backgroundImage: theme.palette.mode === 'dark' 
          ? 'radial-gradient(at 0% 0%, rgba(25, 118, 210, 0.1) 0, transparent 50%)' 
          : 'radial-gradient(at 0% 0%, rgba(25, 118, 210, 0.05) 0, transparent 50%)',
        p: 2
      }}
    >
      <Fade in timeout={1000}>
        <Container maxWidth="sm">
          <Paper 
            elevation={0} 
            sx={{ 
                p: { xs: 4, md: 6 }, 
                borderRadius: 8, 
                border: '1px solid',
                borderColor: 'divider',
                bgcolor: 'background.paper',
                boxShadow: theme.palette.mode === 'dark' ? '0 25px 50px -12px rgba(0, 0, 0, 0.5)' : '0 25px 50px -12px rgba(0, 0, 0, 0.05)'
            }}
          >
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 5 }}>
              <Avatar sx={{ bgcolor: 'primary.main', width: 56, height: 56, mb: 2, boxShadow: '0 8px 16px rgba(25, 118, 210, 0.2)' }}>
                <MedicalServicesIcon />
              </Avatar>
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
                  autoFocus
                  onChange={(e) => setEmail(e.target.value)}
                />
                
                <TextField 
                  fullWidth 
                  label="Portal Password" 
                  type={showPassword ? 'text' : 'password'}
                  onChange={(e) => setPassword(e.target.value)}
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
                    textTransform: 'none',
                    mt: 1
                  }}
                >
                  {loading ? <CircularProgress size={24} color="inherit" /> : "Access Dashboard"}
                </Button>
              </Stack>
            </form>

            <Box sx={{ mt: 4, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1 }}>
              <Button 
                onClick={handleForgotPassword} 
                sx={{ textTransform: 'none', fontWeight: 600, color: 'text.secondary' }}
              >
                Having trouble signing in?
              </Button>
              <Typography variant="body2" color="text.secondary">
                Don't have an account?{' '}
                <Button 
                    component={Link} 
                    href="/registrationpage" 
                    sx={{ fontWeight: 800, color: 'primary.main', textTransform: 'none', minWidth: 0, p: 0.5 }}
                >
                    Register here
                </Button>
              </Typography>
            </Box>
          </Paper>
          
          <Typography align="center" variant="caption" sx={{ display: 'block', mt: 4, color: 'text.disabled', fontWeight: 500 }}>
             &copy; {new Date().getFullYear()} Obafemi Awolowo University Health Center
          </Typography>
        </Container>
      </Fade>
    </Box>
  );
}