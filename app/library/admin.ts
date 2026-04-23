import {
  collection,
  getDocs,
} from "firebase/firestore";
import { StudentProfile } from "../types/user";
import { db } from "@/firebase/firebasefile";



export const getAllStudents =
  async (): Promise<StudentProfile[]> => {

    const querySnapshot =
      await getDocs(collection(db, "students"));

    const students: StudentProfile[] = [];

    querySnapshot.forEach((doc) => {

      students.push(
        doc.data() as StudentProfile
      );

    });

    return students;
};