import notificationReducer from "./reducers/notificationReducer"
import blogReducer from './reducers/blogReducer'
import { combineReducers, applyMiddleware, createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'

const reducer = combineReducers({
  notifications: notificationReducer,
  blogs: blogReducer
})

const store = createStore(
  reducer,
  composeWithDevTools((applyMiddleware(thunk)))
)

export default store