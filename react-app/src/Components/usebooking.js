import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaPen, FaSave } from "react-icons/fa";
import "./usebooking.css";
import html2canvas from 'html2canvas';
import Select from 'react-select';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import jsPDF from 'jspdf';
import { useUserContext } from './UserContext';
import CreatableSelect from 'react-select/creatable';
import Ptd from './dashboard/Taskjobs/Pickuptask';
import TaskManager from './dashboard/Taskjobs/TaskManager';
import Transit from './dashboard/Taskjobs/Transit';
import Drop from './dashboard/Taskjobs/Droptask';

const useBookings = () => {
  const tabRef = useRef(null);
  const [columnMapping, setColumnMapping] = useState({});
  const [previousValue, setPreviousValue] = useState(null);
  const [activeField, setActiveField] = useState(null); 
  const [coordinates, setCoordinates] = useState({ origin: null, destination: null });
  const [bookingsData, setBookingsData] = useState([]);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [editableBooking, setEditableBooking] = useState(null);
  const [activeTab, setActiveTab] = useState("Customer Details");
  const [activeInventoryTab, setActiveInventoryTab] = useState("Updates");
  const [loading, setLoading] = useState(true);
  const [originalBooking, setOriginalBooking] = useState(null);
  const [error, setError] = useState(null);
  const [query, setQuery] = useState("");
  const [viewMode, setViewMode] = useState("list");
  const [editStates, setEditStates] = useState({});
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [popupContent, setPopupContent] = useState("");
  const navigate = useNavigate();
  const [movecoordinates, setmovecoordinates] = useState([]);
  const [Status_Assigned, setStatus_Assigned] = useState([]);
  const [MoveOptions, setMoveOptions] = useState([]);
  const [dispatchagent, setdispatchagent] = useState([]);
  const [TruckDetailsOptions, setTruckDetailsOptions] = useState([]);
  const [OwnerOptions, setOwnerOptions] = useState([]);
  const [HubOptions, setHubOptions] = useState([]);
  const [CapacityOptions, setCapacityOptions] = useState([]);
  const [TruckTypeOptions, setTruckTypeOptions] = useState([]);
  const [MoveSizeOption, setMoveSizeOption] = useState([]);
  const [assignedToOptions, setAssignedToOptions] = useState([]);
  const [activeTab1, setActiveTab1] = useState("Job Details");
  const [activeTab2, setActiveTab2] = useState();
  const { userDetails, isUserAuthenticated } = useUserContext();
  const rolename = userDetails.roledetails.rolename.toLowerCase(); 
  const userFirstName  = userDetails.mailid.toLowerCase(); 
  const [inputValue, setInputValue] = useState(''); 
  const [inputValue1, setInputValue1] = useState(''); 
  const [customMoveSize, setCustomMoveSize] = useState('');
  const [isOtherSelected, setIsOtherSelected] = useState(false); 
  const [isCustomerRequirementExpanded, setIsCustomerRequirementExpanded] = useState(true);

  const toggleCustomerRequirement = () => {
    setIsCustomerRequirementExpanded(!isCustomerRequirementExpanded);
  };
  const [isCustomerRequirementExpanded1, setIsCustomerRequirementExpanded1] = useState(true);

  const toggleCustomerRequirement1 = () => {
    setIsCustomerRequirementExpanded1(!isCustomerRequirementExpanded1);
  };

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

  // useEffect(() => {
  //   const handleClickOutside = (event) => {
  //     if (activeField && tabRef.current && !tabRef.current.contains(event.target)) {
  //       // Save the active field value when clicked outside
  //       handleSave(activeField, editableBooking[activeField]);
  //       setActiveField(null); // Reset the active field
  //     }
  //   };

  //   document.addEventListener("mousedown", handleClickOutside);

  //   return () => {
  //     document.removeEventListener("mousedown", handleClickOutside);
  //   };
  // }, [activeField, editableBooking]);

  // const [activeSection, setActiveSection] = useState("Details"); 

  // const toggleEditState = (field, isEditing = false) => {
  //   setEditStates((prevStates) => ({
  //     ...prevStates,
  //     [field]: isEditing,
  //   }));
  // };

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
  
  const detailsTabs = [
    "Customer Details",
    "Move Details",
    "Inventory",
    "Supplies & Instruction",
    "Payment Details",
    "Team",
  ];

  const updateTabs = ["Notes & Updates"];

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
        const Move = response.data.records.map(record => record.Move_FromMove_To);
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
        setMoveOptions(Move);
        setTruckDetailsOptions(TruckDetails);
        setOwnerOptions(Owner);
        setTruckTypeOptions(TruckType);
        setHubOptions(Hub);
        setCapacityOptions(Capacity);
      } else {
        console.log('No records found in response');
        setAssignedToOptions([]);
      }
    } catch (error) {
      console.error('Error fetching assigned to options:', error);
      setAssignedToOptions([]);
    }
  };

  const handleClosePopup = () => {
    setIsPopupVisible(false);
  };

  const handlePopupOpen = (content) => {
    setPopupContent(content);
    setIsPopupVisible(true);
  };


  const getLastTwoLetters = (str) => str.slice(-2);
  // const getLastTwoLetters = (location) => {
  //   if (!location || location.length < 2) {
  //     return "";
  //   }
  //   return location.slice(-2).toUpperCase();
  // };
  

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
 
  const isFutureOrToday = (dateStr) => {
    const parsedDate = parseDate(dateStr);
    if (!parsedDate) {
      return false; 
    }
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return parsedDate >= today;
  };
  
  const handleBookingClick = (booking) => {
    setSelectedBooking(selectedBooking === booking ? null : booking);
    setEditableBooking(selectedBooking === booking ? null : { ...booking });
    setOriginalBooking(selectedBooking === booking ? null : { ...booking });
    setActiveTab("Customer Details");
  };


  const handleSave = () => {
    const dataToSend = {
      rowIndex: editableBooking.row_index,
      updatedFields: {},
      userFirstName: userFirstName 
    };
  
    for (const fieldName in editableBooking) {
      if (columnMapping.hasOwnProperty(fieldName) && editableBooking[fieldName] !== originalBooking[fieldName]) {
        const columnIndex = columnMapping[fieldName];
        dataToSend.updatedFields[columnIndex] = {
          columnName: fieldName,
          value: editableBooking[fieldName]
        };
      }
    }
  
    if (Object.keys(dataToSend.updatedFields).length === 0) {
      console.log("No changes detected.");
      return;
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
 
  const handleBookingClick1 = (row_index) => {
    navigate(`/booking/${row_index}`);
  };



  const handleInputChange = (field, value) => {
    setEditableBooking((prevState) => ({
      ...prevState,
      [field]: value,
    }));
    setManualInputs((prevInputs) => ({
      ...prevInputs,
      [field]: value,
    }));
  };

  useEffect(() => {
    fetchAssignedToOptions();
  }, []);

  const handleTabClick = (tab) => {
    setActiveTab1(tab);
  };

  // const canEditField = (field) => {
  //   if (rolename === 'sales agent-lead') return true;
  //   if (rolename === 'dispatch agent-lead') return true;
  //   if (rolename === 'dispatch agent' && (activeTab1 === 'Quality Check' || activeTab1 === 'Move Coordinator'  || activeTab1 === 'Move Reviews' || field === 'assigned_to')) return true;
  //   return false; 
  // };


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

  const options = MoveOptions
  .filter(option => option && option.trim() !== '')
  .map(option => ({ label: option, value: option }));

const filteredOptions1 = options.filter(option =>
  option.label.toLowerCase().startsWith(inputValue.toLowerCase())
);
  const options1 = MoveOptions
  .filter(option => option && option.trim() !== '')
  .map(option => ({ label: option, value: option }));

const filteredOptions2 = options1.filter(option =>
  option.label.toLowerCase().startsWith(inputValue1.toLowerCase())
);

const options12 = [
  ...MoveSizeOption
    .filter(option => option && option.trim() !== '')
    .map(option => ({ label: option, value: option })),
  { label: 'Other', value: 'Other' }
];

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
const handleTypeOfJobChange = (value) => {
  setEditableBooking((prevBooking) => ({
    ...prevBooking,
    Type_Of_Job: value,
  }));
};
const { origin, destination } = coordinates;
let googleMapsLink = null;
if (origin && destination) {
  googleMapsLink = `https://www.google.com/maps/dir/?api=1&origin=${origin.lat},${origin.lng}&destination=${destination.lat},${destination.lng}`;
}



  const fetchApiKey = async () => {
    try {
      const response = await axios.get('http://localhost:9000/api/get-google-api-key');
      return response.data.apiKey;
    } catch (error) {
      console.error("Failed to fetch API key:", error);
      return null;
    }
  };
  
  const fetchCoordinates = async (address) => {
    const apiKey = await fetchApiKey(); // Fetch API key from backend
    if (!apiKey) {
      console.error("API key is not available.");
      return null;
    }
  
    try {
      const response = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json`, {
        params: {
          address: address,
          key: apiKey
        }
      });
  
      if (response.data.status === "OK") {
        const location = response.data.results[0].geometry.location;
        return { lat: location.lat, lng: location.lng };
      } else {
        console.error("Geocoding API error: ", response.data.status);
        return null;
      }
    } catch (error) {
      console.error("Error fetching coordinates:", error);
      return null;
    }
  };
 
  useEffect(() => {
    const fetchCoordinatesAsync = async () => {
      if (!editableBooking) {
        console.log("editableBooking is null or undefined");
        return;
      }
  
      let origin = null;
      let destination = null;
  
      if (editableBooking.From_Address) {
        origin = await fetchCoordinates(editableBooking.From_Address);
        if (origin) {
          editableBooking.Coordinates_Origin = `${origin.lat},${origin.lng}`;
        }
      }
  
      if (editableBooking.To_Address) {
        destination = await fetchCoordinates(editableBooking.To_Address);
        if (destination) {
          editableBooking.Coordinates_Destn = `${destination.lat},${destination.lng}`;
        }
      }
  
      setCoordinates({ origin, destination });
    };
  
    fetchCoordinatesAsync();
  }, [editableBooking?.From_Address, editableBooking?.To_Address]);
  
  const handleInputChange4 = async (fieldName, value) => {
    setEditableBooking((prevBooking) => ({
      ...prevBooking,
      [fieldName]: value,
    }));
    if (fieldName === "From_Address" || fieldName === "To_Address") {
      const updatedCoordinates = await fetchCoordinates(value);
      if (fieldName === "From_Address") {
        setCoordinates((prevCoordinates) => ({
          ...prevCoordinates,
          origin: updatedCoordinates,
        }));
      } else if (fieldName === "To_Address") {
        setCoordinates((prevCoordinates) => ({
          ...prevCoordinates,
          destination: updatedCoordinates,
        }));
      }
    }
  };

  const renderEditableField = (label, field, type = "text", value, key) => (
    <div key={key} className="editable-field-container">
      <div className='editable-field-container2'>
        <div className="editable-field-container1">
          <label>{label}:</label>
        </div>
      </div>
      <div ref={tabRef} className="input-with-button">
        {editStates[field] && field !== "Invoicelink1" ? (
          field === "Assigned_To" ? (
            <Select
              name="Assigned_To"
              value={options2.find(option => option.value === value)}
              onChange={(selectedOption) => {
                handleInputChange(field, selectedOption?.value);
                setActiveField(field);  
              }}
              options={options2}
              placeholder="Assigned To"
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
            
          ): field === "Move_From" || field === "Move_To" ? (
            <CreatableSelect
              name={field}
              value={options.find(option => option.value === value) || { label: value, value }} // Support custom input
              onChange={(selectedOption) => handleInputChange(field, selectedOption?.value)}
              options={field === "Move_From" ? filteredOptions1 : filteredOptions2}
              inputValue={field === "Move_From" ? inputValue : inputValue1}
              onInputChange={field === "Move_From" ? setInputValue : setInputValue1}
              menuIsOpen={(field === "Move_From" ? inputValue : inputValue1).length > 0}
              placeholder={`Type to search ${field}`}
              isClearable
              createOptionPosition="first" // Allow new option creation at the top
            />
          ) : field === "MoveDate" || field === "Booked_Date" ? (
            <DatePicker
              selected={parseDate(editableBooking[field]) || null}
              onChange={(date) => {
                handleInputChange(field, date ? `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}` : "");
                setActiveField(field);  
              }}
              dateFormat="d MMM, yyyy"
            />
          ) : field === "Dispatch_Date" ? (
            <DatePicker
            selected={
              editableBooking[field] 
                ? new Date(editableBooking[field].split('-').reverse().join('-')) 
                : null
            }
            onChange={(date) =>{
              handleInputChange(
                field,
                date
                  ? `${String(date.getDate()).padStart(2, '0')}-${String(date.getMonth() + 1).padStart(2, '0')}-${date.getFullYear()}`
                  : ""
              )
              setActiveField(field); }
            }
            dateFormat="d MMM, yyyy"
          />
          )
          :field === "Move_Co_Ordinators" ? (
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
        ) : field === "Status" ? (
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
        ):field === "Truck_Details" ? (
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
        ) :  field === "Hub" ? (
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
        ) :field === "Crew_Comments" || field === "Google_Reviews" || field === "CUSTOMER_REVIEW" || field === "To_Address" || field === "From_Address"  ? (
          <textarea
          type={type}
          value={value}
          onChange={(e) => handleInputChange(field, e.target.value)}
          />
        ): (
          <input
          type={type}
          value={value}
          onChange={(e) => handleInputChange(field, e.target.value)}
          onFocus={() => setActiveField(field)} 
          onClick={() => {
            setPreviousValue(value); 
          }}
          autoFocus
        />
          )
        ) :field === "MoveDate" ? (
          <input type="text" value={editableBooking[field] ? editableBooking[field] : "N/A"} onClick={() => {
            toggleEditState(field);
            setActiveField(field); 
            setPreviousValue(value); 
          }} />
        ) : field === "Dispatch_Date" ? (
          <input type="text" value={editableBooking[field] ? editableBooking[field] : "N/A"} onClick={() => {
            toggleEditState(field);
            setActiveField(field); 
            setPreviousValue(value); 
          }} />
        ) : field === "Booked_Date" ? (
          <input type="text" value={editableBooking[field] ? editableBooking[field] : "N/A"} onClick={() => {
            toggleEditState(field);
            setActiveField(field); 
            setPreviousValue(value); 
          }} />
        ) 
        : field === "Crew_Comments" || field === "Google_Reviews" || field === "CUSTOMER_REVIEW" || field === "To_Address" || field === "From_Address" ? (
          <textarea readOnly
          onClick={() => {
            toggleEditState(field);
            setActiveField(field); 
            setPreviousValue(value); 
          }} >{editableBooking[field]}</textarea>
        ) : field === "Email_Address" ? (
          <div className="email-container" style={{ display: 'flex', alignItems: 'center' }}>
            <input 
              type="text" 
              value={editableBooking[field] ? editableBooking[field] : "N/A"} 
              className="email-input" 
              onClick={() => {
                toggleEditState(field);
                setActiveField(field); 
                setPreviousValue(value); 
              }}
              readOnly
            />
            <a href={`mailto:${editableBooking[field]}`} className="email-link" style={{ textDecoration: 'none' }}>
              <i className="fas fa-envelope" style={{ fontSize: '16px', color: 'red',marginLeft:'-40px',marginTop:'5px' }}></i>
            </a>
          </div>
        ) : field === "Phone_Number" || field === "Alt_Phone_Number" ? (
          <div className="phone-container" style={{ display: 'flex', alignItems: 'center' }}>
            <input 
              type="text" 
              onClick={() => toggleEditState(field)} 
              value={editableBooking[field] ? editableBooking[field] : "N/A"} 
              className="phone-input" 
              readOnly 
            />
            <a href={`tel:${editableBooking[field]}`} className="phone-link" style={{ textDecoration: 'none' }}>
              <i className="fas fa-phone" style={{ fontSize: '16px', color: 'red',marginLeft:'-40px' }}></i>
            </a>
          </div>
        ) : field === "Invoicelink1" ? (
          <a
            href={`https://web.2go.com/invoices/${editableBooking.Invoicelink}`}
            target="_blank"
            rel="noopener noreferrer"
            className="google-route-link"
          >
            View Invoice
          </a>
        ) : field === "Google_Route_Link" ? (
            <div>
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
          <input
          type={type}
          value={value}
          readOnly
          onClick={() => {
            toggleEditState(field);
            setActiveField(field); 
            setPreviousValue(value);
          }}
        />
        )}
        {editStates[field] ? (
          <>
            <button1
              className={`edit-button3 ${editStates[field] ? "active" : ""}`}
              onClick={() => {
                handleSave(field, value);
                toggleEditState(field); 
                setActiveField(null); 
              }}
            >
              <i className="fas fa-check"></i>
            </button1>
            <button1
              className={`edit-button2 ${editStates[field] ? "active" : ""}`}
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
              className={`edit-button1 ${editStates[field] ? "active" : ""}`}
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
  
  const renderTabContent = () => {
    if (!editableBooking) return null;
      switch (activeTab) {
      case "Customer Details":
        return (
          <>
          <div  className='details-header'>
           <h1>Customer Details</h1>
          <div className="customer-details-my details-content-my">
                {renderEditableField("Customer Name", "Customer_Name", "text", editableBooking.Customer_Name, "Customer_Name" )}
                {renderEditableField("Email Address", "Email_Address", "text", editableBooking.Email_Address, "Email_Address")}
                {renderEditableField("Phone Number", "Phone_Number", "text", editableBooking.Phone_Number, "Phone_Number")}
                {renderEditableField("Alt Phone Number", "Alt_Phone_Number", "text", editableBooking.Alt_Phone_Number, "Alt_Phone_Number")}
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
            {renderEditableField("Move Date", "MoveDate", "date", editableBooking.MoveDate, "MoveDate")}
            {renderEditableField("Move Size", "Move_Size", "text", editableBooking.Move_Size, "Move_Size")}
            {renderEditableField("From Address", "From_Address", "text", editableBooking.From_Address, "From_Address",handleInputChange4)}
            {renderEditableField("To Address", "To_Address", "text", editableBooking.To_Address, "To_Address",handleInputChange4)}
            {renderEditableField("Pick up Time", "Pick_up_Time", "text", editableBooking.Pick_up_Time, "Pick_up_Time")}
            {renderEditableField("Google Route Link", "Google_Route_Link", "text", editableBooking.Google_Route_Link, "Google_Route_Link")}    
            {renderEditableField("Storage", "Storage", "text", editableBooking.Storage, "Storage")}
            {renderEditableField("Storage Location", "Storage_Location", "text", editableBooking.Storage_Location, "Storage_Location")}
            {renderEditableField("Storage Duration", "Storage_Duration", "text", editableBooking.Storage_Duration, "Storage_Duration")}
            {renderEditableField("Packing", "Packing", "text", editableBooking.Packing, "Packing")}
            {renderEditableField("Packing Material", "Packing_Material", "text", editableBooking.Packing_Material, "Packing_Material")}
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
            {renderEditableField("Staircase", "Count_of_Stairs", "text", editableBooking.Count_of_Stairs, "Count_of_Stairs")}
            {renderEditableField("Which Floor", "which_floor", "text", editableBooking.which_floor, "which_floor")}
            {renderEditableField("Long Walk", "Long_Walk", "text", editableBooking.Long_Walk, "Long_Walk")}
            {renderEditableField("Elevator", "Elevator", "text", editableBooking.Elevator, "Elevator")}
            {renderEditableField("Special Instruction", "Special_Instruction", "textarea", editableBooking.Special_Instruction, "Special_Instruction")}
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
            {renderEditableField("Invoice No", "INVOICE", "text", editableBooking.INVOICE, "INVOICE")}
            {renderEditableField("Estimate No", "Estimate_No", "text", editableBooking.Estimate_No, "Estimate_No")}
            {renderEditableField("Invoice Link", "Invoicelink1", "text", editableBooking.Invoicelink1, "Invoicelink1")}
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
              {renderEditableField("Status", "Status", "text", editableBooking.Status, "Status")} 
              {renderEditableField("Assigned To", "Assigned_To", "text", editableBooking.Assigned_To, "Assigned_To")}
              {renderEditableField("Sales Agent", "Sales_Agent", "text", editableBooking.Sales_Agent, "Sales_Agent")}
              {renderEditableField("Move Coordinators", "Move_Co_Ordinators", "text", editableBooking.Move_Co_Ordinators, "Move_Co_Ordinators")}
              {renderEditableField("Dispatch Agent", "Dispatch_Agent", "text", editableBooking.Dispatch_Agent, "Dispatch_Agent")}
              {renderEditableField("Crew Leader Assigned", "Crew_Leader_Assigned", "text", editableBooking.Crew_Leader_Assigned, "Crew_Leader_Assigned")}
              {renderEditableField("Pick Up Crew Leader Assigned", "Pick_Up_Crew_Leader_Assigned", "text", editableBooking.Pick_Up_Crew_Leader_Assigned, "Pick_Up_Crew_Leader_Assigned")}
              {renderEditableField("Drop Crew Leader Assigned", "Drop_Crew_Leader_Assigned", "text", editableBooking.Drop_Crew_Leader_Assigned, "Drop_Crew_Leader_Assigned")}

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
                  {renderEditableField("Gym Equipment", "Gym_equipment", "text", editableBooking.Gym_equipment, "Gym_equipment")}
                  {renderEditableField("Appliance", "Appliances", "text", editableBooking.Appliances, "Appliances")}
                  {renderEditableField("Fragile", "Fragile", "text", editableBooking.Fragile, "Fragile")}
                  {renderEditableField("Flammable", "Flammable_items", "text", editableBooking.Flammable_items, "Flammable_items")}
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
                    {renderEditableField("Assigned To", "Assigned_To", "text", editableBooking.Assigned_To, "Assigned_To")}   
                    {renderEditableField("Status", "Status", "text", editableBooking.Status, "Status")}   
                  </div>         
                  </div> 
                <div className="booking-details"> 
                  <div className="details-tabs">
                    {["Job Details", "Quality Check", "Move coordination", "Move Reviews", "Expense"].map((tab) => (
                      <button
                        key={tab}
                        className={`tab-button ${activeTab1 === tab ? "active" : ""}`}
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
    const renderTabContentmovecoordination =() =>{
      switch (activeTab2){
        case "Pick Up & Drop Team in Same":
          return(
            <>
            <div className='details-header'>
                <h1>Pick Up & Drop Team Details</h1>
                <div className="team-details-my details-content-my">
                  {renderEditableField("Crew Leader Assigned", "Crew_Leader_Assigned", "text", editableBooking.Crew_Leader_Assigned, "Crew_Leader_Assigned")}
                  {renderEditableField("Crew Leader Contact Info", "Crew_Leader_Contact_Info", "text", editableBooking.Crew_Leader_Contact_Info, "Crew_Leader_Contact_Info")}
                  {renderEditableField("Crew Contacts", "Crew_Contacts", "text", editableBooking.Crew_Contacts, "Crew_Contacts")}
                </div>
              </div>
            </>
          )
        case "Pick Up & Drop Team in different":
          return(
            <>
                <div className='details-header'>
                  <h1>Pick Up Job Team Details</h1>
                  <div className="team-details-my details-content-my">
                  {renderEditableField("Pick Up Crew Leader Assigned", "Pick_Up_Crew_Leader_Assigned", "text", editableBooking.Pick_Up_Crew_Leader_Assigned, "Pick_Up_Crew_Leader_Assigned")}
                  {renderEditableField("Pick Up Crew Leader Contact Info", "Pick_Up_Crew_Leader_Contact_Info", "text", editableBooking.Pick_Up_Crew_Leader_Contact_Info, "Pick_Up_Crew_Leader_Contact_Info")}
                  {renderEditableField("Pick Up Crew Contacts", "Pick_Up_Crew_Contacts", "text", editableBooking.Pick_Up_Crew_Contacts, "Pick_Up_Crew_Contacts")}
                  </div>
                </div>

                <div className='details-header'>
                  <h1>Drop Job Team Details</h1>
                  <div className="team-details-my details-content-my">
                  {renderEditableField("Drop Crew Leader Assigned", "Drop_Crew_Leader_Assigned", "text", editableBooking.Drop_Crew_Leader_Assigned, "Drop_Crew_Leader_Assigned")}
                  {renderEditableField("Drop Crew Leader Contact Info", "Drop_Crew_Leader_Contact_Info", "text", editableBooking.Drop_Crew_Leader_Contact_Info, "Drop_Crew_Leader_Contact_Info")}
                  {renderEditableField("Drop Crew Contacts", "Drop_Crew_Contacts", "text", editableBooking.Drop_Crew_Contacts, "Drop_Crew_Contacts")}
                  </div>
                </div>
              </>
          )
        case "Truck Details":
          return(
            <>
            <div  className='details-header'>
              <h1>Truck Details</h1>
                <div className="team-details-my details-content-my">
                  {renderEditableField("Truck Details", "Truck_Details", "text", editableBooking.Truck_Details, "Truck_Details")}
                  {renderEditableField("Truck Owner", "Truck_Owner", "text", editableBooking.Truck_Owner, "Truck_Owner")}
                  {renderEditableField("Truck Size", "Truck_Types", "text", editableBooking.Truck_Types, "Truck_Types")}
                  {renderEditableField("Hub", "Hub", "text", editableBooking.Hub, "Hub")}
                  {renderEditableField("Truck Capacity", "Truck_Capacity", "text", editableBooking.Truck_Capacity, "Truck_Capacity")}
                </div>
            </div>
            </>
          )
        case "Storage Details":
          return(
            <>
             <div  className='details-header'>
              <h1>Storage</h1>
                <div className="team-details-my details-content-my">
                  {renderEditableField("Storage", "Storage", "text", editableBooking.Storage, "Storage")}
                  {renderEditableField("Storage Duration", "Storage_Duration", "text", editableBooking.Storage_Duration, "Storage_Duration")}
                  {renderEditableField("Storage Location", "Storage_Location", "text", editableBooking.Storage_Location, "Storage_Location")}
                  {renderEditableField("Storage Holder Name", "Storage_Holder_Name", "text", editableBooking.Storage_Holder_Name, "Storage_Holder_Name")}
                  {renderEditableField("Storage Address", "Storage_Address", "text", editableBooking.Storage_Address, "Storage_Address")}
                  {renderEditableField("Storage Start Date", "Storage_Start_date", "text", editableBooking.Storage_Start_date, "Storage_Start_date")}
                  {renderEditableField("Storage End Date", "Storage_End_date", "text", editableBooking.Storage_End_date, "Storage_End_date")}
                  {renderEditableField("Storage Invoice", "Storage_Invoice", "text", editableBooking.Storage_Invoice, "Storage_Invoice")}
                  {renderEditableField("Storage Unit", "Storage_Unit", "text", editableBooking.Storage_Unit, "Storage_Unit")}
                  {renderEditableField("Storage Acess", "Storage_Acess", "text", editableBooking.Storage_Acess, "Storage_Acess")}
                </div>
            </div>
            </>
          )
      }
    }
    const renderTabContentforUpdate = () => {
      switch (activeTab1) {
        case "Job Details":
          return (
            <>
            <div  className='details-header'>
            <h1>Job Details </h1>
            <div className="team-details-my details-content-my">
                {renderEditableField("Sales Agent", "Sales_Agent", "text", editableBooking.Sales_Agent, "Sales_Agent")}
                {renderEditableField("Dispatch Agent", "Dispatch_Agent", "text", editableBooking.Dispatch_Agent, "Dispatch_Agent")}
                {renderEditableField("Move Size", "Move_Size", "text", editableBooking.Move_Size, "Move_Size")}
                {renderEditableField("Move Date", "MoveDate", "date", editableBooking.MoveDate, "MoveDate")}
                {renderEditableField("Banner", "Banner", "text", editableBooking.Banner, "Banner")}
                {renderEditableField("Invoice No", "INVOICE", "text", editableBooking.INVOICE, "INVOICE")}
                {renderEditableField("Invoice Link", "Invoicelink1", "text", editableBooking.Invoicelink1, "Invoicelink1")}
                {renderEditableField("severity", "severity", "text", editableBooking.severity, "severity")}
                {renderEditableField("Connection Type", "Connection_Type", "text", editableBooking.Connection_Type, "Connection_Type")}
                {renderEditableField("Estimate No", "Estimate_No", "text", editableBooking.Estimate_No, "Estimate_No")}
                {renderEditableField("Move From", "Move_From", "text", editableBooking.Move_From, "Move_From")}
                {renderEditableField("Move To", "Move_To", "text", editableBooking.Move_To, "Move_To")}
                {renderEditableField("From Address", "From_Address", "text", editableBooking.From_Address, "From_Address",handleInputChange4)}
                {renderEditableField("To Address", "To_Address", "text", editableBooking.To_Address, "To_Address",handleInputChange4)}
                {renderEditableField("Booked Date", "Booked_Date", "text", editableBooking.Booked_Date, "Booked_Date")}
                {renderEditableField("Assigned To", "Assigned_To", "text", editableBooking.Assigned_To, "Assigned_To")}
            </div>
           
            </div>
            </>
          );
        case "Quality Check":
          return (
            <>
           <div  className='details-header'>
            <h1>Quality Check <span
                    className="toggle-icon"
                    onClick={toggleCustomerRequirement}
                    style={{ cursor: 'pointer', marginLeft: '10px'  }}
                  >
                    {isCustomerRequirementExpanded ? '-' : '+'}
                  </span>
                </h1>
               {isCustomerRequirementExpanded && (
              <div className="team-details-my details-content-my">
                {renderEditableField("Dispatch Date", "Dispatch_Date", "text", editableBooking.Dispatch_Date, "Dispatch_Date")}
                {renderEditableField("Dispatch Comments", "Dispatch_Comments", "text", editableBooking.Dispatch_Comments, "Dispatch_Comments")}
                {renderEditableField("Special Instruction", "Special_Instruction", "text", editableBooking.Special_Instruction, "Special_Instruction")}
                {renderEditableField("Customer Name", "Customer_Name", "text", editableBooking.Customer_Name, "Customer_Name")}
                {renderEditableField("Phone Number", "Phone_Number", "text", editableBooking.Phone_Number, "Phone_Number")}
                {renderEditableField("Alt Phone Number", "Alt_Phone_Number", "text", editableBooking.Alt_Phone_Number, "Alt_Phone_Number")}
                {renderEditableField("Email Address", "Email_Address", "text", editableBooking.Email_Address, "Email_Address")}
                {renderEditableField("Pick up Time", "Pick_up_Time", "text", editableBooking.Pick_up_Time, "Pick_up_Time")}
                {renderEditableField("From Address", "From_Address", "text", editableBooking.From_Address, "From_Address",handleInputChange4)}
                {renderEditableField("To Address", "To_Address", "text", editableBooking.To_Address, "To_Address",handleInputChange4)}
                {renderEditableField("Gym equipment", "Gym_equipment", "text", editableBooking.Gym_equipment, "Gym_equipment")}
                {renderEditableField("Appliances", "Appliances", "text", editableBooking.Appliances, "Appliances")}
                {renderEditableField("Fragile", "Fragile", "text", editableBooking.Fragile, "Fragile")}
                {renderEditableField("Flammable items", "Flammable_items", "text", editableBooking.Flammable_items, "Flammable_items")}
                {renderEditableField("Move Size", "Move_size_dispact_Agent", "text", editableBooking.Move_size_dispact_Agent, "Move_size_dispact_Agent")}
                {renderEditableField("Staircase", "Count_of_Stairs", "text", editableBooking.Count_of_Stairs, "Count_of_Stairs")}
                {renderEditableField("Which Floor", "which_floor", "text", editableBooking.which_floor, "which_floor")}
                {renderEditableField("Long Walk", "Long_Walk", "text", editableBooking.Long_Walk, "Long_Walk")}
                {renderEditableField("Elevator", "Elevator", "text", editableBooking.Elevator, "Elevator")}
                {renderEditableField("Packing", "Packing", "text", editableBooking.Packing, "Packing")}
                {renderEditableField("Packing Material", "Packing_Material", "text", editableBooking.Packing_Material, "Packing_Material")}
                {renderEditableField("Complex Assembly or Disassembly", "Complex_Assembly_or_Disassembly", "text", editableBooking.Complex_Assembly_or_Disassembly, "Complex_Assembly_or_Disassembly")}
                {renderEditableField("Special Requirement", "Special_Requirement", "text", editableBooking.Special_Requirement, "Special_Requirement")}
                {renderEditableField("Customer OK with the Pricing", "Customer_OK_with_the_Pricing", "text", editableBooking.Customer_OK_with_the_Pricing, "Customer_OK_with_the_Pricing")}
                {renderEditableField("Storage", "Storage", "text", editableBooking.Storage, "Storage")}
                {renderEditableField("Storage Duration", "Storage_Duration", "text", editableBooking.Storage_Duration, "Storage_Duration")}
                {renderEditableField("Storage Location", "Storage_Location", "text", editableBooking.Storage_Location, "Storage_Location")}
                {renderEditableField("Valuable Items and Docs", "Valuable_Items_and_Docs", "text", editableBooking.Valuable_Items_and_Docs, "Valuable_Items_and_Docs")}
                {renderEditableField("Docu Sign Status", "Docu_Sign_Status", "text", editableBooking.Docu_Sign_Status, "Docu_Sign_Status")}
                {renderEditableField("Dispatch Email Sent", "Dispatch_Email_Sent", "text", editableBooking.Dispatch_Email_Sent, "Dispatch_Email_Sent")}
              </div>
               )}
            </div>
              <div  className='details-header'>
                <h1>Storage 
                  <span
                    className="toggle-icon"
                    onClick={toggleCustomerRequirement1}
                    style={{ cursor: 'pointer', marginLeft: '10px' }}
                  >
                    {isCustomerRequirementExpanded1 ? '-' : '+'}
                  </span>
                </h1>
               {isCustomerRequirementExpanded1 && (
                <div className="team-details-my details-content-my">
                  {renderEditableField("Storage Holder Name", "Storage_Holder_Name", "text", editableBooking.Storage_Holder_Name, "Storage_Holder_Name")}
                  {renderEditableField("Storage Address", "Storage_Address", "text", editableBooking.Storage_Address, "Storage_Address")}
                  {renderEditableField("Storage Start Date", "Storage_Start_date", "text", editableBooking.Storage_Start_date, "Storage_Start_date")}
                  {renderEditableField("Storage End Date", "Storage_End_date", "text", editableBooking.Storage_End_date, "Storage_End_date")}
                  {renderEditableField("Storage Invoice", "Storage_Invoice", "text", editableBooking.Storage_Invoice, "Storage_Invoice")}
                  {renderEditableField("Storage Unit", "Storage_Unit", "text", editableBooking.Storage_Unit, "Storage_Unit")}
                  {renderEditableField("Storage Acess", "Storage_Acess", "text", editableBooking.Storage_Acess, "Storage_Acess")}
                </div>
               )}
              </div>
          </>
          );
        case "Move coordination":
          return (
            <>
              <div  className='details-header'>
                <h1>Customer Requirement          
                  <span
                    className="toggle-icon"
                    onClick={toggleCustomerRequirement}
                    style={{ cursor: 'pointer', marginLeft: '10px' }}
                  >
                    {isCustomerRequirementExpanded ? '-' : '+'}
                  </span>
                </h1>
               {isCustomerRequirementExpanded && (
                <div className="team-details-my details-content-my">
                  {renderField("Dispatch Date", editableBooking.Dispatch_Date)}
                  {renderField("Dispatch Comments", editableBooking.Dispatch_Comments)}
                  {renderField("Special Instruction", editableBooking.Special_Instruction)}
                  {renderField("Customer Name", editableBooking.Customer_Name)}
                  {renderField("Phone Number", editableBooking.Phone_Number)}
                  {renderField("Alt Phone Number", editableBooking.Alt_Phone_Number)}
                  {renderField("Email Address", editableBooking.Email_Address)}
                  {renderField("Pick up Time", editableBooking.Pick_up_Time)}
                  {renderField("From Address", editableBooking.From_Address)}
                  {renderField("To Address", editableBooking.To_Address)}
                  {renderField("Gym equipment", editableBooking.Gym_equipment)}
                  {renderField("Appliances", editableBooking.Appliances)}
                  {renderField("Fragile", editableBooking.Fragile)}
                  {renderField("Flammable items", editableBooking.Flammable_items)}
                  {renderField("Move Size", editableBooking.Move_size_dispact_Agent)}
                  {renderField("Staircase", editableBooking.Count_of_Stairs)}
                  {renderField("Which Floor", editableBooking.which_floor)}
                  {renderField("Long Walk", editableBooking.Long_Walk)}
                  {renderField("Elevator", editableBooking.Elevator)}
                  {renderField("Packing", editableBooking.Packing)}
                  {renderField("Packing Material", editableBooking.Packing_Material)}
                  {renderField("Complex Assembly or Disassembly", editableBooking.Complex_Assembly_or_Disassembly)}
                  {renderField("Special Requirement", editableBooking.Special_Requirement)}
                  {renderField("Customer OK with the Pricing", editableBooking.Customer_OK_with_the_Pricing)}
                  {renderField("Storage", editableBooking.Storage)}
                  {renderField("Storage Duration", editableBooking.Storage_Duration)}
                  {renderField("Storage Location", editableBooking.Storage_Location)}
                  {renderField("Valuable Items and Docs", editableBooking.Valuable_Items_and_Docs)}
                  {renderField("Docu Sign Status", editableBooking.Docu_Sign_Status)}
                  {renderField("Dispatch Email Sent", editableBooking.Dispatch_Email_Sent)}
                </div>
               )}
              </div>
           
               <div className='details-header'>
                  <h1>
                    Move Requirement{' '}
                    <span
                      className='toggle-icon'
                      onClick={toggleCustomerRequirement1}
                      style={{ cursor: 'pointer', marginLeft: '10px' }}
                    >
                      {isCustomerRequirementExpanded1 ? '-' : '+'}
                    </span>
                  </h1>
                  {isCustomerRequirementExpanded1 && (
                    <>
                      <div className='team-details-my details-content-my'>
                        {renderEditableField("Move Coordinators", "Move_Co_Ordinators", "text", editableBooking.Move_Co_Ordinators, "Move_Co_Ordinators")}
                        {renderEditableField("Move Type", "Move_Type", "text", editableBooking.Move_Type, "Move_Type")}
                        {renderEditableField("Contract Reviewed", "Contract_Reviewed", "text", editableBooking.Contract_Reviewed, "Contract_Reviewed")}
                        {renderEditableField("Clubbed Move", "Clubbed_Move", "text", editableBooking.Clubbed_Move, "Clubbed_Move")}
                        {renderEditableField("Invoice", "INVOICE", "text", editableBooking.INVOICE, "INVOICE")}
                      </div>
                      <div>
                        <TaskManager currentInvoice={editableBooking.INVOICE} /> 
                      </div>
                    </>
                  )}
                </div>
                <div className='details-header'>
                  <h1>Pick Up Tasks</h1>
                  <Ptd currentInvoice={editableBooking.INVOICE}/>
                  
                </div>
                <div className='details-header'>
                  <h1>Transit Tasks</h1>
                  <Transit currentInvoice={editableBooking.INVOICE}/>
                </div>
                <div className='details-header'>
                  <h1>Drop Tasks</h1>
                  <Drop currentInvoice={editableBooking.INVOICE}/>
                </div>
                
            {/* <div  className='details-header'>
              <h1>Move Requirement <span
                    className="toggle-icon"
                    onClick={toggleCustomerRequirement1}
                    style={{ cursor: 'pointer', marginLeft: '10px' }}
                  >
                    {isCustomerRequirementExpanded1 ? '-' : '+'}
                  </span>
                </h1>
               {isCustomerRequirementExpanded1 && (
                <div className="team-details-my details-content-my">
                  {renderEditableField("Move Coordinators", "Move_Co_Ordinators", "text", editableBooking.Move_Co_Ordinators, "Move_Co_Ordinators")}
                  {renderEditableField("Move Type", "Move_Type", "text", editableBooking.Move_Type, "Move_Type")}
                  {renderEditableField("Contract Reviewed", "Contract_Reviewed", "text", editableBooking.Contract_Reviewed, "Contract_Reviewed")}
                  {renderEditableField("Clubbed Move", "Clubbed_Move", "text", editableBooking.Clubbed_Move, "Clubbed_Move")}
                  {renderEditableField("Customer Instruction Given", "Customer_Instruction_Given", "text", editableBooking.Customer_Instruction_Given, "Customer_Instruction_Given")}
                </div>
               )}
               </div> */}
            </>
          );
        case "Move Reviews":
          return (
            <>
              <div  className='details-header'>
                <h1>Move Reviews</h1>
                <div className="team-details-my details-content-my">
                  {renderEditableField("Crew Comments", "Crew_Comments", "textarea", editableBooking.Crew_Comments, "Crew_Comments")}
                  {renderEditableField("Customer Review", "CUSTOMER_REVIEW", "text", editableBooking.CUSTOMER_REVIEW, "CUSTOMER_REVIEW")}
                  {renderEditableField("Google Reviews", "Google_Reviews", "text", editableBooking.Google_Reviews, "Google_Reviews")}
                </div>
              </div>
            </>
          );
        case "Expense":
          return (
            <>
              <div  className='details-header'>
                <h1>Time <span
                    className="toggle-icon"
                    onClick={toggleCustomerRequirement}
                    style={{ cursor: 'pointer', marginLeft: '10px' }}
                  >
                    {isCustomerRequirementExpanded ? '-' : '+'}
                  </span>
                </h1>
               {isCustomerRequirementExpanded && (
                  <div className="team-details-my details-content-my">
                    {renderEditableField("Start Time from Hub", "Start_Time_from_Hub", "text", editableBooking.Start_Time_from_Hub, "Start_Time_from_Hub")}
                    {renderEditableField("Time reached Pick location", "Time_reached_Pick_location", "text", editableBooking.Time_reached_Pick_location, "Time_reached_Pick_location")}
                    {renderEditableField("Loading Start Time", "Loading_Start_Time", "text", editableBooking.Loading_Start_Time, "Loading_Start_Time")}
                    {renderEditableField("Loading End time", "Loading_End_time", "text", editableBooking.Loading_End_time, "Loading_End_time")}
                    {renderEditableField("Travel Start from Pick up Location", "Travel_Start_from_Pick_up_Location", "text", editableBooking.Travel_Start_from_Pick_up_Location, "Travel_Start_from_Pick_up_Location")}
                    {renderEditableField("Travel End at destination (Storage/Hub/Customer's Destination)", "Travel_End_at_destination", "text", editableBooking.Travel_End_at_destination, "Travel_End_at_destination")}
                    {renderEditableField("Unloading Start Time", "Unloading_Start_Time", "text", editableBooking.Unloading_Start_Time, "Unloading_Start_Time")}
                    {renderEditableField("Unloading End Time", "Unloading_End_Time", "text", editableBooking.Unloading_End_Time, "Unloading_End_Time")}
                    {renderEditableField("Return start Time", "Return_start_Time", "text", editableBooking.Return_start_Time, "Return_start_Time")}
                    {renderEditableField("Arrival Time (Hub/Next Job)", "Arrival_Time_Hub_Next_Job", "text", editableBooking.Arrival_Time_Hub_Next_Job, "Arrival_Time_Hub_Next_Job")}
                    {renderEditableField("Hours Estimated", "Hours_Estimated", "text", editableBooking.Hours_Estimated, "Hours_Estimated")}
                    {renderEditableField("Move Distance (Kms)", "Move_Distance_Kms", "text", editableBooking.Move_Distance_Kms, "Move_Distance_Kms")}
                    {renderEditableField("Total Weight (lbs)", "Total_Weight_lbs", "text", editableBooking.Total_Weight_lbs, "Total_Weight_lbs")}
                  </div>
               )}
              </div>
              <div  className='details-header'>
                  <h1>Expense 
                    <span
                    className="toggle-icon"
                    onClick={toggleCustomerRequirement1}
                    style={{ cursor: 'pointer', marginLeft: '10px' }}
                  >
                    {isCustomerRequirementExpanded1 ? '-' : '+'}
                  </span>
                </h1>
               {isCustomerRequirementExpanded1 && (
                    <div className="team-details-my details-content-my">
                    {renderEditableField("Estimate Amount ($)", "Estimate_Amount_$", "text", editableBooking.Estimate_Amount_$, "Estimate_Amount_$")}
                    {renderEditableField("Final Invoice Amt (Including Tax)", "Final_Invoice_Amt_Including_Tax", "text", editableBooking.Final_Invoice_Amt_Including_Tax, "Final_Invoice_Amt_Including_Tax")}
                    {renderEditableField("Final Invoice Amt (Excluding Tax)", "Final_Invoice_Amt_Excluding_Tax", "text", editableBooking.Final_Invoice_Amt_Excluding_Tax, "Final_Invoice_Amt_Excluding_Tax")}
                    {renderEditableField("Truck Cost", "Truck_Cost", "text", editableBooking.Truck_Cost, "Truck_Cost")}
                    {renderEditableField("Fuel Charges", "Fuel_Charges", "text", editableBooking.Fuel_Charges, "Fuel_Charges")}
                    {renderEditableField("Food", "Food", "text", editableBooking.Food, "Food")}
                    {renderEditableField("Scaling Fee", "Scaling_Fee", "text", editableBooking.Scaling_Fee, "Scaling_Fee")}
                    {renderEditableField("Labour Pay", "Labour_Pay", "text", editableBooking.Labour_Pay, "Labour_Pay")}
                    {renderEditableField("Supply", "Supply", "text", editableBooking.Supply, "Supply")}
                    {renderEditableField("Maintenance", "Maintenance", "text", editableBooking.Maintenance, "Maintenance")}
                    {renderEditableField("Ferry charges", "Ferry_charges", "text", editableBooking.Ferry_charges, "Ferry_charges")}
                    {renderEditableField("Truck Maintenance", "Truck_Maintenance", "text", editableBooking.Truck_Maintenance, "Truck_Maintenance")}   
                  </div>
               )}
              </div>
            </>
          );
        default:
          return null;
      }
    };

    const handleInputChange1 = (event) => {
      const searchQuery = event.target.value;
      setQuery(searchQuery);
    };

    const renderBookingDetails = () => (
      <div className="booking-details-my">
        <div className="details-tabs-my">
          {["Customer Details", "Move Details", "Inventory", "Supplies & Instruction", "Payment Details", "Team", "Notes & Updates"].map((tab) => (
            <button
              key={tab}
              className={`tab-button-my ${activeTab === tab ? "active" : ""}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>
        <div className="details-content-container-my">{renderTabContent()}</div>
      </div>
    );

    const renderCrewnotesBookingDetails = () => {
      if (!selectedBooking) return null;
      const booking = selectedBooking;
      const originCoordinates = booking.Coordinates_Origin;
      const destinationCoordinates = booking.Coordinates_Destn;
      const googleMapsLink = `https://www.google.com/maps/dir/?api=1&origin=${originCoordinates}&destination=${destinationCoordinates}&travelmode=driving`;
      return (
        <div className='total'>
          <div className="card" id="Crew-Notes">
            <div className="header1">
              <img src="https://cdn.vectorstock.com/i/750p/20/76/man-avatar-profile-vector-21372076.avif" alt="Crew Leader" />
              <h1>Assigned To:{booking.AssignedTo}</h1>
            </div>
    
            <div className="details1">
              <h2>Move Details</h2>
              <p><span>Invoice no:</span> {booking.INVOICE}</p>
              <p><span>Banner:</span> {booking.Banner}</p>
              <p><span>Move date:</span> {booking.MoveDate}</p>
              <p><span>Agreed Pick up time:</span> {booking.Pick_Up_Time}</p>
              <p><span>Origin Address:</span> {booking.From_Address}</p>
              <p><span>Destination Address:</span> {booking.To_Address}</p>
              <p><span>Move size:</span> {booking.Move_Size}</p>
              <p><span>Inventory items customer provided:</span></p>
              <p><span>Long walk:</span>{booking.Long_Walk}</p>
              <p><span>Parking:</span></p>
              <p><span>Distance between parking space and house:</span></p>
              <p><span>Stair case:</span>{booking.Count_of_Stairs}</p>
              <p><span>Elevator booked time at origin:</span></p>
              <p><span>Elevator booked time at destination:</span></p>
              <p><span>Customer preferred payment method:</span></p>
            </div>
    
            <div className="details1">
              <h2>Packing and Tools</h2>
              <p><span>Packing supplies required:</span>{booking.Packing_Material}</p>
              <p><span>Packing service customer requested:</span></p>
              <p><span>Tools required:</span></p>
            </div>
    
            <div className="details1">
              <h2>Customer Details</h2>
              <p><span>Customer name:</span>{booking.Customer_Name}</p>
              <p><span>Phone number:</span> {booking.Phone_Number}</p>
              <p><span>Alternate phone number:</span> {booking.Alt_Phone_Number}</p>
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
                href={`https://web.2go.com/invoices/${editableBooking.Invoicelink}`}
                className="link1"
                target="_blank"
                rel="noopener noreferrer"
              >
                Click Here
              </a>
            </p>
          </div>
          <div className="download">
            <button onClick={downloadPDF}>Download as PDF</button>
          </div>
        </div>
      );
    };

    const downloadPDF = () => {
      if (!editableBooking) return;
    
      const input = document.getElementById('Crew-Notes'); 
    
      html2canvas(input, { scale: 2 }).then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        const pdfWidth = 210; 
        const imgProps = canvas.width / canvas.height;
        const imgHeight = pdfWidth / imgProps;
        const pdf = new jsPDF('p', 'mm', [pdfWidth, imgHeight + 30]); 
        pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, imgHeight);
        const coordinatesOrigin = editableBooking.Coordinates_Origin;
        const coordinatesDestn = editableBooking.Coordinates_Destn;
        let googleMapsLink = null;
        if (coordinatesOrigin && coordinatesDestn) {
          const originCoords = coordinatesOrigin.split(",");
          const destnCoords = coordinatesDestn.split(",");
          if (originCoords.length === 2 && destnCoords.length === 2) {
            const originLat = parseFloat(originCoords[0].trim());
            const originLng = parseFloat(originCoords[1].trim());
            const destnLat = parseFloat(destnCoords[0].trim());
            const destnLng = parseFloat(destnCoords[1].trim());
            if (!isNaN(originLat) && !isNaN(originLng) && !isNaN(destnLat) && !isNaN(destnLng)) {
              googleMapsLink = `https://www.google.com/maps/dir/?api=1&origin=${originLat},${originLng}&destination=${destnLat},${destnLng}`;
            }
          }
        }
        const invoiceLink = `https://web.2go.com/invoices/${editableBooking.Invoicelink}`;
        const linkStartY = imgHeight + 10;
        pdf.setFontSize(16);
        pdf.setTextColor(0, 0, 255); 
        pdf.setFont('helvetica', 'bold');
        if (googleMapsLink) {
          pdf.text("Google Route Link:", 10, linkStartY);
          pdf.setTextColor(255, 0, 0); 
          pdf.textWithLink("Click Here", 63, linkStartY, { url: googleMapsLink });
        } else {
          pdf.text("Google Route Link: Location data missing", 10, linkStartY);
        }
        pdf.setTextColor(0, 0, 255);
        pdf.text("Invoice Link:", 10, linkStartY + 10);
        pdf.setTextColor(255, 0, 0); 
        pdf.textWithLink("Click Here", 45, linkStartY + 10, { url: invoiceLink });
        pdf.setFont('helvetica', 'normal');
        pdf.save('Crew-Notes.pdf');
      });
    };

  return {
    bookingsData, selectedBooking, editableBooking, activeTab, activeInventoryTab,
    loading, error, query, viewMode, editStates, isPopupVisible, popupContent,
    setQuery, setViewMode, setEditStates, setIsPopupVisible, setPopupContent,
    handleClosePopup, handlePopupOpen, parseDate, getLastTwoLetters, formatDate,
    handleBookingClick, isFutureOrToday, handleSave,
    handleBookingClick1, toggleEditState, handleInputChange, navigate,renderBookingDetails,renderCrewnotesBookingDetails,
    handleInputChange1,downloadPDF,
  };
};

export default useBookings;
