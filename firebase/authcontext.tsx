"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

import {
  User,
  onAuthStateChanged,
} from "firebase/auth";
import { StudentProfile } from "@/app/types/user";
import { auth } from "./firebasefile";
import { getUserProfile } from "@/app/library/auth";


interface AuthContextType {
  user: User | null;
  profile: StudentProfile | null;
  loading: boolean;
}

const AuthContext =
  createContext<AuthContextType | null>(null);

export const useAuth =
  (): AuthContextType => {

    const context =
      useContext(AuthContext);

    if (!context) {
      throw new Error(
        "useAuth must be used inside AuthProvider"
      );
    }

    return context;
  };

export const AuthProvider = ({
  children,
}: {
  children: ReactNode;
}) => {

  const [user, setUser] =
    useState<User | null>(null);

  const [profile, setProfile] =
    useState<StudentProfile | null>(null);

  const [loading, setLoading] =
    useState<boolean>(true);

  useEffect(() => {

    const unsubscribe =
      onAuthStateChanged(
        auth,
        async (firebaseUser) => {

          if (firebaseUser) {

            setUser(firebaseUser);

            const userProfile =
              await getUserProfile(
                firebaseUser.uid
              );

            setProfile(userProfile);

          } else {

            setUser(null);
            setProfile(null);

          }

          setLoading(false);

        }
      );

    return () => unsubscribe();

  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        profile,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};