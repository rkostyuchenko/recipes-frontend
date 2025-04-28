import Input from 'ui/input';
import Button from 'ui/button';

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

  const handleKeyUp = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className={classes.searchRow}>
      <Input
        ref={inputRef}
        className={classes.searchInput}
        placeholder="Enter dishes"
        defaultValue={defaultValue}
        onKeyUp={handleKeyUp}
      />
      <Button type="button" onClick={handleSearch}>
        Search
      </Button>
    </div>
  );
};

export default SearchRow;
