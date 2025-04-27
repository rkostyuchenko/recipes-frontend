import Link from 'ui/link';
import RecipeCard from 'components/recipe-card';
import Pagination from 'components/pagination';
import SaveButton from './save-button';

import { useMemo } from 'react';
import { Recipe } from 'domain/recipes';

import classes from './recipe-list.module.scss';
import RecipeCardSkeleton from 'components/recipe-card/skeleton';

interface Props {
  recipes: Recipe[];
  isLoading?: boolean;
  currentPage: number;
  totalPages?: number;
  onPageChange(page: number): void;
  skeletonCount: number;
}

const RecipeList: React.FC<Props> = (props) => {
  const { recipes, isLoading, currentPage, totalPages, onPageChange, skeletonCount } = props;

  const content = useMemo(() => {
    return recipes.map((recipe) => (
      <li key={recipe.documentId} className={classes.item}>
        <RecipeCard
          className={classes.card}
          image={recipe.images?.[0]?.formats?.thumbnail?.url}
          title={
            <Link to={`/recipes/${recipe.documentId}`} overlay>
              {recipe.name}
            </Link>
          }
          actionSlot={<SaveButton recipeId={recipe.documentId} />}
        />
      </li>
    ));
  }, [recipes]);

  const emptyContent = useMemo(() => {
    return Array(skeletonCount)
      .fill(null)
      .map((_, index) => (
        <li key={index} className={classes.item}>
          <RecipeCardSkeleton />
        </li>
      ));
  }, []);

  return (
    <div>
      <ul className={classes.list}>{isLoading ? emptyContent : content}</ul>
      {totalPages != null && totalPages > 0 && (
        <div className={classes.pagination}>
          <Pagination currentPage={currentPage} totalPages={totalPages} onChange={onPageChange} />
        </div>
      )}
    </div>
  );
};

export default RecipeList;
