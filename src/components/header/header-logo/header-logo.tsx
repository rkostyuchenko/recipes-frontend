import Logo from './header-logo.svg';
import Text from 'ui/text';
import { Link } from 'react-router';

import cn from 'classnames';

import classes from './header-logo.module.scss';

interface Props {
  className?: string;
}

const HeaderLogo: React.FC<Props> = ({ className }) => (
  <div className={cn(className, classes.logo)}>
    <Logo />
    <Link className={classes.link} to="/">
      <Text className={classes.text} view="p-20" tag="span" weight="bold">
        Food Client
      </Text>
    </Link>
  </div>
);

export default HeaderLogo;
