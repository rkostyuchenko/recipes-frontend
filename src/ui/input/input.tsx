import React from 'react';
import cn from 'classnames';

import classes from './input.module.scss';

export type InputProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'value'> & {
  /** Значение поля */
  value?: string;
  /** Callback, вызываемый при вводе данных в поле */
  onChange?: (value: string) => void;
  /** Слот для иконки справа */
  afterSlot?: React.ReactNode;
};

const Input = ({ ref, ...props }: InputProps & { ref?: React.RefObject<HTMLInputElement | null> }) => {
  const { className, value, afterSlot, onChange, ...inputProps } = props;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(event.target.value);
  };

  return (
    <div className={cn(classes.input, className)}>
      <input ref={ref} className={classes.control} type="text" value={value} onChange={handleChange} {...inputProps} />
      {afterSlot && <div className={classes.icon}>{afterSlot}</div>}
    </div>
  );
};

export default Input;
