import React from 'react';
import { GoogleLogin } from 'react-google-login';

const clientId = '889072890550-v5nbgtju1ua5vg7q5hbdv8fraph0uk8r.apps.googleusercontent.com';

const onSuccess = (response) => {
  // Send the 'response.tokenId' to your C# backend for validation and user authentication
  console.log("google login success", response);
};

const onFailure = (response) => {
  // Handle login failure
  console.log("google login failure", response);
};

const GoogleLoginComponent = () => {
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