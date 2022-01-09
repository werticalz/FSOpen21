import notificationReducer from "./reducers/notificationReducer"
import { applyMiddleware, createStore } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
const reducer = notificationReducer

const store = createStore(
  reducer,
  composeWithDevTools((applyMiddleware(thunk)))
)

export default store