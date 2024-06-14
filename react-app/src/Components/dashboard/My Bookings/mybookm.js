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
        "https://appsail-10082548988.development.catalystappsail.com/zoho-data"
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
                value={booking["Customer Pickup Time"]}
                readOnly
              />
            </div>
            <div>
              <label>Pick Up Time</label>
              <input type="text" value={booking["Pick Up Time"]} readOnly />
            </div>
            <div>
              <label>Trailer</label>
              <input type="text" value={booking["Trailer"]} readOnly />
            </div>
            <div>
              <label>Google Route Link</label>
              <a
                href={booking["Google Route Link"]}
                target="_blank"
                rel="noopener noreferrer"
              >
                Route Link
              </a>
            </div>
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
              <input type="text" value={booking["Packing Services"]} readOnly />
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
              <input type="text" value={booking["Agent"]} readOnly />
            </div>
            <div>
              <label>Crew Leader</label>
              <input type="text" value={booking["Crew leader"]} readOnly />
            </div>
            <div>
              <label>Dispatch Manager</label>
              <input type="text" value={booking["Crew Assigned"]} readOnly />
            </div>
            <div>
              <label>Dispatch Manager Phone Number</label>
              <input
                type="text"
                value={booking["Manager Phone Numbe"]}
                readOnly
              />
            </div>
            <div>
              <label>Ground Team</label>
              <input type="text" value={booking["Crew"]} readOnly />
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
