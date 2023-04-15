import React from "react";
import Header from "components/Header";
import { Box, Card, CardActions, CardContent, Collapse, Button, Typography, Rating, useTheme, useMediaQuery } from "@mui/material";

const Items = () => {
    return(
      <Box>
        <Header title="ITEMS" subtitle="See your party's list of items." />
      </Box>
    );
};

export default Items;