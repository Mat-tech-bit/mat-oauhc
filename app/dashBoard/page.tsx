"use client";

import React, { useEffect, useState } from "react";
import { Box, Typography, Button } from "@mui/material";
import { useRouter } from "next/navigation";
import { logoutUser } from "@/firebase/functions/logoutUser";
import { getUserDetails } from "@/firebase/functions/getUserDetails";

const DashboardPage = () => {
  const router = useRouter();
  const { uid } = router.query;
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (uid) {
      getUserDetails(uid as string).then(res => {
        if (res.success) setUser(res.data);
        else alert(res.error);
        setLoading(false);
      });
    }
  }, [uid]);

  const handleLogout = async () => {
    await logoutUser();
    router.push('/login');
  };

  if (loading) return <Typography>Loading...</Typography>;

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" mb={2}>Welcome back, {user.fullName}</Typography>
      <Typography mb={2}>Email: {user.email}</Typography>
      <Typography mb={2}>Gender: {user.gender}</Typography>
      <Typography mb={2}>Department: {user.department}</Typography>
      <Typography mb={2}>Blood Group: {user.bloodGroup}</Typography>

      <Button variant="contained" color="error" onClick={handleLogout}>Logout</Button>

      {/* You can keep your stats cards and recent activity here */}
    </Box>
  );
};

export default DashboardPage;