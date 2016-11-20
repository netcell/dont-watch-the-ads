import {START, MENU} from '../game';
import _ from 'lodash';

export const ADD_POPUP = 'ADD_POPUP';
export const CLOSE_POPUP = 'CLOSE_POPUP';

const INITIAL_STATE = []

createjs.Sound.registerSound("assets/pop_02.mp3", 'pop_02');
createjs.Sound.registerSound("assets/err.mp3", 'err');

function playPop() {
  let id = 'err';
  createjs.Sound.play(id);
}

export default function screen(state = INITIAL_STATE, action) {
  switch (action.type) {
    case ADD_POPUP: {
      let newState = _.merge([], state);
      if (newState.length < 10) playPop(); 
      let data = _.merge(action.payload);
      data.id = Date.now() + newState.length;
      newState.push(data);
      return newState;
    }
    case CLOSE_POPUP: {
      let newState = _.merge([], state);
      let id = action.payload;
      _.remove(newState, {id});
      return newState;
    }
    case MENU:
    case START: 
      return INITIAL_STATE;
    default: return state;
  }
}