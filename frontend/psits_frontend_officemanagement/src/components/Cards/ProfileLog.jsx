import React, { useEffect, useState } from 'react'

function ProfileLog({fullname, loginTime, logoutTime, purpose, imageSource}) {
    const [logIn, setLogIn] = useState('');
    const [logOff, setLogOff] = useState('');

    useEffect(()=>{
        setLogIn(new Date(loginTime).toLocaleString().split(',')[1])
        if(logoutTime){
            setLogOff(new Date(logoutTime).toLocaleString().split(',')[1])
        }else{
            setLogOff(`-`)
        }
    }, [loginTime, logoutTime])
  return (
    <div className='profile-log'>
        <div className='image'>
            <img src={imageSource}/>
        </div>
        <div className='log-info'>
            <p className='name'>{fullname}</p>
            <p className='log-time'>Login time: {logIn}</p>
            <p className='log-time'>Logout time: {logOff}</p>
            <p className='purpose'>Purpose: <a className='orange-text'>{purpose.toUpperCase()}</a></p>
        </div>
    </div>
  )
}

export default ProfileLog