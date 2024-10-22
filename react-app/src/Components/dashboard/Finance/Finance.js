// // import React,{useState} from "react";
// // import { BsGrid1X2Fill } from "react-icons/bs";
// // import { FaMapMarkerAlt, FaClipboardList, FaPen } from "react-icons/fa";
// // import "../My Bookings/mybook.css";
// // import useBookings from '../../usebooking';
// // import"./Finance.css";


// // const Finance = () => {
// //   const {
// //     bookingsData, 
// //     viewMode,
// //     setViewMode, 
// //     handleBookingClick1, 
// //   } = useBookings();

// //   const handleMarkerClick = (bookingId) => {
// //     handleBookingClick1(bookingId);
// //     setViewMode("list");
// //   };
// //   return (
// //     <div className="bookings-my">
// //       <div className="main-content-my">
// //         <div className="header-my">
// //           <div className="totalmoves">
// //           <h1>Finance</h1>
// //           </div>
// //           <div className="button-container">
// //             <button
// //               className={`view-button1 ${viewMode === "list" ? "active" : ""}`}
// //               onClick={() => setViewMode("list")}
// //             >
// //               <FaClipboardList />
// //               Table View
// //             </button>
// //           </div>
// //         </div>
// //         <div className="finance-container">
// //         <h2>Final Revenue</h2>

// //             <table className="finance-table1">
// //                 <thead>
// //                     <tr>
// //                     <th></th>
// //                     <th>No Of Move</th>
// //                     <th>Sum Estimate Amount ($)</th>
// //                     <th>Sum Final Amt (Including Tax)</th>
// //                     <th>Sum Final Amt (Excluding Tax)</th>
// //                     </tr>
// //                 </thead>
// //                 <tbody>
// //                     <td>Completed</td>                   
// //                 </tbody>
// //                 <tbody>
// //                     <td>Yet to Completed </td>                  
// //                 </tbody>
// //             </table>

// //             <h1>Revenue By Invoice</h1>
// //             <table className="finance-table">
// //                 <thead>
// //                 <tr>
// //                     <th>Move Date</th>
// //                     <th>Invoice #</th>
// //                     <th>Move Type</th>
// //                     <th>Estimate Amount ($)</th>
// //                     <th>Final Invoice Amt (Including Tax)</th>
// //                     <th>Final Invoice Amt (Excluding Tax)</th>
// //                 </tr>
// //                 </thead>
// //                 <tbody>
// //                 {bookingsData.map((booking) => (
// //                     <tr key={booking.row_index}>
// //                     <td  onClick={() => handleBookingClick1(booking.row_index)} >{booking.MoveDate}</td>
// //                     <td>{booking.INVOICE}</td>
// //                     <td>{booking.Move_Type}</td>
// //                     <td>{`$ ${booking.Estimate_Amount_$}`}</td>
// //                     <td>{`$ ${booking.Final_Invoice_Amt_Including_Tax}`}</td>
// //                     <td>{`$ ${booking.Final_Invoice_Amt_Excluding_Tax}`}</td>
// //                     </tr>
// //                 ))}
// //                 </tbody>
// //             </table>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default Finance;


// import React, { useState, useEffect } from "react";
// import { FaClipboardList } from "react-icons/fa";
// import "../My Bookings/mybook.css";
// import useBookings from '../../usebooking';
// import "./Finance.css";

// const Finance = () => {
//   const {
//     bookingsData, 
//     viewMode,
//     setViewMode, 
//     handleBookingClick1, 
//   } = useBookings();

//   const [completedBookings, setCompletedBookings] = useState([]);
//   const [yetToCompleteBookings, setYetToCompleteBookings] = useState([]);
//   const [totals, setTotals] = useState({
//     completed: {
//       estimateAmount: 0,
//       finalAmtIncludingTax: 0,
//       finalAmtExcludingTax: 0,
//     },
//     yetToComplete: {
//       estimateAmount: 0,
//     },
//   });

//   useEffect(() => {
//     // Separate bookings into completed and yet to complete
//     const completed = bookingsData.filter(
//       (booking) => booking.Final_Invoice_Amt_Excluding_Tax !== undefined && booking.Final_Invoice_Amt_Excluding_Tax !== null
//     );
//     const yetToComplete = bookingsData.filter(
//       (booking) => booking.Final_Invoice_Amt_Excluding_Tax === undefined || booking.Final_Invoice_Amt_Excluding_Tax === null
//     );

//     setCompletedBookings(completed);
//     setYetToCompleteBookings(yetToComplete);

//     // Calculate sums for completed bookings
//     const completedTotals = completed.reduce(
//       (acc, booking) => {
//         acc.estimateAmount += parseFloat(booking.Estimate_Amount_$) || 0;
//         acc.finalAmtIncludingTax += parseFloat(booking.Final_Invoice_Amt_Including_Tax) || 0;
//         acc.finalAmtExcludingTax += parseFloat(booking.Final_Invoice_Amt_Excluding_Tax) || 0;
//         return acc;
//       },
//       { estimateAmount: 0, finalAmtIncludingTax: 0, finalAmtExcludingTax: 0 }
//     );

//     // Calculate sums for yet to complete bookings
//     const yetToCompleteTotals = yetToComplete.reduce(
//       (acc, booking) => {
//         acc.estimateAmount += parseFloat(booking.Estimate_Amount_$) || 0;
//         return acc;
//       },
//       { estimateAmount: 0 }
//     );

//     // Update state with totals
//     setTotals({
//       completed: completedTotals,
//       yetToComplete: yetToCompleteTotals,
//     });
//   }, [bookingsData]);

//   const handleMarkerClick = (bookingId) => {
//     handleBookingClick1(bookingId);
//     setViewMode("list");
//   };

//   return (
//     <div className="bookings-my">
//       <div className="main-content-my">
//         <div className="header-my">
//           <div className="totalmoves">
//             <h1>Finance</h1>
//           </div>
//           <div className="button-container">
//             <button
//               className={`view-button1 ${viewMode === "list" ? "active" : ""}`}
//               onClick={() => setViewMode("list")}
//             >
//               <FaClipboardList />
//               Table View
//             </button>
//           </div>
//         </div>
//         <div className="finance-container">
//           <h1>Final Revenue:</h1>

//           <table className="finance-table1">
//             <thead>
//               <tr>
//                 <th></th>
//                 <th>No Of Move</th>
//                 <th>Sum Estimate Amount ($)</th>
//                 <th>Sum Final Amt (Including Tax)</th>
//                 <th>Sum Final Amt (Excluding Tax)</th>
//               </tr>
//             </thead>
//             <tbody>
//               <tr>
//                 <td>Completed</td>
//                 <td>{completedBookings.length}</td>
//                 <td>{`$ ${totals.completed.estimateAmount.toFixed(2)}`}</td>
//                 <td>{`$ ${totals.completed.finalAmtIncludingTax.toFixed(2)}`}</td>
//                 <td>{`$ ${totals.completed.finalAmtExcludingTax.toFixed(2)}`}</td>
//               </tr>
//             </tbody>
//             <tbody>
//               <tr>
//                 <td>Yet to Complete</td>
//                 <td>{yetToCompleteBookings.length}</td>
//                 <td>{`$ ${totals.yetToComplete.estimateAmount.toFixed(2)}`}</td>
//                 <td>-</td>
//                 <td>-</td>
//               </tr>
//             </tbody>
//           </table>

//           <h1>Revenue By Invoice:</h1>
//           <table className="finance-table">
//             <thead>
//               <tr>
//                 <th>Move Date</th>
//                 <th>Invoice #</th>
//                 <th>Move Type</th>
//                 <th>Estimate Amount ($)</th>
//                 <th>Final Invoice Amt (Including Tax)</th>
//                 <th>Final Invoice Amt (Excluding Tax)</th>
//               </tr>
//             </thead>
//             <tbody>
//               {bookingsData.map((booking) => (
//                 <tr key={booking.row_index}>
//                   <td onClick={() => handleBookingClick1(booking.row_index)}>
//                     {booking.MoveDate}
//                   </td>
//                   <td>{booking.INVOICE}</td>
//                   <td>{booking.Move_Type}</td>
//                   <td>{`$ ${booking.Estimate_Amount_$}`}</td>
//                   <td>{`$ ${booking.Final_Invoice_Amt_Including_Tax}`}</td>
//                   <td>{`$ ${booking.Final_Invoice_Amt_Excluding_Tax}`}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Finance;
import React, { useState, useEffect } from "react";
import { BsGrid1X2Fill } from "react-icons/bs";
import { FaClipboardList } from "react-icons/fa";
import { VscGraphLine } from "react-icons/vsc";
// import "../My Bookings/mybook.css";
import useBookings from '../../usebooking';
import "./Finance.css";

const Finance = () => {
  const {
    bookingsData, 
    viewMode,
    setViewMode, 
    handleBookingClick1, 
  } = useBookings();

  const [completedBookings, setCompletedBookings] = useState([]);
  const [yetToCompleteBookings, setYetToCompleteBookings] = useState([]);
  const [totals, setTotals] = useState({
    completed: {
      estimateAmount: 0,
      finalAmtIncludingTax: 0,
      finalAmtExcludingTax: 0,
    },
    yetToComplete: {
      estimateAmount: 0,
    },
  });

  // State to manage selected date range
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');

  // Filter bookings based on date range
  useEffect(() => {
    let filteredBookings = bookingsData;

    // If both dates are selected, filter bookings within date range
    if (fromDate && toDate) {
      filteredBookings = bookingsData.filter(booking => {
        const moveDate = new Date(booking.MoveDate);
        return moveDate >= new Date(fromDate) && moveDate <= new Date(toDate);
      });
    }

    // Separate bookings into completed and yet to complete
    const completed = filteredBookings.filter(
      (booking) => booking.Final_Invoice_Amt_Excluding_Tax !== undefined && booking.Final_Invoice_Amt_Excluding_Tax !== null
    );
    const yetToComplete = filteredBookings.filter(
      (booking) => booking.Final_Invoice_Amt_Excluding_Tax === undefined || booking.Final_Invoice_Amt_Excluding_Tax === null
    );

    setCompletedBookings(completed);
    setYetToCompleteBookings(yetToComplete);

    // Calculate sums for completed bookings
    const completedTotals = completed.reduce(
      (acc, booking) => {
        acc.estimateAmount += parseFloat(booking.Estimate_Amount_$) || 0;
        acc.finalAmtIncludingTax += parseFloat(booking.Final_Invoice_Amt_Including_Tax) || 0;
        acc.finalAmtExcludingTax += parseFloat(booking.Final_Invoice_Amt_Excluding_Tax) || 0;
        return acc;
      },
      { estimateAmount: 0, finalAmtIncludingTax: 0, finalAmtExcludingTax: 0 }
    );

    const yetToCompleteTotals = yetToComplete.reduce(
      (acc, booking) => {
        acc.estimateAmount += parseFloat(booking.Estimate_Amount_$) || 0;
        return acc;
      },
      { estimateAmount: 0 }
    );

    setTotals({
      completed: completedTotals,
      yetToComplete: yetToCompleteTotals,
    });
  }, [bookingsData, fromDate, toDate]);

  const handleClearFilter = () => {
    setFromDate('');
    setToDate('');
  };
  

  const handleMarkerClick = (bookingId) => {
    handleBookingClick1(bookingId);
    setViewMode("list");
  };

  return (
    <div className="bookings-my">
      <div className="main-content-my">
        <div className="header-my" style={{ border:'3px solid',borderRight:'none',borderTop:'none',borderLeft:'none'}}>
          <div className="totalmoves">
            <h1>Finance</h1>
          </div>
          <div className="button-container">
          <button
              className={`view-button1 ${viewMode === "grid" ? "active" : ""}`}
              onClick={() => setViewMode("grid")}
            >
             <VscGraphLine style={{marginRight:'2px'}}/>
              Graph view
            </button>
            <button
              className={`view-button1 ${viewMode === "list" ? "active" : ""}`}
              onClick={() => setViewMode("list")}
            >
              <FaClipboardList />
              Table View
            </button>
          </div>
        </div>
        <div className="date-filter" style={{ float:"right"}}>
          <label>
            From Date:
            <input
              type="date"
              value={fromDate}
              onChange={(e) => setFromDate(e.target.value)}
            />
          </label>
          <label>
            To Date:
            <input
              type="date"
              value={toDate}
              onChange={(e) => setToDate(e.target.value)}
            />
          </label>
          <button3 style={{border:"1px solid" , padding:'0 5px', borderRadius:'50px', background:'red', color:'white'}} className="clear-filter-button" onClick={handleClearFilter}>
                Clear Filter
          </button3>
        </div>
        {viewMode === "list" && (
        <div className="finance-container">
          <h1 >Final Total</h1>
          <table className="finance-table1">
            <thead>
              <tr>
                <th></th>
                <th>No Of Move</th>
                <th>Sum Estimate Amount ($)</th>
                <th>Sum Final Amt (Including Tax)</th>
                <th>Sum Final Amt (Excluding Tax)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Completed</td>
                <td>{completedBookings.length}</td>
                <td>{`$ ${totals.completed.estimateAmount.toFixed(2)}`}</td>
                <td>{`$ ${totals.completed.finalAmtIncludingTax.toFixed(2)}`}</td>
                <td>{`$ ${totals.completed.finalAmtExcludingTax.toFixed(2)}`}</td>
              </tr>
            </tbody>
            <tbody>
              <tr>
                <td>Yet to Complete</td>
                <td>{yetToCompleteBookings.length}</td>
                <td>{`$ ${totals.yetToComplete.estimateAmount.toFixed(2)}`}</td>
                <td>-</td>
                <td>-</td>
              </tr>
            </tbody>
          </table>

          <h1>Total By Invoice</h1>
          <table className="finance-table">
            <thead>
              <tr>
                <th>Move Date</th>
                <th>Invoice #</th>
                <th>Move Type</th>
                <th>Estimate Amount ($)</th>
                <th>Final Invoice Amt (Including Tax)</th>
                <th>Final Invoice Amt (Excluding Tax)</th>
              </tr>
            </thead>
            <tbody>
              {completedBookings.concat(yetToCompleteBookings).map((booking) => (
                <tr key={booking.row_index}>
                  <td onClick={() => handleBookingClick1(booking.row_index)}>
                    {booking.MoveDate}
                  </td>
                  <td>{booking.INVOICE}</td>
                  <td>{booking.Move_Type}</td>
                  <td>{`$ ${booking.Estimate_Amount_$}`}</td>
                  <td>{`$ ${booking.Final_Invoice_Amt_Including_Tax}`}</td>
                  <td>{`$ ${booking.Final_Invoice_Amt_Excluding_Tax}`}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>)}
      </div>
    </div>
  );
};

export default Finance;
