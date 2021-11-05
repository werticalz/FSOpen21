import React from 'react'
import { applyMiddleware, combineReducers, createStore } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import anecdoteReducer from './reducers/anecdoteReducer'
import notificationReducer from './reducers/notificationReducer'


const reducer = combineReducers({
  notifications: notificationReducer,
  anecdotes: anecdoteReducer
})

const store = createStore(
  reducer,
  composeWithDevTools((applyMiddleware(thunkMiddleware)))
)

export default store