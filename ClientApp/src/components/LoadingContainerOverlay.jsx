import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { styled } from '@mui/system';

const LoadingContainerOverlay = ({loading, ...props}) => {

  const LoadingContainer = styled('div')`
    width: 50%;
    position: relative;
    display: inline-block;
  `;

  const LoadingOverlay = styled('div')`
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: center;
    align-items: center;
  `;

  return (
    <LoadingContainer>
      <TextField {...props} />
      {loading && (
        <LoadingOverlay>
          <CircularProgress size={48} />
        </LoadingOverlay>
      )}
    </LoadingContainer>
  );
};

export default LoadingContainerOverlay;