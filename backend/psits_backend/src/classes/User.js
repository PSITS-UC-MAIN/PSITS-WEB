class User{
    constructor(userModel){
        this.user_id = userModel.user_id;
        this.rfid = userModel.rfid;
        this.firstname = userModel.firstname;
        this.lastname = userModel.lastname;
        this.birthdate = userModel.birthdate;
        this.email = userModel.email;
        this.profile_img_link = userModel.profile_img_link;
        this.course = userModel.course;
        this.year = userModel.year;
        this.graduated = userModel.graduated;
    }
}

module.exports = User;