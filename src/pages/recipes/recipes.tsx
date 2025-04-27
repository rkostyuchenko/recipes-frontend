import RecipeList from 'components/recipe-list';
import RecipesFilters, { RecipesFiltersContext } from 'components/recipes-filters';
import { PageSection, PageMargin } from 'components/page';
import Spacer from 'components/spacer';
import NoRecipesMessage from 'components/no-recipes-message';
import Text from 'ui/text';

import { useEffect } from 'react';
import { observer, useLocalObservable } from 'mobx-react-lite';
import { FiltersStore, FieldStore } from 'stores/filters';
import useRecipes from 'hooks/use-recipes';
import { useStore } from 'services/store';
import { useTypedQuery, useQueryUpdate } from 'hooks/use-query';
import { RecipeFiltersValues } from 'domain/recipes';
import { z } from 'zod';

type FilterValues = Required<Pick<RecipeFiltersValues, 'category' | 'name'>>;

const queryParamsSchema = z.object({
  page: z.coerce.number().default(1).catch(1),
  name: z.string().default(''),
  category: z
    .union([z.string().transform((x) => [x]), z.array(z.string())])
    .pipe(z.array(z.coerce.number()).catch([]))
    .default([]),
});

const RecipesPage: React.FC = observer(() => {
  const { page, name, category } = useTypedQuery(queryParamsSchema);
  const mealCategoriesStore = useStore('mealCategories');

  const recipeFiltersStore = useLocalObservable(
    () =>
      new FiltersStore<FilterValues>({
        name: new FieldStore('', name),
        category: new FieldStore([], category),
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
