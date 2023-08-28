import React from 'react'
import logoIMG from '/logo/psits_logo.png'

function Header() {
  return (
    <div className='page-header'>
        <div className='logo'>
          <div className='imageContainer'>
            <img src={logoIMG}/>
          </div>
          <h1>Philippine Society of Information Technology Students</h1>
        </div>
    </div>
  )
}

export default Header