import Skeleton from 'ui/skeleton';

import cn from 'classnames';

import classes from './meal-category-card-skeleton.module.scss';

interface Props {
  className?: string;
}

const MealCategoryCardSkeleton: React.FC<Props> = ({ className }) => (
  <Skeleton className={cn(classes.skeleton, className)} />
);

export default MealCategoryCardSkeleton;
