
import React, { useRef, useState, useEffect } from 'react';
import DateSlider from './Map/Dateslider';
import moment from 'moment';
import "./Map/Map.css";
import { FaHome } from 'react-icons/fa'; 
import MonthSelector from './Map/Month';

const MapComponent = ({ filteredBookingsData, onMarkerClick }) => {
  const mapRef = useRef(null);
  const markersRef = useRef([]);
  const polylinesRef = useRef([]);
  const [moveDate, setMoveDate] = useState('');
  const [hoveredDate, setHoveredDate] = useState('');
  const [filteredData, setFilteredData] = useState(filteredBookingsData);
  const [selectedMonth, setSelectedMonth] = useState('Next 30 Days');

  useEffect(() => {
    const loadGoogleMapsScript = () => {
      return new Promise((resolve) => {
        if (window.google && window.google.maps) {
          resolve();
          return;
        }

        const existingScript = document.querySelector(
          `script[src*="maps.googleapis.com/maps/api/js"]`
        );
        if (existingScript) {
          existingScript.onload = resolve;
          return;
        }

        const script = document.createElement('script');
        script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyAMzUwrsAzd70QdSlQzq6kvTo2xP-czmCs&libraries=places`;
        script.async = true;
        script.onload = resolve;
        document.body.appendChild(script);
      });
    };

    loadGoogleMapsScript().then(() => {
      if (!mapRef.current) {
        const mapElement = document.getElementById('map');
        if (!mapElement) {
          console.error('Map element not found');
          return;
        }

        mapRef.current = new window.google.maps.Map(mapElement, {
          center: { lat: 44.381941192408064, lng: -80.22807949999998 },
          zoom: 4,
        });

        // Trigger initial rendering of markers and polylines after the map is initialized
        updateMarkersAndPolylines();
      }
    });

    return () => {
      if (mapRef.current) {
        mapRef.current = null;
      }
    };
  }, []);

  const clearMarkersAndPolylines = () => {
    markersRef.current.forEach((marker) => {
      if (marker) {
        marker.setMap(null);
      }
    });
    markersRef.current = [];

    polylinesRef.current.forEach((polyline) => {
      if (polyline) {
        polyline.setMap(null);
      }
    });
    polylinesRef.current = [];
  };

  const createMarker = (
    position,
    iconUrl,
    tooltipContent,
    id,
    highlight = false
  ) => {
    if (!window.google || !window.google.maps) {
      console.error('Google Maps is not loaded yet.');
      return;
    }

    const marker = new window.google.maps.Marker({
      position,
      map: mapRef.current,
      icon: {
        url: iconUrl,
        scaledSize: new window.google.maps.Size(25, 41),
        fillColor: highlight ? 'red' : 'blue',
      },
      animation: highlight ? window.google.maps.Animation.BOUNCE : null,
    });

    const infoWindow = new window.google.maps.InfoWindow({
      content: tooltipContent,
    });

    marker.addListener('mouseover', () => {
      infoWindow.open({
        anchor: marker,
        map: mapRef.current,
        shouldFocus: false,
      });
    });

    marker.addListener('mouseout', () => {
      infoWindow.close();
    });

    marker.addListener('click', () => {
      onMarkerClick(id);
    });

    return marker;
  };

  // const createPolyline = (
  //   path,
  //   originCoords,
  //   destCoords,
  //   highlight = false
  // ) => {
  //   if (!window.google || !window.google.maps) {
  //     console.error('Google Maps is not loaded yet.');
  //     return;
  //   }

  //   const polyline = new window.google.maps.Polyline({
  //     path,
  //     geodesic: true,
  //     strokeColor: highlight ? 'red' : 'black',
  //     strokeOpacity: 1.0,
  //     strokeWeight: 4,
  //     map: mapRef.current,
  //   });

  //   polyline.addListener('click', () => {
  //     const url = `https://www.google.com/maps/dir/?api=1&origin=${originCoords[0]},${originCoords[1]}&destination=${destCoords[0]},${destCoords[1]}`;
  //     window.open(url, '_blank');
  //   });

  //   return polyline;
  // };
  const createPolyline = (path, originCoords, destCoords, strokeColor) => {
    if (!window.google || !window.google.maps) {
      console.error('Google Maps is not loaded yet.');
      return;
    }
  
    const polyline = new window.google.maps.Polyline({
      path,
      geodesic: true,
      strokeColor: strokeColor, // Set the stroke color directly
      strokeOpacity: 1.0,
      strokeWeight: 1,
      map: mapRef.current,
    });
  
    polyline.addListener('click', () => {
      const url = `https://www.google.com/maps/dir/?api=1&origin=${originCoords[0]},${originCoords[1]}&destination=${destCoords[0]},${destCoords[1]}`;
      window.open(url, '_blank');
    });
  
    return polyline;
  };
  // const updateMarkersAndPolylines = () => {
  //   clearMarkersAndPolylines();

  //   filteredData.forEach((item) => {
  //     const possibleFormats = [moment.ISO_8601, 'DD/MM/YYYY', 'DD-MM-YYYY', 'D-MM-YYYY', 'DD MMM, YYYY', 'D MMM, YYYY'];
  //     const moveDateMoment = moment(item.MoveDate, possibleFormats, true);

  //     if (!moveDateMoment.isValid()) {
  //       console.error('Invalid date format:', item.MoveDate);
  //       return;
  //     }

  //     const isHighlighted = hoveredDate && moveDateMoment.format('YYYY-MM-DD') === hoveredDate;

  //     // const originCoords = item.Coordinates_Origin.split(',').map(coord => parseFloat(coord.trim()));
  //     // const destCoords = item.Coordinates_Destn.split(',').map(coord => parseFloat(coord.trim()));
      
  //       const originCoords = item.Coordinates_Origin ? item.Coordinates_Origin.split(',').map(coord => parseFloat(coord.trim())) : [];
  //       const destCoords = item.Coordinates_Destn ? item.Coordinates_Destn.split(',').map(coord => parseFloat(coord.trim())) : [];
        
  //       if (originCoords.length === 2 && destCoords.length === 2 && !isNaN(originCoords[0]) && !isNaN(originCoords[1]) && !isNaN(destCoords[0]) && !isNaN(destCoords[1])) {
  //         const originMarker = createMarker(
  //           { lat: originCoords[0], lng: originCoords[1] },
  //           'https://cdn-icons-png.flaticon.com/128/11057/11057342.png',
  //           `
  //             <b>Customer Name:</b> ${item.Customer_Name}<br>
  //             <b>Move Date:</b> ${moveDateMoment.format('YYYY-MM-DD')}<br>
  //             <b>Move From:</b> ${item.Move_From}<br>
  //             <b>Move To:</b> ${item.Move_To}<br>
  //             <b>Move Size:</b> ${item.Move_Size}
  //           `,
  //           item.row_index, 
  //           isHighlighted
  //         );
  
  //         const destinationMarker = createMarker(
  //           { lat: destCoords[0], lng: destCoords[1] },
  //           'https://cdn-icons-png.flaticon.com/128/10124/10124136.png',
  //           `
  //             <b>Customer Name:</b> ${item.Customer_Name}<br>
  //             <b>Move Date:</b> ${moveDateMoment.format('YYYY-MM-DD')}<br>
  //             <b>Move From:</b> ${item.Move_From}<br>
  //             <b>Move To:</b> ${item.Move_To}<br>
  //             <b>Move Size:</b> ${item.Move_Size}
  //           `,
  //           item.row_index, 
  //           isHighlighted
  //         );
  
  //         const path = [
  //           { lat: originCoords[0], lng: originCoords[1] },
  //           { lat: destCoords[0], lng: destCoords[1] },
  //         ];
  
  //         const polyline = createPolyline(path, originCoords, destCoords, isHighlighted);
  //         polylinesRef.current.push(polyline);
  
  //         markersRef.current.push(originMarker);
  //         markersRef.current.push(destinationMarker);
  //       } else {
  //         console.error('Invalid coordinates:', { originCoords, destCoords, item });
  //       }
  //     });
  //   };
  const updateMarkersAndPolylines = () => {
    clearMarkersAndPolylines();
  
    filteredData.forEach((item) => {
      const possibleFormats = [
        moment.ISO_8601, 
        'DD/MM/YYYY', 
        'DD-MM-YYYY', 
        'D-MM-YYYY', 
        'DD MMM, YYYY', 
        'D MMM, YYYY'
      ];
      const moveDateMoment = moment(item.MoveDate, possibleFormats, true);
  
      if (!moveDateMoment.isValid()) {
        console.error('Invalid date format:', item.MoveDate);
        return;
      }
  
      const isHighlighted = hoveredDate && moveDateMoment.format('YYYY-MM-DD') === hoveredDate;
  
      const originCoords = item.Coordinates_Origin ? item.Coordinates_Origin.split(',').map(coord => parseFloat(coord.trim())) : [];
      const destCoords = item.Coordinates_Destn ? item.Coordinates_Destn.split(',').map(coord => parseFloat(coord.trim())) : [];
  
      // Log the coordinates and check if they're valid
      console.log('Origin Coords:', originCoords, 'Destination Coords:', destCoords);
  
      if (originCoords.length === 2 && destCoords.length === 2 && !isNaN(originCoords[0]) && !isNaN(originCoords[1]) && !isNaN(destCoords[0]) && !isNaN(destCoords[1])) {
        const originMarker = createMarker(
          { lat: originCoords[0], lng: originCoords[1] },
        
          'https://cdn-icons-png.flaticon.com/128/10124/10124136.png',
          `
            <b>Customer Name:</b> ${item.Customer_Name || 'Unknown'}<br>
            <b>Move Date:</b> ${moveDateMoment.format('YYYY-MM-DD')}<br>
            <b>Move From:</b> ${item.Move_From}<br>
            <b>Move To:</b> ${item.Move_To}<br>
            <b>Move Size:</b> ${item.Move_Size}
          `,
          item.row_index,
          isHighlighted
        );
  
        const destinationMarker = createMarker(
          { lat: destCoords[0], lng: destCoords[1] },
          'https://cdn-icons-png.flaticon.com/128/11057/11057342.png',
          `
            <b>Customer Name:</b> ${item.Customer_Name || 'Unknown'}<br>
            <b>Move Date:</b> ${moveDateMoment.format('YYYY-MM-DD')}<br>
            <b>Move From:</b> ${item.Move_From}<br>
            <b>Move To:</b> ${item.Move_To}<br>
            <b>Move Size:</b> ${item.Move_Size}
          `,
          item.row_index,
          isHighlighted
        );
  
        // Extract longitude values and log them
        const originLng = originCoords[1]; // Longitude of the origin
        const destLng = destCoords[1]; // Longitude of the destination
  
        // console.log('Origin Longitude:', originLng, 'Destination Longitude:', destLng);
        let strokeColor = ''; 
        if (originLng < destLng) {
          strokeColor = 'darkblue';
        } else if (originLng > destLng) {
          strokeColor = 'red';
        }
        // console.log(`Polyline strokeColor for ${item.Customer_Name || 'Unknown'}:`, strokeColor)
        if (strokeColor) {
          const path = [
            { lat: originCoords[0], lng: originCoords[1] },
            { lat: destCoords[0], lng: destCoords[1] },
          ];
  
          const polyline = createPolyline(path, originCoords, destCoords, strokeColor);
          polylinesRef.current.push(polyline);
        }
  
        markersRef.current.push(originMarker);
        markersRef.current.push(destinationMarker);
      } else {
        console.error('Invalid coordinates:', { originCoords, destCoords, item });
      }
    });
  };
  useEffect(() => {
    if (filteredData.length > 0) {
      // console.log('Updating markers and polylines:', filteredData);
      updateMarkersAndPolylines();
    } else {
      console.log('No data to show on map.');
    }
  }, [filteredData, hoveredDate]);

  useEffect(() => {
    const filterDataByDate = () => {
      let data = filteredBookingsData;

      // If moveDate is set, filter by it, otherwise show all data
      if (moveDate) {
        data = data.filter((item) => {
          const possibleFormats = [
            moment.ISO_8601,
            'DD/MM/YYYY',
            'DD-MM-YYYY',
            'D-MM-YYYY',
            'DD MMM, YYYY',
            'D MMM, YYYY',
          ];
          const itemDate = moment(item.MoveDate, possibleFormats, true);
          return (
            itemDate.isValid() && itemDate.format('YYYY-MM-DD') === moveDate
          );
        });
      }

      // console.log('Filtered data:', data);
      setFilteredData(data);
    };

    filterDataByDate();
  }, [filteredBookingsData, moveDate]);

  const handleReset = () => {
    setMoveDate('');
    setHoveredDate('');
    setSelectedMonth(('Next 30 Days'));
    setFilteredData(filteredBookingsData); // Reset to all data
  };
 
  return (
    <div
      style={{
        height: '100vh',
        width: '100%',
        margin: 0,
        padding: '15px',
        alignItems: 'center',
        position: 'relative',
      }}
    >
      {/* <div className="month-filter">
        <MonthSelector
          selectedMonth={selectedMonth}
          setSelectedMonth={setSelectedMonth}
        />
      </div> */}
      <div className="movedate">
        <button className="reset-button" onClick={handleReset}>
          <FaHome size={20} />
        </button>
        <p>Select Date </p>
        <div className="axsdc">
          <div className='asdf'>
            <MonthSelector
              selectedMonth={selectedMonth}
              setSelectedMonth={setSelectedMonth}
            />
            <DateSlider
              moveDate={moveDate}
              setMoveDate={setMoveDate}
              setHoveredDate={setHoveredDate}
              selectedMonth={selectedMonth}
            />
          </div>
        </div>
      </div>
      <div id="map" style={{ height: '100%', width: '95%' }} />
    </div>
  );
};

export default MapComponent;


// const MapComponent = ({ filteredBookingsData, onMarkerClick }) => {
//   const mapRef = useRef(null);
//   const markersRef = useRef([]);
//   const polylinesRef = useRef([]);
//   const [moveDate, setMoveDate] = useState('');
//   const [hoveredDate, setHoveredDate] = useState('');
//   const [filteredData, setFilteredData] = useState(filteredBookingsData);
//   // const [selectedMonth, setSelectedMonth] = useState(moment().format('YYYY-MM'));
//   const [selectedMonth, setSelectedMonth] = useState("Next 30 Days");

//   useEffect(() => {
//     const loadGoogleMapsScript = () => {
//       if (window.google && window.google.maps) {
//         return Promise.resolve();
//       }

//       return new Promise((resolve) => {
//         const existingScript = document.querySelector(`script[src*="maps.googleapis.com/maps/api/js"]`);
//         if (existingScript) {
//           existingScript.onload = resolve;
//           return;
//         }

//         const script = document.createElement('script');
//         script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyAMzUwrsAzd70QdSlQzq6kvTo2xP-czmCs&libraries=places`;
//         script.async = true;
//         script.onload = resolve;
//         document.body.appendChild(script);
//       });
//     };

//     loadGoogleMapsScript().then(() => {
//       if (!mapRef.current) {
//         const mapElement = document.getElementById('map');
//         if (!mapElement) {
//           console.error('Map element not found');
//           return;
//         }

//         mapRef.current = new window.google.maps.Map(mapElement, {
//           center: { lat: 44.381941192408064, lng: -80.22807949999998 },
//           zoom: 4,
//         });
//       }
//     });

//     return () => {
//       if (mapRef.current) {
//         mapRef.current = null;
//       }
//     };
//   }, []);

//   const clearMarkersAndPolylines = () => {
//     markersRef.current.forEach((marker) => {
//       if (marker) {
//         marker.setMap(null);
//       }
//     });
//     markersRef.current = [];

//     polylinesRef.current.forEach((polyline) => {
//       if (polyline) {
//         polyline.setMap(null);
//       }
//     });
//     polylinesRef.current = [];
//   };

//   const createMarker = (position, iconUrl, tooltipContent, rowIndex, highlight = false) => {
//     if (!window.google || !window.google.maps) {
//       console.error('Google Maps is not loaded yet.');
//       return;
//     }
  
//     const marker = new window.google.maps.Marker({
//       position,
//       map: mapRef.current,
//       icon: {
//         url: iconUrl,
//         scaledSize: new window.google.maps.Size(25, 41),
//       },
//       animation: highlight ? window.google.maps.Animation.BOUNCE : null,
//     });
  
//     const infoWindow = new window.google.maps.InfoWindow({
//       content: tooltipContent,
//     });
  
//     marker.addListener('mouseover', () => {
//       infoWindow.open({
//         anchor: marker,
//         map: mapRef.current,
//         shouldFocus: false,
//       });
//     });
  
//     marker.addListener('mouseout', () => {
//       infoWindow.close();
//     });
  
//     marker.addListener('click', () => {
//       if (typeof onMarkerClick === 'function') {
//         // Pass the row_index to the onMarkerClick function
//         onMarkerClick(rowIndex);
//       } else {
//         console.error('onMarkerClick is not defined or not a function');
//       }
//     });
  
//     return marker;
//   };

//   const createPolyline = (path, originCoords, destCoords, highlight = false) => {
//     if (!window.google || !window.google.maps) {
//       console.error('Google Maps is not loaded yet.');
//       return;
//     }

//     const polyline = new window.google.maps.Polyline({
//       path,
//       geodesic: true,
//       strokeColor: highlight ? 'red' : 'black',
//       strokeOpacity: 1.0,
//       strokeWeight: 1,
//       map: mapRef.current,
//     });

//     polyline.addListener('click', () => {
//       const url = `https://www.google.com/maps/dir/?api=1&origin=${originCoords[0]},${originCoords[1]}&destination=${destCoords[0]},${destCoords[1]}`;
//       window.open(url, '_blank');
//     });

//     return polyline;
//   };

//   useEffect(() => {
//     const filterDataByDate = () => {
//       let data = filteredBookingsData;
  
//       if (moveDate) {
//         data = data.filter(item => {
//           const possibleFormats = [moment.ISO_8601, 'DD/MM/YYYY', 'DD-MM-YYYY', 'D-MM-YYYY', 'DD MMM, YYYY', 'D MMM, YYYY'];
//           const itemDate = moment(item.MoveDate, possibleFormats, true);
//           return itemDate.isValid() && itemDate.format('YYYY-MM-DD') === moveDate;
//         });
//       }
  
//       console.log("Filtered data based on moveDate:", data); // Debugging line
//       setFilteredData(data);
//     };
  
//     filterDataByDate();
//   }, [filteredBookingsData, moveDate]); 

//   const updateMarkersAndPolylines = () => {
//     clearMarkersAndPolylines();

//     filteredData.forEach((item) => {
//       const possibleFormats = [moment.ISO_8601, 'DD/MM/YYYY', 'DD-MM-YYYY', 'D-MM-YYYY', 'DD MMM, YYYY', 'D MMM, YYYY'];
//       const moveDateMoment = moment(item.MoveDate, possibleFormats, true);

//       if (!moveDateMoment.isValid()) {
//         console.error('Invalid date format:', item.MoveDate);
//         return;
//       }

//       const isHighlighted = hoveredDate && moveDateMoment.format('YYYY-MM-DD') === hoveredDate;

//       const originCoords = item.Coordinates_Origin ? item.Coordinates_Origin.split(',').map(coord => parseFloat(coord.trim())) : [];
//       const destCoords = item.Coordinates_Destn ? item.Coordinates_Destn.split(',').map(coord => parseFloat(coord.trim())) : [];

//       if (originCoords.length === 2 && destCoords.length === 2 && !isNaN(originCoords[0]) && !isNaN(originCoords[1]) && !isNaN(destCoords[0]) && !isNaN(destCoords[1])) {
//         const originMarker = createMarker(
//           { lat: originCoords[0], lng: originCoords[1] },
//           'https://cdn-icons-png.flaticon.com/128/11057/11057342.png',
//           `
//             <b>Customer Name:</b> ${item.Customer_Name}<br>
//             <b>Move Date:</b> ${moveDateMoment.format('YYYY-MM-DD')}<br>
//             <b>Move From:</b> ${item.Move_From}<br>
//             <b>Move To:</b> ${item.Move_To}<br>
//             <b>Move Size:</b> ${item.Move_Size}
//           `,
//           item.row_index, 
//           isHighlighted
//         );

//         const destinationMarker = createMarker(
//           { lat: destCoords[0], lng: destCoords[1] },
//           'https://cdn-icons-png.flaticon.com/128/10124/10124136.png',
//           `
//             <b>Customer Name:</b> ${item.Customer_Name}<br>
//             <b>Move Date:</b> ${moveDateMoment.format('YYYY-MM-DD')}<br>
//             <b>Move From:</b> ${item.Move_From}<br>
//             <b>Move To:</b> ${item.Move_To}<br>
//             <b>Move Size:</b> ${item.Move_Size}
//           `,
//           item.row_index, 
//           isHighlighted
//         );

//         const path = [
//           { lat: originCoords[0], lng: originCoords[1] },
//           { lat: destCoords[0], lng: destCoords[1] },
//         ];

//         const polyline = createPolyline(path, originCoords, destCoords, isHighlighted);
//         polylinesRef.current.push(polyline);

//         markersRef.current.push(originMarker);
//         markersRef.current.push(destinationMarker);
//       } else {
//         console.error('Invalid coordinates:', { originCoords, destCoords, item });
//       }
//     });
//   };

//   useEffect(() => {
//     updateMarkersAndPolylines();
//   }, [filteredData, hoveredDate]);

//   useEffect(() => {
//     const filterDataByDate = () => {
//       let data = filteredBookingsData;

//       if (moveDate) {
//         data = data.filter(item => {
//           const possibleFormats = [moment.ISO_8601, 'DD/MM/YYYY', 'DD-MM-YYYY', 'D-MM-YYYY'];
//           const itemDate = moment(item.MoveDate, possibleFormats, true);
//           return itemDate.isValid() && itemDate.format('YYYY-MM-DD') === moveDate;
//         });
//       }

//       setFilteredData(data);
//     };

//     filterDataByDate();
//   }, [filteredBookingsData, moveDate]);

//   const handleReset = () => {
//     setMoveDate('');
//     setHoveredDate('');
//     setSelectedMonth(moment().format('YYYY-MM'));
//   };

//   return (
//     <div style={{ height: '100vh', width: '100%', margin: 0, padding: '15px', alignItems: 'center', position: 'relative' }}>
//       <div className="month-filter">
//         <MonthSelector selectedMonth={selectedMonth} setSelectedMonth={setSelectedMonth} />
//       </div>
//       <div className='movedate'>
//         <button className='reset-button' onClick={handleReset}>
//           <FaHome size={20} />
//         </button>
//         <p>Select Date :</p>
//         <div className='axsdc'>
//           <DateSlider
//             moveDate={moveDate}
//             setMoveDate={setMoveDate}
//             setHoveredDate={setHoveredDate}
//             selectedMonth={selectedMonth}
//           />
//         </div>
//       </div>
//       <div id="map" style={{ height: '100%', width: '95%' }} />
//     </div>
//   );
// };

// export default MapComponent;

