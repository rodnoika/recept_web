import React, { useState } from 'react';
import './log.css';

function LoginForm(){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        // Ваша логика входа
        console.log('Login:', { email, password });
    };

    return (
        <form onSubmit={handleSubmit} className="login-form">
            <h2>Вход</h2>
            <div className="form-group">
                <label>Email</label>
                <input 
                    type="email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
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
