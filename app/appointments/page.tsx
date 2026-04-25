"use client";

import React, { useState, useEffect } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import {
  Box,
  Typography,
  Paper,
  Button,
  Grid,
  TextField,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  Alert,
  CircularProgress,
  Avatar,
  Stack,
  Fade,
  useTheme
} from "@mui/material";
import { addDoc, collection, query, where, getDocs } from "firebase/firestore";
import { db } from "@/firebase/firebasefile";
import { useAuth } from "@/firebase/authcontext";
import EventAvailableIcon from '@mui/icons-material/EventAvailable';

interface Appointment {
  id: string;
  date: string;
  time: string;
  reason: string;
  status: "Pending" | "Confirmed" | "Completed" | "Cancelled";
  createdAt: Date;
}

export default function AppointmentsPage() {
  const { user } = useAuth();
  const theme = useTheme();
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const [formData, setFormData] = useState({
    date: "",
    time: "",
    reason: "",
  });

  const fetchAppointments = async () => {
    if (!user) return;
    try {
      const q = query(
        collection(db, "appointments"),
        where("studentId", "==", user.uid)
      );
      const querySnapshot = await getDocs(q);
      const apps = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate() || new Date()
      })) as Appointment[];
      
      apps.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
      setAppointments(apps);
    } catch (error) {
      console.error("Error fetching appointments:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      fetchAppointments();
    }
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleBook = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    setSubmitting(true);
    setMessage(null);
    try {
      await addDoc(collection(db, "appointments"), {
        studentId: user.uid,
        date: formData.date,
        time: formData.time,
        reason: formData.reason,
        status: "Pending",
        createdAt: new Date(),
      });
      setMessage({ type: "success", text: "Appointment request sent successfully!" });
      setFormData({ date: "", time: "", reason: "" });
      fetchAppointments();
    } catch (error) {
      setMessage({ type: "error", text: "Failed to book appointment. Please try again." });
    } finally {
      setSubmitting(false);
    }
  };

  const getStatusColor = (status: string) => {
    const isDark = theme.palette.mode === 'dark';
    switch (status) {
      case "Pending": return { bg: isDark ? 'rgba(251, 146, 60, 0.2)' : '#fff7ed', text: isDark ? '#fb923c' : '#c2410c' };
      case "Confirmed": return { bg: isDark ? 'rgba(56, 189, 248, 0.2)' : '#f0f9ff', text: isDark ? '#38bdf8' : '#0369a1' };
      case "Completed": return { bg: isDark ? 'rgba(74, 222, 128, 0.2)' : '#f0fdf4', text: isDark ? '#4ade80' : '#15803d' };
      case "Cancelled": return { bg: isDark ? 'rgba(248, 113, 113, 0.2)' : '#fef2f2', text: isDark ? '#f87171' : '#b91c1c' };
      default: return { bg: 'action.selected', text: 'text.primary' };
    }
  };

  return (
    <DashboardLayout>
      <Box sx={{ pb: 5 }}>
        <Box sx={{ mb: 6 }}>
          <Typography variant="h4" sx={{ fontWeight: 800, mb: 1, letterSpacing: -1, color: 'text.primary' }}>
            Appointments
          </Typography>
          <Typography color="text.secondary">
            Schedule and manage your visits to the OAU Health Center.
          </Typography>
        </Box>

        <Grid container spacing={4}>
          <Grid size={{ xs: 12, lg: 5 }}>
            <Paper elevation={0} sx={{ p: { xs: 3, md: 5 }, borderRadius: 5, border: '1px solid', borderColor: 'divider', bgcolor: 'background.paper' }}>
              <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 4 }}>
                <Avatar sx={{ bgcolor: 'primary.main', color: 'primary.contrastText', borderRadius: 2 }}>
                  <EventAvailableIcon />
                </Avatar>
                <Box>
                  <Typography variant="h6" sx={{ fontWeight: 800, color: 'text.primary' }}>Schedule Visit</Typography>
                  <Typography variant="body2" color="text.secondary">Select your preferred slot.</Typography>
                </Box>
              </Stack>
              {message && <Alert severity={message.type} sx={{ mb: 3, borderRadius: 3 }}>{message.text}</Alert>}
              <form onSubmit={handleBook}>
                <Stack spacing={3}>
                  <TextField fullWidth type="date" label="Date" name="date" value={formData.date} onChange={handleChange} InputLabelProps={{ shrink: true }} required />
                  <TextField fullWidth type="time" label="Time" name="time" value={formData.time} onChange={handleChange} InputLabelProps={{ shrink: true }} required />
                  <TextField fullWidth select label="Reason" name="reason" value={formData.reason} onChange={handleChange} required>
                    <MenuItem value="General Checkup">General Checkup</MenuItem>
                    <MenuItem value="Fever/Malaria">Fever/Malaria</MenuItem>
                    <MenuItem value="Physical Injury">Physical Injury</MenuItem>
                    <MenuItem value="Consultation">Consultation</MenuItem>
                    <MenuItem value="Emergency">Emergency Assist</MenuItem>
                  </TextField>
                  <Button type="submit" variant="contained" fullWidth size="large" disabled={submitting} sx={{ mt: 2, height: 56, borderRadius: 3, fontWeight: 800 }}>
                    {submitting ? <CircularProgress size={24} color="inherit" /> : "Request Appointment"}
                  </Button>
                </Stack>
              </form>
            </Paper>
          </Grid>
          <Grid size={{ xs: 12, lg: 7 }}>
            <Paper elevation={0} sx={{ borderRadius: 5, border: '1px solid', borderColor: 'divider', bgcolor: 'background.paper', overflow: 'hidden' }}>
              <Box sx={{ p: 4, borderBottom: '1px solid', borderColor: 'divider', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Typography variant="h6" sx={{ fontWeight: 800, color: 'text.primary' }}>Visit History</Typography>
              </Box>
              <TableContainer>
                <Table>
                  <TableBody>
                    {appointments.length > 0 ? (
                      appointments.map((app) => (
                        <TableRow key={app.id}>
                          <TableCell sx={{ color: 'text.primary' }}>{app.date} | {app.time}</TableCell>
                          <TableCell sx={{ color: 'text.primary' }}>{app.reason}</TableCell>
                          <TableCell align="right">
                             <Chip label={app.status} size="small" sx={{ fontWeight: 800, bgcolor: getStatusColor(app.status).bg, color: getStatusColor(app.status).text, border: 'none' }} />
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow><TableCell align="center" sx={{ py: 5, color: 'text.secondary' }}>No history</TableCell></TableRow>
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </DashboardLayout>
  );
}
