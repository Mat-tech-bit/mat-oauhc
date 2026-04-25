"use client";

import React, { useState, useEffect } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import {
  Box,
  Typography,
  Paper,
  Grid,
  CircularProgress,
  Card,
  CardContent,
  Chip,
  Divider,
  Avatar,
  Stack,
  useTheme
} from "@mui/material";
import MedicationIcon from "@mui/icons-material/Medication";
import AssignmentIcon from "@mui/icons-material/Assignment";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "@/firebase/firebasefile";
import { useAuth } from "@/firebase/authcontext";

interface Prescription {
  id: string;
  medicationName: string;
  dosage: string;
  instructions: string;
  doctorNotes: string;
  prescriptionDate: string;
  createdAt: Date;
}

export default function PrescriptionsPage() {
  const { user } = useAuth();
  const theme = useTheme();
  const [prescriptions, setPrescriptions] = useState<Prescription[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchPrescriptions = async () => {
    if (!user) return;
    try {
      const q = query(
        collection(db, "prescriptions"),
        where("studentId", "==", user.uid)
      );
      const querySnapshot = await getDocs(q);
      const results = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate() || new Date()
      })) as Prescription[];

      results.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
      setPrescriptions(results);
    } catch (error) {
      console.error("Error fetching prescriptions:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      fetchPrescriptions();
    }
  }, [user]);

  return (
    <DashboardLayout>
      <Box sx={{ pb: 5 }}>
        <Box sx={{ mb: 6 }}>
          <Typography variant="h4" sx={{ fontWeight: 800, mb: 1, letterSpacing: -1, color: 'text.primary' }}>
            Prescriptions
          </Typography>
          <Typography color="text.secondary">
            Digital medication records issued by university physicians.
          </Typography>
        </Box>

        {loading ? (
            <Box sx={{ display: "flex", justifyContent: "center", pt: 10 }}><CircularProgress /></Box>
        ) : prescriptions.length > 0 ? (
            <Grid container spacing={3}>
                {prescriptions.map((px) => (
                    <Grid size={{ xs: 12, md: 6 }} key={px.id}>
                        <Card elevation={0} sx={{ borderRadius: 5, border: '1px solid', borderColor: 'divider', bgcolor: 'background.paper' }}>
                            <CardContent sx={{ p: 4 }}>
                                <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 3 }}>
                                    <Avatar sx={{ bgcolor: theme.palette.mode === 'dark' ? 'rgba(0, 150, 136, 0.2)' : '#e0f2f1', color: theme.palette.mode === 'dark' ? '#4db6ac' : '#00796b', borderRadius: 2 }}><MedicationIcon /></Avatar>
                                    <Box>
                                        <Typography variant="h6" sx={{ fontWeight: 800, color: 'text.primary' }}>{px.medicationName}</Typography>
                                        <Typography variant="caption" sx={{ fontWeight: 700, bgcolor: 'action.selected', color: 'text.primary', px: 1, py: 0.5, borderRadius: 1 }}>{px.dosage}</Typography>
                                    </Box>
                                </Stack>
                                <Divider sx={{ mb: 3 }} />
                                <Typography variant="subtitle2" sx={{ fontWeight: 800, mb: 1, color: 'text.secondary' }}>INSTRUCTIONS</Typography>
                                <Typography variant="body2" sx={{ mb: 3, lineHeight: 1.6, color: 'text.primary' }}>{px.instructions}</Typography>
                                <Box sx={{ p: 2, bgcolor: 'action.hover', borderRadius: 3 }}>
                                    <Typography variant="caption" sx={{ fontWeight: 800, color: 'text.secondary' }}>Doctor's Remarks</Typography>
                                    <Typography variant="body2" sx={{ mt: 1, color: 'text.primary' }}>"{px.doctorNotes || "Default note."}"</Typography>
                                </Box>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        ) : (
            <Box sx={{ p: 10, textAlign: 'center' }}>
                <AssignmentIcon fontSize="large" sx={{ color: 'divider', mb: 2 }} />
                <Typography variant="h6" color="text.secondary">No active prescriptions</Typography>
            </Box>
        )}
      </Box>
    </DashboardLayout>
  );
}
