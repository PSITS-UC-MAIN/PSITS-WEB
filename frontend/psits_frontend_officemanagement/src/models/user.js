export class User {
  constructor({
    userId,
    rfid,
    firstname,
    lastname,
    birthdate,
    email,
    avatar,
    course,
    year,
    graduated,
  }) {
    this.userId = userId;
    this.rfid = rfid;
    this.firstname = firstname;
    this.lastname = lastname;
    this.birthdate = birthdate;
    this.email = email;
    this.avatar = avatar;
    this.course = course;
    this.year = year;
    this.graduated = graduated;
  }
}
