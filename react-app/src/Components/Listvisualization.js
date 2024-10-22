
// import React, { useState, useMemo,useEffect } from "react";
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import {faFilter} from '@fortawesome/free-solid-svg-icons'
// import Allbookings from "./dashboard/All Bookings/allbook";



// const ListView = ({
//   filteredBookingsData,
//   selectedBooking,
//   handleBookingClick,
//   getLastTwoLetters,
//   handleBookingClick1,
//   formatDate,
//   renderBookingDetails,
//   setTotalBookings,
// }) => {
//   const [sortField, setSortField] = useState("");
//   const [sortOrder, setSortOrder] = useState("asc");
//   const [isDropdownOpen, setIsDropdownOpen] = useState(false);
//   const [fromDate, setFromDate] = useState(null);
//   const [toDate, setToDate] = useState(null);
//   const [searchTerms, setSearchTerms] = useState({
//     Banner: "",
//     Customer_Name: "",
//     Move_From: "",
//     Move_To: "",
//     Move_Size: "",
//     Assigned_To: "",
//     Status: "",
//   });
//   const handleSort = (field) => {
//     const order = sortField === field && sortOrder === "asc" ? "desc" : "asc";
//     setSortField(field);
//     setSortOrder(order);
//   };
//   const handleSearchChange = (field, value) => {
//     setSearchTerms((prevTerms) => ({
//       ...prevTerms,
//       [field]: value.toLowerCase(),
//     }));
//   };
//   const clearSearchTerm = (field) => {
//     setSearchTerms((prevTerms) => ({
//       ...prevTerms,
//       [field]: "",
//     }));
//   };
//   const clearDate = (setter) => {
//     setter(null);
//   };
//   const filteredBookings = useMemo(() => {
//     return filteredBookingsData.filter((booking) => {
//       const moveDate = new Date(booking.MoveDate);
//       return (
//         (searchTerms.Banner === "" || booking.Banner.toLowerCase().includes(searchTerms.Banner)) &&
//         (searchTerms.Customer_Name === "" || booking.Customer_Name.toLowerCase().includes(searchTerms.Customer_Name)) &&
//         (searchTerms.Move_From === "" || booking.Move_From.toLowerCase().includes(searchTerms.Move_From)) &&
//         (searchTerms.Move_To === "" || booking.Move_To.toLowerCase().includes(searchTerms.Move_To)) &&
//         (searchTerms.Move_Size === "" || booking.Move_Size?.toLowerCase().includes(searchTerms.Move_Size)) &&
//         (searchTerms.Assigned_To === "" || (booking.Assigned_To || "N/A").toLowerCase().includes(searchTerms.Assigned_To)) &&
//         (searchTerms.Status === "" || booking.Status.toLowerCase().includes(searchTerms.Status)) &&
//         (!fromDate || moveDate >= fromDate) && // Filter for From Date
//         (!toDate || moveDate <= toDate) // Filter for To Date
//       );
//     });
//   }, [filteredBookingsData, searchTerms, fromDate, toDate]);

//   // useEffect(() => {
//   //   setTotalBookings(filteredBookings.length); 
//   // }, [filteredBookings, setTotalBookings]);

//   const sortedBookings = useMemo(() => {
//     return [...filteredBookings].sort((a, b) => {
//       const fieldA = a[sortField]?.toString().toLowerCase() || "";
//       const fieldB = b[sortField]?.toString().toLowerCase() || "";
//       if (sortOrder === "asc") {
//         return fieldA < fieldB ? -1 : fieldA > fieldB ? 1 : 0;
//       } else {
//         return fieldA > fieldB ? -1 : fieldA < fieldB ? 1 : 0;
//       }
//     });
//   }, [filteredBookings, sortField, sortOrder]);

  

//   return (
//     <div className="all-list-view">
//       <div className="bookings-list-my">
//         <div>
//           <div className="bookings-header-my" >
//             <div style={{ display: "flex", textAlign: "center" , flex: '1'}}>
//             {["Banner", "Customer_Name", "MoveDate", "Move_From", "Move_To", "Move_Size", "Assigned_To", "Status"].map((field) => (
//               <span
//                 key={field}
//                 onClick={() => handleSort(field)}
//                 style={{ cursor: "pointer", padding: "0 10px", textAlign:'center' }}
//               >
//                 {field.replace(/_/g, " ")}
//               </span>
//              ))}
//             </div>
//             <button7
//               className="tiny-dropdown-button"
//               style={{ fontSize: "10px", padding: "2px" ,marginRight:"-10px", marginTop:"05px", cursor: "pointer" , border: "none" , borderRadius:"50px", color:"white"}}
//               onClick={() => setIsDropdownOpen(!isDropdownOpen)}
//             >
//               <FontAwesomeIcon icon={faFilter} size="2x"/>
//             </button7>
//           </div>
//           {isDropdownOpen && (
//             <div
//               className="extra-header-bar"
//               style={{ marginTop: "0px", padding: "10px", background: "#e12901", borderRadius: "30px" }}
//             >
//               <div
//                 className="search-bar-container"
//                 style={{ display: "flex", justifyContent: "space-around", flexWrap: "wrap", alignItems: "center" }}
//               >
//                 {[
//                   { placeholder: "Search Banner", valueKey: "Banner" },
//                   { placeholder: "Search Customer Name", valueKey: "Customer_Name" },
//                 ].map(({ placeholder, valueKey }) => (
//                   <div style={{ position: "relative" }} key={valueKey}>
//                     <input
//                       type="text"
//                       placeholder={placeholder}
//                       value={searchTerms[valueKey]}
//                       onChange={(e) => handleSearchChange(valueKey, e.target.value)}
//                       style={{ width: "100px", borderRadius: "5px" }}
//                     />
//                     {searchTerms[valueKey] && (
//                       <button7 onClick={() => clearSearchTerm(valueKey)} style={{position: "absolute",right: "5px",top: "48%",transform: "translateY(-50%)",background: "none",border: "none",cursor: "pointer"}}>X</button7>
//                     )}
//                   </div>
//                 ))}
//                 <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
//                 {[{ label: "From Date", date: fromDate, setDate: setFromDate }, { label: "To Date", date: toDate, setDate: setToDate }].map(
//                   ({ date, setDate }, index) => (
//                     <div className="date-picker" style={{ position: "relative" }} key={index}>
//                       <DatePicker
//                         selected={date}
//                         onChange={(newDate) => setDate(newDate)}
//                         placeholderText={`Select ${index === 0 ? "From" : "To"} Date`}
//                         dateFormat="dd/MM/yyyy"
//                         todayButton="Today"
//                         className="custom-datepicker"
//                         wrapperClassName="date-picker-wrapper"
//                       />
//                       {date && (
//                         <button7 onClick={() => clearDate(setDate)} style={{position: "absolute",right: "5px",top: "48%",transform: "translateY(-50%)",background: "none",border: "none",cursor: "pointer"}}>X</button7>
//                       )}
//                     </div>
//                   )
//                 )}
//               </div>
//                 {[
//                   { placeholder: "Search Move From", valueKey: "Move_From" },
//                   { placeholder: "Search Move To", valueKey: "Move_To" },
//                   { placeholder: "Search Move Size", valueKey: "Move_Size" },
//                   { placeholder: "Search Assigned To", valueKey: "Assigned_To" },
//                   { placeholder: "Search Status", valueKey: "Status" },
//                 ].map(({ placeholder, valueKey }) => (
//                   <div style={{ position: "relative" }} key={valueKey}>
//                     <input
//                       type="text"
//                       placeholder={placeholder}
//                       value={searchTerms[valueKey]}
//                       onChange={(e) => handleSearchChange(valueKey, e.target.value)}
//                       style={{ width: "100px", borderRadius: "5px" }}
//                     />
//                     {searchTerms[valueKey] && (
//                       <button7 onClick={() => clearSearchTerm(valueKey)} style={{position: "absolute",right: "5px",top: "48%",transform: "translateY(-50%)",background: "none",border: "none",cursor: "pointer"}}>X</button7>
//                     )}
//                   </div>
//                 ))}
//               </div>
//             </div>
//           )}

//           <div className="bookings-list-my">
//             {sortedBookings.map((booking, index) => {
//               const {
//                 Banner,
//                 Customer_Name,
//                 MoveDate,
//                 Move_From,
//                 Move_To,
//                 Move_Size,
//                 Assigned_To,
//                 Status,
//               } = booking;
//               return (
//               <React.Fragment key={index}>
//                 <div
//                   className={`booking-item-my ${selectedBooking === booking ? "active" : ""}`}
//                   onClick={() => handleBookingClick(booking)}
//                   style={{ display: "flex", justifyContent: "space-between" }}
//                 >
//                   <span>{Banner}</span>
//                   <span1 className="customer-name">{Customer_Name}</span1>
//                   <span>{formatDate(MoveDate)}</span>
//                   <span>{Move_From}</span>
//                   <span>{Move_To}</span>
//                   <span>{Move_Size}</span>
//                   <span>{Assigned_To || "N/A"}</span>
//                   <span>{Status}</span>
//                 </div>
//                 {selectedBooking === booking ? renderBookingDetails() : null}
//               </React.Fragment>
//               );
//             })}
//           </div>
//         </div>
//       </div>
//       <div className="bookings-grid">
//         <div className="grid-header"></div>
//         <div className="grid-header">Name</div>
//         <div className="grid-header">Invoice</div>
//         <div className="grid-header">Move Date</div>
//         <div className="grid-header">Origin</div>
//         <div className="grid-header">Destn</div>
//         <div className="grid-header">Move Size</div>
//         <div className="grid-header">Assigned To</div>
//         <div className="grid-header">Status</div>
//         {filteredBookingsData.map((booking) => (
//           <React.Fragment key={booking.row_index}>
//             <div
//               className={`grid-cell ${booking.Banner === "ACVL" ? "red-circle" : "green-circle"}`}
//               onClick={() => handleBookingClick(booking.row_index)}
//             ></div>
//             <div className="grid-cell" onClick={() => handleBookingClick1(booking.row_index)}>
//               {booking["Customer_Name"]}
//             </div>
//             <div className="grid-cell" onClick={() => handleBookingClick1(booking.row_index)}>
//               {booking["INVOICE"]}
//             </div>
//             <div className="grid-cell" onClick={() => handleBookingClick1(booking.row_index)}>
//               {formatDate(booking.MoveDate)}
//             </div>
//             <div className="grid-cell" onClick={() => handleBookingClick1(booking.row_index)}>
//               {getLastTwoLetters(booking["Move_From"])}
//             </div>
//             <div className="grid-cell" onClick={() => handleBookingClick1(booking.row_index)}>
//               {getLastTwoLetters(booking.Move_To)}
//             </div>
//             <div className="grid-cell" onClick={() => handleBookingClick1(booking.row_index)}>
//               {booking["Move_Size"] || "N/A"}
//             </div>
//             <div className="grid-cell" onClick={() => handleBookingClick1(booking.row_index)}>
//               {booking["Assigned_To"]}
//             </div>
//             <div className="grid-cell" onClick={() => handleBookingClick1(booking.row_index)}>
//               {booking.Status}
//             </div>
//           </React.Fragment>
//         ))}
//       </div>
//     </div>
//     );
//   };

// export default ListView;
import React, { useState, useMemo, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faFilter, faDownload} from '@fortawesome/free-solid-svg-icons'

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

    // State for controlling the dropdown and extra header
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    // State for date filtering
    const [fromDate, setFromDate] = useState(null);
    const [toDate, setToDate] = useState(null);

    const [searchTerms, setSearchTerms] = useState({
      Banner: "",
      Customer_Name: "",
      INVOICE:"",
      Move_From: "",
      Move_To: "",
      Move_Size: "",
      Assigned_To: "",
      Status: "",
    });

    // Sort functionality
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

    // Clear individual search term
    const clearSearchTerm = (field) => {
      setSearchTerms((prevTerms) => ({
        ...prevTerms,
        [field]: "",
      }));
    };

    // Clear date picker
    const clearDate = (setter) => {
      setter(null);
    };

    const filteredBookings = useMemo(() => {
      return filteredBookingsData.filter((booking) => {
        const moveDate = new Date(booking.MoveDate);

        return (
          (searchTerms.Banner === "" || booking.Banner.toLowerCase().includes(searchTerms.Banner)) &&
          (searchTerms.Customer_Name === "" || 
            (booking.Customer_Name && booking.Customer_Name.toLowerCase().includes(searchTerms.Customer_Name.toLowerCase()))) &&
        
          (searchTerms.INVOICE === "" || booking.INVOICE.toLowerCase().includes(searchTerms.INVOICE)) &&
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
    useEffect(() => {
      setTotalBookings(filteredBookings.length); // Call the parent function with the total
    }, [filteredBookings, setTotalBookings]);
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

    // const totalBookings = filteredBookings.length; 



    const downloadCSV = () => {
      const csvRows = [];
      
      const headers = [
        "Sales_Agent",
        "Move_Size",
        "MoveDate",
        "Invoicelink",
        "INVOICE",  
        "Move_From",
        "Move_To",
        "Severity",
        "Connection_Type",
        "Estimate_No",
        "Banner",
        "Booked_Date",
        "Status",
        "Cancelled_reason",
        "Dispatch_Agent",
        "Assigned_To",
        "From_Address",
        "To_Address",
        "Coordinates_Origin",
        "Coordinates_Destn",
        "Dispatch_Date",
        "Dispatch_Comments",
        "Special_Instruction",
        "Customer_Name",
        "Phone_Number",
        "Alt_Phone_Number",
        "Email_Address",
        "Pick_up_Time",
        "Move_size_dispact_Agent",
        "Gym_equipment",
        "Appliances",
        "Fragile",  
        "Flammable_items",
        "Elevator",
        "Which_Floor",
        "Count_of_Stairs",  
        "Long_Walk",
        "Packing",  
        "Packing_Material", 
        "Complex_Assembly_or_Disassembly",  
        "Special_Requirement",  
        "Customer_OK_with_the_Pricing", 
        "Valuable_Items_and_Docs",
        "Storage_Holder_Name",  
        "Storage_Address",  
        "Storage_Start_Date", 
        "Storage_End_Date", 
        "Storage_Invoice",  
        "Storage_Unit", 
        "Storage_Access", 
        "Storage",  
        "Storage_Duration", 
        "Storage_Location", 
        "Docu_Sign_Status", 
        "Dispatch_Email_Sent",  
        "Move_Co_Ordinators", 
        "Contract_Reviewed",  
        "Clubbed_Move", 
        "Crew_Leader_Assigned", 
        "Crew_Leader_Contact_Info", 
        "Customer_Instruction_Given", 
        "Crew_Contacts",  
        "Truck_Details",
        "Truck_Owner",  
        "Truck_Types",  
        "Hub",  
        "Truck_Capacity", 
        "Crew_Comments",  
        "Google_Reviews", 
        "CUSTOMER_REVIEW",  
        "Start_Time_from_Hub",  
        "Time_reached_Pick_location", 
        "Loading_Start_Time", 
        "Loading_End_Time", 
        "Travel_Start_from_Pick_up_Location", 
        "Travel_End_at_destination",  
        "Unloading_Start_Time", 
        "Unloading_End_Time", 
        "Return_start_Time",  
        "Arrival_Time_Hub_Next_Job",  
        "Hours_Estimated",  
        "Move_Distance_Kms",  
        "Total_Weight_lbs", 
        "Estimate_Amount_$",  
        "Final_Invoice_Amt_Including_Tax",  
        "Final_Invoice_Amt_Excluding_Tax",  
        "Truck_Cost", 
        "Fuel_Charges", 
        "Food", 
        "Scaling_Fee",  
        "Labour_Pay", 
        "Supply", 
        "Maintenance",  
        "Ferry_Charges"
      ];
      
      csvRows.push(headers.join(",")); // Add the headers
    
      // Add the data
      filteredBookings.forEach((booking) => {
        const row = [
          `"${booking.Sales_Agent || "N/A"}"`,
          `"${booking.Move_Size || "N/A"}"`,
          `"${formatDate(booking.MoveDate) || "N/A"}"`,
          `"${booking.Invoicelink || "N/A"}"`,
          `"${booking.INVOICE || "N/A"}"`,  
          `"${booking.Move_From || "N/A"}"`,
          `"${booking.Move_To || "N/A"}"`,
          `"${booking.Severity || "N/A"}"`,
          `"${booking.Connection_Type || "N/A"}"`,
          `"${booking.Estimate_No || "N/A"}"`,
          `"${booking.Banner || "N/A"}"`,
          `"${formatDate(booking.Booked_Date) || "N/A"}"`,
          `"${booking.Status || "N/A"}"`,
          `"${booking.Cancelled_reason || "N/A"}"`,
          `"${booking.Dispatch_Agent || "N/A"}"`,
          `"${booking.Assigned_To || "N/A"}"`,
          `"${booking.From_Address || "N/A"}"`,
          `"${booking.To_Address || "N/A"}"`,
          `"${booking.Coordinates_Origin || "N/A"}"`,
          `"${booking.Coordinates_Destn || "N/A"}"`,
          `"${formatDate(booking.Dispatch_Date) || "N/A"}"`,
          `"${booking.Dispatch_Comments || "N/A"}"`,
          `"${booking.Special_Instruction || "N/A"}"`,
          `"${booking.Customer_Name || "N/A"}"`,
          `"${booking.Phone_Number || "N/A"}"`,
          `"${booking.Alt_Phone_Number || "N/A"}"`,
          `"${booking.Email_Address || "N/A"}"`,
          `"${booking.Pick_up_Time || "N/A"}"`,
          `"${booking.Move_size_dispact_Agent || "N/A"}"`,
          `"${booking.Gym_equipment || "N/A"}"`,
          `"${booking.Appliances || "N/A"}"`,
          `"${booking.Fragile || "N/A"}"`,  
          `"${booking.Flammable_items || "N/A"}"`,
          `"${booking.Elevator || "N/A"}"`,
          `"${booking.Which_Floor || "N/A"}"`,
          `"${booking.Count_of_Stairs || "N/A"}"`,  
          `"${booking.Long_Walk || "N/A"}"`,
          `"${booking.Packing || "N/A"}"`,  
          `"${booking.Packing_Material || "N/A"}"`, 
          `"${booking.Complex_Assembly_or_Disassembly || "N/A"}"`,  
          `"${booking.Special_Requirement || "N/A"}"`,  
          `"${booking.Customer_OK_with_the_Pricing || "N/A"}"`, 
          `"${booking.Valuable_Items_and_Docs || "N/A"}"`,
          `"${booking.Storage_Holder_Name || "N/A"}"`,  
          `"${booking.Storage_Address || "N/A"}"`,  
          `"${formatDate(booking.Storage_Start_Date) || "N/A"}"`, 
          `"${formatDate(booking.Storage_End_Date) || "N/A"}"`, 
          `"${booking.Storage_Invoice || "N/A"}"`,  
          `"${booking.Storage_Unit || "N/A"}"`, 
          `"${booking.Storage_Access || "N/A"}"`, 
          `"${booking.Storage || "N/A"}"`,  
          `"${booking.Storage_Duration || "N/A"}"`, 
          `"${booking.Storage_Location || "N/A"}"`, 
          `"${booking.Docu_Sign_Status || "N/A"}"`, 
          `"${booking.Dispatch_Email_Sent || "N/A"}"`,  
          `"${booking.Move_Co_Ordinators || "N/A"}"`, 
          `"${booking.Contract_Reviewed || "N/A"}"`,  
          `"${booking.Clubbed_Move || "N/A"}"`, 
          `"${booking.Crew_Leader_Assigned || "N/A"}"`, 
          `"${booking.Crew_Leader_Contact_Info || "N/A"}"`, 
          `"${booking.Customer_Instruction_Given || "N/A"}"`, 
          `"${booking.Crew_Contacts || "N/A"}"`,  
          `"${booking.Truck_Details || "N/A"}"`,
          `"${booking.Truck_Owner || "N/A"}"`,  
          `"${booking.Truck_Types || "N/A"}"`,  
          `"${booking.Hub || "N/A"}"`,  
          `"${booking.Truck_Capacity || "N/A"}"`, 
          `"${booking.Crew_Comments || "N/A"}"`,  
          `"${booking.Google_Reviews || "N/A"}"`, 
          `"${booking.CUSTOMER_REVIEW || "N/A"}"`,  
          `"${booking.Start_Time_from_Hub || "N/A"}"`,  
          `"${booking.Time_reached_Pick_location || "N/A"}"`, 
          `"${formatDate(booking.Loading_Start_Time) || "N/A"}"`, 
          `"${formatDate(booking.Loading_End_time) || "N/A"}"`, 
          `"${formatDate(booking.Travel_Start_from_Pick_up_Location) || "N/A"}"`, 
          `"${formatDate(booking.Travel_End_at_destination) || "N/A"}"`,  
          `"${formatDate(booking.Unloading_Start_Time) || "N/A"}"`, 
          `"${formatDate(booking.Unloading_End_Time) || "N/A"}"`, 
          `"${formatDate(booking.Return_start_Time) || "N/A"}"`,  
          `"${formatDate(booking.Arrival_Time_Hub_Next_Job) || "N/A"}"`,  
          `"${booking.Hours_Estimated || "N/A"}"`,  
          `"${booking.Move_Distance_Kms || "N/A"}"`,  
          `"${booking.Total_Weight_lbs || "N/A"}"`, 
          `"${booking.Estimate_Amount_$ || "N/A"}"`,  
          `"${booking.Final_Invoice_Amt_Including_Tax || "N/A"}"`,  
          `"${booking.Final_Invoice_Amt_Excluding_Tax || "N/A"}"`,  
          `"${booking.Truck_Cost || "N/A"}"`, 
          `"${booking.Fuel_Charges || "N/A"}"`, 
          `"${booking.Food || "N/A"}"`, 
          `"${booking.Scaling_Fee || "N/A"}"`,  
          `"${booking.Labour_Pay || "N/A"}"`, 
          `"${booking.Supply || "N/A"}"`, 
          `"${booking.Maintenance || "N/A"}"`,  
          `"${booking.Ferry_charges || "N/A"}"`
        ];
    
        csvRows.push(row.join(","));
      });

      const csvString = csvRows.join("\n");

      const blob = new Blob([csvString], { type: "text/csv;charset=utf-8;" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "bookings.csv";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    };
    





    return (
      
      <div className="all-list-view">
        <div className="bookings-list-my">
          <div>
            <div className="bookings-header-my" >
              <div style={{ display: "flex", textAlign: "center" , flex: '1'}}>

              {["Banner", "Customer_Name", "Invoice" , "MoveDate", "Move_From", "Move_To", "Move_Size", "Assigned_To", "Status"].map((field) => (
                <span 
                  key={field}
                  onClick={() => handleSort(field)}
                  // className="header-with-hover"
                  style={{ cursor: "pointer", padding: "0 0",margin:"0 10px", textAlign:'center' }}
                >
                  {field.replace(/_/g, " ")}
                </span>
              ))}
              </div>
              <button7
                className="tiny-dropdown-button"
                style={{ fontSize: "10px", padding: "2px" ,marginRight:"-05px", marginTop:"05px", cursor: "pointer" , border: "none" , borderRadius:"50px", color:"white"}}
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              >
                <FontAwesomeIcon icon={faFilter} size="2x"/>
              </button7>
            </div>
            {isDropdownOpen && (
            <div>
              {/* <div style={{}} >
                <button
                  className="download-button"
                  onClick={downloadCSV}
                  aria-label="Download bookings as CSV"
                  style={{
                    padding:'0 0 ',
                    background: "none",
                    color: "Black",
                    border: "none",
                    // float:'Right',
                    borderRadius: "5px",
                    cursor: "pointer",
                    marginRight: "-10px",
                  }}
                >
                  <FontAwesomeIcon icon={faDownload} />  
                </button>
              </div> */}
            <div
              className="extra-header-bar"
              style={{ marginTop: "0px", padding: "10px", background: "#ff6767", borderRadius: "30px" }}
            >
              
              <div
                className="search-bar-container"
                style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}
              >

        {[
          {  placeholder: "", valueKey: "Banner" },
          {  placeholder: "", valueKey: "Customer_Name" },
          {  placeholder: "", valueKey: "INVOICE" },
          {
            
            content: (
              <div style={{ display: "flex", flexDirection: "column", gap: "5px", alignItems: "center" }}>
                {[{ label: "From Date", date: fromDate, setDate: setFromDate }, { label: "To Date", date: toDate, setDate: setToDate }].map(
                  ({ date, setDate }, index) => (
                    <div className="date-picker" style={{ position: "relative" }} key={index}>
                      <DatePicker
                        selected={date}
                        onChange={(newDate) => setDate(newDate)}
                        placeholderText={` ${index === 0 ? "" : ""} `}
                        dateFormat="dd/MM/yyyy"
                        todayButton="Today"
                        className="custom-datepicker"
                        wrapperClassName="date-picker-wrapper"
                      />
                      {date && (
                        <button7
                          onClick={() => clearDate(setDate)}
                          style={{
                            position: "absolute",
                            right: "5px",
                            top: "48%",
                            transform: "translateY(-50%)",
                            background: "none",
                            border: "none",
                            cursor: "pointer"
                          }}
                        >
                          X
                        </button7>
                      )}
                    </div>
                  )
                )}
              </div>
            )
          },
          { placeholder: "", valueKey: "Move_From" },
          { placeholder: "", valueKey: "Move_To" },
          { placeholder: "", valueKey: "Move_Size" },
          { placeholder: "", valueKey: "Assigned_To" },
          { placeholder: "", valueKey: "Status" },
        ].map(({ header, placeholder, valueKey, content }, index) => (
          <div key={index} style={{ display: "flex", flexDirection: "column", alignItems: "center", flex: 1 }}>
            <span style={{ cursor: "pointer", padding: "0 10px", textAlign: 'center' }}>{header}</span>
            {content ? content : (
              <div style={{ position: "relative", display: "flex", justifyContent: "center" }}>
                <input
                  type="text"
                  placeholder={placeholder}
                  value={searchTerms[valueKey]}
                  onChange={(e) => handleSearchChange(valueKey, e.target.value)}
                  style={{
                    width: "100%",
                    minWidth: "50px",      // Minimum width of 50px
                    maxWidth: "150px",      // Maximum width of 100px
                    flex: "1 1 100px",      // Allow resizing with flex
                    borderRadius: "5px",
                    marginTop: "5px",

                    
                  }}
                />


                {searchTerms[valueKey] && (
                  <button7
                    onClick={() => clearSearchTerm(valueKey)}
                    style={{
                      position: "absolute",
                      right: "5px",
                      top: "48%",
                      transform: "translateY(-50%)",
                      background: "none",
                      border: "none",
                      cursor: "pointer"
                    }}
                  >
                    X
                  </button7>
                )}
              </div>
            )}
          </div>
        ))}
         
         
          <div style={{}} >
                <button
                  className="download-button"
                  onClick={downloadCSV}
                  aria-label="Download bookings as CSV"
                  style={{
                    padding:'0 0 ',
                    background: "none",
                    color: "black",
                    border: "none",
                    float:'Right',  
                    borderRadius: "5px",
                    cursor: "pointer",
                    marginRight: "-8px",
                  }}
                >
                  <FontAwesomeIcon icon={faDownload} />  
                </button>
              </div>
        </div>
        </div>
        </div>
      )}


          <div className="bookings-list-my">
            {sortedBookings.map((booking, index) => {
              const {
                Banner,
                Customer_Name,
                INVOICE,
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
                  <span>{INVOICE}</span>
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
        <div className="grid-header">INVOICE</div>
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