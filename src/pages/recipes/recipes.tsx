import RecipeList from 'components/recipe-list';
import RecipesFilters, { RecipesFiltersContext } from 'components/recipes-filters';
import { PageSection, PageMargin } from 'components/page';
import Spacer from 'components/spacer';
import NoRecipesMessage from 'components/no-recipes-message';
import Text from 'ui/text';

import { useEffect, useMemo } from 'react';
import { observer, useLocalObservable } from 'mobx-react-lite';
import { FiltersStore, FieldStore } from 'stores/filters';
import useRecipes from 'hooks/use-recipes';
import { useStore } from 'services/store';
import { useQuery, useQueryUpdate } from 'hooks/use-query';
import { RecipeFiltersValues } from 'domain/recipes';

const RecipesPage: React.FC = observer(() => {
  const { page, name, category } = useQuery() as { page: number } & RecipeFiltersValues;
  const normalizedCategory = useMemo(() => (Array.isArray(category) ? category : [category]), [category]);
  const mealCategoriesStore = useStore('mealCategories');

  const recipeFiltersStore = useLocalObservable(
    () =>
      new FiltersStore<RecipeFiltersValues>({
        name: new FieldStore('', name),
        category: new FieldStore([], normalizedCategory),
      }),
  );
  const { filterValues, clearFilters } = recipeFiltersStore;

  const { isLoading, isCompleted, recipes, pageCount, pagination, handlePageChange } = useRecipes(page, filterValues);

  useEffect(() => {
    mealCategoriesStore.fetchMealCategoriesList();
  }, []);

  useQueryUpdate({
    page: `${pagination.pageNumber}`,
    ...filterValues,
  });

  return (
    <PageSection>
      <PageMargin>
        <Text variant="header-2" as="h1" color="accent">
          Recipes
        </Text>
        <Spacer top={32}>
          <RecipesFiltersContext value={recipeFiltersStore}>
            <RecipesFilters />
          </RecipesFiltersContext>
          <Spacer top={48}>
            {isCompleted && !recipes.length ? (
              <NoRecipesMessage onClearFiltersClick={clearFilters} />
            ) : (
              <RecipeList
                recipes={recipes}
                isLoading={isLoading}
                currentPage={pagination.pageNumber}
                totalPages={pageCount}
                onPageChange={handlePageChange}
                skeletonCount={9}
              />
            )}
          </Spacer>
        </Spacer>
      </PageMargin>
    </PageSection>
  );
});

export default RecipesPage;
