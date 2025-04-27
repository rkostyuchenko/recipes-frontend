import { Routes, Route } from 'react-router';

import RecipesPage from 'pages/recipes';
import RecipePage from 'pages/recipe';
import FavoritesPage from 'pages/favorites';

import DefaultLayout from 'layouts/default-layout';

const AppRoutes = () => (
  <Routes>
    <Route element={<DefaultLayout />}>
      <Route path="/" element={<RecipesPage />} />
      <Route path="/:recipeId" element={<RecipePage />} />
      <Route path="/favorites" element={<FavoritesPage />} />
    </Route>
  </Routes>
);

export default AppRoutes;
