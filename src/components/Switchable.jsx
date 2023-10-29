import { useState, forwardRef, useImperativeHandle } from 'react'
import PropTypes from 'prop-types'

const Switchable = forwardRef((props, refs) => {
  const [isLeftVisible, setIsLeftVisible] = useState(true)

  const leftVisible = { display: !isLeftVisible ? 'none' : '' }
  const rightVisible = { display: !isLeftVisible ? '' : 'none' }

  /*useImperativeHandle(refs, () => {
    return {
      toggleVisibility
    }
  })*/

  return (
    <div>
      <button onClick={() => setIsLeftVisible(true)}>{props.leftButtonLabel}</button>
      <button onClick={() => setIsLeftVisible(false)}>{props.rightButtonLabel}</button>
      <div style={leftVisible} className="switchableContent">
        {props.children[0]}
      </div>
      <div style={rightVisible} className="switchableContent">
        {props.children[1]}
      </div>
    </div>
  )
})

Switchable.displayName = 'Switchable'

Switchable.propTypes = {
  leftButtonLabel: PropTypes.string.isRequired,
  rightButtonLabel: PropTypes.string.isRequired
}

export default Switchable