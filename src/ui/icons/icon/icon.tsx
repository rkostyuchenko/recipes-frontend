import * as React from 'react';
import cn from 'classnames';

import classes from './icon.module.css';

export type IconProps = React.SVGAttributes<SVGElement> & {
  className?: string;
  color?: 'primary' | 'secondary' | 'accent';
};

const Icon: React.FC<React.PropsWithChildren<IconProps>> = (props) => {
  const { className, color, children, ...svgProps } = props;

  return (
    <svg
      className={cn(
        'icon',
        {
          [classes.colorPrimary]: color === 'primary',
          [classes.colorSecondary]: color === 'secondary',
          [classes.colorAccent]: color === 'accent',
        },
        className,
      )}
      viewBox="0 0 24 24"
      width={24}
      height={24}
      fill="none"
      {...svgProps}
    >
      {children}
    </svg>
  );
};

export default Icon;
