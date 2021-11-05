import { applyMiddleware, combineReducers, createStore } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import anecdoteReducer from './reducers/anecdoteReducer'
import notificationReducer from './reducers/notificationReducer'
import filterReducer from './reducers/filterReducer'

const reducer = combineReducers({
  notifications: notificationReducer,
  anecdotes: anecdoteReducer,
  filter: filterReducer
})

const store = createStore(
  reducer,
  composeWithDevTools((applyMiddleware(thunkMiddleware)))
)

export default store