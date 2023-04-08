import { Box, Button, IconButton, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import Header from "../../components/Header.jsx";
import dragonImage from '../../assets/dragon.png'

const Dashboard = () => {
    return (
        <Box>
            <Box display="flex">
                <Header title="CAMPAIGN" subtitle="Adventurer Bob's campaign"/>
            </Box>
            <Box
                  component="img"
                  alt="profile"
                  src={dragonImage}
                  sx={{ objectFit: "cover",
                        display: "flex",
                        float: "right" }}
                />
        </Box>
    );
};

export default Dashboard;