import * as React from 'react';
import cn from 'classnames';

import classes from './text.module.scss';

export type Props = {
  /** Дополнительный класс */
  className?: string;
  /** Стиль отображения */
  variant?: 'header-1' | 'header-2' | 'caption-1' | 'body-1' | 'body-2' | 'body-3';
  /** Html-тег */
  as?: React.ElementType;
  /** Начертание шрифта */
  weight?: 'normal' | 'medium' | 'bold';
  /** Контент */
  children: React.ReactNode;
  /** Цвет */
  color?: 'primary' | 'secondary' | 'accent';
  /** Максимальное кол-во строк */
  maxLines?: number;
  align?: 'center' | 'end' | 'start';
};

const Text: React.FC<Props> = (props) => {
  const { className, as: Tag = 'p', variant, weight, color, maxLines, align, children } = props;

  return (
    <Tag
      className={cn(
        className,
        classes.text,
        {
          [classes.variantHeader1]: variant === 'header-1',
          [classes.variantHeader2]: variant === 'header-2',
          [classes.variantCaption1]: variant === 'caption-1',
          [classes.variantBody1]: variant === 'body-1',
          [classes.variantBody2]: variant === 'body-2',
          [classes.variantBody3]: variant === 'body-3',
        },
        {
          [classes.weightNormal]: weight === 'normal',
          [classes.weightMedium]: weight === 'medium',
          [classes.weightBold]: weight === 'bold',
        },
        {
          [classes.colorSecondary]: color === 'secondary',
          [classes.colorPrimary]: color === 'primary',
          [classes.colorAccent]: color === 'accent',
        },
        {
          [classes.alignCenter]: align === 'center',
          [classes.alignEnd]: align === 'end',
          [classes.alignStart]: align === 'start',
        },
        {
          [classes.clamped]: !!maxLines,
        },
      )}
      {...(maxLines
        ? {
            style: {
              '--max-lines': maxLines,
            } as React.CSSProperties,
          }
        : {})}
    >
      {children}
    </Tag>
  );
};

export default Text;
