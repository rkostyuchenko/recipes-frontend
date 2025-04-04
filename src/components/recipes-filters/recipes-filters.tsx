import Input from 'ui/input';
import Button from 'ui/button';
import SearchIcon from 'ui/icons/search-icon';

import { useRef } from 'react';

import classes from './recipes-filters.module.scss';

interface Props {
  onSearchChange: (search: string) => void;
}

const RecipesFilters: React.FC<Props> = (props) => {
  const { onSearchChange } = props;

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
    </form>
  );
};

export default RecipesFilters;
