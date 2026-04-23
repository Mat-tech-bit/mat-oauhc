// "use client";
// import React, { useEffect, useState } from 'react';
// import { 
//   Container, Typography, Paper, Table, TableBody, 
//   TableCell, TableContainer, TableHead, TableRow, 
//   Box, CircularProgress, Alert 
// } from '@mui/material';

// import { useRouter } from 'next/navigation';
// import { useAuth } from '@/firebase/authcontext';
// import { UserProfile } from 'firebase/auth';
// import { getAllStudents } from '../library/admin';

// export default function AdminPage() {
//   const { profile, loading } = useAuth();
//   const [students, setStudents] = useState<UserProfile[]>([]);
//   const [fetching, setFetching] = useState(true);
//   const router = useRouter();

//   useEffect(() => {
//     // Redirect if not admin after loading finishes
//     if (!loading && profile?.role !== 'admin') {
//       router.push('/dashboard'); 
//     }

//     if (profile?.role === 'admin') {
//       getAllStudents().then((data) => {
//         setStudents(data);
//         setFetching(false);
//       });
//     }
//   }, [profile, loading, router]);

//   if (loading || fetching) return <Box sx={{ p: 5, textAlign: 'center' }}><CircularProgress /></Box>;

//   return (
//     <Container maxWidth="lg" sx={{ mt: 5 }}>
//       <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold' }}>
//         Admin Health Portal
//       </Typography>
//       <Typography variant="body1" sx={{ mb: 4 }} color="text.secondary">
//         Viewing all registered student medical profiles.
//       </Typography>

//       <TableContainer component={Paper} elevation={3}>
//         <Table>
//           <TableHead sx={{ bgcolor: '#1976d2' }}>
//             <TableRow>
//               <TableCell sx={{ color: 'white' }}>Full Name</TableCell>
//               <TableCell sx={{ color: 'white' }}>Matric No</TableCell>
//               <TableCell sx={{ color: 'white' }}>Department</TableCell>
//               <TableCell sx={{ color: 'white' }}>Blood Group</TableCell>
//               <TableCell sx={{ color: 'white' }}>Phone</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {students.map((student) => (
//               <TableRow key={student.uid}>
//                 <TableCell>{student.fullName}</TableCell>
//                 <TableCell>{student.matricNumber}</TableCell>
//                 <TableCell>{student.department}</TableCell>
//                 <TableCell>{student.bloodGroup}</TableCell>
//                 <TableCell>{student.phoneNumber}</TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </TableContainer>
      
//       {students.length === 0 && (
//         <Alert severity="info" sx={{ mt: 2 }}>No students registered yet.</Alert>
//       )}
//     </Container>
//   );
// }