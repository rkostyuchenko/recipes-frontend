import { PropsWithChildren } from 'react';
import classes from './page-section.module.scss';

const PageSection: React.FC<PropsWithChildren> = ({ children }) => (
  <section className={classes.section}>{children}</section>
);

export default PageSection;
