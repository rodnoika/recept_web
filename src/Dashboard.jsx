import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import './Dasboard.css';
import { Link, useNavigate } from 'react-router-dom';

function Navbar() {
    return (
        <nav className="navbar">
            <div className="navbar-logo">Culinary Social</div>
            <ul className="navbar-links">
                <li><a href="/">Home</a></li>
                <li><a href="/recipes">Recipes</a></li>
                <li><a href="/profile">Profile</a></li>
            </ul>
        </nav>
    );
}

function RecipeList({ token }) {
    const [recipes, setRecipes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchUserRecipes = () => {
        if (token) {
            fetch('http://localhost:8000/recipes/me', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then(data => {
                    setRecipes(data);
                    setLoading(false);
                })
                .catch(error => {
                    setError(error.message);
                    setLoading(false);
                });
        }
    };

    useEffect(() => {
        fetchUserRecipes();
    }, [token]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="recipe-list">
            {recipes.map(recipe => (
                <Link to={`/recipes/${recipe.id}`} key={recipe.id}>
                    <div className="recipe-card">
                        <h3>{recipe.title}</h3>
                        <p>{recipe.ingredients}</p>
                    </div>
                </Link>
            ))}
        </div>
    );
}

function UserProfile({ onLogin }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        const response = await fetch('http://localhost:8000/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams({
                username,
                password
            })
        });
        const data = await response.json();
        if (response.ok) {
            onLogin(username, data.access_token);
        } else {
            alert(data.detail);
        }
    };

    return (
        <div className="user-profile">
            <h2>User Profile</h2>
            <form onSubmit={handleLogin}>
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit">Login</button>
            </form>
        </div>
    );
}

function Dashboard() {
    const [username, setUsername] = useState('');
    const [token, setToken] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const storedToken = Cookies.get('access_token');
        if (storedToken) {
            fetch('http://localhost:8000/users/me', {
                headers: {
                    'Authorization': `Bearer ${storedToken}`
                }
            })
                .then(response => response.json())
                .then(data => {
                    setUsername(data.username);
                    setToken(storedToken);
                })
                .catch(error => {
                    console.error('Error fetching user data', error);
                });
        }
    }, []);

    const handleLogin = (username, token) => {
        setUsername(username);
        setToken(token);
        Cookies.set('access_token', token);
    };

    const handleLogout = () => {
        setUsername('');
        setToken('');
        Cookies.remove('access_token');
    };

    return (
        <div className="app">
            <Navbar />
            <div className="content">
                {username ? (
                    <>
                        <button onClick={handleLogout}>Logout</button>
                        <button onClick={() => navigate('/create-recipe')}>Add Recipe</button>
                        <h1>My Recipes</h1>
                        <RecipeList token={token} />
                    </>
                ) : (
                    <UserProfile onLogin={handleLogin} />
                )}
            </div>
        </div>
    );
}

export default Dashboard;
