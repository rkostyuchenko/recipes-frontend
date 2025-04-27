import RecipeList from 'components/recipe-list';
import { PageSection, PageMargin } from 'components/page';

import { useEffect } from 'react';
import { observer, useLocalObservable } from 'mobx-react-lite';
import RecipesStore from 'stores/recipes';
import { useStore } from 'services/store';

const FavoritesPage = observer(() => {
  const recipesStore = useLocalObservable(() => new RecipesStore(1));
  const userStore = useStore('userStore');

  const { favorites } = userStore;
  const { fetchRecipesList, recipes, pagination, pageCount } = recipesStore;

  useEffect(() => {
    fetchRecipesList({ id: favorites });
  }, [favorites.length]);

  return (
    <PageSection>
      <PageMargin>
        {recipes.length ? (
          <RecipeList
            recipes={recipes}
            currentPage={pagination.pageNumber}
            totalPages={pageCount}
            onPageChange={() => {}}
          />
        ) : (
          'empty message'
        )}
      </PageMargin>
    </PageSection>
  );
});

export default FavoritesPage;
