import { applyMiddleware, compose, createStore } from 'redux'
import { routerMiddleware } from 'react-router-redux'
import thunk from 'redux-thunk'
import logger from 'redux-logger'
import reducers, {injectReducer} from './reducers'
import clientMiddleware from '../middleware/client'
import client from '../common/apiClient'


export default (initialState = {}, history) => {
  let middleware = applyMiddleware(thunk, logger(), clientMiddleware(client), routerMiddleware(history))

  // Use DevTools chrome extension in development
  if (__DEBUG__) {
    const devToolsExtension = window.devToolsExtension

    if (typeof devToolsExtension === 'function') {
      //npmmiddleware = compose(middleware, devToolsExtension())
    }
  }

  const store = createStore(reducers, initialState, middleware)

  store.asyncReducers = {}
  /**
   * inject reducer
   * @param  {key:string,reducer:function} reducer
   */
  store.injectReducer = function (reducer) {
    return injectReducer(store, reducer)
  }

  if (module.hot) {
    module.hot.accept('./reducers', () => {
      const reducers = require('./reducers').default

      store.replaceReducer(reducers)
    })
  }

  return store
}
