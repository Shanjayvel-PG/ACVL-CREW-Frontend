
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

function Sidebar12({ onMenuItemClick, closeSidebar, isSidebarOpen }) {
    const [activeItem, setActiveItem] = useState('');
    const [isAllMovesDropdownOpen, setIsAllMovesDropdownOpen] = useState(false);
    const [isActiveMovesDropdownOpen, setIsActiveMovesDropdownOpen] = useState(false);
    const [isProvinceDropdownOpen, setIsProvinceDropdownOpen] = useState(false);
    const [isHubsDropdownOpen, setIsHubsDropdownOpen] = useState(false);

    const handleMenuItemClick = (item) => {
        setActiveItem(item);
        onMenuItemClick(item);

        if (item !== 'allbookings') {
            closeSidebar();
            setIsAllMovesDropdownOpen(false);
            setIsActiveMovesDropdownOpen(false);
        }
    };

    const toggleAllMovesDropdown = () => {
        setIsAllMovesDropdownOpen(!isAllMovesDropdownOpen);
    };

    const toggleActiveMovesDropdown = () => {
        if (activeItem === 'allbookings' && isSidebarOpen) {
            closeSidebar();
            setIsActiveMovesDropdownOpen(false);
        } else {
            handleMenuItemClick('allbookings');
            setIsActiveMovesDropdownOpen(true);
        }
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
            {/* My Jobs */}
            <a 
                href="#" 
                className={activeItem === 'mybookings' ? 'active' : ''} 
                onClick={() => handleMenuItemClick('mybookings')}
            >
                My Jobs 
            </a>

            {/* All Moves Dropdown */}
            <div className="dropdown1">
                <a 
                    href="#" 
                    onClick={toggleAllMovesDropdown}
                >
                    All Moves
                </a>
                <div className={`dropdown-content1 ${isAllMovesDropdownOpen ? 'show' : ''}`}>
                    
                    {/* Active Moves */}
                    <a 
                        href="#" 
                        className={activeItem === 'allbookings' ? 'active' : ''} 
                        onClick={toggleActiveMovesDropdown}  // Toggling Active Moves
                    >
                        Active Moves
                    </a>

                    {/* Active Moves Dropdown Content */}
                    <div style={{background:'#fff'}} className={`dropdown-content1 green ${isActiveMovesDropdownOpen ? 'show' : ''}`}>
                        <div className="dropdown1">
                            <a 
                                href="#" 
                                className={activeItem === 'province' ? 'active' : ''} 
                                onClick={toggleProvinceDropdown}
                            >
                                Province
                            </a>
                            <div style={{background:'#cecece'}} className={`dropdown-content1 green ${isProvinceDropdownOpen ? 'show' : ''}`}>
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
                            <div style={{background:'#cecece'}} className={`dropdown-content1 green ${isHubsDropdownOpen ? 'show' : ''}`}>
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

                    {/* Closed Moves */}
                    <a 
                        href="#" 
                        className={activeItem === 'postbookings' ? 'active' : ''} 
                        onClick={() => handleMenuItemClick('postbookings')}
                    >
                        Closed Moves
                    </a>

                    {/* Storage */}
                    <a 
                        href="#" 
                        className={activeItem === 'Storage' ? 'active' : ''} 
                        onClick={() => handleMenuItemClick('Storage')}
                    >
                        Storage
                    </a>
                </div>
            </div>

            {/* Add Moves */}
            <a 
                href="#" 
                className={activeItem === 'Addmoves' ? 'active' : ''} 
                onClick={() => handleMenuItemClick('Addmoves')}
            >
                Add Moves
            </a>
            <a 
                href="#" 
                className={activeItem === 'taskcalender' ? 'active' : ''} 
                onClick={() => handleMenuItemClick('taskcalender')}
            >
                Task Calendar
            </a>

            {/* Finance */}
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

