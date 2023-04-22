import React from "react";
import Header from "components/Header";
import { Box, Card, CardActions, CardContent, Collapse, Button, Typography, Rating, useTheme, useMediaQuery } from "@mui/material";
import EntityTextBox from "../../components/EntityTextBox";

const Items = () => {
    return(
      <Box
      sx={{paddingLeft:"2rem"}}>
        <Header title="ITEMS" subtitle="See your party's list of items." />
        <EntityTextBox />
      </Box>
    );
};

export default Items;