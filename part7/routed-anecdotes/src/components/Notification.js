import React from 'react'

const Notification = ({ notification }) => {
  if (!notification) {
    return null
  }

  return (
    <div><br></br><b>{notification}</b></div>
  )
}

export default Notification