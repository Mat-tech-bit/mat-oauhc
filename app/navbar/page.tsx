"use client";
import { usePathname } from 'next/navigation';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  useTheme,
  useMediaQuery,
  IconButton,
  Tooltip,
  Avatar,
  Menu,
  MenuItem,
  Container,
  Drawer,
  Stack,
  Divider
} from "@mui/material";
import Link from "next/link";
import * as React from "react";
import MenuIcon from "@mui/icons-material/Menu";
import MedicalServicesIcon from "@mui/icons-material/MedicalServices";
import CloseIcon from "@mui/icons-material/Close";
import { ThemeToggleButton } from "../theme";

export default function Navbar() {
  const pathname = usePathname();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);

  // 🚨 Move conditional return AFTER all hooks to follow React rules
  const noNavRoutes = ['/dashboard', '/appointments', '/prescriptions', '/settings', '/student-records'];
  const shouldHide = noNavRoutes.some(route => pathname?.startsWith(route));

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const pages = [
    { name: "Home", path: "/" },
    { name: "Features", path: "/features" },
    { name: "Contact", path: "/#footer" },
  ];

  if (shouldHide) return null;

  return (
    <AppBar 
      position="sticky" 
      sx={{ 
        top: 0, 
        zIndex: 1100,
        bgcolor: theme.palette.mode === 'dark' ? 'background.paper' : 'primary.main',
        backgroundImage: 'none',
        boxShadow: theme.palette.mode === 'dark' ? '0 4px 20px rgba(0,0,0,0.4)' : '0 4px 20px rgba(0,0,0,0.1)'
      }}
    >
      <Container maxWidth="xl">
        <Toolbar variant="dense" sx={{ justifyContent: "space-between", minHeight: { xs: 56, md: 64 }, px: { xs: 0, sm: 2 } }}>
          {/* Logo Section */}
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            {isMobile && (
              <IconButton
                size="large"
                aria-label="menu"
                onClick={handleOpenNavMenu}
                color="inherit"
                sx={{ mr: 1 }}
              >
                <MenuIcon />
              </IconButton>
            )}
            <MedicalServicesIcon sx={{ mr: 1 }} />
            <Typography
              variant="h6"
              noWrap
              component={Link}
              href="/"
              sx={{
                fontWeight: 800,
                color: "inherit",
                textDecoration: "none",
                letterSpacing: -0.5,
                fontSize: { xs: '1.05rem', sm: '1.25rem' }
              }}
            >
              OAUHC
            </Typography>
          </Box>

          {/* Desktop Navigation */}
          {!isMobile && (
            <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
              {pages.map((page) => (
                <Button 
                  key={page.name} 
                  component={Link} 
                  href={page.path} 
                  color="inherit"
                  sx={{ 
                    fontWeight: 600, 
                    px: 2,
                    textTransform: 'none',
                    opacity: 0.9,
                    '&:hover': { opacity: 1, bgcolor: 'rgba(255,255,255,0.1)' }
                  }}
                >
                  {page.name}
                </Button>
              ))}
            </Box>
          )}

          {/* Right Section: Theme Toggle + Login/Register */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 1, md: 2 } }}>
            <ThemeToggleButton />
            {!isMobile && (
              <>
                <Button 
                  component={Link} 
                  href="/loginpage" 
                  color="inherit"
                  sx={{ fontWeight: 700, textTransform: 'none' }}
                >
                  Login
                </Button>
                <Button 
                  component={Link} 
                  href="/registrationpage" 
                  variant="contained" 
                  sx={{ 
                    bgcolor: 'white', 
                    color: 'primary.main', 
                    fontWeight: 800,
                    textTransform: 'none',
                    borderRadius: 2,
                    '&:hover': { bgcolor: '#f0f0f0' }
                  }}
                >
                    Register
                </Button>
              </>
            )}
          </Box>
        </Toolbar>
      </Container>

      {/* Mobile Drawer */}
      <Drawer
        anchor="left"
        open={Boolean(anchorElNav)}
        onClose={handleCloseNavMenu}
        PaperProps={{
          sx: { width: 280, bgcolor: 'background.paper', p: 3 }
        }}
      >
        <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="h6" sx={{ fontWeight: 800, color: 'primary.main' }}>OAU Health</Typography>
            <IconButton onClick={handleCloseNavMenu}><CloseIcon /></IconButton>
        </Box>
        <Stack spacing={2}>
          {pages.map((page) => (
            <Button
              key={page.name}
              component={Link}
              href={page.path}
              fullWidth
              sx={{ justifyContent: "flex-start", color: 'text.primary', fontWeight: 600, py: 1.5 }}
              onClick={handleCloseNavMenu}
            >
              {page.name}
            </Button>
          ))}
          <Divider sx={{ my: 2 }} />
          <Button
            component={Link}
            href="/loginpage"
            variant="outlined"
            fullWidth
            onClick={handleCloseNavMenu}
            sx={{ fontWeight: 700 }}
          >
            Login
          </Button>
          <Button
            component={Link}
            href="/registrationpage"
            variant="contained"
            fullWidth
            onClick={handleCloseNavMenu}
            sx={{ fontWeight: 700 }}
          >
            Register Now
          </Button>
        </Stack>
      </Drawer>
    </AppBar>
  );
}
