"use client";

import React, { useState } from 'react';

import {
  Box, Typography, TextField, Grid, MenuItem,
  Button, Paper, Container, Alert,
  Avatar, Stack, Step, StepLabel, Stepper, CircularProgress, IconButton, InputAdornment,
  useTheme
} from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
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
    password: '',
    confirmPassword: ''
  });

  const [passportFile, setPassportFile] = useState<File | null>(null);
  const [passportPreview, setPassportPreview] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [activeStep, setActiveStep] = useState(0);

  const steps = ['Bio-Data', 'Medical Info', 'Security'];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const handleClickShowConfirmPassword = () => setShowConfirmPassword((show) => !show);
  const handleMouseDownConfirmPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
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

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      setLoading(false);
      return;
    }

    const { email, password, confirmPassword: _confirmPassword, ...profileData } = formData;

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
    } catch (err) {
      setLoading(false);
      setError(err instanceof Error ? err.message : "Registration failed.");
    }
  };

  const stepVariants = {
    initial: { opacity: 0, y: 15 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -15 },
  };

  return (
    <Box sx={{ bgcolor: 'background.default', minHeight: '100vh', display: 'flex', overflow: 'hidden' }}>
      <Grid container sx={{ flexGrow: 1 }}>
        {/* Left Side: Guidance & Info (Hidden on mobile) */}
        <Grid 
          size={{ xs: 0, md: 5, lg: 4 }} 
          sx={{ 
            display: { xs: 'none', md: 'flex' },
            flexDirection: 'column',
            justifyContent: 'center',
            p: 6,
            bgcolor: '#0f172a',
            color: 'white',
            position: 'relative'
          }}
        >
          <Box sx={{ position: 'relative', zIndex: 2 }}>
            <Typography variant="h3" sx={{ fontWeight: 900, mb: 3, letterSpacing: -1 }}>
              Start Your <span style={{ color: '#2196f3' }}>Digital</span> Health Journey.
            </Typography>
            <Typography variant="body1" sx={{ opacity: 0.8, mb: 6, lineHeight: 1.7 }}>
              Registering for the digital portal is the first step towards faster medical response and organized health records.
            </Typography>
            
            <Stack spacing={4}>
              {[
                { step: '1', title: 'Bio-Data', desc: 'Provide your basic student identification details.' },
                { step: '2', title: 'Medical Info', desc: 'Help us understand your medical background for better care.' },
                { step: '3', title: 'Security', desc: 'Set up your secure credentials for portal access.' }
              ].map((item, i) => (
                <Box key={i} sx={{ display: 'flex', gap: 3 }}>
                  <Box 
                    sx={{ 
                      width: 40, 
                      height: 40, 
                      borderRadius: '50%', 
                      bgcolor: activeStep >= i ? 'primary.main' : 'rgba(255,255,255,0.1)', 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center',
                      fontWeight: 900,
                      flexShrink: 0,
                      transition: '0.3s'
                    }}
                  >
                    {item.step}
                  </Box>
                  <Box>
                    <Typography variant="subtitle1" sx={{ fontWeight: 800 }}>{item.title}</Typography>
                    <Typography variant="caption" sx={{ opacity: 0.6 }}>{item.desc}</Typography>
                  </Box>
                </Box>
              ))}
            </Stack>
          </Box>
          
          {/* Decorative Overlay */}
          <Box 
            sx={{ 
              position: 'absolute',
              bottom: -50,
              right: -50,
              width: 300,
              height: 300,
              bgcolor: 'primary.main',
              filter: 'blur(100px)',
              opacity: 0.1,
              zIndex: 1
            }}
          />
        </Grid>

        {/* Right Side: Registration Form */}
        <Grid 
          size={{ xs: 12, md: 7, lg: 8 }}
          sx={{ 
            display: 'flex', 
            flexDirection: 'column',
            p: { xs: 2, sm: 4, md: 8 },
            bgcolor: 'background.default',
            overflowY: 'auto'
          }}
        >
          <Container maxWidth="md" sx={{ my: 'auto' }}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Paper 
                elevation={0} 
                sx={{ 
                  p: { xs: 3, md: 6 }, 
                  borderRadius: 6, 
                  border: '1px solid', 
                  borderColor: 'divider', 
                  bgcolor: 'background.paper',
                  boxShadow: theme.palette.mode === 'dark' ? '0 25px 50px -12px rgba(0,0,0,0.5)' : '0 10px 30px rgba(0,0,0,0.05)'
                }}
              >
                <Box sx={{ mb: 6 }}>
                  <Typography variant="h4" sx={{ fontWeight: 900, letterSpacing: -1 }}>Create Account</Typography>
                  <Typography variant="body2" color="text.secondary">Step {activeStep + 1} of 3</Typography>
                  <Stepper activeStep={activeStep} sx={{ mt: 4, '& .MuiStepIcon-root.Mui-active': { color: 'primary.main' } }}>
                    {steps.map((label) => (
                      <Step key={label}>
                        <StepLabel />
                      </Step>
                    ))}
                  </Stepper>
                </Box>

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
                            <Box sx={{ position: 'relative' }}>
                                <Avatar 
                                    src={passportPreview || ""} 
                                    sx={{ 
                                        width: 140, 
                                        height: 140, 
                                        border: '4px solid', 
                                        borderColor: 'background.paper',
                                        boxShadow: '0 8px 24px rgba(0,0,0,0.1)'
                                    }} 
                                />
                                <IconButton 
                                    component="label"
                                    sx={{ 
                                        position: 'absolute', 
                                        bottom: 5, 
                                        right: 5, 
                                        bgcolor: 'primary.main', 
                                        color: 'white',
                                        '&:hover': { bgcolor: 'primary.dark' }
                                    }}
                                >
                                    <PhotoCamera sx={{ fontSize: 20 }} />
                                    <input hidden accept="image/*" type="file" onChange={handleFileChange} />
                                </IconButton>
                            </Box>
                            <Typography variant="caption" sx={{ mt: 2, fontWeight: 700, opacity: 0.7 }}>Upload Passport Photo</Typography>
                          </Grid>
                          <Grid size={{ xs: 12, md: 6 }}><TextField fullWidth label="Full Name" name="fullName" value={formData.fullName} onChange={handleChange} required sx={{ '& .MuiOutlinedInput-root': { borderRadius: 3 } }} /></Grid>
                          <Grid size={{ xs: 12, md: 6 }}><TextField fullWidth label="Matric Number" name="matricNumber" value={formData.matricNumber} onChange={handleChange} required sx={{ '& .MuiOutlinedInput-root': { borderRadius: 3 } }} /></Grid>
                          <Grid size={{ xs: 12, md: 6 }}>
                            <TextField fullWidth select label="Faculty" name="faculty" value={formData.faculty} onChange={handleChange} required sx={{ '& .MuiOutlinedInput-root': { borderRadius: 3 } }}>
                              {['Technology', 'College of Health Sciences', 'Basic Medical Sciences', 'Clinical Sciences', 'Dentistry', 'Science', 'Arts', 'Education', 'Law', 'Environmental Development Management', 'Agriculture', 'Pharmacy', 'Administration', 'Social Sciences'].map(o => <MenuItem key={o} value={o}>{o}</MenuItem>)}
                            </TextField>
                          </Grid>
                          <Grid size={{ xs: 12, md: 6 }}>
                            <TextField fullWidth select label="Level" name="level" value={formData.level} onChange={handleChange} required sx={{ '& .MuiOutlinedInput-root': { borderRadius: 3 } }}>
                              {['100L', '200L', '300L', '400L', '500L'].map(o => <MenuItem key={o} value={o}>{o}</MenuItem>)}
                            </TextField>
                          </Grid>
                        </Grid>
                      )}

                      {activeStep === 1 && (
                        <Grid container spacing={3}>
                          <Grid size={{ xs: 12, md: 6 }}><TextField fullWidth type="date" label="DOB" name="dob" InputLabelProps={{ shrink: true }} value={formData.dob} onChange={handleChange} sx={{ '& .MuiOutlinedInput-root': { borderRadius: 3 } }} /></Grid>
                          <Grid size={{ xs: 12, md: 6 }}><TextField fullWidth select label="Blood Group" name="bloodGroup" value={formData.bloodGroup} onChange={handleChange} required sx={{ '& .MuiOutlinedInput-root': { borderRadius: 3 } }}>{['A+', 'O+', 'B+', 'AB+'].map(o => <MenuItem key={o} value={o}>{o}</MenuItem>)}</TextField></Grid>
                          <Grid size={12}><TextField fullWidth label="Emergency Contact (Name & Phone)" name="emergencyContact" value={formData.emergencyContact} onChange={handleChange} required sx={{ '& .MuiOutlinedInput-root': { borderRadius: 3 } }} /></Grid>
                          <Grid size={12}><TextField fullWidth label="Medical History / Allergies" name="medicalHistory" value={formData.medicalHistory} multiline rows={4} onChange={handleChange} sx={{ '& .MuiOutlinedInput-root': { borderRadius: 3 } }} /></Grid>
                        </Grid>
                      )}

                      {activeStep === 2 && (
                        <Grid container spacing={3}>
                          <Grid size={{ xs: 12, md: 6 }}><TextField fullWidth label="Email Address" name="email" type="email" value={formData.email} onChange={handleChange} required sx={{ '& .MuiOutlinedInput-root': { borderRadius: 3 } }} /></Grid>
                          <Grid size={{ xs: 12, md: 6 }}><TextField fullWidth label="Phone Number" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} required sx={{ '& .MuiOutlinedInput-root': { borderRadius: 3 } }} /></Grid>
                          <Grid size={{ xs: 12, md: 6 }}>
                            <TextField
                              fullWidth
                              label="Password"
                              name="password"
                              type={showPassword ? 'text' : 'password'}
                              value={formData.password}
                              onChange={handleChange}
                              required
                              sx={{ '& .MuiOutlinedInput-root': { borderRadius: 3 } }}
                              InputProps={{
                                endAdornment: (
                                  <InputAdornment position="end">
                                    <IconButton onClick={handleClickShowPassword} onMouseDown={handleMouseDownPassword} edge="end">
                                      {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                  </InputAdornment>
                                ),
                              }}
                            />
                          </Grid>
                          <Grid size={{ xs: 12, md: 6 }}>
                            <TextField
                              fullWidth
                              label="Confirm Password"
                              name="confirmPassword"
                              type={showConfirmPassword ? 'text' : 'password'}
                              value={formData.confirmPassword}
                              onChange={handleChange}
                              required
                              sx={{ '& .MuiOutlinedInput-root': { borderRadius: 3 } }}
                              InputProps={{
                                endAdornment: (
                                  <InputAdornment position="end">
                                    <IconButton onClick={handleClickShowConfirmPassword} onMouseDown={handleMouseDownConfirmPassword} edge="end">
                                      {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                  </InputAdornment>
                                ),
                              }}
                            />
                          </Grid>
                        </Grid>
                      )}
                    </motion.div>
                  </AnimatePresence>

                  <Stack direction="row" spacing={2} sx={{ mt: 8 }}>
                    {activeStep > 0 && (
                      <Button variant="outlined" onClick={handleBack} startIcon={<ArrowBackIcon />} sx={{ flex: 1, height: 56, borderRadius: 3, fontWeight: 700 }}>
                        Back
                      </Button>
                    )}
                    <Button type="submit" variant="contained" fullWidth disabled={loading} sx={{ flex: 2, height: 56, borderRadius: 3, fontWeight: 900, boxShadow: '0 8px 24px rgba(25, 118, 210, 0.3)' }}>
                      {loading ? <CircularProgress size={24} color="inherit" /> : (activeStep === 2 ? 'Complete Registration' : 'Continue')}
                    </Button>
                  </Stack>
                </form>
              </Paper>
              <Typography align="center" variant="body2" sx={{ mt: 4, color: 'text.secondary' }}>
                Already have an account?{' '}
                <Button component={Link} href="/loginpage" sx={{ fontWeight: 800, textTransform: 'none' }}>Login instead</Button>
              </Typography>
            </motion.div>
          </Container>
        </Grid>
      </Grid>
    </Box>
  );
}