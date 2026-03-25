"use client";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  useTheme,
  useMediaQuery,
  IconButton,
} from "@mui/material";
import Link from "next/link";
import * as React from "react";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import MedicalServicesIcon from "@mui/icons-material/MedicalServices";
import Drawer from "@mui/material/Drawer";
import CloseIcon from "@mui/icons-material/Close";

export default function Navbar() {
  const pages = [
    { name: "Home", path: "/" },
    { name: "Features", path: "/features" },
    { name: "Contact", path: "/footer" },
  ];
  const settings = ["Profile", "Account", "Dashboard", "Logout"];

  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <AppBar position="static">
      {isMobile ? (
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <MedicalServicesIcon
              sx={{ display: { xs: "none", md: "flex" }, mr: 1 }}
            />
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="#app-bar-with-responsive-menu"
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              OAUHC
            </Typography>

            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Drawer
                PaperProps={{
                  sx: {
                    height: "auto", // 👈 THIS fixes full height
                    maxHeight: 300, // 👈 control how tall it should be
                    mt: 8, // 👈 pushes it down from top (optional)
                    borderRadius: 2, // 👈 makes it look like a dropdown
                  },
                }}
                anchor="left"
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
              >
                <Box sx={{ width: 250, p: 2 }}>
                  {/* Top: Title + Close Button */}
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      mb: 2,
                    }}
                  >
                    <IconButton onClick={handleCloseNavMenu}>
                      <CloseIcon />
                    </IconButton>
                  </Box>

                  {/* Menu Items */}
                 {pages.map((page) => (
  <Link key={page.name} href={page.path} style={{ textDecoration: "none" }}>
    <Button
      fullWidth
      sx={{ justifyContent: "flex-start", mb: 1 }}
      onClick={handleCloseNavMenu}
    >
      {page.name}
    </Button>
  </Link>
))}
                </Box>
              </Drawer>
            </Box>
            <MedicalServicesIcon
              sx={{ display: { xs: "flex", md: "none" }, mr: 1 }}
            />
            <Typography
              variant="h5"
              noWrap
              component="a"
              href="#app-bar-with-responsive-menu"
              sx={{
                mr: 2,
                display: { xs: "flex", md: "none" },
                flexGrow: 1,
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              OAUHC
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
          {pages.map((page) => (
  <Link key={page.name} href={page.path} style={{ textDecoration: "none" }}>
    <Button
      sx={{ my: 2, color: "white", display: "block" }}
      onClick={handleCloseNavMenu}
    >
      {page.name}
    </Button>
  </Link>
))}
            </Box>
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt="oau logo" src="/oauLogo.jpg" />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting) => (
                  <MenuItem key={setting} onClick={handleCloseUserMenu}>
                    <Typography sx={{ textAlign: "center" }}>
                      {setting}
                    </Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      ) : (
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="h6">
            {" "}
            <MedicalServicesIcon />
            OAUHC
          </Typography>

          <Box sx={{ gap: 2 }}>
            <Button color="inherit">Home</Button>
            <Button color="inherit">Features</Button>
            <Button color="inherit">Contact</Button>
          </Box>

          <Box>
            <Button component={Link} href="/loginPage" sx={{ mr: 1 }} variant="contained">
              Login
            </Button>
            <Button component={Link} href="/registrationPage" variant="contained">Register</Button>
          </Box>
        </Toolbar>
      )}
    </AppBar>
  );
}
