const asMessageObject = (type, text) => {
  return {
    type: type,
    text: text
  }
}

export const addNotification = (text, time) => {
  return async dispatch => {
    dispatch({
      type: 'MESSAGE',
      text: text
    })
    setTimeout(() => {
      dispatch({
        type: 'HIDE_NOTIFICATION'
      })
    }, time * 1000)
  }
}
const reducer = (state = null, action) => {
  switch (action.type) {
    case 'MESSAGE':
      return asMessageObject('message', action.text)
    case 'HIDE_NOTIFICATION':
      return null
    default: return state
  }
}

export default reducer