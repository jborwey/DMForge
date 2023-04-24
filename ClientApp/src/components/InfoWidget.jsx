// InfoWidget.jsx
import React, { useState } from 'react';
import { Box, Typography } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';

const InfoWidget = ({ infoText }) => {
    const [showTooltip, setShowTooltip] = useState(false);

    const handleMouseEnter = () => {
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
            top: 'calc(50%)',
            left: 30,
            backgroundColor: 'rgba(255, 255, 255, 0.7)', 
            color: 'background',
            opacity: 1, 
            padding: 1, 
            borderRadius: 1, 
            fontSize: 14,
            border: '1px solid',
            borderColor: 'border', 
            zIndex: 99999,
          }}
        >
          <Typography color={'black'} fontWeight="bold">{infoText}</Typography>   
        </Box>
      )}
    </Box>
  );
};

export default InfoWidget;