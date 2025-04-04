import Input from 'ui/input';
import Button from 'ui/button';
import SearchIcon from 'ui/icons/search-icon';

import { observer } from 'mobx-react-lite';
import { createContext, useEffect, useRef } from 'react';
import { useContextSafely } from 'hooks/use-context-safely';
import { FiltersStore } from 'stores/filters';
import { RecipeFiltersValues } from './types';

import classes from './recipes-filters.module.scss';
import MealCategorySelect from './meal-category-select';

const RecipesFilters: React.FC = observer(() => {
  const { filters } = useContextSafely(RecipesFiltersContext);
  const { name } = filters;

  const searchInputRef = useRef<HTMLInputElement>(null);

  const handleSearch = (event: React.FormEvent) => {
    event.preventDefault();

    if (searchInputRef.current) {
      name.setValue(searchInputRef.current.value);
    }
  };

  useEffect(() => {
    if (!name.value && searchInputRef.current) {
      searchInputRef.current.value = '';
    }
  }, [name.value]);

  return (
    <form className={classes.filters} onSubmit={handleSearch}>
      <div className={classes.searchRow}>
        <Input
          ref={searchInputRef}
          className={classes.searchInput}
          placeholder="Enter dishes"
          defaultValue={name.value}
        />
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
