import React, { useImperativeHandle, useState } from "react"


const Togglable = React.forwardRef((props, ref) => {
    const [visible, setVisible] = useState(false)
    let returnButtonLabel = props.returnButtonLabel ? props.returnButtonLabel : 'Cancel'

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
                <button className='button button--cancel' onClick={toggleVisibility}>{returnButtonLabel}</button>
            </div>
        </div>
    )
})

export default Togglable