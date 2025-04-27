import { Routes, Route } from 'react-router';

import HomePage from 'pages/home';
import RecipesPage from 'pages/recipes';
import RecipePage from 'pages/recipe';
import FavoritesPage from 'pages/favorites';

import DefaultLayout from 'layouts/default-layout';

const AppRoutes = () => (
  <Routes>
    <Route element={<DefaultLayout />}>
      <Route path="/" element={<HomePage />} />
      <Route path="/recipes" element={<RecipesPage />} />
      <Route path="/recipes/:recipeId" element={<RecipePage />} />
      <Route path="/favorites" element={<FavoritesPage />} />
    </Route>
  </Routes>
);

export default AppRoutes;
