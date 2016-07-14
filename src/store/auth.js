import immutable from 'immutable'

const LOAD = 'auth/LOAD'
const LOAD_SUCCESS = 'auth/LOAD_SUCCESS'
const LOAD_FAILURE = 'auth/LOAD_FAILURE'
const LOGIN = 'auth/LOGIN'
const LOGIN_SUCCESS = 'auth/LOGIN_SUCCESS'
const LOGIN_FAILURE = 'auth/LOGIN_FAILURE'
const LOGOUT = 'auth/LOGOUT'
const LOGOUT_SUCCESS = 'auth/LOGOUT_SUCCESS'
const LOGOUT_FAILURE = 'auth/LOGOUT_FAILURE'

const TIMEOUT_SESSION = 'auth/TIMEOUT_SESSION'

export function load() {
  return {
    types: [LOAD, LOAD_SUCCESS, LOAD_FAILURE],
    promise: (client) => client.post('checkLogin')
  }
}

export function login(params) {
  return {
    types: [LOGIN, LOGIN_SUCCESS, LOGIN_FAILURE],
    promise: (client) => client.post('api-user.login', params)
  }
}

export function logout() {
  return {
    types: [LOGOUT, LOGOUT_SUCCESS, LOGOUT_FAILURE],
    promise: (client) => client.post('api-user.logout')
  }
}
/**
 * isAuthed
 * @param  {any} globalState
 */
export function isAuthed(globalState) {
  return globalState.auth && globalState.auth.loaded
}

const initialState = {
  isloaded: false
}

export default function reducer(state = initialState, action = {}) {
  state = {...state, loading : action.loading}
  switch (action.type) {
    case LOAD:
      return {
        ...state
      }
    case LOAD_SUCCESS:
      return {
        ...state,
        isloaded: true,
        user: action.result
      }
    case LOAD_FAILURE:
      return {
        ...state,
        error: action.error
      }
    case LOGIN:
      return {
        ...state
      }
    case LOGIN_SUCCESS:
      return {
        ...state,
        user: action.result,
        isloaded: true,
        logoutResult : false
      }
    case LOGIN_FAILURE:
      return {
        ...state,
        user: null,
        loginError: action.error
      }
    case LOGOUT:
      return {
        ...state,
        isloaded: true
      }
    case LOGOUT_SUCCESS:
      return {
        isloaded: false,
        logoutResult: true,
        user : null
      }
    case LOGOUT_FAILURE:
      return {
        ...state,
        isloaded: true,
        logoutError: action.error
      }
    case TIMEOUT_SESSION:
      return {
         logoutResult : action.result
      }
    default:
      return state
  }
}

