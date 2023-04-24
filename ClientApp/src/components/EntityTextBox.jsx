// Contains a text box the displays freeform text where people and things are clickable,
// an a button to generate new text from the backend.

import React, { Component, useState, useEffect } from 'react';
import { 
    Button,
    Box,
    Typography,
    TextField,
    useTheme} from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';


const EntityTextBox = ({ }) => {
    const theme = useTheme();
    const [itemOption, setItemOption] = useState('');
    const [userInput, setUserInput] = useState('Enter Text Here');
    const [itemText, setItemText] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleChange  = (event) => {
      console.log("event: ", event);
      setItemOption(event.target.value);
    };

    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        ItemType: itemOption 
      })
    };


    const fetchItemText = async () => {
      setIsLoading(true);
      //TODO user input send to generate
      console.log("requestOptions", requestOptions );
      const result = userInput;
        try {
          const response = await fetch('generateitem', requestOptions);
          console.log("fetch data", response);
          const data = await response.json();
          if(data){
            setItemText(data.itemText);
            setIsLoading(false);
          }       
        } catch (error) {
          console.error('Error fetching item text:', error);
          setIsLoading(false);
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
      {isLoading && <Box sx={{ display: 'flex' }}>
          <CircularProgress />
      </Box>}
      <Box>
        <Box sx={{maxWidth: 120, paddingBottom:"1rem"}}>
          <FormControl fullWidth>
            <InputLabel id="item-type-label">Item</InputLabel>
            <Select
              labelId="item-type-label"
              value={itemOption}
              label="Item"
              onChange={handleChange}
              disabled={isLoading}
            >
              <MenuItem value={'Sword'}>Sword</MenuItem>
              <MenuItem value={'Bow'}>Bow</MenuItem>
              <MenuItem value={'Axe'}>Axe</MenuItem>
            </Select>       
          </FormControl>
        </Box>
        {/* <TextField
            id="filled-multiline-static"
            label="Multiline"
            multiline
            rows={30}
            variant="filled"
            value={userInput}
            onChange={handleInputChange}
            placeholder="Enter text here"
            disabled={isLoading}
            sx={{ width: "30%" }}
        /> */}
        <TextField
            id="filled-multiline-static"
            label="Multiline"
            multiline
            readOnly
            rows={30}
            variant="filled"
            value={itemText}
            // display={showItem}
            sx={{ width: "60%" }}
        />
      </Box>
        <div>
            <Button variant="contained" color="primary" onClick={fetchItemText}>
            Generate
            </Button>
        </div>
    </Box>
  );
};

export default EntityTextBox;