import {
  ADD_TO_CART, REMOVE_FROM_CART, EMPTY_CART
} from '../actions/types';

const initState = [];

export default function(state = initState, action) {

  switch (action.type) {

    case ADD_TO_CART:
      return state.some(movie => 
        movie.id === action.movie.id) ? 
          [...state] : [...state, action.movie];
    
    case REMOVE_FROM_CART: 
      return state.filter(movie => 
        action.id !== movie.id);

    case EMPTY_CART:
        return [];
    
    default:
        return [...state];
  }
}