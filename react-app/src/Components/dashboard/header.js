import React, { useEffect, useState } from "react";
import './asd.css';
import UserProfile from "../../UserProfile";
import img_logo from "../images/trucklogo.png";
import LogoutConfirmation from './Logout/logout';

function Header({ toggleSidebar }) {
  const [isUserAuthenticated, setIsUserAuthenticated] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [profileVisible, setProfileVisible] = useState(false);
  const [logoutModalVisible, setLogoutModalVisible] = useState(false);
  const [userDetails, setUserDetails] = useState({
    firstName: "",
    lastName: "",
    mailid: "",
    timeZone: "",
    createdTime: "",
    userid:"",
roledetails: {
    rolename: "",
    roleid: ""
  }
  });

  useEffect(() => {
    window.catalyst.auth
      .isUserAuthenticated()
      .then((result) => {
        let userDetails = {
          firstName: result.content.first_name,
          lastName: result.content.last_name,
          mailid: result.content.email_id,
          timeZone: result.content.time_zone,
          createdTime: result.content.created_time,
          userid: result.content.user_id,
roledetails: {
    rolename: result.content.role_details.role_name,
    roleid: result.content.role_details.role_id,
  }
        };
        setUserDetails(userDetails);
        setIsUserAuthenticated(true);
      })
      .catch((err) => { })
      .finally(() => {
        setIsFetching(false);
      });
  }, []);

  const handleLogout = () => {
    // Add logic for logging out the user
    setIsUserAuthenticated(false);
  };

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
    setProfileVisible(false); // Close profile view when toggling dropdown
  };

  const showProfile = () => {
    setProfileVisible(true);
    setDropdownVisible(false); // Close dropdown when showing profile
  };

  const closeProfile = () => {
    setProfileVisible(false);
  };

  const showLogoutModal = () => {
    setDropdownVisible(false);
    setLogoutModalVisible(true);
  };

  const closeLogoutModal = () => {
    setLogoutModalVisible(false);
  };

  const handleLogoutConfirm = () => {
    // Logic for handling logout can be added here
    closeLogoutModal();
  };

  return (
    <nav className="navbar bg-body-tertiary">
      <div className="container-fluid">
        <i className='bx bx-menu' onClick={toggleSidebar}></i>
        <a className="navbar-brand" href="#">
          <img src={img_logo} alt="Company Logo" className="company-logo" />
        </a>
        <div className="profile-container">
          <a href="#" className="profile" onClick={toggleDropdown}>
            <div className="profile-letter">
              {userDetails.firstName.charAt(0).toUpperCase()}
            </div>
          </a>
          {dropdownVisible && (
            <div className="dropdown-menu">
              <a href="#" className="dropdown-item" onClick={showProfile}>Profile</a>
              <a href="#" className="dropdown-item" onClick={showLogoutModal}>Logout</a>
            </div>
          )}
        </div>
      </div>
      {profileVisible && (
        <UserProfile userDetails={userDetails} onClose={closeProfile} />
      )}
      <LogoutConfirmation
        isOpen={logoutModalVisible}
        onClose={closeLogoutModal}
        onConfirm={handleLogoutConfirm}
      />
    </nav>
  );
}

export default Header;
