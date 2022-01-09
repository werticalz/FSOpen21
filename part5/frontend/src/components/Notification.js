import React from 'react'
import { useSelector } from 'react-redux'

const Notification = () => {
  const notification = useSelector(state => state.notification)
  if (!notification) {
    return null
  }

  return (
    <div className={`notification notification--${notification.type}`}>
      {console.log('Got here')}
      {notification.text}
    </div>
  )
}



export default Notification
