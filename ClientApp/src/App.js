import React, { Component, useState } from 'react';
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { Route, Routes, Navigate } from 'react-router-dom';
import { themeSettings } from "./theme";
import { GoogleLogin } from '@react-oauth/google';
import { googleLogout, useGoogleLogin } from '@react-oauth/google';
import AppRoutes from './AppRoutes';
import SplashScreen from 'scenes/splash';
import Login from 'components/Login';
import Register from 'components/Register';
import Layout from "scenes/layout";
import Dashboard from "./scenes/dashboard";
import People from "scenes/people";
import Items from "scenes/items";
import Threads from "scenes/threads";
import GoogleLoginComponent from "components/GoogleLogin";

function App() {
  const mode = useSelector((state) => state.global.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState([]);
  const [profile, setProfile] = useState([]);

  const handleAuthentication = (authenticated) => {
    console.log("handle auth")
    setIsAuthenticated(authenticated);
  };

  const login = useGoogleLogin({
    onSuccess: (codeResponse) => {
      setUser(codeResponse);
      setProfile(codeResponse.profileObj);
      handleAuthentication(true);
    },
    onError: (error) => console.log('Login Failed:', error)
  });

  return (
      <div className="app">
        <ThemeProvider theme={theme}>
          <CssBaseline />
          {isAuthenticated ? (
            <Routes>
              <Route element={<Layout />} >
                <Route path="/" element={<Navigate to="/dashboard" replace />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/people" element={<People />} />
                <Route path="/items" element={<Items />} />
                <Route path="/threads" element={<Threads />} />
              </Route>
            </Routes>
          ) : (
            <Routes>
              <Route path="/" element={<SplashScreen />} >
                <Route
                  path="/login"
                  element={<Login onAuthentication={handleAuthentication} />}
                />
                <Route
                  path="/register"
                  element={<Register onAuthentication={handleAuthentication} />}
                />
                <Route
                  element={<GoogleLoginComponent onAuthentication={handleAuthentication} />}
                />    
              </Route>
            </Routes>
          )}
        </ThemeProvider>
      </div>
  );
}

export default App;
