import { ADD_ALERT, CONFIRM_ALERT } from '../actions/types';

const initState = {};

export default function(state = initState, action) {
  
    switch (action.type) {
      case ADD_ALERT:
        return action.info;
      
      case CONFIRM_ALERT:
        return {};
      
      default:
        return {...state};
    }
}