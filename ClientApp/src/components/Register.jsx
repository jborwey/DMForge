// Register.js

import React from 'react';
import { useForm } from 'react-hook-form';
import {
  Box,
  Button,
  Container,
  FormControl,
  InputLabel,
  Input,
  FormHelperText,
  Typography,
} from '@mui/material';

const Register = (props) => {
  const { register, handleSubmit, formState: { errors }, watch } = useForm();

  const onSubmit = async (data) => {
    console.log("register", data);
    try {
      const response = await fetch('/api/user/register', data);
      console.log(response);
      // Show a success message to the user
      // Navigate to the login screen or another appropriate screen
    } catch (error) {
      console.error(error);
      // Handle errors (e.g., show an error message to the user)
    }
  };

  const password = watch('password', '');

  return (
    <Container maxWidth="sm">
      <Box mt={4} mb={2}>
        <Typography variant="h4" align="center">Create a User</Typography>
      </Box>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl fullWidth margin="normal" error={errors.email}>
          <InputLabel htmlFor="email">Email Address</InputLabel>
          <Input
            id="email"
            type="email"
            {...register('email', {
              required: 'Email Address is required',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                message: 'Invalid email address',
              },
            })}
          />
          {errors.email && <FormHelperText>{errors.email.message}</FormHelperText>}
        </FormControl>
        <FormControl fullWidth margin="normal" error={errors.username}>
          <InputLabel htmlFor="username">Username</InputLabel>
          <Input
            id="username"
            {...register('username', { required: 'Username is required' })}
          />
          {errors.username && <FormHelperText>{errors.username.message}</FormHelperText>}
        </FormControl>
        <FormControl fullWidth margin="normal" error={errors.password}>
          <InputLabel htmlFor="password">Password</InputLabel>
          <Input
            id="password"
            type="password"
            {...register('password', { required: 'Password is required' })}
          />
          {errors.password && <FormHelperText>{errors.password.message}</FormHelperText>}
        </FormControl>
        <FormControl fullWidth margin="normal" error={errors.retypePassword}>
          <InputLabel htmlFor="retype-password">Retype Password</InputLabel>
          <Input
            id="retype-password"
            type="password"
            {...register('retypePassword', {
              required: 'Retype Password is required',
              validate: (value) =>
                value === password || 'Passwords do not match',
            })}
          />
          {errors.retypePassword && (
            <FormHelperText>{errors.retypePassword.message}</FormHelperText>
          )}
        </FormControl>
        <Box mt={2}>
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Register
          </Button>
        </Box>
      </form>
    </Container>
  );
};

export default Register;
