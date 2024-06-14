

import React from "react";
import Button from "./Button";
import "./UserProfile.css";

function UserProfile({ userDetails, onClose }) {
  return (
    <div className="card">
 
      <button className="close-btn" onClick={onClose}>X</button>
      <br />
      <h2 className="title">User Profile Information</h2>
      <hr/>
      {/* <img
        alt="usericon"
        id="userimg"
        width="200px"
        height="200px"
        src="https://cdn2.iconfinder.com/data/icons/user-management/512/profile_settings-512.png"
      /> */}
      <p className="title">First Name: {userDetails.firstName}</p>
      <p className="title">Last Name: {userDetails.lastName}</p>
      <p className="title">Email Address: {userDetails.mailid}</p>
      <p className="title">Time Zone: {userDetails.timeZone}</p>
      <p className="title">Joined On: {userDetails.createdTime}</p>
      <Button className="logout-btn1" title="Logout" onClick={onClose}>Logout</Button>
      <p></p>
    </div>
  );
}

export default UserProfile;
