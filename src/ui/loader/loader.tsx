import React from 'react';
import cn from 'classnames';

import classes from './loader.module.scss';

export type Props = {
  /** Размер */
  size?: 's' | 'm' | 'l';
  /** Дополнительный класс */
  className?: string;
};

const Loader: React.FC<Props> = (props) => {
  const { size = 'l', className } = props;

  return (
    <span
      className={cn(
        classes.loader,
        {
          [classes.sizeS]: size === 's',
          [classes.sizeM]: size === 'm',
          [classes.sizeL]: size === 'l',
        },
        className,
      )}
    />
  );
};

export default Loader;
