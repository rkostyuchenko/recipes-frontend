import MealCategoryCard from 'components/meal-category-card';
import MealCategoryCardSkeleton from 'components/meal-category-card/skeleton';

import { useMemo } from 'react';
import { observer } from 'mobx-react-lite';
import { useStore } from 'services/store';

import classes from './meal-category-list.module.scss';

const MealCategoryList: React.FC<React.PropsWithChildren> = observer(() => {
  const mealCategoriesStore = useStore('mealCategories');
  const { mealCategories } = mealCategoriesStore;

  const content = useMemo(() => {
    return mealCategories.map((mealCategory) => (
      <MealCategoryCard
        key={mealCategory.id}
        className={classes.item}
        as="li"
        thumbnail={mealCategory.image?.formats?.thumbnail?.url}
        caption={mealCategory.title}
        recipesCount={mealCategory.recipes.length}
        url={`/recipes/?category=${mealCategory.id}`}
      />
    ));
  }, [mealCategories]);

  const emptyContent = useMemo(() => {
    return Array(13)
      .fill(null)
      .map((_, index) => <MealCategoryCardSkeleton className={classes.item} key={index} />);
  }, []);

  return <ul className={classes.list}>{mealCategories.length ? content : emptyContent}</ul>;
});

export default MealCategoryList;
