import React, { useState } from 'react'
import Header from '../Header'
import FormComponent from '../Form/FormComponent'
import InfoPopup from '../Utils/InfoPopup';
import { LoginUser } from '../../utilities/server_utils';

function LoginUI() {
    const [showInfo, setShowInfo] = useState(false);
    const [isError, setIsError] = useState(false)
    const [infoMessage, setInfoMessage] = useState('')

    async function handleSubmit(e){
        const {rfid, password} = e.payload;

        const LoginData = await LoginUser({rfid, password});
        
        (LoginData.StatusCode === 400 || LoginData.StatusCode === 401)?setIsError(true):setIsError(false);
        setInfoMessage(LoginData.Message)
        setShowInfo(true)
        setTimeout(()=>{
            setShowInfo(false);
            if(LoginData.StatusCode === 200)
                window.location.href = '/'
        }, 2000)
    }

    function closeInfo(){
        setShowInfo(false)
    }
    return (
        <div>
            <Header />
            
            <FormComponent onSubmit={handleSubmit} />
            <div className='bottom-left'>
                <InfoPopup className={(showInfo?'':'hide') + (isError?'redBG':'')} message={infoMessage} onClose={closeInfo}/>
            </div>
        </div>
    )
}

export default LoginUI