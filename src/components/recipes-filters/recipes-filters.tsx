import Input from 'ui/input';
import Button from 'ui/button';
import MultiDropdown, { Option } from 'ui/multi-dropdown';
import SearchIcon from 'ui/icons/search-icon';

import { useRef } from 'react';
import MEAL_TYPES from 'constants/meal-types';

import classes from './recipes-filters.module.scss';

interface Props {
  onSearchChange: (search: string) => void;
  mealType: MEAL_TYPES[];
  onMealTypeChange: (value: Option[]) => void;
}

const makeMealTypeOption = (mealType: MEAL_TYPES) => ({
  key: mealType,
  value: mealType,
});

const mealTypeOptions = Object.values(MEAL_TYPES).map(makeMealTypeOption);

const getMealTypeTitle = (value: Option[]) => {
  if (!value.length) {
    return 'Categories';
  }

  return value.map(({ value }) => value).join(', ');
};

const RecipesFilters: React.FC<Props> = (props) => {
  const { onSearchChange, mealType, onMealTypeChange } = props;

  const searchInputRef = useRef<HTMLInputElement>(null);

  const handleSearch = (event: React.FormEvent) => {
    event.preventDefault();

    if (!searchInputRef.current) {
      return;
    }

    const search = searchInputRef.current?.value;

    onSearchChange(search);
  };

  return (
    <form className={classes.filters} onSubmit={handleSearch}>
      <div className={classes.searchRow}>
        <Input ref={searchInputRef} className={classes.searchInput} placeholder="Enter dishes" />
        <Button type="submit">
          <SearchIcon />
        </Button>
      </div>
      <div className={classes.fieldsRow}>
        <MultiDropdown
          options={mealTypeOptions}
          value={mealType.map(makeMealTypeOption)}
          onChange={onMealTypeChange}
          getTitle={getMealTypeTitle}
        />
      </div>
    </form>
  );
};

export default RecipesFilters;
