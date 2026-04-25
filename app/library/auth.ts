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
    "uid" | "email" | "role" | "createdAt" | "passportUrl"
  >,
  passportBase64: string
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

  try {
    const profile: StudentProfile = {
      uid: user.uid,
      email: email.trim(),
      role: "student",
      createdAt: new Date(),
      passportUrl: passportBase64,
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
  } catch (err: any) {
    console.error("Failed to complete profile step. Rolling back user creation...", err.message);
    // Delete user so they can retry smoothly without getting email already in use error
    await user.delete().catch((e) => console.log("Rollback failed:", e));

    if (err.code === "permission-denied") {
      throw new Error(
        "FIRESTORE RULES ERROR: Please go to Firebase Console > Firestore Database > Rules and make sure the new text was Published successfully!"
      );
    }

    throw new Error("Failed to save profile details: " + err.message);
  }

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

  try {
    const docRef = doc(db, "students", uid);
    const snapshot = await getDoc(docRef);

    if (!snapshot.exists()) {
      console.log("Profile not found in Firestore");
      return null;
    }

    console.log("Profile loaded");
    return snapshot.data() as StudentProfile;
  } catch (error) {
    console.error("Error fetching user profile (check firestore rules):", error);
    return null;
  }

};