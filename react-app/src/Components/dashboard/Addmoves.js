import { React, useEffect, useState } from 'react';
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import axios from 'axios';
import Select from 'react-select';
import CreatableSelect from 'react-select/creatable';
// import { useUserContext } from './UserContext';
const Addmoves = () => {
  const [assignedToOptions, setAssignedToOptions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [dispatchAgents, setDispatchAgents] = useState([]);
  // const userFirstName  = userDetails.mailid.toLowerCase(); 
  const [statusOptions, setStatusOptions] = useState([]);
  const [MoveOptions, setMoveOptions] = useState([]);
  const [MoveSizeOption, setMoveSizeOption] = useState([]);
  const [ProvinceOption, setProvinceOption] = useState([]);
  const [inputValue1, setInputValue1] = useState('');
  const [inputValue2, setInputValue2] = useState('');
  const [existingInvoices, setExistingInvoices] = useState([]); 
  const [isDuplicateInvoice, setIsDuplicateInvoice] = useState(false);
  const [isOtherSelected, setIsOtherSelected] = useState(false);
  const [From_Address_Line, setFromAddressLine] = useState('');
  const [From_Zip_Code, setFromZipCode] = useState('');
  const [From_City, setFromCity] = useState('');
  const [From_Province, setFromProvince] = useState('');
  const [To_Address_Line, setToAddressLine] = useState('');
  const [To_Zip_Code, setToZipCode] = useState('');
  const [To_City, setToCity] = useState('');
  const [To_Province, setToProvince] = useState('');
  const cityStatePattern = /^[A-Za-z\s]+,\s*[A-Z/a-z]{2}$/;

const isValidCityStateFormat = (inputValue) => cityStatePattern.test(inputValue.trim());
  const [errors, setErrors] = useState({
    From_City: false,
    From_Province: false,
    To_City: false,
    To_Province: false,
  });
  const [formData, setFormData] = useState({
    Sales_Agent: '',
    Dispatch_Agent: '',
    Estimate_Amount_$: '',
    Move_Size: '',
    Customer_Name: '',
    MoveDate: '',
    INVOICE: '',
    Invoicelink: '',
    severity: '',
    Connection_Type: '',
    Estimate_No: '',
    Move_From: '',
    Move_To: '',
    From_Address: '',
    To_Address: '',
    Banner: '',
    Booked_Date: '',
    Status: 'Booked Moves',
    Assigned_To: '',
    Coordinates_Origin: '',
    Coordinates_Destn: ''
  });

  useEffect(() => {
    const fetchAssignedToOptions = async () => {
      try {
        const response = await axios.get('http://localhost:9000/zoho-data/Assigned-To-Name');
        if (response.data && response.data.records) {
          const names = response.data.records.map(record => record.Assigned_To_Names);
          const Dispatch = response.data.records.map(record => record.Dispatch_Agent);
          const Status = response.data.records.map(record => record.Status_Assigned);
          const Move = response.data.records.map(record => record.Move_FromMove_To);
          const MoveSize = response.data.records.map(record => record.MoveSize);
          const Province = response.data.records.map(record => record.Province);
          setAssignedToOptions(names);
          setDispatchAgents(Dispatch);
          setStatusOptions(Status);
          setMoveOptions(Move);
          setMoveSizeOption(MoveSize);
          setProvinceOption(Province);

        } else {
          console.log('No records found in response');
          setAssignedToOptions([]);
          setDispatchAgents([]);
          setStatusOptions([]);
          setMoveOptions([]);
          setMoveSizeOption([]);
          setProvinceOption([]);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        setAssignedToOptions([]);
        setDispatchAgents([]);
        setStatusOptions([]);
        setMoveOptions([]);
        setMoveSizeOption([]);
        setProvinceOption([]);
      }
    };

    fetchAssignedToOptions();
  }, []);

  useEffect(() => {
    const fetchAssignedOptions = async () => {
      try {
        const response = await axios.get('http://localhost:9000/zoho-data');
        console.log("Full response:", response.data);
        if (response.data && response.data.dataRows && Array.isArray(response.data.dataRows)) {
          const invoices = response.data.dataRows.map(row => row.INVOICE.toLowerCase()); 
          setExistingInvoices(invoices); 
          console.log("Fetched invoices: ", invoices);
        } else {
          console.log('No records found in response or dataRows is not an array');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    fetchAssignedOptions();
  }, []);
  
  
  const handleInvoiceChange = (e) => {
    const { value } = e.target;
    setFormData({ ...formData, INVOICE: value });
    const normalizedInvoice = value.toLowerCase();
    const isDuplicate = existingInvoices.includes(normalizedInvoice);
    setIsDuplicateInvoice(isDuplicate);
    console.log("Invoice entered:", value, "Is duplicate:", isDuplicate);
  };
  const handleSubmit = async () => {
    setIsLoading(true);
    const requiredFields = [
      { name: 'Sales_Agent', label: 'Sales Agent' },
      { name: 'Dispatch_Agent', label: 'Dispatch Agent' },
      { name: 'Move_Size', label: 'Move Size' },
      { name: 'Customer_Name', label: 'Customer Name' },
      { name: 'MoveDate', label: 'Move Date' },
      { name: 'INVOICE', label: 'Invoice No' },
      { name: 'Invoicelink', label: 'Invoice Link' },
      { name: 'Connection_Type', label: 'Connection Type' },
      { name: 'Estimate_No', label: 'Estimate No' },
      { name: 'Move_From', label: 'Move From' },
      { name: 'Move_To', label: 'Move To' },
      { name: 'Banner', label: 'Banner' },
      { name: 'Booked_Date', label: 'Booked Date' },
      { name: 'Status', label: 'Status' },
      { name: 'Assigned_To', label: 'Assigned To' },
      { name: 'From_City', label: 'From City' },
      { name: 'From_Province', label: 'From Province' },
      { name: 'To_City', label: 'To City' },
      { name: 'To_Province', label: 'To Province' },
      { name: 'Estimate_Amount_$', label: 'Estimate Amount ' }
    ];
  
    let isValid = true;
    let missingFields = [];

    requiredFields.forEach(field => {
      if (field.name === 'From_City' && !From_City) {
        isValid = false;
        missingFields.push(field.label);
      }
      if (field.name === 'From_Province' && !From_Province) {
        isValid = false;
        missingFields.push(field.label);
      }
      if (field.name === 'To_City' && !To_City) {
        isValid = false;
        missingFields.push(field.label);
      }
      if (field.name === 'To_Province' && !To_Province) {
        isValid = false;
        missingFields.push(field.label);
      }
      if (['Sales_Agent', 'Dispatch_Agent', 'Move_Size', 'Customer_Name', 'MoveDate', 'INVOICE', 'Invoicelink', 'Connection_Type', 'Estimate_No', 'Move_From', 'Move_To', 'Banner', 'Booked_Date', 'Status', 'Assigned_To'].includes(field.name)) {
        if (!formData[field.name]) {
          isValid = false;
          missingFields.push(field.label);
        }
      }
    });

    const normalizedInvoice = formData.INVOICE.toLowerCase().trim();
    const isDuplicate = existingInvoices.includes(normalizedInvoice);

    if (isDuplicate) {
      alert("The invoice number already exists. Please enter a unique invoice number.");
      setIsLoading(false);
      return;
    }

    if (!isValid) {
      const newErrors = {
        From_City: !From_City,
        From_Province: !From_Province,
        To_City: !To_City,
        To_Province: !To_Province,
      };
      setErrors(newErrors);
      alert(`Please fill in the following required fields: ${missingFields.join(', ')}`);
      setIsLoading(false);
      return;
    } else {
      setErrors({
        From_City: false,
        From_Province: false,
        To_City: false,
        To_Province: false,
        // Reset other errors if needed
      });
    }
  
    const From_Address = `${From_Address_Line}, ${From_City}, ${From_Province}, ${From_Zip_Code}`;
    const To_Address = `${To_Address_Line}, ${To_City}, ${To_Province}, ${To_Zip_Code}`;
  
    const updatedFormData = {
      ...formData,
      From_Address,
      To_Address,
      Coordinates_Origin: '', 
      Coordinates_Destn: ''
    };
  
    try {
      // Fetch coordinates for From_Address and To_Address asynchronously
      const [fromAddressCoords, toAddressCoords] = await Promise.all([
        fetchCoordinates(From_Address),
        fetchCoordinates(To_Address)
      ]);
  
      updatedFormData.Coordinates_Origin = fromAddressCoords ? `${fromAddressCoords.lat},${fromAddressCoords.lng}` : '';
      updatedFormData.Coordinates_Destn = toAddressCoords ? `${toAddressCoords.lat},${toAddressCoords.lng}` : '';
      console.log('Updated FormData with Coordinates:', updatedFormData);
      const response = await fetch('http://localhost:9000/zoho-data/add-row', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify([updatedFormData])
      });
  
      if (response.ok) {
        alert("Add Moves saved successfully!");
        window.location.reload();
      } else {
        alert("Failed to save Add Moves. Please try again.");
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
 };
  
  const fetchApiKey = async () => {
    try {
      const response = await axios.get('http://localhost:9000/api/get-google-api-key');
      return response.data.apiKey;
    } catch (error) {
      console.error("Failed to fetch API key:", error);
      return null;
    }
  };

  const fetchCoordinates = async (address) => {
    const apiKey = await fetchApiKey();
    if (!apiKey) {
      console.error("API key is not available.");
      return null;
    }

    try {
      const response = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json`, {
        params: {
          address: address,
          key: apiKey
        }
      });

      if (response.data.status === "OK") {
        const location = response.data.results[0].geometry.location;
        return { lat: location.lat, lng: location.lng };
      } else {
        console.error("Geocoding API error: ", response.data.status);
        return null;
      }
    } catch (error) {
      console.error("Error fetching coordinates:", error);
      return null;
    }
  };

  const handleDateChange = (date) => {
    if (date) {
      const localDate = new Date(date);
      localDate.setHours(12, 0, 0, 0);
      const formattedDate = localDate.toISOString().split('T')[0];
      setFormData({ ...formData, MoveDate: formattedDate });
    } else {
      setFormData({ ...formData, MoveDate: '' });
    }
  };

  const handleDateChange1 = (date) => {
    if (date) {
      const localDate = new Date(date);
      localDate.setHours(12, 0, 0, 0);
      const formattedDate = localDate.toISOString().split('T')[0];
      setFormData({ ...formData, Booked_Date: formattedDate });
    } else {
      setFormData({ ...formData, Booked_Date: '' });
    }
  };
  const handleInputChange2 = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const options = assignedToOptions
  .filter(option => option && option.trim() !== '')
  .map(option => ({ label: option, value: option }));

  const options2 = statusOptions
  .filter(option => option && option.trim() !== '')
  .map(option => ({ label: option, value: option }));

  const options3 = dispatchAgents
  .filter(option => option && option.trim() !== '')
  .map(option => ({ label: option, value: option }));

  const options5 = ProvinceOption
  .filter(option => option && option.trim() !== '')
  .map(option => ({ label: option, value: option }));

  const options4 = [
    ...MoveSizeOption
      .filter(option => option && option.trim() !== '')
      .map(option => ({ label: option, value: option })),
    { label: 'Other', value: 'Other' } 
  ];
  const finalMoveSize = formData.Move_Size === 'Other' ? formData.Move_Size_Custom : formData.Move_Size;


    const options1 = MoveOptions
    .filter(option => option && option.trim() !== '')
    .map(option => ({ label: option, value: option }))
    ;
    const filteredOptions1 = options1.filter(option =>
      option.label.toLowerCase().startsWith(inputValue1.toLowerCase())
    );
    const filteredOptions2 = options1.filter(option =>
      option.label.toLowerCase().startsWith(inputValue2.toLowerCase())
    );

    
  return (
    <div>
      <div className="header-my">
        <h1>Add Moves</h1>
      </div>
      <div className="team-details-my details-content1">
        <div>
          <label>Sales Agent</label>
          <input type="text" name="Sales_Agent" value={formData.Sales_Agent} onChange={handleInputChange2} />
        </div>
        <div>
          <label>Customer Name</label>
          <input type="text" name="Customer_Name" value={formData.Customer_Name} onChange={handleInputChange2} />
        </div>

      <div>
          <label>Move Size</label>
          <Select
            name="Move_Size"
            value={
              formData.Move_Size && options4.some(option => option.value === formData.Move_Size)
                ? options4.find(option => option.value === formData.Move_Size)
                : isOtherSelected
                ? { label: 'Other', value: 'Other' } 
                : { label: formData.Move_Size, value: formData.Move_Size }
            }
            onChange={(selectedOption) => {
              if (selectedOption?.value === 'Other') {
                setFormData(prevState => ({
                  ...prevState,
                  Move_Size: '' 
                }));
                setIsOtherSelected(true);
              } else {
                handleInputChange2({
                  target: { name: 'Move_Size', value: selectedOption?.value }
                });
                setIsOtherSelected(false); 
              }
            }}
            options={options4}
            placeholder="Move Size"
            isClearable
          />
          {isOtherSelected && (
            <input
              type="text"
              name="Move_Size"
              value={formData.Move_Size}
              onChange={(e) => {
                handleInputChange2(e);
              }}
              placeholder="Enter custom move size"
            />
          )}
        </div>
        <div>
          <label>Banner</label>
          <input type="text" name="Banner" value={formData.Banner} onChange={handleInputChange2} />
        </div>

        <div>
          <label>Move Date</label>
          <DatePicker
            selected={formData.MoveDate ? new Date(formData.MoveDate) : null}
            onChange={handleDateChange}
            dateFormat="dd/MM/yyyy"
          />
        </div>
        <div>
          <label>Booked Date</label>
          <DatePicker
            selected={formData.Booked_Date ? new Date(formData.Booked_Date) : null}
            onChange={handleDateChange1}
            dateFormat="dd/MM/yyyy"
          />
        </div>
        <div>
          <label>Invoice No </label>
          <input
            type="text"
            name="INVOICE"
            value={formData.INVOICE}
            onChange={handleInvoiceChange}
            style={{ borderColor: isDuplicateInvoice ? 'red' : '' }} 
            required
          />
          {isDuplicateInvoice && <p style={{ color: 'red' }}>This invoice number already exists!</p>}
          {errors.INVOICE && !isDuplicateInvoice && <p style={{ color: 'red' }}>Invoice No is required.</p>}
        </div>
        <div>
          <label>Invoice Link</label>
          <input type="text" name="Invoicelink" value={formData.Invoicelink} onChange={handleInputChange2} placeholder="Example:  ed3c5eb1-abcd-418d-af53-520c51e91d8b"/>
        </div>
        <div>
          <label>Estimate No</label>
          <input type="text" name="Estimate_No" value={formData.Estimate_No} onChange={handleInputChange2} />
        </div>
        <div>
          <label>Estimate Amount</label>
          <input
            type="text"
            name="Estimate_Amount_$"
            value={formData.Estimate_Amount_$ ? `CA$ ${formData.Estimate_Amount_$}` : ''}
            onChange={(e) => handleInputChange2({
              target: {
                name: 'Estimate_Amount_$',
                value: e.target.value.replace(/[^0-9.]/g, '')
              }
            })}
          />
        </div>
        <div>
          <label>Severity</label>
          <input type="text" name="severity" value={formData.severity} onChange={handleInputChange2} />
        </div>
        <div>
          <label>Connection Type</label>
          <input type="text" name="Connection_Type" value={formData.Connection_Type} onChange={handleInputChange2} />
        </div>
        <div>
          {!isValidCityStateFormat(inputValue1) && inputValue1.trim() !== '' && (
              <p style={{ color: 'red' }}>Please enter a valid location in the format: "City, XX"</p>
            )}
          <label>Move From</label>
          <CreatableSelect
            name="Move_From"
            value={options1.find(option => option.value === formData.Move_From) || { label: formData.Move_From, value: formData.Move_From }}
            onChange={(selectedOption) => handleInputChange2({
              target: { name: 'Move_From', value: selectedOption?.value }
            })}
            options={filteredOptions1}
            inputValue={inputValue1}
            onInputChange={(value) => setInputValue1(value)}
            menuIsOpen={inputValue1.length > 0}
            placeholder="Example: Georgetown, ON"
            isClearable
            isValidNewOption={(inputValue) => inputValue.trim() !== '' && isValidCityStateFormat(inputValue)}
            formatCreateLabel={(inputValue) => isValidCityStateFormat(inputValue) ? `Create "${inputValue}"` : 'Invalid format, use "City, XX"'}
          />
        </div>
        <div>
          <label>Move To</label>
          <CreatableSelect
            name="Move_To"
            value={options1.find(option => option.value === formData.Move_To) || { label: formData.Move_To, value: formData.Move_To }} // Support for custom input
            onChange={(selectedOption) => handleInputChange2({
              target: { name: 'Move_To', value: selectedOption?.value }
            })}
            options={filteredOptions2}
            inputValue={inputValue2} 
            onInputChange={(value) => setInputValue2(value)} 
            menuIsOpen={inputValue2.length > 0} 
            placeholder="Example: Georgetown, ON"
            isClearable
            isValidNewOption={(inputValue) => inputValue.trim() !== ''} // Ensure only non-empty values
          />
        </div>
        <div>
        <label>From Address</label>
        <div style={{ paddingLeft: '5px', marginBottom: '10px' }}>
          <div>
            <input
              type="text"
              name="From_Address_Line"
              value={From_Address_Line}
              onChange={(e) => setFromAddressLine(e.target.value)}
              placeholder="Address Line"
              style={{ marginBottom: '5px', width: '100%' }}
            />
          </div>
          <div>
            <input
              type="text"
              name="From_Zip_Code"
              value={From_Zip_Code}
              onChange={(e) => setFromZipCode(e.target.value)}
              placeholder="Zip Code"
              style={{ marginBottom: '5px', width: '100%' }}
            />
          </div>
          <div>
            <input
              type="text"
              name="From_City"
              value={From_City}
              onChange={(e) => setFromCity(e.target.value)}
              placeholder="City"
              style={{ marginBottom: '5px', width: '100%' }}
            />
          </div>
          <div>
            <input
              type="text"
              name="From_Province"
              value={From_Province}
              onChange={(e) => setFromProvince(e.target.value)}
              placeholder="Province"
              style={{ marginBottom: '5px', width: '100%' }}
            />
          </div>
        </div>
      </div>
      <div>
        <label>To Address</label>
        <div style={{ paddingLeft: '5px', marginBottom: '10px' }}>
          <div>
            <input
              type="text"
              name="To_Address_Line"
              value={To_Address_Line}
              onChange={(e) => setToAddressLine(e.target.value)}
              placeholder="Address Line"
              style={{ marginBottom: '5px', width: '100%' }}
            />
          </div>
          <div>
            <input
              type="text"
              name="To_Zip_Code"
              value={To_Zip_Code}
              onChange={(e) => setToZipCode(e.target.value)}
              placeholder="Zip Code"
              style={{ marginBottom: '5px', width: '100%' }}
            />
          </div>
          <div>
            <input
              type="text"
              name="To_City"
              value={To_City}
              onChange={(e) => setToCity(e.target.value)}
              placeholder="City"
              style={{ marginBottom: '5px', width: '100%' }}
            />
          </div>
          <div>
            <input
              type="text"
              name="To_Province"
              value={To_Province}
              onChange={(e) => setToProvince(e.target.value)}
              placeholder="Province"
              style={{ marginBottom: '5px', width: '100%' }}
            />
          </div>
        </div>
      </div>
      {/* <div>
          <label>Banner</label>
          <input type="text" name="Banner" value={formData.Banner} onChange={handleInputChange2} />
        </div>
        <div>
          <label>Booked Date</label>
          <DatePicker
            selected={formData.Booked_Date ? new Date(formData.Booked_Date) : null}
            onChange={handleDateChange1}
            dateFormat="dd/MM/yyyy"
          />
        </div> */}
        <div>
          <label>Assigned To</label>
            <Select
              name="Assigned_To"
              value={options.find(option => option.value === formData.Assigned_To)} 
              onChange={(selectedOption) => handleInputChange2({
                target: { name: 'Assigned_To', value: selectedOption?.value }
              })}
              options={options} 
              placeholder="Assigned To"
              isClearable 
            />
        </div>
          <div>
          <label>Status</label>
            <Select
              name="Status"
              value={options2.find(option => option.value === formData.Status)} 
              onChange={(selectedOption) => handleInputChange2({
                target: { name: 'Status', value: selectedOption?.value }
              })}
              options={options2} 
              isClearable 
            />
        </div>
        <div>
          <label>Dispatch Agent</label>
            <Select
              name="Dispatch_Agent"
              value={options3.find(option => option.value === formData.Dispatch_Agent)} 
              onChange={(selectedOption) => handleInputChange2({
                target: { name: 'Dispatch_Agent', value: selectedOption?.value }
              })}
              options={options3} 
              placeholder="Dispatch Agent"
              isClearable 
            />
        </div>
        </div>
        <div>
        <button type="button" onClick={handleSubmit} disabled={isLoading}>
          {isLoading ? 'Saving...' : 'Create Job'}
        </button>
      </div>
    </div>
  );
};

export default Addmoves;



// const Addmoves = () => {
//   const [assignedToOptions, setAssignedToOptions] = useState([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const [dispatchAgents, setDispatchAgents] = useState([]);
//   const [statusOptions, setStatusOptions] = useState([]);
//   const [MoveOptions, setMoveOptions] = useState([]);
//   const [MoveSizeOption, setMoveSizeOption] = useState([]);
//   const [inputValue1, setInputValue1] = useState('');
//   const [inputValue2, setInputValue2] = useState('');
//   const [isOtherSelected, setIsOtherSelected] = useState(false);
//   const [existingInvoices, setExistingInvoices] = useState([]); 
//   const [isDuplicateInvoice, setIsDuplicateInvoice] = useState(false);
//   const [From_Address_Line, setFromAddressLine] = useState('');
//   const [From_Zip_Code, setFromZipCode] = useState('');
//   const [From_City, setFromCity] = useState('');
//   const [From_Province, setFromProvince] = useState('');
//   const [To_Address_Line, setToAddressLine] = useState('');
//   const [To_Zip_Code, setToZipCode] = useState('');
//   const [To_City, setToCity] = useState('');
//   const [To_Province, setToProvince] = useState('');

//   const [formData, setFormData] = useState({
//     Sales_Agent: '',
//     Dispatch_Agent: '',
//     Move_Size: '',
//     Customer_Name: '',
//     MoveDate: '',
//     INVOICE: '',
//     Invoicelink: '',
//     severity: '',
//     Connection_Type: '',
//     Estimate_No: '',
//     Move_From: '',
//     Move_To: '',
//     From_Address: '',
//     To_Address: '',
//     Banner: '',
//     Booked_Date: '',
//     Status: 'Booked Moves',
//     Assigned_To: '',
//     Coordinates_Origin: '',
//     Coordinates_Destn: ''
//   });

//   useEffect(() => {
//     const fetchAssignedToOptions = async () => {
//       try {
//         const response = await axios.get('http://localhost:9000/zoho-data/Assigned-To-Name');
//         if (response.data && response.data.records) {
//           const names = response.data.records.map(record => record.Assigned_To_Names);
//           const Dispatch = response.data.records.map(record => record.Dispatch_Agent);
//           const Status = response.data.records.map(record => record.Status_Assigned);
//           const Move = response.data.records.map(record => record.Move_FromMove_To);
//           const MoveSize = response.data.records.map(record => record.MoveSize);
//           setAssignedToOptions(names);
//           setDispatchAgents(Dispatch);
//           setStatusOptions(Status);
//           setMoveOptions(Move);
//           setMoveSizeOption(MoveSize);

//         } else {
//           console.log('No records found in response');
//           setAssignedToOptions([]);
//           setDispatchAgents([]);
//           setStatusOptions([]);
//           setMoveOptions([]);
//           setMoveSizeOption([]);
//         }
//       } catch (error) {
//         console.error('Error fetching data:', error);
//         setAssignedToOptions([]);
//         setDispatchAgents([]);
//         setStatusOptions([]);
//         setMoveOptions([]);
//         setMoveSizeOption([]);
//       }
//     };

//     fetchAssignedToOptions();
//   }, []);

//   useEffect(() => {
//     const fetchAssignedOptions = async () => {
//       try {
//         const response = await axios.get('http://localhost:9000/zoho-data');
//         console.log("Full response:", response.data);
//         if (response.data && response.data.dataRows && Array.isArray(response.data.dataRows)) {
//           const invoices = response.data.dataRows.map(row => row.INVOICE.toLowerCase()); 
//           setExistingInvoices(invoices); 
//           console.log("Fetched invoices: ", invoices);
//         } else {
//           console.log('No records found in response or dataRows is not an array');
//         }
//       } catch (error) {
//         console.error('Error fetching data:', error);
//       }
//     };
  
//     fetchAssignedOptions();
//   }, []);
  
  
//   const handleInvoiceChange = (e) => {
//     const { value } = e.target;
//     setFormData({ ...formData, INVOICE: value });
//     const normalizedInvoice = value.toLowerCase();
//     const isDuplicate = existingInvoices.includes(normalizedInvoice);
//     setIsDuplicateInvoice(isDuplicate);
//     console.log("Invoice entered:", value, "Is duplicate:", isDuplicate);
//   };
  
 
//   const handleSubmit = async () => {
//     setIsLoading(true);
  
//     const requiredFields = [
//       { name: 'Sales_Agent', label: 'Sales Agent' },
//       { name: 'Dispatch_Agent', label: 'Dispatch Agent' },
//       { name: 'Move_Size', label: 'Move Size' },
//       { name: 'Customer_Name', label: 'Customer_Name' },
//       { name: 'MoveDate', label: 'Move Date' },
//       { name: 'INVOICE', label: 'Invoice No' },
//       { name: 'Invoicelink', label: 'Invoice Link' },
//       { name: 'Connection_Type', label: 'Connection Type' },
//       { name: 'Estimate_No', label: 'Estimate No' },
//       { name: 'Move_From', label: 'Move From' },
//       { name: 'Move_To', label: 'Move To' },
//       // { name: 'From_Address', label: 'From Address' },
//       // { name: 'To_Address', label: 'To Address' },
//       { name: 'Banner', label: 'Banner' },
//       { name: 'Booked_Date', label: 'Booked Date' },
//       { name: 'Status', label: 'Status' },
//       { name: 'Assigned_To', label: 'Assigned To' }
//     ];
  
//     let isValid = true;
//     let missingFields = [];
  
//     requiredFields.forEach(field => {
//       if (!formData[field.name]) {
//         isValid = false;
//         missingFields.push(field.label);
//       }
//     });
  
//     if (isDuplicateInvoice) {
//       alert("The invoice number already exists. Please enter a unique invoice number.");
//       setIsLoading(false);
//       return;
//     }
  
//     if (!isValid) {
//       alert(`Please fill in the following required fields: ${missingFields.join(', ')}`);
//       setIsLoading(false);
//       return;
//     }
  
//     const From_Address = `${From_Address_Line} ${From_City} ${From_Province} ${From_Zip_Code}`;
//     const To_Address = `${To_Address_Line} ${To_City} ${To_Province} ${To_Zip_Code}`;

//     const updatedFormData = {
//       ...formData,
//       From_Address,
//       To_Address,
//       Coordinates_Origin: '', 
//       Coordinates_Destn: ''
//     };
//     try {
//       const fromAddressCoords = await fetchCoordinates(From_Address); 
//       const toAddressCoords = await fetchCoordinates(To_Address);
  
//       updatedFormData.Coordinates_Origin = fromAddressCoords ? `${fromAddressCoords.lat},${fromAddressCoords.lng}` : '';
//       updatedFormData.Coordinates_Destn = toAddressCoords ? `${toAddressCoords.lat},${toAddressCoords.lng}` : '';
  
//       const response = await fetch('http://localhost:9000/zoho-data/add-row', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify([updatedFormData])
//       });
  
//       if (response.ok) {
//         alert("Add Moves saved successfully!");
//         window.location.reload();
//       } else {
//         alert("Failed to save Add Moves. Please try again.");
//       }
//     } catch (error) {
//       console.error('Error:', error);
//     } finally {
//       setIsLoading(false);
//     }
//   };


//   const fetchApiKey = async () => {
//     try {
//       const response = await axios.get('http://localhost:9000/api/get-google-api-key');
//       return response.data.apiKey;
//     } catch (error) {
//       console.error("Failed to fetch API key:", error);
//       return null;
//     }
//   };

//   const fetchCoordinates = async (address) => {
//     const apiKey = await fetchApiKey();
//     if (!apiKey) {
//       console.error("API key is not available.");
//       return null;
//     }

//     try {
//       const response = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json`, {
//         params: {
//           address: address,
//           key: apiKey
//         }
//       });

//       if (response.data.status === "OK") {
//         const location = response.data.results[0].geometry.location;
//         return { lat: location.lat, lng: location.lng };
//       } else {
//         console.error("Geocoding API error: ", response.data.status);
//         return null;
//       }
//     } catch (error) {
//       console.error("Error fetching coordinates:", error);
//       return null;
//     }
//   };

//   const handleDateChange = (date) => {
//     if (date) {
//       const localDate = new Date(date);
//       localDate.setHours(12, 0, 0, 0);
//       const formattedDate = localDate.toISOString().split('T')[0];
//       setFormData({ ...formData, MoveDate: formattedDate });
//     } else {
//       setFormData({ ...formData, MoveDate: '' });
//     }
//   };

//   const handleDateChange1 = (date) => {
//     if (date) {
//       const localDate = new Date(date);
//       localDate.setHours(12, 0, 0, 0);
//       const formattedDate = localDate.toISOString().split('T')[0];
//       setFormData({ ...formData, Booked_Date: formattedDate });
//     } else {
//       setFormData({ ...formData, Booked_Date: '' });
//     }
//   };
//   const handleInputChange2 = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };
//   const options = assignedToOptions
//   .filter(option => option && option.trim() !== '')
//   .map(option => ({ label: option, value: option }));

//   const options4 = [
//     ...MoveSizeOption
//       .filter(option => option && option.trim() !== '')
//       .map(option => ({ label: option, value: option })),
//     { label: 'Other', value: 'Other' } // Add 'Other' option
//   ];

//   const options2 = statusOptions
//   .filter(option => option && option.trim() !== '')
//   .map(option => ({ label: option, value: option }));

//   const options3 = dispatchAgents
//   .filter(option => option && option.trim() !== '')
//   .map(option => ({ label: option, value: option }));

//   return (
//     <div>
//       <div className="header-my">
//         <h1>Add Moves</h1>
//       </div>
//       <div className="team-details-my details-content1">
//           <div>
//             <label>Sales Agent</label>
//             <input type="text" name="Sales_Agent" value={formData.Sales_Agent} onChange={handleInputChange2} />
//           </div>
//           <div>
//           <label>Customer Name</label>
//           <input type="text" name="Customer_Name" value={formData.Customer_Name} onChange={handleInputChange2} />
//         </div>
//         <div>
//             <label>Move Size</label>
//             <Select
//               name="Move_Size"
//               value={
//                 formData.Move_Size && options4.some(option => option.value === formData.Move_Size)
//                   ? options4.find(option => option.value === formData.Move_Size)
//                   : isOtherSelected
//                   ? { label: 'Other', value: 'Other' } // Display "Other" when it's selected
//                   : { label: formData.Move_Size, value: formData.Move_Size }
//               }
//               onChange={(selectedOption) => {
//                 if (selectedOption?.value === 'Other') {
//                   setFormData(prevState => ({
//                     ...prevState,
//                     Move_Size: '' // Set it to an empty string initially for custom input
//                   }));
//                   setIsOtherSelected(true); // Set state to true when "Other" is selected
//                 } else {
//                   handleInputChange2({
//                     target: { name: 'Move_Size', value: selectedOption?.value }
//                   });
//                   setIsOtherSelected(false); // Reset state when another option is selected
//                 }
//               }}
//               options={options4}
//               placeholder="Move Size"
//               isClearable
//             />
//             {isOtherSelected && (
//               <input
//                 type="text"
//                 name="Move_Size"
//                 value={formData.Move_Size}
//                 onChange={(e) => {
//                   handleInputChange2(e);
//                 }}
//                 placeholder="Enter custom move size"
//               />
//             )}
//           </div>
//           <div>
//             <label>Move Date</label>
//             <DatePicker
//               selected={formData.MoveDate ? new Date(formData.MoveDate) : null}
//               onChange={handleDateChange}
//               dateFormat="dd/MM/yyyy"
//             />
//           </div>
//           <div>
//             <label>Invoice No</label>
//             <input
//               type="text"
//               name="INVOICE"
//               value={formData.INVOICE}
//               onChange={handleInvoiceChange}
//               style={{ borderColor: isDuplicateInvoice ? 'red' : ' ' }} 
//             />
//             {isDuplicateInvoice && <p style={{ color: 'red' }}>This invoice number already exists!</p>}
//           </div>
//           <div>
//             <label>Invoice Link</label>
//             <input type="text" name="Invoicelink" value={formData.Invoicelink} onChange={handleInputChange2} placeholder="Example:  ed3c5eb1-abcd-418d-af53-520c51e91d8b"/>
//           </div>
//           <div>
//             <label>Severity</label>
//             <input type="text" name="severity" value={formData.severity} onChange={handleInputChange2} />
//           </div>
//           <div>
//             <label>Connection Type</label>
//             <input type="text" name="Connection_Type" value={formData.Connection_Type} onChange={handleInputChange2} />
//           </div>
//           <div>
//             <label>Estimate No</label>
//             <input type="text" name="Estimate_No" value={formData.Estimate_No} onChange={handleInputChange2} />
//           </div>
//           <div>
//             <label>Banner</label>
//             <input type="text" name="Banner" value={formData.Banner} onChange={handleInputChange2} />
//           </div>
//           <div>
//             <label>Move From</label>
//             <Select
//               name="Move_From"
//               value={formData.Move_From ? { label: formData.Move_From, value: formData.Move_From } : null}
//               onChange={(selectedOption) => handleInputChange2({
//                 target: { name: 'Move_From', value: selectedOption?.value }
//               })}
//               options={MoveOptions
//                 .filter(option => option && option.trim() !== '') // Filter valid options
//                 .map(option => ({ label: option, value: option })) // Map to { label, value }
//                 .filter(option => option.label.toLowerCase().startsWith(inputValue1.toLowerCase())) // Filter based on input
//               }
//               inputValue={inputValue1}
//               onInputChange={(value) => setInputValue1(value)}
//               menuIsOpen={inputValue1.length > 0}
//               placeholder="Example: Georgetown, ON"
//               isClearable
//             />
//           </div>

//           <div>
//             <label>Move To</label>
//             <Select
//               name="Move_To"
//               value={formData.Move_To ? { label: formData.Move_To, value: formData.Move_To } : null}
//               onChange={(selectedOption) => handleInputChange2({
//                 target: { name: 'Move_To', value: selectedOption?.value }
//               })}
//               options={MoveOptions
//                 .filter(option => option && option.trim() !== '') // Filter valid options
//                 .map(option => ({ label: option, value: option })) // Map to { label, value }
//                 .filter(option => option.label.toLowerCase().startsWith(inputValue2.toLowerCase())) // Filter based on input
//               }
//               inputValue={inputValue2}
//               onInputChange={(value) => setInputValue2(value)}
//               menuIsOpen={inputValue2.length > 0}
//               placeholder="Example: Georgetown, ON"
//               isClearable
//             />
//           </div>
//           {/* <div>
//             <label>From Address</label>
//             <input type="text" name="From_Address" value={formData.From_Address} onChange={handleInputChange2} />
//           </div>
//           <div>
//             <label>To Address</label>
//             <input type="text" name="To_Address" value={formData.To_Address} onChange={handleInputChange2} />
//           </div> */}
//                   <div>
//         <label>From Address</label>
//         <div style={{ paddingLeft: '5px', marginBottom: '10px' }}>
//           <div>
//             <input
//               type="text"
//               name="From_Address_Line"
//               value={From_Address_Line}
//               onChange={(e) => setFromAddressLine(e.target.value)}
//               placeholder="Address Line"
//               style={{ marginBottom: '5px', width: '100%' }}
//             />
//           </div>
//           <div>
//             <input
//               type="text"
//               name="From_Zip_Code"
//               value={From_Zip_Code}
//               onChange={(e) => setFromZipCode(e.target.value)}
//               placeholder="Zip Code"
//               style={{ marginBottom: '5px', width: '100%' }}
//             />
//           </div>
//           <div>
//             <input
//               type="text"
//               name="From_City"
//               value={From_City}
//               onChange={(e) => setFromCity(e.target.value)}
//               placeholder="City"
//               style={{ marginBottom: '5px', width: '100%' }}
//             />
//           </div>
//           <div>
//             <input
//               type="text"
//               name="From_Province"
//               value={From_Province}
//               onChange={(e) => setFromProvince(e.target.value)}
//               placeholder="Province"
//               style={{ marginBottom: '5px', width: '100%' }}
//             />
//           </div>
//         </div>
//       </div>
//       <div>
//         <label>To Address</label>
//         <div style={{ paddingLeft: '5px', marginBottom: '10px' }}>
//           <div>
//             <input
//               type="text"
//               name="To_Address_Line"
//               value={To_Address_Line}
//               onChange={(e) => setToAddressLine(e.target.value)}
//               placeholder="Address Line"
//               style={{ marginBottom: '5px', width: '100%' }}
//             />
//           </div>
//           <div>
//             <input
//               type="text"
//               name="To_Zip_Code"
//               value={To_Zip_Code}
//               onChange={(e) => setToZipCode(e.target.value)}
//               placeholder="Zip Code"
//               style={{ marginBottom: '5px', width: '100%' }}
//             />
//           </div>
//           <div>
//             <input
//               type="text"
//               name="To_City"
//               value={To_City}
//               onChange={(e) => setToCity(e.target.value)}
//               placeholder="City"
//               style={{ marginBottom: '5px', width: '100%' }}
//             />
//           </div>
//           <div>
//             <input
//               type="text"
//               name="To_Province"
//               value={To_Province}
//               onChange={(e) => setToProvince(e.target.value)}
//               placeholder="Province"
//               style={{ marginBottom: '5px', width: '100%' }}
//             />
//           </div>
//         </div>
//       </div>
//           <div>
//             <label>Booked Date</label>
//             <DatePicker
//               selected={formData.Booked_Date ? new Date(formData.Booked_Date) : null}
//               onChange={handleDateChange1}
//               dateFormat="dd/MM/yyyy"
//             />
//           </div>
//           <div>
//           <label>Assigned To</label>
//             <Select
//               name="Assigned_To"
//               value={options.find(option => option.value === formData.Assigned_To)} 
//               onChange={(selectedOption) => handleInputChange2({
//                 target: { name: 'Assigned_To', value: selectedOption?.value }
//               })}
//               options={options} 
//               placeholder="Assigned To"
//               isClearable 
//             />
//         </div>
//         <div>
//           <label>Status</label>
//             <Select
//               name="Status"
//               value={options2.find(option => option.value === formData.Status)} 
//               onChange={(selectedOption) => handleInputChange2({
//                 target: { name: 'Status', value: selectedOption?.value }
//               })}
//               options={options2} 
//               isClearable 
//             />
//         </div>
//         <div>
//           <label>Dispatch Agent</label>
//             <Select
//               name="Dispatch_Agent"
//               value={options3.find(option => option.value === formData.Dispatch_Agent)} 
//               onChange={(selectedOption) => handleInputChange2({
//                 target: { name: 'Dispatch_Agent', value: selectedOption?.value }
//               })}
//               options={options3} 
//               placeholder="Dispatch Agent"
//               isClearable 
//             />
//         </div>
//       </div>
//       <div className='addmovecreatebutton'>
//         <button type="button" onClick={handleSubmit} disabled={isLoading}>
//           {isLoading ? 'Saving...' : 'Create Job'}
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Addmoves;



// // const Addmoves = () => {
// //   const [assignedToOptions, setAssignedToOptions] = useState([]);
// //   const [dispatchAgents, setDispatchAgents] = useState([]);
// //   const [statusOptions, setStatusOptions] = useState([]);
// //   const [formData, setFormData] = useState({
// //     Sales_Agent: '',
// //     Dispatch_Agent: '',
// //     Move_Size: '',
// //     MoveDate: '',
// //     INVOICE: '',
// //     Invoicelink: '',
// //     severity: '',
// //     Connection_Type: '',
// //     Estimate_No: '',
// //     Move_From: '',
// //     Move_To: '',
// //     From_Address: '',
// //     To_Address: '',
// //     Banner: '',
// //     Booked_Date: '',
// //     Status: 'Booked Moves',
// //     Assigned_To: '',
// //     Dispatch_Agent: '',
// //     Coordinates_Origin: '',
// //     Coordinates_Destn: ''
// //   });
  
// //   // State to keep track of required field errors
// //   const [errors, setErrors] = useState({});

// //   useEffect(() => {
// //     const fetchAssignedToOptions = async () => {
// //       try {
// //         const response = await axios.get('http://localhost:9000/zoho-data/Assigned-To-Name');
// //         if (response.data && response.data.records) {
// //           const names = response.data.records.map(record => record.Assigned_To_Names);
// //           const Dispatch = response.data.records.map(record => record.Dispatch_Agent);
// //           const Status = response.data.records.map(record => record.Status_Assigned);

// //           setAssignedToOptions(names);
// //           setDispatchAgents(Dispatch);
// //           setStatusOptions(Status);
// //         } else {
// //           console.log('No records found in response');
// //           setAssignedToOptions([]);
// //           setDispatchAgents([]);
// //           setStatusOptions([]);
// //         }
// //       } catch (error) {
// //         console.error('Error fetching assigned to options:', error);
// //         setAssignedToOptions([]);
// //         setDispatchAgents([]);
// //         setStatusOptions([]);
// //       }
// //     };

// //     fetchAssignedToOptions();
// //   }, []);

// //   const handleDateChange = (date) => {
// //     if (date) {
// //       // Setting the time to noon to avoid timezone issues
// //       const localDate = new Date(date);
// //       localDate.setHours(12, 0, 0, 0);  // Set hours to avoid timezone issues
// //       const formattedDate = localDate.toISOString().split('T')[0];
// //       setFormData({ ...formData, MoveDate: formattedDate });
// //     } else {
// //       setFormData({ ...formData, MoveDate: '' });
// //     }
// //   };
  
// //   const handleDateChange1 = (date) => {
// //     if (date) {
// //       // Setting the time to noon to avoid timezone issues
// //       const localDate = new Date(date);
// //       localDate.setHours(12, 0, 0, 0);  // Set hours to avoid timezone issues
// //       const formattedDate = localDate.toISOString().split('T')[0];
// //       setFormData({ ...formData, Booked_Date: formattedDate });
// //     } else {
// //       setFormData({ ...formData, Booked_Date: '' });
// //     }
// //   };
  
// //   const fetchApiKey = async () => {
// //     try {
// //       const response = await axios.get('http://localhost:9000/api/get-google-api-key');
// //       return response.data.apiKey;
// //     } catch (error) {
// //       console.error("Failed to fetch API key:", error);
// //       return null;
// //     }
// //   };

// //   const fetchCoordinates = async (address) => {
// //     const apiKey = await fetchApiKey();
// //     if (!apiKey) {
// //       console.error("API key is not available.");
// //       return null;
// //     }

// //     try {
// //       const response = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json`, {
// //         params: {
// //           address: address,
// //           key: apiKey
// //         }
// //       });

// //       if (response.data.status === "OK") {
// //         const location = response.data.results[0].geometry.location;
// //         return { lat: location.lat, lng: location.lng };
// //       } else {
// //         console.error("Geocoding API error: ", response.data.status);
// //         return null;
// //       }
// //     } catch (error) {
// //       console.error("Error fetching coordinates:", error);
// //       return null;
// //     }
// //   };

// //   // Validate form data to check if all fields are filled
// //   const validateForm = () => {
// //     const newErrors = {};

// //     Object.keys(formData).forEach((key) => {
// //       if (!formData[key]) {
// //         newErrors[key] = true; // Mark field as error if it is empty
// //       }
// //     });

// //     setErrors(newErrors);
// //     return Object.keys(newErrors).length === 0; // Return true if no errors
// //   };

// //   const handleSubmit = async () => {
// //     if (!validateForm()) {
// //       // alert('Please fill in all required fields.');
// //       return;
// //     }

// //     try {
// //       const fromAddressCoords = await fetchCoordinates(formData.From_Address);
// //       const toAddressCoords = await fetchCoordinates(formData.To_Address);

// //       const updatedFormData = {
// //         ...formData,
// //         Coordinates_Origin: fromAddressCoords ? `${fromAddressCoords.lat},${fromAddressCoords.lng}` : '',
// //         Coordinates_Destn: toAddressCoords ? `${toAddressCoords.lat},${toAddressCoords.lng}` : ''
// //       };

// //       const response = await fetch('http://localhost:9000/zoho-data/add-row', {
// //         method: 'POST',
// //         headers: {
// //           'Content-Type': 'application/json'
// //         },
// //         body: JSON.stringify([updatedFormData])
// //       });

// //       if (response.ok) {
// //         console.log('Job created successfully');
// //         alert("Add Moves saved successfully!");
// //         setFormData({
// //           Sales_Agent: '',
// //           Dispatch_Agent: '',
// //           Move_Size: '',
// //           MoveDate: '',
// //           INVOICE: '',
// //           Invoicelink: '',
// //           severity: '',
// //           Connection_Type: '',
// //           Estimate_No: '',
// //           Move_From: '',
// //           Move_To: '',
// //           From_Address: '',
// //           To_Address: '',
// //           Banner: '',
// //           Booked_Date: '',
// //           Status: '',
// //           Assigned_To: '',
// //           Dispatch_Agent: '',
// //           Coordinates_Origin: '',
// //           Coordinates_Destn: ''
// //         });
// //       } else {
// //         console.error('Error creating job');
// //         alert("Failed to save Add Moves. Please try again.");
// //       }
// //     } catch (error) {
// //       console.error('Error:', error);
// //     }
// //   };

// //   const handleInputChange2 = (e) => {
// //     const { name, value } = e.target;
// //     setFormData({ ...formData, [name]: value });
// //   };

// //   return ( 
// //   <div>
// //     <div className="header-my">
// //         <h1>Add Moves</h1>
// //     </div>
// //     <div className="team-details-my details-content1">
// //           <div>
// //             <label>Sales Agent</label>
// //             <input type="text" name="Sales_Agent" value={formData.Sales_Agent} onChange={handleInputChange2} style={errors.Sales_Agent ? { border: '1px solid red' } : {}}/>
// //           </div>
// //           <div>
// //             <label>Move Size</label>
// //             <input type="text" name="Move_Size" value={formData.Move_Size} onChange={handleInputChange2} style={errors.Move_Size ? { border: '1px solid red' } : {}}/>
// //           </div>
// //           <div>
// //           <label>Move Date</label>
// //             <DatePicker
// //               selected={formData.MoveDate ? new Date(formData.MoveDate) : null}
// //               onChange={handleDateChange}
// //               dateFormat="dd/MM/yyyy"  
// //               className={errors.MoveDate ? 'error' : ''}
// //             />
// //           </div>
// //           <div>
// //             <label>Invoice No</label>
// //             <input type="text" name="INVOICE" value={formData.INVOICE} onChange={handleInputChange2} style={errors.INVOICE ? { border: '1px solid red' } : {}}/>
// //           </div>
// //           <div>
// //             <label>Invoice Link</label>
// //             <input type="text" name="Invoicelink" value={formData.Invoicelink} onChange={handleInputChange2}style={errors.Invoicelink ? { border: '1px solid red' } : {}} />
// //           </div>
// //           <div>
// //             <label>Severity</label>
// //             <input type="text" name="severity" value={formData.severity} onChange={handleInputChange2} />
// //           </div>
// //           <div>
// //             <label>Connection Type</label>
// //             <input type="text" name="Connection_Type" value={formData.Connection_Type} onChange={handleInputChange2} style={errors.Connection_Type ? { border: '1px solid red' } : {}}/>
// //           </div>
// //           <div>
// //             <label>Estimate No</label>
// //             <input type="text" name="Estimate_No" value={formData.Estimate_No} onChange={handleInputChange2} style={errors.Estimate_No ? { border: '1px solid red' } : {}} />
// //           </div>
// //           <div>
// //             <label>Move From</label>
// //             <input type="text" name="Move_From" value={formData.Move_From} onChange={handleInputChange2} style={errors.Move_From ? { border: '1px solid red' } : {}} />
// //           </div>
// //           <div>
// //             <label>Move To</label>
// //             <input type="text" name="Move_To" value={formData.Move_To} onChange={handleInputChange2} style={errors.Move_To ? { border: '1px solid red' } : {}}/>
// //           </div>
// //           <div>
// //             <label>From Address</label>
// //             <input type="text" name="From_Address" value={formData.From_Address} onChange={handleInputChange2} style={errors.From_Address ? { border: '1px solid red' } : {}}/>
// //           </div>
// //           <div>
// //             <label>To Address</label>
// //             <input type="text" name="To_Address" value={formData.To_Address} onChange={handleInputChange2} style={errors.To_Address ? { border: '1px solid red' } : {}}/>
// //           </div>
// //           <div>
// //             <label>Banner</label>
// //             <input type="text" name="Banner" value={formData.Banner} onChange={handleInputChange2} style={errors.Banner ? { border: '1px solid red' } : {}}/>
// //           </div>
// //           <div>
// //           <label>Booked Date</label>
// //             <DatePicker
// //               selected={formData.Booked_Date ? new Date(formData.Booked_Date) : null}
// //               onChange={handleDateChange1}
// //               dateFormat="dd/MM/yyyy"  
// //               className={errors.MoveDate ? 'error' : ''}
// //             />
// //           </div>
// //           <div>
// //             <label>Assigned To</label>
// //               <select name="Assigned_To" value={formData.Assigned_To} onChange={handleInputChange2} style={errors.Assigned_To ? { border: '1px solid red' } : {}}>
// //                 <option value="">Select</option>
// //                 {assignedToOptions
// //                   .filter(option => option && option.trim() !== '')  
// //                   .map((option, index) => (
// //                     <option key={index} value={option}>{option}</option>
// //                   ))
// //                 }
// //               </select>
// //           </div>
// //           <div>
// //             <label>Status</label>
// //               <select name="Status" value={formData.Status} onChange={handleInputChange2}>
// //                 <option value="">Select</option>
// //                 {statusOptions
// //                   .filter(option => option && option.trim() !== '')  
// //                   .map((option, index) => (
// //                     <option key={index} value={option}>{option}</option>
// //                   ))
// //                 }
// //               </select>
// //           </div>
// //           <div>
// //             <label>Dispatch Agent</label>
// //               <select name="Dispatch_Agent" value={formData.Dispatch_Agent} onChange={handleInputChange2} style={errors.Dispatch_Agent ? { border: '1px solid red' } : {}}> 
// //                 <option value="">Select</option>
// //                 {dispatchAgents
// //                   .filter(option => option && option.trim() !== '')  
// //                   .map((option, index) => (
// //                     <option key={index} value={option}>{option}</option>
// //                   ))
// //                 }
// //               </select>
// //           </div>
// //           </div>
// //           <div className='addmovecreatebutton'>
// //             <div >
// //                 <button onClick={handleSubmit}>Create a Job</button>
// //             </div>
// //           </div>
      
// // </div>
// //   );

// // };

// // export default Addmoves;
