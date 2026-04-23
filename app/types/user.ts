export interface StudentProfile {
  uid: string;
  fullName: string;
  matricNumber: string;
  department: string;
  dob: string;
  gender: string;
  phoneNumber: string;
  bloodGroup: string;
  emergencyContact: string;
  medicalHistory: string;
  email: string;
  role: "student" | "admin";
  createdAt: Date;
}