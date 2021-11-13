import React from 'react'
import { connect } from 'react-redux'

const Notification = ({ notification }) => {
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

const mapStateToProps = (state) => {
  return {
    notification: state.notifications
  }
}

export default connect(mapStateToProps)(Notification)
