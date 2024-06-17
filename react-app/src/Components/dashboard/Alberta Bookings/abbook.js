import React, { useState, useEffect } from "react";
import axios from "axios";
import { BsGrid1X2Fill } from "react-icons/bs";
import { FaMapMarkerAlt } from "react-icons/fa";
import { FaClipboardList } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "../My Bookings/mybook.css";

const Abbookings = () => {
  const [bookingsData, setBookingsData] = useState([]);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [activeTab, setActiveTab] = useState("Customer Details");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [query, setQuery] = useState("");
  const [viewMode, setViewMode] = useState("list"); 

  useEffect(() => {
    axios
      .get(
        "https://appsail-10082552291.development.catalystappsail.com/zoho-data"
      )
      .then((response) => {
        setBookingsData(response.data.records);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, []);
  const getLastTwoLetters = (str) => {
    return str.slice(-2); // Extract the last two letters of the string
  };
  // const getLastTwoLetters = (str) => {
  //   const parts = str.split(', ');
  //   return parts[parts.length - 1];
  // };

  const handleInputChange = (event) => {
    const searchQuery = event.target.value.toLowerCase();
    setQuery(searchQuery);
  };
  const navigate = useNavigate();
  const handleBookingClick1 = (id) => {
    navigate(`/booking/${id}`);
  };
  const searchBookingData = (booking) => {
    const valuesToSearch = Object.values(booking).join(" ").toLowerCase();
    return valuesToSearch.includes(query.toLowerCase());
  };

  const handleBookingClick = (booking) => {
    setSelectedBooking(selectedBooking === booking ? null : booking);
    setActiveTab("Customer Details");
  };

  const formatDate = (dateStr) => {
    const monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const [day, month, year] = dateStr.split("/");
    const monthIndex = parseInt(month, 10) - 1; // Convert month to zero-based index
    const monthName = monthNames[monthIndex];
    return `${day.padStart(2, "0")}-${monthName}-${year}`;
  };

  const renderTabContent = () => {
    if (!selectedBooking) return null;
    const valuesToSearch = Object.values(selectedBooking)
      .join(" ")
      .toLowerCase();
    if (!valuesToSearch.includes(query.toLowerCase())) return null;
    const coordinatesOrigin = selectedBooking.Coordinates_Origin;
    const coordinatesDestn = selectedBooking.Coordinates_Destn;

    let originLat, originLng, destnLat, destnLng;

    if (coordinatesOrigin) {
      const originCoords = coordinatesOrigin.split(",");
      if (originCoords.length !== 2) return null; // Ensure there are two coordinates

      originLat = parseFloat(originCoords[0].trim());
      originLng = parseFloat(originCoords[1].trim());

      if (isNaN(originLat) || isNaN(originLng)) return null; // Ensure coordinates are valid numbers

      console.log("Origin:", originLat, originLng);
    }

    if (coordinatesDestn) {
      const destnCoords = coordinatesDestn.split(",");
      if (destnCoords.length !== 2) return null; // Ensure there are two coordinates

      destnLat = parseFloat(destnCoords[0].trim());
      destnLng = parseFloat(destnCoords[1].trim());

      if (isNaN(destnLat) || isNaN(destnLng)) return null; // Ensure coordinates are valid numbers

      console.log("Destination:", destnLat, destnLng);
    }

    const origin = coordinatesOrigin
      ? { lat: originLat, lng: originLng }
      : null;
    const destination = coordinatesDestn
      ? { lat: destnLat, lng: destnLng }
      : null;

    let googleMapsLink;
    // Generate the Google Maps route link
    if (origin !== null && destination !== null) {
      const generateGoogleMapsLink = (origin, destination) => {
        return `https://www.google.com/maps/dir/?api=1&origin=${origin.lat},${origin.lng}&destination=${destination.lat},${destination.lng}`;
      };

      googleMapsLink = generateGoogleMapsLink(origin, destination);
    }

    switch (activeTab) {
      case "Customer Details":
        return (
          <div className="customer-details-my details-content-my">
            <div>
              <label>Customer Name</label>
              <input
                type="text"
                value={selectedBooking["Customer Name"]}
                readOnly
              />
            </div>
            <div>
              <label>Email Address</label>
              <input
                type="email"
                value={selectedBooking["Email Address"]}
                readOnly
              />
            </div>
            <div>
              <label>Phone Number</label>
              <input
                type="text"
                value={selectedBooking["Phone Number"]}
                readOnly
              />
            </div>
            <div>
              <label>Alternate Phone Number</label>
              <input
                type="text"
                value={selectedBooking["Alternate Phone Number"]}
                readOnly
              />
            </div>
            {/* <div>
                      <label>From Address</label>
                      <input type="text" value={selectedBooking['FromAddress']} readOnly />
                  </div>
                  <div>
                      <label>To Address</label>
                      <input type="text" value={selectedBooking['ToAddress']} readOnly />
                  </div> */}
          </div>
        );
      case "Move Details":
        return (
          <div className="move-details-my details-content-my">
            <div>
              <label>Move Date</label>
              <input
                type="text"
                value={formatDate(selectedBooking["MoveDate"])}
                readOnly
              />
            </div>
            <div>
              <label>Move Size</label>
              <input
                type="text"
                value={selectedBooking["Move Size"]}
                readOnly
              />
            </div>
            <div>
              <label>From Address</label>
              <input
                type="text"
                value={selectedBooking["FromAddress"]}
                readOnly
              />
            </div>
            <div>
              <label>To Address</label>
              <input
                type="text"
                value={selectedBooking["ToAddress"]}
                readOnly
              />
            </div>
            <div>
              <label>Customer Pickup Time</label>
              <input
                type="text"
                value={selectedBooking["Customer prefered Pick up Time"]}
                readOnly
              />
            </div>
            <div>
              <label>Pick Up Time</label>
              <input
                type="text"
                value={selectedBooking["PickUpTime"]}
                readOnly
              />
            </div>
            <div>
              <label>Trailer</label>
              <input type="text" value={selectedBooking["Trailer"]} readOnly />
            </div>
            {googleMapsLink ? (
              <div>
                <label>Google Route Link</label>
                <a
                  href={googleMapsLink}
                  className="google-route-link"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Get Route
                </a>
              </div>
            ) : (
              <div>
                <label>Google Route Link</label>
                <a
                  href={googleMapsLink}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  No Routes Found
                </a>
              </div>
            )}
            <div>
              <label>Storage</label>
              <input type="text" value={selectedBooking["Storage"]} readOnly />
            </div>
            <div>
              <label>Storage Location</label>
              <input
                type="text"
                value={selectedBooking["Storage Location"]}
                readOnly
              />
            </div>
            <div>
              <label>Origin Property Type</label>
              <input
                type="text"
                value={selectedBooking["Origin Property Type"]}
                readOnly
              />
            </div>
            <div>
              <label>Destination Property Type</label>
              <input
                type="text"
                value={selectedBooking["Destination Property Type"]}
                readOnly
              />
            </div>
          </div>
        );
      case "Supplies & Instruction":
        return (
          <div className="supplies-instruction-my details-content-my">
            <div>
              <label>Staircase</label>
              <input
                type="text"
                value={selectedBooking["Count of Stairs"]}
                readOnly
              />
            </div>
            <div>
              <label>Long Walk</label>
              <input
                type="text"
                value={selectedBooking["Long Walk"]}
                readOnly
              />
            </div>
            <div>
              <label>Elevator</label>
              <input type="text" value={selectedBooking["Elevator"]} readOnly />
            </div>
            <div>
              <label>Heavy Items</label>
              <input
                type="text"
                value={selectedBooking["Heavy Items"]}
                readOnly
              />
            </div>
            <div>
              <label>Packing Supplies</label>
              <input
                type="text"
                value={selectedBooking["Packing Supplies"]}
                readOnly
              />
            </div>
            <div>
              <label>Packing Services</label>
              <input
                type="text"
                value={selectedBooking["Packing Service"]}
                readOnly
              />
            </div>
            <div>
              <label>Special Instruction</label>
              <textarea
                value={selectedBooking["Special Instruction"]}
                readOnly
              />
            </div>
            <div>
              <label>Dispatch Comments</label>
              <textarea value={selectedBooking["Dispatch Comments"]} readOnly />
            </div>
          </div>
        );
      case "Payment Details":
        return (
          <div className="payment-details-my details-content-my">
            <div>
              <label>Invoice No</label>
              <input type="text" value={selectedBooking["INVOICE"]} readOnly />
            </div>
            <div>
              <label>Method of Payment</label>
              <input
                type="text"
                value={selectedBooking["Method of Payment"]}
                readOnly
              />
            </div>
            <div>
              <label>Deposit Paid</label>
              <input
                type="text"
                value={selectedBooking["Deposit Paid"]}
                readOnly
              />
            </div>
            <div>
              <label>Date Deposit Paid</label>
              <input
                type="text"
                value={selectedBooking["Date Deposit Paid"]}
                readOnly
              />
            </div>
            <div>
              <label>Paid By</label>
              <select value={selectedBooking["Paid By"]} readOnly>
                <option value="welfare">welfare</option>
                <option value="self">self</option>
                <option value="company">company</option>
              </select>
            </div>
          </div>
        );
      case "Team":
        return (
          <div className="team-details-my details-content-my">
            <div>
              <label>Sales Agent</label>
              <input type="text" value={selectedBooking["Sales Agent"]} readOnly />
            </div>
            <div>
              <label>Crew Leader</label>
              <input
                type="text"
                value={selectedBooking["Move Co ordinator"]}
                readOnly
              />
            </div>
            <div>
              <label>Dispatch Manager</label>
              <input
                type="text"
                value={selectedBooking["Dispatch Manager"]}
                readOnly
              />
            </div>
            <div>
              <label>Crew Lead Phone Number</label>
              <input
                type="text"
                value={selectedBooking["Crew Lead Contact Number"]}
                readOnly
              />
            </div>
            <div>
              <label>Ground Team</label>
              <input type="text" value={selectedBooking["Ground Team"]} readOnly />
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const toggleBookingSelection = (index) => {
    setSelectedBooking(selectedBooking === index ? null : index);
    setActiveTab("");
  };

  const toggleTab = (tabName) => {
    setActiveTab(activeTab === tabName ? "" : tabName);
  };

  const parseDate = (dateStr) => {
    const [day, month, year] = dateStr.split("/");
    return new Date(year, month - 1, day);
  };

  const isFutureOrToday = (dateStr) => {
    const today = new Date();
    const date = parseDate(dateStr);
    today.setHours(0, 0, 0, 0);
    return date >= today;
  };
  const filteredBookingsData = bookingsData.filter((booking) => {
    const bookingValues = Object.values(booking).map((value) =>
      String(value).toLowerCase()
    );
    return (
      bookingValues.some((value) => value.includes(query.toLowerCase())) &&
      isFutureOrToday(booking.MoveDate) &&
      booking["Move From"].toLowerCase().endsWith("ab") // Filter by origin ending with 'AB'
    );
  });

  return (
    <div className="bookings-my">
      <div className="main-content-my">
        <div className="header-my">
          <h1>Alberta Bookings</h1>
          <div className="search-bar">
            <input
              type="text"
              value={query}
              onChange={handleInputChange}
              placeholder="Search..."
            />
          </div>
          <div class="button-container">
            {/* <button1
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
            </button1> */}
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
                <span>Name</span>
                <span>Move Date</span>
                <span>Origin</span>
                <span>Destn</span>
                <span>Move Size</span>
                <span>Crew Assigned</span>
                <span>Status</span>
              </div>
              {filteredBookingsData.map((booking, index) => (
                <React.Fragment key={index}>
                  <div
                    className={`booking-item-my ${
                      selectedBooking === booking ? "active" : ""
                    }`}
                    onClick={() => handleBookingClick(booking)}
                  >
                    <span>{booking.Banner}</span>
                    <span>{booking["Customer Name"]}</span>
                    <span>{formatDate(booking.MoveDate)}</span>
                    <span>{booking["Move From"]}</span>
                    <span>{booking.MoveTo}</span>
                    <span>{booking["Move Size"]}</span>
                    <span>{booking["Crew Assigned"] || "N/A"}</span>
                    <span>{booking.Status}</span>
                  </div>
                  {selectedBooking === booking && (
                    <div className="details-tabs-my">
                      <button
                        className={
                          activeTab === "Customer Details" ? "active" : ""
                        }
                        onClick={() => setActiveTab("Customer Details")}
                      >
                        Customer Details
                      </button>
                      <button
                        className={activeTab === "Move Details" ? "active" : ""}
                        onClick={() => setActiveTab("Move Details")}
                      >
                        Move Details
                      </button>
                      <button
                        className={
                          activeTab === "Supplies & Instruction" ? "active" : ""
                        }
                        onClick={() => setActiveTab("Supplies & Instruction")}
                      >
                        Supplies & Instruction
                      </button>
                      <button
                        className={
                          activeTab === "Payment Details" ? "active" : ""
                        }
                        onClick={() => setActiveTab("Payment Details")}
                      >
                        Payment Details
                      </button>
                      <button
                        className={activeTab === "Team" ? "active" : ""}
                        onClick={() => setActiveTab("Team")}
                      >
                        Team
                      </button>
                    </div>
                  )}
                  {selectedBooking === booking && (
                    <div className="details-content-container-my">
                      {renderTabContent()}
                    </div>
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
                <React.Fragment key={booking.id}>
                  <div
                    className={`grid-cell ${
                      booking.Banner === "ACVL" ? "red-circle" : "green-circle"
                    }`}
                    onClick={() => handleBookingClick(booking.id)}
                  ></div>
                  <div
                    className="grid-cell"
                    onClick={() =>
                      handleBookingClick1(booking["Customer Name"])
                    }
                  >
                    {booking["Customer Name"].split(" ")[0].substring(0, 7)}
                  </div>
                  <div
                    className="grid-cell"
                    onClick={() =>
                      handleBookingClick1(booking["Customer Name"])
                    }
                  >
                    {formatDate(booking.MoveDate)}
                  </div>
                  <div
                    className="grid-cell"
                    onClick={() =>
                      handleBookingClick1(booking["Customer Name"])
                    }
                  >
                    {getLastTwoLetters(booking["Move From"])}
                  </div>
                  <div
                    className="grid-cell"
                    onClick={() =>
                      handleBookingClick1(booking["Customer Name"])
                    }
                  >
                    {getLastTwoLetters(booking.MoveTo)}
                  </div>
                  <div
                    className="grid-cell"
                    onClick={() =>
                      handleBookingClick1(booking["Customer Name"])
                    }
                  >
                    {booking["Bedroom Size"] || "N/A"}
                  </div>
                  <div
                    className="grid-cell"
                    onClick={() =>
                      handleBookingClick1(booking["Customer Name"])
                    }
                  >
                    {booking["Move Co ordinator"]
                      ? `${
                          booking["Move Co ordinator"].split(" ")[0][0] || ""
                        }${
                          booking["Move Co ordinator"].split(" ")[1]
                            ? booking["Move Co ordinator"].split(" ")[1][0]
                            : ""
                        }`
                      : "N/A"}
                  </div>
                  <div
                    className="grid-cell"
                    onClick={() =>
                      handleBookingClick1(booking["Customer Name"])
                    }
                  >
                    {booking.Status}
                  </div>
                </React.Fragment>
              ))}
            </div>
          </div>
        )}

        {/* {viewMode === "grid" && (
          <div className="grid">
            <h1>Grid view page</h1>
          </div>
        )}

        {viewMode === "map" && (
          <div className="map">
            <h1>map view page</h1>
          </div>
        )} */}
      </div>
    </div>
  );
};

export default Abbookings;
