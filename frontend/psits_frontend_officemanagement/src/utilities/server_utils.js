import { AuthenticateUser, GetUserData } from "../database/api_service"
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