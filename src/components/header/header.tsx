import HeaderNavigation from './header-navigation';
import HeaderLogo from './header-logo';

import NAVIGATION_ITEMS from 'constants/navigation';

import classes from './header.module.scss';

const Header = () => (
  <header className={classes.header}>
    <HeaderLogo className={classes.logo} />
    <nav className={classes.menuWrap}>
      <div className={classes.menuScroller}>
        <HeaderNavigation className={classes.menu} items={NAVIGATION_ITEMS} />
      </div>
    </nav>
  </header>
);

export default Header;
