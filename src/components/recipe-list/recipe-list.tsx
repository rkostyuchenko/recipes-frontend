import Link from 'ui/link';
import RecipeCard from 'components/recipe-card';
import Pagination from 'components/pagination';
import Text from 'ui/text';
import ClockIcon from 'ui/icons/clock-icon';
import SaveButton from './save-button';

import { Recipe } from 'domain/recipes';

import classes from './recipe-list.module.scss';

interface Props {
  recipes: Recipe[];
  currentPage: number;
  totalPages?: number;
  onPageChange(page: number): void;
}

const RecipeList: React.FC<Props> = (props) => {
  const { recipes, currentPage, totalPages, onPageChange } = props;

  return (
    <div>
      <ul className={classes.list}>
        {recipes.map((recipe) => (
          <li key={recipe.documentId} className={classes.item}>
            <RecipeCard
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
              title={
                <Link to={`/recipes/${recipe.documentId}`} overlay>
                  {recipe.name}
                </Link>
              }
              actionSlot={<SaveButton recipeId={recipe.documentId} />}
            />
          </li>
        ))}
      </ul>
      {totalPages != null && totalPages > 0 && (
        <div className={classes.pagination}>
          <Pagination currentPage={currentPage} totalPages={totalPages} onChange={onPageChange} />
        </div>
      )}
    </div>
  );
};

export default RecipeList;
