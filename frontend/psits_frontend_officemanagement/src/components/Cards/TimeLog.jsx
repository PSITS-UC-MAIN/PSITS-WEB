import React, { useEffect, useState } from 'react'
import Button from '../Utils/Button'
import ProfileLog from './ProfileLog'
import NotFoundIMG from '../../assets/not_found.jpg'

function TimeLog({className, handleLogRequest, officeLogs, currentDate}) {
    const [time, setTime] = useState('');

    useEffect(()=>{
      function updateTime(){
        setTime(new Date().toLocaleString().split(',')[1]);
      }
      setInterval(updateTime, 1000); 
    },[]);
    
  return (
    <div className={`timelogCard ${className}`}>
        <div className='card'>
            <h2>Office Log</h2>
            <h3 className='date'>{currentDate}</h3>
            <h3 className='time'>{time}</h3>
            <Button onClick={handleLogRequest} className={'center-abs-x'}>Click to log</Button>
            <hr />
            <div className='logs'>
                {
                    officeLogs.map(log => 
                        <ProfileLog key={log.id} fullname={log.fullname} loginTime={log.loginTime} logoutTime={log.logoutTime} purpose={log.remarks} imageSource={log.profile_img_link}/>
                    )
                }
                {
                    officeLogs.length === 0 ? 
                    (
                        <div className='not-found'>
                            <img src={NotFoundIMG}/>
                            <p>No logs yet</p>
                        </div>
                    ) : ''
                }
                
            </div>
            <hr />
            <br />
        </div>
    </div>
  )
}

export default TimeLog