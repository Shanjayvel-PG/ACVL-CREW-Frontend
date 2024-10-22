
// import React, { useState } from 'react';
// import './asd.css';

// function Sidebar12({ onMenuItemClick, closeSidebar, isSidebarOpen }) {
//     const [activeItem, setActiveItem] = useState('');
//     const [isDropdownOpen, setIsDropdownOpen] = useState(false);
//     const [isProvinceDropdownOpen, setIsProvinceDropdownOpen] = useState(false);
//     const [isHubsDropdownOpen, setIsHubsDropdownOpen] = useState(false);

//     const handleMenuItemClick = (item) => {
//         setActiveItem(item);
//         onMenuItemClick(item);

//         if (item !== 'allbookings') {
//             closeSidebar(); 
//             if (isDropdownOpen) {
//                 setIsDropdownOpen(false); 
//             }
//         }
//     };

//     const handleAllBookingsClick = () => {
//         if (activeItem === 'allbookings' && isSidebarOpen) {
//             closeSidebar(); 
//         } else {
//             handleMenuItemClick('allbookings');
//             toggleDropdown();
//         }
//     };

//     const toggleDropdown = () => {
//         setIsDropdownOpen(!isDropdownOpen);
//     };

//     const toggleProvinceDropdown = () => {
//         setIsProvinceDropdownOpen(!isProvinceDropdownOpen);
//         if (!isProvinceDropdownOpen) {
//             setIsHubsDropdownOpen(false); 
//         }
//     };

//     const toggleHubsDropdown = () => {
//         setIsHubsDropdownOpen(!isHubsDropdownOpen);
//         if (!isHubsDropdownOpen) {
//             setIsProvinceDropdownOpen(false); 
//         }
//     };

//     return (
//         <div className="sidebar1">
//             <a 
//                 href="#" 
//                 className={activeItem === 'mybookings' ? 'active' : ''} 
//                 onClick={() => handleMenuItemClick('mybookings')}
//             >
//                 My Jobs 
//             </a>
//             <div className="dropdown1">
//                 <a 
//                     href="#" 
//                     className={activeItem === 'allbookings' ? 'active' : ''} 
//                     onClick={handleAllBookingsClick}
//                 >
//                     Active Moves
//                 </a>
//                 <div className={`dropdown-content1 ${isDropdownOpen ? 'show' : ''}`}>
//                     <div className="dropdown1">
//                         <a 
//                             href="#" 
//                             className={activeItem === 'province' ? 'active' : ''} 
//                             onClick={toggleProvinceDropdown}
//                         >
//                             Province
//                         </a>
//                         <div className={`dropdown-content1 green ${isProvinceDropdownOpen ? 'show' : ''}`}>
//                             <a 
//                                 href="#" 
//                                 className={activeItem === 'alberta' ? 'active' : ''} 
//                                 onClick={() => handleMenuItemClick('alberta')}
//                             >
//                                 Alberta
//                             </a>
//                             <a 
//                                 href="#" 
//                                 className={activeItem === 'ontario' ? 'active' : ''} 
//                                 onClick={() => handleMenuItemClick('ontario')}
//                             >
//                                 Ontario
//                             </a>
//                         </div>
//                     </div>
//                     <div className="dropdown1">
//                         <a 
//                             href="#" 
//                             className={activeItem === 'hubs' ? 'active' : ''} 
//                             onClick={toggleHubsDropdown}
//                         >
//                             Hubs
//                         </a>
//                         <div className={`dropdown-content1 green ${isHubsDropdownOpen ? 'show' : ''}`}>
//                             <a 
//                                 href="#" 
//                                 className={activeItem === 'london' ? 'active' : ''} 
//                                 onClick={() => handleMenuItemClick('london')}
//                             >
//                                 London, Ontario
//                             </a>
//                             <a 
//                                 href="#" 
//                                 className={activeItem === 'toronto' ? 'active' : ''} 
//                                 onClick={() => handleMenuItemClick('toronto')}
//                             >
//                                 Toronto, Ontario
//                             </a>
//                             <a 
//                                 href="#" 
//                                 className={activeItem === 'calgary' ? 'active' : ''} 
//                                 onClick={() => handleMenuItemClick('calgary')}
//                             >
//                                 Calgary, Alberta
//                             </a>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//             <a 
//                 href="#" 
//                 className={activeItem === 'Addmoves' ? 'active' : ''} 
//                 onClick={() => handleMenuItemClick('Addmoves')}
//             >
//                 Add Moves
//             </a>
//             <a 
//                 href="#" 
//                 className={activeItem === 'Storage' ? 'active' : ''} 
//                 onClick={() => handleMenuItemClick('Storage')}
//             >
//                 Storage
//             </a>
//             <a 
//                 href="#" 
//                 className={activeItem === 'postbookings' ? 'active' : ''} 
//                 onClick={() => handleMenuItemClick('postbookings')}
//             >
//                 Closed Moves
//             </a>
//             <a 
//                 href="#" 
//                 className={activeItem === 'finance' ? 'active' : ''} 
//                 onClick={() => handleMenuItemClick('finance')}
//             >
//                 Finance
//             </a>
//         </div>
//     );
// }

// export default Sidebar12;
import React, { useState } from 'react';
import './asd.css';
import { FaArrowRight } from 'react-icons/fa';  

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
        if (!isProvinceDropdownOpen) {
            setIsHubsDropdownOpen(false); 
        }
    };

    const toggleHubsDropdown = () => {
        setIsHubsDropdownOpen(!isHubsDropdownOpen);
        if (!isHubsDropdownOpen) {
            setIsProvinceDropdownOpen(false); 
        }
    };

    return (
        <div className="sidebar1">
            <a 
                href="#" 
                className={activeItem === 'mybookings' ? 'active' : ''} 
                onClick={() => handleMenuItemClick('mybookings')}
            >
                My Jobs 
            </a>
            <a 
                href="#" 
                className={activeItem === 'allmoves' ? 'active' : ''} 
                onClick={() => handleMenuItemClick('allmoves')}
            >
                All Moves
            </a>
            <div className="dropdown1" style={{marginLeft:"20px"}}>
                <a 
                    href="#" 
                    className={activeItem === 'allbookings' ? 'active' : ''} 
                    onClick={handleAllBookingsClick}
                    // style={{marginLeft:"20px"}}
                >
                    <FaArrowRight className="arrow-icon" />Active Moves 
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
                </div>
            </div>
            <a 
                href="#" 
                className={activeItem === 'Storage' ? 'active' : ''} 
                onClick={() => handleMenuItemClick('Storage')}
                style={{marginLeft:"20px"}}
            >
                <FaArrowRight className="arrow-icon" />Storage
            </a>
            <a 
                href="#" 
                className={activeItem === 'postbookings' ? 'active' : ''} 
                onClick={() => handleMenuItemClick('postbookings')}
                style={{marginLeft:"20px"}}
            >
                <FaArrowRight className="arrow-icon" />Closed Moves
            </a>
            <a 
                href="#" 
                className={activeItem === 'Addmoves' ? 'active' : ''} 
                onClick={() => handleMenuItemClick('Addmoves')}
            >
                Add Moves
            </a>
            <a 
                href="#" 
                className={activeItem === 'jobcalendar' ? 'active' : ''} 
                onClick={() => handleMenuItemClick('jobcalendar')}
            >
                Job Calendar
            </a>
            <a 
                href="#" 
                className={activeItem === 'finance' ? 'active' : ''} 
                onClick={() => handleMenuItemClick('finance')}
            >
                Finance
            </a>
        </div>
    );
}

export default Sidebar12;