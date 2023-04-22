import React, { Component } from 'react';
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { Route, Routes, Navigate } from 'react-router-dom';
import { themeSettings } from "./theme";
import AppRoutes from './AppRoutes';
import Layout from "scenes/layout";
import Dashboard from "./scenes/dashboard";
import People from "scenes/people";
import Items from "scenes/items";

function App() {
  const mode = useSelector((state) => state.global.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
    return (
      <div className="app">
        <ThemeProvider theme={theme}>
          <CssBaseline />
            <Routes>
              <Route element={<Layout />} >
                <Route path="/" element={<Navigate to="/dashboard" replace />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/people" element={<People />} />
                <Route path="/items" element={<Items />} />
              </Route>
            </Routes>
        </ThemeProvider>
      </div>
  );
}

export default App;
