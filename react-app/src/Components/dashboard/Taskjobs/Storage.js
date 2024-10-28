
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import '../My Bookings/mybook.css';
// import DatePicker from 'react-datepicker'; 
// import 'react-datepicker/dist/react-datepicker.css';
// import Select from 'react-select';

// const Storagetask = ({ currentInvoice, refreshPtd }) => {
//   const [tasks, setTasks] = useState([]);
//   const [isEditing, setIsEditing] = useState([]); 
//   const [editedData, setEditedData] = useState([]); 
//   const [columnMapping, setColumnMapping] = useState({});
//   const [collapsed, setCollapsed] = useState([]);
//   const [loading, setLoading] = useState(false);

//   const fetchTaskData = async () => {
//     try {
//       const response = await axios.get('http://localhost:9000/zoho-data/zoho-data/Task');
//       const { dataRows, columnMapping } = response.data;

//       setColumnMapping(columnMapping);
//       const matchingTasks = dataRows.filter(task => task.ID === currentInvoice && task.Task_Type === 'Storage');
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

//   const toggleEdit = (taskIndex) => {
//     setIsEditing((prevEditing) => {
//       const newEditing = [...prevEditing];
//       newEditing[taskIndex] = !newEditing[taskIndex];
//       return newEditing;
//     });
//   };

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

//       await axios.post('http://localhost:9000/zoho-data/customer-detail/Task', savePayload);

//       toggleEdit(taskIndex); 
//       alert('Task details updated successfully.');
//       fetchTaskData();
//     } catch (error) {
//       console.error('Error saving task data:', error);
//     }finally {
//       setLoading(false); 
//     }
//   };

//   const toggleCollapse = (taskIndex) => {
//     setCollapsed((prevCollapsed) => {
//       const newCollapsed = [...prevCollapsed];
//       newCollapsed[taskIndex] = !newCollapsed[taskIndex];
//       return newCollapsed;
//     });
//   };


//   const renderEditableField = (label, field, type = "text", value, taskIndex) => (
//     <div key={field} className="editable-field-container">
//       <div className="editable-field-container2">
//         <div className="editable-field-container1">
//           <label>{label}:</label>
//         </div>
//       </div>
//       <div className="input-with-button">
//         {isEditing[taskIndex] ? (
// (
//             <input
//               type={type}
//               value={editedData[taskIndex][field] || value}
//               onChange={(e) => handleInputChange(taskIndex, field, e.target.value)}
//             />
//           )
//         ) : (
//             <input
//               type={type}
//               value={value}
//               readOnly
//             />
//         )}
//       </div>
//     </div>
//   );
 
//   return (
//     <>
//       {tasks.map((task, taskIndex) => (
//         <div key={task.Task_Id} className="detail-container" style={{ marginBottom: '20px' }}>
//           <div className="detail-header">
//             <h1>{task.Task_Id} 
//               <span 
//                 onClick={() => toggleCollapse(taskIndex)} 
//                 style={{ cursor: 'pointer', marginLeft: 'auto' }}
//               >
//                 {collapsed[taskIndex] ? '+' : '-'}
//             </span>
//             </h1>
//             </div>

//           {!collapsed[taskIndex] && ( 
//             <div >
//               <div className="button-group" style={{ marginLeft: '15px', display: 'flex', alignItems: 'center' }}>
//               <button onClick={() => toggleEdit(taskIndex)}>
//                 {isEditing[taskIndex] ? 'Cancel' : 'Edit'}
//               </button>
//               {isEditing[taskIndex] && (
//                 <button onClick={() => handleSave(taskIndex)} disabled={loading} >
//                   {loading ? 'Saving...' : 'Saving'} 
//                 </button>
//               )}
//               </div>
//               <div>
//                 <div className="team-details-my details-content-my">
                // {renderEditableField("Storage Location", "Storage_Location", "text", task.Storage_Location, taskIndex)}
                // {renderEditableField("Storage Duration", "Storage_Duration", "text", task.Storage_Duration, taskIndex)}
                // {renderEditableField("Storage Holder Name", "Storage_Holder_Name", "text", task.Storage_Holder_Name, taskIndex)}
                // {renderEditableField("Storage Address", "Storage_Address", "text", task.Storage_Address, taskIndex)}
                // {renderEditableField("Storage Start Date", "Storage_Start_date", "text", task.Storage_Start_date, taskIndex)}
                // {renderEditableField("Storage End Date", "Storage_End_date", "text", task.Storage_End_date, taskIndex)}
                // {renderEditableField("Storage Invoice", "Storage_Invoice", "text", task.Storage_Invoice, taskIndex)}
                // {renderEditableField("Storage Unit", "Storage_Unit", "text", task.Storage_Unit, taskIndex)}
                // {renderEditableField("Storage Acess", "Storage_Acess", "text", task.Storage_Acess, taskIndex)}
//                 </div>
//               </div>
//             </div>
//           )}
//         </div>
//       ))}
//     </>
//   );
// };

// export default Storagetask;




import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../My Bookings/mybook.css';
import 'react-datepicker/dist/react-datepicker.css';


const Storagetask = ({ currentInvoice, refreshPtd }) => {
  const [tasks, setTasks] = useState([]);
  const [isEditing, setIsEditing] = useState([]); 
  const [editedData, setEditedData] = useState([]); 
  const [columnMapping, setColumnMapping] = useState({});
  const [collapsed, setCollapsed] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchTaskData = async () => {
    try {
      const response = await axios.get('http://localhost:9000/zoho-data/Task');
      const { dataRows, columnMapping } = response.data;

      setColumnMapping(columnMapping);
      const matchingTasks = dataRows.filter(task => task.Record_ID === currentInvoice && task.Task_Type === 'Storage');
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


  const renderEditableField = (label, field, type = "text", value, taskIndex) => (
    <div key={field} className="editable-field-container">
      <div className="editable-field-container2">
        <div className="editable-field-container1">
          <label>{label}:</label>
        </div>
      </div>
      <div className="input-with-button">
        {isEditing[taskIndex] ? (
           (
            <input
              type={type}
              value={editedData[taskIndex][field] || value}
              onChange={(e) => handleInputChange(taskIndex, field, e.target.value)}
            />
          )
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
                {renderEditableField("Storage Location", "Storage_Location", "text", task.Storage_Location, taskIndex)}
                {renderEditableField("Storage Duration", "Storage_Duration", "text", task.Storage_Duration, taskIndex)}
                {renderEditableField("Storage Holder Name", "Storage_Holder_Name", "text", task.Storage_Holder_Name, taskIndex)}
                {renderEditableField("Storage Address", "Storage_Address", "text", task.Storage_Address, taskIndex)}
                {renderEditableField("Storage Start Date", "Storage_Start_date", "text", task.Storage_Start_date, taskIndex)}
                {renderEditableField("Storage End Date", "Storage_End_date", "text", task.Storage_End_date, taskIndex)}
                {renderEditableField("Storage Invoice", "Storage_Invoice", "text", task.Storage_Invoice, taskIndex)}
                {renderEditableField("Storage Unit", "Storage_Unit", "text", task.Storage_Unit, taskIndex)}
                {renderEditableField("Storage Acess", "Storage_Acess", "text", task.Storage_Acess, taskIndex)}
                </div>
              </div>
            </div>
          )}
        </div>
      ))}
    </>
  );
};

export default Storagetask;
