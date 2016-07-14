import React, { PropTypes } from 'react'
import {Link} from 'react-router'
//import 'antd/dist/index.less' //webpack全局导入antd时用,目前是局部导入
import '../../styles/core.less'
import classes from './CoreLayout.less'
import { Menu, Breadcrumb, Icon } from 'antd'
const SubMenu = Menu.SubMenu
const MenuItem = Menu.Item

import menus from '../../common/menu'

var logo = require('static/logo.png')

// Note: Stateless/function components *will not* hot reload!
// react-transform *only* works on component classes.
//
// Since layouts rarely change, they are a good place to
// leverage React's new Stateless Functions:
// https://facebook.github.io/react/docs/reusable-components.html#stateless-functions
//
// CoreLayout is a pure function of its props, so we can
// define it with a plain javascript function...
function CoreLayout(props) {
  let result = null
  
  let findNestedProp = (props)=>{
      let previousChildren = props.children

      if(null !== props.children){
          result = props.children
          findNestedProp(props.children.props)
      }
  }

  findNestedProp(props)

  return (
    <div className={classes.corelayout}>
      <div className={classes.header + ' site-navbar navbar navbar-default navbar-fixed-top navbar-mega'}>
          <div className={classes.logo}>
            <Link to="/">
              <img src={logo} height="67" />
            </Link>
          </div>
      </div>
      <div className={classes.aside}>
        <aside className={classes.sider}>
          <Menu mode="inline" theme="dark" defaultOpenKeys={['sub0']}>
            {
              menus.map((menu, index) => {
                return <SubMenu key={`menu-${index}`} title={<span><Icon type={menu.icon}  />{menu.title}</span>}>
                  {
                    menu.children.map((subMenu, subIndex) => {
                      if(subMenu.children){
                          return <SubMenu key={`sub-${subIndex}`} title={<span><Icon type={subMenu.icon}  />{subMenu.title}</span>}>
                          {
                            subMenu.children.map((subChildMenu, subChildIndex) => {
                                return <MenuItem key={`${subChildMenu.url}`}>
                                   <Link to={subChildMenu.url}>{subChildMenu.title}</Link>
                                </MenuItem>
                            })
                          }
                          </SubMenu>
                      }else{
                        return <MenuItem key={`${subMenu.url}`}>
                          <Link to={subMenu.url}>{subMenu.title}</Link>
                        </MenuItem>
                      }
                    })
                  }
                </SubMenu>
              })
            }
          </Menu>

          <div className={classes['site-menubar-footer'] + ' site-menubar-footer'}>
            <a href="javascript: void(0)" >
              <Icon type="setting" />
            </a>
            <a href="javascript: void(0)" >
              <Icon type="lock" />
            </a>
            <a href="javascript: void(0)" onClick={props.handleLogout} >
              <Icon type="poweroff" />
            </a>
          </div>
        </aside>

        <div className={classes['container']}>
        {result ? result : props.children}
        </div>
        <div className={classes['footer']}>
          Made <i className="red-600 wb wb-heart"  /> by <a href="https://github.com/redgang">redx</a>
        </div>
      </div>
    </div>

  )
}

CoreLayout.propTypes = {
  children: PropTypes.element
}

export default CoreLayout
