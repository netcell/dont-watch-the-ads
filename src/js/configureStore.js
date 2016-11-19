import { createStore, applyMiddleware, compose } from 'redux'
import rootReducer from './reducers'

/* debug:start */
// window.devToolsOptions && (window.devToolsOptions.maxAge = 200)
/* debug:stop */

export default function configureStore(preloadedState) {
  const store = window.devToolsExtension ?
    createStore(
      rootReducer,
      preloadedState, 
      window.devToolsExtension()
    ) :
    createStore(
      rootReducer,
      preloadedState
    );
  /* debug:start */
  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('./reducers', () => {
      const nextRootReducer = require('./reducers').default
      store.replaceReducer(nextRootReducer)
    })
  }
  /* debug:stop */

  return store
}
