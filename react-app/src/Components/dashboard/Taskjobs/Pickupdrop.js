import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../My Bookings/mybook.css';
import DatePicker from 'react-datepicker'; 
import 'react-datepicker/dist/react-datepicker.css';
import Select from 'react-select';

const Pickdrop = ({ currentInvoice, refreshPtd }) => {
  const [tasks, setTasks] = useState([]);
  const [isEditing, setIsEditing] = useState([]); 
  const [editedData, setEditedData] = useState([]); 
  const [columnMapping, setColumnMapping] = useState({});
  const [collapsed, setCollapsed] = useState([]);
  const [TruckDetailsOptions, setTruckDetailsOptions] = useState([]);
  const [OwnerOptions, setOwnerOptions] = useState([]);
  const [HubOptions, setHubOptions] = useState([]);
  const [CapacityOptions, setCapacityOptions] = useState([]);
  const [TruckTypeOptions, setTruckTypeOptions] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchTaskData = async () => {
    try {
      const response = await axios.get('http://localhost:9000/zoho-data/Task');
      const { dataRows, columnMapping } = response.data;
  
      setColumnMapping(columnMapping);
      const matchingTasks = dataRows.filter(task => task.ID === currentInvoice && task.Task_Type === 'PickUp_Drop');
      if (matchingTasks.length > 0) {
        const updatedTasks = matchingTasks.map(task => {
          if (task.Task_Date) {
            const [datePart, timePart] = task.Task_Date.split(' ');

            const formattedDate = formatDateToISO(datePart);
  
            return {
              ...task,
              PickUp_Schedule_Date: formattedDate || '',  
              PickUp_Schedule_Time: timePart || '',       
            };
          }
          return task;
        });
  
        setTasks(updatedTasks);
        setIsEditing(new Array(updatedTasks.length).fill(false)); 
        setEditedData(new Array(updatedTasks.length).fill({})); 
        setCollapsed(new Array(updatedTasks.length).fill(false)); 
      }
    } catch (error) {
      console.error('Error fetching task data:', error);
    }
  };

  const formatDateToISO = (dateString) => {
    const [day, month, year] = dateString.split('/');
    return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
  };

//   const fetchTaskData = async () => {
//     try {
//       const response = await axios.get('http://localhost:9000/zoho-data/Task');
//       const { dataRows, columnMapping } = response.data;

//       setColumnMapping(columnMapping);
//       const matchingTasks = dataRows.filter(task => task.ID === currentInvoice && task.Task_Type === 'PickUp_Drop');
//       if (matchingTasks.length > 0) {
//         setTasks(matchingTasks);
//         setIsEditing(new Array(matchingTasks.length).fill(false)); 
//         setEditedData(new Array(matchingTasks.length).fill({})); 
//         setCollapsed(new Array(matchingTasks.length).fill(false)); 
//       }
//     } catch (error) {
//       console.error('Error fetching task data:', error);
//     }
//   };

  useEffect(() => {
    fetchTaskData();
  }, [currentInvoice, refreshPtd]);

  const fetchAssignedToOptions = async () => {
    try {
      const response = await axios.get('http://localhost:9000/zoho-data/Assigned-To-Name');
      if (response.data && response.data.records) {
        const TruckDetails = response.data.records.map(record => record.TruckDetails);
        const Owner = response.data.records.map(record => record.Owner);
        const TruckType = response.data.records.map(record => record.TruckType);
        const Hub = response.data.records.map(record => record.Hub);
        const Capacity = response.data.records.map(record => record.Capacity);
        setTruckDetailsOptions(TruckDetails);
        setOwnerOptions(Owner);
        setTruckTypeOptions(TruckType);
        setHubOptions(Hub);
        setCapacityOptions(Capacity);
      } else {
        console.log('No records found in response');
        setTruckDetailsOptions([]);
      }
    } catch (error) {
      console.error('Error fetching assigned to options:', error);
      setTruckDetailsOptions([]);
    }
  };

  useEffect(() => {
    fetchAssignedToOptions();
  }, []);

  const handleInputChange = (taskIndex, field, value) => {
    setEditedData((prevEditedData) => {
      const newEditedData = [...prevEditedData];
      newEditedData[taskIndex] = {
        ...newEditedData[taskIndex],
        [field]: value,
      };
      return newEditedData;
    });
  };

  const toggleEdit = (taskIndex) => {
    setIsEditing((prevEditing) => {
      const newEditing = [...prevEditing];
      newEditing[taskIndex] = !newEditing[taskIndex];
      return newEditing;
    });
  };

  const handleSave = async (taskIndex) => {
    setLoading(true);
    try {
      const task = tasks[taskIndex];
      const updatedFields = {};
  
      for (const [columnName, value] of Object.entries(editedData[taskIndex])) {
        let fieldToSave = columnName;
        let fieldValue = value;

        if (columnName === 'PickUp_Schedule_Date' || columnName === 'PickUp_Schedule_Time') {
          const date = editedData[taskIndex]['PickUp_Schedule_Date'];
          const time = editedData[taskIndex]['PickUp_Schedule_Time'];
  
          if (date && time) {
            const combinedDateTime = `${date} ${time}`;
            fieldToSave = 'Task_Date'; 
            fieldValue = combinedDateTime;
          } else {
            continue;
          }
        }
  
        const columnIndex = columnMapping[fieldToSave];
        if (columnIndex === undefined) {
          console.error(`Column mapping not found for: ${fieldToSave}`);
          continue;
        }
  
        updatedFields[columnIndex] = { columnName: fieldToSave, value: fieldValue };
      }
  
      const savePayload = {
        rowIndex: task.row_index,
        updatedFields,
      };
  
      await axios.post('http://localhost:9000/customer-detail/Task', savePayload);
  
      toggleEdit(taskIndex); 
      alert('Task details updated successfully.');
      fetchTaskData();
    } catch (error) {
      console.error('Error saving task data:', error);
    } finally {
      setLoading(false); 
    }
  };

//   const handleSave = async (taskIndex) => {
//     setLoading(true);
//     try {
//       const task = tasks[taskIndex];
//       const updatedFields = {};

//       for (const [columnName, value] of Object.entries(editedData[taskIndex])) {
//         const columnIndex = columnMapping[columnName];
//         if (columnIndex === undefined) {
//           console.error(`Column mapping not found for: ${columnName}`);
//           continue;
//         }
//         updatedFields[columnIndex] = { columnName, value };
//       }

//       const savePayload = {
//         rowIndex: task.row_index,
//         updatedFields,
//       };

//       await axios.post('http://localhost:9000/customer-detail/Task', savePayload);

//       toggleEdit(taskIndex); 
//       alert('Task details updated successfully.');
//       fetchTaskData();
//     } catch (error) {
//       console.error('Error saving task data:', error);
//     }finally {
//       setLoading(false); 
//     }
//   };

  const toggleCollapse = (taskIndex) => {
    setCollapsed((prevCollapsed) => {
      const newCollapsed = [...prevCollapsed];
      newCollapsed[taskIndex] = !newCollapsed[taskIndex];
      return newCollapsed;
    });
  };

  const handleTruckDetailsChange = (taskIndex, selectedOption) => {
    const value = selectedOption?.value || "";
    const selectedIndex = TruckDetailsOptions.findIndex(option => option === value);

    handleInputChange(taskIndex, "Truck_Details", value);  

    if (selectedIndex >= 0) {
      handleInputChange(taskIndex, "Truck_Owner", OwnerOptions[selectedIndex] || "");
      handleInputChange(taskIndex, "Truck_size", TruckTypeOptions[selectedIndex] || "");
      handleInputChange(taskIndex, "Hub", HubOptions[selectedIndex] || "");
      handleInputChange(taskIndex, "Truck_Capacity", CapacityOptions[selectedIndex] || "");
    } else {
      handleInputChange(taskIndex, "Truck_Owner", "");
      handleInputChange(taskIndex, "Truck_size", "");
      handleInputChange(taskIndex, "Hub", "");
      handleInputChange(taskIndex, "Truck_Capacity", "");
    }
  };

  const options11 = TruckDetailsOptions
    .filter(option => option && option.trim() !== '')
    .map(option => ({ label: option, value: option }));

  const renderEditableField = (label, field, type = "text", value, taskIndex) => (
    <div key={field} className="editable-field-container">
      <div className="editable-field-container2">
        <div className="editable-field-container1">
          <label>{label}:</label>
        </div>
      </div>
      <div className="input-with-button">
        {isEditing[taskIndex] ? (
          field === "Truck_Details" ? (
            <Select
              value={options11.find(option => option.value === (editedData[taskIndex][field] || value))} 
              onChange={(selectedOption) => handleTruckDetailsChange(taskIndex, selectedOption)}
              options={options11}
              isClearable
            />
          ) : field === "Ferry_charges" || field === "Food" 
          || field === "Maintenance" || field === "Labour_Pay" 
          || field === "Scaling_Fee" || field === "Fuel_Charges" 
          || field === "Truck_Cost" || field === "Supply_charges" ? (
            <div className="currency-input">
              <input
                type="text"
                name={field}
                value={`CA$ ${editedData[taskIndex][field] !== undefined && editedData[taskIndex][field] !== ''
                  ? editedData[taskIndex][field]
                  : (value !== undefined && value !== '' ? value : "")}`}
                onChange={(e) => {
                  const amount = e.target.value.replace(/[^0-9.]/g, ''); 
                  handleInputChange(taskIndex, field, amount); 
                }}
                placeholder="CA$ 0.00"
              />
            </div>
          ) : field === "Start_Time_from_Hub" || field === "Time_reached_Pick_location" 
          || field === "Loading_Start_Time" || field === "Loading_End_time" 
          || field === "Unloading_Start_Time" || field === "Arrival_Time_Hub_Next_Job" 
          || field === "Unloading_End_Time" || field === "Return_start_Time" 
          || field === "Travel_Start_from_Pick_up_Location" || field === "Travel_End_at_destination" ? (
            <DatePicker
              selected={editedData[taskIndex][field] 
                ? new Date(`1970-01-01T${editedData[taskIndex][field]}:00`)
                : (value ? new Date(`1970-01-01T${value}:00`) : null)} 
              onChange={(time) => {
                const formattedTime = time
                  ? `${time.getHours()}:${String(time.getMinutes()).padStart(2, "0")}`
                  : "";
                handleInputChange(taskIndex, field, formattedTime); 
              }}
              showTimeSelect
              showTimeSelectOnly
              timeIntervals={15}
              timeCaption="Time"
              dateFormat="HH:mm"
            />
          ) : (
            <input
              type={type}
              value={editedData[taskIndex][field] || value}
              onChange={(e) => handleInputChange(taskIndex, field, e.target.value)}
            />
          )
        ) : field === "Start_Time_from_Hub" || field === "Time_reached_Pick_location" 
        || field === "Loading_Start_Time" || field === "Loading_End_time" 
        || field === "Unloading_Start_Time" || field === "Arrival_Time_Hub_Next_Job" 
        || field === "Unloading_End_Time" || field === "Return_start_Time" 
        || field === "Travel_Start_from_Pick_up_Location" || field === "Travel_End_at_destination" ? (
            <span>
                {value ? value : 'No time set'}
            </span>
        ) : field === "Ferry_charges" || field === "Food" 
        || field === "Maintenance" || field === "Labour_Pay" 
        || field === "Scaling_Fee" || field === "Fuel_Charges" 
        || field === "Truck_Cost" || field === "Supply_charges" ? (
            <input 
                type="text" 
                value={value ? `CA$ ${value}` : 'CA$ 0.00'} 
                readOnly 
            />
        ) : (
            <input
              type={type}
              value={value}
              readOnly
            />
        )}
      </div>
    </div>
  );
 
  return (
    <>
      {tasks.map((task, taskIndex) => (
        <div key={task.Task_Id} className="detail-container" style={{ marginBottom: '20px' }}>
          <div className="detail-header">
            <h1>{task.Task_Id} 
              <span 
                onClick={() => toggleCollapse(taskIndex)} 
                style={{ cursor: 'pointer', marginLeft: 'auto' }}
              >
                {collapsed[taskIndex] ? '+' : '-'}
            </span>
            </h1>
         </div>

          {!collapsed[taskIndex] && ( 
            <div >
              <div className="button-group" style={{ marginLeft: '15px', display: 'flex', alignItems: 'center' }}>
              <button onClick={() => toggleEdit(taskIndex)}>
                {isEditing[taskIndex] ? 'Cancel' : 'Edit'}
              </button>
              {isEditing[taskIndex] && (
                <button onClick={() => handleSave(taskIndex)} disabled={loading} >
                  {loading ? 'Saving...' : 'Saving'} 
                </button>
              )}
              </div>
              <div>
                <div className="team-details-my details-content-my">
                  {renderEditableField("Customer Instructions", "Customer_Instructions", "textarea", task.Customer_Instructions, taskIndex)}
                  {renderEditableField("Crew Leader Assigned", "Crew_Leader_Assigned", "text", task.Crew_Leader_Assigned, taskIndex)}
                  {renderEditableField("Crew Leader Contact", "Crew_Leader_Contact", "text", task.Crew_Leader_Contact, taskIndex)}
                  {renderEditableField("Crew members", "Crew_members", "text", task.Crew_members, taskIndex)}
                  {renderEditableField("Truck Details", "Truck_Details", "text", task.Truck_Details, taskIndex)}
                  {renderEditableField("Truck Owner", "Truck_Owner", "text", task.Truck_Owner, taskIndex)}
                  {renderEditableField("Truck size", "Truck_size", "text", task.Truck_size, taskIndex)}
                  {renderEditableField("Hub", "Hub", "text", task.Hub, taskIndex)}
                  {renderEditableField("Truck Capacity", "Truck_Capacity", "text", task.Truck_Capacity, taskIndex)}
                  {renderEditableField("PickUp Schedule Date", "PickUp_Schedule_Date", "date", task.PickUp_Schedule_Date, taskIndex)}
                  {renderEditableField("PickUp Schedule Time", "PickUp_Schedule_Time", "time", task.PickUp_Schedule_Time, taskIndex)}
                </div>
                <hr/>
                <div  className="team-details-my details-content-my">
                  {renderEditableField("Start Time from Hub", "Start_Time_from_Hub", "text", task.Start_Time_from_Hub, taskIndex)}
                  {renderEditableField("Time reached Pick location", "Time_reached_Pick_location", "text", task.Time_reached_Pick_location, taskIndex)}
                  {renderEditableField("Loading Start Time", "Loading_Start_Time", "text", task.Loading_Start_Time, taskIndex)}
                  {renderEditableField("Loading End time", "Loading_End_time", "text", task.Loading_End_time, taskIndex)}
                  {renderEditableField("Travel Start from Pick up Location", "Travel_Start_from_Pick_up_Location", "text", task.Travel_Start_from_Pick_up_Location, taskIndex)}
                  {renderEditableField("Travel End at destination", "Travel_End_at_destination", "text", task.Travel_End_at_destination, taskIndex)}
                  {renderEditableField("Unloading Start Time", "Unloading_Start_Time", "text", task.Unloading_Start_Time, taskIndex)}
                  {renderEditableField("Unloading End Time", "Unloading_End_Time", "text", task.Unloading_End_Time, taskIndex)}
                  {renderEditableField("Return start Time", "Return_start_Time", "text", task.Return_start_Time, taskIndex)}
                  {renderEditableField("Arrival Time Hub Next Job", "Arrival_Time_Hub_Next_Job", "text", task.Arrival_Time_Hub_Next_Job, taskIndex)}
                </div>
                <hr/>
                <div className="team-details-my details-content-my">  
                  {renderEditableField("Truck Cost", "Truck_Cost", "text", task.Truck_Cost, taskIndex)}
                  {renderEditableField("Food Cost", "Food", "text", task.Food, taskIndex)}
                  {renderEditableField("Fuel Cost", "Fuel_Charges", "text", task.Fuel_Charges, taskIndex)}
                  {renderEditableField("Scaling Fee", "Scaling_Fee", "text", task.Scaling_Fee, taskIndex)}
                  {renderEditableField("Supply charges", "Supply_charges", "text", task.Supply_charges, taskIndex)}
                  {renderEditableField("Labour Pay", "Labour_Pay", "text", task.Labour_Pay, taskIndex)}
                  {renderEditableField("Maintenance", "Maintenance", "text", task.Maintenance, taskIndex)}
                  {renderEditableField("Ferry charges", "Ferry_charges", "text", task.Ferry_charges, taskIndex)}
                </div>
              </div>
            </div>
          )}
        </div>
      ))}
    </>
  );
};

export default Pickdrop;
