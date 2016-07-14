import React from 'react'
import { browserHistory } from 'react-router'

const goBack = (e) => {
  e.preventDefault()
  return browserHistory.goBack()
}

export const NotFound = () => (
  <div className="page-error">
      <header>
        <h1>404</h1>
        <p>页面没有找到!</p>
      </header>
      <p>请检查页面访问地址！</p>
      <a href="#"  onClick={goBack}>GO BACK</a>
      <footer className="page-copyright">
        <p>WEBSITE BY SUNEEE</p>
        <p>© 2015. All RIGHT RESERVED.</p>
      </footer>
    </div>

)

export default NotFound
