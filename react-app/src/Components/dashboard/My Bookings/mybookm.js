
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { FaPen, FaSave } from "react-icons/fa";
import "./mybook.css";
import { useUserContext } from "../../UserContext";
import MobileApp12 from "../mobiledash";
import "../../usebooking.css";
import Select from 'react-select';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const BookingDetails = () => {
  const [activeField, setActiveField] = useState(null); 
  const [previousValue, setPreviousValue] = useState(null);
  const [customMoveSize, setCustomMoveSize] = useState('');
  const [isOtherSelected, setIsOtherSelected] = useState(false); 
  const [isCustomerRequirementExpanded, setIsCustomerRequirementExpanded] = useState(true);

  const toggleCustomerRequirement = () => {
    setIsCustomerRequirementExpanded(!isCustomerRequirementExpanded);
  };
  const [columnMapping, setColumnMapping] = useState({});
  const [MoveOptions, setMoveOptions] = useState([]);
  const { userDetails } = useUserContext();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeTab1, setActiveTab1] = useState("Customer Details");
  const [activeTab2, setActiveTab2] = useState("Job Details");
  const [bookings, setBookingsData] = useState([]);
  const [TruckDetailsOptions, setTruckDetailsOptions] = useState([]);
  const [OwnerOptions, setOwnerOptions] = useState([]);
  const [HubOptions, setHubOptions] = useState([]);
  const [CapacityOptions, setCapacityOptions] = useState([]);
  const [TruckTypeOptions, setTruckTypeOptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState("");
  const [activeTab3, setActiveTab3] = useState("");
  const [editStates, setEditStates] = useState({});
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [popupContent, setPopupContent] = useState("");
  const [assignedToOptions, setAssignedToOptions] = useState([]);
  const [MoveSizeOption, setMoveSizeOption] = useState([]);
  const [movecoordinates, setmovecoordinates] = useState([]);
  const [Status_Assigned, setStatus_Assigned] = useState([]);
  const [dispatchagent, setdispatchagent] = useState([]);
  const [inputValue, setInputValue] = useState(''); 
  const [inputValue1, setInputValue1] = useState(''); 
  const [manualInputs, setManualInputs] = useState({
    Truck_Owner: "",
    Truck_Types: "",
    Hub: "",
    Truck_Capacity: "",
  });
  const [formData, setFormData] = useState({
    Truck_Details: "",
    Truck_Owner: "",
    Truck_Types: "",
    Hub: "",
    Truck_Capacity: "",
  });
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  const options12 = [
    ...MoveSizeOption
      .filter(option => option && option.trim() !== '')
      .map(option => ({ label: option, value: option })),
    { label: 'Other', value: 'Other' }
  ];
  const handleonclick = () => {
    setActiveTab1("Customer Details");
  }
  const handleClosePopup = () => {
    setIsPopupVisible(false);
  };
  const handleTabClick = (tab) => {
    console.log("Switching to tab:", tab);
    setActiveTab2(tab);
  };
  const formatDate = (dateStr) => {
    const monthNames = [
      "Jan", "Feb", "Mar", "Apr", "May", "Jun",
      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];
  
    if (!dateStr || typeof dateStr !== "string") {
      console.error("Invalid date string:", dateStr);
      return "Invalid Date";
    }
  
    const datePattern = /^(\d{1,2}) (\w{3}), (\d{4})$/;
    const match = dateStr.match(datePattern);
  
    if (!match) {
      console.error("Date string is malformed:", dateStr);
      return "Invalid Date";
    }
  
    const dayStr = parseInt(match[1], 10);
    const monthName = match[2];
    const year = match[3];
  
    if (isNaN(dayStr) || !monthNames.includes(monthName) || isNaN(parseInt(year, 10))) {
      console.error("Date components are invalid:", dayStr, monthName, year);
      return "Invalid Date";
    }
  
    return `${dayStr}-${monthName}-${year}`;
  };
  
  const handlePopupOpen = (content) => {
    setPopupContent(content);
    setIsPopupVisible(true);
  };
  useEffect(() => {
    axios
      .get("http://localhost:9000/zoho-data")
      .then((response) => {
        setBookingsData(response.data.dataRows);
        setColumnMapping(response.data.columnMapping);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, []);
  const fetchAssignedToOptions = async () => {
    try {
      const response = await axios.get('http://localhost:9000/zoho-data/Assigned-To-Name');
      if (response.data && response.data.records) {
        const names = response.data.records.map(record => record.Assigned_To_Names);
        const name = response.data.records.map(record => record.Move_Co_Ordinators);
        const Dispatch = response.data.records.map(record => record.Dispatch_Agent);
        const Status = response.data.records.map(record => record.Status_Assigned);
        const TruckDetails = response.data.records.map(record => record.TruckDetails);
        const Owner = response.data.records.map(record => record.Owner);
        const TruckType = response.data.records.map(record => record.TruckType);
        const Hub = response.data.records.map(record => record.Hub);
        const Capacity = response.data.records.map(record => record.Capacity);
        const MoveSize = response.data.records.map(record => record.MoveSize);
        setMoveSizeOption(MoveSize);
        setmovecoordinates(name)
        setdispatchagent(Dispatch)
        setStatus_Assigned(Status)
        setAssignedToOptions(names);
        setTruckDetailsOptions(TruckDetails);
        setOwnerOptions(Owner);
        setTruckTypeOptions(TruckType);
        setHubOptions(Hub);
        setCapacityOptions(Capacity);
        setmovecoordinates(name)
        setdispatchagent(Dispatch)
        setStatus_Assigned(Status)
        setAssignedToOptions(names);
      } else {
        console.log('No records found in response');
        setAssignedToOptions([]);
      }
    } catch (error) {
      console.error('Error fetching assigned to options:', error);
      setAssignedToOptions([]);
    }
  };
  useEffect(() => {
    const booking = bookings.find((b) => b.row_index === parseInt(id, 10));
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
  const handleSave = (id) => {
    const dataToSend = {
      rowIndex: selectedBooking.row_index,
      updatedFields: {}
    };

    for (const fieldName in selectedBooking) {
      if (columnMapping.hasOwnProperty(fieldName)) {
        const columnIndex = columnMapping[fieldName];
        dataToSend.updatedFields[columnIndex] = {
          columnName: fieldName,
          value: selectedBooking[fieldName]
        };
      }
    }
    axios
      .post("http://localhost:9000/customer-detail", dataToSend, {
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then((response) => {
        console.log("Update successful:", response);
      })
      .catch((error) => {
        console.error("There was an error!", error);
        alert("Failed to save booking details. Please try again.");
        setError(error);
      });
  };
  const parseDate = (dateStr) => {
    const numericDatePattern = /^(\d{1,2})-(\d{1,2})-(\d{4})$/;
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    let day, month, year;
    const numericMatch = dateStr.match(numericDatePattern);
    if (numericMatch) {
      day = parseInt(numericMatch[1], 10);
      month = parseInt(numericMatch[2], 10) - 1; 
      year = parseInt(numericMatch[3], 10);
    } else {

      [day, month, year] = dateStr.replace(',', '').split(' ');
      month = monthNames.indexOf(month);
      day = parseInt(day, 10);
      year = parseInt(year, 10);
    }
    if (isNaN(day) || isNaN(month) || isNaN(year) || month < 0 || month > 11) {
      console.error("Invalid date components:", dateStr);
      return null;
    }
  
    return new Date(year, month, day);
  };
  useEffect(() => {
    fetchAssignedToOptions();
  }, []);
  const options2 = assignedToOptions
  .filter(option => option && option.trim() !== '')
  .map(option => ({ label: option, value: option }));

  const options4 = dispatchagent
  .filter(option => option && option.trim() !== '')
  .map(option => ({ label: option, value: option }));
  
  const options5 = movecoordinates
  .filter(option => option && option.trim() !== '')
  .map(option => ({ label: option, value: option }));

  const options3 = Status_Assigned
  .filter(option => option && option.trim() !== '')
  .map(option => ({ label: option, value: option }));

  const options = MoveOptions
  .filter(option => option && option.trim() !== '')
  .map(option => ({ label: option, value: option }));
  const options6 = TruckTypeOptions
  .filter(option => option && option.trim() !== '')
  .map(option => ({ label: option, value: option }));

  const options7 = CapacityOptions
  .filter(option => option && option.trim() !== '')
  .map(option => ({ label: option, value: option }));

  const options8 = HubOptions
  .filter(option => option && option.trim() !== '')
  .map(option => ({ label: option, value: option }));

  const options9 = OwnerOptions
  .filter(option => option && option.trim() !== '')
  .map(option => ({ label: option, value: option }));

  const options11 = TruckDetailsOptions
  .filter(option => option && option.trim() !== '')
  .map(option => ({ label: option, value: option }));
  const handleTruckDetailsChange = (selectedOption) => {
    const value = selectedOption?.value;
  
    const selectedIndex = options11.findIndex(option => option.value === value);
  
    handleInputChange("Truck_Details", value);
  
    if (selectedIndex >= 0) {
  
      if (options9[selectedIndex]) {
        handleInputChange("Truck_Owner", options9[selectedIndex].value);
      } else {
        handleInputChange("Truck_Owner", ""); 
      }
  
      if (options6[selectedIndex]) {
        handleInputChange("Truck_Types", options6[selectedIndex].value);
      } else {
        handleInputChange("Truck_Types", "");
      }
  
      if (options8[selectedIndex]) {
        handleInputChange("Hub", options8[selectedIndex].value);
      } else {
        handleInputChange("Hub", "");
      }
  
      if (options7[selectedIndex]) {
        handleInputChange("Truck_Capacity", options7[selectedIndex].value);
      } else {
        handleInputChange("Truck_Capacity", "");
      }
    }
  };

const filteredOptions1 = options.filter(option =>
  option.label.toLowerCase().startsWith(inputValue.toLowerCase())
);
  const options1 = MoveOptions
  .filter(option => option && option.trim() !== '')
  .map(option => ({ label: option, value: option }));

const filteredOptions2 = options1.filter(option =>
  option.label.toLowerCase().startsWith(inputValue1.toLowerCase())
);

  const renderEditableField = (label, field, type = "text", value , key) => (
    <div key={key} className="editable-field-container">
      <div className='editable-field-container2'>
        <div className="editable-field-container1">
          <label>{label} :</label>
        </div>
      </div>
      <div className="input-with-button">
      {editStates[field] && field !== "Invoicelink1" ? (
        field === "Assigned_To" ? (
          <Select
          name="Assigned_To"
          value={options2.find(option => option.value === value)}
          onChange={(selectedOption) => {
            handleInputChange(field, selectedOption?.value); 
          }}
          options={options2} 
          placeholder="Assigned To"
          isClearable 
        />
        ) : 
        field === "Start_Time_from_Hub" ||
        field === "Time_reached_Pick_location" ||
        field === "Loading_Start_Time" ||
        field === "Loading_End_time" ||
        field === "Travel_Start_from_Pick_up_Location" ||
        field === "Travel_End_at_destination" ||
        field === "Unloading_Start_Time" ||
        field === "Unloading_End_Time" ||
        field === "Return_start_Time" ||
        field === "Arrival_Time_Hub_Next_Job" ? (
          <DatePicker
            selected={value ? new Date(`1970-01-01T${value}:00`) : null}
            onChange={(time) => {
              const formattedTime = time
                ? `${time.getHours()}:${String(time.getMinutes()).padStart(2, "0")}`
                : "";
              handleInputChange(field, formattedTime);
            }}
            showTimeSelect
            showTimeSelectOnly
            timeIntervals={15}
            timeCaption="Time"
            dateFormat="HH:mm"
          />
        
      ) :field === "Move_From" ? (
          <Select
            name="Move_From"
            value={options.find(option => option.value === value)} 
            onChange={(selectedOption) => {
              handleInputChange(field, selectedOption?.value); 
            }}
            options={filteredOptions1} 
            inputValue={inputValue} 
            onInputChange={(newValue) => setInputValue(newValue)} 
            menuIsOpen={inputValue.length > 0} 
            placeholder="Type to search"
            isClearable 
          />
        )  :field === "Move_To" ? (
          <Select
            name="Move_To"
            value={options.find(option => option.value === value)} 
            onChange={(selectedOption) => {
              handleInputChange(field, selectedOption?.value); 
            }}
            options={filteredOptions2} 
            inputValue={inputValue1} 
            onInputChange={(newValue) => setInputValue1(newValue)} // Update input value on typing
            menuIsOpen={inputValue1.length > 0} // Show dropdown only when input exists
            placeholder="Type to search"
            isClearable // Allows clearing the selection
          />
        )  :field === "Move_Co_Ordinators" ? (
          <Select
          name="Move_Co_Ordinators"
          value={options5.find(option => option.value === value)}
          onChange={(selectedOption) => {
            handleInputChange(field, selectedOption?.value); 
          }}
          options={options5} 
          placeholder="Select Move Coordinators"
          isClearable 
        />
        ) : field === "Dispatch_Agent" ? (
          <Select
          name="Dispatch_Agent"
          value={options4.find(option => option.value === value)}
          onChange={(selectedOption) => {
            handleInputChange(field, selectedOption?.value); 
          }}
          options={options4} 
          placeholder="Select Dispatch Agent"
          isClearable 
        />
        ) : field === "Move_Size" ? (
          <>
            <Select
              name="Move_Size"
              value={options12.find(option => option.value === value)}
              onChange={(selectedOption) => {
                if (selectedOption?.value === 'Other') {
                  setIsOtherSelected(true);
                  setCustomMoveSize('');
                  handleInputChange("Move_Size", 'Other');
                } else {
                  setIsOtherSelected(false);
                  handleInputChange("Move_Size", selectedOption?.value);
                }
              }}
              options={options12}
              placeholder="Move Size"
              isClearable
            />
            {isOtherSelected && (
              <input
                type="text"
                value={customMoveSize}
                onChange={(event) => {
                  setCustomMoveSize(event.target.value);
                  handleInputChange("Move_Size", event.target.value);
                }}
                placeholder="Enter custom move size"
              />
            )}
          </>
        ): field === "Status" ? (
          <Select
          name="Status"
          value={options3.find(option => option.value === value)}
          onChange={(selectedOption) => {
            handleInputChange(field, selectedOption?.value); 
          }}
          options={options3} 
          placeholder="Select Status"
          isClearable 
        />
        ) : field === "MoveDate" || field === "Booked_Date" ? (
          <DatePicker
            selected={parseDate(selectedBooking[field]) || null}
            onChange={(date) =>
              handleInputChange(
                field,
                date
                  ? `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`
                  : ""
              )
            }
            dateFormat="d MMM, yyyy"
          />
        ) : field === "Dispatch_Date" ? (
              <DatePicker
                selected={
                  selectedBooking[field] 
                    ? new Date(selectedBooking[field].split('-').reverse().join('-')) // Convert 'dd-MM-yyyy' to 'yyyy-MM-dd' and create a Date object
                    : null
                }
                onChange={(date) =>
                  handleInputChange(
                    field,
                    date
                      ? `${String(date.getDate()).padStart(2, '0')}-${String(date.getMonth() + 1).padStart(2, '0')}-${date.getFullYear()}`
                      : ""
                  )
                }
                dateFormat="d MMM, yyyy"
              />
        ) :field === "Truck_Details" ? (
          <Select
            name="Truck_Details"
            value={options11.find(option => option.value === formData.Truck_Details)}
            onChange={handleTruckDetailsChange}
            options={options11}
            placeholder="Select Truck Details"
            isClearable
          />
        ) : field === "Truck_Owner" ? (
          <>
            {formData.Truck_Owner ? (
              <Select
                name="Truck_Owner"
                value={options9.find(option => option.value === formData.Truck_Owner)}
                onChange={(selectedOption) => {
                  handleInputChange("Truck_Owner", selectedOption?.value);
                }}
                options={options9}
                placeholder="Select Truck Owner"
                isClearable
              />
            ) : (
              <input
                type="text"
                value={manualInputs.Truck_Owner}
                onChange={(e) => handleInputChange("Truck_Owner", e.target.value)}
                placeholder="Enter Truck Owner"
              />
            )}
          </>
        ) : field === "Truck_Types" ? (
          <>
            {formData.Truck_Types ? (
              <Select
                name="Truck_Types"
                value={options6.find(option => option.value === formData.Truck_Types)}
                onChange={(selectedOption) => {
                  handleInputChange("Truck_Types", selectedOption?.value);
                }}
                options={options6}
                placeholder="Select Truck Types"
                isClearable
              />
            ) : (
              <input
                type="text"
                value={manualInputs.Truck_Types}
                onChange={(e) => handleInputChange("Truck_Types", e.target.value)}
                placeholder="Enter Truck Types"
              />
            )}
          </>
        ) : field === "Hub" ? (
          <>
            {formData.Hub ? (
              <Select
                name="Hub"
                value={options8.find(option => option.value === formData.Hub)}
                onChange={(selectedOption) => {
                  handleInputChange("Hub", selectedOption?.value);
                }}
                options={options8}
                placeholder="Select Hub"
                isClearable
              />
            ) : (
              <input
                type="text"
                value={manualInputs.Hub}
                onChange={(e) => handleInputChange("Hub", e.target.value)}
                placeholder="Enter Hub"
              />
            )}
          </>
        ) : field === "Truck_Capacity" ? (
          <>
            {formData.Truck_Capacity ? (
              <Select
                name="Truck_Capacity"
                value={options7.find(option => option.value === formData.Truck_Capacity)}
                onChange={(selectedOption) => {
                  handleInputChange("Truck_Capacity", selectedOption?.value);
                }}
                options={options7}
                placeholder="Select Truck Capacity"
                isClearable
              />
            ) : (
              <input
                type="text"
                value={manualInputs.Truck_Capacity}
                onChange={(e) => handleInputChange("Truck_Capacity", e.target.value)}
                placeholder="Enter Truck Capacity"
              />
            )}
          </>
        ) : field === "From_Address" || field === "To_Address" || field === "Crew_Comments" || field === "CUSTOMER_REVIEW" || field === "Google_Reviews" ? (
          <textarea
          type={type}
          value={value}
          onChange={(e) => handleInputChange(field, e.target.value)}
          onClick={() => {
            toggleEditState(field);
            setPreviousValue(value); 
            setActiveField(field); 
          }}
          />
        ) : (
          <input
          type={type}
          value={value}
          onChange={(e) => handleInputChange(field, e.target.value)}
          onClick={() => {
            toggleEditState(field);
            setPreviousValue(value); 
            setActiveField(field); 
          }}
          autoFocus
        />
          )
        // : (
        //       <input
        //       type={type}
        //       value={value}
        //       onChange={(e) => handleInputChange(field, e.target.value)}
        //     />
        //   )
        ) : ( 
          field === "MoveDate" || field === "Dispatch_Date" || field === "Booked_Date"  ? (
            <input type="text" value={selectedBooking[field] ? selectedBooking[field] : "N/A"} onClick={() => {
              toggleEditState(field);
              setActiveField(field); 
              setPreviousValue(value); 
            }} />
          ) : field === "Crew_Comments" || field === "Google_Reviews" || field === "CUSTOMER_REVIEW" || field === "To_Address" || field === "From_Address" ? (
            <textarea readOnly
            onClick={() => {
              toggleEditState(field);
              setActiveField(field); 
              setPreviousValue(value); 
            }}>{selectedBooking[field]}</textarea>
          ) 
          // :  field === "Google_Reviews" ? (
          //   <textarea readOnly>{selectedBooking[field]}</textarea>
          // ) : field === "CUSTOMER_REVIEW" ? (
          //   <textarea readOnly>{selectedBooking[field]}</textarea>
          // ) : field === "InventoryDetails" ? (
          //   <textarea>{selectedBooking[field]}</textarea>
          // ) 
          : field === "Email_Address" ? (
            <a href={`mailto:${selectedBooking[field]}`} className="email-link">
              {selectedBooking[field]}
            </a>
          ) : field === "Phone_Number" || field === "Alt_Phone_Number" ? (
            <a href={`tel:${selectedBooking[field]}`} className="phone-link">
              {selectedBooking[field]}
            </a>
          ) 
          : field === "Invoicelink1" ? (
            <a
              href={`https://web.2go.com/invoices/${selectedBooking.Invoicelink}`}
              target="_blank"
              rel="noopener noreferrer"
              className="google-route-link"
            >
              View Invoice
            </a>
          ) : (
            <input type={type} value={value} readOnly 
            onClick={() => {
              toggleEditState(field);
              setActiveField(field); 
              setPreviousValue(value);
            }}/>
          )
        )}
        {/* {field !== "Invoicelink1" && (
          <button1 className="edit-button1" onClick={() => toggleEditState(field)}>
            {editStates[field] ? <FaSave className="save-icon" /> : <FaPen />}  
          </button1>
        )} */}
        {editStates[field] ? (
        <>
        <button1
          className={`edit-button3 ${editStates[field] ? 'active' : ''}`}
          onClick={() => {
            handleSave(field, value);
            toggleEditState(field); 
            setActiveField(null);  
          }}
        >
          <i className="fas fa-check"></i> 
        </button1>
        <button1
          className={`edit-button2 ${editStates[field] ? 'active' : ''}`}
          onClick={() => {
            handleInputChange(field, previousValue);  
            toggleEditState(field);  
            setActiveField(null);
          }}
        >
          <i className="fas fa-times"></i> 
        </button1>
      </>
    ) : (
      field !== "Invoicelink1" && field !== "Google_Route_Link" && (
      <button1
        className={`edit-button1 ${editStates[field] ? 'active' : ''}`}
        onClick={() => {
          toggleEditState(field); 
          setPreviousValue(value); 
          setActiveField(field);  
        }}
      >
        <i className="fas fa-pen"></i> 
      </button1>
      )
    )}
      </div>
    </div>
  );
  
  const renderTabContent1 = () => {
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
            <>
            <div  className='details-header'>
             <h1>Customer Details</h1>
            <div className="customer-details-my details-content-my">
                  {renderEditableField("Customer Name", "Customer_Name", "text",selectedBooking.Customer_Name, "Customer_Name" )}
                  {renderEditableField("Email Address", "Email_Address", "text",selectedBooking.Email_Address, "Email_Address")}
                  {renderEditableField("Phone Number", "Phone_Number", "text",selectedBooking.Phone_Number, "Phone_Number")}
                  {renderEditableField("Alt Phone Number", "Alt_Phone_Number", "text",selectedBooking.Alt_Phone_Number, "Alt_Phone_Number")}
            </div>
            </div>
            </>
          );
        case "Move Details":
          return (
            <>
            <div  className='details-header'>
             <h1>Move Details</h1>
            <div className="move-details-my details-content-my">
              {renderEditableField("Move Date", "MoveDate", "date",selectedBooking.MoveDate, "MoveDate")}
              {renderEditableField("Move Size", "Move_Size", "text",selectedBooking.Move_Size, "Move_Size")}
              {renderEditableField("From Address", "From_Address", "text",selectedBooking.From_Address, "From_Address")}
              {renderEditableField("To Address", "To_Address", "text",selectedBooking.To_Address, "To_Address")}
              {renderEditableField("Pick up Time", "Pick_up_Time", "text",selectedBooking.Pick_up_Time, "Pick_up_Time")}
              {renderEditableField("Google Route Link", "Google_Route_Link", "text",selectedBooking.Google_Route_Link, "Google_Route_Link")}    
              {renderEditableField("Storage", "Storage", "text",selectedBooking.Storage, "Storage")}
              {renderEditableField("Storage Location", "Storage_Location", "text",selectedBooking.Storage_Location, "Storage_Location")}
              {renderEditableField("Storage Duration", "Storage_Duration", "text",selectedBooking.Storage_Duration, "Storage_Duration")}
              {renderEditableField("Packing", "Packing", "text",selectedBooking.Packing, "Packing")}
              {renderEditableField("Packing Material", "Packing_Material", "text",selectedBooking.Packing_Material, "Packing_Material")}
            </div>
            </div>
            </>
          );
        case "Supplies & Instruction":
          return (
            <>
            <div  className='details-header'>
             <h1>Supplies & Instruction</h1>
            <div className="supplies-instruction-my details-content-my">
              {renderEditableField("Staircase", "Count_of_Stairs", "text",selectedBooking.Count_of_Stairs, "Count_of_Stairs")}
              {renderEditableField("Which Floor", "which_floor", "text",selectedBooking.which_floor, "which_floor")}
              {renderEditableField("Long Walk", "Long_Walk", "text",selectedBooking.Long_Walk, "Long_Walk")}
              {renderEditableField("Elevator", "Elevator", "text",selectedBooking.Elevator, "Elevator")}
              {renderEditableField("Special Instruction", "Special_Instruction", "textarea",selectedBooking.Special_Instruction, "Special_Instruction")}
            </div>
            </div>
            </>
          );
        case "Payment Details":
          return (
            <>
            <div  className='details-header'>
             <h1>Payment Details</h1>
            <div className="payment-details-my details-content-my">
              {renderEditableField("Invoice No", "INVOICE", "text",selectedBooking.INVOICE, "INVOICE")}
              {renderEditableField("Estimate No", "Estimate_No", "text",selectedBooking.Estimate_No, "Estimate_No")}
              {renderEditableField("Invoice Link", "Invoicelink1", "text",selectedBooking.Invoicelink1, "Invoicelink1")}
            </div>
            </div>
            </>
          );
        case "Team":
          return (            <>
            <div  className='details-header'>
             <h1>Team</h1>
              <div className="details-content-inventory">
              {<div className='hello'><a href="#" className="addbutton" onClick={() => handlePopupOpen("Work Order")}>Crew Notes</a></div>}
              <div className="team-details-my details-content-my">
                {renderEditableField("Status", "Status", "text",selectedBooking.Status, "Status")} 
                {renderEditableField("Assigned To", "Assigned_To", "text",selectedBooking.Assigned_To, "Assigned_To")}
                {renderEditableField("Sales Agent", "Sales_Agent", "text",selectedBooking.Sales_Agent, "Sales_Agent")}
                {renderEditableField("Move Coordinators", "Move_Co_Ordinators", "text",selectedBooking.Move_Co_Ordinators, "Move_Co_Ordinators")}
                {renderEditableField("Dispatch Agent", "Dispatch_Agent", "text",selectedBooking.Dispatch_Agent, "Dispatch_Agent")}
                {renderEditableField("Crew Leader Assigned", "Crew_Leader_Assigned", "text",selectedBooking.Crew_Leader_Assigned, "Crew_Leader_Assigned")}
                {renderEditableField("Crew Leader Contact Info", "Crew_Leader_Contact_Info", "text",selectedBooking.Crew_Leader_Contact_Info, "Crew_Leader_Contact_Info")}            
              </div>
            </div>
            </div>
            </>
          );
          case "Inventory":
            return (
              <>
              <div  className='details-header'>
               <h1>Inventory</h1>
              <div className="details-content-inventory">
                {<div className='hello'> <a href="#" className="addbutton" onClick={() => handlePopupOpen("Inventory")}>+ Add Inventory Details</a></div>}
                  <div className="Inventory-details-my details-content-my">
                    {renderEditableField("Gym Equipment", "Gym_equipment", "text",selectedBooking.Gym_equipment, "Gym_equipment")}
                    {renderEditableField("Appliance", "Appliances", "text",selectedBooking.Appliances, "Appliances")}
                    {renderEditableField("Fragile", "Fragile", "text",selectedBooking.Fragile, "Fragile")}
                    {renderEditableField("Flammable", "Flammable_items", "text",selectedBooking.Flammable_items, "Flammable_items")}
                  </div>
              </div>
              </div>
              </>
            );
            case "Notes & Updates":
              return (
                <div>
                  <div className="team-details-my details-content-all">
                  {renderEditableField("Assigned To", "Assigned_To", "text", selectedBooking.Assigned_To, "Assigned_To")}   
                  {renderEditableField("Status", "Status", "text", selectedBooking.Status, "Status")}   
                  </div>
                <div className="details-container">
                {["Job Details", "Quality Check", "Move coordination", "Move Reviews", "Expense"].map((tab) => (
                <div key={tab}>
                  <button
                    className={`tab1 ${activeTab3 === tab ? "active" : ""}`}
                    onClick={() => toggleTab1(tab)}
                  >
                    {tab}
                    <span className="arrow">{activeTab3 === tab ? "▲" : "▼"}</span>
                  </button>
                  {activeTab3 === tab && (
                    <div className="details-content-container">
                      {renderTabContentforUpdate1(tab)}
                    </div>
                  )}
                </div>
              ))}
            </div>
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
  
  const toggleTab1 = (tabName) => {
    setActiveTab3(activeTab3 === tabName ? "" : tabName);
  };
  const renderTabContentforUpdate1 = () => {
    switch (activeTab3) {
      case "Job Details":
        return (
          <>
          <div  className='details-header'>
          <h1>Job Details</h1>
          <div className="team-details-my details-content-my">
              {renderEditableField("Sales Agent", "Sales_Agent", "text",selectedBooking.Sales_Agent, "Sales_Agent")}
              {renderEditableField("Dispatch Agent", "Dispatch_Agent", "text",selectedBooking.Dispatch_Agent, "Dispatch_Agent")}
              {renderEditableField("Move Size", "Move_Size", "text",selectedBooking.Move_Size, "Move_Size")}
              {renderEditableField("Move Date", "MoveDate", "date",selectedBooking.MoveDate, "MoveDate")}
              {renderEditableField("Banner", "Banner", "text",selectedBooking.Banner, "Banner")}
              {renderEditableField("Invoice No", "INVOICE", "text",selectedBooking.INVOICE, "INVOICE")}
              {renderEditableField("Invoice Link", "Invoicelink1", "text",selectedBooking.Invoicelink1, "Invoicelink1")}
              {renderEditableField("severity", "severity", "text",selectedBooking.severity, "severity")}
              {renderEditableField("Connection Type", "Connection_Type", "text",selectedBooking.Connection_Type, "Connection_Type")}
              {renderEditableField("Estimate No", "Estimate_No", "text",selectedBooking.Estimate_No, "Estimate_No")}
              {renderEditableField("Move From", "Move_From", "text",selectedBooking.Move_From, "Move_From")}
              {renderEditableField("Move To", "Move_To", "text",selectedBooking.Move_To, "Move_To")}
              {renderEditableField("From Address", "From_Address", "text",selectedBooking.From_Address, "From_Address")}
              {renderEditableField("To Address", "To_Address", "text",selectedBooking.To_Address, "To_Address")}
              {renderEditableField("Booked Date", "Booked_Date", "text",selectedBooking.Booked_Date, "Booked_Date")}
              {renderEditableField("Assigned To", "Assigned_To", "text",selectedBooking.Assigned_To, "Assigned_To")}
          </div>
          </div>
          </>
        );
      case "Quality Check":
        return (
          <>
         <div  className='details-header'>
          <h1>Quality Check</h1>
          <div className="team-details-my details-content-my">
              {renderEditableField("Dispatch Date", "Dispatch_Date", "text",selectedBooking.Dispatch_Date, "Dispatch_Date")}
              {renderEditableField("Dispatch Comments", "Dispatch_Comments", "text",selectedBooking.Dispatch_Comments, "Dispatch_Comments")}
              {renderEditableField("Special Instruction", "Special_Instruction", "text",selectedBooking.Special_Instruction, "Special_Instruction")}
              {renderEditableField("Customer Name", "Customer_Name", "text",selectedBooking.Customer_Name, "Customer_Name")}
              {renderEditableField("Phone Number", "Phone_Number", "text",selectedBooking.Phone_Number, "Phone_Number")}
              {renderEditableField("Alt Phone Number", "Alt_Phone_Number", "text",selectedBooking.Alt_Phone_Number, "Alt_Phone_Number")}
              {renderEditableField("Email Address", "Email_Address", "text",selectedBooking.Email_Address, "Email_Address")}
              {renderEditableField("Pick up Time", "Pick_up_Time", "text",selectedBooking.Pick_up_Time, "Pick_up_Time")}
              {renderEditableField("From Address", "From_Address", "text",selectedBooking.From_Address, "From_Address")}
              {renderEditableField("To Address", "To_Address", "text",selectedBooking.To_Address, "To_Address")}
              {renderEditableField("Gym equipment", "Gym_equipment", "text",selectedBooking.Gym_equipment, "Gym_equipment")}
              {renderEditableField("Appliances", "Appliances", "text",selectedBooking.Appliances, "Appliances")}
              {renderEditableField("Fragile", "Fragile", "text",selectedBooking.Fragile, "Fragile")}
              {renderEditableField("Flammable items", "Flammable_items", "text",selectedBooking.Flammable_items, "Flammable_items")}
              {renderEditableField("Move Size", "Move_size_dispact_Agent", "text",selectedBooking.Move_size_dispact_Agent, "Move_size_dispact_Agent")}
              {renderEditableField("Staircase", "Count_of_Stairs", "text",selectedBooking.Count_of_Stairs, "Count_of_Stairs")}
              {renderEditableField("Which Floor", "which_floor", "text",selectedBooking.which_floor, "which_floor")}
              {renderEditableField("Long Walk", "Long_Walk", "text",selectedBooking.Long_Walk, "Long_Walk")}
              {renderEditableField("Elevator", "Elevator", "text",selectedBooking.Elevator, "Elevator")}
              {renderEditableField("Packing", "Packing", "text",selectedBooking.Packing, "Packing")}
              {renderEditableField("Packing Material", "Packing_Material", "text",selectedBooking.Packing_Material, "Packing_Material")}
              {renderEditableField("Complex Assembly or Disassembly", "Complex_Assembly_or_Disassembly", "text",selectedBooking.Complex_Assembly_or_Disassembly, "Complex_Assembly_or_Disassembly")}
              {renderEditableField("Special Requirement", "Special_Requirement", "text",selectedBooking.Special_Requirement, "Special_Requirement")}
              {renderEditableField("Customer OK with the Pricing", "Customer_OK_with_the_Pricing", "text",selectedBooking.Customer_OK_with_the_Pricing, "Customer_OK_with_the_Pricing")}
              {renderEditableField("Storage", "Storage", "text",selectedBooking.Storage, "Storage")}
              {renderEditableField("Storage Duration", "Storage_Duration", "text",selectedBooking.Storage_Duration, "Storage_Duration")}
              {renderEditableField("Storage Location", "Storage_Location", "text",selectedBooking.Storage_Location, "Storage_Location")}
              {renderEditableField("Valuable Items and Docs", "Valuable_Items_and_Docs", "text",selectedBooking.Valuable_Items_and_Docs, "Valuable_Items_and_Docs")}
              {renderEditableField("Docu Sign Status", "Docu_Sign_Status", "text",selectedBooking.Docu_Sign_Status, "Docu_Sign_Status")}
              {renderEditableField("Dispatch Email Sent", "Dispatch_Email_Sent", "text",selectedBooking.Dispatch_Email_Sent, "Dispatch_Email_Sent")}
              </div>
              </div>
              <div  className='details-header'>
            <h1>Storage</h1>
            <div className="team-details-my details-content-my">
              {renderEditableField("Storage Holder Name", "Storage_Holder_Name", "text",selectedBooking.Storage_Holder_Name, "Storage_Holder_Name")}
              {renderEditableField("Storage Address", "Storage_Address", "text",selectedBooking.Storage_Address, "Storage_Address")}
              {renderEditableField("Storage Start Date", "Storage_Start_date", "text",selectedBooking.Storage_Start_date, "Storage_Start_date")}
              {renderEditableField("Storage End Date", "Storage_End_date", "text",selectedBooking.Storage_End_date, "Storage_End_date")}
              {renderEditableField("Storage Invoice", "Storage_Invoice", "text",selectedBooking.Storage_Invoice, "Storage_Invoice")}
              {renderEditableField("Storage Unit", "Storage_Unit", "text",selectedBooking.Storage_Unit, "Storage_Unit")}
              {renderEditableField("Storage Acess", "Storage_Acess", "text",selectedBooking.Storage_Acess, "Storage_Acess")}
            </div>
          </div>
        </>
        );
      case "Move coordination":
        return (
          <>
            <div  className='details-header'>
              <h1>Customer Requirement          <span
          className="toggle-icon"
          onClick={toggleCustomerRequirement}
          style={{ cursor: 'pointer', marginLeft: '10px' }}
        >
          {isCustomerRequirementExpanded ? '-' : '+'}
        </span>
      </h1>
      {isCustomerRequirementExpanded && (
              <div className="team-details-my details-content-my">
                {renderField("Dispatch Date",selectedBooking.Dispatch_Date)}
                {renderField("Dispatch Comments",selectedBooking.Dispatch_Comments)}
                {renderField("Special Instruction",selectedBooking.Special_Instruction)}
                {renderField("Customer Name",selectedBooking.Customer_Name)}
                {renderField("Phone Number",selectedBooking.Phone_Number)}
                {renderField("Alt Phone Number",selectedBooking.Alt_Phone_Number)}
                {renderField("Email Address",selectedBooking.Email_Address)}
                {renderField("Pick up Time",selectedBooking.Pick_up_Time)}
                {renderField("From Address",selectedBooking.From_Address)}
                {renderField("To Address",selectedBooking.To_Address)}
                {renderField("Gym equipment",selectedBooking.Gym_equipment)}
                {renderField("Appliances",selectedBooking.Appliances)}
                {renderField("Fragile",selectedBooking.Fragile)}
                {renderField("Flammable items",selectedBooking.Flammable_items)}
                {renderField("Move Size",selectedBooking.Move_size_dispact_Agent)}
                {renderField("Staircase",selectedBooking.Count_of_Stairs)}
                {renderField("Which Floor",selectedBooking.which_floor)}
                {renderField("Long Walk",selectedBooking.Long_Walk)}
                {renderField("Elevator",selectedBooking.Elevator)}
                {renderField("Packing",selectedBooking.Packing)}
                {renderField("Packing Material",selectedBooking.Packing_Material)}
                {renderField("Complex Assembly or Disassembly",selectedBooking.Complex_Assembly_or_Disassembly)}
                {renderField("Special Requirement",selectedBooking.Special_Requirement)}
                {renderField("Customer OK with the Pricing",selectedBooking.Customer_OK_with_the_Pricing)}
                {renderField("Storage",selectedBooking.Storage)}
                {renderField("Storage Duration",selectedBooking.Storage_Duration)}
                {renderField("Storage Location",selectedBooking.Storage_Location)}
                {renderField("Valuable Items and Docs",selectedBooking.Valuable_Items_and_Docs)}
                {renderField("Docu Sign Status",selectedBooking.Docu_Sign_Status)}
                {renderField("Dispatch Email Sent",selectedBooking.Dispatch_Email_Sent)}
              </div>
      )}
            </div>
            <div  className='details-header'>
          <h1>Move Requirement</h1>
          <div className="team-details-my details-content-my">
              {renderEditableField("Move Coordinators", "Move_Co_Ordinators", "text",selectedBooking.Move_Co_Ordinators, "Move_Co_Ordinators")}
              {renderEditableField("Move Type", "Move_Type", "text",selectedBooking.Move_Type, "Move_Type")}
              {renderEditableField("Contract Reviewed", "Contract_Reviewed", "text",selectedBooking.Contract_Reviewed, "Contract_Reviewed")}
              {renderEditableField("Clubbed Move", "Clubbed_Move", "text",selectedBooking.Clubbed_Move, "Clubbed_Move")}
              {renderEditableField("Crew Leader Assigned", "Crew_Leader_Assigned", "text",selectedBooking.Crew_Leader_Assigned, "Crew_Leader_Assigned")}
              {renderEditableField("Crew Leader Contact Info", "Crew_Leader_Contact_Info", "text",selectedBooking.Crew_Leader_Contact_Info, "Crew_Leader_Contact_Info")}
              {renderEditableField("Customer Instruction Given", "Customer_Instruction_Given", "text",selectedBooking.Customer_Instruction_Given, "Customer_Instruction_Given")}
              {renderEditableField("Crew Contacts", "Crew_Contacts", "text",selectedBooking.Crew_Contacts, "Crew_Contacts")}
              </div>
              </div>
              <div  className='details-header'>
                  <h1>Truck Details</h1>
                  <div className="team-details-my details-content-my">
                    {renderEditableField("Truck Details", "Truck_Details", "text",selectedBooking.Truck_Details, "Truck_Details")}
                    {renderEditableField("Truck Owner", "Truck_Owner", "text",selectedBooking.Truck_Owner, "Truck_Owner")}
                    {renderEditableField("Truck Size", "Truck_Types", "text",selectedBooking.Truck_Types, "Truck_Types")}
                    {renderEditableField("Hub", "Hub", "text",selectedBooking.Hub, "Hub")}
                    {renderEditableField("Truck Capacity", "Truck_Capacity", "text",selectedBooking.Truck_Capacity, "Truck_Capacity")}
                  </div>
            </div>
            <div  className='details-header'>
            <h1>Storage</h1>
            <div className="team-details-my details-content-my">
              {renderEditableField("Storage", "Storage", "text",selectedBooking.Storage, "Storage")}
              {renderEditableField("Storage Duration", "Storage_Duration", "text",selectedBooking.Storage_Duration, "Storage_Duration")}
              {renderEditableField("Storage Location", "Storage_Location", "text",selectedBooking.Storage_Location, "Storage_Location")}
              {renderEditableField("Storage Holder Name", "Storage_Holder_Name", "text",selectedBooking.Storage_Holder_Name, "Storage_Holder_Name")}
              {renderEditableField("Storage Address", "Storage_Address", "text",selectedBooking.Storage_Address, "Storage_Address")}
              {renderEditableField("Storage Start Date", "Storage_Start_date", "text",selectedBooking.Storage_Start_date, "Storage_Start_date")}
              {renderEditableField("Storage End Date", "Storage_End_date", "text",selectedBooking.Storage_End_date, "Storage_End_date")}
              {renderEditableField("Storage Invoice", "Storage_Invoice", "text",selectedBooking.Storage_Invoice, "Storage_Invoice")}
              {renderEditableField("Storage Unit", "Storage_Unit", "text",selectedBooking.Storage_Unit, "Storage_Unit")}
              {renderEditableField("Storage Acess", "Storage_Acess", "text",selectedBooking.Storage_Acess, "Storage_Acess")}
            </div>
          </div>
          </>
        );
      case "Move Reviews":
        return (
          <>
            <div  className='details-header'>
              <h1>Move Reviews</h1>
              <div className="team-details-my details-content-my">
                {renderEditableField("Crew Comments", "Crew_Comments", "textarea",selectedBooking.Crew_Comments, "Crew_Comments")}
                {renderEditableField("Customer Review", "CUSTOMER_REVIEW", "text",selectedBooking.CUSTOMER_REVIEW, "CUSTOMER_REVIEW")}
                {renderEditableField("Google Reviews", "Google_Reviews", "text",selectedBooking.Google_Reviews, "Google_Reviews")}
              </div>
            </div>
          </>
        );
      case "Expense":
        return (
          <>
            <div  className='details-header'>
              <h1>Time</h1>
                <div className="team-details-my details-content-my">
                  {renderEditableField("Start Time from Hub", "Start_Time_from_Hub", "text",selectedBooking.Start_Time_from_Hub, "Start_Time_from_Hub")}
                  {renderEditableField("Time reached Pick location", "Time_reached_Pick_location", "text",selectedBooking.Time_reached_Pick_location, "Time_reached_Pick_location")}
                  {renderEditableField("Loading Start Time", "Loading_Start_Time", "text",selectedBooking.Loading_Start_Time, "Loading_Start_Time")}
                  {renderEditableField("Loading End time", "Loading_End_time", "text",selectedBooking.Loading_End_time, "Loading_End_time")}
                  {renderEditableField("Travel Start from Pick up Location", "Travel_Start_from_Pick_up_Location", "text",selectedBooking.Travel_Start_from_Pick_up_Location, "Travel_Start_from_Pick_up_Location")}
                  {renderEditableField("Travel End at destination (Storage/Hub/Customer's Destination)", "Travel_End_at_destination", "text",selectedBooking.Travel_End_at_destination, "Travel_End_at_destination")}
                  {renderEditableField("Unloading Start Time", "Unloading_Start_Time", "text",selectedBooking.Unloading_Start_Time, "Unloading_Start_Time")}
                  {renderEditableField("Unloading End Time", "Unloading_End_Time", "text",selectedBooking.Unloading_End_Time, "Unloading_End_Time")}
                  {renderEditableField("Return start Time", "Return_start_Time", "text",selectedBooking.Return_start_Time, "Return_start_Time")}
                  {renderEditableField("Arrival Time (Hub/Next Job)", "Arrival_Time_Hub_Next_Job", "text",selectedBooking.Arrival_Time_Hub_Next_Job, "Arrival_Time_Hub_Next_Job")}
                  {renderEditableField("Hours Estimated", "Hours_Estimated", "text",selectedBooking.Hours_Estimated, "Hours_Estimated")}
                  {renderEditableField("Move Distance (Kms)", "Move_Distance_Kms", "text",selectedBooking.Move_Distance_Kms, "Move_Distance_Kms")}
                  {renderEditableField("Total Weight (lbs)", "Total_Weight_lbs", "text",selectedBooking.Total_Weight_lbs, "Total_Weight_lbs")}
                </div>
            </div>
            <div  className='details-header'>
                <h1>Expense</h1>
                  <div className="team-details-my details-content-my">
                  {renderEditableField("Estimate Amount ($)", "Estimate_Amount_$", "text",selectedBooking.Estimate_Amount_$, "Estimate_Amount_$")}
                  {renderEditableField("Final Invoice Amt (Including Tax)", "Final_Invoice_Amt_Including_Tax", "text",selectedBooking.Final_Invoice_Amt_Including_Tax, "Final_Invoice_Amt_Including_Tax")}
                  {renderEditableField("Final Invoice Amt (Excluding Tax)", "Final_Invoice_Amt_Excluding_Tax", "text",selectedBooking.Final_Invoice_Amt_Excluding_Tax, "Final_Invoice_Amt_Excluding_Tax")}
                  {renderEditableField("Truck Cost", "Truck_Cost", "text",selectedBooking.Truck_Cost, "Truck_Cost")}
                  {renderEditableField("Fuel Charges", "Fuel_Charges", "text",selectedBooking.Fuel_Charges, "Fuel_Charges")}
                  {renderEditableField("Food", "Food", "text",selectedBooking.Food, "Food")}
                  {renderEditableField("Scaling Fee", "Scaling_Fee", "text",selectedBooking.Scaling_Fee, "Scaling_Fee")}
                  {renderEditableField("Labour Pay", "Labour_Pay", "text",selectedBooking.Labour_Pay, "Labour_Pay")}
                  {renderEditableField("Supply", "Supply", "text",selectedBooking.Supply, "Supply")}
                  {renderEditableField("Maintenance", "Maintenance", "text",selectedBooking.Maintenance, "Maintenance")}
                  {renderEditableField("Ferry charges", "Ferry_charges", "text",selectedBooking.Ferry_charges, "Ferry_charges")}
                  {renderEditableField("Truck Maintenance", "Truck_Maintenance", "text",selectedBooking.Truck_Maintenance, "Truck_Maintenance")}   
                </div>
            </div>
          </>
        );
      default:
        return null;
    }
  };


  const renderCrewnotesBookingDetails = () => {
    if (!selectedBooking) return null;
    const booking = selectedBooking;
  
    const originCoordinates = booking.Coordinates_Origin;
    const destinationCoordinates = booking.Coordinates_Destn;
    const googleMapsLink = `https://www.google.com/maps/dir/?api=1&origin=${originCoordinates}&destination=${destinationCoordinates}&travelmode=driving`;
  
    console.log('Selected Booking:', booking);
    return (
      <div className='total'>
        <div className="card" id="Crew-Notes">
          <div className="header1">
            <img src="https://cdn.vectorstock.com/i/750p/20/76/man-avatar-profile-vector-21372076.avif" alt="Crew Leader" />
            <h1>Crew Leader:{booking.CrewAssigned}</h1>
          </div>
  
          <div className="details1">
            <h2>Move Details</h2>
            <p><span>Invoice no:</span> {booking.INVOICE}</p>
            <p><span>Banner:</span> {booking.Banner}</p>
            <p><span>Move date:</span> {booking.MoveDate}</p>
            <p><span>Agreed Pick up time:</span> {booking.PickUpTime}</p>
            <p><span>Origin Address:</span> {booking.FromAddress}</p>
            <p><span>Destination Address:</span> {booking.ToAddress}</p>
            <p><span>Move size:</span> {booking.MoveSize}</p>
            <p><span>Inventory items customer provided:</span> Couch, Bed, Dining Table, Chairs, TV</p>
            <p><span>Long walk:</span>{booking.LongWalk}</p>
            <p><span>Parking:</span>Available</p>
            <p><span>Distance between parking space and house:</span> 50 meters</p>
            <p><span>Stair case:</span>{booking.CountofStairs}</p>
            <p><span>Elevator booked time at origin:</span> 8:00 AM - 9:00 AM</p>
            <p><span>Elevator booked time at destination:</span> 10:00 AM - 11:00 AM</p>
            <p><span>Customer preferred payment method:</span>{booking.PaidBy}</p>
          </div>
  
          <div className="details1">
            <h2>Packing and Tools</h2>
            <p><span>Packing supplies required:</span>{booking.PackingSupplies}</p>
            <p><span>Packing service customer requested:</span> Full Packing</p>
            <p><span>Tools required:</span> Screwdrivers, Wrenches</p>
          </div>
  
          <div className="details1">
            <h2>Customer Details</h2>
            <p><span>Customer name:</span>{booking.Customer_name}</p>
            <p><span>Phone number:</span> {booking.PhoneNumber}</p>
            <p><span>Alternate phone number:</span> {booking.AlternatePhoneNumber}</p>
          </div>
  
          <div className="footer1">
            <h3>Thank you for choosing our moving service!</h3>
          </div>
        </div>
        <div className="Links">
          <p>
            <span className="titlelink">Google route link:</span>
            {googleMapsLink ? (
              <a
                href={googleMapsLink}
                className="link1"
                target="_blank"
                rel="noopener noreferrer"
              >
                Get Route
              </a>
            ) : (
              <span>No Routes Found</span>
            )}
          </p>
          <p>
            <span className="titlelink">Invoice link:</span>
            <a
              href={`https://web.2go.com/invoices/${booking.Invoicelink}`}
              className="link1"
              target="_blank"
              rel="noopener noreferrer"
            >
              Click Here
            </a>
          </p>
        </div>
        <div className="download">
          <button onClick={downloadPDF1}>Download as PDF</button>
        </div>
      </div>
    );
  };
  const downloadPDF1 = () => {
    const input = document.getElementById('Crew-Notes');
    
    html2canvas(input, { scale: 2 }).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      
      const pdf = new jsPDF({
        orientation: imgHeight > imgWidth ? 'portrait' : 'landscape',
        unit: 'px',
        format: [imgWidth, imgHeight],
      });
  
      pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
      pdf.save('Crew-Notes.pdf');
    });
  };

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
  
    switch (activeTab1) {
        case "Customer Details":
          return (
            <>
            <div  className='details-header'>
             <h1>Customer Details</h1>
            <div className="customer-details-my details-content-my">
                  {renderEditableField("Customer Name", "Customer_Name", "text",selectedBooking.Customer_Name, "Customer_Name" )}
                  {renderEditableField("Email Address", "Email_Address", "text",selectedBooking.Email_Address, "Email_Address")}
                  {renderEditableField("Phone Number", "Phone_Number", "text",selectedBooking.Phone_Number, "Phone_Number")}
                  {renderEditableField("Alt Phone Number", "Alt_Phone_Number", "text",selectedBooking.Alt_Phone_Number, "Alt_Phone_Number")}
            </div>
            </div>
            </>
          );
        case "Move Details":
          return (
            <>
            <div  className='details-header'>
             <h1>Move Details</h1>
            <div className="move-details-my details-content-my">
              {renderEditableField("Move Date", "MoveDate", "date",selectedBooking.MoveDate, "MoveDate")}
              {renderEditableField("Move Size", "Move_Size", "text",selectedBooking.Move_Size, "Move_Size")}
              {renderEditableField("From Address", "From_Address", "text",selectedBooking.From_Address, "From_Address")}
              {renderEditableField("To Address", "To_Address", "text",selectedBooking.To_Address, "To_Address")}
              {renderEditableField("Pick up Time", "Pick_up_Time", "text",selectedBooking.Pick_up_Time, "Pick_up_Time")}
              {renderEditableField("Google Route Link", "Google_Route_Link", "text",selectedBooking.Google_Route_Link, "Google_Route_Link")}    
              {renderEditableField("Storage", "Storage", "text",selectedBooking.Storage, "Storage")}
              {renderEditableField("Storage Location", "Storage_Location", "text",selectedBooking.Storage_Location, "Storage_Location")}
              {renderEditableField("Storage Duration", "Storage_Duration", "text",selectedBooking.Storage_Duration, "Storage_Duration")}
              {renderEditableField("Packing", "Packing", "text",selectedBooking.Packing, "Packing")}
              {renderEditableField("Packing Material", "Packing_Material", "text",selectedBooking.Packing_Material, "Packing_Material")}
            </div>
            </div>
            </>
          );
        case "Supplies & Instruction":
          return (
            <>
            <div  className='details-header'>
             <h1>Supplies & Instruction</h1>
            <div className="supplies-instruction-my details-content-my">
              {renderEditableField("Staircase", "Count_of_Stairs", "text",selectedBooking.Count_of_Stairs, "Count_of_Stairs")}
              {renderEditableField("Which Floor", "which_floor", "text",selectedBooking.which_floor, "which_floor")}
              {renderEditableField("Long Walk", "Long_Walk", "text",selectedBooking.Long_Walk, "Long_Walk")}
              {renderEditableField("Elevator", "Elevator", "text",selectedBooking.Elevator, "Elevator")}
              {renderEditableField("Special Instruction", "Special_Instruction", "textarea",selectedBooking.Special_Instruction, "Special_Instruction")}
            </div>
            </div>
            </>
          );
        case "Payment Details":
          return (
            <>
            <div  className='details-header'>
             <h1>Payment Details</h1>
            <div className="payment-details-my details-content-my">
              {renderEditableField("Invoice No", "INVOICE", "text",selectedBooking.INVOICE, "INVOICE")}
              {renderEditableField("Estimate No", "Estimate_No", "text",selectedBooking.Estimate_No, "Estimate_No")}
              {renderEditableField("Invoice Link", "Invoicelink1", "text",selectedBooking.Invoicelink1, "Invoicelink1")}
            </div>
            </div>
            </>
          );
        case "Team":
          return (            <>
            <div  className='details-header'>
             <h1>Team</h1>
              <div className="details-content-inventory">
              {<div className='hello'><a href="#" className="addbutton" onClick={() => handlePopupOpen("Work Order")}>Crew Notes</a></div>}
              <div className="team-details-my details-content-my">
                {renderEditableField("Status", "Status", "text",selectedBooking.Status, "Status")} 
                {renderEditableField("Assigned To", "Assigned_To", "text",selectedBooking.Assigned_To, "Assigned_To")}
                {renderEditableField("Sales Agent", "Sales_Agent", "text",selectedBooking.Sales_Agent, "Sales_Agent")}
                {renderEditableField("Move Coordinators", "Move_Co_Ordinators", "text",selectedBooking.Move_Co_Ordinators, "Move_Co_Ordinators")}
                {renderEditableField("Dispatch Agent", "Dispatch_Agent", "text",selectedBooking.Dispatch_Agent, "Dispatch_Agent")}
                {renderEditableField("Crew Leader Assigned", "Crew_Leader_Assigned", "text",selectedBooking.Crew_Leader_Assigned, "Crew_Leader_Assigned")}
                {renderEditableField("Crew Leader Contact Info", "Crew_Leader_Contact_Info", "text",selectedBooking.Crew_Leader_Contact_Info, "Crew_Leader_Contact_Info")}            
              </div>
            </div>
            </div>
            </>
          );
          case "Inventory":
            return (
              <>
              <div  className='details-header'>
               <h1>Inventory</h1>
              <div className="details-content-inventory">
                {<div className='hello'> <a href="#" className="addbutton" onClick={() => handlePopupOpen("Inventory")}>+ Add Inventory Details</a></div>}
                  <div className="Inventory-details-my details-content-my">
                    {renderEditableField("Gym Equipment", "Gym_equipment", "text",selectedBooking.Gym_equipment, "Gym_equipment")}
                    {renderEditableField("Appliance", "Appliances", "text",selectedBooking.Appliances, "Appliances")}
                    {renderEditableField("Fragile", "Fragile", "text",selectedBooking.Fragile, "Fragile")}
                    {renderEditableField("Flammable", "Flammable_items", "text",selectedBooking.Flammable_items, "Flammable_items")}
                  </div>
              </div>
              </div>
              </>
            );
            case "Notes & Updates":
              return (
                <div>  
                  <div className='abcdef'>  
                      <div className="team-details-my details-content">
                      {renderEditableField("Assigned To", "Assigned_To", "text",selectedBooking.Assigned_To, "Assigned_To")}   
                      {renderEditableField("Status", "Status", "text",selectedBooking.Status, "Status")}   
                    </div>         
                    </div> 
                  <div className="booking-details"> 
                    <div className="details-tabs">
                      {["Job Details", "Quality Check", "Move coordination", "Move Reviews", "Expense"].map((tab) => (
                        <button
                          key={tab}
                          className={`tab-button ${activeTab2 === tab ? "active" : ""}`}
                          onClick={() => handleTabClick(tab)}
                        >
                          {tab}
                        </button>
                      ))}
                    </div>
                    <div className="details-content-container-my">{renderTabContentforUpdate()}</div>
                  </div>     
                </div>   
              );
          default:
            return null;
        }
      };
      const renderField = (label, value) => (
        <div className="field-container">
          <label>{label}:  </label><span>{value || "N/A"}</span> 
        </div>
      );
      
      const renderTabContentforUpdate = () => {
        switch (activeTab2) {
          case "Job Details":
            return (
              <>
              <div  className='details-header'>
              <h1>Job Details</h1>
              <div className="team-details-my details-content-my">
                  {renderEditableField("Sales Agent", "Sales_Agent", "text",selectedBooking.Sales_Agent, "Sales_Agent")}
                  {renderEditableField("Dispatch Agent", "Dispatch_Agent", "text",selectedBooking.Dispatch_Agent, "Dispatch_Agent")}
                  {renderEditableField("Move Size", "Move_Size", "text",selectedBooking.Move_Size, "Move_Size")}
                  {renderEditableField("Move Date", "MoveDate", "date",selectedBooking.MoveDate, "MoveDate")}
                  {renderEditableField("Banner", "Banner", "text",selectedBooking.Banner, "Banner")}
                  {renderEditableField("Invoice No", "INVOICE", "text",selectedBooking.INVOICE, "INVOICE")}
                  {renderEditableField("Invoice Link", "Invoicelink1", "text",selectedBooking.Invoicelink1, "Invoicelink1")}
                  {renderEditableField("severity", "severity", "text",selectedBooking.severity, "severity")}
                  {renderEditableField("Connection Type", "Connection_Type", "text",selectedBooking.Connection_Type, "Connection_Type")}
                  {renderEditableField("Estimate No", "Estimate_No", "text",selectedBooking.Estimate_No, "Estimate_No")}
                  {renderEditableField("Move From", "Move_From", "text",selectedBooking.Move_From, "Move_From")}
                  {renderEditableField("Move To", "Move_To", "text",selectedBooking.Move_To, "Move_To")}
                  {renderEditableField("From Address", "From_Address", "text",selectedBooking.From_Address, "From_Address")}
                  {renderEditableField("To Address", "To_Address", "text",selectedBooking.To_Address, "To_Address")}
                  {renderEditableField("Booked Date", "Booked_Date", "text",selectedBooking.Booked_Date, "Booked_Date")}
                  {renderEditableField("Assigned To", "Assigned_To", "text",selectedBooking.Assigned_To, "Assigned_To")}
              </div>
              </div>
              </>
            );
          case "Quality Check":
            return (
              <>
             <div  className='details-header'>
              <h1>Quality Check</h1>
              <div className="team-details-my details-content-my">
                  {renderEditableField("Dispatch Date", "Dispatch_Date", "text",selectedBooking.Dispatch_Date, "Dispatch_Date")}
                  {renderEditableField("Dispatch Comments", "Dispatch_Comments", "text",selectedBooking.Dispatch_Comments, "Dispatch_Comments")}
                  {renderEditableField("Special Instruction", "Special_Instruction", "text",selectedBooking.Special_Instruction, "Special_Instruction")}
                  {renderEditableField("Customer Name", "Customer_Name", "text",selectedBooking.Customer_Name, "Customer_Name")}
                  {renderEditableField("Phone Number", "Phone_Number", "text",selectedBooking.Phone_Number, "Phone_Number")}
                  {renderEditableField("Alt Phone Number", "Alt_Phone_Number", "text",selectedBooking.Alt_Phone_Number, "Alt_Phone_Number")}
                  {renderEditableField("Email Address", "Email_Address", "text",selectedBooking.Email_Address, "Email_Address")}
                  {renderEditableField("Pick up Time", "Pick_up_Time", "text",selectedBooking.Pick_up_Time, "Pick_up_Time")}
                  {renderEditableField("From Address", "From_Address", "text",selectedBooking.From_Address, "From_Address")}
                  {renderEditableField("To Address", "To_Address", "text",selectedBooking.To_Address, "To_Address")}
                  {renderEditableField("Gym equipment", "Gym_equipment", "text",selectedBooking.Gym_equipment, "Gym_equipment")}
                  {renderEditableField("Appliances", "Appliances", "text",selectedBooking.Appliances, "Appliances")}
                  {renderEditableField("Fragile", "Fragile", "text",selectedBooking.Fragile, "Fragile")}
                  {renderEditableField("Flammable items", "Flammable_items", "text",selectedBooking.Flammable_items, "Flammable_items")}
                  {renderEditableField("Move Size", "Move_size_dispact_Agent", "text",selectedBooking.Move_size_dispact_Agent, "Move_size_dispact_Agent")}
                  {renderEditableField("Staircase", "Count_of_Stairs", "text",selectedBooking.Count_of_Stairs, "Count_of_Stairs")}
                  {renderEditableField("Which Floor", "which_floor", "text",selectedBooking.which_floor, "which_floor")}
                  {renderEditableField("Long Walk", "Long_Walk", "text",selectedBooking.Long_Walk, "Long_Walk")}
                  {renderEditableField("Elevator", "Elevator", "text",selectedBooking.Elevator, "Elevator")}
                  {renderEditableField("Packing", "Packing", "text",selectedBooking.Packing, "Packing")}
                  {renderEditableField("Packing Material", "Packing_Material", "text",selectedBooking.Packing_Material, "Packing_Material")}
                  {renderEditableField("Complex Assembly or Disassembly", "Complex_Assembly_or_Disassembly", "text",selectedBooking.Complex_Assembly_or_Disassembly, "Complex_Assembly_or_Disassembly")}
                  {renderEditableField("Special Requirement", "Special_Requirement", "text",selectedBooking.Special_Requirement, "Special_Requirement")}
                  {renderEditableField("Customer OK with the Pricing", "Customer_OK_with_the_Pricing", "text",selectedBooking.Customer_OK_with_the_Pricing, "Customer_OK_with_the_Pricing")}
                  {renderEditableField("Storage", "Storage", "text",selectedBooking.Storage, "Storage")}
                  {renderEditableField("Storage Duration", "Storage_Duration", "text",selectedBooking.Storage_Duration, "Storage_Duration")}
                  {renderEditableField("Storage Location", "Storage_Location", "text",selectedBooking.Storage_Location, "Storage_Location")}
                  {renderEditableField("Valuable Items and Docs", "Valuable_Items_and_Docs", "text",selectedBooking.Valuable_Items_and_Docs, "Valuable_Items_and_Docs")}
                  {renderEditableField("Docu Sign Status", "Docu_Sign_Status", "text",selectedBooking.Docu_Sign_Status, "Docu_Sign_Status")}
                  {renderEditableField("Dispatch Email Sent", "Dispatch_Email_Sent", "text",selectedBooking.Dispatch_Email_Sent, "Dispatch_Email_Sent")}
                  </div>
                  </div>
                  <div  className='details-header'>
                <h1>Storage</h1>
                <div className="team-details-my details-content-my">
                  {renderEditableField("Storage Holder Name", "Storage_Holder_Name", "text",selectedBooking.Storage_Holder_Name, "Storage_Holder_Name")}
                  {renderEditableField("Storage Address", "Storage_Address", "text",selectedBooking.Storage_Address, "Storage_Address")}
                  {renderEditableField("Storage Start Date", "Storage_Start_date", "text",selectedBooking.Storage_Start_date, "Storage_Start_date")}
                  {renderEditableField("Storage End Date", "Storage_End_date", "text",selectedBooking.Storage_End_date, "Storage_End_date")}
                  {renderEditableField("Storage Invoice", "Storage_Invoice", "text",selectedBooking.Storage_Invoice, "Storage_Invoice")}
                  {renderEditableField("Storage Unit", "Storage_Unit", "text",selectedBooking.Storage_Unit, "Storage_Unit")}
                  {renderEditableField("Storage Acess", "Storage_Acess", "text",selectedBooking.Storage_Acess, "Storage_Acess")}
                </div>
              </div>
            </>
            );
          case "Move coordination":
            return (
              <>
                <div  className='details-header'>
                  <h1>Customer Requirement          <span
              className="toggle-icon"
              onClick={toggleCustomerRequirement}
              style={{ cursor: 'pointer', marginLeft: '10px' }}
            >
              {isCustomerRequirementExpanded ? '-' : '+'}
            </span>
          </h1>
          {isCustomerRequirementExpanded && (
                  <div className="team-details-my details-content-my">
                    {renderField("Dispatch Date",selectedBooking.Dispatch_Date)}
                    {renderField("Dispatch Comments",selectedBooking.Dispatch_Comments)}
                    {renderField("Special Instruction",selectedBooking.Special_Instruction)}
                    {renderField("Customer Name",selectedBooking.Customer_Name)}
                    {renderField("Phone Number",selectedBooking.Phone_Number)}
                    {renderField("Alt Phone Number",selectedBooking.Alt_Phone_Number)}
                    {renderField("Email Address",selectedBooking.Email_Address)}
                    {renderField("Pick up Time",selectedBooking.Pick_up_Time)}
                    {renderField("From Address",selectedBooking.From_Address)}
                    {renderField("To Address",selectedBooking.To_Address)}
                    {renderField("Gym equipment",selectedBooking.Gym_equipment)}
                    {renderField("Appliances",selectedBooking.Appliances)}
                    {renderField("Fragile",selectedBooking.Fragile)}
                    {renderField("Flammable items",selectedBooking.Flammable_items)}
                    {renderField("Move Size",selectedBooking.Move_size_dispact_Agent)}
                    {renderField("Staircase",selectedBooking.Count_of_Stairs)}
                    {renderField("Which Floor",selectedBooking.which_floor)}
                    {renderField("Long Walk",selectedBooking.Long_Walk)}
                    {renderField("Elevator",selectedBooking.Elevator)}
                    {renderField("Packing",selectedBooking.Packing)}
                    {renderField("Packing Material",selectedBooking.Packing_Material)}
                    {renderField("Complex Assembly or Disassembly",selectedBooking.Complex_Assembly_or_Disassembly)}
                    {renderField("Special Requirement",selectedBooking.Special_Requirement)}
                    {renderField("Customer OK with the Pricing",selectedBooking.Customer_OK_with_the_Pricing)}
                    {renderField("Storage",selectedBooking.Storage)}
                    {renderField("Storage Duration",selectedBooking.Storage_Duration)}
                    {renderField("Storage Location",selectedBooking.Storage_Location)}
                    {renderField("Valuable Items and Docs",selectedBooking.Valuable_Items_and_Docs)}
                    {renderField("Docu Sign Status",selectedBooking.Docu_Sign_Status)}
                    {renderField("Dispatch Email Sent",selectedBooking.Dispatch_Email_Sent)}
                  </div>
          )}
                </div>
                <div  className='details-header'>
              <h1>Move Requirement</h1>
              <div className="team-details-my details-content-my">
                  {renderEditableField("Move Coordinators", "Move_Co_Ordinators", "text",selectedBooking.Move_Co_Ordinators, "Move_Co_Ordinators")}
                  {renderEditableField("Move Type", "Move_Type", "text",selectedBooking.Move_Type, "Move_Type")}
                  {renderEditableField("Contract Reviewed", "Contract_Reviewed", "text",selectedBooking.Contract_Reviewed, "Contract_Reviewed")}
                  {renderEditableField("Clubbed Move", "Clubbed_Move", "text",selectedBooking.Clubbed_Move, "Clubbed_Move")}
                  {renderEditableField("Crew Leader Assigned", "Crew_Leader_Assigned", "text",selectedBooking.Crew_Leader_Assigned, "Crew_Leader_Assigned")}
                  {renderEditableField("Crew Leader Contact Info", "Crew_Leader_Contact_Info", "text",selectedBooking.Crew_Leader_Contact_Info, "Crew_Leader_Contact_Info")}
                  {renderEditableField("Customer Instruction Given", "Customer_Instruction_Given", "text",selectedBooking.Customer_Instruction_Given, "Customer_Instruction_Given")}
                  {renderEditableField("Crew Contacts", "Crew_Contacts", "text",selectedBooking.Crew_Contacts, "Crew_Contacts")}
                  </div>
                  </div>
                  <div  className='details-header'>
                      <h1>Truck Details</h1>
                      <div className="team-details-my details-content-my">
                        {renderEditableField("Truck Details", "Truck_Details", "text",selectedBooking.Truck_Details, "Truck_Details")}
                        {renderEditableField("Truck Owner", "Truck_Owner", "text",selectedBooking.Truck_Owner, "Truck_Owner")}
                        {renderEditableField("Truck Size", "Truck_Types", "text",selectedBooking.Truck_Types, "Truck_Types")}
                        {renderEditableField("Hub", "Hub", "text",selectedBooking.Hub, "Hub")}
                        {renderEditableField("Truck Capacity", "Truck_Capacity", "text",selectedBooking.Truck_Capacity, "Truck_Capacity")}
                      </div>
                </div>
                <div  className='details-header'>
                <h1>Storage</h1>
                <div className="team-details-my details-content-my">
                  {renderEditableField("Storage", "Storage", "text",selectedBooking.Storage, "Storage")}
                  {renderEditableField("Storage Duration", "Storage_Duration", "text",selectedBooking.Storage_Duration, "Storage_Duration")}
                  {renderEditableField("Storage Location", "Storage_Location", "text",selectedBooking.Storage_Location, "Storage_Location")}
                  {renderEditableField("Storage Holder Name", "Storage_Holder_Name", "text",selectedBooking.Storage_Holder_Name, "Storage_Holder_Name")}
                  {renderEditableField("Storage Address", "Storage_Address", "text",selectedBooking.Storage_Address, "Storage_Address")}
                  {renderEditableField("Storage Start Date", "Storage_Start_date", "text",selectedBooking.Storage_Start_date, "Storage_Start_date")}
                  {renderEditableField("Storage End Date", "Storage_End_date", "text",selectedBooking.Storage_End_date, "Storage_End_date")}
                  {renderEditableField("Storage Invoice", "Storage_Invoice", "text",selectedBooking.Storage_Invoice, "Storage_Invoice")}
                  {renderEditableField("Storage Unit", "Storage_Unit", "text",selectedBooking.Storage_Unit, "Storage_Unit")}
                  {renderEditableField("Storage Acess", "Storage_Acess", "text",selectedBooking.Storage_Acess, "Storage_Acess")}
                </div>
              </div>
              </>
            );
          case "Move Reviews":
            return (
              <>
                <div  className='details-header'>
                  <h1>Move Reviews</h1>
                  <div className="team-details-my details-content-my">
                    {renderEditableField("Crew Comments", "Crew_Comments", "textarea",selectedBooking.Crew_Comments, "Crew_Comments")}
                    {renderEditableField("Customer Review", "CUSTOMER_REVIEW", "text",selectedBooking.CUSTOMER_REVIEW, "CUSTOMER_REVIEW")}
                    {renderEditableField("Google Reviews", "Google_Reviews", "text",selectedBooking.Google_Reviews, "Google_Reviews")}
                  </div>
                </div>
              </>
            );
          case "Expense":
            return (
              <>
                <div  className='details-header'>
                  <h1>Time</h1>
                    <div className="team-details-my details-content-my">
                      {renderEditableField("Start Time from Hub", "Start_Time_from_Hub", "text",selectedBooking.Start_Time_from_Hub, "Start_Time_from_Hub")}
                      {renderEditableField("Time reached Pick location", "Time_reached_Pick_location", "text",selectedBooking.Time_reached_Pick_location, "Time_reached_Pick_location")}
                      {renderEditableField("Loading Start Time", "Loading_Start_Time", "text",selectedBooking.Loading_Start_Time, "Loading_Start_Time")}
                      {renderEditableField("Loading End time", "Loading_End_time", "text",selectedBooking.Loading_End_time, "Loading_End_time")}
                      {renderEditableField("Travel Start from Pick up Location", "Travel_Start_from_Pick_up_Location", "text",selectedBooking.Travel_Start_from_Pick_up_Location, "Travel_Start_from_Pick_up_Location")}
                      {renderEditableField("Travel End at destination (Storage/Hub/Customer's Destination)", "Travel_End_at_destination", "text",selectedBooking.Travel_End_at_destination, "Travel_End_at_destination")}
                      {renderEditableField("Unloading Start Time", "Unloading_Start_Time", "text",selectedBooking.Unloading_Start_Time, "Unloading_Start_Time")}
                      {renderEditableField("Unloading End Time", "Unloading_End_Time", "text",selectedBooking.Unloading_End_Time, "Unloading_End_Time")}
                      {renderEditableField("Return start Time", "Return_start_Time", "text",selectedBooking.Return_start_Time, "Return_start_Time")}
                      {renderEditableField("Arrival Time (Hub/Next Job)", "Arrival_Time_Hub_Next_Job", "text",selectedBooking.Arrival_Time_Hub_Next_Job, "Arrival_Time_Hub_Next_Job")}
                      {renderEditableField("Hours Estimated", "Hours_Estimated", "text",selectedBooking.Hours_Estimated, "Hours_Estimated")}
                      {renderEditableField("Move Distance (Kms)", "Move_Distance_Kms", "text",selectedBooking.Move_Distance_Kms, "Move_Distance_Kms")}
                      {renderEditableField("Total Weight (lbs)", "Total_Weight_lbs", "text",selectedBooking.Total_Weight_lbs, "Total_Weight_lbs")}
                    </div>
                </div>
                <div  className='details-header'>
                    <h1>Expense</h1>
                      <div className="team-details-my details-content-my">
                      {renderEditableField("Estimate Amount ($)", "Estimate_Amount_$", "text",selectedBooking.Estimate_Amount_$, "Estimate_Amount_$")}
                      {renderEditableField("Final Invoice Amt (Including Tax)", "Final_Invoice_Amt_Including_Tax", "text",selectedBooking.Final_Invoice_Amt_Including_Tax, "Final_Invoice_Amt_Including_Tax")}
                      {renderEditableField("Final Invoice Amt (Excluding Tax)", "Final_Invoice_Amt_Excluding_Tax", "text",selectedBooking.Final_Invoice_Amt_Excluding_Tax, "Final_Invoice_Amt_Excluding_Tax")}
                      {renderEditableField("Truck Cost", "Truck_Cost", "text",selectedBooking.Truck_Cost, "Truck_Cost")}
                      {renderEditableField("Fuel Charges", "Fuel_Charges", "text",selectedBooking.Fuel_Charges, "Fuel_Charges")}
                      {renderEditableField("Food", "Food", "text",selectedBooking.Food, "Food")}
                      {renderEditableField("Scaling Fee", "Scaling_Fee", "text",selectedBooking.Scaling_Fee, "Scaling_Fee")}
                      {renderEditableField("Labour Pay", "Labour_Pay", "text",selectedBooking.Labour_Pay, "Labour_Pay")}
                      {renderEditableField("Supply", "Supply", "text",selectedBooking.Supply, "Supply")}
                      {renderEditableField("Maintenance", "Maintenance", "text",selectedBooking.Maintenance, "Maintenance")}
                      {renderEditableField("Ferry charges", "Ferry_charges", "text",selectedBooking.Ferry_charges, "Ferry_charges")}
                      {renderEditableField("Truck Maintenance", "Truck_Maintenance", "text",selectedBooking.Truck_Maintenance, "Truck_Maintenance")}   
                    </div>
                </div>
              </>
            );
          default:
            return null;
        }
      };
   
  return (
    <div className="booking-details-container">  
      <MobileApp12 userDetails={userDetails} />
      <div className="mobile-details-container">
        <div>
            <div className="hover-css-block">
              <div className="bookings-header-my">
                <span>Banner</span>
                <span1>Customer Name</span1>
                <span>Invoice No</span>
                <span>Move Date</span>
                <span1>Move From</span1>
                <span1>Move To</span1>
                <span>Move Size</span>
                <span>Assigned To</span>
                <span>Status</span>
              </div>
              <div className="booking-item-my1">
                    <span>
                    {selectedBooking ? selectedBooking.Banner : "Booking Details"}
                      </span>
                    <span>{selectedBooking ? selectedBooking["Customer_Name"] : "Booking Details"}</span>
                    <span>{selectedBooking ? selectedBooking["INVOICE"] : "Booking Details"}</span>
                    <span>{formatDate(selectedBooking ? selectedBooking.MoveDate : "Booking Details")}</span>
                    <span>{selectedBooking ? selectedBooking["Move_From"] : "Booking Details"}</span>
                    <span>{selectedBooking ? selectedBooking.Move_To : "Booking Details"}</span>
                    <span>{selectedBooking ? selectedBooking["Move_Size"] || "N/A" : "Booking Details"}</span>
                    <span>{selectedBooking ? selectedBooking["Assigned_To"] || "N/A" : "Booking Details"}</span>
                    <span>{selectedBooking ? selectedBooking.Status : "Booking Details"}</span>  
              </div>
              <div className="booking-details-my">
                <div className="details-tabs-my">
                  {["Customer Details", "Move Details","Inventory", "Supplies & Instruction", "Payment Details", "Team", "Notes & Updates"].map((tab) => (
                    <button
                      key={tab}
                      className={`tab-button-my ${activeTab1 === tab ? "active" : ""}`}
                      onClick={() => setActiveTab1(tab)}
                    >
                      {tab}
                    </button>
                  ))}
                </div>
                <div className="details-content-container-my">
                  {renderTabContent()}
                </div>
              </div>
            </div>
            
          </div>
        <div>
          <div className="booking-details-header">
            <div className="grid-header1">
              {selectedBooking ? selectedBooking.Banner : "Booking Details"}
            </div>
            <div className="grid-header1">
              {selectedBooking ? selectedBooking["Customer_Name"] : "Booking Details"}
            </div>
            <div className="grid-header1">
              {selectedBooking ? selectedBooking["INVOICE"] : "Booking Details"}
            </div>
            <div className="grid-header1">
            {formatDate(selectedBooking ? selectedBooking.MoveDate : "Booking Details")}
            </div>
            <div className="grid-header1">
              {selectedBooking ? selectedBooking["Move_From"] : "Booking Details"}
            </div>
            <div className="grid-header1">
              {selectedBooking ? selectedBooking.Move_To : "Booking Details"}
            </div>
            <div className="grid-header1">
              {selectedBooking ? selectedBooking["Move_Size"] || "N/A" : "Booking Details"}
            </div>
            <div className="grid-header1">
              {selectedBooking ? selectedBooking["Assigned_To"] || "N/A" : "Booking Details"}
            </div>
            <div className="grid-header1">
              {selectedBooking ? selectedBooking.Status : "Booking Details"}
            </div>
          </div>
        <div className="details-container">
          {["Customer Details", "Move Details", "Inventory", "Supplies & Instruction", "Payment Details", "Team", "Notes & Updates"].map((tab) => (
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
                  {renderTabContent1(tab)}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
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
export default BookingDetails;

