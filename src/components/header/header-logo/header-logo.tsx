import Logo from './header-logo.svg';
import { Link } from 'react-router';

import cn from 'classnames';

import classes from './header-logo.module.scss';

interface Props {
  className?: string;
}

const HeaderLogo: React.FC<Props> = ({ className }) => (
  <div className={cn(className, classes.logo)}>
    <Logo className={classes.mark} />
    <Link className={classes.link} to="/">
      Food Client
    </Link>
  </div>
);

export default HeaderLogo;
