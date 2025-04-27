import cn from 'classnames';

import classes from './icon-button.module.scss';

interface Props<As extends React.ElementType> {
  label: string;
  as?: As;
}

const IconButton = <As extends React.ElementType>(
  props: Props<As> & Omit<React.ComponentProps<As>, keyof Props<As>>,
): React.ReactNode => {
  const { as: Component = 'button', className, label, children, title, ...restProps } = props;

  return (
    <Component className={cn(classes.button, className)} title={title ?? label} {...restProps}>
      <span className={classes.label}>{label}</span>
      {children}
    </Component>
  );
};

export default IconButton;
