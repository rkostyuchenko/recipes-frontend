import { PageMargin } from 'components/page';
import Caption from './banner.assets/caption.svg?react';

import classes from './banner.module.scss';

const Banner = () => (
  <PageMargin className={classes.wrap}>
    <Caption
      className={classes.caption}
    />
  </PageMargin>
);

export default Banner;
