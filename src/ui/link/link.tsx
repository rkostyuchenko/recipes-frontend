import { Link as _Link, LinkProps } from 'react-router';

import cn from 'classnames';

import classes from './link.module.scss';

interface Props extends LinkProps {
  view?: 'primary';
  overlay?: boolean;
}

const Link: React.FC<Props> = (props) => {
  const { className, view = 'primary', overlay = false, ...restProps } = props;

  return (
    <_Link
      className={cn(className, classes.link, {
        [classes.viewPrimary]: view === 'primary',
        [classes.overlay]: overlay,
      })}
      {...restProps}
    />
  );
};

export default Link;
