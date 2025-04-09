import cn from 'classnames';

import classes from './pagination.module.scss';

interface Props {
  currentPage: number;
  totalPages: number;
  onChange: (page: number) => void;
}

const visibleSiblings = 2;
const clamp = '...' as const;

const makePagesList = (currentPage: number, totalPages: number) => {
  const pages = [];

  const left = currentPage - visibleSiblings;
  const right = currentPage + visibleSiblings + 1;

  for (let page = 1; page <= totalPages; page++) {
    if (page === 1 || page === totalPages || (page >= left && page < right)) {
      pages.push(page);
    }
  }

  const result: Array<number | typeof clamp> = [];
  let prev: number;

  pages.forEach((page) => {
    if (prev) {
      if (page - prev === 2) {
        result.push(prev + 1);
      } else if (page - prev !== 1) {
        result.push(clamp);
      }
    }

    result.push(page);
    prev = page;
  });

  return result;
};

const Pagination: React.FC<Props> = (props) => {
  const { currentPage, totalPages, onChange } = props;

  const pages = makePagesList(currentPage, totalPages);

  return (
    <ul className={classes.list}>
      {pages.map((page, index) => (
        <li className={classes.item} key={index}>
          {page === clamp ? (
            <span className={classes.clamp}>...</span>
          ) : (
            <button
              type="button"
              className={cn(classes.button, {
                [classes.active]: page === currentPage,
              })}
              onClick={() => {
                onChange(page);
              }}
            >
              {page}
            </button>
          )}
        </li>
      ))}
    </ul>
  );
};

export default Pagination;
