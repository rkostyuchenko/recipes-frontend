import React from 'react';
import cn from 'classnames';

import Loader from '../loader';
import Text from '../text';

import classes from './button.module.scss';

export type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  /** Состояние загрузки */
  loading?: boolean;
  /** Текст кнопки */
  children: React.ReactNode;
};

const Button: React.FC<Props> = (props) => {
  const { className, loading, disabled, children, ...restProps } = props;

  return (
    <button
      className={cn(
        classes.button,
        {
          [classes.loading]: loading,
          [classes.disabled]: disabled,
        },
        className,
      )}
      disabled={loading || disabled}
      {...restProps}
    >
      {loading && <Loader className={cn(classes.loader, classes.icon)} size="s" />}
      <Text view="button" tag="span">
        {children}
      </Text>
    </button>
  );
};

export default Button;
