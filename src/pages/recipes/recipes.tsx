import RecipeList from 'components/recipe-list';
import RecipesFilters, { RecipeFiltersValues, RecipesFiltersContext } from 'components/recipes-filters';
import { PageSection, PageMargin } from 'components/page';
import Banner from 'components/banner';
import Text from 'ui/text';
import Spacer from 'components/spacer';
import NoRecipesMessage from 'components/no-recipes-message';

import { useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router';
import { observer, useLocalObservable } from 'mobx-react-lite';
import RecipesStore from 'stores/recipes';
import { FiltersStore, FieldStore } from 'stores/filters';
import { useStore } from 'services/store';
import qs from 'query-string';

const useQuery = () => {
  const [searchParams] = useSearchParams();
  const query = qs.parse(searchParams.toString(), {
    parseNumbers: true,
    types: {
      page: 'number',
      category: 'number[]',
    },
    arrayFormat: 'comma',
  });

  return query as { page: number } & RecipeFiltersValues;
};

const useQueryUpdate = (newQuery: Record<string, string | number[]>) => {
  const [, setSearchParams] = useSearchParams();

  const query = useQuery();
  const search = qs.stringify(
    {
      ...query,
      ...newQuery,
    },
    {
      skipEmptyString: true,
      arrayFormat: 'comma',
    },
  );

  useEffect(() => {
    setSearchParams(new URLSearchParams(search), { replace: true });
  }, [search]);
};

const RecipesPage: React.FC = observer(() => {
  const { name, category, page } = useQuery();
  const normalizedCategory = useMemo(() => (Array.isArray(category) ? category : [category]), [category]);
  const mealCategoriesStore = useStore('mealCategories');
  const recipesStore = useLocalObservable(() => new RecipesStore(page));
  const recipeFiltersStore = useLocalObservable(
    () =>
      new FiltersStore<RecipeFiltersValues>({
        name: new FieldStore('', name),
        category: new FieldStore([], normalizedCategory),
      }),
  );

  const { fetchRecipesList, pagination } = recipesStore;
  const { filterValues, clearFilters } = recipeFiltersStore;

  useEffect(() => {
    mealCategoriesStore.fetchMealCategoriesList();
  }, []);

  useEffect(() => {
    fetchRecipesList(filterValues);
  }, [pagination.pageNumber, filterValues]);

  useEffect(() => {
    console.debug('filterValues changed');
  }, [filterValues]);

  const handlePageChange = (page: number) => {
    pagination.updateParams({
      pageNumber: page,
    });
  };

  useQueryUpdate({
    page: `${recipesStore.pagination.pageNumber}`,
    ...filterValues,
  });

  return (
    <>
      <PageMargin>
        <Banner />
      </PageMargin>
      <PageSection>
        <PageMargin>
          <Text view="p-20" align="center">
            Find the perfect food and drink ideas for every occasion, from weeknight dinners to holiday feasts.
          </Text>
          {recipesStore.isCompleted && (
            <Spacer top={48}>
              <RecipesFiltersContext value={recipeFiltersStore}>
                <RecipesFilters />
              </RecipesFiltersContext>
              <Spacer top={48}>
                {recipesStore.recipes.length ? (
                  <RecipeList
                    recipes={recipesStore.recipes}
                    currentPage={recipesStore.pagination.pageNumber}
                    totalPages={recipesStore.pageCount}
                    onPageChange={handlePageChange}
                  />
                ) : (
                  <NoRecipesMessage onClearFiltersClick={clearFilters} />
                )}
              </Spacer>
            </Spacer>
          )}
        </PageMargin>
      </PageSection>
    </>
  );
});

export default RecipesPage;
