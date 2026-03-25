"use client";

import React, { useState } from "react";
import { Box, TextField, Button, Typography, Paper, FormControlLabel, Checkbox } from "@mui/material";
import { useRouter } from "next/navigation";
import { loginUser } from "../library/auth";

const LoginPage = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const res = await loginUser(formData.email, formData.password);
    setLoading(false);

    if (res.success && res.user) {
      router.push(`/dashBoard?uid=${res.user.uid}`);
    } else {
      alert('Error: ' + res.error);
    }
  };

  return (
    <Box sx={{ height: "100vh", display: "flex", justifyContent: "center", alignItems: "center", backgroundColor: "#f5f5f5" }}>
      <Paper elevation={3} sx={{ padding: 4, width: 350 }}>
        <Typography variant="h5" mb={2} textAlign="center">Sign In</Typography>

        <form onSubmit={handleSubmit}>
          <TextField fullWidth label="Email" name="email" value={formData.email} onChange={handleChange} margin="normal" required />
          <TextField fullWidth label="Password" name="password" type="password" value={formData.password} onChange={handleChange} margin="normal" required />

          <FormControlLabel control={<Checkbox />} label="Remember Me" />
          <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
            {loading ? "Signing in..." : "Sign In"}
          </Button>
        </form>
      </Paper>
    </Box>
  );
};

export default LoginPage;