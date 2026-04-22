import { auth, db } from "@/firebase/firebasefile";
import { 
  createUserWithEmailAndPassword, 
  sendPasswordResetEmail,
  signOut
} from "firebase/auth";
import { UserProfile } from "@/app/types/user";
import { doc, setDoc } from "firebase/firestore";

export const registerUser = async (
  email: string, 
  pass: string, 
  profileData: Omit<UserProfile, 'uid' | 'email' | 'role'>
) => {
  const userCredential = await createUserWithEmailAndPassword(auth, email, pass);
  const user = userCredential.user;

  // Set initial profile with role: 'student'
  await setDoc(doc(db, "users", user.uid), {
    ...profileData,
    uid: user.uid,
    email: email,
    role: 'student'
  });
};

export const resetPassword = async (email: string) => {
  await sendPasswordResetEmail(auth, email);
};

export const logoutUser = async () => {
  await signOut(auth);
};