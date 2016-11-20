import _ from 'lodash';

import {CLOSE_POPUP} from './popups'
import {START} from './game'

export default function common(state = {
  closedPopup: 0
}, action) {
  switch(action.type) {
    case START: return {
      closedPopup: 0
    };
    case CLOSE_POPUP: return _.merge({}, state, {
      closedPopup: state.closedPopup + 1
    })
    default: return state;
  } 
}
