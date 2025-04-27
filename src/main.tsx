import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { HashRouter } from 'react-router';
import AppRoot from 'components/app-root';

import './stores/config';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HashRouter>
      <AppRoot />
    </HashRouter>
  </StrictMode>,
);
