
import React, { useState } from 'react';
import useBookings from '../../usebooking'; 
import axios from 'axios';
import '../My Bookings/mybook.css';
import Ptd from './Pickuptask';

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
        invoice: row.Record_ID
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
        .filter((booking) => booking.Record_ID === currentInvoice) 
        .map((booking) => {
          const invoice = booking.Record_ID;

          return (
            <div key={invoice} style={{ background:'#fff', margin:"0 15px", borderRadius:'10px',  padding: '10px' }}>
              <div>
           

                <div className='view-editbutton' style={{ padding: '20px', display: 'flex' }}>
                  <button
                    style={{ background: 'red', borderRadius: '20px', padding: '8px', width: '130px' }}
                    onClick={() => createTask(invoice, 'PickUp&Drop')}
                  >
                    Pick Up & Drop
                  </button>
                  <button
                    style={{ background: 'red', borderRadius: '20px', padding: '8px', width: '130px' }}
                    onClick={() => createTask(invoice, 'PickUp')}
                  >
                    Pick Up
                  </button>
                  <button
                    style={{ background: 'red', borderRadius: '20px', padding: '8px', width: '130px' }}
                    onClick={() => createTask(invoice, 'Transit')}
                  >
                    Transit
                  </button>
                  <button
                    style={{ background: 'red', borderRadius: '20px', padding: '8px', width: '130px' }}
                    onClick={() => createTask(invoice, 'Drop')}
                  >
                    Drop
                  </button>
                  <button
                    style={{ background: 'red', borderRadius: '20px', padding: '8px', width: '130px' }}
                    onClick={() => createTask(invoice, 'Storage')}
                  >
                    Storage
                  </button>
                </div>
              </div>
              {['PickUp&Drop','PickUp', 'Transit', 'Drop','Storage'].map((type) => (
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