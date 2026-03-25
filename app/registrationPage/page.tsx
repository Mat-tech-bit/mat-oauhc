"use client";

import React, { useState } from 'react';
import { 
  Box, Typography, TextField, Grid, MenuItem, 
  FormControl, FormLabel, RadioGroup, FormControlLabel, 
  Radio, Button, Paper, Divider
} from '@mui/material';

import { useRouter } from 'next/navigation';
import { registerUser } from '../library/auth';

export default function RegistrationForm() {
  const router = useRouter();

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
    email: '',       // Add email for login
    password: ''     // Add password for login
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { email, password, ...profileData } = formData;
    const res = await registerUser(email, password, profileData);
    setLoading(false);

    if (res.success) {
      alert('Registration successful! Please login.');
      router.push('/loginPage');  // Redirect to login page
    } else {
      alert('Error: ' + res.error);
    }
  };

  return (
    <Box sx={{ bgcolor: '#f5f5f5', minHeight: '100vh', py: 4, px: 2 }}>
      <Paper elevation={0} sx={{ maxWidth: 800, mx: 'auto', p: { xs: 3, md: 5 }, borderRadius: 2, border: '1px solid #e0e0e0' }}>
        <Typography variant="h5" sx={{ fontWeight: 700, mb: 0.5 }}>
          Student Registration
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
          Create your health center profile to access medical services.
        </Typography>

        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            {/* Full Name */}
            <Grid size={{xs: 12, md: 6, sm: 4}}>
              <TextField fullWidth label="Full Name" name="fullName" variant="outlined" onChange={handleChange} required />
            </Grid>

            {/* Matric Number */}
            <Grid size={{xs: 12, md: 6, sm: 4}}>
              <TextField fullWidth label="Matric Number" name="matricNumber" variant="outlined" onChange={handleChange} required />
            </Grid>

            {/* Department */}
            <Grid size={{xs: 12, md: 6, sm: 4}}>
              <TextField fullWidth select label="Department" name="department" value={formData.department} onChange={handleChange} required>
                <MenuItem value="Computer Science">Computer Science</MenuItem>
                <MenuItem value="Medicine">Medicine</MenuItem>
                <MenuItem value="Engineering">Engineering</MenuItem>
              </TextField>
            </Grid>

            {/* Date of Birth */}
            <Grid size={{xs: 12, md: 6, sm: 4}}>
              <TextField fullWidth type="date" label="Date of Birth" name="dob" InputLabelProps={{ shrink: true }} onChange={handleChange} required />
            </Grid>

            {/* Gender */}
            <Grid size={{xs: 12, md: 6, sm: 4}}>
              <FormControl>
                <FormLabel>Gender</FormLabel>
                <RadioGroup row name="gender" value={formData.gender} onChange={handleChange}>
                  <FormControlLabel value="Male" control={<Radio />} label="Male" />
                  <FormControlLabel value="Female" control={<Radio />} label="Female" />
                </RadioGroup>
              </FormControl>
            </Grid>

            {/* Phone Number */}
            <Grid size={{xs: 12, md: 6, sm: 4}}>
              <TextField fullWidth label="Phone Number" name="phoneNumber" variant="outlined" onChange={handleChange} required />
            </Grid>

            {/* Email */}
            <Grid size={{xs: 12, md: 6, sm: 4}}>
              <TextField fullWidth label="Email" name="email" type="email" variant="outlined" onChange={handleChange} required />
            </Grid>

            {/* Password */}
            <Grid size={{xs: 12, md: 6, sm: 4}}>
              <TextField fullWidth label="Password" name="password" type="password" variant="outlined" onChange={handleChange} required />
            </Grid>

            {/* Divider */}
            <Grid size={{xs: 12, md: 6, sm: 4}}><Divider /></Grid>

            {/* Blood Group */}
            <Grid size={{xs: 12, md: 6, sm: 4}}>
              <TextField fullWidth select label="Blood Group" name="bloodGroup" value={formData.bloodGroup} onChange={handleChange}>
                <MenuItem value="A+">A+</MenuItem>
                <MenuItem value="O+">O+</MenuItem>
                <MenuItem value="B+">B+</MenuItem>
                <MenuItem value="AB+">AB+</MenuItem>
              </TextField>
            </Grid>

            {/* Emergency Contact */}
            <Grid size={{xs: 12, md: 6, sm: 4}}>
              <TextField fullWidth label="Emergency Contact" name="emergencyContact" variant="outlined" onChange={handleChange} />
            </Grid>

            {/* Medical History */}
            <Grid size={{xs: 12, md: 6, sm: 4}}>
              <TextField fullWidth label="Medical History / Allergies" name="medicalHistory" multiline rows={4} variant="outlined" onChange={handleChange} />
            </Grid>

            {/* Submit */}
            <Grid size={{xs: 12, md: 6, sm: 4}}>
              <Button type="submit" variant="contained" fullWidth disabled={loading}>
                {loading ? 'Registering...' : 'Register Profile'}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Box>
  );
}