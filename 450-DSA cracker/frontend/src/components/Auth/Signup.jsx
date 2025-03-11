import React, { useState } from 'react';
import { useNavigate,Link } from 'react-router-dom';
import './Auth.css';

const Signup = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { username, password } = formData;

    if (!username || !password) {
      alert('All fields are required');
      return;
    }

    try {
      const url = `http://localhost:8080/auth/`;
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: username, password: password }),
      });

      const result = await response.json();

      if (result.success) {
        alert('Signup successful');
        navigate('/login');
      } else {
        alert(result.message);
      }
    } catch (err) {
      alert('Signup failed: ' + err.message);
    }
  };

  return (
    <div className="signup-container">
      <h1>Signup</h1>
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label htmlFor="username">USERNAME</label>
          <input
            type="text"
            name="username"
            placeholder="Enter your name"
            value={formData.username}
            onChange={handleChange}
          />
        </div>
        <div className="input-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Signup</button>
      </form>
      <div className="signup-prompt">
          <p>Already have an account? <Link to="/login" className="link">Login</Link></p>
      </div>
    </div>
  );
};

export default Signup;
