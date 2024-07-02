import axios from "axios";
import { FaPen } from "react-icons/fa";

export const fetchBookingsData = async (setBookingsData, setLoading, setError) => {
  try {
    const response = await axios.get("https://appsail-10083401023.development.catalystappsail.com/zoho-data");
    setBookingsData(response.data.records);
    setLoading(false);
  } catch (error) {
    setError(error);
    setLoading(false);
  }
};

export const handleInputChange = (event, setFieldValue, field) => { 
  const value = event.target.value;
  setFieldValue((prev) => ({ ...prev, [field]: value }));
};

export const getLastTwoLetters = (str) => str.slice(-2);

export const formatDate = (dateStr) => {
  const monthNames = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun", 
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ];
  const [day, month, year] = dateStr.split("/");
  const monthIndex = parseInt(month, 10) - 1;
  const monthName = monthNames[monthIndex];
  return `${day.padStart(2, "0")}-${monthName}-${year}`;
};

export const parseDate = (dateStr) => {
  const [day, month, year] = dateStr.split("/");
  return new Date(year, month - 1, day);
};

export const isFutureOrToday = (dateStr) => {
  const today = new Date();
  const date = parseDate(dateStr);
  today.setHours(0, 0, 0, 0);
  return date >= today;
};

export const toggleEditState = (field, editStates, setEditStates) => {
  setEditStates((prevState) => ({
    ...prevState,
    [field]: !prevState[field],
  }));
};




export const generateGoogleMapsLink = (origin, destination) => {
  return `https://www.google.com/maps/dir/?api=1&origin=${origin.lat},${origin.lng}&destination=${destination.lat},${destination.lng}`;
};

export const handleBookingClick = (booking, selectedBooking, setSelectedBooking, setActiveTab) => {
  setSelectedBooking(selectedBooking === booking ? null : booking);
  setActiveTab("Customer Details");
};

export const renderEditableInput = (field, selectedBooking, editStates, setSelectedBooking, type = "text") => (
  <div>
    {field === "Invoicelink1" ? (
      <a
        href={`https://web.2go.com/invoices/${selectedBooking.Invoicelink}`}
        target="_blank"
        rel="noopener noreferrer"
        className="google-route-link"
      >
        View Invoice
      </a>
    ) : (
      <input
        type={type}
        value={selectedBooking[field]}
        onChange={(e) => handleInputChange(e, setSelectedBooking, field)}
        className="editable-input"
      />
    )}
  </div>
);

export const renderTabContent = (
  activeTab,
  selectedBooking,
  query,
  editStates,
  setEditStates,
  setSelectedBooking,
  generateGoogleMapsLink,
  handleSave  // Ensure handleSave is included here
) => {
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

  const renderEditableField = (label, field, type = "text") => (
    <div>
      <label>{label}</label>
      <button2 className="edit-button" onClick={() => toggleEditState(field, editStates, setEditStates)}>
        <FaPen />
      </button2>
      {renderEditableInput(field, selectedBooking, editStates, setSelectedBooking, type)}
    </div>
  );

  const handleSaveChanges = () => {
    
    handleSave(selectedBooking); 
  };

  switch (activeTab) {
    case "Customer Details":
      return (
        <div className="customer-details-my details-content-my">
          {renderEditableField("Customer Name", "Customer_name")}
          {renderEditableField("Email Address", "Email", "email")}
          {renderEditableField("Phone Number", "PhoneNumber")}
          {renderEditableField("Alternate Phone Number", "AlternatePhoneNumber")}
          <button onClick={handleSaveChanges} className="save-button">
            Save
          </button>
        </div>
      );
    case "Move Details":
      return (
        <div className="move-details-my details-content-my">
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
          <button onClick={handleSaveChanges} className="save-button">
            Save
          </button>
        </div>
      );
    case "Supplies & Instruction":
      return (
        <div className="supplies-instruction-my details-content-my">
          {renderEditableField("Staircase", "CountofStairs")}
          {renderEditableField("Long Walk", "LongWalk")}
          {renderEditableField("Elevator", "Elevator")}
          {renderEditableField("Heavy Items", "HeavyItems")}
          {renderEditableField("Packing Supplies", "PackingSupplies")}
          {renderEditableField("Packing Services", "PackingServices")}
          {renderEditableField("Special Instruction", "SpecialInstruction", "textarea")}
          {renderEditableField("Dispatch Comments", "DispatchComments", "textarea")}
          <button onClick={handleSaveChanges} className="save-button">
            Save
          </button>
        </div>
      );
    case "Payment Details":
      return (
        <div className="payment-details-my details-content-my">
          {renderEditableField("Invoice No", "INVOICE")}
          {renderEditableField("Invoice Link", "Invoicelink1")}
          {renderEditableField("Method of Payment", "MethodofPayment")}
          {renderEditableField("Deposit Paid", "DepositPaid")}
          {renderEditableField("Date Deposit Paid", "DateDepositPaid")}
          {renderEditableField("Paid By", "PaidBy")}
          <button onClick={handleSaveChanges} className="save-button">
            Save
          </button>
        </div>
      );
    case "Team":
      return (
        <div className="team-details-my details-content-my">
          {renderEditableField("Sales Agent", "Agent")}
          {renderEditableField("Crew Leader", "Crewleader")}
          {renderEditableField("Dispatch Manager", "CrewAssigned")}
          {renderEditableField("Dispatch Manager Phone Number", "ManagerPhoneNumber")}
          {renderEditableField("Ground Team", "Crew")}
          <button onClick={handleSaveChanges} className="save-button">
            Save
          </button>
        </div>
      );
    default:
      return null;
  }
  
};
