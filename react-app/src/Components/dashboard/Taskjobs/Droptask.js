
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import '../My Bookings/mybook.css';

// const Drop = ({ currentInvoice,  refreshPtd }) => {
//   const [tasks, setTasks] = useState([]); 
//   const [isEditing, setIsEditing] = useState([]); 
//   const [editedData, setEditedData] = useState([]); 
//   const [columnMapping, setColumnMapping] = useState({});

//   useEffect(() => {
//     const fetchTaskData = async () => {
//       try {
//         const response = await axios.get('http://localhost:9000/zoho-data/Task');
//         const { dataRows, columnMapping } = response.data;

//         if (!columnMapping) {
//           console.error('API did not return columnMapping');
//         } else {
//           setColumnMapping(columnMapping);
//         }

//         const matchingTasks = dataRows.filter(task => task.INVOICE === currentInvoice && task.Task_Type === 'drop');
//         if (matchingTasks.length > 0) {
//           setTasks(matchingTasks);
//           setIsEditing(new Array(matchingTasks.length).fill(false)); 
//           setEditedData(new Array(matchingTasks.length).fill({})); 
//         } else {
//           console.warn('No matching tasks found for the invoice with Task_Type "Pick up".');
//         }
//       } catch (error) {
//         console.error('Error fetching task data:', error);
//       }
//     };

//     fetchTaskData();
//   }, [currentInvoice,  refreshPtd]);

//   const handleInputChange = (taskIndex, e) => {
//     const { name, value } = e.target;
//     setEditedData((prevEditedData) => {
//       const newEditedData = [...prevEditedData];
//       newEditedData[taskIndex] = {
//         ...newEditedData[taskIndex],
//         [name]: value,
//       };
//       return newEditedData;
//     });
//   };

//   // Toggle between edit and view mode for a specific task
//   const toggleEdit = (taskIndex) => {
//     setIsEditing((prevIsEditing) => {
//       const newIsEditing = [...prevIsEditing];
//       newIsEditing[taskIndex] = !newIsEditing[taskIndex];
//       return newIsEditing;
//     });
//   };

//   // Save changes for a specific task
//   const handleSave = async (taskIndex) => {
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

//       // Save successful, exit edit mode
//       toggleEdit(taskIndex);
//       alert('Task details updated successfully.');
//     } catch (error) {
//       console.error('Error saving task data:', error);
//     }
//   };

//   // Handle task deletion for a specific task
//   const handleDelete = async (taskIndex) => {
//     try {
//       const task = tasks[taskIndex];
//       const deletePayload = {
//         conditions: [
//           { column: 'INVOICE', value: task.INVOICE },
//           { column: 'Task_Id', value: task.Task_Id },
//           { column: 'Task_Type', value: task.Task_Type },
//         ],
//       };

//       await axios.delete('http://localhost:9000/zoho-data/Task', { data: deletePayload });

//       alert('Task deleted successfully.');
//       // Remove the deleted task from the state
//       setTasks(tasks.filter((_, index) => index !== taskIndex));
//     } catch (error) {
//       console.error('Error deleting task:', error);
//       alert('Failed to delete the task.');
//     }
//   };

//   // if (tasks.length === 0) {
//   //   return <div>Loading task data...</div>;
//   // }

//   return (
//     <>
//       {tasks.map((task, taskIndex) => (
//         <div key={task.Task_Id} className="detail-container" style={{ marginBottom: '20px' }}>
//           <div className="detail-header">
//             <h1>{task.Task_Id}</h1>
//             <div className="button-group">
//               <button onClick={() => toggleEdit(taskIndex)}>
//                 {isEditing[taskIndex] ? 'Cancel' : 'Edit'}
//               </button>
//               {isEditing[taskIndex] && (
//                 <button onClick={() => handleSave(taskIndex)}>
//                   Save
//                 </button>
//               )}
//               {/* Uncomment this if you want the delete button */}
//               {/* 
//               <button onClick={() => handleDelete(taskIndex)} style={{ marginLeft: 'auto', color: '#fff' }}>
//                 Delete Task
//               </button> 
//               */}
//             </div>
//           </div>

//           <div className="team-details-my details-content-my3">
//             {Object.keys(columnMapping).map((key) => {
//               if (key === 'row_index' || key === 'INVOICE' || key === 'Task_Type') return null; // Skip these fields

//               const shouldDisplay = key.startsWith('Drop') || task[key]; // Display if 'Pick_up' or has a value

//               if (!shouldDisplay) return null;

//               return (
//                 <div key={key}>
//                   <label>{key.replace(/_/g, ' ')}</label>
//                   <input
//                     type="text"
//                     name={key}
//                     value={editedData[taskIndex][key] || task[key] || ''}
//                     onChange={isEditing[taskIndex] ? (e) => handleInputChange(taskIndex, e) : null}
//                     readOnly={!isEditing[taskIndex]}
//                   />
//                 </div>
//               );
//             })}
//           </div>
//         </div>
//       ))}
//     </>
//   );
// };

// export default Drop;


import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../My Bookings/mybook.css';
import DatePicker from 'react-datepicker'; 
import 'react-datepicker/dist/react-datepicker.css';

const Drop = ({ currentInvoice, refreshPtd }) => {
  const [tasks, setTasks] = useState([]);
  const [isEditing, setIsEditing] = useState([]); 
  const [editedData, setEditedData] = useState([]);
  const [columnMapping, setColumnMapping] = useState({});
  const [collapsed, setCollapsed] = useState([]);

  useEffect(() => {
    const fetchTaskData = async () => {
      try {
        const response = await axios.get('http://localhost:9000/zoho-data/Task');
        const { dataRows, columnMapping } = response.data;

        setColumnMapping(columnMapping);
        const matchingTasks = dataRows.filter(task => task.INVOICE === currentInvoice && task.Task_Type === 'drop');
        if (matchingTasks.length > 0) {
          setTasks(matchingTasks);
          setIsEditing(new Array(matchingTasks.length).fill(false)); 
          setEditedData(new Array(matchingTasks.length).fill({})); 
        }
      } catch (error) {
        console.error('Error fetching task data:', error);
      }
    };

    fetchTaskData();
  }, [currentInvoice, refreshPtd]);

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
    try {
      const task = tasks[taskIndex];
      const updatedFields = {};

      for (const [columnName, value] of Object.entries(editedData[taskIndex])) {
        const columnIndex = columnMapping[columnName];
        if (columnIndex === undefined) {
          console.error(`Column mapping not found for: ${columnName}`);
          continue;
        }
        updatedFields[columnIndex] = { columnName, value };
      }

      const savePayload = {
        rowIndex: task.row_index,
        updatedFields,
      };

      await axios.post('http://localhost:9000/customer-detail/Task', savePayload);

      toggleEdit(taskIndex); 
      alert('Task details updated successfully.');
    } catch (error) {
      console.error('Error saving task data:', error);
    }
  };

  const toggleCollapse = (taskIndex) => {
    setCollapsed((prevCollapsed) => {
      const newCollapsed = [...prevCollapsed];
      newCollapsed[taskIndex] = !newCollapsed[taskIndex];
      return newCollapsed;
    });
  };

  const renderEditableField = (label, field, type = "text", value, taskIndex) => (
    <div key={field} className="editable-field-container">
      <div className="editable-field-container2">
        <div className="editable-field-container1">
          <label>{label}:</label>
        </div>
      </div>
      <div className="input-with-button">
        {isEditing[taskIndex] ? (
          field === "Transit_Truk_cost" || field === "Transit_Fuel_Cost" || 
          field === "Transit_Food_Cost" || field === "Transit_Ferry_charges" || 
          field === "Transit_Maintenance" ? (
            <div className="currency-input">
              <input
                type="text"
                name={field}
                value={`CA$ ${editedData[taskIndex][field] !== undefined && editedData[taskIndex][field] !== ''
                  ? editedData[taskIndex][field]
                  : (value !== undefined && value !== '' ? value : "0.00")}`}
                onChange={(e) => {
                  const amount = e.target.value.replace(/[^0-9.]/g, ''); 
                  handleInputChange(taskIndex, field, amount); 
                }}
                placeholder="CA$ 0.00"
              />
            </div>
          ) :   field === "Transit_start_time_from_Hub"  ? (
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
        ) : field === "Transit_start_time_from_Hub" ? (
            <span>{value ? value : 'No time set'}</span>
        ) : field === "Transit_Truk_cost" || field === "Transit_Fuel_Cost" || 
        field === "Transit_Food_Cost" || field === "Transit_Ferry_charges" || 
        field === "Transit_Maintenance" ? (
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
          <div className="detail-header" >
            <h1>{task.Task_Id} 
              <span 
                onClick={() => toggleCollapse(taskIndex)} 
                style={{ cursor: 'pointer', marginLeft: 'auto' }}
              >
                {collapsed[taskIndex] ? '-' : '+'}
            </span>
            </h1>
            </div>
            <div className="button-group" style={{ marginLeft: '15px', display: 'flex', alignItems: 'center' }}>
              <button onClick={() => toggleEdit(taskIndex)}>
                {isEditing[taskIndex] ? 'Cancel' : 'Edit'}
              </button>
              {isEditing[taskIndex] && (
                <button onClick={() => handleSave(taskIndex)} style={{ marginLeft: '5px' }}>
                  Save
                </button>
              )}
            </div>
          {!collapsed[taskIndex] && ( 
            <div className="team-details-my details-content-my">
              {renderEditableField("Delivery Date", "Drop_Delivery_Date", "text", task.Drop_Delivery_Date, taskIndex)}
              {renderEditableField("Crew Leader Assigned", "Drop_Crew_Leader_Assigned", "text", task.Drop_Crew_Leader_Assigned, taskIndex)}
              {renderEditableField("Crew members", "Drop_Crew_Leader_Contact", "text", task.Drop_Crew_Leader_Contact, taskIndex)}
              {renderEditableField("Truck Details", "Drop_Crew_members", "text", task.Drop_Crew_members, taskIndex)}
              {renderEditableField("Truck Owner", "Drop_Truck_Details", "text", task.Drop_Truck_Details, taskIndex)}
              {renderEditableField("Truck size", "Drop_Truck_Owner", "text", task.Drop_Truck_Owner, taskIndex)}
              {renderEditableField("Truck Capacity", "Drop_Truck_size", "text", task.Drop_Truck_size, taskIndex)}
              {renderEditableField("start time from Hub", "Drop_Truck_Capacity", "text", task.Drop_Truck_Capacity, taskIndex)}
              {renderEditableField("Destination", "Drop_start_time_from_Hub", "text", task.Drop_start_time_from_Hub, taskIndex)}
              {renderEditableField("Inventory List", "Drop_Delivery_location_reached_time", "text", task.Drop_Delivery_location_reached_time, taskIndex)}
              {renderEditableField("Truck cost", "Drop_un_loading_start_time", "text", task.Drop_un_loading_start_time, taskIndex)}
              {renderEditableField("Fuel cost", "Drop_un_loading_end_time", "text", task.Drop_un_loading_end_time, taskIndex)}
              {renderEditableField("Food Cost", "Drop_Travel_start_from_delivery_location", "text", task.Drop_Travel_start_from_delivery_location, taskIndex)}
              {renderEditableField("Ferry charges", "Drop_Travel_end_destination", "text", task.Drop_Travel_end_destination, taskIndex)}
              {renderEditableField("Maintenance", "Drop_truck_cost", "text", task.Drop_truck_cost, taskIndex)}
              {renderEditableField("Maintenance", "Drop_Food", "text", task.Drop_Food, taskIndex)}
              {renderEditableField("Maintenance", "Drop_Fuel_cost", "text", task.Drop_Fuel_cost, taskIndex)}
            </div>
          )}
        </div>
      ))}
    </>
    
  );
};

export default Drop;

