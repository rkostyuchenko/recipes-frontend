import { LinkProps } from 'react-router';
import cn from 'classnames';
import pluralize from 'utils/pluralize';

import Link from 'ui/link';

import classes from './meal-category-card.module.scss';

interface Props {
  as?: React.ElementType;
  className?: string;
  caption: string;
  recipesCount?: number;
  thumbnail?: string;
  url: LinkProps['to'];
}

const MealCategoryCard: React.FC<Props> = (props) => {
  const { as: Component = 'div', className, caption, recipesCount, thumbnail, url } = props;

  const style = {
    ...(thumbnail && { '--background-image': `url(${thumbnail})` }),
    ...(recipesCount && { '--recipes-count': `"${pluralize(recipesCount, 'recipe')}"` }),
  } as React.CSSProperties;

  return (
    <Component className={cn(classes.card, className)} style={style}>
      <Link overlay className={classes.link} to={url} style={style}>
        {caption}
      </Link>
    </Component>
  );
};

export default MealCategoryCard;
