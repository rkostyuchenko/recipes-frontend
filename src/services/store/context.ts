import { createContext } from 'react';
import { useContextSafely } from 'hooks/use-context-safely';
import { RootStore, GlobalStores } from './root';

const storeContext = createContext<RootStore | undefined>(undefined);
storeContext.displayName = 'StoreContext';
export const StoreProvider = storeContext.Provider;

export const useStore = <StoreName extends GlobalStores>(store: StoreName) => {
  const rootStore = useContextSafely(storeContext);

  return rootStore[store];
};
