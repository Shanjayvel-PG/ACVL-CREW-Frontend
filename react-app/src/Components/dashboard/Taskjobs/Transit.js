
// // import React, { useState, useEffect } from 'react';
// // import axios from 'axios';
// // import '../My Bookings/mybook.css';

// // const Transit = ({ currentInvoice,  refreshPtd }) => {
// //   const [tasks, setTasks] = useState([]); 
// //   const [isEditing, setIsEditing] = useState([]); 
// //   const [editedData, setEditedData] = useState([]); 
// //   const [columnMapping, setColumnMapping] = useState({});

// //   useEffect(() => {
// //     const fetchTaskData = async () => {
// //       try {
// //         const response = await axios.get('http://localhost:9000/zoho-data/Task');
// //         const { dataRows, columnMapping } = response.data;
// //         if (!columnMapping) {
// //           console.error('API did not return columnMapping');
// //         } else {
// //           setColumnMapping(columnMapping);
// //         }

// //         const matchingTasks = dataRows.filter(task => task.INVOICE === currentInvoice && task.Task_Type === 'transit');
// //         if (matchingTasks.length > 0) {
// //           setTasks(matchingTasks);
// //           setIsEditing(new Array(matchingTasks.length).fill(false));
// //           setEditedData(new Array(matchingTasks.length).fill({}));
// //         } else {
// //           console.warn('No matching tasks found for the invoice with Task_Type "Pick up".');
// //         }
// //       } catch (error) {
// //         console.error('Error fetching task data:', error);
// //       }
// //     };

// //     fetchTaskData();
// //   }, [currentInvoice,  refreshPtd]);

// //   const handleInputChange = (taskIndex, e) => {
// //     const { name, value } = e.target;
// //     setEditedData((prevEditedData) => {
// //       const newEditedData = [...prevEditedData];
// //       newEditedData[taskIndex] = {
// //         ...newEditedData[taskIndex],
// //         [name]: value,
// //       };
// //       return newEditedData;
// //     });
// //   };

// //   // Toggle between edit and view mode for a specific task
// //   const toggleEdit = (taskIndex) => {
// //     setIsEditing((prevIsEditing) => {
// //       const newIsEditing = [...prevIsEditing];
// //       newIsEditing[taskIndex] = !newIsEditing[taskIndex];
// //       return newIsEditing;
// //     });
// //   };

// //   // Save changes for a specific task
// //   const handleSave = async (taskIndex) => {
// //     try {
// //       const task = tasks[taskIndex];
// //       const updatedFields = {};

// //       for (const [columnName, value] of Object.entries(editedData[taskIndex])) {
// //         const columnIndex = columnMapping[columnName];
// //         if (columnIndex === undefined) {
// //           console.error(`Column mapping not found for: ${columnName}`);
// //           continue;
// //         }
// //         updatedFields[columnIndex] = { columnName, value };
// //       }

// //       const savePayload = {
// //         rowIndex: task.row_index,
// //         updatedFields,
// //       };

// //       await axios.post('http://localhost:9000/customer-detail/Task', savePayload);

// //       toggleEdit(taskIndex);
// //       alert('Task details updated successfully.');
// //     } catch (error) {
// //       console.error('Error saving task data:', error);
// //     }
// //   };

// //   const handleDelete = async (taskIndex) => {
// //     try {
// //       const task = tasks[taskIndex];
// //       const deletePayload = {
// //         conditions: [
// //           { column: 'INVOICE', value: task.INVOICE },
// //           { column: 'Task_Id', value: task.Task_Id },
// //           { column: 'Task_Type', value: task.Task_Type },
// //         ],
// //       };

// //       await axios.delete('http://localhost:9000/zoho-data/Task', { data: deletePayload });

// //       alert('Task deleted successfully.');

// //       setTasks(tasks.filter((_, index) => index !== taskIndex));
// //     } catch (error) {
// //       console.error('Error deleting task:', error);
// //       alert('Failed to delete the task.');
// //     }
// //   };


// //   return (
// //     <>
// //       {tasks.map((task, taskIndex) => (
// //         <div key={task.Task_Id} className="detail-container" style={{ marginBottom: '20px' }}>
// //           <div className="detail-header">
// //             <h1>{task.Task_Id}</h1>
// //             <div className="button-group">
// //               <button onClick={() => toggleEdit(taskIndex)}>
// //                 {isEditing[taskIndex] ? 'Cancel' : 'Edit'}
// //               </button>
// //               {isEditing[taskIndex] && (
// //                 <button onClick={() => handleSave(taskIndex)}>
// //                   Save
// //                 </button>
// //               )}
// //               {/* Uncomment this if you want the delete button */}
// //               {/* 
// //               <button onClick={() => handleDelete(taskIndex)} style={{ marginLeft: 'auto', color: '#fff' }}>
// //                 Delete Task
// //               </button> 
// //               */}
// //             </div>
// //           </div>

// //           <div className="team-details-my details-content-my3">
// //             {Object.keys(columnMapping).map((key) => {
// //               if (key === 'row_index' || key === 'INVOICE' || key === 'Task_Type') return null; // Skip these fields

// //               const shouldDisplay = key.startsWith('Transit') || task[key]; // Display if 'Transit_' or has a value

// //               if (!shouldDisplay) return null;

// //               return (
// //                 <div key={key}>
// //                   <label>{key.replace(/_/g, ' ')}</label>
// //                   <input
// //                     type="text"
// //                     name={key}
// //                     value={editedData[taskIndex][key] || task[key] || ''}
// //                     onChange={isEditing[taskIndex] ? (e) => handleInputChange(taskIndex, e) : null}
// //                     readOnly={!isEditing[taskIndex]}
// //                   />
// //                 </div>
// //               );
// //             })}
// //           </div>
// //         </div>
// //       ))}
// //     </>
// //   );
// // };

// // export default Transit;


// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import '../My Bookings/mybook.css';
// import DatePicker from 'react-datepicker'; 
// import 'react-datepicker/dist/react-datepicker.css';
// import Select from 'react-select';

// const Transit = ({ currentInvoice, refreshPtd }) => {
//   const [tasks, setTasks] = useState([]);
//   const [isEditing, setIsEditing] = useState([]); 
//   const [editedData, setEditedData] = useState([]);
//   const [columnMapping, setColumnMapping] = useState({});
//   const [collapsed, setCollapsed] = useState([]);
//   const [TruckDetailsOptions, setTruckDetailsOptions] = useState([]);
//   const [OwnerOptions, setOwnerOptions] = useState([]);
//   const [HubOptions, setHubOptions] = useState([]);
//   const [CapacityOptions, setCapacityOptions] = useState([]);
//   const [TruckTypeOptions, setTruckTypeOptions] = useState([]);
//   const [manualInputs, setManualInputs] = useState({
//     Transit_Truck_Owner: "",
//     Transit_Truck_size: "",
//     Transit_Hub: "",
//     Transit_Truck_Capacity: "",
//   });

//   const fetchTaskData = async () => {
//     try {
//       const response = await axios.get('http://localhost:9000/zoho-data/Task');
//       const { dataRows, columnMapping } = response.data;

//       setColumnMapping(columnMapping);
//       const matchingTasks = dataRows.filter(task => task.INVOICE === currentInvoice && task.Task_Type === 'transit');
//       if (matchingTasks.length > 0) {
//         setTasks(matchingTasks);
//         setIsEditing(new Array(matchingTasks.length).fill(false)); 
//         setEditedData(new Array(matchingTasks.length).fill({})); 
//       }
//     } catch (error) {
//       console.error('Error fetching task data:', error);
//     }
//   };

//   useEffect(() => {
//     fetchTaskData();
//   }, [currentInvoice, refreshPtd]);

//   const fetchAssignedToOptions = async () => {
//     try {
//       const response = await axios.get('http://localhost:9000/zoho-data/Assigned-To-Name');
//       if (response.data && response.data.records) {
//         const TruckDetails = response.data.records.map(record => record.TruckDetails);
//         const Owner = response.data.records.map(record => record.Owner);
//         const TruckType = response.data.records.map(record => record.TruckType);
//         const Hub = response.data.records.map(record => record.Hub);
//         const Capacity = response.data.records.map(record => record.Capacity);
//         setTruckDetailsOptions(TruckDetails);
//         setOwnerOptions(Owner);
//         setTruckTypeOptions(TruckType);
//         setHubOptions(Hub);
//         setCapacityOptions(Capacity);
//       } else {
//         console.log('No records found in response');
//         setTruckDetailsOptions([]);
//       }
//     } catch (error) {
//       console.error('Error fetching assigned to options:', error);
//       setTruckDetailsOptions([]);
//     }
//   };

//   useEffect(() => {
//     fetchAssignedToOptions();
//   }, []);

//   const handleInputChange = (taskIndex, field, value) => {
//     setEditedData((prevEditedData) => {
//       const newEditedData = [...prevEditedData];
//       newEditedData[taskIndex] = {
//         ...newEditedData[taskIndex],
//         [field]: value,
//       };
//       return newEditedData;
//     });
//     setManualInputs((prevInputs) => ({
//       ...prevInputs,
//       [field]: value,
//     }));
//   };

//   const toggleEdit = (taskIndex) => {
//     setIsEditing((prevEditing) => {
//       const newEditing = [...prevEditing];
//       newEditing[taskIndex] = !newEditing[taskIndex];
//       return newEditing;
//     });
//   };

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

//       toggleEdit(taskIndex); 
//       alert('Task details updated successfully.');
//     } catch (error) {
//       console.error('Error saving task data:', error);
//     }
//   };

//   const toggleCollapse = (taskIndex) => {
//     setCollapsed((prevCollapsed) => {
//       const newCollapsed = [...prevCollapsed];
//       newCollapsed[taskIndex] = !newCollapsed[taskIndex];
//       return newCollapsed;
//     });
//   };

//   const handleTruckDetailsChange = (selectedOption) => {
//     const value = selectedOption?.value || "";
//     const selectedIndex = TruckDetailsOptions.findIndex(option => option === value);

//     handleInputChange(0, "Transit_Truck_Details", value);  

//     if (selectedIndex >= 0) {
//       handleInputChange(0, "Transit_Truck_Owner", OwnerOptions[selectedIndex] || "");
//       handleInputChange(0, "Transit_Truck_size", TruckTypeOptions[selectedIndex] || "");
//       handleInputChange(0, "Transit_Hub", HubOptions[selectedIndex] || "");
//       handleInputChange(0, "Transit_Truck_Capacity", CapacityOptions[selectedIndex] || "");
//     } else {
 
//       handleInputChange(0, "Transit_Truck_Owner", "");
//       handleInputChange(0, "Transit_Truck_size", "");
//       handleInputChange(0, "Transit_Hub", "");
//       handleInputChange(0, "Transit_Truck_Capacity", "");
//     }
//   };

//   const options11 = TruckDetailsOptions
//   .filter(option => option && option.trim() !== '')
//   .map(option => ({ label: option, value: option }));

//   const renderEditableField = (label, field, type = "text", value, taskIndex) => (
//     <div key={field} className="editable-field-container">
//       <div className="editable-field-container2">
//         <div className="editable-field-container1">
//           <label>{label}:</label>
//         </div>
//       </div>
//       <div className="input-with-button">
//         {isEditing[taskIndex] ? (
//           field === "Transit_Truk_cost" || field === "Transit_Fuel_Cost" || 
//           field === "Transit_Food_Cost" || field === "Transit_Ferry_charges" || 
//           field === "Transit_Maintenance" ? (
//             <div className="currency-input">
//               <input
//                 type="text"
//                 name={field}
//                 value={`CA$ ${editedData[taskIndex][field] !== undefined && editedData[taskIndex][field] !== ''
//                   ? editedData[taskIndex][field]
//                   : (value !== undefined && value !== '' ? value : "0.00")}`}
//                 onChange={(e) => {
//                   const amount = e.target.value.replace(/[^0-9.]/g, ''); 
//                   handleInputChange(taskIndex, field, amount); 
//                 }}
//                 placeholder="CA$ 0.00"
//               />
//             </div>
//           ) : field === "Transit_Truck_Details" ? (
//             <Select
//               value={options11.find(option => option.value === (editedData[taskIndex][field] || value))} 
//               onChange={handleTruckDetailsChange}
//               options={options11}
//               isClearable
//             />
//           ) : field === "Transit_start_time_from_Hub"  ? (
//             <DatePicker
//               selected={editedData[taskIndex][field] 
//                 ? new Date(`1970-01-01T${editedData[taskIndex][field]}:00`)
//                 : (value ? new Date(`1970-01-01T${value}:00`) : null)} 
//               onChange={(time) => {
//                 const formattedTime = time
//                   ? `${time.getHours()}:${String(time.getMinutes()).padStart(2, "0")}`
//                   : "";
//                 handleInputChange(taskIndex, field, formattedTime); 
//               }}
//               showTimeSelect
//               showTimeSelectOnly
//               timeIntervals={15}
//               timeCaption="Time"
//               dateFormat="HH:mm"
//             />
//           ) : (
//             <input
//               type={type}
//               value={editedData[taskIndex][field] || value}
//               onChange={(e) => handleInputChange(taskIndex, field, e.target.value)}
//             />
//           )
//         ) : field === "Transit_start_time_from_Hub" ? (
//             <span>{value ? value : 'No time set'}</span>
//         ) : field === "Transit_Truk_cost" || field === "Transit_Fuel_Cost" || 
//         field === "Transit_Food_Cost" || field === "Transit_Ferry_charges" || 
//         field === "Transit_Maintenance" ? (
//             <input 
//                 type="text" 
//                 value={value ? `CA$ ${value}` : 'CA$ 0.00'} 
//                 readOnly 
//             />
//         ): field === "Transit_Truck_Details" ? (
//           <input
//           type={type}
//           value={value}
//           readOnly
//         />
//         ) : (
//           <input
//           type={type}
//           value={value}
//           readOnly
//         />
//         )}
//       </div>
//     </div>
//   );
 
//   return (
//     <>
//       {tasks.map((task, taskIndex) => (
//         <div key={task.Task_Id} className="detail-container" style={{ marginBottom: '20px' }}>
//           <div className="detail-header" >
//             <h1>{task.Task_Id} 
//               <span 
//                 onClick={() => toggleCollapse(taskIndex)} 
//                 style={{ cursor: 'pointer', marginLeft: 'auto' }}
//               >
//                 {collapsed[taskIndex] ? '+' : '-'}
//             </span>
//             </h1>
//             </div>
//             <div className="button-group" style={{ marginLeft: '15px', display: 'flex', alignItems: 'center' }}>
//               <button onClick={() => toggleEdit(taskIndex)}>
//                 {isEditing[taskIndex] ? 'Cancel' : 'Edit'}
//               </button>
//               {isEditing[taskIndex] && (
//                 <button onClick={() => handleSave(taskIndex)} style={{ marginLeft: '5px' }}>
//                   Save
//                 </button>
//               )}
//             </div>
//           {!collapsed[taskIndex] && ( 
//             <div className="team-details-my details-content-my">
//               {renderEditableField("Crew Leader Assigned", "Transit_Crew_Leader_Assigned", "text", task.Transit_Crew_Leader_Assigned, taskIndex)}
//               {renderEditableField("Crew Leader Contact", "Transit_Crew_Leader_Contact", "text", task.Transit_Crew_Leader_Contact, taskIndex)}
//               {renderEditableField("Crew members", "Transit_Crew_members", "text", task.Transit_Crew_members, taskIndex)}
//               {renderEditableField("Truck Details", "Transit_Truck_Details", "text", task.Transit_Truck_Details, taskIndex)}
//               {renderEditableField("Truck Owner", "Transit_Truck_Owner", "text", task.Transit_Truck_Owner, taskIndex)}
//               {renderEditableField("Truck size", "Transit_Truck_size", "text", task.Transit_Truck_size, taskIndex)}
//               {renderEditableField("Hub", "Transit_Hub", "text", task.Transit_Hub, taskIndex)}
//               {renderEditableField("Truck Capacity", "Transit_Truck_Capacity", "text", task.Transit_Truck_Capacity, taskIndex)}
//               {renderEditableField("start time from Hub", "Transit_start_time_from_Hub", "text", task.Transit_start_time_from_Hub, taskIndex)}
//               {renderEditableField("Destination", "Transit_Destination", "text", task.Transit_Destination, taskIndex)}
//               {renderEditableField("Inventory List", "Transit_Inventory_List", "text", task.Transit_Inventory_List, taskIndex)}
//               {renderEditableField("Truck cost", "Transit_Truk_cost", "text", task.Transit_Truk_cost, taskIndex)}
//               {renderEditableField("Fuel cost", "Transit_Fuel_Cost", "text", task.Transit_Fuel_Cost, taskIndex)}
//               {renderEditableField("Food Cost", "Transit_Food_Cost", "text", task.Transit_Food_Cost, taskIndex)}
//               {renderEditableField("Ferry charges", "Transit_Ferry_charges", "text", task.Transit_Ferry_charges, taskIndex)}
//               {renderEditableField("Maintenance", "Transit_Maintenance", "text", task.Transit_Maintenance, taskIndex)}
//             </div>
//           )}
//         </div>
//       ))}
//     </>
    
//   );
// };

// export default Transit;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../My Bookings/mybook.css';
import DatePicker from 'react-datepicker'; 
import 'react-datepicker/dist/react-datepicker.css';
import Select from 'react-select';

const Transit = ({ currentInvoice, refreshPtd }) => {
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
      const matchingTasks = dataRows.filter(task => task.Record_ID === currentInvoice && task.Task_Type === 'Transit');
      if (matchingTasks.length > 0) {
        setTasks(matchingTasks);
        setIsEditing(new Array(matchingTasks.length).fill(false)); 
        setEditedData(new Array(matchingTasks.length).fill({})); 
        setCollapsed(new Array(matchingTasks.length).fill(false)); 
      }
    } catch (error) {
      console.error('Error fetching task data:', error);
    }
  };

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
      fetchTaskData();
    } catch (error) {
      console.error('Error saving task data:', error);
    }finally {
      setLoading(false); 
    }
  };

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

    handleInputChange(taskIndex, "Transit_Truck_Details", value);  

    if (selectedIndex >= 0) {
      handleInputChange(taskIndex, "Transit_Truck_Owner", OwnerOptions[selectedIndex] || "");
      handleInputChange(taskIndex, "Transit_Truck_size", TruckTypeOptions[selectedIndex] || "");
      handleInputChange(taskIndex, "Transit_Hub", HubOptions[selectedIndex] || "");
      handleInputChange(taskIndex, "Transit_Truck_Capacity", CapacityOptions[selectedIndex] || "");
    } else {
      handleInputChange(taskIndex, "Transit__Truck_Owner", "");
      handleInputChange(taskIndex, "Transit_Truck_size", "");
      handleInputChange(taskIndex, "Transit_Hub", "");
      handleInputChange(taskIndex, "Transit_Truck_Capacity", "");
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
          field === "Transit_Truck_Details" ? (
            <Select
              value={options11.find(option => option.value === (editedData[taskIndex][field] || value))} 
              onChange={(selectedOption) => handleTruckDetailsChange(taskIndex, selectedOption)}
              options={options11}
              isClearable
            />
          ) : field === "Transit_Truk_cost" || field === "Transit_Fuel_Cost" || 
          field === "Transit_Food_Cost" || field === "Transit_Ferry_charges" || 
          field === "Transit_Maintenance" ? (
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
          ) : field === "Transit_start_time_from_Hub" ? (
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
            <span>
              {value ? value : 'No time set'}
            </span>
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
                  {renderEditableField("Crew Leader Assigned", "Transit_Crew_Leader_Assigned", "text", task.Transit_Crew_Leader_Assigned, taskIndex)}
                  {renderEditableField("Crew Leader Contact", "Transit_Crew_Leader_Contact", "text", task.Transit_Crew_Leader_Contact, taskIndex)}
                  {renderEditableField("Crew members", "Transit_Crew_members", "text", task.Transit_Crew_members, taskIndex)}
                  {renderEditableField("Truck Details", "Transit_Truck_Details", "text", task.Transit_Truck_Details, taskIndex)}
                  {renderEditableField("Truck Owner", "Transit_Truck_Owner", "text", task.Transit_Truck_Owner, taskIndex)}
                  {renderEditableField("Truck size", "Transit_Truck_size", "text", task.Transit_Truck_size, taskIndex)}
                  {renderEditableField("Hub", "Transit_Hub", "text", task.Transit_Hub, taskIndex)}
                  {renderEditableField("Truck Capacity", "Transit_Truck_Capacity", "text", task.Transit_Truck_Capacity, taskIndex)}
                </div>
                <hr/>
                <div className="team-details-my details-content-my">
                  {renderEditableField("start time from Hub", "Transit_start_time_from_Hub", "text", task.Transit_start_time_from_Hub, taskIndex)}
                  {renderEditableField("Destination", "Transit_Destination", "text", task.Transit_Destination, taskIndex)}
                  {renderEditableField("Inventory List", "Transit_Inventory_List", "text", task.Transit_Inventory_List, taskIndex)}
                  {renderEditableField("Truck cost", "Transit_Truk_cost", "text", task.Transit_Truk_cost, taskIndex)}
                  {renderEditableField("Fuel cost", "Transit_Fuel_Cost", "text", task.Transit_Fuel_Cost, taskIndex)}
                  {renderEditableField("Food Cost", "Transit_Food_Cost", "text", task.Transit_Food_Cost, taskIndex)}
                  {renderEditableField("Ferry charges", "Transit_Ferry_charges", "text", task.Transit_Ferry_charges, taskIndex)}
                  {renderEditableField("Maintenance", "Transit_Maintenance", "text", task.Transit_Maintenance, taskIndex)}
                </div>
              </div>
            </div>
          )}
        </div>
      ))}
    </>
  );
};

export default Transit;