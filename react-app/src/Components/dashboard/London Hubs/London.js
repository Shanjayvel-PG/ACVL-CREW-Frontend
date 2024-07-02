import React, { useState, useEffect } from "react";
import axios from "axios";
import "../My Bookings/mybook.css";
import { BsGrid1X2Fill } from "react-icons/bs";
import { FaMapMarkerAlt } from "react-icons/fa";
import { FaClipboardList } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Exlondon from "../London Hubs/Exlondon";
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
} from "../../Tabcontent";

const zipcodeRanges = [
  { start: "N1C 0A0", end: "N1L 9Z9", location: "London" },
  { start: "N1P 0A0", end: "N1T 9Z9", location: "London" },
  { start: "N2A 0A0", end: "N2H 9Z9", location: "London" },
  { start: "N2J 0A0", end: "N2L 9Z9", location: "London" },
  { start: "N2M 0A0", end: "N2R 9Z9", location: "London" },
  { start: "N2T 0A0", end: "N2V 9Z9", location: "London" },
  { start: "N3C 0A0", end: "N3H 9Z9", location: "London" },
  { start: "N3P 0A0", end: "N3V 9Z9", location: "London" },
  { start: "N4K 0A0", end: "N4K 9Z9", location: "London" },
  { start: "N5V 0A0", end: "N6Z 9Z9", location: "London" },
  { start: "N7S 0A0", end: "N7X 9Z9", location: "London" },
  { start: "N8N 0A0", end: "N9J 9Z9", location: "London" },
];

const London = () => {
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [activeTab, setActiveTab] = useState("Customer Details");
  const [query, setQuery] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [data, setData] = useState([]);
  const [viewMode, setViewMode] = useState("list");
  const [editStates, setEditStates] = useState({});

  useEffect(() => {
    axios
      .get(
        "https://appsail-10083401023.development.catalystappsail.com/zoho-data"
      )
      .then((response) => {
        console.log("API response:", response);
        if (Array.isArray(response.data)) {
          const filtered = response.data.filter((item) =>
            isLondonHub(item.FromAddress)
          );
          setData(filtered);
          setFilteredData(filtered);
        } else if (response.data && Array.isArray(response.data.records)) {
          const filtered = response.data.records.filter((item) =>
            isLondonHub(item.FromAddress)
          );
          setData(filtered);
          setFilteredData(filtered);
        } else {
          console.error("API response is not an array:", response.data);
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const navigate = useNavigate();

  const handleBookingClick1 = (id) => {
    navigate(`/booking/${id}`);
  };

  const isZipcodeInRange = (zipcode, range) => {
    const start = range.start.replace(/\s/g, "");
    const end = range.end.replace(/\s/g, "");
    const zip = zipcode.replace(/\s/g, "");
    return zip >= start && zip <= end;
  };

  const extractZipcode = (address) => {
    const match = address.match(/([A-Za-z]\d[A-Za-z] ?\d[A-Za-z]\d)/);
    return match ? match[0] : "";
  };

  const isLondonHub = (address) => {
    const itemZipcode = extractZipcode(address);
    return zipcodeRanges.some((range) => isZipcodeInRange(itemZipcode, range));
  };

  const handleInputChange = (event) => {
    const searchQuery = event.target.value.toLowerCase();
    setQuery(searchQuery);
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
    if (!dateStr) return "";
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
    const monthIndex = parseInt(month, 10) - 1;
    const monthName = monthNames[monthIndex];
    return `${day.padStart(2, "0")}-${monthName}-${year}`;
  };

  const isFutureOrToday = (moveDate) => {
    if (!moveDate) return false;
    const [day, month, year] = moveDate.split("/").map(Number);
    const moveDateObj = new Date(year, month - 1, day);
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Set to the start of today
    return moveDateObj >= today;
  };

  useEffect(() => {
    const filtered = data.filter(
      (booking) => searchBookingData(booking) && isFutureOrToday(booking.MoveDate)
    );
    setFilteredData(filtered);
  }, [query, data]);

  const getLastTwoLetters = (str) => {
    return str ? str.slice(-2).toUpperCase() : "";
  };

  return (
    <div className="bookings-my">
      <div className="main-content-my">
        <div className="header-my">
          <h1>London Hub Bookings</h1>
          <div className="search-bar">
            <input
              type="text"
              value={query}
              onChange={handleInputChange}
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
                <span>Name</span>
                <span>Move Date</span>
                <span>Origin</span>
                <span>Destn</span>
                <span>Move Size</span>
                <span>Crew Assigned</span>
                <span>Status</span>
              </div>
              {filteredData.map((booking, index) => (
                <React.Fragment key={index}>
                  <div
                    className={`booking-item-my ${
                      selectedBooking === booking ? "active" : ""
                    }`}
                    onClick={() => handleBookingClick(booking)}
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
                      {renderTabContent(activeTab, selectedBooking, query, editStates, setEditStates, setSelectedBooking, generateGoogleMapsLink)}
                      </div>
                    </>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
        )}

{viewMode === "grid" && (
          <div className="grid">
             <Exlondon/>
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

export default London;
