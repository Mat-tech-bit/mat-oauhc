import { db } from "@/firebase/firebasefile";
import { UserProfile } from "firebase/auth";
import { collection, getDocs, query, where } from "firebase/firestore";

export const getAllStudents = async (): Promise<UserProfile[]> => {
  const usersRef = collection(db, "users");
  const q = query(usersRef, where("role", "==", "student"));
  const querySnapshot = await getDocs(q);
  
  const students: UserProfile[] = [];
  querySnapshot.forEach((doc) => {
    students.push(doc.data() as UserProfile);
  });
  
  return students;
};