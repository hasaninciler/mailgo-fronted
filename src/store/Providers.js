'use client';

import { Provider } from 'react-redux';
import { useEffect } from 'react';
import { store } from './store';
import { loadFromStorage } from './slices/authSlice';

function AuthLoader({ children }) {
  useEffect(() => {
    store.dispatch(loadFromStorage());
  }, []);
  return children;
}

export default function Providers({ children }) {
  return (
    <Provider store={store}>
      <AuthLoader>{children}</AuthLoader>
    </Provider>
  );
}