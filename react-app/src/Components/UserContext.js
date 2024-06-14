import React, { createContext, useState, useContext, useEffect } from 'react';

const UserContext = createContext();

export const useUserContext = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const [userDetails, setUserDetails] = useState({
    firstName: "",
    lastName: "",
    mailid: "",
    timeZone: "",
    createdTime: "",
  });
  const [isUserAuthenticated, setIsUserAuthenticated] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  const [activeItem, setActiveItem] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

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
        };
        setUserDetails(userDetails);
        setIsUserAuthenticated(true);
      })
      .catch((err) => { })
      .finally(() => {
        setIsFetching(false);
      });
  }, []);

  const handleMenuItemClick = (item, onMenuItemClick, closeSidebar) => {
    setActiveItem(item);
    onMenuItemClick(item);

    if (item !== 'allbookings') {
      closeSidebar(); 
      if (isDropdownOpen) {
        setIsDropdownOpen(false); 
      }
    }
  };

  const handleAllBookingsClick = () => {
    if (activeItem === 'allbookings' && isSidebarOpen) {
      closeSidebar(); 
    } else {
      handleMenuItemClick('allbookings');
      toggleDropdown();
    }
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };
  
  const closeSidebar = () => {
    setIsSidebarOpen(false);
};

  return (
    <UserContext.Provider value={{
      userDetails,
      setUserDetails,
      isUserAuthenticated,
      isFetching,
      activeItem,
      setActiveItem,
      isDropdownOpen,
      setIsDropdownOpen,
      isSidebarOpen,
      setIsSidebarOpen,
      handleMenuItemClick,
      handleAllBookingsClick,
      toggleDropdown
    }}>
      {children}
    </UserContext.Provider>
  );
};
