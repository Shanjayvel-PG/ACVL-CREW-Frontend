
import React, { useState, useEffect } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import useBookings from "../../usebooking";
import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = momentLocalizer(moment);

const TaskCalendar = () => {
  const { bookingsData, parseDate, handleBookingClick1, getLastTwoLetters } =
    useBookings();

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

  const locationColors = {
    BC: "blue",
    ON: "forestgreen",
    AB: "crimson",
    SK: "darkgray",
    QC: "gold",
    NB: "lightgreen",
    NL: "darkgreen",
    NS: "teal",
    YT: "darkblue",
    MB: "orange",
    NT: "red",
    PE: "coral",
    default: "purple",
  };

  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [selectedRegion, setSelectedRegion] = useState(null);

  useEffect(() => {
    if (bookingsData && bookingsData.length > 0) {
      const newEvents = bookingsData.map((booking) => {
        const { MoveDate, Customer_Name,INVOICE, Move_From, row_index } = booking;
        const startDate = parseDate(MoveDate); 

        return {
          title:`${Customer_Name} - ${INVOICE}`,
          start: startDate,
          end: startDate,
          color: getColorByLocation(Move_From),
          moveFrom: getLastTwoLetters(Move_From),
          rowIndex: row_index,
        };
      });
      setEvents(newEvents);
      setFilteredEvents(newEvents); // Initially show all events
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

  const handleRegionClick = (regionCode) => {
    if (regionCode === "ALL") {
      setFilteredEvents(events); 
      setSelectedRegion(null);  
    } else {
      const filtered = events.filter((event) => event.moveFrom === regionCode);
      setFilteredEvents(filtered);
      setSelectedRegion(regionCode); 
    }
  };

  return (
    <div className="App">
      <h1>Job Calendar</h1>

      <div style={{ display: "flex", justifyContent: "center", marginBottom: "20px" }}>
        {Object.keys(locationColors).map((regionCode) => (
          <div
            key={regionCode}
            onClick={() => handleRegionClick(regionCode)}
            style={{
              backgroundColor: locationColors[regionCode],
              color: "white",
              padding: "5px 10px",
              margin: "0 5px",
              cursor: "pointer",
              borderRadius: "5px",
              opacity: selectedRegion === regionCode ? 1 : 0.6,
            }}
          >
            {regionCode}
          </div>
        ))}
        <div
          onClick={() => handleRegionClick("ALL")}
          style={{
            backgroundColor: "gray",
            color: "white",
            padding: "5px 10px",
            margin: "0 5px",
            cursor: "pointer",
            borderRadius: "5px",
            opacity: selectedRegion === null ? 1 : 0.6,
          }}
        >
          Show All
        </div>
      </div>

      <Calendar
        localizer={localizer}
        events={filteredEvents} 
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
