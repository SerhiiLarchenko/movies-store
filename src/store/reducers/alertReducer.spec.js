import alertReducer from './alertReducer';
import { ADD_ALERT, CONFIRM_ALERT } from '../actions/types';

describe('alert reducer', () => {
  
  it('adds object', () => {
    const state = {};
    const info = { msg: 'warn', x: 1, y: 2 };
    const action = { type: ADD_ALERT, info};

    expect(alertReducer(state, action)).toEqual({
      msg: 'warn', x: 1, y: 2
    });
  });

  it('returns empty object', () => {
    const state = { msg: 'warn', x: 1, y: 2 };
    const action = { type: CONFIRM_ALERT };

    expect(alertReducer(state, action)).toEqual({});
  })
});