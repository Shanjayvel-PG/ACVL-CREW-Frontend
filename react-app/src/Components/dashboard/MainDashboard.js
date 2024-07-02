
import React, { useState, useEffect } from "react";
import Sidebar12 from "./sidebar";
import Content12 from "./MainInfo";
import Header from "./header";
import "./asd.css";
import LogoutConfirmation from "./Logout/logout";

function App12({ userDetails }) { // Accept userDetails as a prop
    const [selectedContent, setSelectedContent] = useState('');
    const [isLogoutConfirmationOpen, setIsLogoutConfirmationOpen] = useState(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    useEffect(() => {
        const savedContent = localStorage.getItem('selectedContent');
        const savedSidebarState = localStorage.getItem('isSidebarOpen');

        if (savedContent) {
            setSelectedContent(savedContent);
        }

        if (savedSidebarState !== null) {
            setIsSidebarOpen(savedSidebarState === 'true');
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('selectedContent', selectedContent);
    }, [selectedContent]);

    useEffect(() => {
        localStorage.setItem('isSidebarOpen', isSidebarOpen);
    }, [isSidebarOpen]);

    const handleMenuItemClick = (content) => {
        if (content === 'logout') {
            setIsLogoutConfirmationOpen(true);
        } else {
            setSelectedContent(content);
        }
    };

    const clearCookies = () => {
        document.cookie.split(";").forEach(cookie => {
            const eqPos = cookie.indexOf("=");
            const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
            document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/";
            document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/;domain=" + window.location.hostname;
            document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/;domain=." + window.location.hostname;
        });
    };

    const handleLogoutConfirm = () => {
        clearCookies();
        window.location.href = window.origin + "/__catalyst/auth/login";
    };

    const handleLogoutCancel = () => {
        setIsLogoutConfirmationOpen(false);
    };

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const closeSidebar = () => {
        setIsSidebarOpen(false);
    };

    return (
        <div className="container">
            <Header toggleSidebar={toggleSidebar} firstName={userDetails.firstName} /> {/* Pass firstName to Header */}
            <div className={`sidebar-container ${isSidebarOpen ? 'open' : ''}`}>
                <Sidebar12 onMenuItemClick={handleMenuItemClick} closeSidebar={closeSidebar} />
            </div>
            <div className={`content ${isSidebarOpen ? 'sidebar-open' : ''}`}>
                <Content12 selectedContent={selectedContent} />
            </div>
            <LogoutConfirmation isOpen={isLogoutConfirmationOpen} onConfirm={handleLogoutConfirm} onClose={handleLogoutCancel} />
        </div>
    );
}

export default App12;
