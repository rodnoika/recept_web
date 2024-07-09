import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Dashboard from './Dashboard.jsx';
import RecipeDetail from './recept.jsx';
import CreateRecipe from './CreateRecipe.jsx';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/recipes/:id" element={<RecipeDetail />} />
        <Route path="/" element={<Dashboard />} />
        <Route path="/create-recipe" element={<CreateRecipe />} /> 
      </Routes>
    </BrowserRouter>
  );
}

export default App;
