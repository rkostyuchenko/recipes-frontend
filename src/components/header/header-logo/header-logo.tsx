import Logo from './header-logo.svg?react';
import Text from 'ui/text';

import cn from 'classnames';

import classes from './header-logo.module.scss';

interface Props {
  className?: string;
}

const HeaderLogo: React.FC<Props> = ({ className }) => (
  <div className={cn(className, classes.logo)}>
    <Logo />
    <Text className={classes.text} view="p-20" tag="span" weight="bold">
      Food Client
    </Text>
  </div>
);

export default HeaderLogo;
