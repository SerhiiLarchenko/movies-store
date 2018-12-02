import { SEARCH, CANCEL_SEARCH } from './types';

export const search = payload => dispatch =>
  dispatch({type: SEARCH, payload});

export const cancelSearch = () => dispatch =>
  dispatch({type: CANCEL_SEARCH});