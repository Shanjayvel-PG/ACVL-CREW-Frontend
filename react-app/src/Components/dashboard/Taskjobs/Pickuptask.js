
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import '../My Bookings/mybook.css';

// const Ptd = ({ currentInvoice, refreshPtd }) => {
//   const [tasks, setTasks] = useState([]);
//   const [isEditing, setIsEditing] = useState([]);
//   const [editedData, setEditedData] = useState([]);
//   const [columnMapping, setColumnMapping] = useState([]);
//   const [isExpanded, setIsExpanded] = useState([]); // State to manage expanded/collapsed state

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

//         const matchingTasks = dataRows.filter(task => task.INVOICE === currentInvoice && task.Task_Type === 'pickUp');
//         if (matchingTasks.length > 0) {
//           setTasks(matchingTasks);
//           setIsEditing(new Array(matchingTasks.length).fill(false));
//           setEditedData(new Array(matchingTasks.length).fill({}));
//           setIsExpanded(new Array(matchingTasks.length).fill(false)); // Initialize expanded state
//         } else {
//           console.warn('No matching tasks found for the invoice with Task_Type "Pick up".');
//         }
//       } catch (error) {
//         console.error('Error fetching task data:', error);
//       }
//     };

//     fetchTaskData();
//   }, [currentInvoice, refreshPtd]);

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

//   const toggleEdit = (taskIndex) => {
//     setIsEditing((prevIsEditing) => {
//       const newIsEditing = [...prevIsEditing];
//       newIsEditing[taskIndex] = !newIsEditing[taskIndex];
//       return newIsEditing;
//     });
//   };

//   const toggleExpand = (taskIndex) => {
//     setIsExpanded((prevIsExpanded) => {
//       const newIsExpanded = [...prevIsExpanded];
//       newIsExpanded[taskIndex] = !newIsExpanded[taskIndex];
//       return newIsExpanded;
//     });
//   };

  // const handleSave = async (taskIndex) => {
  //   try {
  //     const task = tasks[taskIndex];
  //     const updatedFields = {};

  //     for (const [columnName, value] of Object.entries(editedData[taskIndex])) {
  //       const columnIndex = columnMapping[columnName];
  //       if (columnIndex === undefined) {
  //         console.error(`Column mapping not found for: ${columnName}`);
  //         continue;
  //       }
  //       updatedFields[columnIndex] = { columnName, value };
  //     }

  //     const savePayload = {
  //       rowIndex: task.row_index,
  //       updatedFields,
  //     };

  //     await axios.post('http://localhost:9000/customer-detail/Task', savePayload);

  //     toggleEdit(taskIndex);
  //     alert('Task details updated successfully.');
  //   } catch (error) {
  //     console.error('Error saving task data:', error);
  //   }
  // };

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

//       setTasks(tasks.filter((_, index) => index !== taskIndex));
//     } catch (error) {
//       console.error('Error deleting task:', error);
//       alert('Failed to delete the task.');
//     }
//   };

//   return (
//     <>
//       {tasks.map((task, taskIndex) => (
//         <div key={task.Task_Id} className="detail-container" style={{ marginBottom: '20px' }}>
//           <div className="detail-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//             <h1>{task.Task_Id}</h1>
//               <button onClick={() => toggleExpand(taskIndex)}>
//                 {isExpanded[taskIndex] ? '-' : '+'}
//               </button>
//               </div>
//             <div className="button-group" style={{marginLeft:"15px"}}>
//               <button onClick={() => toggleEdit(taskIndex)}>
//                 {isEditing[taskIndex] ? 'Cancel' : 'Edit'}
//               </button>
//               {isEditing[taskIndex] && (
//                 <button onClick={() => handleSave(taskIndex)}>
//                   Save
//                 </button>
//               )}
            
//           </div>

//           {isExpanded[taskIndex] && ( 
//             <div className="team-details-my details-content-my3">
//               {Object.keys(columnMapping).map((key) => {
//                 if (key === 'row_index' || key === 'INVOICE' || key === 'Task_Type') return null; 

//                 const shouldDisplay = key.startsWith('Pick_up') || task[key]; 

//                 if (!shouldDisplay) return null;

//                 return (
//                   <div key={key}>
//                     <label>{key.replace(/_/g, ' ')}</label>
//                     <input
//                       type="text"
//                       name={key}
//                       value={editedData[taskIndex][key] || task[key] || ''}
//                       onChange={isEditing[taskIndex] ? (e) => handleInputChange(taskIndex, e) : null}
//                       readOnly={!isEditing[taskIndex]}
//                     />
//                   </div>
//                 );
//               })}
//             </div>
//           )}
//         </div>
//       ))}
//     </>
//   );
// };

// export default Ptd;


  // const renderEditableField = (label, field, type = "text", value, taskIndex) => (
  //   <div key={field} className="editable-field-container">
  //      <div className='editable-field-container2'>
  //       <div className="editable-field-container1">
  //         <label>{label}:</label>
  //       </div>
  //     </div>
  //     <div className='input-with-button'>
  //     {isEditing[taskIndex] ? (
  //       <input
  //         type={type}
  //         value={editedData[taskIndex][field] || value}
  //         onChange={(e) => handleInputChange(taskIndex, field, e.target.value)}
  //       />
  //     ) : (
  //       <span>{value}</span>
  //     )}
  //   </div>
  //   </div>
  // );


import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../My Bookings/mybook.css';
import DatePicker from 'react-datepicker'; // Assuming you're using react-datepicker
import 'react-datepicker/dist/react-datepicker.css';

const Ptd = ({ currentInvoice, refreshPtd }) => {
  const [tasks, setTasks] = useState([]);
  const [isEditing, setIsEditing] = useState([]); // Track whether the task is in edit mode
  const [editedData, setEditedData] = useState([]); // Track edited data
  const [columnMapping, setColumnMapping] = useState({});

  useEffect(() => {
    const fetchTaskData = async () => {
      try {
        const response = await axios.get('http://localhost:9000/zoho-data/Task');
        const { dataRows, columnMapping } = response.data;

        setColumnMapping(columnMapping);
        const matchingTasks = dataRows.filter(task => task.INVOICE === currentInvoice && task.Task_Type === 'pickUp');
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

      toggleEdit(taskIndex); // Turn off edit mode after saving
      alert('Task details updated successfully.');
    } catch (error) {
      console.error('Error saving task data:', error);
    }
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
          field === "Pick_up_Supply_charges" || field === "Pick_up_Food" || 
          field === "Pick_up_Truck_cost" || field === "Pick_up_Scaling_fee" || 
          field === "Pick_up_Fuel_cost" ? (
            <div className="currency-input">
              <input
                type="text"
                name={field}
                value={editedData[taskIndex][field] !== undefined 
                        ? editedData[taskIndex][field] 
                        : value} // Use the raw value during editing
                onChange={(e) => {
                  const amount = e.target.value.replace(/[^0-9.]/g, ''); 
                  handleInputChange(taskIndex, field, amount); // Pass raw value here
                }}
                placeholder="CA$ 0.00"
              />
            </div>
          ) : (
            <input
              type={type}
              value={editedData[taskIndex][field] || value}
              onChange={(e) => handleInputChange(taskIndex, field, e.target.value)}
            />
          )
        ) : (
          // Format the value when not in edit mode
          <span>{value ? `CA$ ${parseFloat(value).toFixed(2)}` : ''}</span>
        )}
      </div>
    </div>
  );
  
  // const renderEditableField = (label, field, type = "text", value, taskIndex) => (
  //   <div key={field} className="editable-field-container">
  //     <div className="editable-field-container2">
  //       <div className="editable-field-container1">
  //         <label>{label}:</label>
  //       </div>
  //     </div>
  //     <div className="input-with-button">
  //       {isEditing[taskIndex] ? (
  //         field === "Pick_up_Supply_charges" || field === "Pick_up_Food" ||field === "Pick_up_Truck_cost" ||field === "Pick_up_Scaling_fee" || field === "Pick_up_Fuel_cost" ? (
  //           <div className="currency-input">
  //             <input
  //               type="text"
  //               name={field}
  //               value={value ? `CA$ ${value}` : ''}
  //               onChange={(e) => {
  //                 const amount = e.target.value.replace(/[^0-9.]/g, ''); 
  //                 handleInputChange(taskIndex, field, amount); 
  //               }}
  //               placeholder="CA$ 0.00"
  //             />
  //           </div>
  //         ) : (
  //           <input
  //             type={type}
  //             value={editedData[taskIndex][field] || value}
  //             onChange={(e) => handleInputChange(taskIndex, field, e.target.value)}
  //           />
  //         )
  //       ) : (
  //         <span>{value}</span>
  //       )}
  //     </div>
  //   </div>
  // );
  


  return (
    <>
      {tasks.map((task, taskIndex) => (
        <div key={task.Task_Id} className="detail-container" style={{ marginBottom: '20px' }}>
          <div className="detail-header">
            <h1>{task.Task_Id}</h1>
            <div className="button-group" style={{marginLeft:'15px'}}>
              <button onClick={() => toggleEdit(taskIndex)}>
                {isEditing[taskIndex] ? 'Cancel' : 'Edit'}
              </button>
              {isEditing[taskIndex] && (
                <button onClick={() => handleSave(taskIndex)}>
                  Save
                </button>
              )}
            </div>
          </div>
          <div className="team-details-my details-content-my">
            {renderEditableField("Customer Instructions", "Pick_up_Customer_Instructions", "text", task.Pick_up_Customer_Instructions, taskIndex)}
            {renderEditableField("Crew Leader Assigned", "Pick_up_Crew_Leader_Assigned", "text", task.Pick_up_Crew_Leader_Assigned, taskIndex)}
            {renderEditableField("Crew Leader Contact", "Pick_up_Crew_Leader_Contact", "text", task.Pick_up_Crew_Leader_Contact, taskIndex)}
            {renderEditableField("Crew members", "Pick_up_Crew_members", "text", task.Pick_up_Crew_members, taskIndex)}
            {renderEditableField("Truck Details", "Pick_up_Truck_Details", "text", task.Pick_up_Truck_Details, taskIndex)}
            {renderEditableField("Truck Owner", "Pick_up_Truck_Owner", "text", task.Pick_up_Truck_Owner, taskIndex)}
            {renderEditableField("Truck size", "Pick_up_Truck_size", "text", task.Pick_up_Truck_size, taskIndex)}
            {renderEditableField("Hub", "Pick_up_Hub", "text", task.Pick_up_Hub, taskIndex)}
            {renderEditableField("Truck Capacity", "Pick_up_Truck_Capacity", "text", task.Pick_up_Truck_Capacity, taskIndex)}
            {renderEditableField("start time from Hub", "Pick_up_start_time_from_Hub", "text", task.Pick_up_start_time_from_Hub, taskIndex)}
            {renderEditableField("Pick up location reached time", "Pick_up_Pick_up_location_reached_time", "text", task.Pick_up_Pick_up_location_reached_time, taskIndex)}
            {renderEditableField("Truck cost", "Pick_up_Truck_cost", "text", task.Pick_up_Truck_cost, taskIndex)}
            {renderEditableField("Food Cost", "Pick_up_Food", "text", task.Pick_up_Food, taskIndex)}
            {renderEditableField("Fuel cost", "Pick_up_Fuel_cost", "text", task.Pick_up_Fuel_cost, taskIndex)}
            {renderEditableField("Scaling fee", "Pick_up_Scaling_fee", "text", task.Pick_up_Scaling_fee, taskIndex)}
            {renderEditableField("Supply charges", "Pick_up_Supply_charges", "text", task.Pick_up_Supply_charges, taskIndex)}
          </div>
        </div>
      ))}
    </>
  );
};

export default Ptd;

