import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './dashboard/My Bookings/Excel.css';


// // const Gridview = ({ rawData }) => {
 
// //   const [allData, setAllData] = useState({
// //     moveDateValues: [],
// //     moveFromValues: [],
// //     moveToValues: [],
// //     moveSizes: [],
// //     customerNames: [],
// //     moveFromFullAddresses: [],
// //     moveToFullAddresses: [],
// //     rowIndices: [],
// //   });
// //   const [currentMonth, setCurrentMonth] = useState(null); // Initially null to show next 30 days
// //   const tableContainerRef = useRef(null);
// //   const navigate = useNavigate();
// //   const processRawData = (data) => {
// //     const moveDateValues = data.map((entry) => {
// //       const dateParts = entry.MoveDate.replace(',', '').split(' ');
// //       if (dateParts.length === 3) {
// //         const [day, month, year] = dateParts;
// //         const date = new Date(`${year}-${month}-${day}`);
// //         if (!isNaN(date)) {
// //           return date;
// //         } else {
// //           console.error(`Invalid date: ${entry.MoveDate}`);
// //           return new Date('Invalid Date');
// //         }
// //       } else {
// //         console.error(`Invalid date format: ${entry.MoveDate}`);
// //         return new Date('Invalid Date');
// //       }
// //     });
// //     const moveFromValues = data.map((entry) => entry['Move_From'].slice(-2));
// //     const moveToValues = data.map((entry) => entry.Move_To.slice(-2));
// //     const moveSizes = data.map((entry) => entry['Move_Size']);
// //     const customerNames = data.map((entry) => entry['Customer_Name']);
// //     const moveFromFullAddresses = data.map((entry) => entry['Move_From']);
// //     const moveToFullAddresses = data.map((entry) => entry['Move_To']);
// //     const rowIndices = data.map((entry) => entry.row_index);
  
// //     return {
// //       moveDateValues,
// //       moveFromValues,
// //       moveToValues,
// //       moveSizes,
// //       customerNames,
// //       moveFromFullAddresses,
// //       moveToFullAddresses,
// //       rowIndices,
// //     };
// //   };
// //   useEffect(() => {
// //     const processedData = processRawData(rawData);
// //     // console.log('Processed Data:', processedData);
// //     setAllData(processedData);
// //   }, [rawData]);

// //   useEffect(() => {
// //     const handleIndicatorClick = (event) => {
// //       const rowIndex = event.target.getAttribute('data-row-index');
// //       navigate(`/booking-details/${rowIndex}`);
// //     };

// //     const tableContainer = tableContainerRef.current;

// //     const attachListeners = () => {
// //       const indicators = tableContainer.querySelectorAll('.indicator');
// //       indicators.forEach((indicator) => {
// //         indicator.addEventListener('click', handleIndicatorClick);
// //       });
// //     };

// //     const detachListeners = () => {
// //       const indicators = tableContainer.querySelectorAll('.indicator');
// //       indicators.forEach((indicator) => {
// //         indicator.removeEventListener('click', handleIndicatorClick);
// //       });
// //     };

// //     attachListeners();

// //     return () => {
// //       detachListeners();
// //     };
// //   }, [allData, currentMonth, navigate]);

// //   const getMonthAbbreviation = (monthIndex) => {
// //     const monthAbbreviations = [
// //       'Jan',
// //       'Feb',
// //       'Mar',
// //       'Apr',
// //       'May',
// //       'Jun',
// //       'Jul',
// //       'Aug',
// //       'Sep',
// //       'Oct',
// //       'Nov',
// //       'Dec',
// //     ];
// //     return monthAbbreviations[monthIndex];
// //   };

// //   const getCellValue = (
// //     province,
// //     date,
// //     moveDateValues,
// //     moveFromValues,
// //     moveToValues,
// //     moveSizes,
// //     customerNames,
// //     moveFromFullAddresses,
// //     moveToFullAddresses,
// //     rowIndices
// //   ) => {
// //     let cellValue = '';
// //     for (let i = 0; i < moveDateValues.length; i++) {
// //       if (isNaN(moveDateValues[i])) continue;
  
// //       const formattedDate = `${moveDateValues[i].getDate()}-${getMonthAbbreviation(
// //         moveDateValues[i].getMonth()
// //       )}-${moveDateValues[i].getFullYear()}`;
  
// //       if (formattedDate === date) {
// //         const rowIndex = rowIndices[i];
// //         const moveDate = moveDateValues[i].toLocaleDateString();
// //         const moveTo = moveToValues[i];
// //         const moveSize = moveSizes[i];
// //         const moveFromFullAddress = moveFromFullAddresses[i];
// //         const moveToFullAddress = moveToFullAddresses[i];
// //         const popupContent = `
// //         <div class="popup1">
// //           <div class="popup-content1" onClick="event.stopPropagation()">
// //             <strong>Customer Name:</strong> ${customerNames[i]}<br/>
// //             <strong>Move Date:</strong> ${moveDate}<br/>
// //             <strong>Move From:</strong> ${moveFromFullAddress}<br/>
// //             <strong>Move To:</strong> ${moveToFullAddress}<br/>
// //             <strong>Move Size:</strong> ${moveSize}
// //           </div>
// //         </div>`;
// //         if (
// //           moveFromValues[i] === province &&
// //           moveFromValues[i] === moveToValues[i]
// //         ) {
// //           cellValue += `<span class="indicator both-indicator" data-row-index="${rowIndex}" data-date="${moveDate}">▸◂${popupContent}</span>`;
// //         } else if (moveFromValues[i] === province) {
// //           cellValue += `<span class="indicator right-indicator" data-row-index="${rowIndex}" data-date="${moveDate}">▸${popupContent}</span>`;
// //         } else if (moveToValues[i] === province) {
// //           cellValue += `<span class="indicator left-indicator" data-row-index="${rowIndex}" data-date="${moveDate}">◂${popupContent}</span>`;
// //         }
// //       }
// //     }
// //     return cellValue || '<span class="no-move"></span>';
// //   };

// //   const getAllDatesInMonth = (year, month) => {
// //     const dates = [];
// //     const date = new Date(year, month, 1);
// //     while (date.getMonth() === month) {
// //       dates.push(new Date(date));
// //       date.setDate(date.getDate() + 1);
// //     }
// //     return dates;
// //   };

// //   const displayTable = (
// //     moveDateValues,
// //     moveFromValues,
// //     moveToValues,
// //     moveSizes,
// //     customerNames,
// //     moveFromFullAddresses,
// //     moveToFullAddresses,
// //     rowIndices,
// //     year,
// //     month
// //   ) => {
// //     const provinces = [
// //       'YT',
// //       'NT',
// //       'BC',
// //       'AB',
// //       'SK',
// //       'MB',
// //       'ON',
// //       'NB',
// //       'NS',
// //       'PE',
// //       'QC',
// //       'NL',
// //     ];
// //     const allDates = currentMonth === null ? getDatesForNext30Days() : getAllDatesInMonth(year, month);

// //     const uniqueDates = allDates.map(
// //       (date) =>
// //         `${date.getDate()}-${getMonthAbbreviation(date.getMonth())}-${date.getFullYear()}`
// //     );

// //     let table = '<table key="table-' + (currentMonth === null ? 'next-30-days' : currentMonth) + '"><thead><tr><th class="sticky">Province</th>';
// //     uniqueDates.forEach((date) => {
// //       table += `<th class="date-header">${date}</th>`;
// //     });
// //     table += '</tr></thead><tbody>';

// //     provinces.forEach((province) => {
// //       table += `<tr><td class="sticky">${province}</td>`;
// //       uniqueDates.forEach((date) => {
// //         const cellValue = getCellValue(
// //           province,
// //           date,
// //           moveDateValues,
// //           moveFromValues,
// //           moveToValues,
// //           moveSizes,
// //           customerNames,
// //           moveFromFullAddresses,
// //           moveToFullAddresses,
// //           rowIndices
// //         );
// //         table += `<td class="data-cell">${cellValue}</td>`;
// //       });
// //       table += '</tr>';
// //     });

// //     table += '</tbody></table>';
// //     return { __html: table };
// //   };

// //   const showMonth = (monthIndex) => {
// //     setCurrentMonth(monthIndex);
// //   };

// //   const getDatesForNext30Days = () => {
// //     const dates = [];
// //     const date = new Date();
// //     for (let i = 0; i < 30; i++) {
// //       dates.push(new Date(date));
// //       date.setDate(date.getDate() + 1);
// //     }
// //     return dates;
// //   };

// //   // const createMonthButtons = () => {
// //   //   const buttons = [];
// //   //   for (let monthIndex = 0; monthIndex < 12; monthIndex++) {
// //   //     buttons.push(
// //   //       <button
// //   //         key={monthIndex}
// //   //         className="month-button"
// //   //         onClick={() => showMonth(monthIndex)}
// //   //       >
// //   //         {getMonthAbbreviation(monthIndex)}
// //   //       </button>
// //   //     );
// //   //   }
// //   //   return buttons;
// //   // };

// //   // return (
// //   //   <div>
// //   //     <div className="month-buttons">
// //   //       <button
// //   //         key="next-30-days"
// //   //         className="month-button"
// //   //         onClick={() => setCurrentMonth(null)}
// //   //       >
// //   //         Move In The Next 30 Days
// //   //       </button>
// //   //       {createMonthButtons()}
// //   //     </div>
// //   //     <div className="table-container" ref={tableContainerRef}>
// //   //       <div
// //   //         dangerouslySetInnerHTML={displayTable(
// //   //           allData.moveDateValues || [],
// //   //           allData.moveFromValues || [],
// //   //           allData.moveToValues || [],
// //   //           allData.moveSizes || [],
// //   //           allData.customerNames || [],
// //   //           allData.moveFromFullAddresses || [],
// //   //           allData.moveToFullAddresses || [],
// //   //           allData.rowIndices || [],
// //   //           new Date().getFullYear(),
// //   //           currentMonth
// //   //         )}
// //   //       />
// //   //     </div>
// //   //   </div>
// //   // );
// //   const createMonthButtons = () => {
// //     const buttons = [];
// //     for (let monthIndex = 0; monthIndex < 12; monthIndex++) {
// //       buttons.push(
// //         <button
// //           key={monthIndex}
// //           className={`month-button ${currentMonth === monthIndex ? 'active' : ''}`}
// //           onClick={() => showMonth(monthIndex)}
// //         >
// //           {getMonthAbbreviation(monthIndex)}
// //         </button>
// //       );
// //     }
// //     return buttons;
// //   };
  
// //   return (
// //     <div>
// //       <div className="month-buttons">
// //         <button
// //           key="next-30-days"
// //           className={`month-button ${currentMonth === null ? 'active' : ''}`}
// //           onClick={() => setCurrentMonth(null)}
// //         >
// //           Move In The Next 30 Days
// //         </button>
// //         {createMonthButtons()}
// //       </div>
// //       <div className="table-container" ref={tableContainerRef}>
// //         <div
// //           dangerouslySetInnerHTML={displayTable(
// //             allData.moveDateValues || [],
// //             allData.moveFromValues || [],
// //             allData.moveToValues || [],
// //             allData.moveSizes || [],
// //             allData.customerNames || [],
// //             allData.moveFromFullAddresses || [],
// //             allData.moveToFullAddresses || [],
// //             allData.rowIndices || [],
// //             new Date().getFullYear(),
// //             currentMonth
// //           )}
// //         />
// //       </div>
// //     </div>
// //   );
// // };

// // export default Gridview;
// const Gridview = ({ rawData }) => {
//   const [allData, setAllData] = useState({
//     moveDateValues: [],
//     moveFromValues: [],
//     moveToValues: [],
//     moveSizes: [],
//     customerNames: [],
//     moveFromFullAddresses: [],
//     moveToFullAddresses: [],
//     rowIndices: [],
//     provinceCities: {},
//   });
//   const [currentMonth, setCurrentMonth] = useState(null);
//   const [activeProvince, setActiveProvince] = useState(null);
//   const tableContainerRef = useRef(null);
//   const navigate = useNavigate();

//   const processRawData = (data) => {
//     const moveDateValues = data.map((entry) => {
//       const dateParts = entry.MoveDate.replace(',', '').split(' ');
//       if (dateParts.length === 3) {
//         const [day, month, year] = dateParts;
//         const date = new Date(`${year}-${month}-${day}`);
//         return isNaN(date) ? new Date('Invalid Date') : date;
//       } else {
//         return new Date('Invalid Date');
//       }
//     });

//     const moveFromValues = data.map((entry) => entry['Move_From'].slice(-2));
//     const moveToValues = data.map((entry) => entry.Move_To.slice(-2));
//     const moveSizes = data.map((entry) => entry['Move_Size']);
//     const customerNames = data.map((entry) => entry['Customer_Name']);
//     const moveFromFullAddresses = data.map((entry) => entry['Move_From']);
//     const moveToFullAddresses = data.map((entry) => entry['Move_To']);
//     const rowIndices = data.map((entry) => entry.row_index);

//     const provinceCities = {};
//     data.forEach((entry) => {
//       const fromProvince = entry['Move_From'].slice(-2);
//       const toProvince = entry.Move_To.slice(-2);
//       if (!provinceCities[fromProvince]) provinceCities[fromProvince] = new Set();
//       if (!provinceCities[toProvince]) provinceCities[toProvince] = new Set();
//       provinceCities[fromProvince].add(entry['Move_From']);
//       provinceCities[toProvince].add(entry.Move_To);
//     });

//     return {
//       moveDateValues,
//       moveFromValues,
//       moveToValues,
//       moveSizes,
//       customerNames,
//       moveFromFullAddresses,
//       moveToFullAddresses,
//       rowIndices,
//       provinceCities,
//     };
//   };

//   useEffect(() => {
//     const processedData = processRawData(rawData);
//     setAllData(processedData);
//   }, [rawData]);

//   const getMonthAbbreviation = (monthIndex) => {
//     const monthAbbreviations = [
//       'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
//     ];
//     return monthAbbreviations[monthIndex];
//   };

//   const getAllDatesInMonth = (year, month) => {
//     const dates = [];
//     const date = new Date(year, month, 1);
//     while (date.getMonth() === month) {
//       dates.push(new Date(date));
//       date.setDate(date.getDate() + 1);
//     }
//     return dates;
//   };

//   const navigateToDetails = (rowIndex) => {
//     navigate(`/booking-details/${rowIndex}`);
//   };

//   const displayTable = (
//     moveDateValues,
//     moveFromValues,
//     moveToValues,
//     moveSizes,
//     customerNames,
//     moveFromFullAddresses,
//     moveToFullAddresses,
//     rowIndices,
//     provinceCities,
//     year,
//     month
//   ) => {
//     const provinces = ['YT', 'NT', 'BC', 'AB', 'SK', 'MB', 'ON', 'NB', 'NS', 'PE', 'QC', 'NL'];
//     const allDates = currentMonth === null ? getDatesForNext30Days() : getAllDatesInMonth(year, month);
//     const uniqueDates = allDates.map(
//       (date) => `${date.getDate()}-${getMonthAbbreviation(date.getMonth())}-${date.getFullYear()}`
//     );

//     return (
//       <table>
//         <thead>
//           <tr className='parent-cell'>
//             <th className="sticky centered-cell title">Province</th>
//             <th className="sticky centered-cell title">City</th>
//             {uniqueDates.map((date, index) => (
//               <th key={index} className="date-header centered-cell">
//                 {date}
//               </th>
//             ))}
//           </tr>
//         </thead>
//         <tbody>
//         {
//   provinces.map((province) => {
//     const cities = Array.from(provinceCities[province] || []);

//     const hasValidData = moveDateValues.some((moveDate, i) => {
//       const formattedDate = `${moveDate.getDate()}-${getMonthAbbreviation(moveDate.getMonth())}-${moveDate.getFullYear()}`;
//       return formattedDate && uniqueDates.includes(formattedDate) &&
//         (moveFromValues[i] === province || moveToValues[i] === province);
//     });

//     // Step 1: Display all provinces, but only make clickable if they have valid data
//     if (!activeProvince || activeProvince !== province) {
//       return (
//         <tr key={province}>
//           <td
//             className={`sticky province-cell centered-cell ${activeProvince === province ? 'active' : ''}`}
//             onClick={hasValidData ? () => setActiveProvince(province) : null} // Clickable only if it has data
//             style={{ cursor: hasValidData ? 'pointer' : 'default' }} // Show pointer cursor only when clickable
//           >
//             {province}
//           </td>
//           <td className="city-cell centered-cell"></td>
//           {uniqueDates.map((date, index) => (
//             <td key={index} className="data-cell centered-cell">
//               {hasValidData
//                 ? getAllIndicatorsForProvince(
//                     province,
//                     date,
//                     moveDateValues,
//                     moveFromValues,
//                     moveToValues,
//                     moveSizes,
//                     customerNames,
//                     moveFromFullAddresses,
//                     moveToFullAddresses,
//                     rowIndices
//                   )
//                 : <span></span>} {/* Blank cell */}
//             </td>
//           ))}
//         </tr>
//       );
//     }

//   // Step 2: Expanded view, show cities and move details
// if (activeProvince === province) {

//   const validCities = cities.filter((city) => {
//     return uniqueDates.some((date) => {
//       return getCellValue(
//         province,
//         date,
//         moveDateValues,
//         moveFromValues,
//         moveToValues,
//         moveSizes,
//         customerNames,
//         moveFromFullAddresses,
//         moveToFullAddresses,
//         rowIndices,
//         city
//       ).length > 0;
//     });
//   });

//   // If no valid cities, do not display anything for this province
//   if (validCities.length === 0) {
//     return null;
//   }

//   return (
//     <React.Fragment key={province}>
//       {validCities.map((city, cityIndex) => (
//         <tr key={cityIndex} className={activeProvince === province ? 'active-city-row' : ''}>
//           {/* Only render the province name for the first city row, with rowspan */}
//           {cityIndex === 0 && (
//             <td
//               className={`sticky province-cell centered-cell ${activeProvince === province ? 'active' : ''}`}
//               rowSpan={validCities.length} // Span province cell across all valid cities
//               onClick={() => setActiveProvince(null)} // Collapse view on click
//             >
//               {province}
//             </td>
//           )}
//           <td className="city-cell centered-cell">{city}</td> {/* Render city name in the city column */}
//           {uniqueDates.map((date, index) => (
//             <td key={index} className="data-cell centered-cell">
//               {getCellValue(
//                 province,
//                 date,
//                 moveDateValues,
//                 moveFromValues,
//                 moveToValues,
//                 moveSizes,
//                 customerNames,
//                 moveFromFullAddresses,
//                 moveToFullAddresses,
//                 rowIndices,
//                 city // Display move data for this city
//               )}
//             </td>
//           ))}
//         </tr>
//       ))}
//     </React.Fragment>
//   );
// }

// return null;



//           })}
//         </tbody>
//       </table>
//     );
//   };

//   // Collect and display all indicators for a given province and date (Step 1)
//   const getAllIndicatorsForProvince = (
//     province,
//     date,
//     moveDateValues,
//     moveFromValues,
//     moveToValues,
//     moveSizes,
//     customerNames,
//     moveFromFullAddresses,
//     moveToFullAddresses,
//     rowIndices
//   ) => {
//     const indicators = [];

//     for (let i = 0; i < moveDateValues.length; i++) {
//       if (isNaN(moveDateValues[i])) continue;

//       const formattedDate = `${moveDateValues[i].getDate()}-${getMonthAbbreviation(
//         moveDateValues[i].getMonth()
//       )}-${moveDateValues[i].getFullYear()}`;

//       if (formattedDate === date) {
//         const moveFrom = moveFromValues[i];
//         const moveTo = moveToValues[i];
//         const customerName = customerNames[i];
//         const rowIndex = rowIndices[i];
//         const moveSize = moveSizes[i];
//         const moveFromFullAddress = moveFromFullAddresses[i];
//         const moveToFullAddress = moveToFullAddresses[i];

//         // Tooltip content for each move
//         const tooltipContent = (
//           <div>
//             <strong>Customer Name:</strong> {customerName}<br />
//             <strong>Province:</strong> {province}<br />
//             <strong>Move Date:</strong> {formattedDate}<br />
//             <strong>Move From:</strong> {moveFromFullAddress}<br />
//             <strong>Move To:</strong> {moveToFullAddress}<br />
//             <strong>Move Size:</strong> {moveSize}
//           </div>
//         );

//         // If move starts and ends in the same province
//         if (moveFrom === province && moveTo === province) {
//           indicators.push(
//             <span key={`${i}-both`} className="indicator both-indicator" onClick={() => navigateToDetails(rowIndex)}>
//               ▸◂
//               <div className="tooltip">{tooltipContent}</div>
//             </span>
//           );
//         } else if (moveFrom === province) {
//           indicators.push(
//             <span key={`${i}-from`} className="indicator right-indicator" onClick={() => navigateToDetails(rowIndex)}>
//               ▸
//               <div className="tooltip">{tooltipContent}</div>
//             </span>
//           );
//         } else if (moveTo === province) {
//           indicators.push(
//             <span key={`${i}-to`} className="indicator left-indicator" onClick={() => navigateToDetails(rowIndex)}>
//               ◂
//               <div className="tooltip">{tooltipContent}</div>
//             </span>
//           );
//         }
//       }
//     }

//     // Return all indicators stacked vertically, or leave the cell blank if no data
//     return indicators.length > 0 
//       ? <div className="indicator-container">{indicators}</div> 
//       : <span></span>; {/* Blank cell */}
//   };

//   const createMonthButtons = () => {
//     const buttons = [];
//     for (let monthIndex = 0; monthIndex < 12; monthIndex++) {
//       buttons.push(
//         <button
//           key={monthIndex}
//           className={`month-button ${currentMonth === monthIndex ? 'active' : ''}`}
//           onClick={() => showMonth(monthIndex)}
//         >
//           {getMonthAbbreviation(monthIndex)}
//         </button>
//       );
//     }
//     return buttons;
//   };

//   const getCellValue = (
//     province,
//     date,
//     moveDateValues,
//     moveFromValues,
//     moveToValues,
//     moveSizes,
//     customerNames,
//     moveFromFullAddresses,
//     moveToFullAddresses,
//     rowIndices,
//     selectedCity = null
//   ) => {
//     const cellElements = [];

//     for (let i = 0; i < moveDateValues.length; i++) {
//       if (isNaN(moveDateValues[i])) continue;

//       const formattedDate = `${moveDateValues[i].getDate()}-${getMonthAbbreviation(
//         moveDateValues[i].getMonth()
//       )}-${moveDateValues[i].getFullYear()}`;

//       if (formattedDate === date) {
//         const moveFrom = moveFromValues[i];
//         const moveTo = moveToValues[i];
//         const moveFromFullAddress = moveFromFullAddresses[i];
//         const moveToFullAddress = moveToFullAddresses[i];
//         const moveSize = moveSizes[i];
//         const customerName = customerNames[i];
//         const rowIndex = rowIndices[i];

//         if (!selectedCity || moveFromFullAddress.includes(selectedCity) || moveToFullAddress.includes(selectedCity)) {
//           const tooltipContent = (
//             <div>
//               <strong>Customer Name:</strong> {customerName}<br />
//               <strong>Province:</strong> {province}<br />
//               <strong>Move Date:</strong> {formattedDate}<br />
//               <strong>Move From:</strong> {moveFromFullAddress}<br />
//               <strong>Move To:</strong> {moveToFullAddress}<br />
//               <strong>Move Size:</strong> {moveSize}
//             </div>
//           );

//           if (moveFromFullAddress === moveToFullAddress && moveFromFullAddress.includes(selectedCity)) {
//             cellElements.push(
//               <span key={i} className="indicator both-indicator" onClick={() => navigateToDetails(rowIndex)}>
//                 ▸◂
//                 <div className="tooltip">{tooltipContent}</div>
//               </span>
//             );
//           } else {
//             if (moveFromFullAddress.includes(selectedCity)) {
//               cellElements.push(
//                 <span key={i} className="indicator right-indicator" onClick={() => navigateToDetails(rowIndex)}>
//                   ▸
//                   <div className="tooltip">{tooltipContent}</div>
//                 </span>
//               );
//             }
//             if (moveToFullAddress.includes(selectedCity)) {
//               cellElements.push(
//                 <span key={i} className="indicator left-indicator" onClick={() => navigateToDetails(rowIndex)}>
//                   ◂
//                   <div className="tooltip">{tooltipContent}</div>
//                 </span>
//               );
//             }
//           }
//         }
//       }
//     }

//     return cellElements.length > 0 ? cellElements : <span></span>; {/* Blank cell */}
//   };

//   const showMonth = (monthIndex) => {
//     setCurrentMonth(monthIndex);
//   };

//   const getDatesForNext30Days = () => {
//     const dates = [];
//     const date = new Date();
//     for (let i = 0; i < 30; i++) {
//       dates.push(new Date(date));
//       date.setDate(date.getDate() + 1);
//     }
//     return dates;
//   };

//   return (
//     <div>
//       <div className="month-buttons">
//          <button
//            key="next-30-days"
//          className={`month-button ${currentMonth === null ? 'active' : ''}`}
//            onClick={() => setCurrentMonth(null)}
//         >
//           Move In The Next 30 Days
//         </button>
//         {createMonthButtons()}
//       </div> 
//       <div ref={tableContainerRef} className="table-container">
//         {displayTable(
//           allData.moveDateValues,
//           allData.moveFromValues,
//           allData.moveToValues,
//           allData.moveSizes,
//           allData.customerNames,
//           allData.moveFromFullAddresses,
//           allData.moveToFullAddresses,
//           allData.rowIndices,
//           allData.provinceCities,
//           new Date().getFullYear(),
//           currentMonth
//         )}
//       </div>
//     </div>
//   );
// };

// export default Gridview;



const Gridview = ({ rawData }) => {
  const [allData, setAllData] = useState({
    moveDateValues: [],
    moveFromValues: [],
    moveToValues: [],
    moveSizes: [],
    customerNames: [],
    moveFromFullAddresses: [],
    moveToFullAddresses: [],
    rowIndices: [],
    provinceCities: {},
  });
  const [currentMonth, setCurrentMonth] = useState(null);
  const [activeProvince, setActiveProvince] = useState(null);
  const tableContainerRef = useRef(null);
  const navigate = useNavigate();

  const processRawData = (data) => {
    const moveDateValues = data.map((entry) => {
      const dateParts = entry.MoveDate.replace(',', '').split(' ');
      if (dateParts.length === 3) {
        const [day, month, year] = dateParts;
        const date = new Date(`${year}-${month}-${day}`);
        return isNaN(date) ? new Date('Invalid Date') : date;
      } else {
        return new Date('Invalid Date');
      }
    });

    const moveFromValues = data.map((entry) => entry['Move_From'].slice(-2));
    const moveToValues = data.map((entry) => entry.Move_To.slice(-2));
    const moveSizes = data.map((entry) => entry['Move_Size']);
    const customerNames = data.map((entry) => entry['Customer_Name']);
    const moveFromFullAddresses = data.map((entry) => entry['Move_From']);
    const moveToFullAddresses = data.map((entry) => entry['Move_To']);
    const rowIndices = data.map((entry) => entry.row_index);

    const provinceCities = {};
    data.forEach((entry) => {
      const fromProvince = entry['Move_From'].slice(-2);
      const toProvince = entry.Move_To.slice(-2);
      if (!provinceCities[fromProvince]) provinceCities[fromProvince] = new Set();
      if (!provinceCities[toProvince]) provinceCities[toProvince] = new Set();
      provinceCities[fromProvince].add(entry['Move_From']);
      provinceCities[toProvince].add(entry.Move_To);
    });

    return {
      moveDateValues,
      moveFromValues,
      moveToValues,
      moveSizes,
      customerNames,
      moveFromFullAddresses,
      moveToFullAddresses,
      rowIndices,
      provinceCities,
    };
  };

  useEffect(() => {
    const processedData = processRawData(rawData);
    setAllData(processedData);
  }, [rawData]);

  const getMonthAbbreviation = (monthIndex) => {
    const monthAbbreviations = [
      'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
    ];
    return monthAbbreviations[monthIndex];
  };

  const getAllDatesInMonth = (year, month) => {
    const dates = [];
    const date = new Date(year, month, 1);
    while (date.getMonth() === month) {
      dates.push(new Date(date));
      date.setDate(date.getDate() + 1);
    }
    return dates;
  };

  const navigateToDetails = (rowIndex) => {
    navigate(`/booking-details/${rowIndex}`);
  };

  const displayTable = (
    moveDateValues,
    moveFromValues,
    moveToValues,
    moveSizes,
    customerNames,
    moveFromFullAddresses,
    moveToFullAddresses,
    rowIndices,
    provinceCities,
    year,
    month
  ) => {
    const provinces = ['YT', 'NT', 'BC', 'AB', 'SK', 'MB', 'ON', 'NB', 'NS', 'PE', 'QC', 'NL'];
    const allDates = currentMonth === null ? getDatesForNext30Days() : getAllDatesInMonth(year, month);
    const uniqueDates = allDates.map(
      (date) => `${date.getDate()}-${getMonthAbbreviation(date.getMonth())}-${date.getFullYear()}`
    );

    // Step 1: Count total moves for each unique date
    const totalMovesPerDate = uniqueDates.map((uniqueDate) =>
      moveDateValues.reduce((count, moveDate) => {
        const formattedMoveDate = `${moveDate.getDate()}-${getMonthAbbreviation(moveDate.getMonth())}-${moveDate.getFullYear()}`;
        return formattedMoveDate === uniqueDate ? count + 1 : count;
      }, 0)
    );

    return (
      <table>
        <thead>
          <tr className='parent-cell'>
            <th className="sticky centered-cell title">Province</th>
            <th className="sticky centered-cell title">City</th>
            {uniqueDates.map((date, index) => (
              <th key={index} className="date-header centered-cell">
                {date}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {provinces.map((province) => {
            const cities = Array.from(provinceCities[province] || []);

            const hasValidData = moveDateValues.some((moveDate, i) => {
              const formattedDate = `${moveDate.getDate()}-${getMonthAbbreviation(moveDate.getMonth())}-${moveDate.getFullYear()}`;
              return formattedDate && uniqueDates.includes(formattedDate) &&
                (moveFromValues[i] === province || moveToValues[i] === province);
            });

            if (!activeProvince || activeProvince !== province) {
              return (
                <tr key={province}>
                  <td
                    className={`sticky province-cell centered-cell ${activeProvince === province ? 'active' : ''}`}
                    onClick={hasValidData ? () => setActiveProvince(province) : null}
                    style={{ cursor: hasValidData ? 'pointer' : 'default' }}
                  >
                    {province}
                  </td>
                  <td className="city-cell centered-cell"></td>
                  {uniqueDates.map((date, index) => (
                    <td key={index} className="data-cell centered-cell">
                      {hasValidData
                        ? getAllIndicatorsForProvince(
                            province,
                            date,
                            moveDateValues,
                            moveFromValues,
                            moveToValues,
                            moveSizes,
                            customerNames,
                            moveFromFullAddresses,
                            moveToFullAddresses,
                            rowIndices
                          )
                        : <span></span>}
                    </td>
                  ))}
                </tr>
              );
            }

            if (activeProvince === province) {
              const validCities = cities.filter((city) => {
                return uniqueDates.some((date) => {
                  return getCellValue(
                    province,
                    date,
                    moveDateValues,
                    moveFromValues,
                    moveToValues,
                    moveSizes,
                    customerNames,
                    moveFromFullAddresses,
                    moveToFullAddresses,
                    rowIndices,
                    city
                  ).length > 0;
                });
              });

              if (validCities.length === 0) {
                return null;
              }

              return (
                <React.Fragment key={province}>
                  {validCities.map((city, cityIndex) => (
                    <tr key={cityIndex} className={activeProvince === province ? 'active-city-row' : ''}>
                      {cityIndex === 0 && (
                        <td
                          className={`sticky province-cell centered-cell ${activeProvince === province ? 'active' : ''}`}
                          rowSpan={validCities.length}
                          onClick={() => setActiveProvince(null)}
                        >
                          {province}
                        </td>
                      )}
                      <td className="city-cell centered-cell">{city}</td>
                      {uniqueDates.map((date, index) => (
                        <td key={index} className="data-cell centered-cell">
                          {getCellValue(
                            province,
                            date,
                            moveDateValues,
                            moveFromValues,
                            moveToValues,
                            moveSizes,
                            customerNames,
                            moveFromFullAddresses,
                            moveToFullAddresses,
                            rowIndices,
                            city
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                </React.Fragment>
              );
            }

            return null;
          })}
        </tbody>
        <tfoot>
          {/* Step 2: Display total moves per date */}
          <tr>
            <td colSpan="2" className="centered-cell total-moves-label">Total Moves</td>
            {totalMovesPerDate.map((total, index) => (
              <td key={index} className="centered-cell total-moves">
                {total}
              </td>
            ))}
          </tr>
        </tfoot>
      </table>
    );
  };

  const getAllIndicatorsForProvince = (
    province,
    date,
    moveDateValues,
    moveFromValues,
    moveToValues,
    moveSizes,
    customerNames,
    moveFromFullAddresses,
    moveToFullAddresses,
    rowIndices
  ) => {
    const indicators = [];

    for (let i = 0; i < moveDateValues.length; i++) {
      if (isNaN(moveDateValues[i])) continue;

      const formattedDate = `${moveDateValues[i].getDate()}-${getMonthAbbreviation(
        moveDateValues[i].getMonth()
      )}-${moveDateValues[i].getFullYear()}`;

      if (formattedDate === date) {
        const moveFrom = moveFromValues[i];
        const moveTo = moveToValues[i];
        const customerName = customerNames[i];
        const rowIndex = rowIndices[i];
        const moveSize = moveSizes[i];
        const moveFromFullAddress = moveFromFullAddresses[i];
        const moveToFullAddress = moveToFullAddresses[i];

        const tooltipContent = (
          <div>
            <strong>Customer Name:</strong> {customerName}<br />
            <strong>Province:</strong> {province}<br />
            <strong>Move Date:</strong> {formattedDate}<br />
            <strong>Move From:</strong> {moveFromFullAddress}<br />
            <strong>Move To:</strong> {moveToFullAddress}<br />
            <strong>Move Size:</strong> {moveSize}
          </div>
        );

        if (moveFrom === province && moveTo === province) {
          indicators.push(
            <span key={`${i}-both`} className="indicator both-indicator" onClick={() => navigateToDetails(rowIndex)}>
              ▸◂
              <div className="tooltip">{tooltipContent}</div>
            </span>
          );
        } else if (moveFrom === province) {
          indicators.push(
            <span key={`${i}-from`} className="indicator right-indicator" onClick={() => navigateToDetails(rowIndex)}>
              ▸
              <div className="tooltip">{tooltipContent}</div>
            </span>
          );
        } else if (moveTo === province) {
          indicators.push(
            <span key={`${i}-to`} className="indicator left-indicator" onClick={() => navigateToDetails(rowIndex)}>
              ◂
              <div className="tooltip">{tooltipContent}</div>
            </span>
          );
        }
      }
    }

    return indicators.length > 0
      ? <div className="indicator-container">{indicators}</div>
      : <span></span>;
  };

  const getCellValue = (
    province,
    date,
    moveDateValues,
    moveFromValues,
    moveToValues,
    moveSizes,
    customerNames,
    moveFromFullAddresses,
    moveToFullAddresses,
    rowIndices,
    selectedCity = null
  ) => {
    const cellElements = [];

    for (let i = 0; i < moveDateValues.length; i++) {
      if (isNaN(moveDateValues[i])) continue;

      const formattedDate = `${moveDateValues[i].getDate()}-${getMonthAbbreviation(
        moveDateValues[i].getMonth()
      )}-${moveDateValues[i].getFullYear()}`;

      if (formattedDate === date) {
        const moveFrom = moveFromValues[i];
        const moveTo = moveToValues[i];
        const moveFromFullAddress = moveFromFullAddresses[i];
        const moveToFullAddress = moveToFullAddresses[i];
        const moveSize = moveSizes[i];
        const customerName = customerNames[i];
        const rowIndex = rowIndices[i];

        if (!selectedCity || moveFromFullAddress.includes(selectedCity) || moveToFullAddress.includes(selectedCity)) {
          const tooltipContent = (
            <div>
              <strong>Customer Name:</strong> {customerName}<br />
              <strong>Province:</strong> {province}<br />
              <strong>Move Date:</strong> {formattedDate}<br />
              <strong>Move From:</strong> {moveFromFullAddress}<br />
              <strong>Move To:</strong> {moveToFullAddress}<br />
              <strong>Move Size:</strong> {moveSize}
            </div>
          );

          if (moveFromFullAddress === moveToFullAddress && moveFromFullAddress.includes(selectedCity)) {
            cellElements.push(
              <span key={i} className="indicator both-indicator" onClick={() => navigateToDetails(rowIndex)}>
                ▸◂
                <div className="tooltip">{tooltipContent}</div>
              </span>
            );
          } else {
            if (moveFromFullAddress.includes(selectedCity)) {
              cellElements.push(
                <span key={i} className="indicator right-indicator" onClick={() => navigateToDetails(rowIndex)}>
                  ▸
                  <div className="tooltip">{tooltipContent}</div>
                </span>
              );
            }
            if (moveToFullAddress.includes(selectedCity)) {
              cellElements.push(
                <span key={i} className="indicator left-indicator" onClick={() => navigateToDetails(rowIndex)}>
                  ◂
                  <div className="tooltip">{tooltipContent}</div>
                </span>
              );
            }
          }
        }
      }
    }

    return cellElements.length > 0 ? cellElements : <span></span>;
  };

  const showMonth = (monthIndex) => {
    setCurrentMonth(monthIndex);
  };

  const getDatesForNext30Days = () => {
    const dates = [];
    const date = new Date();
    for (let i = 0; i < 30; i++) {
      dates.push(new Date(date));
      date.setDate(date.getDate() + 1);
    }
    return dates;
  };
  const createMonthButtons = () => {
    const buttons = [];
    for (let monthIndex = 0; monthIndex < 12; monthIndex++) {
      buttons.push(
        <button
          key={monthIndex}
          className={`month-button ${currentMonth === monthIndex ? 'active' : ''}`}
          onClick={() => showMonth(monthIndex)}
        >
          {getMonthAbbreviation(monthIndex)}
        </button>
      );
    }
    return buttons;
  };

  return (
    <div>
      <div className="month-buttons">
         <button
           key="next-30-days"
         className={`month-button ${currentMonth === null ? 'active' : ''}`}
           onClick={() => setCurrentMonth(null)}
        >
          Move In The Next 30 Days
        </button>
        {createMonthButtons()}
      </div> 
      <div ref={tableContainerRef} className="table-container">
        {displayTable(
          allData.moveDateValues,
          allData.moveFromValues,
          allData.moveToValues,
          allData.moveSizes,
          allData.customerNames,
          allData.moveFromFullAddresses,
          allData.moveToFullAddresses,
          allData.rowIndices,
          allData.provinceCities,
          new Date().getFullYear(),
          currentMonth
        )}
      </div>
    </div>
  );
};

export default Gridview;
