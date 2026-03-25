"use client";

import { Box, Typography, Button } from "@mui/material";

const Hero = () => {
  return (
    <Box textAlign="center" py={10} px={2}>
      <Typography variant="h3" fontWeight={600}>
        Modern Campus Health
      </Typography>

      <Typography mt={2} color="text.secondary">
        Simplified & Secured system for students and doctors
      </Typography>

      <Box mt={4} display="flex" gap={2} justifyContent="center" flexWrap="wrap">
        <Button variant="contained">Register</Button>
        <Button variant="outlined">Login</Button>
      </Box>
    </Box>
  );
};

export default Hero;