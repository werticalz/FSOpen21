import React from 'react'
import { useSelector } from 'react-redux'

const Notification = () => {
  const notification = useSelector(state => state.notifications)
  console.log('Notification', notification)

  if (!notification) {
    return null
  }
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }

  return (
    <div style={style} className={`notification notification--${notification.type}`}>
      {notification.text}
    </div>
  )
}

export default Notification
