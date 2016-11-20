const INITIAL_STATE = {
  menu: true
}

export const START = 'START';
export const MENU = 'MENU';
export const GAMEOVER = 'GAMEOVER';

export default function game(state = INITIAL_STATE, action) {
  switch(action.type) {
    case START: return {
      menu: false,
      game_over: false
    };
    case GAMEOVER: return {
      menu: false,
      game_over: true
    };
    case MENU: return {
      menu: true
    };
    default: return state;
  }
}