import React from 'react';
import Text from 'ui/text';

import cn from 'classnames';

import classes from './recipe-card.module.scss';

export type Props = {
  /** Дополнительный classname */
  className?: string;
  /** URL изображения */
  image?: string;
  /** Заголовок карточки */
  title: React.ReactNode;
  /** Клик на карточку */
  onClick?: React.MouseEventHandler;
  /** Слот для действия */
  actionSlot?: React.ReactNode;
};

const RecipeCard: React.FC<Props> = (props) => {
  const { image, title, actionSlot, onClick, className } = props;

  return (
    <article className={cn(classes.card, className)} onClick={onClick}>
      <span className={classes.imageWrap}>
        <img className={classes.image} src={image} alt="" />
      </span>
      <div className={classes.contentWrap}>
        <Text className={classes.caption} variant="body-1" as="p">
          {title}
        </Text>
        {actionSlot && <span className={classes.action}>{actionSlot}</span>}
      </div>
    </article>
  );
};

export default RecipeCard;
