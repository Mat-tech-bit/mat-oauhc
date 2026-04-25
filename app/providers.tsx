"use client";

import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import { ThemeToggleProvider } from "./theme";
import { AuthProvider } from "@/firebase/authcontext";
import Navbar from "./navbar/page";
import Footer from "./footer/page";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AppRouterCacheProvider>
      <ThemeToggleProvider>
        <Navbar />
        <AuthProvider>
          {children}
        </AuthProvider>
        <Footer />
      </ThemeToggleProvider>
    </AppRouterCacheProvider>
  );
}
