import { OfficeLog } from "../models/officeLogs";
import { User } from "../models/user";
import { app_config } from "../utilities/config"

export const AuthenticateUser = async ({rfid, password, API_KEY}) => {
    const arg1 = API_KEY?'API_KEY':'password'
    const res = await fetch(app_config.API_URL+"/auth",{
        method: 'GET',
        headers: {
            rfid:rfid??'-',
            [arg1]:API_KEY?API_KEY:password
        }
    });

    const json = await res.json();

    return json;
}

export const GetUserData = async (AuthToken, UserID) => {
    const res = await fetch(app_config.API_URL+"/user/"+UserID,{
        method: 'GET',
        headers: {
            AuthToken
        }
    });

    const {UserData} = await res.json();

    return new User(UserData);
}

export const CheckAuthTokenExpired = async (AuthToken) => {
    const res = await fetch(app_config.API_URL+"/auth/validate",{
        headers:{
            AuthToken
        }
    })
    const {IsExpired, StatusCode} = await res.json();
    if(StatusCode === 403)
        return true;
    return !!IsExpired;
}

export const GetTimeLogs = async (min = new Date(new Date().setHours(0)).toISOString(), max = new Date().toISOString()) => {
    const res = await fetch(app_config.API_URL+"/officelog",{
        headers:{
            API_KEY: app_config.API_KEY,
            option: 'latest',
            min,
            max
        }
    })

    const {officeLogs, StatusCode} = await res.json();
    const OfficeLogs = []

    if(StatusCode === 401)
        return OfficeLogs;

    
    for(const log of officeLogs){
        const user_res = await fetch(app_config.API_URL+"/user/api_key/"+log.user,{
            headers:{
                API_KEY: app_config.API_KEY
            }
        })

        const {UserData} = await user_res.json()
        
        OfficeLogs.push(new OfficeLog({
            user_id: UserData.user_id,
            fullname: `${UserData.firstname} ${UserData.lastname}`,
            profile_img_link: UserData.profile_img_link,
            loginTime: log.loginTime,
            logoutTime: log.logoutTime,
            remarks: log.remarks,
            id: log._id
        }));
    }

    
    OfficeLogs.sort((a,b)=> {
        return new Date(b.loginTime) - new Date(a.loginTime);
    })
    return OfficeLogs;
}

export const OfficeLogOff = async (AuthToken) => {
    const res = await fetch(app_config.API_URL+"/officelog",{
        method: 'PATCH',
        headers:{
            AuthToken,
            API_KEY: app_config.API_KEY
        }
    })

    const {StatusCode} = await res.json();
    return StatusCode
}

export const OfficeLogIn = async (AuthToken, reason) => {
    const res = await fetch(app_config.API_URL+"/officelog",{
        method: 'POST',
        headers:{
            AuthToken,
            API_KEY: app_config.API_KEY,
            'Content-Type': 'application/json'
        },
        body:JSON.stringify({
            'remarks': reason
        })
    })

    const {StatusCode} = await res.json();
    return StatusCode
}