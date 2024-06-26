import React, { useState } from 'react';
import './reg.css';

export default function Reg() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        // Ваша логика регистрации
        console.log('Register:', { name, email, password });
    };

    return (
        <form onSubmit={handleSubmit} className="register-form">
            <h2>Регистрация</h2>
            <div className="form-group">
                <label>Имя</label>
                <input 
                    type="text" 
                    value={name} 
                    onChange={(e) => setName(e.target.value)} 
                    required 
                />
            </div>
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
            <button type="submit">Зарегистрироваться</button>
        </form>
    );
};
