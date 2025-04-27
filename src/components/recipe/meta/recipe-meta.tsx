import classes from '../recipe.module.scss';

const RecipeMeta: React.FC<React.PropsWithChildren> = ({ children }) => {
  return <dl className={classes.meta}>{children}</dl>;
};

export default RecipeMeta;
