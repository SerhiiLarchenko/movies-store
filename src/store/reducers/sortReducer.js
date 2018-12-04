import { LOAD_MOVIES, 
         SHUFFLE,
         SORT_BY_TITLE, 
         SORT_BY_YEAR, 
         SORT_BY_FORMAT, 
         LOAD_LOCAL_FILE} from '../actions/types';

const initState = [];

export default function (state = initState, action) {
   switch (action.type) {
    case LOAD_MOVIES:
      return action.movies;

    case LOAD_LOCAL_FILE:  
      return action.movies;

    case SHUFFLE:
      return function(array) {
        let i = array.length - 1;
        while(i --> 0) {
          const j = Math.floor(Math.random()*(i+1));
          [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
      }([...state]);      
    
    case SORT_BY_TITLE: 
      return [...state].sort((a, b) => {
        if (a.title > b.title) return 1;
        else if (a.title < b.title) return -1;
        else return 0;
      });

    case SORT_BY_YEAR: 
      return [...state].sort((a, b) => 
        a['release year'] - b['release year']
      );
    
    case SORT_BY_FORMAT: 
      return [...state].sort((a, b) => {
        if (a.format > b.format) return 1;
        else if (a.format < b.format) return -1;
        else return 0;
      });
    
    default:
      return state;
   }
}