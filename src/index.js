import React from 'react'
import ReactDOM from 'react-dom'
import createHashHistory from 'history/lib/createHashHistory'
import { Router, useRouterHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import createStore from './store/createStore'
import { Provider } from 'react-redux'

const MOUNT_ELEMENT = document.getElementById('root')

// Configure history for react-router
const browserHistory = useRouterHistory(createHashHistory)({
  basename: __BASENAME__,
  querykey : true
})

// Create redux store and sync with react-router-redux. We have installed the
// react-router-redux reducer under the key "router" in src/routes/index.js,
// so we need to provide a custom `selectLocationState` to inform
// react-router-redux of its location.
const store = createStore({}, browserHistory)
const history = syncHistoryWithStore(browserHistory, store, {
  selectLocationState: (state) => state.router
})

let render = (key = null) => {
  const routes = require('./routes/index').default(store)
  const App = (
    <Provider store={store}>
        <Router history={history} routes={routes} key={key}  />
    </Provider>
  )
  ReactDOM.render(App, MOUNT_ELEMENT)
}

// Enable HMR and catch runtime errors in RedBox
// This code is excluded from production bundle
if (__DEV__ && module.hot) {
  const renderApp = render
  const renderError = (error) => {
    const RedBox = require('redbox-react')

    ReactDOM.render(<RedBox error={error} />, MOUNT_ELEMENT)
  }
  render = () => {
    try {
      renderApp(Math.random())
    } catch (error) {
      renderError(error)
    }
  }
  module.hot.accept(['./routes/index'], () => render())
}

// Use Redux DevTools chrome extension
if (__DEBUG__) {
  if (window.devToolsExtension) window.devToolsExtension.open()
}

render()
