
// import React, { useState, useEffect } from 'react';
// import moment from 'moment';
// import './DateSlider.css';

// const DateSlider = ({ moveDate, setMoveDate, setHoveredDate, selectedMonth }) => {
//   const [dates, setDates] = useState([]);

//   useEffect(() => {
//     const startOfMonth = moment(selectedMonth, 'YYYY-MM').startOf('month');
//     const endOfMonth = startOfMonth.clone().endOf('month');
//     const tempDates = [];

//     for (let date = startOfMonth; date.isBefore(endOfMonth) || date.isSame(endOfMonth, 'day'); date.add(1, 'days')) {
//       tempDates.push(date.clone());
//     }

//     setDates(tempDates);
//   }, [selectedMonth]);

//   return (
//     <div className="date-slider-container">
//       <div className="date-slider">
//         <div className="date-line"></div>
//         {dates.map((date, index) => (
//           <div
//             key={date.format('YYYY-MM-DD')}
//             className={`date-item ${date.format('YYYY-MM-DD') === moveDate ? 'selected' : ''}`}
//             onClick={() => setMoveDate(date.format('YYYY-MM-DD'))}
//             onMouseEnter={() => setHoveredDate(date.format('YYYY-MM-DD'))}
//             onMouseLeave={() => setHoveredDate('')}
//           >
//             <div className={`date-marker ${index % 5 === 4 ? 'major' : 'minor'}`}></div>
//             {index % 5 === 4 && (
//               <div className="date-label">
//                 {date.format('DD')}
//               </div>
//             )}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default DateSlider;

import React, { useState, useEffect } from 'react';
import moment from 'moment';
import './Dateslider.css';

const DateSlider = ({ moveDate, setMoveDate, setHoveredDate, selectedMonth }) => {
  const [dates, setDates] = useState([]);

  useEffect(() => {
    const tempDates = [];

    if (selectedMonth === "Next 30 Days") {
      for (let i = 0; i < 30; i++) {
        tempDates.push(moment().add(i, 'days'));
      }
    } else {
      const startOfMonth = moment(selectedMonth, 'YYYY-MM').startOf('month');
      const endOfMonth = startOfMonth.clone().endOf('month');
      
      for (let date = startOfMonth; date.isBefore(endOfMonth) || date.isSame(endOfMonth, 'day'); date.add(1, 'days')) {
        tempDates.push(date.clone());
      }
    }

    setDates(tempDates);
  }, [selectedMonth]);

  return (
    <div className="date-slider-container">
      <div className="date-slider">
        <div className="date-line"></div>
        {dates.map((date,index) => (
                    <div
                    key={date.format('YYYY-MM-DD')}
                    className={`date-item ${date.format('YYYY-MM-DD') === moveDate ? 'selected' : ''}`}
                    onClick={() => {
                      setMoveDate(date.format('YYYY-MM-DD')); // Set the clicked date
                    }}
                    onMouseEnter={() => setHoveredDate(date.format('YYYY-MM-DD'))}
                    onMouseLeave={() => setHoveredDate('')}
                  >
                    <div className={`date-marker ${index % 7 === 6 ? 'major' : 'minor'}`}></div>
                    {index % 7 === 6 && (
                      <div className="date-label">
                        {date.format('ddd')}
                      </div>
                    )}
                    <div className="date-hover-label">
                      {date.format('D MMM')}
                    </div>
                  </div>
        ))}
      </div>
    </div>
  );
};

export default DateSlider;
