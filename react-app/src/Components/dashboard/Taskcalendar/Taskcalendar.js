// // import React, { useState } from "react";
// // import { Calendar, momentLocalizer } from "react-big-calendar";
// // import moment from "moment";
// // import useBookings from '../../usebooking';
// // import "react-big-calendar/lib/css/react-big-calendar.css";


// // const localizer = momentLocalizer(moment);

// // const TaskCalendar = () => {
// //     const {
// //         bookingsData, selectedBooking, editableBooking, activeTab, activeInventoryTab,
// //         loading, error, query, viewMode, editStates, isPopupVisible, popupContent,
// //         setQuery, setViewMode, setEditStates, setIsPopupVisible, setPopupContent,
// //         handleClosePopup, handlePopupOpen, parseDate, getLastTwoLetters, formatDate,
// //         handleBookingClick, isFutureOrToday, generateGoogleMapsLink, handleSave,
// //         handleBookingClick1, toggleEditState, handleInputChange, navigate,parsedDate,
// //         renderBookingDetails,renderCrewnotesBookingDetails,handleInputChange1,downloadPDF,
// //       } = useBookings();

// //   const [events, setEvents] = useState([
// //     {
// //       title: "ActionController::RoutingError",
// //       start: new Date(2024, 3, 5, 11, 34), 
// //       end: new Date(2024, 3, 5, 13, 0),
// //       desc: "Supersterra",
// //       color: "red", 
// //     },
// //     {
// //       title: "Przycisk Pobierz",
// //       start: new Date(2024, 3, 1, 12, 31),
// //       end: new Date(2024, 3, 1, 13, 30),
// //       desc: "Automatyzacja",
// //       color: "green",
// //     },
// //     {
// //       title: "Zalozenie Chata",
// //       start: new Date(2024, 3, 23, 8, 24),
// //       end: new Date(2024, 3, 23, 9, 0),
// //       color: "red",
// //     },
// //     {
// //       title: "Blad statusów",
// //       start: new Date(2024, 3, 10, 17, 59),
// //       end: new Date(2024, 3, 10, 19, 0),
// //       color: "orange",
// //     },
// //   ]);

// //   const eventStyleGetter = (event) => {
// //     let backgroundColor = event.color || "#3174ad"; 
// //     let style = {
// //       backgroundColor: backgroundColor,
// //       borderRadius: "5px",
// //       opacity: 0.8,
// //       color: "white",
// //       border: "0px",
// //       display: "block",
// //     };
// //     return {
// //       style: style,
// //     };
// //   };

// //   return (
// //     <div className="App">
// //       <h2>Task Calendar</h2>
// //       <Calendar
// //         localizer={localizer}
// //         events={events}
// //         startAccessor="start"
// //         endAccessor="end"
// //         style={{ height: 600, margin: "50px" }}
// //         eventPropGetter={eventStyleGetter}
// //         defaultDate={new Date} 
// //       />
// //     </div>
// //   );
// // };

// // export default TaskCalendar;
// import React, { useState, useEffect } from "react";
// import { Calendar, momentLocalizer } from "react-big-calendar";
// import moment from "moment";
// import useBookings from "../../usebooking";  // Assuming you are using a custom hook to get booking data
// import "react-big-calendar/lib/css/react-big-calendar.css";

// // Initialize localizer for react-big-calendar using moment
// const localizer = momentLocalizer(moment);

// const TaskCalendar = () => {
//   const {
//     bookingsData,parseDate,  // Assuming bookingsData has data like MoveDate, Customer_Name, MoveFrom, MoveTo
//   } = useBookings();

// //   Helper function to assign colors based on MoveFrom and MoveTo values
//   const getColorByLocation = (moveFrom, moveTo) => {
//     if (moveFrom === "London" && moveTo === "Manchester") return "blue";
//     if (moveFrom === "Birmingham" && moveTo === "London") return "green";
//     // Add more logic based on locations if needed
//     return "purple"; // Default color
//   };

//   const [events, setEvents] = useState([]);

//   useEffect(() => {
//     if (bookingsData && bookingsData.length > 0) {
//       const newEvents = bookingsData.map((booking) => {
//         const { MoveDate, Customer_Name, MoveFrom, MoveTo } = booking;
//         const startDate = parseDate(MoveDate);  

//         return {
//           title: Customer_Name,  
//           start: startDate, 
//           end: startDate,  
//           color: getColorByLocation(MoveFrom, MoveTo),
//         };
//       });
//       setEvents(newEvents);
//     }
//   }, [bookingsData]);

//   // Custom event style function for different colors
//   const eventStyleGetter = (event) => {
//     let backgroundColor = event.color || "#3174ad"; // Default color
//     let style = {
//       backgroundColor: backgroundColor,
//       borderRadius: "5px",
//       opacity: 0.8,
//       color: "white",
//       border: "0px",
//       display: "block",
//     };
//     return {
//       style: style,
//     };
//   };

//   return (
//     <div className="App">
//       <h2>Task Calendar</h2>
//       <Calendar
//         localizer={localizer}
//         events={events}
//         startAccessor="start"
//         endAccessor="end"
//         style={{ height: 600, margin: "50px" }}
//         eventPropGetter={eventStyleGetter}
//         defaultDate={new Date()}  // Set the default date to today's date
//       />
//     </div>
//   );
// };

// export default TaskCalendar;
import React, { useState, useEffect } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import useBookings from "../../usebooking"; 
import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = momentLocalizer(moment);

const TaskCalendar = () => {
  const {
    bookingsData, parseDate, handleBookingClick1,getLastTwoLetters 
  } = useBookings();

const getColorByLocation = (Move_From) => {
    const moveFromLastTwo = getLastTwoLetters(Move_From);
    if (moveFromLastTwo === "BC") return "blue";       
    if (moveFromLastTwo === "ON") return "forestgreen"; 
    if (moveFromLastTwo === "AB") return "crimson";     
    if (moveFromLastTwo === "SK") return "darkgray";   
    if (moveFromLastTwo === "QC") return "gold";        
    if (moveFromLastTwo === "NB") return "lightgreen"; 
    if (moveFromLastTwo === "NL") return "darkgreen";   
    if (moveFromLastTwo === "NS") return "teal";        
    if (moveFromLastTwo === "YT") return "darkblue";   
    if (moveFromLastTwo === "MB") return "orange";      
    if (moveFromLastTwo === "NT") return "red";      
    if (moveFromLastTwo === "PE") return "coral";  
    
    return "purple"; 
  };

  const [events, setEvents] = useState([]);

  useEffect(() => {
    if (bookingsData && bookingsData.length > 0) {
      const newEvents = bookingsData.map((booking) => {
        const { MoveDate, Customer_Name, Move_From, Move_To, row_index } = booking;
        const startDate = parseDate(MoveDate);  

        return {
          title: Customer_Name,  
          start: startDate, 
          end: startDate,  
          color: getColorByLocation(Move_From, Move_To),
          rowIndex: row_index,
        };
      });
      setEvents(newEvents);
    }
  }, [bookingsData]);

  
  const eventStyleGetter = (event) => {
    let backgroundColor = event.color || "#3174ad"; 
    let style = {
      backgroundColor: backgroundColor,
      borderRadius: "5px",
      opacity: 0.8,
      color: "white",
      border: "0px",
      display: "block",
    };
    return {
      style: style,
    };
  };

  const handleEventClick = (event) => {
    handleBookingClick1(event.rowIndex);
  };

  return (
    <div className="App">
      <h2>Task Calendar</h2>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 600, margin: "50px" }}
        eventPropGetter={eventStyleGetter}
        defaultDate={new Date()}  
        onSelectEvent={handleEventClick}  
      />
    </div>
  );
};

export default TaskCalendar;
