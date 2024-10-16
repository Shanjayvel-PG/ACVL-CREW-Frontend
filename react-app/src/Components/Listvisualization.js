// import React, { useState } from "react";

// const ListView = ({
//   filteredBookingsData,
//   selectedBooking,
//   handleBookingClick,
//   formatDate,
//   renderBookingDetails,
//   handleBookingClick1,
//   getLastTwoLetters,
// }) => {
//   const [sortConfig, setSortConfig] = useState({ key: "", direction: "asc" });

//   const sortedBookingsData = [...filteredBookingsData].sort((a, b) => {
//     if (!sortConfig.key) return 0;

//     const aValue = a[sortConfig.key] || ""; 
//     const bValue = b[sortConfig.key] || "";

//     if (aValue < bValue) {
//       return sortConfig.direction === "asc" ? -1 : 1;
//     }
//     if (aValue > bValue) {
//       return sortConfig.direction === "asc" ? 1 : -1;
//     }
//     return 0;
//   });

//   const handleSort = (key) => {
//     let direction = "asc";
//     if (sortConfig.key === key && sortConfig.direction === "asc") {
//       direction = "desc";
//     }
//     setSortConfig({ key, direction });
//   };

//   const getSortIndicator = (key) => {
//     if (sortConfig.key === key) {
//       return sortConfig.direction === "asc" ? "▼" : "▲" ;
//     }
//     return "";
//   };

//   return (
//     <div className="all-list-view">
//       <div className="bookings-list-my">
//         <div>
//           <div className="bookings-header-my">
//             <span onClick={() => handleSort("Banner")}>
//               Banner {getSortIndicator("Banner")}
//             </span>
//             <span1 onClick={() => handleSort("Customer_Name")}>
//               Customer Name {getSortIndicator("Customer_Name")}
//             </span1>
//             <span onClick={() => handleSort("INVOICE")}>
//               Invoice No {getSortIndicator("INVOICE")}
//             </span>
//             <span >
//               Move Date 
//             </span>
//             <span1 onClick={() => handleSort("Move_From")}>
//               Move From {getSortIndicator("Move_From")}
//             </span1>
//             <span1 onClick={() => handleSort("Move_To")}>
//               Move To {getSortIndicator("Move_To")}
//             </span1>
//             <span onClick={() => handleSort("Move_Size")}>
//               Move Size {getSortIndicator("Move_Size")}
//             </span>
//             <span onClick={() => handleSort("Assigned_To")}>
//               Assigned To {getSortIndicator("Assigned_To")}
//             </span>
//             <span onClick={() => handleSort("Status")}>
//               Status {getSortIndicator("Status")}
//             </span>
//           </div>
//         {sortedBookingsData.map((booking, index) => (
//           <React.Fragment key={index}>
//             <div
//               className={`booking-item-my ${selectedBooking === booking ? "active" : ""}`}
//               onClick={() => handleBookingClick(booking)}
//             >
//               <span>{booking.Banner}</span>
//               <span1>{booking["Customer_Name"]}</span1>
//               <span>{booking.INVOICE}</span>
//               <span>{formatDate(booking.MoveDate)}</span>
//               <span1>{booking["Move_From"]}</span1>
//               <span1>{booking.Move_To}</span1>
//               <span>{booking["Move_Size"]}</span>
//               <span>{booking["Assigned_To"] || "N/A"}</span>
//               <span>{booking.Status}</span>
//             </div>
//             {selectedBooking === booking ? renderBookingDetails() : null}
//           </React.Fragment>
//         ))}
//       </div>
//     </div>
//     <div className="bookings-grid">
//       <div className="grid-header"></div>
//       <div className="grid-header">Name</div>
//       <div className="grid-header">Invoice</div>
//       <div className="grid-header">Move Date</div>
//       <div className="grid-header">Origin</div>
//       <div className="grid-header">Destn</div>
//       <div className="grid-header">Move Size</div>
//       <div className="grid-header">Assigned To</div>
//       <div className="grid-header">Status</div>
//       {sortedBookingsData.map((booking) => (
//         <React.Fragment key={booking.row_index}>
//           <div
//             className={`grid-cell ${booking.Banner === "ACVL" ? "red-circle" : "green-circle"}`}
//             onClick={() => handleBookingClick(booking.row_index)}
//           ></div>
//           <div className="grid-cell" onClick={() => handleBookingClick1(booking.row_index)}>
//             {booking["Customer_Name"]}
//           </div>
//           <div className="grid-cell" onClick={() => handleBookingClick1(booking.row_index)}>
//             {booking["INVOICE"]}
//           </div>
//           <div className="grid-cell" onClick={() => handleBookingClick1(booking.row_index)}>
//             {formatDate(booking.MoveDate)}
//           </div>
//           <div className="grid-cell" onClick={() => handleBookingClick1(booking.row_index)}>
//             {getLastTwoLetters(booking["Move_From"])}
//           </div>
//           <div className="grid-cell" onClick={() => handleBookingClick1(booking.row_index)}>
//             {getLastTwoLetters(booking.Move_To)}
//           </div>
//           <div className="grid-cell" onClick={() => handleBookingClick1(booking.row_index)}>
//             {booking["Move_Size"] || "N/A"}
//           </div>
//           <div className="grid-cell" onClick={() => handleBookingClick1(booking.row_index)}>
//             {booking["Assigned_To"]}
//           </div>
//           <div className="grid-cell" onClick={() => handleBookingClick1(booking.row_index)}>
//             {booking.Status}
//           </div>
//         </React.Fragment>
//       ))}
//     </div>
//   </div>
//   );
// };

// export default ListView;
import React, { useState, useMemo,useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faFilter} from '@fortawesome/free-solid-svg-icons'
import Allbookings from "./dashboard/All Bookings/allbook";



const ListView = ({
  filteredBookingsData,
  selectedBooking,
  handleBookingClick,
  getLastTwoLetters,
  handleBookingClick1,
  formatDate,
  renderBookingDetails,
  setTotalBookings,
}) => {
  const [sortField, setSortField] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);
  const [searchTerms, setSearchTerms] = useState({
    Banner: "",
    Customer_Name: "",
    Move_From: "",
    Move_To: "",
    Move_Size: "",
    Assigned_To: "",
    Status: "",
  });
  const handleSort = (field) => {
    const order = sortField === field && sortOrder === "asc" ? "desc" : "asc";
    setSortField(field);
    setSortOrder(order);
  };
  const handleSearchChange = (field, value) => {
    setSearchTerms((prevTerms) => ({
      ...prevTerms,
      [field]: value.toLowerCase(),
    }));
  };
  const clearSearchTerm = (field) => {
    setSearchTerms((prevTerms) => ({
      ...prevTerms,
      [field]: "",
    }));
  };
  const clearDate = (setter) => {
    setter(null);
  };
  const filteredBookings = useMemo(() => {
    return filteredBookingsData.filter((booking) => {
      const moveDate = new Date(booking.MoveDate);
      return (
        (searchTerms.Banner === "" || booking.Banner.toLowerCase().includes(searchTerms.Banner)) &&
        (searchTerms.Customer_Name === "" || booking.Customer_Name.toLowerCase().includes(searchTerms.Customer_Name)) &&
        (searchTerms.Move_From === "" || booking.Move_From.toLowerCase().includes(searchTerms.Move_From)) &&
        (searchTerms.Move_To === "" || booking.Move_To.toLowerCase().includes(searchTerms.Move_To)) &&
        (searchTerms.Move_Size === "" || booking.Move_Size?.toLowerCase().includes(searchTerms.Move_Size)) &&
        (searchTerms.Assigned_To === "" || (booking.Assigned_To || "N/A").toLowerCase().includes(searchTerms.Assigned_To)) &&
        (searchTerms.Status === "" || booking.Status.toLowerCase().includes(searchTerms.Status)) &&
        (!fromDate || moveDate >= fromDate) && // Filter for From Date
        (!toDate || moveDate <= toDate) // Filter for To Date
      );
    });
  }, [filteredBookingsData, searchTerms, fromDate, toDate]);

  // useEffect(() => {
  //   setTotalBookings(filteredBookings.length); 
  // }, [filteredBookings, setTotalBookings]);

  const sortedBookings = useMemo(() => {
    return [...filteredBookings].sort((a, b) => {
      const fieldA = a[sortField]?.toString().toLowerCase() || "";
      const fieldB = b[sortField]?.toString().toLowerCase() || "";
      if (sortOrder === "asc") {
        return fieldA < fieldB ? -1 : fieldA > fieldB ? 1 : 0;
      } else {
        return fieldA > fieldB ? -1 : fieldA < fieldB ? 1 : 0;
      }
    });
  }, [filteredBookings, sortField, sortOrder]);

  

  return (
    <div className="all-list-view">
      <div className="bookings-list-my">
        <div>
          <div className="bookings-header-my" >
            <div style={{ display: "flex", textAlign: "center" , flex: '1'}}>
            {["Banner", "Customer_Name", "MoveDate", "Move_From", "Move_To", "Move_Size", "Assigned_To", "Status"].map((field) => (
              <span
                key={field}
                onClick={() => handleSort(field)}
                style={{ cursor: "pointer", padding: "0 10px", textAlign:'center' }}
              >
                {field.replace(/_/g, " ")}
              </span>
             ))}
            </div>
            <button7
              className="tiny-dropdown-button"
              style={{ fontSize: "10px", padding: "2px" ,marginRight:"-10px", marginTop:"05px", cursor: "pointer" , border: "none" , borderRadius:"50px", color:"white"}}
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              <FontAwesomeIcon icon={faFilter} size="2x"/>
            </button7>
          </div>
          {isDropdownOpen && (
            <div
              className="extra-header-bar"
              style={{ marginTop: "0px", padding: "10px", background: "#e12901", borderRadius: "30px" }}
            >
              <div
                className="search-bar-container"
                style={{ display: "flex", justifyContent: "space-around", flexWrap: "wrap", alignItems: "center" }}
              >
                {[
                  { placeholder: "Search Banner", valueKey: "Banner" },
                  { placeholder: "Search Customer Name", valueKey: "Customer_Name" },
                ].map(({ placeholder, valueKey }) => (
                  <div style={{ position: "relative" }} key={valueKey}>
                    <input
                      type="text"
                      placeholder={placeholder}
                      value={searchTerms[valueKey]}
                      onChange={(e) => handleSearchChange(valueKey, e.target.value)}
                      style={{ width: "100px", borderRadius: "5px" }}
                    />
                    {searchTerms[valueKey] && (
                      <button7 onClick={() => clearSearchTerm(valueKey)} style={{position: "absolute",right: "5px",top: "48%",transform: "translateY(-50%)",background: "none",border: "none",cursor: "pointer"}}>X</button7>
                    )}
                  </div>
                ))}
                <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
                {[{ label: "From Date", date: fromDate, setDate: setFromDate }, { label: "To Date", date: toDate, setDate: setToDate }].map(
                  ({ date, setDate }, index) => (
                    <div className="date-picker" style={{ position: "relative" }} key={index}>
                      <DatePicker
                        selected={date}
                        onChange={(newDate) => setDate(newDate)}
                        placeholderText={`Select ${index === 0 ? "From" : "To"} Date`}
                        dateFormat="dd/MM/yyyy"
                        todayButton="Today"
                        className="custom-datepicker"
                        wrapperClassName="date-picker-wrapper"
                      />
                      {date && (
                        <button7 onClick={() => clearDate(setDate)} style={{position: "absolute",right: "5px",top: "48%",transform: "translateY(-50%)",background: "none",border: "none",cursor: "pointer"}}>X</button7>
                      )}
                    </div>
                  )
                )}
              </div>
                {[
                  { placeholder: "Search Move From", valueKey: "Move_From" },
                  { placeholder: "Search Move To", valueKey: "Move_To" },
                  { placeholder: "Search Move Size", valueKey: "Move_Size" },
                  { placeholder: "Search Assigned To", valueKey: "Assigned_To" },
                  { placeholder: "Search Status", valueKey: "Status" },
                ].map(({ placeholder, valueKey }) => (
                  <div style={{ position: "relative" }} key={valueKey}>
                    <input
                      type="text"
                      placeholder={placeholder}
                      value={searchTerms[valueKey]}
                      onChange={(e) => handleSearchChange(valueKey, e.target.value)}
                      style={{ width: "100px", borderRadius: "5px" }}
                    />
                    {searchTerms[valueKey] && (
                      <button7 onClick={() => clearSearchTerm(valueKey)} style={{position: "absolute",right: "5px",top: "48%",transform: "translateY(-50%)",background: "none",border: "none",cursor: "pointer"}}>X</button7>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="bookings-list-my">
            {sortedBookings.map((booking, index) => {
              const {
                Banner,
                Customer_Name,
                MoveDate,
                Move_From,
                Move_To,
                Move_Size,
                Assigned_To,
                Status,
              } = booking;
              return (
              <React.Fragment key={index}>
                <div
                  className={`booking-item-my ${selectedBooking === booking ? "active" : ""}`}
                  onClick={() => handleBookingClick(booking)}
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <span>{Banner}</span>
                  <span1 className="customer-name">{Customer_Name}</span1>
                  <span>{formatDate(MoveDate)}</span>
                  <span>{Move_From}</span>
                  <span>{Move_To}</span>
                  <span>{Move_Size}</span>
                  <span>{Assigned_To || "N/A"}</span>
                  <span>{Status}</span>
                </div>
                {selectedBooking === booking ? renderBookingDetails() : null}
              </React.Fragment>
              );
            })}
          </div>
        </div>
      </div>
      <div className="bookings-grid">
        <div className="grid-header"></div>
        <div className="grid-header">Name</div>
        <div className="grid-header">Invoice</div>
        <div className="grid-header">Move Date</div>
        <div className="grid-header">Origin</div>
        <div className="grid-header">Destn</div>
        <div className="grid-header">Move Size</div>
        <div className="grid-header">Assigned To</div>
        <div className="grid-header">Status</div>
        {filteredBookingsData.map((booking) => (
          <React.Fragment key={booking.row_index}>
            <div
              className={`grid-cell ${booking.Banner === "ACVL" ? "red-circle" : "green-circle"}`}
              onClick={() => handleBookingClick(booking.row_index)}
            ></div>
            <div className="grid-cell" onClick={() => handleBookingClick1(booking.row_index)}>
              {booking["Customer_Name"]}
            </div>
            <div className="grid-cell" onClick={() => handleBookingClick1(booking.row_index)}>
              {booking["INVOICE"]}
            </div>
            <div className="grid-cell" onClick={() => handleBookingClick1(booking.row_index)}>
              {formatDate(booking.MoveDate)}
            </div>
            <div className="grid-cell" onClick={() => handleBookingClick1(booking.row_index)}>
              {getLastTwoLetters(booking["Move_From"])}
            </div>
            <div className="grid-cell" onClick={() => handleBookingClick1(booking.row_index)}>
              {getLastTwoLetters(booking.Move_To)}
            </div>
            <div className="grid-cell" onClick={() => handleBookingClick1(booking.row_index)}>
              {booking["Move_Size"] || "N/A"}
            </div>
            <div className="grid-cell" onClick={() => handleBookingClick1(booking.row_index)}>
              {booking["Assigned_To"]}
            </div>
            <div className="grid-cell" onClick={() => handleBookingClick1(booking.row_index)}>
              {booking.Status}
            </div>
          </React.Fragment>
        ))}
      </div>
    </div>
    );
  };

export default ListView;
// import React, { useState } from "react";

// const ListView = ({
//   filteredBookingsData,
//   selectedBooking,
//   handleBookingClick,
//   formatDate,
//   renderBookingDetails,
//   handleBookingClick1,
//   getLastTwoLetters,
// }) => {
//   const [sortConfig, setSortConfig] = useState({ key: "", direction: "asc" });
//   const [fromDate, setFromDate] = useState(""); 
//   const [toDate, setToDate] = useState(""); 
//   const [showDateFilter, setShowDateFilter] = useState(false); 
  
//   const handleSort = (key) => {
//     if (key === "MoveDate") {
//       // Toggle the date filter dropdown when clicking on Move Date (no sorting here)
//       setShowDateFilter((prevState) => !prevState);
//     } else {
//       setShowDateFilter(false); // Hide the filter if any other column is clicked

//       // Sorting logic for other columns
//       let direction = "asc";
//       if (sortConfig.key === key && sortConfig.direction === "asc") {
//         direction = "desc";
//       }
//       setSortConfig({ key, direction });
//     }
//   };

//   // Function to get sort indicator (arrow up/down) for other columns (excluding MoveDate)
//   const getSortIndicator = (key) => {
//     if (sortConfig.key === key) {
//       return sortConfig.direction === "asc" ? "▲" : "▼";
//     }
//     return "";
//   };

//   // Function to handle date filtering
//   const applyDateFilter = (data) => {
//     if (!fromDate && !toDate) return data;

//     return data.filter((booking) => {
//       const moveDate = new Date(booking.MoveDate);
//       const fromDateObj = fromDate ? new Date(fromDate) : null;
//       const toDateObj = toDate ? new Date(toDate) : null;

//       if (fromDateObj && toDateObj) {
//         return moveDate >= fromDateObj && moveDate <= toDateObj;
//       }
//       if (fromDateObj) {
//         return moveDate >= fromDateObj;
//       }
//       if (toDateObj) {
//         return moveDate <= toDateObj;
//       }
//       return true;
//     });
//   };

//   // Apply sorting and then filtering to the data (excluding MoveDate sorting)
//   const sortedBookingsData = applyDateFilter(
//     [...filteredBookingsData].sort((a, b) => {
//       if (!sortConfig.key) return 0;

//       const aValue = a[sortConfig.key] || "";
//       const bValue = b[sortConfig.key] || "";

//       if (aValue < bValue) {
//         return sortConfig.direction === "asc" ? -1 : 1;
//       }
//       if (aValue > bValue) {
//         return sortConfig.direction === "asc" ? 1 : -1;
//       }
//       return 0;
//     })
//   );

//   // Function to reset filters
//   const resetFilters = () => {
//     setFromDate("");
//     setToDate("");
//   };

//   return (
//     <div>
//     <div className="all-list-view">
//       <div className="bookings-list-my">
//         {/* Bookings Header */}
//         <div className="bookings-header-my">
//           <span onClick={() => handleSort("Banner")}>
//             Banner {getSortIndicator("Banner")}
//           </span>
//           <span1 onClick={() => handleSort("Customer_Name")}>
//             Customer Name {getSortIndicator("Customer_Name")}
//           </span1>
//           <span onClick={() => handleSort("INVOICE")}>
//             Invoice No {getSortIndicator("INVOICE")}
//           </span>
//           <span onClick={() => setShowDateFilter(!showDateFilter)}>
//           Move Date
//           </span>
//           <span1 onClick={() => handleSort("Move_From")}>
//             Move From {getSortIndicator("Move_From")}
//           </span1>
//           <span1 onClick={() => handleSort("Move_To")}>
//             Move To {getSortIndicator("Move_To")}
//           </span1>
//           <span onClick={() => handleSort("Move_Size")}>
//             Move Size {getSortIndicator("Move_Size")}
//           </span>
//           <span onClick={() => handleSort("Assigned_To")}>
//             Assigned To {getSortIndicator("Assigned_To")}
//           </span>
//           <span onClick={() => handleSort("Status")}>
//             Status {getSortIndicator("Status")}
//           </span>
//         </div>

//         {/* Date Filter Dropdown */}
//         {showDateFilter && (
//   <div className="date-filter-dropdown">
//     <label>
//       From Date:{" "}
//       <input
//         type="date"
//         value={fromDate}
//         onChange={(e) => setFromDate(e.target.value)}
//       />
//     </label>
//     <label>
//       To Date:{" "}
//       <input
//         type="date"
//         value={toDate}
//         onChange={(e) => setToDate(e.target.value)}
//       />
//     </label>
//     <button onClick={resetFilters}>Reset Filters</button>
//   </div>
// )}

//         {sortedBookingsData.map((booking, index) => (
//           <React.Fragment key={index}>
//             <div
//               className={`booking-item-my ${selectedBooking === booking ? "active" : ""}`}
//               onClick={() => handleBookingClick(booking)}
//             >
//               <span>{booking.Banner}</span>
//               <span1>{booking["Customer_Name"]}</span1>
//               <span>{booking.INVOICE}</span>
//               <span>{formatDate(booking.MoveDate)}</span>
//               <span1>{booking["Move_From"]}</span1>
//               <span1>{booking.Move_To}</span1>
//               <span>{booking["Move_Size"]}</span>
//               <span>{booking["Assigned_To"] || "N/A"}</span>
//               <span>{booking.Status}</span>
//             </div>
//             {selectedBooking === booking ? renderBookingDetails() : null}
//           </React.Fragment>
//         ))}
//       </div>
//     </div>
//     <div className="bookings-grid">
//       <div className="grid-header"></div>
//       <div className="grid-header">Name</div>
//       <div className="grid-header">Invoice</div>
//       <div className="grid-header">Move Date</div>
//       <div className="grid-header">Origin</div>
//       <div className="grid-header">Destn</div>
//       <div className="grid-header">Move Size</div>
//       <div className="grid-header">Assigned To</div>
//       <div className="grid-header">Status</div>
//       {sortedBookingsData.map((booking) => (
//         <React.Fragment key={booking.row_index}>
//           <div
//             className={`grid-cell ${booking.Banner === "ACVL" ? "red-circle" : "green-circle"}`}
//             onClick={() => handleBookingClick(booking.row_index)}
//           ></div>
//           <div className="grid-cell" onClick={() => handleBookingClick1(booking.row_index)}>
//             {booking["Customer_Name"]}
//           </div>
//           <div className="grid-cell" onClick={() => handleBookingClick1(booking.row_index)}>
//             {booking["INVOICE"]}
//           </div>
//           <div className="grid-cell" onClick={() => handleBookingClick1(booking.row_index)}>
//             {formatDate(booking.MoveDate)}
//           </div>
//           <div className="grid-cell" onClick={() => handleBookingClick1(booking.row_index)}>
//             {getLastTwoLetters(booking["Move_From"])}
//           </div>
//           <div className="grid-cell" onClick={() => handleBookingClick1(booking.row_index)}>
//             {getLastTwoLetters(booking.Move_To)}
//           </div>
//           <div className="grid-cell" onClick={() => handleBookingClick1(booking.row_index)}>
//             {booking["Move_Size"] || "N/A"}
//           </div>
//           <div className="grid-cell" onClick={() => handleBookingClick1(booking.row_index)}>
//             {booking["Assigned_To"]}
//           </div>
//           <div className="grid-cell" onClick={() => handleBookingClick1(booking.row_index)}>
//             {booking.Status}
//           </div>
//         </React.Fragment>
//       ))}
//     </div>
//   </div>
//   );
// };

// export default ListView;



// // import React from "react";

// // const ListView = ({
// //   filteredBookingsData,
// //   selectedBooking,
// //   handleBookingClick,
// //   formatDate,
// //   renderBookingDetails,
// //   handleBookingClick1,
// //   getLastTwoLetters,
// // }) => {
// //   return (
// //     <div className="all-list-view">
// //     <div className="bookings-list-my">
// //       <div>
// //         <div className="bookings-header-my">
// //           <span>Banner</span>
// //           <span1>Customer Name</span1>
// //           <span>Invoice No</span>
// //           <span>Move Date</span>
// //           <span1>Move From</span1>
// //           <span1>Move To</span1>
// //           <span>Move Size</span>
// //           <span>Assigned To</span>
// //           <span>Status</span>
// //         </div>
// //         {filteredBookingsData.map((booking, index) => (
// //           <React.Fragment key={index}>
// //             <div
// //               className={`booking-item-my ${selectedBooking === booking ? "active" : ""}`}
// //               onClick={() => handleBookingClick(booking)}
// //             >
// //               <span>{booking.Banner}</span>
// //               <span1>{booking["Customer_Name"]}</span1>
// //               <span>{booking["INVOICE"]}</span>
// //               <span>{formatDate(booking.MoveDate)}</span>
// //               <span1>{booking["Move_From"]}</span1>
// //               <span1>{booking.Move_To}</span1>
// //               <span>{booking["Move_Size"]}</span>
// //               <span>{booking["Assigned_To"] || "N/A"}</span>
// //               <span>{booking.Status}</span>
// //             </div>
// //             {selectedBooking === booking ? renderBookingDetails() : null}
// //           </React.Fragment>
// //         ))}
// //       </div>
// //     </div>
// //     <div className="bookings-grid">
// //       <div className="grid-header"></div>
// //       <div className="grid-header">Name</div>
// //       <div className="grid-header">Invoice</div>
// //       <div className="grid-header">Move Date</div>
// //       <div className="grid-header">Origin</div>
// //       <div className="grid-header">Destn</div>
// //       <div className="grid-header">Move Size</div>
// //       <div className="grid-header">Assigned To</div>
// //       <div className="grid-header">Status</div>
// //       {filteredBookingsData.map((booking) => (
// //         <React.Fragment key={booking.row_index}>
// //           <div
// //             className={`grid-cell ${booking.Banner === "ACVL" ? "red-circle" : "green-circle"}`}
// //             onClick={() => handleBookingClick(booking.row_index)}
// //           ></div>
// //           <div className="grid-cell" onClick={() => handleBookingClick1(booking.row_index)}>
// //             {booking["Customer_Name"]}
// //           </div>
// //           <div className="grid-cell" onClick={() => handleBookingClick1(booking.row_index)}>
// //             {booking["INVOICE"]}
// //           </div>
// //           <div className="grid-cell" onClick={() => handleBookingClick1(booking.row_index)}>
// //             {formatDate(booking.MoveDate)}
// //           </div>
// //           <div className="grid-cell" onClick={() => handleBookingClick1(booking.row_index)}>
// //             {getLastTwoLetters(booking["Move_From"])}
// //           </div>
// //           <div className="grid-cell" onClick={() => handleBookingClick1(booking.row_index)}>
// //             {getLastTwoLetters(booking.Move_To)}
// //           </div>
// //           <div className="grid-cell" onClick={() => handleBookingClick1(booking.row_index)}>
// //             {booking["Move_Size"] || "N/A"}
// //           </div>
// //           <div className="grid-cell" onClick={() => handleBookingClick1(booking.row_index)}>
             
// //                     {booking["Assigned_To"]
// //                         ? `${booking["Assigned_To"].split(" ")[0][0] || ""}${booking["Assigned_To"].split(" ")[1] ? booking["Assigned_To"].split(" ")[1][0] : ""}`
// //                         : "N/A"}
// //           </div>
// //           <div className="grid-cell" onClick={() => handleBookingClick1(booking.row_index)}>
// //             {booking.Status}
// //           </div>
// //         </React.Fragment>
// //       ))}
// //     </div>
// //   </div>
// //   );
// // };

// // export default ListView;
