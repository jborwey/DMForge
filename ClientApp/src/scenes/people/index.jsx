import React from "react";
import Header from "components/Header";
import { Box, Card, CardActions, CardContent, Collapse, Button, Typography, Rating, useTheme, useMediaQuery } from "@mui/material";
import NpcGenerateForm from "../../components/NpcGenerateForm";

const People = () => {
  return (
    <Box
      sx={{ paddingLeft: "2rem" }}>
      <Header title="PEOPLE" subtitle="See the list of important characters and generate new ones" />
      <NpcGenerateForm />
    </Box>
  );
};

export default People;