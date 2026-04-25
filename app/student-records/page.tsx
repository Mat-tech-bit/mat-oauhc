"use client";

import React from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { useAuth } from "@/firebase/authcontext";
import {
  Box,
  Typography,
  Paper,
  Grid,
  Avatar,
  Stack,
  useTheme
} from "@mui/material";
import FolderSharedIcon from "@mui/icons-material/FolderShared";
import PersonIcon from "@mui/icons-material/Person";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";

export default function StudentRecordsPage() {
  const { profile } = useAuth();
  const theme = useTheme();

  return (
    <DashboardLayout>
      <Box sx={{ pb: 5 }}>
        <Box sx={{ mb: 6 }}>
          <Typography variant="h4" sx={{ fontWeight: 800, mb: 1, letterSpacing: -1, color: 'text.primary' }}>
            Official Medical Dossier
          </Typography>
          <Typography color="text.secondary">
            Your university-verified health records and biological data.
          </Typography>
        </Box>

        <Grid container spacing={4}>
          <Grid size={{ xs: 12, md: 7 }}>
            <Paper elevation={0} sx={{ p: { xs: 4, md: 5 }, borderRadius: 6, border: '1px solid', borderColor: 'divider', bgcolor: 'background.paper' }}>
                <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 4 }}>
                    <Avatar sx={{ bgcolor: 'primary.main', color: 'primary.contrastText', borderRadius: 2 }}><PersonIcon /></Avatar>
                    <Typography variant="h6" sx={{ fontWeight: 800, color: 'text.primary' }}>Student Bio-Data</Typography>
                </Stack>
                <Grid container spacing={4}>
                    {[
                        { label: "Full Name", val: profile?.fullName },
                        { label: "Matriculation Number", val: profile?.matricNumber },
                        { label: "Faculty", val: profile?.faculty },
                        { label: "Level", val: profile?.level },
                        { label: "Email", val: profile?.email },
                        { label: "Phone", val: profile?.phoneNumber },
                        { label: "Gender", val: profile?.gender },
                        { label: "Date of Birth", val: profile?.dob },
                    ].map((item, i) => (
                        <Grid size={{ xs: 12, sm: 6 }} key={i}>
                            <Typography variant="caption" sx={{ fontWeight: 800, color: 'text.secondary' }}>{item.label}</Typography>
                            <Typography variant="body1" sx={{ fontWeight: 600, mt: 0.5, color: 'text.primary' }}>{item.val || "N/A"}</Typography>
                        </Grid>
                    ))}
                </Grid>
            </Paper>
          </Grid>

          <Grid size={{ xs: 12, md: 5 }}>
            <Stack spacing={4}>
                <Paper elevation={0} sx={{ 
                    p: 4, 
                    borderRadius: 6, 
                    bgcolor: theme.palette.mode === 'dark' ? 'rgba(239, 68, 68, 0.1)' : '#fef2f2', 
                    border: '1px solid', 
                    borderColor: theme.palette.mode === 'dark' ? 'rgba(239, 68, 68, 0.2)' : '#fee2e2' 
                }}>
                    <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 4 }}>
                        <Avatar sx={{ bgcolor: 'error.main', color: 'error.contrastText', borderRadius: 2 }}><LocalHospitalIcon /></Avatar>
                        <Typography variant="h6" sx={{ fontWeight: 800, color: 'error.main' }}>Critical Health Info</Typography>
                    </Stack>
                    <Stack spacing={3}>
                        <Box>
                            <Typography variant="caption" sx={{ fontWeight: 800, color: 'error.main' }}>Blood Group</Typography>
                            <Typography variant="h5" sx={{ fontWeight: 900, color: 'text.primary' }}>{profile?.bloodGroup || "PENDING"}</Typography>
                        </Box>
                        <Box>
                            <Typography variant="caption" sx={{ fontWeight: 800, color: 'error.main' }}>Medical History</Typography>
                            <Box sx={{ mt: 1, p: 2, bgcolor: 'background.paper', borderRadius: 2.5, border: '1px solid', borderColor: 'divider' }}>
                                <Typography variant="body2" sx={{ fontStyle: 'italic', color: 'text.primary' }}>{profile?.medicalHistory || "None declared."}</Typography>
                            </Box>
                        </Box>
                    </Stack>
                </Paper>
                <Box sx={{ p: 4, textAlign: 'center', borderRadius: 6, border: '2px dashed', borderColor: 'divider' }}>
                    <FolderSharedIcon sx={{ color: 'text.disabled', fontSize: 40, mb: 1 }} />
                    <Typography variant="body2" color="text.secondary">Verified by University Medical Board.</Typography>
                </Box>
            </Stack>
          </Grid>
        </Grid>
      </Box>
    </DashboardLayout>
  );
}
