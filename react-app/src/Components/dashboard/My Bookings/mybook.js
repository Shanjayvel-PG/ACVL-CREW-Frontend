import React, { useState, useEffect } from "react";
import { BsGrid1X2Fill } from "react-icons/bs";
import { FaMapMarkerAlt, FaClipboardList } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "./mybook.css";
import { useUserContext } from '../../UserContext';
import {
  fetchBookingsData,
  handleInputChange,
  getLastTwoLetters,
  formatDate,
  isFutureOrToday,
  toggleEditState,
  generateGoogleMapsLink,
  handleBookingClick,
  renderEditableInput,
  renderTabContent,
} from '../../Tabcontent.js';
import Exmybook from "./Exmybook.js";

const Mybookings = () => {
  const [bookings, setBookingsData] = useState([]);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [activeTab, setActiveTab] = useState("Customer Details");
  const { userDetails, isUserAuthenticated } = useUserContext();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [query, setQuery] = useState("");
  const [viewMode, setViewMode] = useState("list");
  const [editStates, setEditStates] = useState({});

  useEffect(() => {
    fetchBookingsData(setBookingsData, setLoading, setError);
  }, []);

  const navigate = useNavigate();

  const handleBookingClick1 = (id) => {
    navigate(`/booking/${id}`);
  };


  const filteredBookingsData = bookings.filter((booking) => {
    const bookingValues = Object.values(booking).map((value) =>
      String(value).toLowerCase()
    );
  
    // Check if the Crew Assigned first name matches with the logged-in user's first name
    const crewAssignedFirstName = booking["CrewAssigned"]?.split(" ")[0].toLowerCase();
    const userFirstName = userDetails.firstName.toLowerCase(); // Assuming userDetails is accessible here
  
    return (
      bookingValues.some((value) => value.includes(query.toLowerCase())) &&
      isFutureOrToday(booking.MoveDate) &&
      crewAssignedFirstName === userFirstName
    );
  });

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="bookings-my">
      <div className="main-content-my">
        <div className="header-my">
          <h1>My Bookings</h1>
          <div className="search-bar">
            <input
              type="text"
              value={query}
              onChange={(e) => handleInputChange(e, setQuery)}
              placeholder="Search..."
            />
          </div>
          <div className="button-container">
            <button1
              className={`view-button1 ${viewMode === "map" ? "active" : ""}`}
              onClick={() => setViewMode("map")}
            >
              <FaMapMarkerAlt /> Map View
            </button1>
            <button1
              className={`view-button1 ${viewMode === "grid" ? "active" : ""}`}
              onClick={() => setViewMode("grid")}
            >
              <BsGrid1X2Fill />
              Grid View
            </button1>
            <button1
              className={`view-button1 ${viewMode === "list" ? "active" : ""}`}
              onClick={() => setViewMode("list")}
            >
              <FaClipboardList />
              List View
            </button1>
          </div>
        </div>

        {viewMode === "list" && (
          <div className="all-list-view">
            <div className="bookings-list-my">
              <div className="bookings-header-my">
                <span>Banner</span>
                <span>Customer Name</span>
                <span>Move Date</span>
                <span>Move From</span>
                <span>Move To</span>
                <span>Move Size</span>
                <span>Crew Assigned</span>
                <span>Status</span>
              </div>
              {filteredBookingsData.map((booking, index) => (
                <React.Fragment key={index}>
                  <div
                    className={`booking-item-my ${selectedBooking === booking ? "active" : ""}`}
                    onClick={() => handleBookingClick(booking, selectedBooking, setSelectedBooking, setActiveTab)}
                  >
                    <span>{booking.Banner}</span>
                    <span>{booking["Customer_name"]}</span>
                    <span>{formatDate(booking.MoveDate)}</span>
                    <span>{booking["MoveFrom"]}</span>
                    <span>{booking.MoveTo}</span>
                    <span>{booking["MoveSize"]}</span>
                    <span>{booking["CrewAssigned"] || "N/A"}</span>
                    <span>{booking.Status}</span>
                  </div>
                  {selectedBooking === booking && (
                    <>
                      <div className="details-tabs-my">
                        {["Customer Details", "Move Details", "Supplies & Instruction", "Payment Details", "Team"].map(tab => (
                          <button
                            key={tab}
                            className={activeTab === tab ? "active" : ""}
                            onClick={() => setActiveTab(tab)}
                          >
                            {tab}
                          </button>
                        ))}
                      </div>
                      <div className="details-content-container-my">
                        {renderTabContent(activeTab, selectedBooking, query, editStates, setEditStates, setQuery, generateGoogleMapsLink)}
                      </div>
                    </>
                  )}
                </React.Fragment>
              ))}
            </div>
            <div className="bookings-grid">
            <div className="grid-header"></div>
            <div className="grid-header">Name</div>
            <div className="grid-header">Move Date</div>
            <div className="grid-header">Origin</div>
            <div className="grid-header">Destn</div>
            <div className="grid-header">Move Size</div>
            <div className="grid-header">Crew</div>
            <div className="grid-header">Status</div>
            {filteredBookingsData.map((booking) => (
              <React.Fragment key={booking.row_index}>
                <div
                  className={`grid-cell ${booking.Banner === "ACVL" ? "red-circle" : "green-circle"}`}
                  onClick={() => handleBookingClick(booking.ID)}
                ></div>
                <div className="grid-cell" onClick={() => handleBookingClick1(booking.ID)}>
                  {booking["Customer_name"].split(" ")[0].substring(0, 7)}
                </div>
                <div className="grid-cell" onClick={() => handleBookingClick1(booking.ID)}>
                  {formatDate(booking.MoveDate)}
                </div>
                <div className="grid-cell" onClick={() => handleBookingClick1(booking.ID)}>
                  {getLastTwoLetters(booking["MoveFrom"])}
                </div>
                <div className="grid-cell" onClick={() => handleBookingClick1(booking.ID)}>
                  {getLastTwoLetters(booking.MoveTo)}
                </div>
                <div className="grid-cell" onClick={() => handleBookingClick1(booking.ID)}>
                  {booking["MoveSize"] || "N/A"}
                </div>
                <div className="grid-cell" onClick={() => handleBookingClick1(booking.ID)}>
                  {booking["CrewAssigned"]
                    ? `${booking["CrewAssigned"].split(" ")[0][0] || ""}${booking["CrewAssigned"].split(" ")[1] ? booking["CrewAssigned"].split(" ")[1][0] : ""}`
                    : "N/A"}
                </div>
                <div className="grid-cell" onClick={() => handleBookingClick1(booking.ID)}>
                  {booking.Status}
                </div>
              </React.Fragment>
            ))}
          </div>
          </div>
        )}

        {viewMode === "grid" && (
          <div className="grid">
             <Exmybook/>
          </div>
        )}

        {viewMode === "map" && (
          <div className="map">
            <h1>map view page</h1>
          </div>
        )}
      </div>
    </div>
  );
};

export default Mybookings;