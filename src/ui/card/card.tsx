import React from 'react';
import Text from 'ui/text';

import cn from 'classnames';

import classes from './card.module.scss';

export type Props = {
  /** Дополнительный classname */
  className?: string;
  /** URL изображения */
  image?: string;
  /** Слот над заголовком */
  captionSlot?: React.ReactNode;
  /** Заголовок карточки */
  title: React.ReactNode;
  /** Описание карточки */
  subtitle: React.ReactNode;
  /** Содержимое карточки (футер/боковая часть), может быть пустым */
  contentSlot?: React.ReactNode;
  /** Клик на карточку */
  onClick?: React.MouseEventHandler;
  /** Слот для действия */
  actionSlot?: React.ReactNode;
};

const Card: React.FC<Props> = (props) => {
  const { image, captionSlot, title, subtitle, contentSlot, actionSlot, onClick, className } = props;

  return (
    <article className={cn(classes.card, className)} onClick={onClick}>
      <span className={classes.imageWrap}>
        <img className={classes.image} src={image} alt="" />
      </span>
      <div className={classes.contentWrap}>
        {captionSlot && (
          <Text className={classes.caption} view="p-14" color="secondary" maxLines={1}>
            {captionSlot}
          </Text>
        )}
        <Text className={classes.title} view="p-20" maxLines={2}>
          {title}
        </Text>
        <Text className={classes.subtitle} view="p-16" color="secondary" maxLines={3} tag="div">
          {subtitle}
        </Text>
        {(actionSlot || contentSlot) && (
          <div className={classes.footer}>
            {contentSlot && (
              <Text className={classes.content} view="p-18">
                {contentSlot}
              </Text>
            )}
            {actionSlot && <span className={classes.action}>{actionSlot}</span>}
          </div>
        )}
      </div>
    </article>
  );
};

export default Card;
