export class User{
    constructor({user_id, rfid, firstname, lastname, birthdate, email, profile_img_link, course, year, graduated}){
        this.user_id = user_id;
        this.rfid = rfid;
        this.firstname = firstname;
        this.lastname = lastname;
        this.birthdate = birthdate;
        this.email = email;
        this.profile_img_link = profile_img_link;
        this.course = course;
        this.year = year;
        this.graduated = graduated;
    }
}