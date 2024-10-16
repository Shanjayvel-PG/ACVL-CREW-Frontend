// import React from 'react';
// import moment from 'moment';
// import './month.css';

// const MonthSelector = ({ selectedMonth, setSelectedMonth }) => {
//   const months = moment.months();

//   const handleMonthClick = (month, year) => {
//     setSelectedMonth(moment(`${year}-${month}`, 'YYYY-MMMM').format('YYYY-MM'));
//   };

//   return (
//     <div className="month-selector">
//       {months.map((month, index) => {
//         const monthYear = moment().month(index).format('YYYY-MM');
//         const isSelected = selectedMonth === monthYear;
//         return (
//           <div
//             key={month}
//             className={`month-item ${isSelected ? 'selected' : ''}`}
//             onClick={() => handleMonthClick(month, moment().year())}
//           >
//            {month.slice(0, 3)}
//           </div>
//         );
//       })}
//     </div>
//   );
// };
// export default MonthSelector;
import React from 'react';
import moment from 'moment';
import './Month.css';

const MonthSelector = ({ selectedMonth, setSelectedMonth }) => {
  const months = moment.months();
  
  // Add "Next 30 Days" as the first option in the list
  const options = ["Next 30 Days", ...months];

  const handleMonthClick = (option, index) => {
    if (option === "Next 30 Days") {
      // Set a special value for "Next 30 Days" or handle this selection separately
      setSelectedMonth("Next 30 Days");
    } else {
      setSelectedMonth(moment().month(index - 1).format('YYYY-MM'));
    }
  };

  return (
    <div className="month-selector">
      {options.map((option, index) => {
        const isSelected = selectedMonth === (option === "Next 30 Days" ? "Next 30 Days" : moment().month(index - 1).format('YYYY-MM'));
        return (
          <div
            key={option}
            className={`month-item ${isSelected ? 'selected' : ''}`}
            onClick={() => handleMonthClick(option, index)}
          >
            {option === "Next 30 Days" ? option : option.slice(0, 3)}
          </div>
        );
      })}
    </div>
  );
};

export default MonthSelector;