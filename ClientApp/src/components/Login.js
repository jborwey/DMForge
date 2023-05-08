import React from 'react';
import { useForm } from 'react-hook-form';

const Login = () => {
    const { register, handleSubmit } = useForm();

    const onSubmit = (data) => {
        console.log(data);
        // Submit login data to your API and handle the response
    };

    return (
        <div className="login-form">
            <h2>Login</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <input
                    type="text"
                    placeholder="Username"
                    {...register('username', { required: true })}
                />
                <input
                    type="password"
                    placeholder="Password"
                    {...register('password', { required: true })}
                />
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default Login;