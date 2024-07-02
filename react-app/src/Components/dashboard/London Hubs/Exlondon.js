import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../My Bookings/Excel.css';

const zipcodeRanges = [
  { start: "N1C 0A0", end: "N1L 9Z9", location: "London" },
  { start: "N1P 0A0", end: "N1T 9Z9", location: "London" },
  { start: "N2A 0A0", end: "N2H 9Z9", location: "London" },
  { start: "N2J 0A0", end: "N2L 9Z9", location: "London" },
  { start: "N2M 0A0", end: "N2R 9Z9", location: "London" },
  { start: "N2T 0A0", end: "N2V 9Z9", location: "London" },
  { start: "N3C 0A0", end: "N3H 9Z9", location: "London" },
  { start: "N3P 0A0", end: "N3V 9Z9", location: "London" },
  { start: "N4K 0A0", end: "N4K 9Z9", location: "London" },
  { start: "N5V 0A0", end: "N6Z 9Z9", location: "London" },
  { start: "N7S 0A0", end: "N7X 9Z9", location: "London" },
  { start: "N8N 0A0", end: "N9J 9Z9", location: "London" },
];

const isZipcodeInRange = (zipcode, range) => {
  return zipcode >= range.start && zipcode <= range.end;
};

const isZipcodeInLondon = (zipcode) => {
  return zipcodeRanges.some(range => isZipcodeInRange(zipcode, range));
};

const extractZipcode = (address) => {
  const regex = /[A-Z]\d[A-Z] \d[A-Z]\d/;
  const match = address.match(regex);
  return match ? match[0] : '';
};

const Exlondon = () => {
  const [allData, setAllData] = useState({ moveDateValues: [], moveFromValues: [], moveToValues: [], customerNames: [], rowIndices: [] });
  const [displayData, setDisplayData] = useState({ moveDateValues: [], moveFromValues: [], moveToValues: [], customerNames: [], rowIndices: [] });
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const tableContainerRef = useRef(null);
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const response = await axios.get('https://appsail-10083401023.development.catalystappsail.com/zoho-data');
      console.log('Data from server:', response.data);
      if (!Array.isArray(response.data.records)) {
        throw new Error('Records array not found or not in expected format');
      }

      const moveDateValues = response.data.records.map(entry => new Date(entry.MoveDate.split('/').reverse().join('-')));
      const moveFromValues = response.data.records.map(entry => entry['MoveFrom'].slice(-2));
      const moveToValues = response.data.records.map(entry => entry.MoveTo.slice(-2));
      const customerNames = response.data.records.map(entry => entry["Customer_name"]);
      const rowIndices = response.data.records.map(entry => entry.ID);
      const fromAddresses = response.data.records.map(entry => entry['FromAddress']);

      const currentDate = new Date();
      const filteredMoveDateValues = [];
      const filteredMoveFromValues = [];
      const filteredMoveToValues = [];
      const filteredCustomerNames = [];
      const filteredRowIndices = [];

      moveDateValues.forEach((date, index) => {
        const fromZipcode = extractZipcode(fromAddresses[index]);
        if (date > currentDate && isZipcodeInLondon(fromZipcode)) {
          filteredMoveDateValues.push(date);
          filteredMoveFromValues.push(moveFromValues[index]);
          filteredMoveToValues.push(moveToValues[index]);
          filteredCustomerNames.push(customerNames[index]);
          filteredRowIndices.push(rowIndices[index]);
        }
      });

      const processedData = { moveDateValues: filteredMoveDateValues, moveFromValues: filteredMoveFromValues, moveToValues: filteredMoveToValues, customerNames: filteredCustomerNames, rowIndices: filteredRowIndices };
      console.log('Processed Data:', processedData);

      setAllData(processedData);
      setDisplayData(processedData);
    } catch (error) {
      console.error('Error fetching data:', error);
      alert('Error fetching data. Please try again.');
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const handleIndicatorClick = (event) => {
      const rowIndex = event.target.getAttribute('data-row-index');
      navigate(`/booking-details/${rowIndex}`);
    };

    const tableContainer = tableContainerRef.current;
    const indicators = tableContainer.querySelectorAll('.indicator');
    indicators.forEach(indicator => {
      indicator.addEventListener('click', handleIndicatorClick);
    });

    return () => {
      indicators.forEach(indicator => {
        indicator.removeEventListener('click', handleIndicatorClick);
      });
    };
  }, [displayData, navigate]);

  const getMonthAbbreviation = (monthIndex) => {
    const monthAbbreviations = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    return monthAbbreviations[monthIndex];
  };

  const getCellValue = (province, date, moveDateValues, moveFromValues, moveToValues, customerNames, rowIndices) => {
    let cellValue = '';
    for (let i = 0; i < moveDateValues.length; i++) {
      const formattedDate = `${moveDateValues[i].getDate()}-${getMonthAbbreviation(moveDateValues[i].getMonth())}-${moveDateValues[i].getFullYear()}`;
      if (formattedDate === date) {
        const rowIndex = rowIndices[i];
        const moveDate = moveDateValues[i].toLocaleDateString();
        const popupContent = `<div class="popup"><div class="popup-content">Customer: ${customerNames[i]}<br/>Date: ${moveDate}</div></div>`;
        if (moveFromValues[i] === province && moveFromValues[i] === moveToValues[i]) {
          cellValue += `<span class="indicator both-indicator" data-row-index="${rowIndex}" data-date="${moveDate}">▸◂${popupContent}</span>`;
        } else if (moveFromValues[i] === province) {
          cellValue += `<span class="indicator right-indicator" data-row-index="${rowIndex}" data-date="${moveDate}">▸${popupContent}</span>`;
        } else if (moveToValues[i] === province) {
          cellValue += `<span class="indicator left-indicator" data-row-index="${rowIndex}" data-date="${moveDate}">◂${popupContent}</span>`;
        }
      }
    }
    return cellValue || '<span class="no-move"></span>'; // Return a placeholder if no moves
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

  const displayTable = (moveDateValues, moveFromValues, moveToValues, customerNames, rowIndices, year, month) => {
    const provinces = ['YT', 'NT', 'BC', 'AB', 'SK', 'MB', 'ON', 'NB', 'NS', 'PE', 'QC', 'NL'];
    const allDates = getAllDatesInMonth(year, month);
    const uniqueDates = allDates.map(date => `${date.getDate()}-${getMonthAbbreviation(date.getMonth())}-${date.getFullYear()}`);

    let table = '<table><thead><tr><th class="sticky">Province</th>';
    uniqueDates.forEach(date => {
      table += `<th class="date-header">${date}</th>`;
    });
    table += '</tr></thead><tbody>';

    provinces.forEach(province => {
      table += `<tr><td class="sticky">${province}</td>`;
      uniqueDates.forEach(date => {
        const cellValue = getCellValue(province, date, moveDateValues, moveFromValues, moveToValues, customerNames, rowIndices);
        table += `<td class="data-cell">${cellValue}</td>`;
      });
      table += '</tr>';
    });

    table += '</tbody></table>';
    return { __html: table };
  };

  const showMonth = (monthIndex) => {
    if (!allData.moveDateValues || !allData.moveFromValues || !allData.moveToValues || !allData.customerNames || !allData.rowIndices) {
      setDisplayData([]);
      return;
    }

    const filteredDates = allData.moveDateValues.filter(date => date.getMonth() === monthIndex);
    const filteredMoveFromValues = [];
    const filteredMoveToValues = [];
    const filteredCustomerNames = [];
    const filteredRowIndices = [];

    allData.moveDateValues.forEach((date, index) => {
      if (date.getMonth() === monthIndex) {
        filteredMoveFromValues.push(allData.moveFromValues[index]);
        filteredMoveToValues.push(allData.moveToValues[index]);
        filteredCustomerNames.push(allData.customerNames[index]);
        filteredRowIndices.push(allData.rowIndices[index]);
      }
    });

    setCurrentMonth(monthIndex);

    if (filteredDates.length === 0) {
      setDisplayData([]);
    } else {
      setDisplayData({ moveDateValues: filteredDates, moveFromValues: filteredMoveFromValues, moveToValues: filteredMoveToValues, customerNames: filteredCustomerNames, rowIndices: filteredRowIndices });
    }
  };

  const createMonthButtons = () => {
    const buttons = [];
    for (let monthIndex = 0; monthIndex < 12; monthIndex++) {
      buttons.push(
        <button
          key={monthIndex}
          className="month-button"
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
        {createMonthButtons()}
      </div>
      <div className="table-container" ref={tableContainerRef}>
        <div dangerouslySetInnerHTML={displayTable(displayData.moveDateValues || [], displayData.moveFromValues || [], displayData.moveToValues || [], displayData.customerNames || [], displayData.rowIndices || [], new Date().getFullYear(), currentMonth)} />
      </div>
    </div>
  );
};

export default Exlondon;
