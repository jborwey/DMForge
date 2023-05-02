import React from "react";
import Header from "components/Header";
import { Box, Card, CardActions, CardContent, Collapse, Button, Typography, Rating, useTheme, useMediaQuery } from "@mui/material";
import ChipTextField from "../../components/ChipTextField";
import TaggedTextField from "components/TaggedTextField";

const Threads = () => {
    return (
        <Box
            sx={{ paddingLeft: "2rem" }}>
            <Header title="THREADS" subtitle="See the thread's of your story and add to them." />       
            <ChipTextField />
            <TaggedTextField />
        </Box>
    );
};

export default Threads;