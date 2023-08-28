import React from 'react'
import { AppData, ClearAppData } from '../utilities/server_utils'
import logoIMG from '/logo/psits_logo.png'

function Header() {
  const appData = AppData();
  return (
    <div className='page-header'>
        <div className='logo'>
          <div className='imageContainer'>
            <img src={logoIMG}/>
          </div>
          <h1>Philippine Society of Information Technology Students</h1>
        </div>
        {
          appData?<button onClick={()=>{ClearAppData();window.location.href='/'}}>Logout</button>:''
        }
    </div>
  )
}

export default Header