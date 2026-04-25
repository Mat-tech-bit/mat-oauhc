"use client";

import React, { useState } from 'react';
import {
  Box, Typography, TextField, Grid, MenuItem,
  Button, Paper, Container, Alert,
  Avatar, Stack, Step, StepLabel, Stepper, CircularProgress,
  useTheme
} from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import { useRouter } from 'next/navigation';
import { registerUser } from '../library/auth';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

export default function RegistrationForm() {
  const router = useRouter();
  const theme = useTheme();

  const [formData, setFormData] = useState({
    fullName: '',
    matricNumber: '',
    faculty: '',
    level: '',
    dob: '',
    gender: 'Male',
    phoneNumber: '',
    bloodGroup: '',
    emergencyContact: '',
    medicalHistory: '',
    email: '',
    password: ''
  });

  const [passportFile, setPassportFile] = useState<File | null>(null);
  const [passportPreview, setPassportPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [activeStep, setActiveStep] = useState(0);

  const steps = ['Bio-Data', 'Medical Info', 'Security'];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setPassportFile(file);
      setPassportPreview(URL.createObjectURL(file));
    }
  };

  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (event) => {
        const img = new Image();
        img.src = event.target?.result as string;
        img.onload = () => {
          const canvas = document.createElement("canvas");
          const MAX_WIDTH = 400; const MAX_HEIGHT = 400;
          let width = img.width; let height = img.height;
          if (width > height) { if (width > MAX_WIDTH) { height *= MAX_WIDTH / width; width = MAX_WIDTH; } }
          else { if (height > MAX_HEIGHT) { width *= MAX_HEIGHT / height; height = MAX_HEIGHT; } }
          canvas.width = width; canvas.height = height;
          const ctx = canvas.getContext("2d"); ctx?.drawImage(img, 0, 0, width, height);
          resolve(canvas.toDataURL("image/jpeg", 0.75));
        };
      };
      reader.onerror = (error) => reject(error);
    });
  };

  const handleNext = () => setActiveStep((prev) => prev + 1);
  const handleBack = () => setActiveStep((prev) => prev - 1);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (activeStep < 2) return handleNext();

    setLoading(true);
    setError('');
    const { email, password, ...profileData } = formData;

    if (!passportFile) {
      setError("Passport photo is required.");
      setLoading(false);
      return;
    }

    try {
      const passportBase64 = await fileToBase64(passportFile);
      await registerUser(email, password, profileData, passportBase64);
      setLoading(false);
      router.push('/loginpage');
    } catch (err: any) {
      setLoading(false);
      setError(err.message || "Registration failed.");
    }
  };

  const stepVariants = {
    initial: { opacity: 0, x: 20 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -20 },
  };

  return (
    <Box sx={{ bgcolor: 'background.default', minHeight: '100vh', py: 8, px: 2, overflowX: 'hidden' }}>
      <Container maxWidth="md">
        <motion.div
           initial={{ opacity: 0, scale: 0.95 }}
           animate={{ opacity: 1, scale: 1 }}
           transition={{ duration: 0.5 }}
        >
          <Paper elevation={0} sx={{ p: { xs: 3, md: 6 }, borderRadius: 8, border: '1px solid', borderColor: 'divider', bgcolor: 'background.paper' }}>
            <Stepper activeStep={activeStep} sx={{ mb: 6 }}>
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel>
                    <Typography variant="caption" sx={{ fontWeight: 700, color: 'text.primary' }}>{label}</Typography>
                  </StepLabel>
                </Step>
              ))}
            </Stepper>

            {error && <Alert severity="error" sx={{ mb: 4, borderRadius: 3 }}>{error}</Alert>}

            <form onSubmit={handleSubmit}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeStep}
                  variants={stepVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  transition={{ duration: 0.4 }}
                >
                  {activeStep === 0 && (
                    <Grid container spacing={3}>
                      <Grid size={12} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 4 }}>
                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                          <Avatar src={passportPreview || ""} sx={{ width: 120, height: 120, mb: 2, border: '2px solid', borderColor: 'primary.main' }} />
                        </motion.div>
                        <Button variant="outlined" component="label" startIcon={<PhotoCamera />} sx={{ borderRadius: 2 }}>
                          Upload Passport
                          <input hidden accept="image/*" type="file" onChange={handleFileChange} />
                        </Button>
                      </Grid>
                      <Grid size={{ xs: 12, md: 6 }}><TextField fullWidth label="Full Name" name="fullName" value={formData.fullName} onChange={handleChange} required /></Grid>
                      <Grid size={{ xs: 12, md: 6 }}><TextField fullWidth label="Matric Number" name="matricNumber" value={formData.matricNumber} onChange={handleChange} required /></Grid>
                      <Grid size={{ xs: 12, md: 6 }}>
                        <TextField fullWidth select label="Faculty" name="faculty" value={formData.faculty} onChange={handleChange} required>
                          {['Technology', 'College of Health Sciences', 'Basic Medical Sciences', 'Clinical Sciences', 'Dentistry', 'Science', 'Arts', 'Education', 'Law', 'Environmental Development Management', 'Agriculture', 'Pharmacy', 'Administration', 'Social Sciences'].map(o => <MenuItem key={o} value={o}>{o}</MenuItem>)}
                        </TextField>
                      </Grid>
                      <Grid size={{ xs: 12, md: 6 }}>
                        <TextField fullWidth select label="Level" name="level" value={formData.level} onChange={handleChange} required>
                          {['100L', '200L', '300L', '400L', '500L'].map(o => <MenuItem key={o} value={o}>{o}</MenuItem>)}
                        </TextField>
                      </Grid>
                    </Grid>
                  )}

                  {activeStep === 1 && (
                    <Grid container spacing={3}>
                      <Grid size={{ xs: 12, md: 6 }}><TextField fullWidth type="date" label="DOB" name="dob" InputLabelProps={{ shrink: true }} value={formData.dob} onChange={handleChange} /></Grid>
                      <Grid size={{ xs: 12, md: 6 }}><TextField fullWidth select label="Blood Group" name="bloodGroup" value={formData.bloodGroup} onChange={handleChange} required>{['A+', 'O+', 'B+', 'AB+'].map(o => <MenuItem key={o} value={o}>{o}</MenuItem>)}</TextField></Grid>
                      <Grid size={12}><TextField fullWidth label="Emergency Contact" name="emergencyContact" value={formData.emergencyContact} onChange={handleChange} required /></Grid>
                      <Grid size={12}><TextField fullWidth label="Medical History" name="medicalHistory" value={formData.medicalHistory} multiline rows={3} onChange={handleChange} /></Grid>
                    </Grid>
                  )}

                  {activeStep === 2 && (
                    <Grid container spacing={3}>
                      <Grid size={{ xs: 12, md: 6 }}><TextField fullWidth label="Email" name="email" type="email" value={formData.email} onChange={handleChange} required /></Grid>
                      <Grid size={{ xs: 12, md: 6 }}><TextField fullWidth label="Phone" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} required /></Grid>
                      <Grid size={12}><TextField fullWidth label="Password" name="password" type="password" value={formData.password} onChange={handleChange} required /></Grid>
                    </Grid>
                  )}
                </motion.div>
              </AnimatePresence>

              <Stack direction="row" spacing={2} sx={{ mt: 6 }}>
                {activeStep > 0 && (
                  <Button variant="outlined" onClick={handleBack} startIcon={<ArrowBackIcon />} sx={{ flex: 1, height: 56, borderRadius: 3, fontWeight: 700, transition: '0.3s', '&:hover': { transform: 'translateX(-5px)' } }}>
                    Back
                  </Button>
                )}
                <Button type="submit" variant="contained" fullWidth disabled={loading} sx={{ flex: 2, height: 56, borderRadius: 3, fontWeight: 900, transition: '0.3s', '&:hover': { transform: 'scale(1.02)', boxShadow: '0 8px 16px rgba(25, 118, 210, 0.3)' } }}>
                  {loading ? <CircularProgress size={24} color="inherit" /> : (activeStep === 2 ? 'Register' : 'Continue')}
                </Button>
              </Stack>
            </form>
          </Paper>
        </motion.div>
      </Container>
    </Box>
  );
}