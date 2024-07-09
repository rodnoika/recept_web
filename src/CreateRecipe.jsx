import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import './CreateRecipe.css';

function CreateRecipe() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [ingredients, setIngredients] = useState('');
    const navigate = useNavigate();

    const handleDescriptionChange = (value) => {
        setDescription(value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const token = Cookies.get('access_token');
        const newRecipe = {
            title,
            description,
            ingredients
        };
        fetch('http://localhost:8000/recipes/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(newRecipe),
        })
            .then(response => response.json())
            .then(data => {
                console.log('Recipe added:', data);
                navigate('/'); // Redirect to the dashboard after creation
            })
            .catch(error => {
                console.error('Error:', error);
            });

    };

    return (
        <div className="create-recipe">
            <h2>Create New Recipe</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="title">Title</label>
                    <input
                        type="text"
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="ingredients">Ingredients</label>
                    <input
                        type="text"
                        id="ingredients"
                        value={ingredients}
                        onChange={(e) => setIngredients(e.target.value)}
                        placeholder="Enter ingredients separated by commas"
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="content">Content</label>
                    <ReactQuill
                        value={description}
                        onChange={handleDescriptionChange}
                        modules={CreateRecipe.modules}
                        formats={CreateRecipe.formats}
                        placeholder="Write your recipe here..."
                    />
                </div>
                <button type="submit" className="submit-button">Create Recipe</button>
            </form>
        </div>
    );
}

CreateRecipe.modules = {
    toolbar: [
        [{ 'header': '1' }, { 'header': '2' }, { 'font': [] }],
        [{ 'list': 'ordered' }, { 'list': 'bullet' }],
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        ['link', 'image', 'video'],
        [{ 'align': [] }],
        ['clean']
    ],
};

CreateRecipe.formats = [
    'header', 'font', 'list', 'bullet',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'link', 'image', 'video', 'align'
];

export default CreateRecipe;
