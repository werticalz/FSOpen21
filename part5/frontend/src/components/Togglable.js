import React, { useImperativeHandle, useState } from 'react'


const Togglable = React.forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false)
  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  useImperativeHandle(ref, () => {
    return {
      toggleVisibility
    }
  })

  return (
    <div>
      <div style={hideWhenVisible}>
        <button className='button' onClick={toggleVisibility}>{props.buttonLabel}</button>
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <button className='button button--cancel' onClick={toggleVisibility}>{props.returnButtonLabel}</button>
      </div>
    </div>
  )
})
Togglable.displayName = 'Togglable'
Togglable.defaultProps = {
  returnButtonLabel: 'Cancel'
}

export default Togglable