"use client";

import { Grid, Card, CardContent, Typography } from "@mui/material";

const features = [
  "Online Registration",
  "Digital Records",
  "Quick Access",
];

const Features = () => {
  return (
    <Grid container spacing={2} p={2}>
      {features.map((f, i) => (
        <Grid size={{xs: 12, md: 4}} key={i}>
          <Card>
            <CardContent>
              <Typography variant="h6">{f}</Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default Features;