// Third Party Imports.
import { ThemeProvider } from '@emotion/react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import React from 'react';

// Local Imports.
import store from './redux/store';
import { theme } from './theme';
import App from './App';
import './index.css';

/**
 * @Author Joel Vegas.
 * @description This App is a simple example test for a login page.
 * @version 0.0.1
 * @namespace frontend
 * @since 29/08/2023
 */
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={store}>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
    </Provider>
);
