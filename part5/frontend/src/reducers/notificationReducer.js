const asMessageObject = (type, text) => {
  return {
    type: type,
    text: text
  }
}

export const addNotification = (message) => {
  window.clearTimeout(window._notificationTimeout)
  console.log('dispatched and cleared')
  console.log(message.type)
  console.log(message.text)
  return async dispatch => {
    dispatch({
      type: message.type,
      text: message.text
    })
    window._notificationTimeout = setTimeout(() => {
      dispatch({
        type: 'HIDE_NOTIFICATION'
      })
    }, 5 * 1000)
  }
}
const notificationReducer = (state = null, action) => {
  switch (action.type) {
    case 'success':
      return asMessageObject('message', action.text)
    case 'error':
      console.log('got to error')
      return asMessageObject('error', action.text)
    case 'HIDE_NOTIFICATION':
      return null
    default: return state
  }
}

export default notificationReducer