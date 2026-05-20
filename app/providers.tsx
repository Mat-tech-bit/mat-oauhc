"use client";

import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import { ThemeToggleProvider } from "./theme";
import { AuthProvider } from "@/firebase/authcontext";
import { Box } from "@mui/material";
import Navbar from "./navbar/page";
import Footer from "./footer/page";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AppRouterCacheProvider>
      <ThemeToggleProvider>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            minHeight: "100vh",
          }}
        >
          <Navbar />
          <Box component="main" sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
            <AuthProvider>
              {children}
            </AuthProvider>
          </Box>
          <Footer />
        </Box>
      </ThemeToggleProvider>
    </AppRouterCacheProvider>
  );
}
