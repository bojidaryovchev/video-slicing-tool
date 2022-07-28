import React from 'react';

const StoreContext = React.createContext<{
  loading: boolean;
  error?: Error;
  video?: string;
}>({
  loading: false,
});

export default StoreContext;
