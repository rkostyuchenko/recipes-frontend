import cn from 'classnames';

import classes from './page-margin.module.scss';

interface Props extends React.PropsWithChildren {
  className?: string
}

const PageMargin: React.FC<Props> = ({ children, className }) => (
  <div className={cn(classes.margin, className)}>
    {children}
  </div>
);

export default PageMargin;
