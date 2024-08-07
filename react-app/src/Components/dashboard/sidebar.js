import React, { useState } from 'react';
import './asd.css';

function Sidebar12({ onMenuItemClick, closeSidebar, isSidebarOpen }) {
    const [activeItem, setActiveItem] = useState('');
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isProvinceDropdownOpen, setIsProvinceDropdownOpen] = useState(false);
    const [isHubsDropdownOpen, setIsHubsDropdownOpen] = useState(false);

    const handleMenuItemClick = (item) => {
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

    const toggleProvinceDropdown = () => {
        setIsProvinceDropdownOpen(!isProvinceDropdownOpen);
    };

    const toggleHubsDropdown = () => {
        setIsHubsDropdownOpen(!isHubsDropdownOpen);
    };

    return (
        <div className="sidebar1">
            <a 
                href="#" 
                className={activeItem === 'mybookings' ? 'active' : ''} 
                onClick={() => handleMenuItemClick('mybookings')}
            >
                My Bookings
            </a>
            <div className="dropdown1">
                <a 
                    href="#" 
                    className={activeItem === 'allbookings' ? 'active' : ''} 
                    onClick={handleAllBookingsClick}
                >
                    All Bookings 
                </a>
                <div className={`dropdown-content1 ${isDropdownOpen ? 'show' : ''}`}>
                    <div className="dropdown1">
                        <a 
                            href="#" 
                            className={activeItem === 'province' ? 'active' : ''} 
                            onClick={toggleProvinceDropdown}
                        >
                            Province
                        </a>
                        <div className={`dropdown-content1 green ${isProvinceDropdownOpen ? 'show' : ''}`}>
                            <a 
                                href="#" 
                                className={activeItem === 'alberta' ? 'active' : ''} 
                                onClick={() => handleMenuItemClick('alberta')}
                            >
                                Alberta
                            </a>
                            <a 
                                href="#" 
                                className={activeItem === 'ontario' ? 'active' : ''} 
                                onClick={() => handleMenuItemClick('ontario')}
                            >
                                Ontario
                            </a>
                        </div>
                    </div>
                    <div className="dropdown1">
                        <a 
                            href="#" 
                            className={activeItem === 'hubs' ? 'active' : ''} 
                            onClick={toggleHubsDropdown}
                        >
                            Hubs
                        </a>
                        <div className={`dropdown-content1 green ${isHubsDropdownOpen ? 'show' : ''}`}>
                            <a 
                                href="#" 
                                className={activeItem === 'london' ? 'active' : ''} 
                                onClick={() => handleMenuItemClick('london')}
                            >
                                London, Ontario
                            </a>
                            <a 
                                href="#" 
                                className={activeItem === 'toronto' ? 'active' : ''} 
                                onClick={() => handleMenuItemClick('toronto')}
                            >
                                Toronto, Ontario
                            </a>
                            <a 
                                href="#" 
                                className={activeItem === 'calgary' ? 'active' : ''} 
                                onClick={() => handleMenuItemClick('calgary')}
                            >
                                Calgary, Alberta
                            </a>
                        </div>
                    </div>
                    <a 
                        href="#" 
                        className={activeItem === 'trailer' ? 'active' : ''} 
                        onClick={() => handleMenuItemClick('trailer')}
                    >
                        Trailer
                    </a>
                </div>
            </div>
            <a 
                href="#" 
                className={activeItem === 'postbookings' ? 'active' : ''} 
                onClick={() => handleMenuItemClick('postbookings')}
            >
                Past Bookings
            </a>
            {/* <a 
                href="#" 
                className={activeItem === 'logout' ? 'active' : ''} 
                onClick={() => handleMenuItemClick('logout')}
            >
                Log Out
            </a> */}
        </div>
    );
}

export default Sidebar12;
