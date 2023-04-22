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

const NpcGenerateForm = ({ }) => {
    const theme = useTheme();
    const [raceOption, setRaceOption] = useState('');
    const [profInput, setProfInput] = useState('');
    const [appearanceInput, setAppearanceInput] = useState('');
    const [userInput, setUserInput] = useState('Enter Text Here');
    const [itemText, setItemText] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const maxlengthRace = 60;
    const maxLengthAppearance = 120;

    const handleRaceChange = (event) => {
        console.log("event: ", event);
        setRaceOption(event.target.value);
    };

    const handleProfessionChange = (event) => {
        console.log("event: ", event);
        setProfInput(event.target.value);
    };

    const handleAppearanceChange = (event) => {
        console.log("event: ", event);
        setAppearanceInput(event.target.value);
    };

    const handleChange = (event) => {
        console.log("event: ", event);
        setRaceOption(event.target.value);
    };

    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            ItemType: raceOption
        })
    };


    const fetchItemText = async () => {
        setIsLoading(true);
        //TODO user input send to generate
        console.log("requestOptions", requestOptions);
        const result = userInput;
        try {
            const response = await fetch('generateitem', requestOptions);
            console.log("fetch data", response);
            const data = await response.json();
            if (data) {
                setItemText(data.itemText);
                setIsLoading(false);
            }
        } catch (error) {
            console.error('Error fetching item text:', error);
        }
    };

    return (
        <Box
            component="form"
            sx={{
                '& .MuiTextField-root': { m: 1, width: '25ch' },
                '& .MuiFormControl-root': { m: 1, width: '25ch' },          
            }}
            noValidate
            autoComplete="off"
        >
            <div>
                <Box display="inline-flex" alignContent="center">
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
                <Box sx={{ '& #lengthtracker': { marginBottom: 1, marginLeft: 1, marginRight: 1, display: 'block', width: '25ch' }, }}>
                    <TextField
                        inputProps={{ maxLength: maxlengthRace }}
                        id="outlined-textarea"
                        label="Profession"
                        placeholder="Placeholder"
                        multiline
                        value={profInput}
                        onChange={handleProfessionChange}
                    />
                    <InfoWidget infoText={'Select the profession of the NPC you want to create. Leave this blank if you want The Forge to decide.'} />
                    <span id='lengthtracker'>
                        {maxlengthRace - profInput.length}/{maxlengthRace}
                    </span>
                </Box>
                <Box sx={{ '& #appearanceTracker': { marginBottom: 1, marginLeft: 1, marginRight: 1, display: 'block', width: '25ch' }, }}>
                    <TextField
                        inputProps={{ maxLength: maxLengthAppearance }}       
                        id="outlined-multiline-static"
                        label="Appearance"
                        multiline
                        rows={4}
                        value={appearanceInput}
                        onChange={handleAppearanceChange}
                    />
                    <span id='appearanceTracker'>
                        {maxLengthAppearance - appearanceInput.length}/{maxLengthAppearance}
                    </span>
                </Box>
            </div>
            <div>
                <TextField
                    id="filled-multiline-flexible"
                    label="Multiline"
                    multiline
                    maxRows={4}
                    variant="filled"
                />
                <TextField
                    id="filled-textarea"
                    label="Multiline Placeholder"
                    placeholder="Placeholder"
                    multiline
                    variant="filled"
                />
                <TextField
                    id="filled-multiline-static"
                    label="Multiline"
                    multiline
                    rows={4}
                    defaultValue="Default Value"
                    variant="filled"
                />
            </div>
            <div>
                <TextField
                    id="standard-multiline-flexible"
                    label="Multiline"
                    multiline
                    maxRows={4}
                    variant="standard"
                />
                <TextField
                    id="standard-textarea"
                    label="Multiline Placeholder"
                    placeholder="Placeholder"
                    multiline
                    variant="standard"
                />
                <TextField
                    id="standard-multiline-static"
                    label="Multiline"
                    multiline
                    rows={4}
                    defaultValue="Default Value"
                    variant="standard"
                />
            </div>
            <div>
                <Button variant="contained" color="primary" onClick={fetchItemText}>
                    Generate
                </Button>
            </div>
        </Box>
    );
};

export default NpcGenerateForm;