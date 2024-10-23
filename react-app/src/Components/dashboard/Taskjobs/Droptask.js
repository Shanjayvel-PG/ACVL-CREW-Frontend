
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../My Bookings/mybook.css';

const Drop = ({ currentInvoice }) => {
  const [tasks, setTasks] = useState([]); 
  const [isEditing, setIsEditing] = useState([]); 
  const [editedData, setEditedData] = useState([]); 
  const [columnMapping, setColumnMapping] = useState({});

  useEffect(() => {
    const fetchTaskData = async () => {
      try {
        const response = await axios.get('http://localhost:9000/zoho-data/Task');
        const { dataRows, columnMapping } = response.data;

        if (!columnMapping) {
          console.error('API did not return columnMapping');
        } else {
          setColumnMapping(columnMapping);
        }

        const matchingTasks = dataRows.filter(task => task.INVOICE === currentInvoice && task.Task_Type === 'drop');
        if (matchingTasks.length > 0) {
          setTasks(matchingTasks);
          setIsEditing(new Array(matchingTasks.length).fill(false)); 
          setEditedData(new Array(matchingTasks.length).fill({})); 
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

  // if (tasks.length === 0) {
  //   return <div>Loading task data...</div>;
  // }

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

              const shouldDisplay = key.startsWith('Drop') || task[key]; // Display if 'Pick_up' or has a value

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

export default Drop;
