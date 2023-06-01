import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './app/store';
import './main.global.css';
import { Auth } from './features/auth/auth';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Auth>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Auth>
    </Provider>
  </React.StrictMode>,
document.getElementById('app_root') as HTMLElement,)
