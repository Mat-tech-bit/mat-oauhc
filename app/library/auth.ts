import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
  UserCredential,
} from "firebase/auth";

import {
  doc,
  setDoc,
  getDoc,
  serverTimestamp,
} from "firebase/firestore";
import { StudentProfile } from "../types/user";
import { auth, db } from "@/firebase/firebasefile";



export const registerUser = async (
  email: string,
  password: string,
  profileData: Omit<
    StudentProfile,
    "uid" | "email" | "role" | "createdAt"
  >
): Promise<void> => {

  console.log("Starting registration...");

  const userCredential: UserCredential =
    await createUserWithEmailAndPassword(
      auth,
      email.trim(),
      password
    );

  const user = userCredential.user;

  console.log("Auth created:", user.uid);

  const profile: StudentProfile = {

    uid: user.uid,
    email: email.trim(),

    role: "student",

    createdAt: new Date(),

    ...profileData,

  };

  console.log("Saving profile...");

  await setDoc(
    doc(db, "students", user.uid),
    {
      ...profile,
      createdAt: serverTimestamp(),
    }
  );

  console.log("Profile saved successfully");

};

export const loginUser = async (
  email: string,
  password: string
): Promise<void> => {

  await signInWithEmailAndPassword(
    auth,
    email.trim(),
    password
  );

};

export const logoutUser = async (): Promise<void> => {

  await signOut(auth);

};

export const resetPassword = async (
  email: string
): Promise<void> => {

  await sendPasswordResetEmail(
    auth,
    email.trim()
  );

};

export const getUserProfile = async (
  uid: string
): Promise<StudentProfile | null> => {

  const docRef =
    doc(db, "students", uid);

  const snapshot =
    await getDoc(docRef);

  if (!snapshot.exists()) {

    console.log("Profile not found");

    return null;

  }

  console.log("Profile loaded");

  return snapshot.data() as StudentProfile;

};