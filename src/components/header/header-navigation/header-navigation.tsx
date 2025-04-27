import { NavLink } from 'react-router';
import cn from 'classnames';

import classes from './header-navigation.module.scss';

interface NavigationItem {
  text: string;
  anchor: string;
}

interface Props {
  className?: string;
  items: NavigationItem[];
}

const HeaderNavigation: React.FC<Props> = (props) => {
  const { className, items } = props;

  return (
    <menu className={cn(classes.list, className)}>
      {items.map((item) => (
        <li key={item.text} className={classes.item}>
          <NavLink className={({ isActive }) => cn(classes.link, { [classes.active]: isActive })} to={item.anchor}>
            {item.text}
          </NavLink>
        </li>
      ))}
    </menu>
  );
};

export default HeaderNavigation;
