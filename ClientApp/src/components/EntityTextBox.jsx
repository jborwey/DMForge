// Contains a text box the displays freeform text where people and things are clickable,
// an a button to generate new text from the backend.

import React, { Component, useState, useEffect } from 'react';
import { 
    Button,
    Box,
    Typography,
    TextField,
    useTheme} from '@mui/material';


const EntityTextBox = ({ }) => {
    const theme = useTheme();
    const [itemText, setItemText] = useState('Default Value');

    const fetchItemText = async () => {
        try {
          const response = await fetch('generateitem');
          const data = await response.json();
          setItemText(data.itemText);
        } catch (error) {
          console.error('Error fetching item text:', error);
        }
      };

  return (
    <Box
        sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "left",
            alignItems: "left",
            gap: "1rem",
            padding: "1rem",
            backgroundColor: theme.palette.background.default,
            borderRadius: "4rem",
        }}
    >
        <TextField
            id="filled-multiline-static"
            label="Multiline"
            multiline
            rows={30}
            defaultValue="Default Value"
            variant="filled"
            value={itemText}
            sx={{ width: "60%" }}
        />
        <div>
            <Button variant="contained" color="primary" onClick={fetchItemText}>
            Generate
            </Button>
        </div>
    </Box>
  );
};

export default EntityTextBox;