import React from 'react';
import StoreProvider from '../../../providers/store.provider';

const Providers: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  return <StoreProvider>{children}</StoreProvider>;
};

export default Providers;
