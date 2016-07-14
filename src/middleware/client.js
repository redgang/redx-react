import React from 'react'
import store from 'store2'

export default function clientMiddleware(client) {
    return ({dispatch, getState}) => {
        return next => action => {
            if (typeof action === 'function') {
              return action(dispatch, getState)
            }

            const { promise, types, sKey, ...rest } = action // eslint-disable-line no-redeclare
            
            if (!promise) {
              return next({...action,loading :false})
            }

            const [REQUEST, SUCCESS, FAILURE] = types
            //数据缓存本地
            if(sKey){
                let storeResult = store.get(sKey)
                if(storeResult){
                    return next({result : storeResult, type: SUCCESS, loading:false})
                }
            }
            next({...rest, type: REQUEST, loading:true})

            const actionPromise = promise(client)
            actionPromise.then(
                (result) => {
                    if (result) {
                         sKey && result.data && store.set(sKey, result.data)
                         return next({...rest, result : result.data, type: SUCCESS, loading:false})
                    }
                    return next({...rest, result, type: FAILURE, loading:false})
                },
                (error) => next({...rest, error, type: FAILURE, loading:false})
            ).catch((error) => {
                console.error('MIDDLEWARE ERROR:', error)
                
                next({...rest, error, type: FAILURE, loading:false})
            })

            return actionPromise
        }
    }
}
