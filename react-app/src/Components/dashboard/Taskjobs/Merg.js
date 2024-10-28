// ParentComponent.js
import React, { useState } from 'react';
import TaskManager from './TaskManager';
import Ptd from './Pickuptask';
import Transit from './Transit';
import Drop from './Droptask';
import Pickdrop from './Pickupdrop';
import Storagetask from './Storage';

const Merg = ({ currentInvoice }) => {
  const [refreshPtd, setRefreshPtd] = useState(false); 
  const [collapsed, setCollapsed] = useState(false);

  const handleRefreshPtd = () => {
    setRefreshPtd((prev) => !prev); 
  };

  const toggleCollapse = () => {
    setCollapsed(!collapsed); 
    
  };

  return (
    <>
    <div style={{background:'#fff', margin:'10px' , borderRadius:'10px'}}>
      <div className="detail-header">
        <h1>Task 
        <span 
          onClick={() => toggleCollapse()} 
          style={{ cursor: 'pointer', marginLeft: 'auto', float:'right' }}
        >
        {collapsed ? '+' : '-'}
        </span>
        </h1>
      </div>
      {!collapsed &&(
      <>
      <TaskManager currentInvoice={currentInvoice} onCreateSuccess={handleRefreshPtd} />
      <div className='details-header'>
      <Pickdrop currentInvoice={currentInvoice} refreshPtd={refreshPtd} />
      </div>
      <div className='details-header'>
      <Ptd currentInvoice={currentInvoice} refreshPtd={refreshPtd} />
      </div>
      <div className='details-header'>
      <Transit currentInvoice={currentInvoice} refreshPtd={refreshPtd} />
      </div>
      <div className='details-header'>
      <Drop currentInvoice={currentInvoice} refreshPtd={refreshPtd} />
      </div>
      <div className='details-header'>
      <Storagetask currentInvoice={currentInvoice} refreshPtd={refreshPtd} />
      </div>
      </>
)}
    </div>
    </>
  );
};

export default Merg;
