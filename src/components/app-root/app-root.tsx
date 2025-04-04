import AppRoutes from 'components/app-routes';
import { rootStore, StoreProvider } from 'services/store';

import 'ui/font';
import 'styles/global.scss';
import 'styles/colors.scss';
import 'styles/sizes.scss';

const AppRoot = () => (
  <StoreProvider value={rootStore}>
    <AppRoutes />
  </StoreProvider>
);

export default AppRoot;
