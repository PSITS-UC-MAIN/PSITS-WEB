import { AuthenticateUser, GetTimeLogs, GetUserData } from "../database/api_service"
import { AuthenticationToken } from "../models/authToken";
import { User } from "../models/user";

export const LoginUser = async ({rfid, password}) => {
    const {StatusCode, AuthToken} = await AuthenticateUser({rfid, password})

    if(StatusCode === 200){
        const authToken = new AuthenticationToken(AuthToken);
        const user = await GetUserData(authToken.AuthToken, authToken.issuer);
        
        // save cache
        window.localStorage.setItem('app_user_data', JSON.stringify({authToken, user}));
        return {StatusCode, AuthToken, Message: "Login Successful!"};
    }else if(StatusCode === 401){
        return {StatusCode, AuthToken, Message: "Unauthorized login!"};
    }else{
        return {StatusCode, AuthToken, Message: "Login Failed!"};
    }
}

export const AppData = () => {
    let retrievedInfo = window.localStorage.getItem('app_user_data');
    if(!retrievedInfo)
        return null;
    const {authToken, user} = JSON.parse(retrievedInfo);
    return {authToken:new AuthenticationToken(authToken), user: new User(user)}
}

export const ClearAppData = () => {
    window.localStorage.removeItem('app_user_data');
}

export const Get5DaysBefore = async (dateNow = new Date()) =>{
    const dateNowCopy = dateNow;
    const day1 = new Date(new Date(dateNowCopy.setHours(0,0,0,0))).toISOString();
    const day2 = new Date(new Date(dateNowCopy).setHours(-24,0,0,0)).toISOString();
    const day3 = new Date(new Date(dateNowCopy).setHours(-48,0,0,0)).toISOString();
    const day4 = new Date(new Date(dateNowCopy).setHours(-72,0,0,0)).toISOString();
    const day5 = new Date(new Date(dateNowCopy).setHours(-96,0,0,0)).toISOString();

    const day1_result = await GetTimeLogs(day1, new Date(dateNowCopy.setHours(24,0,0,0)).toISOString());
    const day2_result = await GetTimeLogs(day2, day1);
    const day3_result = await GetTimeLogs(day3, day2);
    const day4_result = await GetTimeLogs(day4, day3);
    const day5_result = await GetTimeLogs(day5, day4);

    return {
        "_1":{
            date: day1,
            day1_result
        },
        "_2":{
            date: day2,
            day2_result
        },
        "_3":{
            date: day3,
            day3_result
        },
        "_4":{
            date: day4,
            day4_result
        },
        "_5":{
            date: day5,
            day5_result
        }
    }
}