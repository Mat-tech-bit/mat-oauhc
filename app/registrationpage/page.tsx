"use client";

import React, { useState } from 'react';
import { 
  Box, Typography, TextField, Grid as Grid, MenuItem, 
  FormControl, FormLabel, RadioGroup, FormControlLabel, 
  Radio, Button, Paper, Divider, Container, Alert 
} from '@mui/material';
import { useRouter } from 'next/navigation';
import { registerUser } from '../library/auth';
import { StudentProfile } from '../types/user';

export default function RegistrationForm() {
  const router = useRouter();

  // 1. State Management
  const [formData, setFormData] = useState({
    fullName: '',
    matricNumber: '',
    department: '',
    dob: '',
    gender: 'Male',
    phoneNumber: '',
    bloodGroup: '',
    emergencyContact: '',
    medicalHistory: '',
    email: '',
    password: ''
  });

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  // 2. Handle Input Changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 3. The Submit Function (Fixed and Scoped)
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Separate email/password for Firebase Auth, the rest for Firestore
    const { email, password, ...profileData } = formData;

    try {
      await registerUser(
  email,
  password,
  profileData as Omit<
    StudentProfile,
    "uid" | "email" | "role" | "createdAt"
  >
);
      setLoading(false);
      alert('Registration successful! Please login.');
      router.push('/loginpage'); 
    } catch (err: unknown) {
      setLoading(false);
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unexpected error occurred.");
      }
    }
  };

  return (
    <Box sx={{ bgcolor: '#f5f5f5', minHeight: '100vh', py: 4, px: 2 }}>
      <Container maxWidth="md">
        <Paper 
          elevation={0} 
          sx={{ p: { xs: 3, md: 5 }, borderRadius: 2, border: '1px solid #e0e0e0' }}
        >
          <Typography variant="h5" sx={{ fontWeight: 700, mb: 0.5 }}>
            Student Registration
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
            Create your health center profile to access medical services.
          </Typography>

          {error && <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>}

          {/* This now points correctly to the function defined above */}
          <form onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid size={{ xs: 12, md: 6 }}>
                <TextField fullWidth label="Full Name" name="fullName" variant="outlined" onChange={handleChange} required />
              </Grid>

              <Grid size={{ xs: 12, md: 6 }}>
                <TextField fullWidth label="Matric Number" name="matricNumber" variant="outlined" onChange={handleChange} required />
              </Grid>

              <Grid size={{ xs: 12, md: 6 }}>
                <TextField fullWidth select label="Department" name="department" value={formData.department} onChange={handleChange} required>
                  <MenuItem value="Engineering">Engineering</MenuItem>
                  <MenuItem value="Medicine">Medicine</MenuItem>
                  <MenuItem value="Science">Science</MenuItem>
                  <MenuItem value="Arts">Arts</MenuItem>
                </TextField>
              </Grid>

              <Grid size={{ xs: 12, md: 6 }}>
                <TextField fullWidth type="date" label="Date of Birth" name="dob" InputLabelProps={{ shrink: true }} onChange={handleChange} required />
              </Grid>

              <Grid size={{ xs: 12, md: 6 }}>
                <FormControl>
                  <FormLabel>Gender</FormLabel>
                  <RadioGroup row name="gender" value={formData.gender} onChange={handleChange}>
                    <FormControlLabel value="Male" control={<Radio />} label="Male" />
                    <FormControlLabel value="Female" control={<Radio />} label="Female" />
                  </RadioGroup>
                </FormControl>
              </Grid>

              <Grid size={{ xs: 12, md: 6 }}>
                <TextField fullWidth label="Phone Number" name="phoneNumber" variant="outlined" onChange={handleChange} required />
              </Grid>

              <Grid size={{ xs: 12, md: 6 }}>
                <TextField fullWidth label="Email" name="email" type="email" variant="outlined" onChange={handleChange} required />
              </Grid>

              <Grid size={{ xs: 12, md: 6 }}>
                <TextField fullWidth label="Password" name="password" type="password" variant="outlined" onChange={handleChange} required />
              </Grid>

              <Grid size={12}><Divider /></Grid>

              <Grid size={{ xs: 12, md: 6 }}>
                <TextField fullWidth select label="Blood Group" name="bloodGroup" value={formData.bloodGroup} onChange={handleChange} required>
                  <MenuItem value="A+">A+</MenuItem>
                  <MenuItem value="O+">O+</MenuItem>
                  <MenuItem value="B+">B+</MenuItem>
                  <MenuItem value="AB+">AB+</MenuItem>
                  <MenuItem value="O-">O-</MenuItem>
                </TextField>
              </Grid>

              <Grid size={{ xs: 12, md: 6 }}>
                <TextField fullWidth label="Emergency Contact" name="emergencyContact" variant="outlined" onChange={handleChange} required />
              </Grid>

              <Grid size={12}>
                <TextField fullWidth label="Medical History / Allergies" name="medicalHistory" multiline rows={3} variant="outlined" onChange={handleChange} />
              </Grid>

              <Grid size={12}>
                <Button 
                  type="submit" 
                  variant="contained" 
                  fullWidth 
                  size="large"
                  disabled={loading}
                  sx={{ height: 50, fontWeight: 'bold' }}
                >
                  {loading ? 'Registering...' : 'Register Profile'}
                </Button>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Container>
    </Box>
  );
}