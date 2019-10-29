import React from 'react'

const Alert = props => {
  const getClasses = () => {
    return "alert alert-dismissible fade show" + ((props.type == 'success') ? 'alert-success' : 'alert-warning')
  }

  return (
    <div class={getClasses()} role="alert">
      {props.message}
    </div>
  )
}

export default Alert