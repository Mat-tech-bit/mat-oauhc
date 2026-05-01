"use client"

import React, { useState, createContext, useContext, useMemo, useEffect } from "react"
import {
  ThemeProvider,
  createTheme,
  CssBaseline,
  IconButton,
} from "@mui/material"
import { DarkMode, LightMode } from "@mui/icons-material"

// 1️⃣ Create Context for theme mode
const ThemeModeContext = createContext({
  darkMode: true, // Default to true
  toggleTheme: () => {},
})

// 2️⃣ Provider that wraps your app
export function ThemeToggleProvider({ children }: { children: React.ReactNode }) {
  // Initialize with true to ensure dark mode by default
  const [darkMode, setDarkMode] = useState(false)
  const [mounted, setMounted] = useState(false)

  // Load preference on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem("oauhc-theme")
    if (savedTheme) {
      setDarkMode(savedTheme === "dark")
    } else {
      // Default to light if no saved preference
      setDarkMode(false)
    }
    setMounted(true)
  }, [])

  // Save preference whenever it changes
  useEffect(() => {
    if (mounted) {
      localStorage.setItem("oauhc-theme", darkMode ? "dark" : "light")
    }
  }, [darkMode, mounted])

  const theme = useMemo(() => createTheme({
    palette: {
      mode: darkMode ? "dark" : "light",
      primary: {
        main: "#0284c7",
      },
      background: {
        default: darkMode ? "#0f172a" : "#f8fafc",
        paper: darkMode ? "#1e293b" : "#ffffff",
      },
      text: {
        primary: darkMode ? "#f8fafc" : "#1a1a1a",
        secondary: darkMode ? "#94a3b8" : "#64748b",
      },
      divider: darkMode ? "rgba(255, 255, 255, 0.12)" : "rgba(0, 0, 0, 0.12)",
    },
    shape: {
      borderRadius: 8,
    },
    typography: {
      fontFamily: "var(--font-roboto), Roboto, sans-serif",
    },
    components: {
      MuiPaper: {
        styleOverrides: {
          root: {
            backgroundImage: 'none',
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            textTransform: 'none',
            fontWeight: 700,
          }
        }
      }
    },
  }), [darkMode])

  // Prevent hydration flicker by only rendering theme-dependent content after mount
  // OR just render with the default (dark) and let useEffect switch if needed.
  // Given the user wants dark by default, we'll start with dark.

  return (
    <ThemeModeContext.Provider value={{ darkMode, toggleTheme: () => setDarkMode(!darkMode) }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ThemeModeContext.Provider>
  )
}

// 3️⃣ Hook to use theme mode anywhere
export const useThemeMode = () => useContext(ThemeModeContext)

// 4️⃣ Toggle button itself
export function ThemeToggleButton() {
  const { darkMode, toggleTheme } = useThemeMode()
  return (
    <IconButton color="inherit" onClick={toggleTheme}>
      {darkMode ? <LightMode /> : <DarkMode />}
    </IconButton>
  )
}
