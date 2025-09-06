import React from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux';
import { store, persistor } from '@/app/store';
import { PersistGate } from 'redux-persist/integration/react';
import App from './App'
import '@/global.css';

const root = createRoot(document.getElementById('root')!)

function renderApplication() {
  root.render(
    <React.StrictMode>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <App />
        </PersistGate>
      </Provider>
    </React.StrictMode>
  );
}

renderApplication();
