// InfoWidget.jsx
import React, { useState } from 'react';
import { Box } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';

const InfoWidget = ({ infoText }) => {
    const [showTooltip, setShowTooltip] = useState(false);

    const handleMouseEnter = () => {
      console.log("infotext: ", infoText);
      setShowTooltip(true);
    };

    const handleMouseLeave = () => {
      setShowTooltip(false);
    };

  return (
    <Box
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      sx={{
        position: 'relative',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
      }}
    >
      <Box>
        <InfoIcon />
      </Box>
      {showTooltip && (
        <Box
          sx={{
            position: 'absolute',
            width: 'max-content',
            top: 'calc(80%)',
            left: 0,
            backgroundColor: 'primary', 
            color: 'background', 
            padding: 1, 
            borderRadius: 1, 
            fontSize: 12, 
            zIndex: 99999,
          }}
        >
          {infoText}
        </Box>
      )}
    </Box>
  );
};

export default InfoWidget;