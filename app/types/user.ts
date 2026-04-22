export interface UserProfile {
  uid: string;
  email: string;
  fullName: string;
  matricNumber: string;
  department: string;
  dob: string;
  gender: string;
  phoneNumber: string;
  bloodGroup: string;
  emergencyContact: string;
  medicalHistory: string;
  role: 'student' | 'admin';
}