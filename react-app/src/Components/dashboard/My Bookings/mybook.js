import React, {useState} from "react";
import { BsGrid1X2Fill } from "react-icons/bs";
import { FaMapMarkerAlt, FaClipboardList} from "react-icons/fa";
import { useUserContext } from '../../UserContext';
import "../My Bookings/mybook.css";
import "react-datepicker/dist/react-datepicker.css";
import MapComponent from "../../MapVisualization";
import Gridview from "../../Gridvisualization";
import useBookings from '../../usebooking';
import ListView from "../../Listvisualization";

const Mybookings = () => {
  const { userDetails, isUserAuthenticated } = useUserContext();
  const rolename = userDetails.roledetails.rolename.toLowerCase(); 

  const {
    bookingsData, selectedBooking, editableBooking, activeTab, activeInventoryTab,
    loading, error, query, viewMode, editStates, isPopupVisible, popupContent,
    setQuery, setViewMode, setEditStates, setIsPopupVisible, setPopupContent,
    handleClosePopup, handlePopupOpen, parseDate, getLastTwoLetters, formatDate,
    handleBookingClick, isFutureOrToday, generateGoogleMapsLink, handleSave,
    handleBookingClick1, toggleEditState, handleInputChange, navigate, parsedDate,
    renderBookingDetails, renderCrewnotesBookingDetails, handleInputChange1, downloadPDF,
  } = useBookings();

  const extractFirstName = (fullName) => { 
    if (typeof fullName === "string") {
      const parts = fullName.split(" ");
      if (parts.length > 0) {
        return parts[0].toLowerCase();
      }
    }
    return "";
  };

  const getStatusBasedOnRole = (allStatuses) => {
    switch (rolename) {
      case 'sales agent-lead':
        return ['Booked Moves'];
      case 'dispatch agent-lead':
        return allStatuses.filter(status => status !== 'Review Completed' && status !== 'Move Cancelled');
      default:
        return [];
    }
  };
const statusFilter = getStatusBasedOnRole();

const filteredBookingsData = bookingsData
  .filter((booking) => {
    const formattedDate = formatDate(booking.MoveDate);
    const bookingValues = Object.values(booking).map((value) =>
      String(value).toLowerCase()
    );

    const userFirstName = userDetails.firstName.toLowerCase(); 
    const AssignedToFirstName = extractFirstName(booking["Assigned_To"]);
    const nameMatch = AssignedToFirstName === userFirstName;
    if (['Review Completed', 'Move Cancelled'].includes(booking.Status)) {
      return false;
    }
    return (
      (statusFilter.includes(booking.Status) || nameMatch) &&
      (bookingValues.some((value) => value.includes(query.toLowerCase())) ||
        formattedDate.toLowerCase().includes(query.toLowerCase())) 
    );
  })
  .sort((a, b) => {
    const aAssignedToFirstName = extractFirstName(a["Assigned_To"]);
    const bAssignedToFirstName = extractFirstName(b["Assigned_To"]);
    const isAssignedToUserA = aAssignedToFirstName === userDetails.firstName.toLowerCase();
    const isAssignedToUserB = bAssignedToFirstName === userDetails.firstName.toLowerCase();

    if (isAssignedToUserA && !isAssignedToUserB) {
      return -1;
    }
    if (!isAssignedToUserA && isAssignedToUserB) {
      return 1;
    }
    return parseDate(a.MoveDate) - parseDate(b.MoveDate);
  });

  // const totalBookings = filteredBookingsData.length; 
  const [totalBookings, setTotalBookings] = useState(0);

  const handleMarkerClick = (bookingId) => {
    handleBookingClick1(bookingId);
    setViewMode("list");
  };

  return (
    <div className="bookings-my">
      <div className="main-content-my">
        <div className="header-my">
          {/* <h1>My Jobs ({totalBookings})</h1> */}
          <div className="totalmoves">
            <h1>My Jobs</h1><p>Total Moves: {totalBookings}</p> 
          </div>

          <div className="search-bar">
            <input
              type="text"
              value={query}
              onChange={handleInputChange1}
              placeholder="Search..."
            />
          </div>
          <div className="button-container">
            <button
              className={`view-button1 ${viewMode === "map" ? "active" : ""}`}
              onClick={() => setViewMode("map")}
            >
              <FaMapMarkerAlt /> Map View
            </button>
            <button
              className={`view-button1 ${viewMode === "grid" ? "active" : ""}`}
              onClick={() => setViewMode("grid")}
            >
              <BsGrid1X2Fill />
              Grid View
            </button>
            <button
              className={`view-button1 ${viewMode === "list" ? "active" : ""}`}
              onClick={() => setViewMode("list")}
            >
              <FaClipboardList />
              List View
            </button>
          </div>
        </div>

        {viewMode === "list" && (
          <ListView
            filteredBookingsData={filteredBookingsData}
            selectedBooking={selectedBooking}
            handleBookingClick={handleBookingClick}
            formatDate={formatDate}
            renderBookingDetails={renderBookingDetails}
            handleBookingClick1={handleBookingClick1}
            getLastTwoLetters={getLastTwoLetters}
            setTotalBookings={setTotalBookings}
          />
        )}

        {viewMode === "grid" && (
          <div className="grid">
            <Gridview rawData={filteredBookingsData} />
          </div>
        )}

        {viewMode === "map" && (
          <div className="map">
            <MapComponent filteredBookingsData={filteredBookingsData} onMarkerClick={handleMarkerClick} />
          </div>
        )}
      </div>
      {isPopupVisible && (
        <div className="popup-overlay">
          <div className="popup-content">
            <h2>{popupContent}</h2>
            {popupContent === "Dispatch" && <p>Dispatch content goes here...</p>}
            {popupContent === "Work Order" && renderCrewnotesBookingDetails()}
            {popupContent === "Inventory" && <p>Inventory content goes here...</p>}
            <button onClick={handleClosePopup}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Mybookings;




// import React from "react";
// import { BsGrid1X2Fill } from "react-icons/bs";
// import { FaMapMarkerAlt, FaClipboardList } from "react-icons/fa";
// import { useUserContext } from '../../UserContext';
// import "../My Bookings/mybook.css";
// import "react-datepicker/dist/react-datepicker.css";
// import MapComponent from "../../MapVisualization";
// import Gridview from "../../Gridvisualization";
// import useBookings from '../../usebooking';
// import ListView from "../../Listvisualization";

// const Mybookings = () => {
//   const { userDetails, isUserAuthenticated } = useUserContext();

//   const {
//     bookingsData, selectedBooking, editableBooking, activeTab, activeInventoryTab,
//     loading, error, query, viewMode, editStates, isPopupVisible, popupContent,
//     setQuery, setViewMode, setEditStates, setIsPopupVisible, setPopupContent,
//     handleClosePopup, handlePopupOpen, parseDate, getLastTwoLetters, formatDate,
//     handleBookingClick, isFutureOrToday, generateGoogleMapsLink, handleSave,
//     handleBookingClick1, toggleEditState, handleInputChange, navigate, parsedDate,
//     renderBookingDetails, renderCrewnotesBookingDetails, handleInputChange1, downloadPDF,
//   } = useBookings();

//   const extractFirstName = (fullName) => {
//     if (typeof fullName === "string") {
//       const parts = fullName.split(" ");
//       if (parts.length > 0) {
//         return parts[0].toLowerCase();
//       }
//     }
//     return "";
//   };

//   const userFirstName = userDetails.firstName.toLowerCase(); 

//   const filteredBookingsData = bookingsData.filter((booking) => {
//     const formattedDate = formatDate(booking.MoveDate);
//     const bookingValues = Object.values(booking).map((value) =>
//       String(value).toLowerCase()
//     );

//     const AssignedToFirstName = extractFirstName(booking["Assigned_To"]);
//     const moveCoOrdinatorFirstName = extractFirstName(booking["Move_Co_Ordinators"]);
//     const dispatchAgentFirstName = extractFirstName(booking["Dispatch_Agent"]);

//     const nameMatch =
//       AssignedToFirstName === userFirstName ||
//       moveCoOrdinatorFirstName === userFirstName ||
//       dispatchAgentFirstName === userFirstName;

//     return (
//       (bookingValues.some((value) => value.includes(query.toLowerCase())) ||
//         formattedDate.toLowerCase().includes(query.toLowerCase())) &&
//       isFutureOrToday(booking.MoveDate) &&
//       nameMatch
//     );
//   }).sort((a, b) => parseDate(a.MoveDate) - parseDate(b.MoveDate));

//   const handleMarkerClick = (bookingId) => {
//     handleBookingClick1(bookingId);
//     setViewMode("list");
//   };

//   return (
//     <div className="bookings-my">
//       <div className="main-content-my">
//         <div className="header-my">
//           <h1>My Bookings</h1>
//           <div className="search-bar">
//             <input
//               type="text"
//               value={query}
//               onChange={handleInputChange1}
//               placeholder="Search..."
//             />
//           </div>
//           <div className="button-container">
//             <button
//               className={`view-button1 ${viewMode === "map" ? "active" : ""}`}
//               onClick={() => setViewMode("map")}
//             >
//               <FaMapMarkerAlt /> Map View
//             </button>
//             <button
//               className={`view-button1 ${viewMode === "grid" ? "active" : ""}`}
//               onClick={() => setViewMode("grid")}
//             >
//               <BsGrid1X2Fill />
//               Grid View
//             </button>
//             <button
//               className={`view-button1 ${viewMode === "list" ? "active" : ""}`}
//               onClick={() => setViewMode("list")}
//             >
//               <FaClipboardList />
//               List View
//             </button>
//           </div>
//         </div>

//         {viewMode === "list" && (
//           <div className="all-list-view">
//             <div className="bookings-list-my">
//               <div>
//                 <div className="bookings-header-my">
//                   <span>Banner</span>
//                   <span1>Customer Name</span1>
//                   <span>Move Date</span>
//                   <span1>Move From</span1>
//                   <span1>Move To</span1>
//                   <span>Move Size</span>
//                   <span>Match Status</span>
//                   <span>Dispatch Status</span>
//                 </div>
//                 {filteredBookingsData.map((booking, index) => {
//                   const AssignedToFirstName = extractFirstName(booking["Assigned_To"]);
//                   const moveCoOrdinatorFirstName = extractFirstName(booking["Move_Co_Ordinators"]);
//                   const dispatchAgentFirstName = extractFirstName(booking["Dispatch_Agent"]);
                  
//                   const nameMatch =
//                     AssignedToFirstName === userFirstName ||
//                     moveCoOrdinatorFirstName === userFirstName ||
//                     dispatchAgentFirstName === userFirstName;

//                   return (
//                     <React.Fragment key={index}>
//                       <div
//                         className={`booking-item-my ${selectedBooking === booking ? "active" : ""}`}
//                         onClick={() => handleBookingClick(booking)}
//                       >
//                         <span>{booking.Banner}</span>
//                         <span1>{booking["Customer_Name"]}</span1>
//                         <span>{formatDate(booking.MoveDate)}</span>
//                         <span1>{booking["Move_From"]}</span1>
//                         <span1>{booking.Move_To}</span1>
//                         <span>{booking["Move_Size"]}</span>
//                         <span>{nameMatch ? "Yes" : "No"}</span>
//                         <span>{booking.Dispatch_Status}</span>
//                       </div>
//                       {selectedBooking === booking ? renderBookingDetails() : null}
//                     </React.Fragment>
//                   );
//                 })}
//               </div>
//             </div>
//             <div className="bookings-grid">
//               <div className="grid-header"></div>
//               <div className="grid-header">Name</div>
//               <div className="grid-header">Move Date</div>
//               <div className="grid-header">Origin</div>
//               <div className="grid-header">Destn</div>
//               <div className="grid-header">Move Size</div>
//               <div className="grid-header">Match Status</div>
//               <div className="grid-header">Dispatch Status</div>
//               {filteredBookingsData.map((booking) => (
//                 <React.Fragment key={booking.row_index}>
//                   <div
//                     className={`grid-cell ${booking.Banner === "ACVL" ? "red-circle" : "green-circle"}`}
//                     onClick={() => handleBookingClick(booking.row_index)}
//                   ></div>
//                   <div className="grid-cell" onClick={() => handleBookingClick1(booking.row_index)}>
//                     {booking["Customer_Name"]}
//                   </div>
//                   <div className="grid-cell" onClick={() => handleBookingClick1(booking.row_index)}>
//                     {formatDate(booking.MoveDate)}
//                   </div>
//                   <div className="grid-cell" onClick={() => handleBookingClick1(booking.row_index)}>
//                     {getLastTwoLetters(booking["Move_From"])}
//                   </div>
//                   <div className="grid-cell" onClick={() => handleBookingClick1(booking.row_index)}>
//                     {getLastTwoLetters(booking.Move_To)}
//                   </div>
//                   <div className="grid-cell" onClick={() => handleBookingClick1(booking.row_index)}>
//                     {booking["Move_Size"] || "N/A"}
//                   </div>
//                   <div className="grid-cell" onClick={() => handleBookingClick1(booking.row_index)}>
//                   {booking["Assigned_To"]}
//                   </div>
//                   <div className="grid-cell" onClick={() => handleBookingClick1(booking.row_index)}>
//                     {booking.Dispatch_Status}
//                   </div>
//                 </React.Fragment>
//               ))}
//             </div>
//           </div>
//         )}

//         {viewMode === "grid" && (
//           <div className="grid">
//             <Gridview rawData={filteredBookingsData} />
//           </div>
//         )}

//         {viewMode === "map" && (
//           <div className="map">
//             <MapComponent filteredBookingsData={filteredBookingsData} onMarkerClick={handleMarkerClick} />
//           </div>
//         )}
//       </div>
//       {isPopupVisible && (
//         <div className="popup-overlay">
//           <div className="popup-content">
//             <h2>{popupContent}</h2>
//             {popupContent === "Dispatch" && <p>Dispatch content goes here...</p>}
//             {popupContent === "Work Order" && renderCrewnotesBookingDetails()}
//             {popupContent === "Inventory" && <p>Inventory content goes here...</p>}
//             <button onClick={handleClosePopup}>Close</button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Mybookings;

