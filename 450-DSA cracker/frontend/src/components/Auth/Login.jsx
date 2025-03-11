import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './Auth.css';

const Login = () => {
    const [loginDetails, setLoginDetails] = useState({
        username: '',
        password: '',
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setLoginDetails({ ...loginDetails, [name]: value });
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        const { username, password } = loginDetails;

        if (!username || !password) {
            alert('All fields are required');
            return;
        }

        try {
            const url = 'http://localhost:8080/auth/login';
            const response = await fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username: username, password: password }),
            });
                
            const result = await response.json();
            if (result.success) {
                alert('Login successful');
                sessionStorage.setItem('userData', JSON.stringify(result.data));
                navigate('/topicgrid');
            } else {
                alert(result.message);
            }
        } catch (err) {
            alert('Login failed: ' + err.message);
        }
    };

    return (
        <div className="signup-container">
            <h1>Login</h1>
            <form onSubmit={handleLogin}>
                <div className="input-group">
                    <label htmlFor="username"> USERNAME</label>
                        <input
                            type="text"
                            name="username"
                            placeholder="Enter your name"
                            value={loginDetails.username}
                            onChange={handleChange}
                        />
                </div>
                <div className="input-group">
                    <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            name="password"
                            placeholder="Enter your password"
                            value={loginDetails.password}
                            onChange={handleChange}
                        />
                </div>
                <button type="submit">Login</button>
            </form>
            <div className="signup-prompt">
                <p>Don't have an account? <Link to="/" className="link">Sign Up</Link></p>
            </div>
        </div>
    );
};

export default Login;
