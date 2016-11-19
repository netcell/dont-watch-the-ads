import {START} from '.';

export const startGame = dispatch => () => {
  dispatch({
    type: START
  })
}