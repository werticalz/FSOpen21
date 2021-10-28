import React from 'react'

const Notification = ({ message }) => {
  if (!message) {
    return null
  }
  console.log('Notification message:', message)
  return (
    <div class={`notification notification--${message.type}`}>
      {message.text}
    </div>
  )
}

export default Notification