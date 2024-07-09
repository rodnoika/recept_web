import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Cookies from 'js-cookie';
import './recept.css';

function RecipeDetail() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const token = Cookies.get('access_token');

  useEffect(() => {
    if (token) {
      fetch(`http://localhost:8000/recipes/${id}`, {
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
        .then(data => setRecipe(data))
        .catch(error => console.error('Error fetching recipe:', error));
    } else {
      console.error('No token found');
    }
  }, [id, token]);

  if (!recipe) return <div>Loading...</div>;

  return (
    <div className="recipe-detail">
      <h1 className="recipe-title">{recipe.title}</h1>
      <ul className="recipe-ingredients">
        {recipe.ingredients && recipe.ingredients.split(',').map((ingredient, index) => (
          <li key={index}>{ingredient}</li>
        ))}
      </ul>
      <div className="recipe-description" dangerouslySetInnerHTML={{ __html: recipe.description }} />
    </div>
  );
}

export default RecipeDetail;
