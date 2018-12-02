import { SEARCH, CANCEL_SEARCH } from '../actions/types';

const initState = {};

export default function( state = initState, action) {

  switch (action.type) {
    case SEARCH:
      return {...action.payload};
    
    case CANCEL_SEARCH:
      return {...state, word: ''};
    
    default: 
      return state;
  }
}