import axios from 'axios';

import { LOAD_MOVIES,
         SHUFFLE, 
         SORT_BY_TITLE, 
         SORT_BY_YEAR, 
         SORT_BY_FORMAT } from './types';

const API = 'http://localhost:8000/movies'

export const loadMovies = cb => dispatch => {
  axios.get(API).then(res => {
     return dispatch({
      type: LOAD_MOVIES,
      movies: res.data
    });
  }).then(() => { if (cb) cb({loaded: true });
  }).catch( error => console.log(error));
}

export const sortByTitles = movies => dispatch => 
  dispatch({type: SORT_BY_TITLE, movies});

export const sortByYear = movies => dispatch =>
  dispatch({type: SORT_BY_YEAR, movies});

export const sortByFormat = movies => dispatch =>
  dispatch({type: SORT_BY_FORMAT, movies});

  export const shuffle = movies => dispatch => 
  dispatch({type: SHUFFLE, movies});