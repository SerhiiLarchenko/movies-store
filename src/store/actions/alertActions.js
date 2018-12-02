import { ADD_ALERT, CONFIRM_ALERT } from './types';

export const addAlert = info => dispatch => 
  dispatch({ type: ADD_ALERT, info});

export const confirmAlert = () => dispatch => 
  dispatch({ type: CONFIRM_ALERT });