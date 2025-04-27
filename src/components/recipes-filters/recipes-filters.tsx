import { observer } from 'mobx-react-lite';
import { createContext, useCallback } from 'react';
import { useContextSafely } from 'hooks/use-context-safely';
import { FiltersStore } from 'stores/filters';
import { RecipeFiltersValues } from './types';

import MealCategorySelect from './meal-category-select';

import classes from './recipes-filters.module.scss';
import SearchRow from 'components/search-row';

const RecipesFilters: React.FC = observer(() => {
  const filtersStore = useContextSafely(RecipesFiltersContext);
  const { filters } = filtersStore;

  const handleSearch = useCallback(
    (query: string) => {
      filters.name.setValue(query);
    },
    [filters.name],
  );

  return (
    <div className={classes.filters}>
      <SearchRow onSearch={handleSearch} defaultValue={filters.name.value} />
      <div className={classes.fieldsRow}>
        <MealCategorySelect />
      </div>
    </div>
  );
});

export default RecipesFilters;

export const RecipesFiltersContext = createContext<FiltersStore<RecipeFiltersValues> | undefined>(undefined);
RecipesFiltersContext.displayName = 'RecipesFiltersContext';
