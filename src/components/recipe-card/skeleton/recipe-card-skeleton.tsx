import Skeleton from 'ui/skeleton';

import classes from './recipe-card-skeleton.module.scss';

const RecipeCardSkeleton = () => (
  <div className={classes.skeleton}>
    <Skeleton className={classes.image} />
    <Skeleton className={classes.captionLine} />
    <Skeleton className={classes.captionLine} />
  </div>
);

export default RecipeCardSkeleton;
