import React, { useState, useEffect } from 'react'
import Header from '../Header'
import Panel from '../Group/Panel'
import TimeLog from '../Cards/TimeLog'
import TimeLogRequestModal from '../Modal/TimeLogRequestModal'
import InfoPopup from '../Utils/InfoPopup'
import { GetTimeLogs } from '../../database/api_service'

function TimeLogUI() {
    const [showLogModal, setShowLogModal] = useState(false)
    const [showInfo, setShowInfo] = useState(false)
    const [isError, setIsError] = useState(false)
    const [infoMessage, setInfoMessage] = useState('')
    const [officeLogs, setOfficeLogs] = useState([])
    const [currentDate, setCurrentDate] = useState(new Date().toDateString());

    useEffect(()=>{
        async function loadLogs(){
            setOfficeLogs(await GetTimeLogs());
        }
        loadLogs();

        const loadId = setInterval(()=>{
            loadLogs();
            setCurrentDate(new Date().toDateString());
        },10_000);

        return () => clearInterval(loadId);
    },[]);

    async function openModal(){
        setShowLogModal(true)
        setTimeout(()=>{
            document.getElementById('rfid-input').focus();
        },500)
    }

    function closeInfo(){
        setShowInfo(false)
    }

    function handleInfoMessage(show){
        if(show){
            setShowInfo(true);
            setTimeout(()=>{setShowInfo(false)}, 5000)
        }
    }
  return (
    <>
        <div>
            <TimeLogRequestModal showModal={showLogModal} setShowModal={setShowLogModal} showInfo={handleInfoMessage}  isError={setIsError} setMessage={setInfoMessage} setOfficeLogs={setOfficeLogs}/>
            <Header />
            <Panel className={'flex-container marginAuto'}>
                <TimeLog currentDate={currentDate} officeLogs={officeLogs} handleLogRequest={openModal} className={'marginAuto'}/>
            </Panel>
            <div className='bottom-left'>
                <InfoPopup className={(showInfo?'':'hide') + (isError?'redBG':'')} message={infoMessage} onClose={closeInfo}/>
            </div>
        </div>
    </>
  )
}

export default TimeLogUI