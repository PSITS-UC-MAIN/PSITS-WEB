import React, { useEffect, useState } from "react";
import "./calendarstyle.css";
import ProfileLog from "../Cards/ProfileLog";

function Calendar({ calendarData }) {
  const [day_1, setDay_1] = useState("");
  const [day_1_result, setDay_1_result] = useState([]);

  const [day_2, setDay_2] = useState("");
  const [day_2_result, setDay_2_result] = useState([]);

  const [day_3, setDay_3] = useState("");
  const [day_3_result, setDay_3_result] = useState([]);

  const [day_4, setDay_4] = useState("");
  const [day_4_result, setDay_4_result] = useState([]);

  const [day_5, setDay_5] = useState("");
  const [day_5_result, setDay_5_result] = useState([]);
  useEffect(() => {
    if (calendarData?._1) {
      setDay_1(new Date(calendarData._1.date).toDateString());
      setDay_1_result(calendarData._1.day1_result);
    }
    if (calendarData?._2) {
      setDay_2(new Date(calendarData._2.date).toDateString());
      setDay_2_result(calendarData._2.day2_result);
    }
    if (calendarData?._3) {
      setDay_3(new Date(calendarData._3.date).toDateString());
      setDay_3_result(calendarData._3.day3_result);
    }
    if (calendarData?._4) {
      setDay_4(new Date(calendarData._4.date).toDateString());
      setDay_4_result(calendarData._4.day4_result);
    }
    if (calendarData?._5) {
      setDay_5(new Date(calendarData._5.date).toDateString());
      setDay_5_result(calendarData._5.day5_result);
    }
  }, [calendarData]);

  const randomId = () => Math.floor(Math.random() * 999999999);
  return (
    <div className="calendar">
      {/*
        <div className="timeline">
            <div className="spacer"></div>
            <div className="time-marker">9 AM</div>
            <div className="time-marker">10 AM</div>
            <div className="time-marker">11 AM</div>
            <div className="time-marker">12 PM</div>
            <div className="time-marker">1 PM</div>
            <div className="time-marker">2 PM</div>
            <div className="time-marker">3 PM</div>
            <div className="time-marker">4 PM</div>
            <div className="time-marker">5 PM</div>
            <div className="time-marker">6 PM</div>
        </div>
        */}
      <div className="days">
        <div className="day mon">
          <div className="date">
            <p className="date-day">{day_5}</p>
          </div>
          <div className="events">
            {day_5_result.map((log) => (
              <ProfileLog
                key={randomId()}
                fullname={log.user.firstname + " " + log.user.lastname}
                loginTime={log.loginTime}
                logoutTime={log.logoutTime}
                purpose={log.remarks}
                imageSource={log.user.profile_img_link}
              />
            ))}
          </div>
        </div>
        <div className="day tues">
          <div className="date">
            <p className="date-day">{day_4}</p>
          </div>
          <div className="events">
            {day_4_result.map((log) => (
              <ProfileLog
                key={randomId()}
                fullname={log.user.firstname + " " + log.user.lastname}
                loginTime={log.loginTime}
                logoutTime={log.logoutTime}
                purpose={log.remarks}
                imageSource={log.user.profile_img_link}
              />
            ))}
          </div>
        </div>
        <div className="day wed">
          <div className="date">
            <p className="date-day">{day_3}</p>
          </div>
          <div className="events">
            {day_3_result.map((log) => (
              <ProfileLog
                key={randomId()}
                fullname={log.user.firstname + " " + log.user.lastname}
                loginTime={log.loginTime}
                logoutTime={log.logoutTime}
                purpose={log.remarks}
                imageSource={log.user.profile_img_link}
              />
            ))}
          </div>
        </div>
        <div className="day thurs">
          <div className="date">
            <p className="date-day">{day_2}</p>
          </div>
          <div className="events">
            {day_2_result.map((log) => (
              <ProfileLog
                key={randomId()}
                fullname={log.user.firstname + " " + log.user.lastname}
                loginTime={log.loginTime}
                logoutTime={log.logoutTime}
                purpose={log.remarks}
                imageSource={log.user.profile_img_link}
              />
            ))}
          </div>
        </div>
        <div className="day fri">
          <div className="date">
            <p className="date-day">{day_1}</p>
          </div>
          <div className="events">
            {day_1_result.map((log) => (
              <ProfileLog
                key={randomId()}
                fullname={log.user.firstname + " " + log.user.lastname}
                loginTime={log.loginTime}
                logoutTime={log.logoutTime}
                purpose={log.remarks}
                imageSource={log.user.profile_img_link}
              />
            ))}
          </div>
        </div>
      </div>
      <br />
    </div>
  );
}

export default Calendar;
