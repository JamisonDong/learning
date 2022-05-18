/**
 * createStore(reducer,preloadedState,enhancer){
 *  getState,dispatch, subscribe
 * }
 */

function createStore (reducer, preloadedState, enhancer) {
  // 约束reducer参数类型
  if (typeof reducer !== 'function') throw new Error('reducer is not a function')

  // 判断enhancer 参数有没有传递
  if (typeof enhancer !== 'undefined') {
    if (typeof enhancer !== 'function') {
      throw new Error('enhancer is not a function')
    }
    return enhancer(createStore)(reducer, preloadedState)
  }

  // store对象中存储的状态
  var currentState = preloadedState

  // 存放订阅者函数
  var currentListeners = []

  // 获取状态
  function getState () {
    return currentState
  }

  // 触发action
  function dispatch (action) {
    // 判断action是否是对象
    if (!isPlainObject(action)) {
      throw new Error('action is not a object')
    }
    // 判断action中是否有type属性
    if (typeof action.type === 'undefined') throw new Error('action need a attr of type')
    currentState = reducer(currentState, action)
    // 循环数组 调用订阅者
    for (var i = 0; i < currentListeners.length; i++) {
      // 获取订阅者
      var listener = currentListeners[i]
      // 调用订阅者
      listener()
    }
  }

  // 订阅状态
  function subscribe (listener) {
    currentListeners.push(listener)
  }

  return {
    getState,
    dispatch,
    subscribe
  }
}

// 判断参数是否为对象
function isPlainObject (obj) {
  // 排除基本数据类型和null
  if (typeof obj !== 'object' || obj === null) return false
  // 区分数组和对象 原型对象对比
  var proto = obj
  while (Object.getPrototypeOf(proto) !== null) {
    proto = Object.getPrototypeOf(proto)
  }
  return proto === Object.getPrototypeOf(obj)
}

function applyMiddleware (...middlewares) {
  return function (createStore) {
    return function (reducer, preloadedState) {
      // 创建store
      var store = createStore(reducer, preloadedState)
      // 阉割版的store
      var middlewareAPI = {
        getState: store.getState,
        dispatch: store.dispatch
      }

      // 调用中间件的第一层函数 传递阉割版的store对象
      var chian = middlewares.map(middleware => middleware(middlewareAPI))
      var dispatch = compose(...chian)(store.dispatch)
      return {
        ...store,
        dispatch
      }
    }
  }
}

function compose () {
  var funcs = [...arguments]
  return function (dispatch) {
    for (var i = funcs.length - 1; i >= 0; i--) {
      dispatch = funcs[i](dispatch)
    }
    return dispatch
  }
}

function bindActionCreators (actionCreators, dispatch) {
  var boundActionCreators = {}

  for (let key in actionCreators) {
    boundActionCreators[key] = function () {
      dispatch(actionCreators[key]())
    }
  }

  return boundActionCreators
}
