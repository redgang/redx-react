// We only need to import the modules necessary for initial render
import CoreLayout from '../layouts/containers/CoreLayout'
import Home from './Home'
import {load, isAuthed} from '../store/auth'
import Login from './Login'
import NotFound from './NotFound'
import React from 'react'

export const createRoutes = (store) => {
  /*  Note: Instead of using JSX, we are using react-router PlainRoute,
      a simple javascript object to provide route definitions.
      When creating a new async route, pass the instantiated store!   */
  const requireLogin = (nextState, replace, cb) => {
    /**
     * 权限检查
     * 从 state 里面获取 auth 数据,如果有 user 数据则说明已经登录
     * 未登录的 统一 定向到 login 页面
     */
    function checkAuth() {
      const {auth: {user}} = store.getState()
      if (!user) {
        // not logged in,so can't be there
        replace('/login')
      }
      cb()
    }

    /**
     * 检查是否已经登录
     *
     **/
    if (!isAuthed(store.getState())) {
      // 如果没有登录则执行 load 方法 然后检测权限
      store.dispatch(load()).then(checkAuth)
    } else {
      checkAuth()
    }

  }
  
  

  /**
   * routes that need auth
   */
  const requireLoginRoutes = {
    breadcrumbName: "首页",
    path: '/',
    component: CoreLayout,
    indexRoute: Home,
    // 取消注释开启登录检查
    // onEnter: requireLogin,
    getChildRoutes(location, next) {
      require.ensure([], (require) => {
        // Provide store for async reducers and middleware
        let asyncComponents = [
            //require('./System').default(store),
        ]
        if(__DEV__){
            // asyncComponents.push(require('./Docs').default(store))
        }
        next(null, asyncComponents)
      })
    }
  }

  /**
   * other routes include login register error page
   * these pages don't need login so we should split them
   */
  const otherRoutes = [
    Login(store),
    NotFound
  ]

  /**
   * root component
   */
  const rootComponent = ({children}) => {
    return <div style={{ height: '100%' }}>{children}</div>
  }
  /** final routes */
  const routes = {
    component: rootComponent,
    childRoutes: [
      requireLoginRoutes,
      ...otherRoutes
    ]
  }

  return routes
}

export default createRoutes
