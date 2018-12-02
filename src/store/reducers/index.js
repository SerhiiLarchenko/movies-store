import { combineReducers } from 'redux';

import sortReducer from './sortReducer';
import searchReducer from './searchReducer';
import cartReducer from './cartReducer';
import alertReducer from './alertReducer';

export default combineReducers({
  movies: sortReducer,
  search: searchReducer,
  cart: cartReducer,
  alert: alertReducer
});