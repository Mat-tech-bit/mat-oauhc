"use client";

import React, { useState, useEffect } from "react";
import {
  Box,
  Drawer,
  AppBar,
  Toolbar,
  List,
  Typography,
  Divider,
  IconButton,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Avatar,
  CircularProgress,
  Container,
  useTheme,
  useMediaQuery,
  Stack
} from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import MenuIcon from "@mui/icons-material/Menu";
import DashboardIcon from "@mui/icons-material/Dashboard";
import EventNoteIcon from "@mui/icons-material/EventNote";
import MedicationIcon from "@mui/icons-material/Medication";
import SettingsIcon from "@mui/icons-material/Settings";
import FolderSharedIcon from "@mui/icons-material/FolderShared";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import MedicalServicesIcon from "@mui/icons-material/MedicalServices";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { useRouter, usePathname } from "next/navigation";
import { useAuth } from "@/firebase/authcontext";
import { logoutUser } from "@/app/library/auth";
import { ThemeToggleButton } from "@/app/theme";

const drawerWidth = 280;

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const { user, profile, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    if (!loading && !user) {
      router.push("/loginpage");
    }
  }, [user, loading, router]);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const menuItems = [
    { text: "Overview", icon: <DashboardIcon />, path: "/dashboard" },
    { text: "Appointments", icon: <EventNoteIcon />, path: "/appointments" },
    { text: "Prescriptions", icon: <MedicationIcon />, path: "/prescriptions" },
    { text: "Medical Records", icon: <FolderSharedIcon />, path: "/student-records" },
    { text: "Profile Settings", icon: <SettingsIcon />, path: "/settings" },
  ];

  if (loading || !user) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", bgcolor: 'background.default' }}>
        <CircularProgress thickness={5} size={60} />
      </Box>
    );
  }

  const drawer = (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column', bgcolor: 'background.paper' }}>
      <Box sx={{ px: 3, py: 4, display: 'flex', alignItems: 'center', gap: 1.5 }}>
        <Avatar sx={{ bgcolor: 'primary.main', borderRadius: 2 }}>
          <MedicalServicesIcon />
        </Avatar>
        <Typography variant="h6" sx={{ fontWeight: 800, color: 'text.primary', letterSpacing: -0.5 }}>
          OAU <span style={{ color: theme.palette.primary.main }}>Health</span>
        </Typography>
      </Box>

      {/* Profile Section in Sidebar */}
      <Box sx={{ mx: 2, mb: 4, p: 2.5, bgcolor: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.03)' : '#f8fafc', borderRadius: 4, border: '1px solid', borderColor: 'divider' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 0 }}>
          <Avatar
            src={profile?.passportUrl || ""}
            sx={{ width: 48, height: 48, border: "2px solid", borderColor: 'background.paper', boxShadow: '0 4px 12px rgba(0,0,0,0.08)' }}
          />
          <Box sx={{ overflow: 'hidden' }}>
            <Typography variant="subtitle2" noWrap sx={{ fontWeight: 700, color: 'text.primary' }}>
              {profile?.fullName?.split(' ')[0] || "Student"}
            </Typography>
            <Typography variant="caption" noWrap color="text.secondary" sx={{ display: 'block' }}>
              {profile?.matricNumber || "Guest"}
            </Typography>
          </Box>
        </Box>
      </Box>
      
      <Box sx={{ px: 2, flexGrow: 1 }}>
        <Typography variant="caption" sx={{ px: 2, mb: 2, display: 'block', fontWeight: 700, color: 'text.secondary', textTransform: 'uppercase', letterSpacing: 1 }}>
          Menu
        </Typography>
        <List sx={{ p: 0 }}>
          {menuItems.map((item) => {
            const active = pathname === item.path;
            return (
              <ListItem key={item.text} disablePadding sx={{ mb: 1 }}>
                <ListItemButton
                  selected={active}
                  onClick={() => {
                    router.push(item.path);
                    setMobileOpen(false);
                  }}
                  sx={{
                    borderRadius: 3,
                    py: 1.5,
                    px: 2,
                    mx: 0,
                    transition: '0.2s',
                    "&.Mui-selected": {
                      bgcolor: "primary.main",
                      color: "primary.contrastText",
                      "& .MuiListItemIcon-root": {
                        color: "primary.contrastText",
                      },
                      "&:hover": {
                        bgcolor: "primary.dark",
                      }
                    },
                    "&:hover": {
                      bgcolor: 'action.hover',
                    }
                  }}
                >
                  <ListItemIcon sx={{ minWidth: 40, color: active ? "inherit" : "text.secondary" }}>
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText 
                    primary={item.text} 
                    primaryTypographyProps={{ 
                      fontSize: '0.9rem', 
                      fontWeight: active ? 700 : 500 
                    }} 
                  />
                  {active && (
                    <motion.div
                      layoutId="sidebar-active-dot"
                      style={{
                        width: '6px',
                        height: '6px',
                        borderRadius: '50%',
                        backgroundColor: 'white'
                      }}
                    />
                  )}
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>
      </Box>

      <Box sx={{ p: 2 }}>
        <Divider sx={{ mb: 2, opacity: 0.5 }} />
        <ListItemButton 
          onClick={async () => { await logoutUser(); router.push('/loginpage'); }}
          sx={{ borderRadius: 3, color: 'error.main', "&:hover": { bgcolor: 'error.light', color: 'error.contrastText', "& .MuiListItemIcon-root": { color: 'error.contrastText' } } }}
        >
          <ListItemIcon sx={{ minWidth: 40, color: 'inherit' }}><ExitToAppIcon /></ListItemIcon>
          <ListItemText primary="Log Out" primaryTypographyProps={{ fontWeight: 700, fontSize: '0.9rem' }} />
        </ListItemButton>
      </Box>
    </Box>
  );

  return (
    <Box sx={{ display: "flex", minHeight: "100vh", bgcolor: "background.default" }}>
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
          bgcolor: theme.palette.mode === 'dark' ? 'rgba(30, 41, 59, 0.8)' : "rgba(255, 255, 255, 0.8)",
          backdropFilter: 'blur(12px)',
          color: "text.primary",
          borderBottom: "1px solid",
          borderColor: 'divider',
          zIndex: theme.zIndex.drawer + 1
        }}
      >
        <Toolbar sx={{ justifyContent: "space-between", px: { xs: 2, md: 4 } }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { sm: "none" } }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" sx={{ fontWeight: 800, letterSpacing: -0.5 }}>
              {menuItems.find(i => i.path === pathname)?.text || "Portal"}
            </Typography>
          </Box>
          
          <Stack direction="row" spacing={1.5} alignItems="center">
            <ThemeToggleButton />
            <IconButton sx={{ bgcolor: 'action.selected' }}>
               <NotificationsIcon fontSize="small" />
            </IconButton>
            {!isMobile && (
              <Box sx={{ textAlign: 'right', mr: 1 }}>
                <Typography variant="body2" sx={{ fontWeight: 700 }}>{profile?.fullName || "Student"}</Typography>
                <Typography variant="caption" color="text.secondary">OAU Health User</Typography>
              </Box>
            )}
            <Avatar
              src={profile?.passportUrl || ""}
              sx={{ width: 40, height: 40, border: '1px solid', borderColor: 'divider' }}
            />
          </Stack>
        </Toolbar>
      </AppBar>

      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
      >
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth, borderRight: '1px solid', borderColor: 'divider' },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>

      <Box
        component="main"
        sx={{ 
          flexGrow: 1, 
          p: { xs: 2, md: 5 }, 
          width: { sm: `calc(100% - ${drawerWidth}px)` }, 
          mt: 9,
          maxWidth: '1600px',
          mx: 'auto'
        }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={pathname}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </Box>
    </Box>
  );
}
