import { Routes, Route } from 'react-router';
import RecipesPage from 'pages/recipes';
import DefaultLayout from 'layouts/default-layout';

const AppRoutes = () => (
  <Routes>
    <Route element={<DefaultLayout/>}>
      <Route path="/" element={<RecipesPage/>}/>
    </Route>
  </Routes>
);

export default AppRoutes;
