import axios from 'axios';

import { ADD_MOVIE,
         DELETE,
         LOAD_MOVIES,
         SHUFFLE, 
         SORT_BY_TITLE, 
         SORT_BY_YEAR, 
         SORT_BY_FORMAT,
         LOAD_LOCAL_FILE } from './types';

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

export const loadLocalFile = movies => dispatch => 
  dispatch({type: LOAD_LOCAL_FILE, movies});

export const sortByTitles = movies => dispatch => 
  dispatch({type: SORT_BY_TITLE, movies});

export const sortByYear = movies => dispatch =>
  dispatch({type: SORT_BY_YEAR, movies});

export const sortByFormat = movies => dispatch =>
  dispatch({type: SORT_BY_FORMAT, movies});

export const shuffle = movies => dispatch => 
  dispatch({type: SHUFFLE, movies});

export const addMovie = movie => dispatch => 
  dispatch({type: ADD_MOVIE, movie});

export const deleteMovie = id => dispatch => 
  dispatch({type: DELETE, id});