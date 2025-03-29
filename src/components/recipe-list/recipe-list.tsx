import Card from 'ui/card';
import Pagination from 'components/pagination';
import Input from 'ui/input';
import Button from 'ui/button';
import SearchIcon from 'ui/icons/search-icon';

import { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router';
import useRequest from 'hooks/use-request';
import useQueryParam from 'hooks/use-query-param';
import qs from 'qs';

import classes from './recipe-list.module.scss';

type ImageFormat = 'thumbnail' | 'medium' | 'large';

type RecipeImage = {
  formats: {
    [key in ImageFormat]?: {
      url: string
    }
  }
};

type Recipe = {
  documentId: string
  calories: number
  cookingTime: number
  summary: string
  images: RecipeImage[]
  name: string
};

const pageSize = 9;

const RecipeList = () => {
  const navigate = useNavigate();

  const [page, setPage] = useQueryParam('page', 1);
  const [search, setSearch] = useQueryParam('q', '');
  const searchInputRef = useRef<HTMLInputElement>();

  const query = qs.stringify({
    populate: ['images'],
    pagination: {
      page,
      pageSize,
    },
    filters: {
      name: {
        $contains: search,
      }
    }
  });

  const {
    isFetching,
    data,
    error,
  } = useRequest<Recipe[]>(`/recipes?${query}`);

  if (isFetching) {
    return null;
  }

  if (error) {
    return null;
  }

  const handleSearch = (event: React.FormEvent) => {
    event.preventDefault();

    const search = searchInputRef.current?.value;
  
    setSearch(search);
    setPage(1);
  };

  const {
    data: recipes,
    meta: {
      pagination,
    }
  } = data!;

  return (
    <div>
      <div className={classes.filters}>
          <form
            className={classes.search}
            onSubmit={handleSearch}
          >
            <Input
              ref={searchInputRef}
              className={classes.searchInput}
              placeholder="Enter dishes"
            />
            <Button
             type="submit"
            >
              <SearchIcon/>
            </Button>
          </form>
      </div>
      <ul className={classes.list}>
        {recipes.map((recipe) => (
          <li
            key={recipe.documentId}
            className={classes.item}
          >
            <Card
              className={classes.card}
              image={recipe.images[0]?.formats.thumbnail?.url}
              captionSlot={recipe.cookingTime}
              title={recipe.name}
              subtitle={recipe.summary}
              contentSlot={recipe.calories}
              onClick={() => {
                navigate(`/${recipe.documentId}`)
              }}
            />
          </li>
        ))}
      </ul>
      <div className={classes.pagination}>
        <Pagination
          currentPage={page}
          totalPages={pagination.pageCount}
          onChange={setPage}
        />
      </div>
    </div>
  );
};

export default RecipeList;
