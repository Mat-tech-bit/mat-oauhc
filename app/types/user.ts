export interface StudentProfile {
  uid: string;
  fullName: string;
  matricNumber: string;
  faculty: string;
  level?: string;
  dob: string;
  gender: string;
  phoneNumber: string;
  bloodGroup: string;
  emergencyContact: string;
  medicalHistory: string;
  email: string;
  role: "student" | "admin";
  passportUrl?: string;
  createdAt: Date;
}