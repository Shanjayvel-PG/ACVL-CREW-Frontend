// ParentComponent.js
import React, { useState } from 'react';
import TaskManager from './TaskManager';
import Ptd from './Pickuptask';
import Transit from './Transit';
import Drop from './Droptask';
import Pickdrop from './Pickupdrop';

const Merg = ({ currentInvoice }) => {
  const [refreshPtd, setRefreshPtd] = useState(false); 

  const handleRefreshPtd = () => {
    setRefreshPtd((prev) => !prev); 
  };

  return (
    <>
    <div>
      <TaskManager currentInvoice={currentInvoice} onCreateSuccess={handleRefreshPtd} />
    </div>
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
    </>
  );
};

export default Merg;
