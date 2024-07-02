import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../My Bookings/Excel.css';

const Expast= () => {
  const [allData, setAllData] = useState({ moveDateValues: [], moveFromValues: [], moveToValues: [], moveSizes: [], customerNames: [], rowIndices: [] });
  const [displayData, setDisplayData] = useState({ moveDateValues: [], moveFromValues: [], moveToValues: [], moveSizes: [], customerNames: [], rowIndices: [] });
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
      const moveSizes = response.data.records.map(entry => entry["MoveSize"]);
      const customerNames = response.data.records.map(entry => entry["Customer_name"]);
      const rowIndices = response.data.records.map(entry => entry.ID);

      const currentDate = new Date();
      const filteredMoveDateValues = [];
      const filteredMoveFromValues = [];
      const filteredMoveToValues = [];
      const filteredMoveSizes = [];
      const filteredCustomerNames = [];
      const filteredRowIndices = [];

      moveDateValues.forEach((date, index) => {
        if (date < currentDate) {
          filteredMoveDateValues.push(date);
          filteredMoveFromValues.push(moveFromValues[index]);
          filteredMoveToValues.push(moveToValues[index]);
          filteredMoveSizes.push(moveSizes[index]);
          filteredCustomerNames.push(customerNames[index]);
          filteredRowIndices.push(rowIndices[index]);
        }
      });

      const processedData = { moveDateValues: filteredMoveDateValues, moveFromValues: filteredMoveFromValues, moveToValues: filteredMoveToValues, moveSizes: filteredMoveSizes, customerNames: filteredCustomerNames, rowIndices: filteredRowIndices };
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

  const getCellValue = (province, date, moveDateValues, moveFromValues, moveToValues, moveSizes, customerNames, rowIndices) => {
    let cellValue = '';
    for (let i = 0; i < moveDateValues.length; i++) {
      const formattedDate = `${moveDateValues[i].getDate()}-${getMonthAbbreviation(moveDateValues[i].getMonth())}-${moveDateValues[i].getFullYear()}`;
      if (formattedDate === date) {
        const rowIndex = rowIndices[i];
        const moveDate = moveDateValues[i].toLocaleDateString();
        const moveTo = moveToValues[i];
        const moveSize = moveSizes[i];
        const popupContent = `<div class="popup"><div class="popup-content">Customer: ${customerNames[i]}<br/>Date: ${moveDate}<br/>Move To: ${moveTo}<br/>MoveSize: ${moveSize}</div></div>`;
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

  const displayTable = (moveDateValues, moveFromValues, moveToValues, moveSizes, customerNames, rowIndices, year, month) => {
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
        const cellValue = getCellValue(province, date, moveDateValues, moveFromValues, moveToValues, moveSizes, customerNames, rowIndices);
        table += `<td class="data-cell">${cellValue}</td>`;
      });
      table += '</tr>';
    });

    table += '</tbody></table>';
    return { __html: table };
  };

  const showMonth = (monthIndex) => {
    if (!allData.moveDateValues || !allData.moveFromValues || !allData.moveToValues || !allData.moveSizes || !allData.customerNames || !allData.rowIndices) {
      setDisplayData([]);
      return;
    }

    const filteredDates = allData.moveDateValues.filter(date => date.getMonth() === monthIndex);
    const filteredMoveFromValues = [];
    const filteredMoveToValues = [];
    const filteredMoveSizes = [];
    const filteredCustomerNames = [];
    const filteredRowIndices = [];

    allData.moveDateValues.forEach((date, index) => {
      if (date.getMonth() === monthIndex) {
        filteredMoveFromValues.push(allData.moveFromValues[index]);
        filteredMoveToValues.push(allData.moveToValues[index]);
        filteredMoveSizes.push(allData.moveSizes[index]);
        filteredCustomerNames.push(allData.customerNames[index]);
        filteredRowIndices.push(allData.rowIndices[index]);
      }
    });

    setCurrentMonth(monthIndex);

    if (filteredDates.length === 0) {
      setDisplayData([]);
    } else {
      setDisplayData({ moveDateValues: filteredDates, moveFromValues: filteredMoveFromValues, moveToValues: filteredMoveToValues, moveSizes: filteredMoveSizes, customerNames: filteredCustomerNames, rowIndices: filteredRowIndices });
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
        <div dangerouslySetInnerHTML={displayTable(displayData.moveDateValues || [], displayData.moveFromValues || [], displayData.moveToValues || [], displayData.moveSizes || [], displayData.customerNames || [], displayData.rowIndices || [], new Date().getFullYear(), currentMonth)} />
      </div>
    </div>
  );
};

export default Expast;
