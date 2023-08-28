import React from 'react'

function Button({children, onClick, className}) {
  return (
    <button className={`button-general ${className}`} onClick={(e)=>{if(onClick)onClick(e);}}>{children}</button>
  )
}

export default Button