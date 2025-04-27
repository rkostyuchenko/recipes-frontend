import Input from 'ui/input';
import Button from 'ui/button';
import SearchIcon from 'ui/icons/search-icon';

import { observer } from 'mobx-react-lite';
import { createContext, useCallback, useState } from 'react';
import { useContextSafely } from 'hooks/use-context-safely';
import { FiltersStore } from 'stores/filters';
import { RecipeFiltersValues } from './types';

import MealCategorySelect from './meal-category-select';

import classes from './recipes-filters.module.scss';

const RecipesFilters: React.FC = observer(() => {
  const filtersStore = useContextSafely(RecipesFiltersContext);
  const { filters } = filtersStore;

  const [search, setSearch] = useState(filters.name.value);

  const handleSearch = useCallback(
    (event: React.FormEvent) => {
      event.preventDefault();

      filters.name.setValue(search);
    },
    [filters.name, search],
  );

  const searchInputProps = {
    value: search,
    onChange: setSearch,
  };

  return (
    <form className={classes.filters} onSubmit={handleSearch}>
      <div className={classes.searchRow}>
        <Input className={classes.searchInput} placeholder="Enter dishes" {...searchInputProps} />
        <Button type="submit">
          <SearchIcon />
        </Button>
      </div>
      <div className={classes.fieldsRow}>
        <MealCategorySelect />
      </div>
    </form>
  );
});

export default RecipesFilters;

export const RecipesFiltersContext = createContext<FiltersStore<RecipeFiltersValues> | undefined>(undefined);
RecipesFiltersContext.displayName = 'RecipesFiltersContext';
