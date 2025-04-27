import { Link } from 'react-router';
import IconButton from 'ui/icon-button';
import HeartIcon from 'ui/icons/heart-icon';
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
    <div className={classes.actionsWrap}>
      <IconButton as={Link} label="Favorites" to="/favorites">
        <HeartIcon />
      </IconButton>
    </div>
  </header>
);

export default Header;
