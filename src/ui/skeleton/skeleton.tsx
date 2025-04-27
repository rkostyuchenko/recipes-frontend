import cn from 'classnames';

import classes from './skeleton.module.scss';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface Props extends Pick<React.HTMLAttributes<HTMLDivElement>, 'className' | 'style'> {}

const Skeleton: React.FC<Props> = (props) => {
  const { className, style } = props;

  return <span className={cn(className, classes.skeleton)} style={style} />;
};

export default Skeleton;
