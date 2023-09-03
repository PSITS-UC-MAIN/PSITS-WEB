import React from "react";
import { ClearAppData } from "../../utilities/server_utils";

function Profile({ user, className }) {
  console.log(user);
  return (
    <div className={`profileCard ${className}`}>
      <div className="card">
        <h3>Logged in as</h3>
        <div className="profileImage">
          <img src={user.avatar} />
        </div>
        <div className="textContainer">
          <p className="name">
            {user.firstname} {user.lastname}
          </p>
          <p className="role">Administrator</p>
        </div>
        <div className="textContainer">
          <button
            className="button-general button-blue"
            onClick={() => {
              ClearAppData();
              window.location.href = "/";
            }}
          >
            Logout
          </button>
          <br />
          <br />
        </div>
      </div>
    </div>
  );
}

export default Profile;
