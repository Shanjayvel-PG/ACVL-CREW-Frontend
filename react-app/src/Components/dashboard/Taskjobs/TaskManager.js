
// import React, { useState } from 'react';
// import useBookings from '../../usebooking'; 
// import '../My Bookings/mybook.css'; 
// import axios from 'axios';

// const TaskManager = ({ currentInvoice }) => {
//   const { bookingsData } = useBookings();
//   const [tasks, setTasks] = useState({});
//   const [taskData, setTaskData] = useState({});
//   const [usedTaskNumbers, setUsedTaskNumbers] = useState({});
//   const [loading, setLoading] = useState(false); // Added loading state

//   const getAllTaskIds = async () => {
//     try {
//       const response = await axios.get('http://localhost:9000/zoho-data/Task');

//       if (!response || !response.data || !Array.isArray(response.data.dataRows)) {
//         console.error('Invalid response format:', response);
//         return [];
//       }

//       console.log(response.data.dataRows);
//       return response.data.dataRows.map(row => row.Task_Id);
      
//     } catch (error) {
//       console.error('Error fetching tasks from backend:', error);
//       return [];
//     }
//   };

//   const checkTaskIdExistsInData = (taskId, existingTasks) => {
//     return existingTasks.includes(taskId);
//   };

//   const generateUniqueTaskId = async (invoice, type) => {
//     const existingTasks = await getAllTaskIds();

//     let taskNumber = (tasks[invoice]?.[type]?.length || 0) + 1;
//     let newTaskId = `${type}${taskNumber}`;

//     while (checkTaskIdExistsInData(newTaskId, existingTasks)) {
//       console.log(`Task ID ${newTaskId} already exists. Generating a new one...`);
//       taskNumber += 1;
//       newTaskId = `${type}${taskNumber}`;
//     }

//     console.log(`Generated unique Task ID: ${newTaskId}`);
//     return newTaskId;
//   };

//   const createTask = async (invoice, type) => {
//     const newTaskId = await generateUniqueTaskId(invoice, type);
//     const newTaskName = `${type.charAt(0).toUpperCase() + type.slice(1)} Task ${newTaskId.replace(type, '')}`;

//     const newTask = {
//       id: newTaskId,
//       name: newTaskName,
//       type,
//     };

//     setTasks((prevTasks) => ({
//       ...prevTasks,
//       [invoice]: {
//         ...prevTasks[invoice],
//         [type]: [...(prevTasks[invoice]?.[type] || []), newTask],
//       },
//     }));

//     setTaskData((prevData) => ({
//       ...prevData,
//       [newTaskId]: {
//         INVOICE: invoice,
//         Task_Id: newTaskId,
//         Task_Type: type,
//         Customer_Instructions: '',
//         Crew_Leader_Assigned: '',
//         Crew_Leader_Contact: '',
//       },
//     }));
//   };

//   const handleInputChange = (taskId, field, value) => {
//     setTaskData((prevData) => ({
//       ...prevData,
//       [taskId]: {
//         ...prevData[taskId],
//         [field]: value,
//       },
//     }));
//   };

//   const deleteTask = (invoice, type, taskId) => {
//     setTasks((prevTasks) => ({
//       ...prevTasks,
//       [invoice]: {
//         ...prevTasks[invoice],
//         [type]: prevTasks[invoice][type].filter((task) => task.id !== taskId),
//       },
//     }));

//     setTaskData((prevData) => {
//       const newData = { ...prevData };
//       delete newData[taskId];
//       return newData;
//     });
//   };

//   const createPickUpTask = (invoice) => createTask(invoice, 'pickUp');
//   const createTransitTask = (invoice) => createTask(invoice, 'transit');
//   const createDropTask = (invoice) => createTask(invoice, 'drop');

//   const handleCreate = async () => {
//     setLoading(true); // Start loading

//     try {
//       const taskList = Object.values(taskData); 
//       await axios.post('http://localhost:9000/zoho-data/Task', taskList); 
//       alert('Tasks created successfully!');

//       setUsedTaskNumbers((prevUsed) => {
//         const updatedUsed = { ...prevUsed };
//         taskList.forEach((task) => {
//           const { INVOICE, Task_Type, Task_Id } = task;
//           const taskNumber = parseInt(Task_Id.replace(Task_Type, ''), 10);

//           if (!updatedUsed[INVOICE]) {
//             updatedUsed[INVOICE] = {};
//           }
//           if (!updatedUsed[INVOICE][Task_Type]) {
//             updatedUsed[INVOICE][Task_Type] = 0;
//           }
//           updatedUsed[INVOICE][Task_Type] = Math.max(updatedUsed[INVOICE][Task_Type], taskNumber);
//         });
//         return updatedUsed;
//       });

//       // Clear tasks and taskData after creation
//       setTasks({});
//       setTaskData({});
//     } catch (error) {
//       console.error('Error creating tasks:', error);
//       alert('Failed to create tasks.');
//     } finally {
//       setLoading(false); // Stop loading after creation or failure
//     }
//   };

//   return (
//     <div>
//       {bookingsData
//         .filter((booking) => booking.INVOICE === currentInvoice) 
//         .map((booking) => {
//           const invoice = booking.INVOICE;

//           return (
//             <div key={invoice} style={{ background:'#fff', margin:"0 15px", borderRadius:'10px', border: '1px solid #ddd', padding: '10px' }}>
//               <div style={{ display:'flex' }}>
//                 <label style={{ marginLeft: '20px', alignContent:'center' }}> Create Tasks :</label>
//                 <div className='view-editbutton' style={{ padding: '10px', display: 'flex' }}>
//                   <button
//                     style={{ background: 'red', borderRadius: '20px', padding: '8px', width: '100px' }}
//                     onClick={() => createPickUpTask(invoice)}
//                   >
//                     Pick Up
//                   </button>
//                   <button
//                     style={{ background: 'red', borderRadius: '20px', padding: '8px', width: '100px' }}
//                     onClick={() => createTransitTask(invoice)}
//                   >
//                     Transit
//                   </button>
//                   <button
//                     style={{ background: 'red', borderRadius: '20px', padding: '8px', width: '100px' }}
//                     onClick={() => createDropTask(invoice)}
//                   >
//                     Drop
//                   </button>
//                 </div>
//               </div>

//               {['pickUp', 'transit', 'drop'].map((type) => (
//                 <div key={type}>
//                   <ul>
//                     {tasks[invoice]?.[type]?.map((task) => (
//                       <li key={task.id}>
//                         {task.name}{' '}
//                         <div className="team-details-my details-content-my3">
//                           <div>
//                             <label>Invoice</label>
//                             <input
//                               type="text"
//                               name="INVOICE"
//                               value={taskData[task.id]?.INVOICE || ''}
//                               onChange={(e) => handleInputChange(task.id, 'INVOICE', e.target.value)}
//                               readOnly
//                             />
//                           </div>
//                           <div>
//                             <label>Task Id</label>
//                             <input
//                               type="text"
//                               name="Task_Id"
//                               value={taskData[task.id]?.Task_Id || ''}
//                               onChange={(e) => handleInputChange(task.id, 'Task_Id', e.target.value)}
//                               readOnly
//                             />
//                           </div>
//                           <div>
//                             <label>Task Type</label>
//                             <input
//                               type="text"
//                               name="Task_Type"
//                               value={taskData[task.id]?.Task_Type || ''}
//                               onChange={(e) => handleInputChange(task.id, 'Task_Type', e.target.value)}
//                               readOnly
//                             />
//                           </div>
//                           <div>
//                             <label>Customer Instructions</label>
//                             <input
//                               type="text"
//                               name="Customer_Instructions"
//                               value={taskData[task.id]?.Customer_Instructions || ''}
//                               onChange={(e) => handleInputChange(task.id, 'Customer_Instructions', e.target.value)}
//                             />
//                           </div>
//                         </div>
//                         <button
//                           onClick={() => deleteTask(invoice, type, task.id)}
//                           style={{ marginLeft: '10px' }}
//                         >
//                           Delete
//                         </button>
//                       </li>  
//                     ))}
//                   </ul>           
//                 </div>             
//               ))}
//               <button
//                 onClick={handleCreate}
//                 style={{ marginTop: '20px', padding: '10px 20px', background: 'red', color: 'white', borderRadius: '10px' }}
//                 disabled={loading} 
//               >
//                 {loading ? 'Saving...' : 'Create'} 
//               </button>
//             </div>
//           );
//         })}
//     </div>
//   );
// };

// export default TaskManager;
// TaskManager.js

import React, { useState } from 'react';
import useBookings from '../../usebooking'; 
import axios from 'axios';
import '../My Bookings/mybook.css';

const TaskManager = ({ currentInvoice, onCreateSuccess }) => {
  const { bookingsData } = useBookings();
  const [tasks, setTasks] = useState({});
  const [taskData, setTaskData] = useState({});
  const [loading, setLoading] = useState(false); 
  const getAllTasks = async () => {
    try {
      const response = await axios.get('http://localhost:9000/zoho-data/Task');
  
      if (!response || !response.data || !Array.isArray(response.data.dataRows)) {
        console.error('Invalid response format:', response);
        return [];
      }

      return response.data.dataRows.map(row => ({
        taskId: row.Task_Id,
        invoice: row.ID
      }));
    } catch (error) {
      console.error('Error fetching tasks from backend:', error);
      return [];
    }
  };
  
  const checkTaskIdExistsForInvoice = (taskId, invoice, existingTasks) => {

    return existingTasks.some(task => task.taskId === taskId && task.invoice === invoice);
  };
  
  const generateUniqueTaskId = async (invoice, type) => {
    const existingTasks = await getAllTasks();
    let taskNumber = (tasks[invoice]?.[type]?.length || 0) + 1;
    let newTaskId = `${type}${taskNumber}`;

    while (checkTaskIdExistsForInvoice(newTaskId, invoice, existingTasks)) {
      taskNumber += 1;
      newTaskId = `${type}${taskNumber}`;
    }
  
    return newTaskId;
  };

  const createTask = async (invoice, type) => {
    const newTaskId = await generateUniqueTaskId(invoice, type);
    const newTaskName = `${type.charAt(0).toUpperCase() + type.slice(1)} Task ${newTaskId.replace(type, '')}`;

    const newTask = {
      id: newTaskId,
      name: newTaskName,
      type,
    };

    setTasks((prevTasks) => ({
      ...prevTasks,
      [invoice]: {
        ...prevTasks[invoice],
        [type]: [...(prevTasks[invoice]?.[type] || []), newTask],
      },
    }));

    setTaskData((prevData) => ({
      ...prevData,
      [newTaskId]: {
        ID: invoice,
        Task_Id: newTaskId,
        Task_Type: type,
      },
    }));
  };

  const handleCreate = async () => {
    setLoading(true);

    try {
      const taskList = Object.values(taskData); 
      await axios.post('http://localhost:9000/zoho-data/Task', taskList); 
      alert('Tasks created successfully!');

      setTasks({});
      setTaskData({});

      if (onCreateSuccess) {
        onCreateSuccess();
      }
    } catch (error) {
      console.error('Error creating tasks:', error);
      alert('Failed to create tasks.');
    } finally {
      setLoading(false); 
    }
  };

  return (
    <div>
      {bookingsData
        .filter((booking) => booking.ID === currentInvoice) 
        .map((booking) => {
          const invoice = booking.ID;

          return (
            <div key={invoice} style={{ background:'#fff', margin:"0 15px", borderRadius:'10px', border: '1px solid #ddd', padding: '10px' }}>
              <div style={{ display:'flex' }}>
                <h1 style={{alignContent:'center'}}>Tasks :</h1>
                <div className='view-editbutton' style={{ padding: '10px', display: 'flex' }}>
                  <button
                    style={{ background: 'red', borderRadius: '20px', padding: '8px', width: '150px' }}
                    onClick={() => createTask(invoice, 'PickUp_Drop')}
                  >
                    Pick Up & Drop
                  </button>
                  <button
                    style={{ background: 'red', borderRadius: '20px', padding: '8px', width: '150px' }}
                    onClick={() => createTask(invoice, 'PickUp')}
                  >
                    Pick Up
                  </button>
                  <button
                    style={{ background: 'red', borderRadius: '20px', padding: '8px', width: '150px' }}
                    onClick={() => createTask(invoice, 'Transit')}
                  >
                    Transit
                  </button>
                  <button
                    style={{ background: 'red', borderRadius: '20px', padding: '8px', width: '150px' }}
                    onClick={() => createTask(invoice, 'Drop')}
                  >
                    Drop
                  </button>
                  <button
                    style={{ background: 'red', borderRadius: '20px', padding: '8px', width: '150px' }}
                    onClick={() => createTask(invoice, 'Storage')}
                  >
                    Storage
                  </button>
                </div>
              </div>
              {['PickUp_Drop','PickUp', 'Transit', 'Drop','Storage'].map((type) => (
                <div key={type}>
                  <ul>
                    {tasks[invoice]?.[type]?.map((task) => (
                      <li key={task.id}>
                        {task.name}{' '}
                        {/*   */}
                        <button
                          onClick={handleCreate}
                          style={{ marginTop: '20px', padding: '10px 20px', background: 'red', color: 'white', borderRadius: '10px' }}
                          disabled={loading} 
                        >
                          {loading ? 'Saving...' : 'Create'} 
                        </button>
                      </li>
                    ))}
                  </ul>           
                </div>             
              ))}

            </div>
          );
        })}
    </div>
  );
};

export default TaskManager;
