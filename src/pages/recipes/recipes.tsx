import RecipeList from 'components/recipe-list';
import RecipesFilters, { RecipeFiltersValues, RecipesFiltersContext } from 'components/recipes-filters';
import { PageSection, PageMargin } from 'components/page';
import Banner from 'components/banner';
import Text from 'ui/text';
import Spacer from 'components/spacer';

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
        name: new FieldStore(name),
        category: new FieldStore(normalizedCategory),
      }),
  );

  const { updateParams } = recipesStore.pagination;
  const { filterValues } = recipeFiltersStore;

  useEffect(() => {
    mealCategoriesStore.fetchMealCategoriesList();
  }, []);

  useEffect(() => {
    recipesStore.fetchRecipesList(filterValues);
  }, [recipesStore.pagination.pageNumber, filterValues]);

  const handlePageChange = (page: number) => {
    updateParams({
      pageNumber: page,
    });
  };

  useQueryUpdate({
    page: `${recipesStore.pagination.pageNumber}`,
    ...filterValues,
  });

  return (
    <>
      <Banner />
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
                <RecipeList
                  recipes={recipesStore.recipes}
                  currentPage={recipesStore.pagination.pageNumber}
                  totalPages={recipesStore.pageCount}
                  onPageChange={handlePageChange}
                />
              </Spacer>
            </Spacer>
          )}
        </PageMargin>
      </PageSection>
    </>
  );
});

export default RecipesPage;
