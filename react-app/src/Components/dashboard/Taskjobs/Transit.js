// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import '../My Bookings/mybook.css';

// const Transit = ({ currentInvoice }) => {
//   const [taskData, setTaskData] = useState(null); // Stores task data for the matching invoice
//   const [isEditing, setIsEditing] = useState(false); // Tracks if the user is editing
//   const [editedData, setEditedData] = useState({}); // Stores the edited fields
//   const [columnMapping, setColumnMapping] = useState({});
  
//   // Fetch task data on component mount
//   useEffect(() => {
//     const fetchTaskData = async () => {
//       try {
//         const response = await axios.get('http://localhost:9000/zoho-data/Task');
//         console.log('API Response:', response.data); // Log the response data for debugging
//         const { dataRows, columnMapping } = response.data;

//         // Ensure columnMapping exists
//         if (!columnMapping) {
//           console.error('API did not return columnMapping');
//         } else {
//           setColumnMapping(columnMapping);
//         }

//         // Find the task that matches the current invoice
//         const matchingTask = dataRows.find(task => task.INVOICE === currentInvoice && task.Task_Type === 'transit');
//         if (matchingTask) {
//           setTaskData({ ...matchingTask, columnMapping });
//         } else {
//           console.warn('No matching task found for the invoice.');
//         }
//       } catch (error) {
//         console.error('Error fetching task data:', error);
//       }
//     };

//     fetchTaskData();
//   }, [currentInvoice]);

//   // Handle input change when in edit mode
//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setEditedData({
//       ...editedData,
//       [name]: value,
//     });
//   };

//   // Toggle between edit and view mode
//   const toggleEdit = () => {
//     setIsEditing(!isEditing);
//   };

//   // Save changes and send updated data to backend
//   const handleSave = async () => {
//     try {
//       const updatedFields = {};
      
//       // Check if columnMapping exists in taskData
//       if (!taskData || !taskData.columnMapping) {
//         console.error('Column mapping is missing. Please try again later.');
//         return;
//       }

//       for (const [columnName, value] of Object.entries(editedData)) {
//         const columnIndex = taskData.columnMapping[columnName];
//         if (columnIndex === undefined) {
//           console.error(`Column mapping not found for: ${columnName}`);
//           continue; 
//         }
//         updatedFields[columnIndex] = { columnName, value };
//       }

//       const savePayload = {
//         rowIndex: taskData.row_index,
//         updatedFields,
//       };

//       await axios.post('http://localhost:9000/customer-detail/Task', savePayload);

//       setIsEditing(false);
//       alert('Task details updated successfully.');
//     } catch (error) {
//       console.error('Error saving task data:', error);
//     }
//   };

//   // Handle task deletion
//   const handleDelete = async () => {
//     try {
//       // Create the delete payload
//       const deletePayload = {
//         conditions: [
//           { column: 'INVOICE', value: taskData.INVOICE },
//           { column: 'Task_Id', value: taskData.Task_Id },
//           { column: 'Task_Type', value: taskData.Task_Type },
//         ]
//       };

//       // Send the DELETE request
//       await axios.delete('http://localhost:9000/zoho-data/Task', { data: deletePayload });

//       alert('Task deleted successfully.');
//       setTaskData(null); // Optionally clear the task data after deletion
//     } catch (error) {
//       console.error('Error deleting task:', error);
//       alert('Failed to delete the task.');
//     }
//   };

//   if (!taskData) {
//     return <div>Loading task data...</div>;
//   }

//   return (
//     <>
//       <div className="detail-header">
//         <h1>{taskData.Task_Id}</h1>
//         <div className="button-group">
//           <button onClick={toggleEdit}>
//             {isEditing ? 'Cancel' : 'Edit'}
//           </button>
//           {isEditing && <button onClick={handleSave}>Save</button>}
        
//           {/* <button onClick={handleDelete} style={{ marginLeft: 'auto', color: '#fff' }}>
//             Delete Task
//           </button> */}
//         </div>
//       </div>
  
//       <div className="team-details-my details-content-my3">
//         {Object.keys(columnMapping).map((key) => {
//           if (key === 'row_index' || key === 'INVOICE' || key === 'Task_Type') return null; // Skip these fields

//           const shouldDisplay = key.startsWith('Transit_') || taskData[key]; // Display if 'Pick_up' or has a value

//           if (!shouldDisplay) return null;

//           return (
//             <div key={key}>
//               <label>{key.replace(/_/g, ' ')}</label>
//               <input
//                 type="text"
//                 name={key}
//                 value={editedData[key] || taskData[key] || ''}
//                 onChange={isEditing ? handleInputChange : null}
//                 readOnly={!isEditing}
//               />
//             </div>
//           );
//         })}
//       </div>
//     </>
//   );
// };

// export default Transit;



import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../My Bookings/mybook.css';

const Ptd = ({ currentInvoice }) => {
  const [tasks, setTasks] = useState([]); // Stores an array of matching tasks
  const [isEditing, setIsEditing] = useState([]); // Tracks editing state for each task
  const [editedData, setEditedData] = useState([]); // Stores the edited fields for each task
  const [columnMapping, setColumnMapping] = useState({});

  useEffect(() => {
    const fetchTaskData = async () => {
      try {
        const response = await axios.get('http://localhost:9000/zoho-data/Task');
        console.log('API Response:', response.data); // Log the response data for debugging
        const { dataRows, columnMapping } = response.data;

        // Ensure columnMapping exists
        if (!columnMapping) {
          console.error('API did not return columnMapping');
        } else {
          setColumnMapping(columnMapping);
        }

        // Find all tasks that match the invoice and "Pick up" task type
        const matchingTasks = dataRows.filter(task => task.INVOICE === currentInvoice && task.Task_Type === 'transit');
        if (matchingTasks.length > 0) {
          setTasks(matchingTasks);
          setIsEditing(new Array(matchingTasks.length).fill(false)); // Initialize editing state
          setEditedData(new Array(matchingTasks.length).fill({})); // Initialize edited data for each task
        } else {
          console.warn('No matching tasks found for the invoice with Task_Type "Pick up".');
        }
      } catch (error) {
        console.error('Error fetching task data:', error);
      }
    };

    fetchTaskData();
  }, [currentInvoice]);

  const handleInputChange = (taskIndex, e) => {
    const { name, value } = e.target;
    setEditedData((prevEditedData) => {
      const newEditedData = [...prevEditedData];
      newEditedData[taskIndex] = {
        ...newEditedData[taskIndex],
        [name]: value,
      };
      return newEditedData;
    });
  };

  // Toggle between edit and view mode for a specific task
  const toggleEdit = (taskIndex) => {
    setIsEditing((prevIsEditing) => {
      const newIsEditing = [...prevIsEditing];
      newIsEditing[taskIndex] = !newIsEditing[taskIndex];
      return newIsEditing;
    });
  };

  // Save changes for a specific task
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

      // Save successful, exit edit mode
      toggleEdit(taskIndex);
      alert('Task details updated successfully.');
    } catch (error) {
      console.error('Error saving task data:', error);
    }
  };

  // Handle task deletion for a specific task
  const handleDelete = async (taskIndex) => {
    try {
      const task = tasks[taskIndex];
      const deletePayload = {
        conditions: [
          { column: 'INVOICE', value: task.INVOICE },
          { column: 'Task_Id', value: task.Task_Id },
          { column: 'Task_Type', value: task.Task_Type },
        ],
      };

      await axios.delete('http://localhost:9000/zoho-data/Task', { data: deletePayload });

      alert('Task deleted successfully.');
      // Remove the deleted task from the state
      setTasks(tasks.filter((_, index) => index !== taskIndex));
    } catch (error) {
      console.error('Error deleting task:', error);
      alert('Failed to delete the task.');
    }
  };

  if (tasks.length === 0) {
    return <div>Loading task data...</div>;
  }

  return (
    <>
      {tasks.map((task, taskIndex) => (
        <div key={task.Task_Id} className="detail-container" style={{ marginBottom: '20px' }}>
          <div className="detail-header">
            <h1>{task.Task_Id}</h1>
            <div className="button-group">
              <button onClick={() => toggleEdit(taskIndex)}>
                {isEditing[taskIndex] ? 'Cancel' : 'Edit'}
              </button>
              {isEditing[taskIndex] && (
                <button onClick={() => handleSave(taskIndex)}>
                  Save
                </button>
              )}
              {/* Uncomment this if you want the delete button */}
              {/* 
              <button onClick={() => handleDelete(taskIndex)} style={{ marginLeft: 'auto', color: '#fff' }}>
                Delete Task
              </button> 
              */}
            </div>
          </div>

          <div className="team-details-my details-content-my3">
            {Object.keys(columnMapping).map((key) => {
              if (key === 'row_index' || key === 'INVOICE' || key === 'Task_Type') return null; // Skip these fields

              const shouldDisplay = key.startsWith('Transit') || task[key]; // Display if 'Pick_up' or has a value

              if (!shouldDisplay) return null;

              return (
                <div key={key}>
                  <label>{key.replace(/_/g, ' ')}</label>
                  <input
                    type="text"
                    name={key}
                    value={editedData[taskIndex][key] || task[key] || ''}
                    onChange={isEditing[taskIndex] ? (e) => handleInputChange(taskIndex, e) : null}
                    readOnly={!isEditing[taskIndex]}
                  />
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </>
  );
};

export default Ptd;