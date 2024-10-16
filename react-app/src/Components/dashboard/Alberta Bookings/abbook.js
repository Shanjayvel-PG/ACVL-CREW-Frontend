
import React, {useState} from "react";
import { BsGrid1X2Fill } from "react-icons/bs";
import { FaMapMarkerAlt, FaClipboardList } from "react-icons/fa";
import "../My Bookings/mybook.css";
import useBookings from '../../usebooking';
import MapComponent from "../../MapVisualization";
import Gridview from "../../Gridvisualization";
import ListView from "../../Listvisualization";

const Abbookings = () => {
  const {
    bookingsData, selectedBooking, editableBooking, activeTab, activeInventoryTab,
    loading, error, query, viewMode, editStates, isPopupVisible, popupContent,
    setQuery, setViewMode, setEditStates, setIsPopupVisible, setPopupContent,
    handleClosePopup, handlePopupOpen, parseDate, getLastTwoLetters, formatDate,
    handleBookingClick, isFutureOrToday, generateGoogleMapsLink, handleSave,
    handleBookingClick1, toggleEditState, handleInputChange, navigate,parsedDate,
    renderBookingDetails,renderCrewnotesBookingDetails,handleInputChange1,downloadPDF,
  } = useBookings();

  const filteredBookingsData = bookingsData
  .filter((booking) => {
    const formattedDate = formatDate(booking.MoveDate);
    const bookingValues = Object.values(booking).map((value) =>
      String(value).toLowerCase()
    );

    const moveFromLastTwoLetters = getLastTwoLetters(booking.Move_From);
    const moveFromEndsWithAB = moveFromLastTwoLetters === "AB";
    const isStatusExcluded = ['review completed', 'move cancelled'].includes(
      booking.Status.toLowerCase()
    );
    return (
      (bookingValues.some((value) => value.includes(query.toLowerCase())) ||
      formattedDate.toLowerCase().includes(query.toLowerCase())) &&
      moveFromEndsWithAB &&
      !isStatusExcluded 
    );
  })
  .sort((a, b) => parseDate(a.MoveDate) - parseDate(b.MoveDate));

  const [totalBookings, setTotalBookings] = useState(0);

  const handleMarkerClick = (bookingId) => {
    handleBookingClick1(bookingId);
    setViewMode("list");
  };
  return (
    <div className="bookings-my">
      <div className="main-content-my">
        <div className="header-my">
          {/* <h1>Alberta Bookings ({totalBookings})</h1> */}
          <div className="totalmoves">
          <h1>Alberta Moves </h1><p>Total Moves: {totalBookings}</p> 
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

export default Abbookings;
