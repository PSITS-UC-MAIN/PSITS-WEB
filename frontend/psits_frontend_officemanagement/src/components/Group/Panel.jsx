import React from 'react'

function Panel(props) {
    const {className} = props;
  return (
    <div className={`group`}>
        <div className={`panel ${className}`}>
            {props.children}
        </div>
    </div>
  )
}

export default Panel