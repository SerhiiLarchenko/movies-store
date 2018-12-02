import {ADD_TO_CART, REMOVE_FROM_CART, EMPTY_CART} from './types';

export const addToCart = movie => dispatch => 
  dispatch({ type: ADD_TO_CART, movie });

export const removeFromCart = id => dispatch => 
  dispatch({ type: REMOVE_FROM_CART, id });

export const emptyCart = () => dispatch =>
  dispatch({ type: EMPTY_CART });