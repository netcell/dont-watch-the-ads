import {START, MENU, GAMEOVER} from '.';

export const startGame = dispatch => () => {
  dispatch({
    type: START
  })
}

export const toMenu = dispatch => () => {
  dispatch({
    type: MENU
  })
}

export const gameOver = dispatch => () => {
  dispatch({
    type: GAMEOVER
  })
}