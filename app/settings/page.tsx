"use client";

import React, { useState, useEffect } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import {
  Box,
  Typography,
  Paper,
  Grid,
  TextField,
  Button,
  Alert,
  Divider,
  Stack,
  Card,
  CardContent,
  Avatar,
  Fade,
  useTheme
} from "@mui/material";
import { useAuth } from "@/firebase/authcontext";
import { setDoc, doc } from "firebase/firestore";
import { db } from "@/firebase/firebasefile";
import ShieldIcon from '@mui/icons-material/Shield';
import EditIcon from '@mui/icons-material/Edit';

export default function SettingsPage() {
  const { user, profile } = useAuth();
  const theme = useTheme();
  const [formData, setFormData] = useState({
    phoneNumber: "",
    emergencyContact: "",
    medicalHistory: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  useEffect(() => {
    if (profile) {
      setFormData({
        phoneNumber: profile.phoneNumber || "",
        emergencyContact: profile.emergencyContact || "",
        medicalHistory: profile.medicalHistory || "",
      });
    }
  }, [profile]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    setLoading(true);
    setMessage(null);
    try {
      await setDoc(doc(db, "students", user.uid), {
        phoneNumber: formData.phoneNumber,
        emergencyContact: formData.emergencyContact,
        medicalHistory: formData.medicalHistory,
      }, { merge: true });
      setMessage({ type: "success", text: "Profile records updated successfully!" });
    } catch (error) {
      console.error("Update error:", error);
      setMessage({ type: "error", text: "Failed to update profile settings." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout>
      <Box sx={{ maxWidth: '1000px', mx: 'auto' }}>
        <Box sx={{ mb: 6 }}>
          <Typography variant="h4" sx={{ fontWeight: 800, mb: 1, letterSpacing: -1, color: 'text.primary' }}>
            Settings & Profile
          </Typography>
          <Typography color="text.secondary">
            Manage your personal contact details and medical history.
          </Typography>
        </Box>

        <Grid container spacing={4}>
          <Grid size={{ xs: 12, lg: 8 }}>
            <Paper elevation={0} sx={{ p: { xs: 3, md: 5 }, borderRadius: 5, border: '1px solid', borderColor: 'divider', bgcolor: 'background.paper' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 4 }}>
                <Avatar sx={{ bgcolor: 'action.selected', color: 'primary.main' }}><EditIcon /></Avatar>
                <Box>
                  <Typography variant="h6" sx={{ fontWeight: 800, color: 'text.primary' }}>Account Information</Typography>
                </Box>
              </Box>

              {message && <Alert severity={message.type} sx={{ mb: 4, borderRadius: 3 }}>{message.text}</Alert>}

              <form onSubmit={handleUpdate}>
                <Grid container spacing={3}>
                  <Grid size={{ xs: 12, md: 6 }}>
                    <TextField fullWidth label="Phone Number" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} required />
                  </Grid>
                  <Grid size={{ xs: 12, md: 6 }}>
                    <TextField fullWidth label="Emergency Contact" name="emergencyContact" value={formData.emergencyContact} onChange={handleChange} required />
                  </Grid>
                  <Grid size={12}>
                    <TextField fullWidth multiline rows={5} label="Medical History" name="medicalHistory" value={formData.medicalHistory} onChange={handleChange} />
                  </Grid>
                  <Grid size={12}>
                    <Button type="submit" variant="contained" size="large" disabled={loading} sx={{ height: 56, borderRadius: 3, fontWeight: 800, width: '100%' }}>
                      {loading ? "Saving..." : "Update Records"}
                    </Button>
                  </Grid>
                </Grid>
              </form>
            </Paper>
          </Grid>
          <Grid size={{ xs: 12, lg: 4 }}>
            <Stack spacing={3}>
              <Card elevation={0} sx={{ borderRadius: 5, border: '1px solid', borderColor: 'divider', bgcolor: 'action.hover' }}>
                <CardContent sx={{ p: 4 }}>
                  <ShieldIcon color="primary" fontSize="large" sx={{ mb: 2 }} />
                  <Typography variant="h6" sx={{ fontWeight: 800, color: 'text.primary' }}>Security</Typography>
                  <Typography variant="body2" color="text.secondary">Records are encrypted.</Typography>
                </CardContent>
              </Card>
            </Stack>
          </Grid>
        </Grid>
      </Box>
    </DashboardLayout>
  );
}
