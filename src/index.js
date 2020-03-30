import React from 'react';
import ReactDOM from 'react-dom';
import Root from './containers/Root';
import { configureStore, history } from './store/configureStore';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const store = configureStore();

ReactDOM.render(
  <React.StrictMode>
    <Root store={store} history={history} />
  </React.StrictMode>,
  document.getElementById('root')
);
