import { auth, db } from "@/firebase/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  User,
  UserProfile
} from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";

// REGISTER
export const registerUser = async (
  email: string,
  password: string,
  data: UserProfile
): Promise<void> => {
  const userCredential = await createUserWithEmailAndPassword(
    auth,
    email,
    password
  );

  const user = userCredential.user;

  await setDoc(doc(db, "users", user.uid), data);
};

// LOGIN
export const loginUser = async (
  email: string,
  password: string
): Promise<User> => {
  const userCredential = await signInWithEmailAndPassword(
    auth,
    email,
    password
  );

  return userCredential.user;
};

// GET USER DATA
export const getUserData = async (
  uid: string
): Promise<UserProfile> => {
  const docRef = doc(db, "users", uid);
  const snap = await getDoc(docRef);

  if (!snap.exists()) {
    throw new Error("User not found");
  }

  return snap.data() as UserProfile;
};

// LOGOUT
export const logoutUser = async (): Promise<void> => {
  await signOut(auth);
};

// FORGOT PASSWORD
export const resetPassword = async (email: string): Promise<void> => {
  await sendPasswordResetEmail(auth, email);
};