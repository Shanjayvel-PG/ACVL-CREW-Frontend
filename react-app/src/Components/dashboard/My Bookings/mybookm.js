
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { FaPen } from "react-icons/fa";
import "./mybook.css";
import { useUserContext } from "../../UserContext";
import MobileApp12 from "../mobiledash";

const BookingDetails = () => {
  const { userDetails } = useUserContext();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [bookings, setBookingsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState("");
  const [editStates, setEditStates] = useState({});
  const [selectedBooking, setSelectedBooking] = useState(null);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  useEffect(() => {
    axios
      .get(
        "https://appsail-10083401023.development.catalystappsail.com/zoho-data"
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

  useEffect(() => {
    const booking = bookings.find((b) => b.ID === parseInt(id, 10));
    setSelectedBooking(booking);
  }, [bookings, id]);

  const toggleEditState = (field) => {
    setEditStates((prevState) => {
      const isEditing = !prevState[field];

      if (isEditing) {
        return { ...prevState, [field]: true };
      } else {
        handleSave();
        return { ...prevState, [field]: false };
      }
    });
  };

  const handleInputChange = (field, value) => {
    setSelectedBooking((prevState) => ({
      ...prevState,
      [field]: value,
    }));
  };

  const handleSave = () => {
    if (selectedBooking) {
      axios
        .post("https://appsail-10083402707.development.catalystappsail.com/customer-detail", selectedBooking)
        .then((response) => {
          alert("Booking details saved successfully!");
        })
        .catch((error) => {
          console.error("Error saving booking details:", error);
          alert("Failed to save booking details. Please try again.");
        });
    }
  };

  const renderEditableField = (label, field, type = "text") => (
    <div className="editable-field-container">
      <label>{label}</label>
      <div className="input-with-button">
        {editStates[field] ? (
          <input
            type={type}
            value={selectedBooking[field]}
            onChange={(e) => handleInputChange(field, e.target.value)}
          />
        ) : field === "Invoicelink1" ? (
          <a
            href={`https://web.2go.com/invoices/${selectedBooking.Invoicelink}`}
            target="_blank"
            rel="noopener noreferrer"
            className="google-route-link"
          >
            View Invoice
          </a>
        ) : (
          <input type={type} value={selectedBooking[field]} readOnly />
        )}
        <button1 className="edit-button1" onClick={() => toggleEditState(field)}>
          <FaPen />
        </button1>
      </div>
    </div>
  );

  const renderTabContent = () => {
    if (!selectedBooking) return null;

    const coordinatesOrigin = selectedBooking.Coordinates_Origin;
    const coordinatesDestn = selectedBooking.Coordinates_Destn;

    let originLat, originLng, destnLat, destnLng;

    if (coordinatesOrigin) {
      const originCoords = coordinatesOrigin.split(",");
      if (originCoords.length !== 2) return null;

      originLat = parseFloat(originCoords[0].trim());
      originLng = parseFloat(originCoords[1].trim());

      if (isNaN(originLat) || isNaN(originLng)) return null;
    }

    if (coordinatesDestn) {
      const destnCoords = coordinatesDestn.split(",");
      if (destnCoords.length !== 2) return null;

      destnLat = parseFloat(destnCoords[0].trim());
      destnLng = parseFloat(destnCoords[1].trim());

      if (isNaN(destnLat) || isNaN(destnLng)) return null;
    }

    const origin = coordinatesOrigin ? { lat: originLat, lng: originLng } : null;
    const destination = coordinatesDestn ? { lat: destnLat, lng: destnLng } : null;

    let googleMapsLink;
    if (origin !== null && destination !== null) {
      googleMapsLink = `https://www.google.com/maps/dir/?api=1&origin=${origin.lat},${origin.lng}&destination=${destination.lat},${destination.lng}`;
    }

    const tabContent = () => {
      switch (activeTab) {
        case "Customer Details":
          return (
            <div className="customer-details-my details-content-all">
              {renderEditableField("Customer Name", "Customer_name")}
              {renderEditableField("Email Address", "Email", "email")}
              {renderEditableField("Phone Number", "PhoneNumber")}
              {renderEditableField("Alternate Phone Number", "AlternatePhoneNumber")}
            </div>
          );
        case "Move Details":
          return (
            <div className="move-details-my details-content-all">
              {renderEditableField("Move Date", "MoveDate")}
              {renderEditableField("Move Size", "MoveSize")}
              {renderEditableField("From Address", "FromAddress")}
              {renderEditableField("To Address", "ToAddress")}
              {renderEditableField("Customer Pickup Time", "CustomerPickupTime")}
              {renderEditableField("Pick Up Time", "PickUpTime")}
              {renderEditableField("Trailer", "Trailer")}
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
              {renderEditableField("Storage", "Storage")}
              {renderEditableField("Storage Location", "StorageLocation")}
              {renderEditableField("Origin Property Type", "OriginPropertyType")}
              {renderEditableField("Destination Property Type", "DestinationPropertyType")}
            </div>
          );
        case "Supplies & Instruction":
          return (
            <div className="supplies-instruction-my details-content-all">
              {renderEditableField("Staircase", "CountofStairs")}
              {renderEditableField("Long Walk", "LongWalk")}
              {renderEditableField("Elevator", "Elevator")}
              {renderEditableField("Heavy Items", "HeavyItems")}
              {renderEditableField("Packing Supplies", "PackingSupplies")}
              {renderEditableField("Packing Services", "PackingServices")}
              {renderEditableField("Special Instruction", "SpecialInstruction", "textarea")}
              {renderEditableField("Dispatch Comments", "DispatchComments", "textarea")}
            </div>
          );
        case "Payment Details":
          return (
            <div className="payment-details-my details-content-all">
              {renderEditableField("Invoice No", "INVOICE")}
              {renderEditableField("Invoice Link", "Invoicelink1")}
              {renderEditableField("Method of Payment", "MethodofPayment")}
              {renderEditableField("Deposit Paid", "DepositPaid")}
              {renderEditableField("Date Deposit Paid", "DateDepositPaid")}
              {renderEditableField("Paid By", "PaidBy")}
            </div>
          );
        case "Team":
          return (
            <div className="team-details-my details-content-all">
              {renderEditableField("Sales Agent", "Agent")}
              {renderEditableField("Crew Leader", "Crewleader")}
              {renderEditableField("Dispatch Manager", "CrewAssigned")}
              {renderEditableField("Dispatch Manager Phone Number", "ManagerPhoneNumber")}
              {renderEditableField("Ground Team", "Crew")}
            </div>
          );
        default:
          return null;
      }
    };

    return (
      <div>
        {tabContent()}
      </div>
    );
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
            {selectedBooking ? selectedBooking.Banner : "Booking Details"}
          </div>
          <div className="grid-header1">
            {selectedBooking ? selectedBooking["Customer_name"] : "Booking Details"}
          </div>
          <div className="grid-header1">
            {selectedBooking ? selectedBooking.MoveDate : "Booking Details"}
          </div>
          <div className="grid-header1">
            {selectedBooking ? selectedBooking["MoveFrom"] : "Booking Details"}
          </div>
          <div className="grid-header1">
            {selectedBooking ? selectedBooking.MoveTo : "Booking Details"}
          </div>
          <div className="grid-header1">
            {selectedBooking ? selectedBooking["MoveSize"] || "N/A" : "Booking Details"}
          </div>
          <div className="grid-header1">
            {selectedBooking ? selectedBooking["CrewAssigned"] || "N/A" : "Booking Details"}
          </div>
          <div className="grid-header1">
            {selectedBooking ? selectedBooking.Status : "Booking Details"}
          </div>
        </div>
        <div className="details-container">
          {["Customer Details", "Move Details", "Supplies & Instruction", "Payment Details", "Team"].map((tab) => (
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
