import React, { useState } from 'react';
import axios from 'axios';

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [token, setToken] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            const response = await axios.post('http://localhost:8080/authenticate', {
                username: username,
                password: password
            });

            setToken(response.data.jwt); // Assuming your AuthResponse has a 'jwt' field
            localStorage.setItem('token', response.data.jwt);
        } catch (error) {
            setError('Incorrect username or password');
        }
        console.log({
            username: username,
            password: password
        });
        
    };

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Username:</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Password:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Login</button>
            </form>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {token && <p>Logged in successfully! JWT Token: {token}</p>}
        </div>
    );
}

export default Login;
