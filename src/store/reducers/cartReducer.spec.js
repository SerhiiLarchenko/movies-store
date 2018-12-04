import cartReducer from './cartReducer';
import { ADD_TO_CART, REMOVE_FROM_CART, EMPTY_CART} from '../actions/types';

describe('cart reducer', () => {

  it('adds movie with id property to state', () => {

    const state = [];
    const movie = { id: 777 };
    const action = { type: ADD_TO_CART, movie };
    
    expect(cartReducer(state, action)).toEqual([
      ...state, action.movie
    ]);

  })

  it('adds movie to state only with unique id', () => {

    const movie = { id: 777 };
    const state = [{id: 777}];
    const action = { type: ADD_TO_CART, movie };

    expect(cartReducer(state, action).length).toEqual(1);

  })

  it('removes movie from state by id', () => {

    const id = 777;
    const state = [{id: 777}];
    const action = { type: REMOVE_FROM_CART, id };

    expect(cartReducer(state, action)).toEqual([]);
  })

  it('returns empty array', () => {

    const state = [1, 2, 3];
    const action = { type: EMPTY_CART };
    
    expect(cartReducer(state, action)).toEqual([]);

  })

});