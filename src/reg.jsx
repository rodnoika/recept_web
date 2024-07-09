import React, { useState } from 'react';
import './reg.css';

export default function Reg() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch('http://127.0.0.1:8000/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });

            if (response.ok) {
                const data = await response.json();
                console.log('Registration successful:', data);
                // Можно добавить логику после успешной регистрации
                setErrorMessage(''); // Очистить сообщение об ошибке
            } else if (response.status === 400) {
                const errorData = await response.json();
                if (errorData.detail === 'Username already registered') {
                    setErrorMessage('Такой аккаунт уже есть');
                } else {
                    setErrorMessage('Ошибка регистрации');
                }
            } else {
                setErrorMessage('Ошибка регистрации');
            }
        } catch (error) {
            console.error('Error:', error);
            setErrorMessage('Ошибка регистрации');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="register-form">
            <h2>Регистрация</h2>
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
            <button type="submit">Зарегистрироваться</button>
            {errorMessage && <p className="error-message">{errorMessage}</p>}
        </form>
    );
}
