import Card from 'ui/card';
import Pagination from 'components/pagination';
import RawText from 'components/raw-text';
import Text from 'ui/text';
import ClockIcon from 'ui/icons/clock-icon';
import RecipesFilters from 'components/recipes-filters';
import { Option } from 'ui/multi-dropdown';

import { useNavigate } from 'react-router';
import useRequest from 'hooks/use-request';
import useQueryParam from 'hooks/use-query-param';
import qs from 'qs';

import classes from './recipe-list.module.scss';

type ImageFormat = 'thumbnail' | 'medium' | 'large';

type RecipeImage = {
  formats: {
    [key in ImageFormat]?: {
      url: string;
    };
  };
};

type Recipe = {
  documentId: string;
  calories: number;
  cookingTime: number;
  summary: string;
  images: RecipeImage[];
  name: string;
};

const pageSize = 9;

const RecipeList = () => {
  const navigate = useNavigate();

  const [page, setPage] = useQueryParam('page', 1);
  const [search, setSearch] = useQueryParam('q', '');
  const [mealType, setMealType] = useQueryParam('meal_type', []);

  const query = qs.stringify({
    populate: ['images'],
    pagination: {
      page,
      pageSize,
    },
    filters: {
      name: {
        $contains: search,
      },
    },
  });

  const { isFetching, data, error } = useRequest<Recipe[]>(`/recipes?${query}`);

  if (isFetching) {
    return null;
  }

  if (error) {
    return null;
  }

  const handleSearch = (search: string) => {
    setSearch(search);
    setPage(1);
  };

  const handleMealTypeChange = (value: Option[]) => {
    setMealType(value.map(({ value }) => value));
  };

  const {
    data: recipes,
    meta: { pagination },
  } = data!;

  return (
    <div>
      <RecipesFilters onSearchChange={handleSearch} mealType={mealType} onMealTypeChange={handleMealTypeChange} />
      <ul className={classes.list}>
        {recipes.map((recipe) => (
          <li key={recipe.documentId} className={classes.item}>
            <Card
              className={classes.card}
              image={recipe.images[0]?.formats.thumbnail?.url}
              captionSlot={
                <>
                  <ClockIcon className={classes.cookingTimeIcon} width={12} height={12} color="accent" />
                  <Text weight="medium" tag="span">
                    {`${recipe.cookingTime} minutes`}
                  </Text>
                </>
              }
              title={recipe.name}
              subtitle={<RawText text={recipe.summary} />}
              contentSlot={
                <Text view="p-18" color="accent" weight="bold" tag="span">
                  {`${recipe.calories} kcal`}
                </Text>
              }
              onClick={() => {
                navigate(`/${recipe.documentId}`);
              }}
            />
          </li>
        ))}
      </ul>
      <div className={classes.pagination}>
        <Pagination currentPage={page} totalPages={pagination.pageCount} onChange={setPage} />
      </div>
    </div>
  );
};

export default RecipeList;
