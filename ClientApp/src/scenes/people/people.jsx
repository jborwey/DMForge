import { Box, Button, IconButton, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import Header from "../../components/Header.jsx";
import React, { useState } from 'react';
import dragonImage from '../../assets/dragon.png'

// Define the People component
const People = () => {
  // Declare state for form fields
  const [appearance, setAppearance] = useState('');
  const [race, setRace] = useState('');
  const [statBlock, setStatBlock] = useState('');
  const [faction, setFaction] = useState('');

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    const npcData = {
      appearance,
      race,
      statBlock,
      faction,
    };

    // Process npcData here (e.g., save to database, display in another component, etc.)

    // Clear form fields
    setAppearance('');
    setRace('');
    setStatBlock('');
    setFaction('');
  };

  return (
    <div className="people">
      <h2>Create NPC</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Appearance:
          <input
            type="text"
            value={appearance}
            onChange={(e) => setAppearance(e.target.value)}
          />
        </label>
        <br />
        <label>
          Race:
          <input
            type="text"
            value={race}
            onChange={(e) => setRace(e.target.value)}
          />
        </label>
        <br />
        <label>
          Stat Block:
          <textarea
            value={statBlock}
            onChange={(e) => setStatBlock(e.target.value)}
          ></textarea>
        </label>
        <br />
        <label>
          Faction:
          <input
            type="text"
            value={faction}
            onChange={(e) => setFaction(e.target.value)}
          />
        </label>
        <br />
        <button type="submit">Create NPC</button>
      </form>
    </div>
  );
};

export default People;