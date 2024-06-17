import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "./mybook.css";

import App12 from "../MainDashboard";
import { useUserContext } from "../../UserContext";
import Header from "../header";
import MobileApp12 from "../mobiledash";

const BookingDetails = () => {
  const { userDetails } = useUserContext();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [bookings, setBookingsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState("");


  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

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

  const booking = bookings.find((b) => b["Customer Name"] === id);

  const renderTabContent = () => {
    if (!booking) return null;
    
    const coordinatesOrigin = booking.Coordinates_Origin;
    const coordinatesDestn = booking.Coordinates_Destn;

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
          <div className="customer-details-my details-content-all">
            <div>
              <label>Customer Name</label>
              <input type="text" value={booking["Customer Name"]} readOnly />
            </div>
            <div>
              <label>Email Address</label>
              <input type="email" value={booking["Email Address"]} readOnly />
            </div>
            <div>
              <label>Phone Number</label>
              <input type="text" value={booking["Phone Number"]} readOnly />
            </div>
            <div>
              <label>Alternate Phone Number</label>
              <input
                type="text"
                value={booking["Alternate Phone Number"]}
                readOnly
              />
            </div>
          </div>
        );
      case "Move Details":
        return (
          <div className="move-details-my details-content-all">
            <div>
              <label>Move Date</label>
              <input type="text" value={booking["MoveDate"]} readOnly />
            </div>
            <div>
              <label>Move Size</label>
              <input type="text" value={booking["Move Size"]} readOnly />
            </div>
            <div>
              <label>From Address</label>
              <input type="text" value={booking["FromAddress"]} readOnly />
            </div>
            <div>
              <label>To Address</label>
              <input type="text" value={booking["ToAddress"]} readOnly />
            </div>
            <div>
              <label>Customer Pickup Time</label>
              <input
                type="text"
                value={booking["Customer prefered Pick up Time"]}
                readOnly
              />
            </div>
            <div>
              <label>Pick Up Time</label>
              <input type="text" value={booking["PickUpTime"]} readOnly />
            </div>
            <div>
              <label>Trailer</label>
              <input type="text" value={booking["Trailer"]} readOnly />
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
              <input type="text" value={booking["Storage"]} readOnly />
            </div>
            <div>
              <label>Storage Location</label>
              <input type="text" value={booking["Storage Location"]} readOnly />
            </div>
            <div>
              <label>Origin Property Type</label>
              <input
                type="text"
                value={booking["Origin Property Type"]}
                readOnly
              />
            </div>
            <div>
              <label>Destination Property Type</label>
              <input
                type="text"
                value={booking["Destination Property Type"]}
                readOnly
              />
            </div>
          </div>
        );
      case "Supplies & Instruction":
        return (
          <div className="supplies-instruction-my details-content-all">
            <div>
              <label>Staircase</label>
              <input type="text" value={booking["Count of Stairs"]} readOnly />
            </div>
            <div>
              <label>Long Walk</label>
              <input type="text" value={booking["Long Walk"]} readOnly />
            </div>
            <div>
              <label>Elevator</label>
              <input type="text" value={booking["Elevator"]} readOnly />
            </div>
            <div>
              <label>Heavy Items</label>
              <input type="text" value={booking["Heavy Items"]} readOnly />
            </div>
            <div>
              <label>Packing Supplies</label>
              <input type="text" value={booking["Packing Supplies"]} readOnly />
            </div>
            <div>
              <label>Packing Services</label>
              <input type="text" value={booking["Packing Service"]} readOnly />
            </div>
            <div>
              <label>Special Instruction</label>
              <textarea value={booking["Special Instruction"]} readOnly />
            </div>
            <div>
              <label>Dispatch Comments</label>
              <textarea value={booking["Dispatch Comments"]} readOnly />
            </div>
          </div>
        );
      case "Payment Details":
        return (
          <div className="payment-details-my details-content-all">
            <div>
              <label>Invoice No</label>
              <input type="text" value={booking["INVOICE"]} readOnly />
            </div>
            <div>
              <label>Method of Payment</label>
              <input
                type="text"
                value={booking["Method of Payment"]}
                readOnly
              />
            </div>
            <div>
              <label>Deposit Paid</label>
              <input type="text" value={booking["Deposit Paid"]} readOnly />
            </div>
            <div>
              <label>Date Deposit Paid</label>
              <input
                type="text"
                value={booking["Date Deposit Paid"]}
                readOnly
              />
            </div>
            <div>
              <label>Paid By</label>
              <select value={booking["Paid By"]} readOnly>
                <option value="welfare">welfare</option>
                <option value="self">self</option>
                <option value="company">company</option>
              </select>
            </div>
          </div>
        );
      case "Team":
        return (
          <div className="team-details-my details-content-all">
            <div>
              <label>Sales Agent</label>
              <input type="text" value={booking["Sales Agent"]} readOnly />
            </div>
            <div>
              <label>Crew Leader</label>
              <input type="text" value={booking["Move Co ordinator"]} readOnly />
            </div>
            <div>
              <label>Dispatch Manager</label>
              <input type="text" value={booking["Crew Assigned"]} readOnly />
            </div>
            <div>
              <label>Crew Lead Phone Number</label>
              <input
                type="text"
                value={booking["Crew Lead Contact Number"]}
                readOnly
              />
            </div>
            <div>
              <label>Ground Team</label>
              <input type="text" value={booking["Ground Team"]} readOnly />
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  const toggleTab = (tabName) => {
    setActiveTab(activeTab === tabName ? "" : tabName);
  };

  return (
    <div className="booking-details-container">
      <MobileApp12 userDetails={userDetails} />
      <div className="mobile-details-container">
        <div className="booking-details-header">
        <div className="grid-header1">
          {booking ? booking.Banner : "Booking Details"}
        </div>
        <div className="grid-header1">
          {booking ? booking["Customer Name"] : "Booking Details"}
        </div>
        <div className="grid-header1">
          {booking ? booking.MoveDate : "Booking Details"}
        </div>
        <div className="grid-header1">
          {booking ? booking["Move From"] : "Booking Details"}
        </div>
        <div className="grid-header1">
          {booking ? booking.MoveTo : "Booking Details"}
        </div>
        <div className="grid-header1">
          {booking ? booking["Bedroom Size"] || "N/A" : "Booking Details"}
        </div>
        <div className="grid-header1">
          {booking ? booking["Crew Assigned"] || "N/A" : "Booking Details"}
        </div>
        <div className="grid-header1">
          {booking ? booking.Status : "Booking Details"}
        </div>
        </div>
          <div className="details-container">
            {[
              "Customer Details",
              "Move Details",
              "Supplies & Instruction",
              "Payment Details",
              "Team",
            ].map((tab) => (
              <div key={tab}>
                <button
                  className={`tab1 ${activeTab === tab ? "active" : ""}`}
                  onClick={() => toggleTab(tab)}
                >
                  {tab}
                  <span className="arrow">{activeTab === tab ? "▲" : "▼"}</span>
                </button>
                {activeTab === tab && (
                  <div className="details-content-container">
                    {renderTabContent(tab)}
                  </div>
                )}
              </div>
            ))}
          
        </div>
      </div>
    </div>
  );
};

export default BookingDetails;
