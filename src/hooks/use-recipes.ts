import { useEffect } from 'react';
import { useLocalObservable } from 'mobx-react-lite';
import RecipesStore from 'stores/recipes';
import { RecipeFiltersValues } from 'domain/recipes';

const useRecipes = (page: number, filterValues: RecipeFiltersValues) => {
  const recipesStore = useLocalObservable(() => new RecipesStore(page));

  const { fetchRecipesList, isLoading, isCompleted, recipes, pageCount, pagination } = recipesStore;

  useEffect(() => {
    fetchRecipesList(filterValues);
  }, [pagination.pageNumber, filterValues]);

  const handlePageChange = (page: number) => {
    pagination.updateParams({
      pageNumber: page,
    });
  };

  return {
    isLoading,
    isCompleted,
    recipes,
    pageCount,
    pagination,
    handlePageChange,
  };
};

export default useRecipes;
