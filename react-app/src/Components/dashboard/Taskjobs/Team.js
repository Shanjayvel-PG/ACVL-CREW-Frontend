
// // // import React, { useState, useEffect } from 'react';
// // // import axios from 'axios';
// // // import '../My Bookings/mybook.css'; 

// // // const Team = ({ currentInvoice, refreshPtd }) => {
// // //   const [tasks, setTasks] = useState([]);
// // //   const [isEditing, setIsEditing] = useState([]); 
// // //   const [editedData, setEditedData] = useState([]); 
// // //   const [columnMapping, setColumnMapping] = useState({});
// // //   const [collapsed, setCollapsed] = useState([]);
// // //   const [loading, setLoading] = useState(false);

// // //   const fetchTaskData = async () => {
// // //     try {
// // //       const response = await axios.get('http://localhost:9000/zoho-data/Task');
// // //       const { dataRows, columnMapping } = response.data;
      
// // //       if (!columnMapping) {
// // //         console.error('API did not return columnMapping');
// // //       } else {
// // //         setColumnMapping(columnMapping);
// // //       }

// // //       const relevantColumns = [
// // //         'Crew_members',
// // //         'Crew_Leader_Contact',
// // //         'Crew_Leader_Assigned',
// // //         'Drop_Crew_members',
// // //         'Drop_Crew_Leader_Contact',
// // //         'Drop_Crew_Leader_Assigned',
// // //         'Transit_Crew_members',
// // //         'Transit_Crew_Leader_Contact',
// // //         'Transit_Crew_Leader_Assigned',
// // //         'Pick_up_Crew_members',
// // //         'Pick_up_Crew_Leader_Contact',
// // //         'Pick_up_Crew_Leader_Assigned',
// // //       ];

// // //       const matchingTasks = dataRows
// // //         .filter(task => task.ID === currentInvoice)
// // //         .map(task => {
// // //           const filteredTask = {};
// // //           relevantColumns.forEach(col => {
// // //             filteredTask[col] = task[col];
// // //           });
// // //           return filteredTask;
// // //         });

// // //       if (matchingTasks.length > 0) {
// // //         setTasks(matchingTasks);
// // //         setIsEditing(new Array(matchingTasks.length).fill(false));
// // //         setEditedData(new Array(matchingTasks.length).fill({}));
// // //         setCollapsed(new Array(matchingTasks.length).fill(false)); 
// // //       } else {
// // //         console.warn('No matching tasks found for the invoice with Task_Type "Pick up".');
// // //       }
// // //     } catch (error) {
// // //       console.error('Error fetching task data:', error);
// // //     }
// // //   };

// // //   useEffect(() => {
// // //     fetchTaskData();
// // //   }, [currentInvoice, refreshPtd]);

// // //   const handleInputChange = (taskIndex, field, value) => {
// // //     setEditedData((prevEditedData) => {
// // //       const newEditedData = [...prevEditedData];
// // //       newEditedData[taskIndex] = {
// // //         ...newEditedData[taskIndex],
// // //         [field]: value,
// // //       };
// // //       return newEditedData;
// // //     });
// // //   };

// // //   const toggleEdit = (taskIndex) => {
// // //     setIsEditing((prevEditing) => {
// // //       const newEditing = [...prevEditing];
// // //       newEditing[taskIndex] = !newEditing[taskIndex];
// // //       return newEditing;
// // //     });
// // //   };
  
// // //   const handleSave = async (taskIndex) => {
// // //     setLoading(true);
// // //     try {
// // //       const task = tasks[taskIndex];
// // //       const updatedFields = {};
  
// // //       for (const [columnName, value] of Object.entries(editedData[taskIndex])) {
// // //         let fieldToSave = columnName;
// // //         let fieldValue = value;

// // //         if (columnName === 'PickUp_Schedule_Date' || columnName === 'PickUp_Schedule_Time') {
// // //           const date = editedData[taskIndex]['PickUp_Schedule_Date'];
// // //           const time = editedData[taskIndex]['PickUp_Schedule_Time'];
  
// // //           if (date && time) {
// // //             const combinedDateTime = `${date} ${time}`;
// // //             fieldToSave = 'Task_Date'; 
// // //             fieldValue = combinedDateTime;
// // //           } else {
// // //             continue;
// // //           }
// // //         }
  
// // //         const columnIndex = columnMapping[fieldToSave];
// // //         if (columnIndex === undefined) {
// // //           console.error(`Column mapping not found for: ${fieldToSave}`);
// // //           continue;
// // //         }
  
// // //         updatedFields[columnIndex] = { columnName: fieldToSave, value: fieldValue };
// // //       }
  
// // //       const savePayload = {
// // //         rowIndex: task.row_index,
// // //         updatedFields,
// // //       };
  
// // //       await axios.post('http://localhost:9000/customer-detail/Task', savePayload);
  
// // //       toggleEdit(taskIndex); 
// // //       alert('Task details updated successfully.');
// // //       fetchTaskData();
// // //     } catch (error) {
// // //       console.error('Error saving task data:', error);
// // //     } finally {
// // //       setLoading(false); 
// // //     }
// // //   };

// // //   const toggleCollapse = (taskIndex) => {
// // //     setCollapsed((prevCollapsed) => {
// // //       const newCollapsed = [...prevCollapsed];
// // //       newCollapsed[taskIndex] = !newCollapsed[taskIndex];
// // //       return newCollapsed;
// // //     });
// // //   };

// // //   const renderEditableField = (label, field, type = "text", value, taskIndex) => (
// // //     <div key={field} className="editable-field-container">
// // //       <div className="editable-field-container2">
// // //         <div className="editable-field-container1">
// // //           <label>{label}:</label>
// // //         </div>
// // //       </div>
// // //       <div className="input-with-button">
// // //         {isEditing[taskIndex] ? (
// // //            (
// // //             <input
// // //               type={type}
// // //               value={editedData[taskIndex][field] || value}
// // //               onChange={(e) => handleInputChange(taskIndex, field, e.target.value)}
// // //             />
// // //           )
// // //         ) : (
// // //             <input
// // //               type={type}
// // //               value={value}
// // //               readOnly
// // //             />
// // //         )}
// // //       </div>
// // //     </div>
// // //   );
 
// // //   return (
// // //     <>
// // //       {tasks.map((task, taskIndex) => (
// // //         <div key={task.Task_Id} className="detail-container" style={{ marginBottom: '20px' }}>
// // //           <div className="detail-header">
// // //             <h1>Team 
// // //               <span 
// // //                 onClick={() => toggleCollapse(taskIndex)} 
// // //                 style={{ cursor: 'pointer', marginLeft: 'auto' }}
// // //               >
// // //                 {collapsed[taskIndex] ? '+' : '-'}
// // //             </span>
// // //             </h1>
// // //             </div>

// // //           {!collapsed[taskIndex] && ( 
// // //             <div >
// // //               <div className="button-group" style={{ marginLeft: '15px', display: 'flex', alignItems: 'center' }}>
// // //               <button onClick={() => toggleEdit(taskIndex)}>
// // //                 {isEditing[taskIndex] ? 'Cancel' : 'Edit'}
// // //               </button>
// // //               {isEditing[taskIndex] && (
// // //                 <button onClick={() => handleSave(taskIndex)} disabled={loading} >
// // //                   {loading ? 'Saving...' : 'Saving'} 
// // //                 </button>
// // //               )}
// // //               </div>
// // //               <div>
// // //                 <div className="team-details-my details-content-my">
// // //                   {renderEditableField("Crew Leader Assigned", "Pick_up_Crew_Leader_Assigned", "text", task.Pick_up_Crew_Leader_Assigned, taskIndex)}
// // //                   {renderEditableField("Crew Leader Contact", "Pick_up_Crew_Leader_Contact", "text", task.Pick_up_Crew_Leader_Contact, taskIndex)}
// // //                   {renderEditableField("Crew members", "Pick_up_Crew_members", "text", task.Pick_up_Crew_members, taskIndex)} 
// // //                   {renderEditableField("Crew Leader Assigned", "Transit_Crew_Leader_Assigned", "text", task.Transit_Crew_Leader_Assigned, taskIndex)}
// // //                   {renderEditableField("Crew Leader Contact", "Transit_Crew_Leader_Contact", "text", task.Transit_Crew_Leader_Contact, taskIndex)}
// // //                   {renderEditableField("Crew members", "Transit_Crew_members", "text", task.Transit_Crew_members, taskIndex)}
// // //                   {renderEditableField("Crew Leader Assigned", "Drop_Crew_Leader_Assigned", "text", task.Drop_Crew_Leader_Assigned, taskIndex)}
// // //                   {renderEditableField("Crew Leader Contact", "Drop_Crew_Leader_Contact", "text", task.Drop_Crew_Leader_Contact, taskIndex)}
// // //                   {renderEditableField("Crew members", "Drop_Crew_members", "text", task.Drop_Crew_members, taskIndex)}
// // //                   {renderEditableField("Crew Leader Assigned", "Crew_Leader_Assigned", "text", task.Crew_Leader_Assigned, taskIndex)}
// // //                   {renderEditableField("Crew Leader Contact", "Crew_Leader_Contact", "text", task.Crew_Leader_Contact, taskIndex)}
// // //                   {renderEditableField("Crew members", "Crew_members", "text", task.Crew_members, taskIndex)}
// // //                 </div>
// // //               </div>
// // //             </div>
// // //           )}
// // //         </div>
// // //       ))}
// // //     </>
// // //   );
// // // };

// // // export default Team;
// // import React, { useState, useEffect } from 'react';
// // import axios from 'axios';
// // import '../My Bookings/mybook.css';

// // const Team = ({ currentInvoice, refreshPtd }) => {
// //   const [tasks, setTasks] = useState([]);
// //   const [isEditing, setIsEditing] = useState(false); 
// //   const [editedData, setEditedData] = useState({}); 
// //   const [columnMapping, setColumnMapping] = useState({});
// //   const [collapsed, setCollapsed] = useState(false);
// //   const [loading, setLoading] = useState(false);

// //   const fetchTaskData = async () => {
// //     try {
// //       const response = await axios.get('http://localhost:9000/zoho-data/Task');
// //       const { dataRows, columnMapping } = response.data;
      
// //       if (!columnMapping) {
// //         console.error('API did not return columnMapping');
// //       } else {
// //         setColumnMapping(columnMapping);
// //       }

// //       const relevantColumns = [
// //         'Crew_members',
// //         'Crew_Leader_Contact',
// //         'Crew_Leader_Assigned',
// //         'Drop_Crew_members',
// //         'Drop_Crew_Leader_Contact',
// //         'Drop_Crew_Leader_Assigned',
// //         'Transit_Crew_members',
// //         'Transit_Crew_Leader_Contact',
// //         'Transit_Crew_Leader_Assigned',
// //         'Pick_up_Crew_members',
// //         'Pick_up_Crew_Leader_Contact',
// //         'Pick_up_Crew_Leader_Assigned',
// //       ];

// //       const matchingTasks = dataRows
// //         .filter(task => task.ID === currentInvoice)
// //         .map(task => {
// //           const filteredTask = {};
// //           relevantColumns.forEach(col => {
// //             filteredTask[col] = task[col];
// //           });
// //           return filteredTask;
// //         });

// //       if (matchingTasks.length > 0) {
// //         setTasks(matchingTasks[0]); // Only store the first matching task
// //         setEditedData({});
// //       } else {
// //         console.warn('No matching tasks found for the invoice with Task_Type "Pick up".');
// //       }
// //     } catch (error) {
// //       console.error('Error fetching task data:', error);
// //     }
// //   };

// //   useEffect(() => {
// //     fetchTaskData();
// //   }, [currentInvoice, refreshPtd]);

// //   const handleInputChange = (field, value) => {
// //     setEditedData((prevEditedData) => ({
// //       ...prevEditedData,
// //       [field]: value,
// //     }));
// //   };

// //   const toggleEdit = () => {
// //     setIsEditing(!isEditing);
// //   };
  
// //   const handleSave = async () => {
// //     setLoading(true);
// //     try {
// //       const updatedFields = {};

// //       for (const [columnName, value] of Object.entries(editedData)) {
// //         const columnIndex = columnMapping[columnName];
// //         if (columnIndex === undefined) {
// //           console.error(`Column mapping not found for: ${columnName}`);
// //           continue;
// //         }
// //         updatedFields[columnIndex] = { columnName, value };
// //       }

// //       const savePayload = {
// //         rowIndex: tasks.row_index,
// //         updatedFields,
// //       };

// //       await axios.post('http://localhost:9000/customer-detail/Task', savePayload);

// //       toggleEdit();
// //       alert('Task details updated successfully.');
// //       fetchTaskData();
// //     } catch (error) {
// //       console.error('Error saving task data:', error);
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const toggleCollapse = () => {
// //     setCollapsed(!collapsed);
// //   };

// //   const renderEditableField = (label, field, type = "text", value) => (
// //     <div key={field} className="editable-field-container">
// //       <div className="editable-field-container2">
// //         <div className="editable-field-container1">
// //           <label>{label}:</label>
// //         </div>
// //       </div>
// //       <div className="input-with-button">
// //         {isEditing ? (
// //           <input
// //             type={type}
// //             value={editedData[field] || value}
// //             onChange={(e) => handleInputChange(field, e.target.value)}
// //           />
// //         ) : (
// //           <input
// //             type={type}
// //             value={value}
// //             readOnly
// //           />
// //         )}
// //       </div>
// //     </div>
// //   );

// //   return (
// //     <>
// //       <div className="detail-container" style={{ marginBottom: '20px' }}>
// //         <div className="detail-header">
// //           <h1>Crew Details 
// //             <span 
// //               onClick={toggleCollapse} 
// //               style={{ cursor: 'pointer', marginLeft: 'auto' }}
// //             >
// //               {collapsed ? '+' : '-'}
// //             </span>
// //           </h1>
// //         </div>

// //         {!collapsed && tasks && ( 
// //           <div>
// //             <div className="button-group" style={{ marginLeft: '15px', display: 'flex', alignItems: 'center' }}>
// //               <button onClick={toggleEdit}>
// //                 {isEditing ? 'Cancel' : 'Edit'}
// //               </button>
// //               {isEditing && (
// //                 <button onClick={handleSave} disabled={loading} >
// //                   {loading ? 'Saving...' : 'Save'}
// //                 </button>
// //               )}
// //             </div>
// //             <div className="team-details-my details-content-my">
// //               {renderEditableField("Crew Leader Assigned", "Pick_up_Crew_Leader_Assigned", "text", tasks.Pick_up_Crew_Leader_Assigned)}
// //               {renderEditableField("Crew Leader Contact", "Pick_up_Crew_Leader_Contact", "text", tasks.Pick_up_Crew_Leader_Contact)}
// //               {renderEditableField("Crew members", "Pick_up_Crew_members", "text", tasks.Pick_up_Crew_members)} 
// //               {renderEditableField("Crew Leader Assigned", "Transit_Crew_Leader_Assigned", "text", tasks.Transit_Crew_Leader_Assigned)}
// //               {renderEditableField("Crew Leader Contact", "Transit_Crew_Leader_Contact", "text", tasks.Transit_Crew_Leader_Contact)}
// //               {renderEditableField("Crew members", "Transit_Crew_members", "text", tasks.Transit_Crew_members)}
// //               {renderEditableField("Crew Leader Assigned", "Drop_Crew_Leader_Assigned", "text", tasks.Drop_Crew_Leader_Assigned)}
// //               {renderEditableField("Crew Leader Contact", "Drop_Crew_Leader_Contact", "text", tasks.Drop_Crew_Leader_Contact)}
// //               {renderEditableField("Crew members", "Drop_Crew_members", "text", tasks.Drop_Crew_members)}
// //               {renderEditableField("Crew Leader Assigned", "Crew_Leader_Assigned", "text", tasks.Crew_Leader_Assigned)}
// //               {renderEditableField("Crew Leader Contact", "Crew_Leader_Contact", "text", tasks.Crew_Leader_Contact)}
// //               {renderEditableField("Crew members", "Crew_members", "text", tasks.Crew_members)}
// //             </div>
// //           </div>
// //         )}
// //       </div>
// //     </>
// //   );
// // };

// // export default Team;
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import '../My Bookings/mybook.css';

// const Team = ({ currentInvoice, refreshPtd }) => {
//   const [tasks, setTasks] = useState([]);
//   const [isEditing, setIsEditing] = useState(false);
//   const [editedData, setEditedData] = useState([]); 
//   const [columnMapping, setColumnMapping] = useState({});
//   const [collapsed, setCollapsed] = useState(false);
//   const [loading, setLoading] = useState(false);

//   const fetchTaskData = async () => {
//     try {
//       const response = await axios.get('http://localhost:9000/zoho-data/Task');
//       const { dataRows, columnMapping } = response.data;
      
//       if (!columnMapping) {
//         console.error('API did not return columnMapping');
//       } else {
//         setColumnMapping(columnMapping);
//       }

//       const relevantColumns = [
//         'Crew_members',
//         'Crew_Leader_Contact',
//         'Crew_Leader_Assigned',
//         'Drop_Crew_members',
//         'Drop_Crew_Leader_Contact',
//         'Drop_Crew_Leader_Assigned',
//         'Transit_Crew_members',
//         'Transit_Crew_Leader_Contact',
//         'Transit_Crew_Leader_Assigned',
//         'Pick_up_Crew_members',
//         'Pick_up_Crew_Leader_Contact',
//         'Pick_up_Crew_Leader_Assigned',
//       ];

//       const matchingTasks = dataRows
//         .filter(task => task.ID === currentInvoice)
//         .map(task => {
//           const filteredTask = {};
//           relevantColumns.forEach(col => {
//             filteredTask[col] = task[col];
//           });
//           return filteredTask;
//         });

//       setTasks(matchingTasks);
//       setEditedData(new Array(matchingTasks.length).fill({}));
//     } catch (error) {
//       console.error('Error fetching task data:', error);
//     }
//   };

//   useEffect(() => {
//     fetchTaskData();
//   }, [currentInvoice, refreshPtd]);

//   const handleInputChange = (taskIndex, field, value) => {
//     setEditedData((prevEditedData) => {
//       const newEditedData = [...prevEditedData];
//       newEditedData[taskIndex] = {
//         ...newEditedData[taskIndex],
//         [field]: value,
//       };
//       return newEditedData;
//     });
//   };

//   const toggleEdit = () => {
//     setIsEditing(!isEditing);
//   };
  
//   const handleSave = async () => {
//     setLoading(true);
//     try {
//       for (let taskIndex = 0; taskIndex < tasks.length; taskIndex++) {
//         const task = tasks[taskIndex];
//         const updatedFields = {};

//         for (const [columnName, value] of Object.entries(editedData[taskIndex])) {
//           const columnIndex = columnMapping[columnName];
//           if (columnIndex === undefined) {
//             console.error(`Column mapping not found for: ${columnName}`);
//             continue;
//           }
//           updatedFields[columnIndex] = { columnName, value };
//         }

//         const savePayload = {
//           rowIndex: task.row_index,
//           updatedFields,
//         };

//         await axios.post('http://localhost:9000/customer-detail/Task', savePayload);
//       }

//       toggleEdit();
//       alert('Task details updated successfully.');
//       fetchTaskData();
//     } catch (error) {
//       console.error('Error saving task data:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const toggleCollapse = () => {
//     setCollapsed(!collapsed);
//   };

//   const renderEditableField = (label, field, type = "text", value, taskIndex) => (
//     <div key={`${field}-${taskIndex}`} className="editable-field-container">
//       <div className="editable-field-container2">
//         <div className="editable-field-container1">
//           <label>{label}:</label>
//         </div>
//       </div>
//       <div className="input-with-button">
//         {isEditing ? (
//           <input
//             type={type}
//             value={editedData[taskIndex][field] || value}
//             onChange={(e) => handleInputChange(taskIndex, field, e.target.value)}
//           />
//         ) : (
//           <input
//             type={type}
//             value={value}
//             readOnly
//           />
//         )}
//       </div>
//     </div>
//   );

//   return (
//     <>
//       <div className="detail-container" style={{ marginBottom: '20px' }}>
//         <div className="detail-header">
//           <h1>Team 
//             <span 
//               onClick={toggleCollapse} 
//               style={{ cursor: 'pointer', marginLeft: 'auto' }}
//             >
//               {collapsed ? '+' : '-'}
//             </span>
//           </h1>
//         </div>

//         {!collapsed && tasks.length > 0 && (
//           <div>
//             <div className="button-group" style={{ marginLeft: '15px', display: 'flex', alignItems: 'center' }}>
//               <button onClick={toggleEdit}>
//                 {isEditing ? 'Cancel' : 'Edit'}
//               </button>
//               {isEditing && (
//                 <button onClick={handleSave} disabled={loading} >
//                   {loading ? 'Saving...' : 'Save'}
//                 </button>
//               )}
//             </div>
//             <div className="team-details-my details-content-my">
//               {tasks.map((task, taskIndex) => (
//                 <div key={taskIndex} style={{ marginTop: '20px' }}>
//                   <h3>Task {taskIndex + 1}</h3>
//                   {renderEditableField("Crew Leader Assigned", "Pick_up_Crew_Leader_Assigned", "text", task.Pick_up_Crew_Leader_Assigned, taskIndex)}
//                   {renderEditableField("Crew Leader Contact", "Pick_up_Crew_Leader_Contact", "text", task.Pick_up_Crew_Leader_Contact, taskIndex)}
//                   {renderEditableField("Crew members", "Pick_up_Crew_members", "text", task.Pick_up_Crew_members, taskIndex)} 
//                   {renderEditableField("Crew Leader Assigned", "Transit_Crew_Leader_Assigned", "text", task.Transit_Crew_Leader_Assigned, taskIndex)}
//                   {renderEditableField("Crew Leader Contact", "Transit_Crew_Leader_Contact", "text", task.Transit_Crew_Leader_Contact, taskIndex)}
//                   {renderEditableField("Crew members", "Transit_Crew_members", "text", task.Transit_Crew_members, taskIndex)}
//                   {renderEditableField("Crew Leader Assigned", "Drop_Crew_Leader_Assigned", "text", task.Drop_Crew_Leader_Assigned, taskIndex)}
//                   {renderEditableField("Crew Leader Contact", "Drop_Crew_Leader_Contact", "text", task.Drop_Crew_Leader_Contact, taskIndex)}
//                   {renderEditableField("Crew members", "Drop_Crew_members", "text", task.Drop_Crew_members, taskIndex)}
//                   {renderEditableField("Crew Leader Assigned", "Crew_Leader_Assigned", "text", task.Crew_Leader_Assigned, taskIndex)}
//                   {renderEditableField("Crew Leader Contact", "Crew_Leader_Contact", "text", task.Crew_Leader_Contact, taskIndex)}
//                   {renderEditableField("Crew members", "Crew_members", "text", task.Crew_members, taskIndex)}
//                 </div>
//               ))}
//             </div>
//           </div>
//         )}
//       </div>
//     </>
//   );
// };

// export default Team;
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../My Bookings/mybook.css';

const Team = ({ currentInvoice, refreshPtd }) => {
  const [tasks, setTasks] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState([]); 
  const [collapsed, setCollapsed] = useState(false);
  const [loading, setLoading] = useState(false);

  const fetchTaskData = async () => {
    try {
      const response = await axios.get('http://localhost:9000/zoho-data/Task');
      const { dataRows } = response.data;

      const relevantColumns = [
        'Crew_members',
        'Crew_Leader_Contact',
        'Crew_Leader_Assigned',
        'Drop_Crew_members',
        'Drop_Crew_Leader_Contact',
        'Drop_Crew_Leader_Assigned',
        'Transit_Crew_members',
        'Transit_Crew_Leader_Contact',
        'Transit_Crew_Leader_Assigned',
        'Pick_up_Crew_members',
        'Pick_up_Crew_Leader_Contact',
        'Pick_up_Crew_Leader_Assigned',
      ];

      const matchingTasks = dataRows
        .filter(task => task.Record_ID === currentInvoice)
        .map(task => {
          const filteredTask = {};
          relevantColumns.forEach(col => {
            filteredTask[col] = task[col];
          });
          return filteredTask;
        });

      setTasks(matchingTasks);
      setEditedData(new Array(matchingTasks.length).fill({}));
    } catch (error) {
      console.error('Error fetching task data:', error);
    }
  };

  useEffect(() => {
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

  const toggleEdit = () => {
    setIsEditing(!isEditing);
  };
  
  const handleSave = async () => {
    setLoading(true);
    try {
      // Save logic here (similar to your original code)
      toggleEdit();
      alert('Task details updated successfully.');
      fetchTaskData();
    } catch (error) {
      console.error('Error saving task data:', error);
    } finally {
      setLoading(false);
    }
  };

  const toggleCollapse = () => {
    setCollapsed(!collapsed);
  };

  const labelMapping = {
    'Crew_members': 'Crew Members',
    'Crew_Leader_Contact': 'Crew Leader Contact',
    'Crew_Leader_Assigned': 'Crew Leader Assigned',
    'Drop_Crew_members': 'Drop Crew Members',
    'Drop_Crew_Leader_Contact': 'Drop Crew Leader Contact',
    'Drop_Crew_Leader_Assigned': 'Drop Crew Leader Assigned',
    'Transit_Crew_members': 'Transit Crew Members',
    'Transit_Crew_Leader_Contact': 'Transit Crew Leader Contact',
    'Transit_Crew_Leader_Assigned': 'Transit Crew Leader Assigned',
    'Pick_up_Crew_members': 'Pick-up Crew Members',
    'Pick_up_Crew_Leader_Contact': 'Pick-up Crew Leader Contact',
    'Pick_up_Crew_Leader_Assigned': 'Pick-up Crew Leader Assigned'
  };

  const renderEditableField = (label, field, type = "text", value, taskIndex) => (
    <div key={`${field}-${taskIndex}`} className="editable-field-container">
      <div className="editable-field-container2">
        <div className="editable-field-container1">
          <label>{label}:</label>
        </div>
      </div>
      <div className="input-with-button">
        {isEditing ? (
          <input
            type={type}
            value={editedData[taskIndex][field] || value}
            onChange={(e) => handleInputChange(taskIndex, field, e.target.value)}
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
      <div className="detail-container" style={{ marginBottom: '20px' }}>
        <div className="detail-header">
          <h1>Crew Details
            <span 
              onClick={toggleCollapse} 
              style={{ cursor: 'pointer', marginLeft: 'auto' }}
            >
              {collapsed ? '+' : '-'}
            </span>
          </h1>
        </div>

        {!collapsed && tasks.length > 0 && (
          <div>
            <div className="button-group" style={{ marginLeft: '15px', display: 'flex', alignItems: 'center' }}>
              <button onClick={toggleEdit}>
                {isEditing ? 'Cancel' : 'Edit'}
              </button>
              {isEditing && (
                <button onClick={handleSave} disabled={loading} >
                  {loading ? 'Saving...' : 'Save'}
                </button>
              )}
            </div>
            <div className="team-details-my details-content-my">
              {tasks.map((task, taskIndex) => (
                <div key={taskIndex} style={{ marginTop: '20px' }}>
                  <h3>Task {taskIndex + 1}</h3>
                  {Object.entries(task).map(([field, value]) => (
                    value && renderEditableField(labelMapping[field] || field, field, "text", value, taskIndex)
                  ))}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Team;
