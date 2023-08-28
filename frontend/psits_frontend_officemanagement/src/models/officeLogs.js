export class OfficeLog{
    constructor({id, user_id, loginTime, logoutTime, remarks, fullname, profile_img_link}){
        this.user_id = user_id;
        this.loginTime = loginTime;
        this.logoutTime = logoutTime;
        this.remarks = remarks;
        this.fullname = fullname;
        this.profile_img_link = profile_img_link;
        this.id = id;
    }
}