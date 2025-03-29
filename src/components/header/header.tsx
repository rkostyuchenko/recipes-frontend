import HeaderNavigation from './header-navigation';
import HeaderLogo from './header-logo';

import NAVIGATION_ITEMS from 'constants/navigation';

import classes from './header.module.scss';

const Header = () => (
  <header className={classes.header}>
    <HeaderLogo className={classes.logo} />
    <HeaderNavigation items={NAVIGATION_ITEMS} />
  </header>
);

export default Header;
