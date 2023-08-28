import React, { useState } from 'react'
import IdCardIMG from '../../assets/id_card.webp'
import { AuthenticateUser, GetTimeLogs, OfficeLogIn, OfficeLogOff } from '../../database/api_service';
import { app_config } from '../../utilities/config';
import { AuthenticationToken } from '../../models/authToken';

function TimeLogRequestModal({showModal, setShowModal, isError, setMessage, showInfo, setOfficeLogs}) {
    const [rfidCode, setRfidCode] = useState('');
    const [showPurpose, setShowPurpose] = useState(false);
    const [loading, setIsLoading] = useState(false)

    async function handleInput(e){
        if(loading)
            return;
        setIsLoading(true);
        setRfidCode(e.target.value)
        
        
        const RFID_CODE = e.target.value.trim();
        if(RFID_CODE === ''){
            setShowPurpose( false );
            setIsLoading(false);
            return;
        }
        console.log(RFID_CODE)

        const {AuthToken, StatusCode} = await AuthenticateUser({rfid:RFID_CODE, API_KEY: app_config.API_KEY});

        if(StatusCode === 401){
            /* Unauthorized */
            setIsLoading(false);
            return;
        }
        // try to log out
        const statusCode = await OfficeLogOff(AuthToken.AuthToken);

        /*
            StatusCode: 404
             - Clockin required
            StatusCode: 200
             - Success logout
        */
        setShowPurpose( statusCode === 404 ? true : false);
        if(statusCode === 200){
            isError(false);
            setMessage('Logged off successfully')
            showInfo(true);
            setRfidCode('')
            setShowModal(false);
            setOfficeLogs(await GetTimeLogs());
        }
        setIsLoading(false);
    }

    async function submitRequest(purpose){
        const {AuthToken, StatusCode} = await AuthenticateUser({rfid:rfidCode, API_KEY: app_config.API_KEY});

        if(StatusCode === 401){
            /* Unauthorized */
            isError(true);
            setMessage('Failed to Authenticate account');
            showInfo(true);
            return;
        }
        const authenticationToken = new AuthenticationToken(AuthToken);

        const statusCode = await OfficeLogIn(authenticationToken.AuthToken, purpose);

        if(statusCode === 201){
            isError(false);
            setMessage('Logged in successfully')
            showInfo(true);
            setShowModal(false);
            setRfidCode('')
            setShowPurpose(false);
            setOfficeLogs(await GetTimeLogs());
        }
    }

    function closeModal(e){
        if(e.target.id === 'log-request-modal'){
            setShowModal(false);
        }
    }
  return (
    <div id='log-request-modal' className={`modal ${showModal?'':'hidden'}`} onClick={closeModal}>
        <div className='form-container'>
            <form>
                <h2>Log to office</h2>
                <img src={IdCardIMG}/>
                <p>Tap your ID card in the RFID Scanner</p>
                <input id='rfid-input' type='password' placeholder='RFID Code' value={rfidCode} onChange={handleInput}/>
                <div className={`${!showPurpose?'hidden':''}`}>
                    <h3>Log purpose</h3>
                    <div className='flex'>
                        <div className='marginAuto grey' onClick={()=>{submitRequest('attendance')}}>
                            Attendance
                        </div>
                        <div className='marginAuto grey' onClick={()=>{submitRequest('meeting')}}>
                            Meeting
                        </div>
                        <div className='marginAuto grey' onClick={()=>{submitRequest('visit')}}>
                            Visit
                        </div>
                        <div className='marginAuto grey' onClick={()=>{submitRequest('standby')}}>
                            Standby
                        </div>
                    </div>
                </div>
                {!showPurpose?<div><br /></div>:''}
            </form>
        </div>
    </div>
  )
}

export default TimeLogRequestModal