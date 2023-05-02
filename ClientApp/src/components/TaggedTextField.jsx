import React, { useState, useEffect, useRef } from 'react';
import TextField from '@mui/material/TextField';
import Chip from '@mui/material/Chip';
import Autocomplete from '@mui/material/Autocomplete';
import Box from '@mui/material/Box';

const TaggedTextField = () => {
    const [inputValue, setInputValue] = useState('');
    const [chips, setChips] = useState([]);
    const [open, setOpen] = useState(false);
    const inputRef = useRef();

    useEffect(() => {
        if (inputValue.endsWith('@')) {
            setOpen(true);
        } else {
            setOpen(false);
        }
    }, [inputValue]);

    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    };

    const handleChipAdd = (option) => {
        setChips((prevChips) => [...prevChips, option]);
        setInputValue(inputValue.replace(/@\w*$/, option + ' '));
        setOpen(false);
    };

    const handleChipDelete = (chipToDelete) => {
        setChips((prevChips) => prevChips.filter((chip) => chip !== chipToDelete));
    };

    const options = ['Person', 'Place', 'Item'];

    return (
        <div>
            <TextField
                fullWidth
                inputRef={inputRef}
                value={inputValue}
                onChange={handleInputChange}
                label="Tagged Text"
            />
            <Box sx={{ position: 'relative' }}>
                <Autocomplete
                    open={open}
                    onClose={() => setOpen(false)}
                    options={options}
                    freeSolo
                    value={null}
                    onChange={(event, newValue) => {
                        if (newValue) {
                            handleChipAdd(newValue);
                        }
                    }}
                    renderInput={(params) => <TextField {...params} style={{ display: 'none' }} />}
                />
            </Box>
            {chips.map((chip) => (
                <Chip key={chip} label={chip} onDelete={() => handleChipDelete(chip)} />
            ))}
        </div>
    );
};

export default TaggedTextField;
