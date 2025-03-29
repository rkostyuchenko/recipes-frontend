import * as React from 'react';
import cn from 'classnames';

import classes from './text.module.scss';

export type Props = {
    /** Дополнительный класс */
    className?: string;
    /** Стиль отображения */
    view?: 'title' | 'button' | 'p-20' | 'p-18' | 'p-16' | 'p-14';
    /** Html-тег */
    tag?:  'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'div' | 'p' | 'span';
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
  const {
    className,
    tag: Tag = 'p',
    view,
    weight,
    color,
    maxLines,
    align,
    children,
  } = props;

  return (
    <Tag
      className={cn(
        className,
        classes.text,
        {
          [classes.viewButton]: view === 'button',
          [classes.viewTitle]: view === 'title',
          [classes.viewP20]: view === 'p-20',
          [classes.viewP18]: view === 'p-18',
          [classes.viewP16]: view === 'p-16',
          [classes.viewP14]: view === 'p-14',
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
      {...maxLines ? {
        style: {
          '--max-lines': maxLines,
        } as React.CSSProperties, 
      } : {}}
    >
      {children}
    </Tag>
  );
};

export default Text;
