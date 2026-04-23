"use client";
import React, { useState } from 'react';
import { TextField, Button, Box, Typography, Container, Paper, Alert, CircularProgress } from '@mui/material';
import { signInWithEmailAndPassword } from 'firebase/auth';

import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { auth } from '@/firebase/firebasefile';
import { resetPassword } from '../library/auth';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push('/dashboard');
    } catch (err: unknown) {
      setError("Failed to login. Check credentials.");
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async () => {
    if (!email) return setError("Enter your email first");
    try {
      await resetPassword(email);
      setMessage("Password reset email sent!");
    } catch (err) {
      setError("Error sending reset email.");
    }
  };

  return (
    <Container maxWidth="xs">
      <Box sx={{ mt: 8 }}>
        <Paper sx={{ p: 4 }}>
          <Typography variant="h5" align="center" gutterBottom>Login</Typography>
          {error && <Alert severity="error">{error}</Alert>}
          {message && <Alert severity="success">{message}</Alert>}
          <form onSubmit={handleLogin}>
            <TextField fullWidth margin="normal" label="Email" onChange={(e) => setEmail(e.target.value)} />
            <TextField fullWidth margin="normal" label="Password" type="password" onChange={(e) => setPassword(e.target.value)} />
            <Button fullWidth variant="contained" type="submit" disabled={loading} sx={{ mt: 2 }}>
              {loading ? <CircularProgress size={24} /> : "Login"}
            </Button>
          </form>
          <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between' }}>
            <Button size="small" onClick={handleForgotPassword}>Forgot Password?</Button>
            <Link href="/registrationpage">Create Account</Link>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
}