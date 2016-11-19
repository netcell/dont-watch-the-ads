const INITIAL_STATE = {

}

export const START = 'START';

export default function game(state = INITIAL_STATE, action) {
  switch(action.type) {
    case START: state = INITIAL_STATE;
    default: return state;
  }
}