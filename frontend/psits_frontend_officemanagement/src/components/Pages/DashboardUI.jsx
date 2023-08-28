import React, { useEffect, useState } from 'react'
import Header from '../Header'
import { AppData } from '../../utilities/server_utils'
import { CheckAuthTokenExpired } from '../../database/api_service';
import Profile from '../Cards/Profile';
import Panel from '../Group/Panel';

function DashboardUI() {
    const [appData, setAppData] = useState(AppData())
    
    useEffect(()=>{
        async function verify(app_Data){
            if(!app_Data){
                window.location.href = "/login";
            }
            const res = await CheckAuthTokenExpired(app_Data.authToken.AuthToken)
            
            if(res){
                setAppData(null);
                window.location.href = "/login";
            }
        }
        verify(appData);
    }, [])

  return (
    <div>
        <Header />
        {
            appData?<>
                <Panel className={'flex-container marginAuto'}>
                    <Profile className={'marginAuto'} user={appData.user}/>
                </Panel>
            </>:""
        }
    </div>
  )
}

export default DashboardUI