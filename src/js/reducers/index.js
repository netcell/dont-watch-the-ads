import combineReducers from './combineReducers';
import common from './common'
import screen from './screen'
import popups from './popups'

const rootReducer = combineReducers({
  common, screen, popups
})

export default rootReducer;
