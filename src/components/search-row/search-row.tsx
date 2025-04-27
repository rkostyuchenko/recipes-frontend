import Input from 'ui/input';
import Button from 'ui/button';
import SearchIcon from 'ui/icons/search-icon';

import { useRef } from 'react';

import classes from './search-row.module.scss';

interface Props {
  as?: React.ElementType;
  defaultValue?: string;
  onSearch(query: string): void;
}

const SearchRow: React.FC<Props> = (props) => {
  const { defaultValue = '', onSearch } = props;

  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleSearch = () => {
    if (inputRef.current) {
      onSearch(inputRef.current.value);
    }
  };

  return (
    <div className={classes.searchRow}>
      <Input ref={inputRef} className={classes.searchInput} placeholder="Enter dishes" defaultValue={defaultValue} />
      <Button type="submit" onClick={handleSearch}>
        <SearchIcon />
      </Button>
    </div>
  );
};

export default SearchRow;
