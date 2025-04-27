import RecipeList from 'components/recipe-list';
import { PageSection, PageMargin } from 'components/page';
import Text from 'ui/text';
import Spacer from 'components/spacer';

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
        <Text variant="header-2" as="h1" color="accent">
          Favorites
        </Text>
        <Spacer top={32}>
          {recipes.length ? (
            <RecipeList
              recipes={recipes}
              currentPage={pagination.pageNumber}
              totalPages={pageCount}
              onPageChange={() => {}}
            />
          ) : (
            'empty'
          )}
        </Spacer>
      </PageMargin>
    </PageSection>
  );
});

export default FavoritesPage;
