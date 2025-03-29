import { Outlet } from 'react-router';
import { PageMargin } from 'components/page';
import Header from 'components/header';

import classes from './default-layout.module.scss';

const DefaultLayout = () => (
  <div className={classes.layout}>
    <div className={classes.header}>
      <PageMargin>
        <Header />
      </PageMargin>
    </div>
    <Outlet />
  </div>
);

export default DefaultLayout;
