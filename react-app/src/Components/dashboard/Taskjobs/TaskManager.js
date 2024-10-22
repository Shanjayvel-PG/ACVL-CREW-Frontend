// import React, { useState } from 'react';
// import useBookings from '../../usebooking'; 
// import '../My Bookings/mybook.css'; 
// import axios from 'axios';

// const TaskManager = ({ currentInvoice }) => {
//   const { bookingsData } = useBookings();
//   const [tasks, setTasks] = useState({});
//   const [taskData, setTaskData] = useState({});
//   const [usedTaskNumbers, setUsedTaskNumbers] = useState({}); 


//   const createTask = (invoice, type) => {

//     const highestUsedNumber = usedTaskNumbers[invoice]?.[type] || 0;
//     const currentTaskNumber = (tasks[invoice]?.[type]?.length || 0) + 1;

//     const newTaskId = `${type}${currentTaskNumber}`;
//     const newTaskName = `${type.charAt(0).toUpperCase() + type.slice(1)} Task ${currentTaskNumber}`;

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

//   const createPickUpTask = (invoice) => {
//     createTask(invoice, 'pickUp');
//   };

//   const createTransitTask = (invoice) => {
//     createTask(invoice, 'transit');
//   };

//   const createDropTask = (invoice) => {
//     createTask(invoice, 'drop');
//   };

//   const handleCreate = async () => {
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

//     } catch (error) {
//       console.error('Error creating tasks:', error);
//       alert('Failed to create tasks.');
//     }
//   };

//   return (
//     <div>
//       {bookingsData
//         .filter((booking) => booking.INVOICE === currentInvoice) 
//         .map((booking) => {
//           const invoice = booking.INVOICE;

//           return (
//             <div key={invoice} style={{ marginBottom: '30px', border: '1px solid #ddd', padding: '10px' }}>
//               <div style={{display:'flex'}}>
//                 <label style={{ marginLeft: '20px', alignContent:'center'}}> Create Tasks :</label>
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
//                   {/* <h3 style={{ marginLeft: '30px' }}>{type.charAt(0).toUpperCase() + type.slice(1)} Tasks:</h3> */}
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
//                         <button
//                           onClick={handleCreate}
//                           style={{ marginTop: '20px', padding: '10px 20px', background: 'red', color: 'white', borderRadius: '10px' }}
//                         >
//                           Create
//                         </button>
//                       </li>  
//                     ))}
//                   </ul>           
//                 </div>             
//               ))}
//             </div>
//           );
//         })}
//     </div>
//   );
// };

// export default TaskManager;

// // import React, { useState } from 'react';
// // import useBookings from '../../usebooking'; 
// // import '../My Bookings/mybook.css'; 
// // import axios from 'axios';

// // const TaskManager = ({ currentInvoice }) => {
// //   const { bookingsData } = useBookings();
// //   const [tasks, setTasks] = useState({});
// //   const [taskData, setTaskData] = useState({});
// //   const [usedTaskNumbers, setUsedTaskNumbers] = useState({});

// //   // Function to check for existing task IDs and ensure a unique Task_Id is generated
// //   const createTask = async (invoice, type) => {
// //     try {
// //       // Fetch existing tasks from the backend to check if Task_Id is already used
// //       const response = await axios.get('http://localhost:9000/zoho-data/Task');
// //       const existingTasks = response.data; // Assuming the response is a list of tasks

// //       const highestUsedNumber = usedTaskNumbers[invoice]?.[type] || 0;
// //       let currentTaskNumber = (tasks[invoice]?.[type]?.length || 0) + 1;

// //       let newTaskId = `${type}${currentTaskNumber}`;
// //       let newTaskName = `${type.charAt(0).toUpperCase() + type.slice(1)} Task ${currentTaskNumber}`;

// //       // Check if the newTaskId already exists in the fetched tasks
// //       let isTaskIdExists = existingTasks.some((task) => task.Task_Id === newTaskId);

// //       // If Task_Id already exists, increment the task number until it's unique
// //       while (isTaskIdExists) {
// //         currentTaskNumber++;
// //         newTaskId = `${type}${currentTaskNumber}`;
// //         newTaskName = `${type.charAt(0).toUpperCase() + type.slice(1)} Task ${currentTaskNumber}`;
// //         isTaskIdExists = existingTasks.some((task) => task.Task_Id === newTaskId);
// //       }

// //       const newTask = {
// //         id: newTaskId,
// //         name: newTaskName,
// //         type,
// //       };

// //       // Update the state with the new task
// //       setTasks((prevTasks) => ({
// //         ...prevTasks,
// //         [invoice]: {
// //           ...prevTasks[invoice],
// //           [type]: [...(prevTasks[invoice]?.[type] || []), newTask],
// //         },
// //       }));

// //       // Pre-fill task data fields with the task details
// //       setTaskData((prevData) => ({
// //         ...prevData,
// //         [newTaskId]: {
// //           INVOICE: invoice,
// //           Task_Id: newTaskId,
// //           Task_Type: type,
// //           Customer_Instructions: '',
// //           Crew_Leader_Assigned: '',
// //           Crew_Leader_Contact: '',
// //         },
// //       }));

// //     } catch (error) {
// //       console.error('Error fetching existing tasks:', error);
// //       alert('Failed to create task due to server error.');
// //     }
// //   };

// //   // Function to handle input changes in task forms
// //   const handleInputChange = (taskId, field, value) => {
// //     setTaskData((prevData) => ({
// //       ...prevData,
// //       [taskId]: {
// //         ...prevData[taskId],
// //         [field]: value,
// //       },
// //     }));
// //   };

// //   // Function to delete a task
// //   const deleteTask = (invoice, type, taskId) => {
// //     setTasks((prevTasks) => ({
// //       ...prevTasks,
// //       [invoice]: {
// //         ...prevTasks[invoice],
// //         [type]: prevTasks[invoice][type].filter((task) => task.id !== taskId),
// //       },
// //     }));

// //     setTaskData((prevData) => {
// //       const newData = { ...prevData };
// //       delete newData[taskId];
// //       return newData;
// //     });
// //   };

// //   const createPickUpTask = (invoice) => {
// //     createTask(invoice, 'pickUp');
// //   };

// //   const createTransitTask = (invoice) => {
// //     createTask(invoice, 'transit');
// //   };

// //   const createDropTask = (invoice) => {
// //     createTask(invoice, 'drop');
// //   };

// //   const handleCreate = async () => {
// //     try {
// //       const taskList = Object.values(taskData); 
// //       await axios.post('http://localhost:9000/zoho-data/Task', taskList); 
// //       alert('Tasks created successfully!');

// //       setUsedTaskNumbers((prevUsed) => {
// //         const updatedUsed = { ...prevUsed };
// //         taskList.forEach((task) => {
// //           const { INVOICE, Task_Type, Task_Id } = task;
// //           const taskNumber = parseInt(Task_Id.replace(Task_Type, ''), 10);

// //           if (!updatedUsed[INVOICE]) {
// //             updatedUsed[INVOICE] = {};
// //           }
// //           if (!updatedUsed[INVOICE][Task_Type]) {
// //             updatedUsed[INVOICE][Task_Type] = 0;
// //           }
// //           updatedUsed[INVOICE][Task_Type] = Math.max(updatedUsed[INVOICE][Task_Type], taskNumber);
// //         });
// //         return updatedUsed;
// //       });

// //     } catch (error) {
// //       console.error('Error creating tasks:', error);
// //       alert('Failed to create tasks.');
// //     }
// //   };

// //   return (
// //     <div>
// //       {bookingsData
// //         .filter((booking) => booking.INVOICE === currentInvoice) 
// //         .map((booking) => {
// //           const invoice = booking.INVOICE;

// //           return (
// //             <div key={invoice} style={{ marginBottom: '30px', border: '1px solid #ddd', padding: '10px' }}>
// //               <label style={{ marginLeft: '20px' }}> Create Tasks :</label>
// //               <div className='view-editbutton' style={{ padding: '10px', display: 'flex' }}>
// //                 <button
// //                   style={{ background: 'red', borderRadius: '20px', padding: '8px', width: '100px' }}
// //                   onClick={() => createPickUpTask(invoice)}
// //                 >
// //                   Pick Up
// //                 </button>
// //                 <button
// //                   style={{ background: 'red', borderRadius: '20px', padding: '8px', width: '100px' }}
// //                   onClick={() => createTransitTask(invoice)}
// //                 >
// //                   Transit
// //                 </button>
// //                 <button
// //                   style={{ background: 'red', borderRadius: '20px', padding: '8px', width: '100px' }}
// //                   onClick={() => createDropTask(invoice)}
// //                 >
// //                   Drop
// //                 </button>
// //               </div>

// //               {['pickUp', 'transit', 'drop'].map((type) => (
// //                 <div key={type}>
// //                   <ul>
// //                     {tasks[invoice]?.[type]?.map((task) => (
// //                       <li key={task.id}>
// //                         {task.name}{' '}
// //                         <div className="team-details-my details-content-my3">
// //                           <div>
// //                             <label>Invoice</label>
// //                             <input
// //                               type="text"
// //                               name="INVOICE"
// //                               value={taskData[task.id]?.INVOICE || ''}
// //                               onChange={(e) => handleInputChange(task.id, 'INVOICE', e.target.value)}
// //                               readOnly
// //                             />
// //                           </div>
// //                           <div>
// //                             <label>Task Id</label>
// //                             <input
// //                               type="text"
// //                               name="Task_Id"
// //                               value={taskData[task.id]?.Task_Id || ''}
// //                               onChange={(e) => handleInputChange(task.id, 'Task_Id', e.target.value)}
// //                               readOnly
// //                             />
// //                           </div>
// //                           <div>
// //                             <label>Task Type</label>
// //                             <input
// //                               type="text"
// //                               name="Task_Type"
// //                               value={taskData[task.id]?.Task_Type || ''}
// //                               onChange={(e) => handleInputChange(task.id, 'Task_Type', e.target.value)}
// //                               readOnly
// //                             />
// //                           </div>
// //                           <div>
// //                             <label>Customer Instructions</label>
// //                             <input
// //                               type="text"
// //                               name="Customer_Instructions"
// //                               value={taskData[task.id]?.Customer_Instructions || ''}
// //                               onChange={(e) => handleInputChange(task.id, 'Customer_Instructions', e.target.value)}
// //                             />
// //                           </div>
// //                         </div>
// //                         <button
// //                           onClick={() => deleteTask(invoice, type, task.id)}
// //                           style={{ marginLeft: '10px' }}
// //                         >
// //                           Delete
// //                         </button>
// //                       </li>
// //                     ))}
// //                   </ul>
// //                 </div>
// //               ))}

// //               <button
// //                 onClick={handleCreate}
// //                 style={{ marginTop: '20px', padding: '10px 20px', background: 'red', color: 'white', borderRadius: '10px' }}
// //               >
// //                 Create
// //               </button>
// //             </div>
// //           );
// //         })}
// //     </div>
// //   );
// // };

// // export default TaskManager;



import React, { useState } from 'react';
import useBookings from '../../usebooking'; 
import '../My Bookings/mybook.css'; 
import axios from 'axios';

const TaskManager = ({ currentInvoice }) => {
  const { bookingsData } = useBookings();
  const [tasks, setTasks] = useState({});
  const [taskData, setTaskData] = useState({});
  const [usedTaskNumbers, setUsedTaskNumbers] = useState({});

  const checkTaskIdExists = async (taskId) => {
    try {
      const response = await axios.get(`http://localhost:9000/zoho-data/Task/${taskId}`);
      return response.data.exists;  
    } catch (error) {
      console.error('Error checking task ID:', error);
      return false;
    }
  };

  const generateUniqueTaskId = async (invoice, type) => {
    let taskNumber = (tasks[invoice]?.[type]?.length || 0) + 1;
    let newTaskId = `${type}${taskNumber}`;
    
    while (await checkTaskIdExists(newTaskId)) {
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
        INVOICE: invoice,
        Task_Id: newTaskId,
        Task_Type: type,
        Customer_Instructions: '',
        Crew_Leader_Assigned: '',
        Crew_Leader_Contact: '',
      },
    }));
  };

  const handleInputChange = (taskId, field, value) => {
    setTaskData((prevData) => ({
      ...prevData,
      [taskId]: {
        ...prevData[taskId],
        [field]: value,
      },
    }));
  };

  const deleteTask = (invoice, type, taskId) => {
    setTasks((prevTasks) => ({
      ...prevTasks,
      [invoice]: {
        ...prevTasks[invoice],
        [type]: prevTasks[invoice][type].filter((task) => task.id !== taskId),
      },
    }));

    setTaskData((prevData) => {
      const newData = { ...prevData };
      delete newData[taskId];
      return newData;
    });
  };

  const createPickUpTask = (invoice) => {
    createTask(invoice, 'pickUp');
  };

  const createTransitTask = (invoice) => {
    createTask(invoice, 'transit');
  };

  const createDropTask = (invoice) => {
    createTask(invoice, 'drop');
  };

  const handleCreate = async () => {
    try {
      const taskList = Object.values(taskData); 
      await axios.post('http://localhost:9000/zoho-data/Task', taskList); 
      alert('Tasks created successfully!');

      setUsedTaskNumbers((prevUsed) => {
        const updatedUsed = { ...prevUsed };
        taskList.forEach((task) => {
          const { INVOICE, Task_Type, Task_Id } = task;
          const taskNumber = parseInt(Task_Id.replace(Task_Type, ''), 10);

          if (!updatedUsed[INVOICE]) {
            updatedUsed[INVOICE] = {};
          }
          if (!updatedUsed[INVOICE][Task_Type]) {
            updatedUsed[INVOICE][Task_Type] = 0;
          }
          updatedUsed[INVOICE][Task_Type] = Math.max(updatedUsed[INVOICE][Task_Type], taskNumber);
        });
        return updatedUsed;
      });

    } catch (error) {
      console.error('Error creating tasks:', error);
      alert('Failed to create tasks.');
    }
  };

  return (
    <div>
      {bookingsData
        .filter((booking) => booking.INVOICE === currentInvoice) 
        .map((booking) => {
          const invoice = booking.INVOICE;

          return (
            <div key={invoice} style={{ background:'#fff',margin:"0 15px",borderRadius:'10px', border: '1px solid #ddd', padding: '10px' }}>
              <div style={{display:'flex'}}>
                <label style={{ marginLeft: '20px', alignContent:'center'}}> Create Tasks :</label>
                <div className='view-editbutton' style={{ padding: '10px', display: 'flex' }}>
                  <button
                    style={{ background: 'red', borderRadius: '20px', padding: '8px', width: '100px' }}
                    onClick={() => createPickUpTask(invoice)}
                  >
                    Pick Up
                  </button>
                  <button
                    style={{ background: 'red', borderRadius: '20px', padding: '8px', width: '100px' }}
                    onClick={() => createTransitTask(invoice)}
                  >
                    Transit
                  </button>
                  <button
                    style={{ background: 'red', borderRadius: '20px', padding: '8px', width: '100px' }}
                    onClick={() => createDropTask(invoice)}
                  >
                    Drop
                  </button>
                </div>
              </div>

              {['pickUp', 'transit', 'drop'].map((type) => (
                <div key={type}>
                  <ul>
                    {tasks[invoice]?.[type]?.map((task) => (
                      <li key={task.id}>
                        {task.name}{' '}
                        <div className="team-details-my details-content-my3">
                          <div>
                            <label>Invoice</label>
                            <input
                              type="text"
                              name="INVOICE"
                              value={taskData[task.id]?.INVOICE || ''}
                              onChange={(e) => handleInputChange(task.id, 'INVOICE', e.target.value)}
                              readOnly
                            />
                          </div>
                          <div>
                            <label>Task Id</label>
                            <input
                              type="text"
                              name="Task_Id"
                              value={taskData[task.id]?.Task_Id || ''}
                              onChange={(e) => handleInputChange(task.id, 'Task_Id', e.target.value)}
                              readOnly
                            />
                          </div>
                          <div>
                            <label>Task Type</label>
                            <input
                              type="text"
                              name="Task_Type"
                              value={taskData[task.id]?.Task_Type || ''}
                              onChange={(e) => handleInputChange(task.id, 'Task_Type', e.target.value)}
                              readOnly
                            />
                          </div>
                          <div>
                            <label>Customer Instructions</label>
                            <input
                              type="text"
                              name="Customer_Instructions"
                              value={taskData[task.id]?.Customer_Instructions || ''}
                              onChange={(e) => handleInputChange(task.id, 'Customer_Instructions', e.target.value)}
                            />
                          </div>
                        </div>
                        <button
                          onClick={() => deleteTask(invoice, type, task.id)}
                          style={{ marginLeft: '10px' }}
                        >
                          Delete
                        </button>
                        <button
                          onClick={handleCreate}
                          style={{ marginTop: '20px', padding: '10px 20px', background: 'red', color: 'white', borderRadius: '10px' }}
                        >
                          Create
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

