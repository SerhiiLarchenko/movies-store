import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.css';
import './index.css';
import App from './components/App';
import store from './store';

ReactDOM.render(<Provider store={store}><App /></Provider>, 
  document.getElementById('root'));

serviceWorker.unregister();