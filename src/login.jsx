import React, { useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import './log.css';

function LoginForm({ onLoginSuccess }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('http://127.0.0.1:8000/login', {
                username,
                password
            });
            if (response.status === 200) {
                const data = response.data;
                Cookies.set('access_token', data.access_token);
                onLoginSuccess(username, data.access_token);
                alert('Login successful');
            }
        } catch (error) {
            console.error('Login error', error);
            alert('Invalid username or password');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="login-form">
            <h2>Вход</h2>
            <div className="form-group">
                <label>Имя пользователя</label>
                <input 
                    type="text" 
                    value={username} 
                    onChange={(e) => setUsername(e.target.value)} 
                    required 
                />
            </div>
            <div className="form-group">
                <label>Пароль</label>
                <input 
                    type="password" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    required 
                />
            </div>
            <button type="submit">Войти</button>
        </form>
    );
};

export default LoginForm;
