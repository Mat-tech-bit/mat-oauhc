"use client";
import React from 'react';
import { 
  Container, Typography, Box, Button, CircularProgress, 
  Paper, AppBar, Toolbar, Avatar, Grid as Grid 
} from '@mui/material';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/firebase/authcontext';
import { logoutUser } from '../library/auth';

export default function Dashboard() {
  const { user, profile, loading } = useAuth();
  const router = useRouter();

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }
  
  if (!user) {
    router.push('/loginPage');
    return null;
  }

  const handleLogout = async () => {
    await logoutUser();
    router.push('/loginPage');
  };

  return (
    <Box sx={{ bgcolor: '#f5f5f5', minHeight: '100vh' }}>
      <AppBar position="static" elevation={0} sx={{ bgcolor: 'white', color: 'black', borderBottom: '1px solid #e0e0e0' }}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 700 }}>
            OAU Health Portal
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Typography variant="body2" color="text.secondary">
              {user.email || ""}
            </Typography>
            <Button 
             variant="outlined" 
              color="error" 
              size="small" 
              onClick={handleLogout}
            >
              Logout
            </Button>
          </Box>
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Grid container spacing={3}>
          <Grid size={12}>
            <Paper sx={{ p: 4, borderRadius: 3 }}>
              <Typography variant="h4" gutterBottom>
                Welcome, {profile?.fullName || "Student"}
              </Typography>
              <Typography color="text.secondary">
                Department: {profile?.department || "Not Set"}
              </Typography>
            </Paper>
          </Grid>

          <Grid size={{ xs: 12, md: 8 }}>
            <Paper sx={{ p: 3, borderRadius: 3 }}>
              <Typography variant="h6" gutterBottom color="primary">
                Student Details
              </Typography>
              <Typography sx={{ mb: 1 }}>
                <strong>Matric No:</strong> {profile?.matricNumber || "N/A"}
              </Typography>
              <Typography sx={{ mb: 1 }}>
                <strong>Phone:</strong> {profile?.phoneNumber || "N/A"}
              </Typography>
              <Typography>
                <strong>Gender:</strong> {profile?.gender || "N/A"}
              </Typography>
            </Paper>
          </Grid>

          <Grid size={{ xs: 12, md: 4 }}>
            <Paper sx={{ p: 3, borderRadius: 3, borderLeft: '5px solid #d32f2f' }}>
              <Typography variant="h6" gutterBottom color="error">
                Medical Records
              </Typography>
              <Typography sx={{ mb: 1 }}>
                <strong>Blood Group:</strong> {profile?.bloodGroup || "Unknown"}
              </Typography>
              <Typography>
                <strong>Emergency:</strong> {profile?.emergencyContact || "None"}
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}