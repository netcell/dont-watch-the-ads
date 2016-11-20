import combineReducers from './combineReducers';
import common from './common'
import screen from './screen'
import popups from './popups'
import game from './game'

const rootReducer = combineReducers({
  common, screen, popups, game
})

export default rootReducer;
