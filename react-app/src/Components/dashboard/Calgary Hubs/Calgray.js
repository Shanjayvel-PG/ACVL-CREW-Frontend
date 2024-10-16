import React, { useState, useEffect } from "react";
import axios from "axios";
import "../My Bookings/mybook.css";
import { BsGrid1X2Fill } from "react-icons/bs";
import { FaMapMarkerAlt } from "react-icons/fa";
import { FaClipboardList, FaPen } from "react-icons/fa";
import useBookings from '../../usebooking';
import "react-datepicker/dist/react-datepicker.css";
import MapComponent from "../../MapVisualization";
import Gridview from "../../Gridvisualization";
import ListView from "../../Listvisualization";

const Calgary = () => {
  const [columnMapping, setColumnMapping] = useState({});
  const [bookingsData, setBookingsData] = useState([]);
  const [filteredBookingsData, setFilteredData] = useState([]);
  const [zipcodeRanges, setZipcodeRanges] = useState([]);
  const {
    selectedBooking, editableBooking, activeTab, activeInventoryTab,
    loading, error, query, viewMode, editStates, isPopupVisible, popupContent,
    setQuery, setViewMode, setEditStates, setIsPopupVisible, setPopupContent,
    handleClosePopup, handlePopupOpen, parseDate, getLastTwoLetters, formatDate,
    handleBookingClick, isFutureOrToday, generateGoogleMapsLink, handleSave,
    handleBookingClick1, toggleEditState, handleInputChange, navigate,parsedDate,renderBookingDetails,
    renderCrewnotesBookingDetails,handleInputChange1,downloadPDF,
  } = useBookings();

  useEffect(() => {
    const fetchZipcodeData = async () => {
      try {
        const response = await axios.get("https://appsail-10083976836.development.catalystappsail.com/zoho-data/zip-code");
        const data = response.data;
        if (data && Array.isArray(data.records)) {
          setZipcodeRanges(data.records);
        } else {
          console.error("Zipcode API response is not an array:", data);
        }
      } catch (error) {
        console.error("Error fetching zipcode data:", error);
      }
    };
  
    fetchZipcodeData();
  }, []);
  

  useEffect(() => {
    axios.get("https://appsail-10083976836.development.catalystappsail.com/zoho-data")
      .then(response => {
        setColumnMapping(response.data.columnMapping);
        const responseData = response.data;
        if (responseData && responseData.dataRows && Array.isArray(responseData.dataRows)) {
          const filtered = responseData.dataRows.filter(item => isCalgaryHub(item.From_Address));
          setBookingsData(filtered);
          setFilteredData(filtered);
        } else {
          console.error("dataRows is not an array or missing", responseData);
        }
      })
      .catch(error => {
        console.error("Error fetching data:", error);
      });
  }, [zipcodeRanges]);
  

  const isZipcodeInRange = (zipcode, range) => {
    const start = range.Start.replace(/\s/g, "");
    const end = range.End.replace(/\s/g, "");
    const zip = zipcode.replace(/\s/g, "");
    return zip >= start && zip <= end;
  };

  const extractZipcode = (address) => {
    const match = address.match(/([A-Za-z]\d[A-Za-z] ?\d[A-Za-z]\d)/);
    return match ? match[0] : "";
  };

  const isCalgaryHub = (address) => {
    const itemZipcode = extractZipcode(address);
    const inLondon = zipcodeRanges.some((range) => 
      isZipcodeInRange(itemZipcode, range) && range.Location === "Calgary"
    );
    return inLondon;
  };

  const searchBookingData = (booking) => {
    const valuesToSearch = Object.values(booking).map(value => {
      if (value === booking.MoveDate) {
        return formatDate(value); 
      }
      return value;
    }).join(" ").toLowerCase();
    return valuesToSearch.includes(query.toLowerCase());
  };

  useEffect(() => {
    const filtered = bookingsData.filter(
      (booking) => searchBookingData(booking) && isFutureOrToday(booking.MoveDate)
    ).sort((a, b) => parseDate(a.MoveDate) - parseDate(b.MoveDate));
    setFilteredData(filtered);
  }, [query, bookingsData]);

  const [totalBookings, setTotalBookings] = useState(0);

  const handleMarkerClick = (bookingId) => {
    handleBookingClick1(bookingId);
    setViewMode("list");
  };
  return (
    <div className="bookings-my">
      <div className="main-content-my">
        <div className="header-my">
          {/* <h1>Calgary Hub Bookings ({totalBookings})</h1> */}
          <div className="totalmoves">
          <h1>Calgary Hub Moves </h1><p>Total Moves: {totalBookings}</p> 
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

export default Calgary;
