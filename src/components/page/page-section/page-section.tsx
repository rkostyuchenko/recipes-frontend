import classes from './page-section.module.scss';

interface Props {
  title?: string;
}

const PageSection: React.FC<React.PropsWithChildren<Props>> = (props) => {
  const { title, children } = props;
  return (
    <section className={classes.section}>
      {title && <h2 className={classes.heading}>{title}</h2>}
      {children}
    </section>
  );
};

export default PageSection;
