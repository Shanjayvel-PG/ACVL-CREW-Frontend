import React, { useState, useEffect } from "react";
import { FaMapMarkerAlt, FaClipboardList } from "react-icons/fa";
import { BsGrid1X2Fill } from "react-icons/bs";
import useBookings from "../usebooking";
import MapComponent from "../MapVisualization";
import Gridview from "../Gridvisualization";
import "../dashboard/My Bookings/mybook.css";

// import React, {useState, useMemo,useEffect} from "react";
// import "react-datepicker/dist/react-datepicker.css";
// import { BsGrid1X2Fill } from "react-icons/bs";
// import { FaMapMarkerAlt, FaClipboardList } from "react-icons/fa";
// import "../dashboard/My Bookings/mybook.css";
// import MapComponent from "../MapVisualization";
// import Gridview from "../Gridvisualization";
// import useBookings from '../usebooking';
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import {faFilter} from '@fortawesome/free-solid-svg-icons'
// import ListView from "../Listvisualization";


// const Storage = () => {
//     const {
        // bookingsData, selectedBooking, editableBooking, activeTab, activeInventoryTab,
        // loading, error, query, viewMode, editStates, isPopupVisible, popupContent,
        // setQuery, setViewMode, setEditStates, setIsPopupVisible, setPopupContent,
        // handleClosePopup, handlePopupOpen, parseDate, getLastTwoLetters, formatDate,
        // handleBookingClick, isFutureOrToday, generateGoogleMapsLink, handleSave,
        // handleBookingClick1, toggleEditState, handleInputChange, navigate,parsedDate,renderBookingDetails,
        // renderCrewnotesBookingDetails,handleInputChange1,downloadPDF,
//       } = useBookings();
//       const [totalBookings, setTotalBookings] = useState(0); 
//       // const filteredBookingsData = bookingsData
//       // .filter((booking) => {
//       //   const formattedDate = formatDate(booking.MoveDate);
//       //   const bookingValues = Object.values(booking).map((value) =>
//       //     String(value).toLowerCase()
//       //   );
//       //   const isStorageYes = booking.Storage && booking.Storage.toLowerCase() === "yes";
//       //   const isStatusExcluded = ['review completed', 'move cancelled'].includes(
//       //     booking.Status.toLowerCase()
//       //   );
    
//       //   return (
//       //     (bookingValues.some((value) => value.includes(query.toLowerCase())) ||
//       //     formattedDate.toLowerCase().includes(query.toLowerCase())) &&
//       //     isStorageYes &&
//       //     !isStatusExcluded 
//       //   );
//       // })
//       // .sort((a, b) => parseDate(a.MoveDate) - parseDate(b.MoveDate));

//       const filteredBookingsData = bookingsData
//       .filter((booking) => {
//         const formattedDate = formatDate(booking.MoveDate);
//         const bookingValues = Object.values(booking).map((value) =>
//           String(value).toLowerCase()
//         );
//         const isStorageYes = booking.Storage && booking.Storage.toLowerCase() === "yes";
//         const isStatusExcluded = ['review completed', 'move cancelled'].includes(
//           booking.Status.toLowerCase()
//         );

//         const storageLocation = booking.Storage_Location
//           ? booking.Storage_Location.slice(-2).toLowerCase()
//           : "";

//         const validLocations = ['on', 'bc', 'qc', 'ab', 'sk', 'nb', 'ns', 'nl', 'yt', 'mb', 'nt', 'pe',];
//         const isLocationValid = validLocations.includes(storageLocation);
    
//         return (
//           (bookingValues.some((value) => value.includes(query.toLowerCase())) ||
//             formattedDate.toLowerCase().includes(query.toLowerCase())) &&
//           isStorageYes &&
//           !isStatusExcluded &&
//           isLocationValid // Filter based on Storage_Location
//         );
//       })
//       .sort((a, b) => {
//         const storageA = a.Storage_Location ? a.Storage_Location.slice(-2).toLowerCase() : "";
//         const storageB = b.Storage_Location ? b.Storage_Location.slice(-2).toLowerCase() : "";
//         return storageA.localeCompare(storageB); // Sort by the last two letters
//       });

      

    // const handleMarkerClick = (bookingId) => {
    //   handleBookingClick1(bookingId);
    //   setViewMode("list");
    // };

//     useEffect(() => {
//       setTotalBookings(filteredBookingsData.length);
//     }, [filteredBookingsData, setTotalBookings]);
  
//   return (
//     <div className="bookings-my">
//     <div className="main-content-my">
//       <div className="header-my">
//         <div className="totalmoves">
//           <h1>Storage Bookings Moves </h1><p>Total Moves: {totalBookings}</p> 
//           </div>
//         <div className="search-bar">
//           <input
//             type="text"
//             value={query}
//             onChange={handleInputChange1}
//             placeholder="Search..."
//           />
//         </div>
//         <div className="button-container">
//           <button
//             className={`view-button1 ${viewMode === "map" ? "active" : ""}`}
//             onClick={() => setViewMode("map")}
//           >
//             <FaMapMarkerAlt /> Map View
//           </button>
//           <button
//             className={`view-button1 ${viewMode === "grid" ? "active" : ""}`}
//             onClick={() => setViewMode("grid")}
//           >
//             <BsGrid1X2Fill />
//             Grid View
//           </button>
//           <button
//             className={`view-button1 ${viewMode === "list" ? "active" : ""}`}
//             onClick={() => setViewMode("list")}
//           >
//             <FaClipboardList />
//             List View
//           </button>
//         </div>
//       </div>

//       {viewMode === "list" && (
//             <div>
//             <div className="all-list-view">
//               <div className="bookings-list-my">
//                 <div className="bookings-header-my">
//                   <span> Banner </span>
//                   <span1>Customer Name</span1>
//                   <span> Invoice No </span>
//                   <span> Move Date</span>
//                   <span1> Move From </span1>
//                   <span1> Move To</span1>
//                   <span> Storage Location</span>
//                   <span> Move Size </span>
//                   <span> Assigned To </span>
//                   <span> Status </span>
//                 </div>
   
//                 {filteredBookingsData.map((booking, index) => (
//                   <div>
//                   Storage Location :{booking.Storage_Location}

//                   <React.Fragment key={index}>
//                     <div >
                      
//                       <div
//                         className={`booking-item-my ${selectedBooking === booking ? "active" : ""}`}
//                         onClick={() => handleBookingClick(booking)}
//                       >
//                         <span>{booking.Banner}</span>
//                         <span1>{booking["Customer_Name"]}</span1>
//                         <span>{booking.INVOICE}</span>
//                         <span>{formatDate(booking.MoveDate)}</span>
//                         <span1>{booking["Move_From"]}</span1>
//                         <span1>{booking.Move_To}</span1>
//                         <span>{booking.Storage_Location}</span>
//                         <span>{booking["Move_Size"]}</span>
//                         <span>{booking["Assigned_To"] || "N/A"}</span>
//                         <span>{booking.Status}</span>
//                       </div>
//                     </div>
//                     {selectedBooking === booking ? renderBookingDetails() : null}
//                   </React.Fragment>
//                   </div>
//                 ))}
               
//               </div>
//             </div>
          //   <div className="bookings-grid">
          //     <div className="grid-header"></div>
          //     <div className="grid-header">Name</div>
          //     <div className="grid-header">Invoice</div>
          //     <div className="grid-header">Move Date</div>
          //     <div className="grid-header">Origin</div>
          //     <div className="grid-header">Destn</div>
          //     <div className="grid-header">Move Size</div>
          //     <div className="grid-header">Assigned To</div>
          //     <div className="grid-header">Status</div>
          //     {filteredBookingsData.map((booking) => (
          //       <React.Fragment key={booking.row_index}>
          //         <div
          //           className={`grid-cell ${booking.Banner === "ACVL" ? "red-circle" : "green-circle"}`}
          //           onClick={() => handleBookingClick(booking.row_index)}
          //         ></div>
          //         <div className="grid-cell" onClick={() => handleBookingClick1(booking.row_index)}>
          //           {booking["Customer_Name"]}
          //         </div>
          //         <div className="grid-cell" onClick={() => handleBookingClick1(booking.row_index)}>
          //           {booking["INVOICE"]}
          //         </div>
          //         <div className="grid-cell" onClick={() => handleBookingClick1(booking.row_index)}>
          //           {formatDate(booking.MoveDate)}
          //         </div>
          //         <div className="grid-cell" onClick={() => handleBookingClick1(booking.row_index)}>
          //           {getLastTwoLetters(booking["Move_From"])}
          //         </div>
          //         <div className="grid-cell" onClick={() => handleBookingClick1(booking.row_index)}>
          //           {getLastTwoLetters(booking.Move_To)}
          //         </div>
          //         <div className="grid-cell" onClick={() => handleBookingClick1(booking.row_index)}>
          //           {booking["Move_Size"] || "N/A"}
          //         </div>
          //         <div className="grid-cell" onClick={() => handleBookingClick1(booking.row_index)}>
          //           {booking["Assigned_To"]}
          //         </div>
          //         <div className="grid-cell" onClick={() => handleBookingClick1(booking.row_index)}>
          //           {booking.Status}
          //         </div>
          //       </React.Fragment>
          //     ))}
          //   </div>
          // </div>
//       )}

//       {viewMode === "grid" && (
//         <div className="grid">
//           <Gridview rawData={filteredBookingsData} />
//         </div>
//       )}

//       {viewMode === "map" && (
//         <div className="map">
//           <MapComponent filteredBookingsData={filteredBookingsData} onMarkerClick={handleMarkerClick} />
//         </div>
//       )}
//     </div>
  //   {isPopupVisible && (
  //     <div className="popup-overlay">
  //       <div className="popup-content">
  //         <h2>{popupContent}</h2>
  //         {popupContent === "Dispatch" && <p>Dispatch content goes here...</p>}
  //         {popupContent === "Work Order" && renderCrewnotesBookingDetails()}
  //         {popupContent === "Inventory" && <p>Inventory content goes here...</p>}
  //         <button onClick={handleClosePopup}>Close</button>
  //       </div>
  //     </div>
  //   )}
  // </div>
//   );
// };

// export default Storage

const Storage = () => {
  const {
    bookingsData, selectedBooking, editableBooking, activeTab, activeInventoryTab,
    loading, error, query, viewMode, editStates, isPopupVisible, popupContent,
    setQuery, setViewMode, setEditStates, setIsPopupVisible, setPopupContent,
    handleClosePopup, handlePopupOpen, parseDate, getLastTwoLetters, formatDate,
    handleBookingClick, isFutureOrToday, generateGoogleMapsLink, handleSave,
    handleBookingClick1, toggleEditState, handleInputChange, navigate,parsedDate,renderBookingDetails,
    renderCrewnotesBookingDetails,handleInputChange1,downloadPDF,
  } = useBookings();
  
  const [totalBookings, setTotalBookings] = useState(0);

  const filteredBookingsData = bookingsData
    .filter((booking) => {
      const formattedDate = formatDate(booking.MoveDate);
      const bookingValues = Object.values(booking).map((value) =>
        String(value).toLowerCase()
      );
      const isStorageYes = booking.Storage && booking.Storage.toLowerCase() === "yes";
      const isStatusExcluded = ['review completed', 'move cancelled'].includes(
        booking.Status.toLowerCase()
      );

      const storageLocation = booking.Storage_Location
        ? booking.Storage_Location.slice(-2).toLowerCase()
        : "";

      const validLocations = ['on', 'bc', 'qc', 'ab', 'sk', 'nb', 'ns', 'nl', 'yt', 'mb', 'nt', 'pe'];
      const isLocationValid = validLocations.includes(storageLocation);

      return (
        (bookingValues.some((value) => value.includes(query.toLowerCase())) ||
          formattedDate.toLowerCase().includes(query.toLowerCase())) &&
        isStorageYes &&
        !isStatusExcluded &&
        isLocationValid
      );
    })
    .sort((a, b) => {
      const storageA = a.Storage_Location ? a.Storage_Location.slice(-2).toLowerCase() : "";
      const storageB = b.Storage_Location ? b.Storage_Location.slice(-2).toLowerCase() : "";
      return storageA.localeCompare(storageB); // Sort by the last two letters of Storage_Location
    });

  useEffect(() => {
    setTotalBookings(filteredBookingsData.length);
  }, [filteredBookingsData]);

  const bookingsByLocation = filteredBookingsData.reduce((acc, booking) => {
    const location = booking.Storage_Location
      ? booking.Storage_Location.slice(-2).toUpperCase()
      : "Unknown";
    if (!acc[location]) {
      acc[location] = [];
    }
    acc[location].push(booking);
    return acc;
  }, {});

  return (
    <div className="bookings-my">
      <div className="main-content-my">
        <div className="header-my">
          <div className="totalmoves">
            <h1>Storage Bookings Moves</h1>
            <p>Total Moves: {totalBookings}</p>
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
              <BsGrid1X2Fill /> Grid View
            </button>
            <button
              className={`view-button1 ${viewMode === "list" ? "active" : ""}`}
              onClick={() => setViewMode("list")}
            >
              <FaClipboardList /> List View
            </button>
          </div>
        </div>

        {viewMode === "list" && (
          <div className="all-list-view">
            <div className="bookings-list-my">
              <div className="bookings-header-my">
                <span>Banner</span>
                <span1>Customer Name</span1>
                <span>Invoice No</span>
                <span>Move Date</span>
                <span1>Move From</span1>
                <span1>Move To</span1>
                {/* <span>Storage Location</span> */}
                <span>Move Size</span>
                <span>Assigned To</span>
                <span>Status</span>
              </div>

              {Object.keys(bookingsByLocation).map((location) => (
                <React.Fragment key={location}>
                  <h3>{location.toUpperCase()}</h3>
                  {bookingsByLocation[location].map((booking, index) => (
                    <React.Fragment key={index}>
                      <div
                        className={`booking-item-my ${
                          selectedBooking === booking ? "active" : ""
                        }`}
                        onClick={() => handleBookingClick(booking)}
                      >
                        <span>{booking.Banner}</span>
                        <span1>{booking.Customer_Name}</span1>
                        <span>{booking.INVOICE}</span>
                        <span>{formatDate(booking.MoveDate)}</span>
                        <span1>{booking.Move_From}</span1>
                        <span1>{booking.Move_To}</span1>
                        {/* <span>{booking.Storage_Location}</span> */}
                        <span>{booking.Move_Size}</span>
                        <span>{booking.Assigned_To || "N/A"}</span>
                        <span>{booking.Status}</span>
                      </div>
                      {selectedBooking === booking ? renderBookingDetails() : null}
                    </React.Fragment>
                  ))}
                </React.Fragment>
              ))}
            </div>
            <div className="nottodisplayinlapview">
            <div className="bookings-grid">
              <div className="grid-header"></div>
              <div className="grid-header">Name</div>
              <div className="grid-header">Invoice</div>
              <div className="grid-header">Move Date</div>
              <div className="grid-header">Origin</div>
              <div className="grid-header">Destn</div>
              <div className="grid-header">Move Size</div>
              <div className="grid-header">Assigned To</div>
              <div className="grid-header">Status</div>
              </div>
              
              {Object.keys(bookingsByLocation).map((location) => (
                <React.Fragment key={location}>
                  <h3>{location.toUpperCase()}</h3>
                  <div className="bookings-grid">
                    {bookingsByLocation[location].map((booking) => (
                      <React.Fragment key={booking.row_index}>
                        <div
                          className={`grid-cell ${booking.Banner === "ACVL" ? "red-circle" : "green-circle"}`}
                          onClick={() => handleBookingClick(booking.row_index)}
                        ></div>
                        <div className="grid-cell" onClick={() => handleBookingClick1(booking.row_index)}>
                          {booking["Customer_Name"]}
                        </div>
                        <div className="grid-cell" onClick={() => handleBookingClick1(booking.row_index)}>
                          {booking["INVOICE"]}
                        </div>
                        <div className="grid-cell" onClick={() => handleBookingClick1(booking.row_index)}>
                          {formatDate(booking.MoveDate)}
                        </div>
                        <div className="grid-cell" onClick={() => handleBookingClick1(booking.row_index)}>
                          {getLastTwoLetters(booking["Move_From"])}
                        </div>
                        <div className="grid-cell" onClick={() => handleBookingClick1(booking.row_index)}>
                          {getLastTwoLetters(booking.Move_To)}
                        </div>
                        <div className="grid-cell" onClick={() => handleBookingClick1(booking.row_index)}>
                          {booking["Move_Size"] || "N/A"}
                        </div>
                        <div className="grid-cell" onClick={() => handleBookingClick1(booking.row_index)}>
                          {booking["Assigned_To"]}
                        </div>
                        <div className="grid-cell" onClick={() => handleBookingClick1(booking.row_index)}>
                          {booking.Status}
                        </div>
                      </React.Fragment>
                    ))}
                  </div>
                </React.Fragment>
              ))}
            </div>
            </div>
        )}

        {viewMode === "grid" && (
          <div className="grid">
            <Gridview rawData={filteredBookingsData} />
          </div>
        )}

        {viewMode === "map" && (
          <div className="map">
            <MapComponent
              filteredBookingsData={filteredBookingsData}
              onMarkerClick={handleBookingClick1}
            />
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

export default Storage;





// import React, { useState, useEffect } from "react";
// import { FaMapMarkerAlt, FaClipboardList } from "react-icons/fa";
// import { BsGrid1X2Fill } from "react-icons/bs";
// import "../dashboard/My Bookings/mybook.css";
// import MapComponent from "../MapVisualization";
// import Gridview from "../Gridvisualization";
// import useBookings from '../usebooking';
// import ListView from "../Listvisualization";

// const Storage = () => {
//     const {
//         bookingsData, selectedBooking, editableBooking, activeTab, activeInventoryTab,
//         loading, error, query, viewMode, editStates, isPopupVisible, popupContent,
//         setQuery, setViewMode, setEditStates, setIsPopupVisible, setPopupContent,
//         handleClosePopup, handlePopupOpen, parseDate, getLastTwoLetters, formatDate,
//         handleBookingClick, isFutureOrToday, generateGoogleMapsLink, handleSave,
//         handleBookingClick1, toggleEditState, handleInputChange, navigate, parsedDate, renderBookingDetails,
//         renderCrewnotesBookingDetails, handleInputChange1, downloadPDF,
//     } = useBookings();
    
//     const [totalBookings, setTotalBookings] = useState(0); 

//     // Filter and sort bookings by Storage_Location
//     const filteredBookingsData = bookingsData
//         .filter((booking) => {
//             const formattedDate = formatDate(booking.MoveDate);
//             const bookingValues = Object.values(booking).map((value) => String(value).toLowerCase());
//             const isStorageYes = booking.Storage && booking.Storage.toLowerCase() === "yes";
//             const isStatusExcluded = ['review completed', 'move cancelled'].includes(booking.Status.toLowerCase());

//             const storageLocation = booking.Storage_Location
//                 ? booking.Storage_Location.slice(-2).toLowerCase()
//                 : "";

//             const validLocations = ['on', 'bc', 'qc', 'ab', 'sk', 'nb', 'ns', 'nl', 'yt', 'mb', 'nt', 'pe'];
//             const isLocationValid = validLocations.includes(storageLocation);
    
//             return (
//                 (bookingValues.some((value) => value.includes(query.toLowerCase())) ||
//                 formattedDate.toLowerCase().includes(query.toLowerCase())) &&
//                 isStorageYes &&
//                 !isStatusExcluded &&
//                 isLocationValid // Filter based on Storage_Location
//             );
//         })
//         .sort((a, b) => {
//             const storageA = a.Storage_Location ? a.Storage_Location.slice(-2).toLowerCase() : "";
//             const storageB = b.Storage_Location ? b.Storage_Location.slice(-2).toLowerCase() : "";
//             return storageA.localeCompare(storageB); // Sort by the last two letters
//         });

//     // Group bookings by Storage_Location
//     const groupedBookings = filteredBookingsData.reduce((groups, booking) => {
//         const location = booking.Storage_Location ? booking.Storage_Location.slice(-2).toLowerCase() : "unknown";
//         if (!groups[location]) {
//             groups[location] = [];
//         }
//         groups[location].push(booking);
//         return groups;
//     }, {});

//     useEffect(() => {
//         setTotalBookings(filteredBookingsData.length);
//     }, [filteredBookingsData, setTotalBookings]);

//     return (
//         <div className="bookings-my">
//             <div className="main-content-my">
//                 <div className="header-my">
//                     <div className="totalmoves">
//                         <h1>Storage Bookings Moves</h1>
//                         <p>Total Moves: {totalBookings}</p>
//                     </div>
//                     <div className="search-bar">
//                         <input
//                             type="text"
//                             value={query}
//                             onChange={handleInputChange1}
//                             placeholder="Search..."
//                         />
//                     </div>
//                     <div className="button-container">
//                         <button
//                             className={`view-button1 ${viewMode === "map" ? "active" : ""}`}
//                             onClick={() => setViewMode("map")}
//                         >
//                             <FaMapMarkerAlt /> Map View
//                         </button>
//                         <button
//                             className={`view-button1 ${viewMode === "grid" ? "active" : ""}`}
//                             onClick={() => setViewMode("grid")}
//                         >
//                             <BsGrid1X2Fill />
//                             Grid View
//                         </button>
//                         <button
//                             className={`view-button1 ${viewMode === "list" ? "active" : ""}`}
//                             onClick={() => setViewMode("list")}
//                         >
//                             <FaClipboardList />
//                             List View
//                         </button>
//                     </div>
//                 </div>

//                 {viewMode === "list" && (
//                     <div>
//                         {Object.keys(groupedBookings).map((location) => (
//                             <div key={location}>
//                                 <h2>{location.toUpperCase()} Storage Location</h2>
//                                 <div className="all-list-view">
//                                     <div className="bookings-list-my">
//                                         <div className="bookings-header-my">
//                                             <span>Banner</span>
//                                             <span1>Customer Name</span1>
//                                             <span>Invoice No</span>
//                                             <span>Move Date</span>
//                                             <span1>Move From</span1>
//                                             <span1>Move To</span1>
//                                             <span>Storage Location</span>
//                                             <span>Move Size</span>
//                                             <span>Assigned To</span>
//                                             <span>Status</span>
//                                         </div>
//                                         {groupedBookings[location].map((booking, index) => (
//                                             <React.Fragment key={index}>
//                                                 <div
//                                                     className={`booking-item-my ${selectedBooking === booking ? "active" : ""}`}
//                                                     onClick={() => handleBookingClick(booking)}
//                                                 >
//                                                     <span>{booking.Banner}</span>
//                                                     <span1>{booking.Customer_Name}</span1>
//                                                     <span>{booking.INVOICE}</span>
//                                                     <span>{formatDate(booking.MoveDate)}</span>
//                                                     <span1>{booking.Move_From}</span1>
//                                                     <span1>{booking.Move_To}</span1>
//                                                     <span>{booking.Storage_Location}</span>
//                                                     <span>{booking.Move_Size}</span>
//                                                     <span>{booking.Assigned_To || "N/A"}</span>
//                                                     <span>{booking.Status}</span>
//                                                 </div>
//                                                 {selectedBooking === booking ? renderBookingDetails() : null}
//                                             </React.Fragment>
//                                         ))}
//                                     </div>
//                                 </div>
//                             </div>
//                         ))}
//                     </div>
//                 )}

//                 {viewMode === "grid" && (
//                     <div className="grid">
//                         <Gridview rawData={filteredBookingsData} />
//                     </div>
//                 )}

//                 {viewMode === "map" && (
//                     <div className="map">
//                         <MapComponent filteredBookingsData={filteredBookingsData} onMarkerClick={handleMarkerClick} />
//                     </div>
//                 )}
//             </div>
//             {isPopupVisible && (
//                 <div className="popup-overlay">
//                     <div className="popup-content">
//                         <h2>{popupContent}</h2>
//                         {popupContent === "Dispatch" && <p>Dispatch content goes here...</p>}
//                         {popupContent === "Work Order" && renderCrewnotesBookingDetails()}
//                         {popupContent === "Inventory" && <p>Inventory content goes here...</p>}
//                         <button onClick={handleClosePopup}>Close</button>
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default Storage;
