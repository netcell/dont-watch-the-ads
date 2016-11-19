import {START} from '../game';
import _ from 'lodash';

export const ADD_POPUP = 'ADD_POPUP';
export const CLOSE_POPUP = 'CLOSE_POPUP';

const INITIAL_STATE = []

export default function screen(state = INITIAL_STATE, action) {
  switch (action.type) {
    case ADD_POPUP: {
      let newState = _.merge([], state);
      let data = _.merge(action.payload);
      data.id = Date.now();
      newState.push(data);
      return newState;
    }
    case CLOSE_POPUP: {
      let newState = _.merge([], state);
      let id = action.payload;
      _.remove(newState, {id});
      return newState;
    }
    case START: return INITIAL_STATE;
    default: return state;
  }
}