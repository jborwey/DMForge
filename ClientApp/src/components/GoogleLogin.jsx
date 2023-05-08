import React, { useState } from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { Navigate } from 'react-router-dom';

const clientId = '889072890550-v5nbgtju1ua5vg7q5hbdv8fraph0uk8r.apps.googleusercontent.com';

const GoogleLoginComponent = ({ onAuthentication }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  const onSuccess = (response) => {
    console.log("google login success", response);
    if (typeof onAuthentication === 'function') {
      onAuthentication(true);
    }
  };

  const onFailure = (response) => {
    // Handle login failure
    console.log("google login failure", response);
    if (typeof onAuthentication === 'function') {
      onAuthentication(false);
    }
  };

  return (
    <div>
      <GoogleLogin
        clientId={clientId}
        buttonText="Login with Google"
        onSuccess={onSuccess}
        onFailure={onFailure}
        cookiePolicy={'single_host_origin'}
      />
    </div>
  );
};

export default GoogleLoginComponent;
