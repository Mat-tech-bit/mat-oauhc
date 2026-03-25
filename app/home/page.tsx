"use client";
import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import AdjustIcon from "@mui/icons-material/Adjust";
import HowToRegRoundedIcon from "@mui/icons-material/HowToRegRounded";
import { SvgIconComponent } from "@mui/icons-material";
import ElectricBoltIcon from "@mui/icons-material/ElectricBolt";
import NotesIcon from "@mui/icons-material/Notes";
import Link from "next/link";

type CardType = {
  id: number;
  name: string;
  text: string;
  icon: SvgIconComponent;
  color: string;
};

const HomePage = () => {
  const [cardDetails] = useState<CardType[]>([
    {
      id: 1,
      name: "Online Registration",
      text: "quickly enroll in the campus health system with a streamlined, digital process",
      icon: HowToRegRoundedIcon,
      color: "blue",
    },

    {
      id: 2,
      name: "Digital Records",
      text: "securely store and access your complete medical history and past visit details",
      icon: NotesIcon,
      color: "green",
    },

    {
      id: 3,
      name: "Quick Access",
      text: "Doctors can instantly pull up your history",
      icon: ElectricBoltIcon,
      color: "purple",
    },
  ]);

  return (
    <Box sx={{ padding: "40px" }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: 3,
        }}
      >
        <Box>
          <Button
            sx={{ bgcolor: "#6b9fe3", color: "#1b70e0" }}
            startIcon={<AdjustIcon />}
          >
            System Operation
          </Button>
        </Box>
        <Box>
          <Typography variant="h4">Modern Campus Health,</Typography>
        </Box>
        <Typography variant="h5" sx={{ color: "#1b70e0" }}>
          Simplified & Secured.
        </Typography>
        <Box>
          {" "}
          <Typography sx={{ mx: { lg: "40px", sm: "40px" } }}>
            A unified platform for students, doctors, and administrators. Manage
            medical records, book appointments and access care instantly through
            a secure portal
          </Typography>
        </Box>
        {/* registration and login button */}
        <Box sx={{ display: "flex", gap: 2, flexDirection: "row" }}>
          <Button component={Link} href="/registrationPage" sx={{ bgcolor: "#1b70e0", color: "white" }}>
            Student Registration
          </Button>

          <Button
            sx={{
              color: "#1b70e0",
              bgcolor: "white",
              border: "2px solid #1b70e0",
            }}
            component={Link}
            href="/loginPage"
          >
            Portal Login
          </Button>
        </Box>

        <Box>
          <Grid container spacing={3}>
            {cardDetails.map((card) => {
              const Icon = card.icon;
              return (
                <Grid size={{ xs: 12, sm: 6, md: 4 }} key={card.id}>
                  <Card
                    sx={{
                      height: "100%",
                      borderRadius: "16px",
                      boxShadow: 3,
                      transition: "0.3s",
                      "&:hover": {
                        transform: "translateY(-5px)",
                        boxShadow: 6,
                      },
                    }}
                  >
                    <CardContent
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        textAlign: "center",
                        gap: 2,
                        py: 4,
                      }}
                    >
                      {/* ICON */}
                      <Icon
                        sx={{
                          color: card.color,
                          fontSize: { xs: 40, sm: 50, md: 60 },
                        }}
                      />

                      {/* TITLE */}
                      <Typography
                        variant="h6"
                        sx={{
                          fontWeight: "bold",
                          fontSize: { xs: "1rem", sm: "1.1rem", md: "1.2rem" },
                        }}
                      >
                        {card.name}
                      </Typography>

                      {/* DESCRIPTION */}
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{
                          fontSize: { xs: "0.85rem", sm: "0.9rem" },
                        }}
                      >
                        {card.text}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              );
            })}
          </Grid>
        </Box>
      </Box>
    </Box>
  );
};

export default HomePage;
