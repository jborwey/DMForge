// Contains a text box the displays freeform text where people and things are clickable,
// an a button to generate new text from the backend.

import React, { Component, useState, useEffect } from 'react';
import {
    Button,
    Box,
    Typography,
    TextField,
    useTheme
} from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InfoWidget from './InfoWidget';
import LoadingContainerOverlay from './LoadingContainerOverlay';

const NpcGenerateForm = ({ }) => {
    const theme = useTheme();
    const [raceOption, setRaceOption] = useState('');
    const [profInput, setProfInput] = useState('');
    const [appearanceInput, setAppearanceInput] = useState('');
    const [userInput, setUserInput] = useState('Enter Text Here');
    const [npcText, setNpcText] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const maxlengthRace = 60;
    const maxLengthAppearance = 120;

    const handleRaceChange = (event) => {
        setRaceOption(event.target.value);
    };

    const handleProfessionChange = (event) => {
        setProfInput(event.target.value);
    };

    const handleAppearanceChange = (event) => {
        setAppearanceInput(event.target.value);
    };

    const handleChange = (event) => {
        setRaceOption(event.target.value);
    };

    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            RaceType: raceOption,
            Profession: profInput,
            Appearance: appearanceInput
        })
    };


    const fetchNpc = async () => {
        setNpcText('');
        setIsLoading(true);
        //TODO user input send to generate
        console.log("requestOptions", requestOptions);
        try {
          const response = await fetch('generatenpc', requestOptions);
          console.log("fetch data", response);
          const data = await response.json();
          console.log("fetch data", data);
          if (data) {
              setNpcText(data.npcText);
              setIsLoading(false);
          }
        } catch (error) {
            console.error('Error fetching npc text:', error);
            setIsLoading(false);
        }
    };

    return (
        <Box
          display={'inline-flex'}
          width={'100%'}
            component="form"
            sx={{
              '& .MuiBox-root': {width: 'fullWidth'},
              '& .MuiTextField-root': { m: 1 },
              '& #inputForm': { maxWidth:'50%' }, 
              '& #genResult': { position: 'relative', left: 10, width: '100%' },           
            }}
            noValidate
            autoComplete="off"
        >
            <div id="inputForm">
                <Box
                  sx={{ '& .MuiFormControl-root': { m: 1, width: '25ch' }, }}>
                    <FormControl>
                        <InputLabel id="race-type-label">Race</InputLabel>
                        <Select
                            labelId="race-type-label"
                            name="Race"
                            value={raceOption}
                            label="Race"
                            onChange={handleRaceChange}
                            disabled={isLoading}
                        >
                            <MenuItem value={''}></MenuItem>
                            <MenuItem value={'Human'}>Human</MenuItem>
                            <MenuItem value={'Elf'}>Elf</MenuItem>
                            <MenuItem value={'Drow'}>Drow</MenuItem>
                            <MenuItem value={'Dwarf'}>Dwarf</MenuItem>
                            <MenuItem value={'Tiefling'}>Tiefling</MenuItem>
                        </Select>
                    </FormControl>
                    <InfoWidget infoText={'Select the race of the NPC you want to create. Leave this blank if you want The Forge to decide.'} />
                </Box>
                <Box
                  sx={{ 
                    '& .MuiFormControl-root': { m: 1, width: '25ch' },
                    '& #lengthtracker': { marginBottom: 1, marginLeft: 1, marginRight: 1, width: '25ch' }, }}>
                    <TextField
                        inputProps={{ maxLength: maxlengthRace }}
                        id="outlined-textarea"
                        label="Profession"
                        placeholder="Placeholder"
                        multiline
                        value={profInput}
                        onChange={handleProfessionChange}
                        disabled={isLoading}
                    />
                    <InfoWidget infoText={'Select the profession of the NPC you want to create. Leave this blank if you want The Forge to decide.'} />
                    <span id='lengthtracker'>
                        {maxlengthRace - profInput.length}/{maxlengthRace}
                    </span>
                </Box>
                <Box sx={{ 
                  '& .MuiFormControl-root': { m: 1, width: '25ch' },
                  '& #appearanceTracker': { marginBottom: 1, marginLeft: 1, marginRight: 1, width: '25ch' }, }}>
                    <TextField
                        inputProps={{ maxLength: maxLengthAppearance }}       
                        id="outlined-multiline-static"
                        label="Appearance"
                        multiline
                        rows={4}
                        value={appearanceInput}
                        onChange={handleAppearanceChange}
                        disabled={isLoading}
                    />
                    <InfoWidget infoText={'Describe the appearance of the NPC you want to create. Leave this blank if you want The Forge to decide.'} />
                    <span id='appearanceTracker'>
                        {maxLengthAppearance - appearanceInput.length}/{maxLengthAppearance}
                    </span>
                </Box>
              <Button variant="contained" color="primary" onClick={fetchNpc} disabled={isLoading}>
                Generate
              </Button>
            </div>
            <div id="genResult">
              <LoadingContainerOverlay
                inputProps={{ readOnly: true }}
                id="filled-multiline-static"
                label="Multiline"
                multiline
                rows={30}
                variant="filled"
                value={npcText}
                sx={{ width: "100%" }}
                loading={isLoading}
              />
            </div>
        </Box>
    );
};

export default NpcGenerateForm;