import { Outlet } from 'react-router';
import { PageMargin } from 'components/page';
import Header from 'components/header';

import classes from './default-layout.module.scss';

const DefaultLayout = () => (
  <div>
    <div className={classes.header}>
      <PageMargin>
        <Header />
      </PageMargin>
    </div>
    <div className={classes.body}>
      <Outlet />
    </div>
  </div>
);

export default DefaultLayout;
