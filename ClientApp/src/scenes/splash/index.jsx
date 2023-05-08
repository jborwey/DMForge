import React from 'react';
import { Box, Button } from "@mui/material";
import { Link } from 'react-router-dom';
import GoogleLogin from '../../components/GoogleLogin';

const SplashScreen = () => {
    return (
        <Box className="splash-screen"
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '100vh',
                width: '100%',
            }}
        >
            <h1>DM Forge</h1>
            <Box className="actions" sx={{ '& .MuiButtonBase-root': { m: 1 },
                '& .googlogin': { display: "flex", justifyContent:"center" }, }}>
                <Button variant="contained" color="primary" href="/register">
                    Create a User
                </Button>
                <Button variant="contained" color="primary" href="/login">
                    Login
                </Button>
                <Box className="googlogin">
                    <GoogleLogin />
                </Box>       
            </Box>
        </Box>
    );
};

export default SplashScreen;
