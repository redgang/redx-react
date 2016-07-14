import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import CoreLayoutView from '../components/CoreLayout'
import {logout} from '../../store/auth'
import {Modal} from 'antd'
import Cookie from 'js-cookie'
import store from 'store2'

class CoreLayout extends Component {
    
    componentWillReceiveProps(nextProps) {
        
        if (nextProps.logoutResult) {
            const _context = this
            //正常登出
            if(nextProps.logoutResult === true){
                 this.goToLogin()
            }else{ //登录超时
                Modal.info({
                    title: '警告!!!',
                    content : nextProps.logoutResult.message,
                    onOk(){
                        _context.goToLogin()
                    }
                })
            }
        }
    }
    
    getChildContext(){
        const {location} = this.props
        return {props: {location, router : this.context.router}}
    }
    
    goToLogin(){
        Cookie.remove('sessionId')
        store.clearAll()
        let pathname = '/login'
        this.context.router.replace(pathname)
    }
    
    doLogout(e){
        // this.props.logout()
        this.goToLogin()
    }
    
    render(){
        const {children} = this.props
        return <CoreLayoutView handleLogout={this.doLogout.bind(this)}>{children}</CoreLayoutView>
    }
}

CoreLayout.propTypes = {
    children : React.PropTypes.object.isRequired
}

CoreLayout.contextTypes = {
    router : React.PropTypes.object.isRequired
}

CoreLayout.childContextTypes = {
    props: React.PropTypes.object
}

const mapStateToProps = (state) => {
    const {logoutResult} = state.auth
    if(logoutResult && typeof logoutResult === 'object' && logoutResult.data){
        return {
            logoutResult : logoutResult.data
        }
    }
    return {
        logoutResult
    }
}

const mapDispatchToProps = {
    logout
}



export default connect(mapStateToProps, mapDispatchToProps)(CoreLayout)
