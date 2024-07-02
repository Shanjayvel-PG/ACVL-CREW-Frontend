import "./App.css";
import React from 'react';


import { HashRouter, Navigate, Route, Routes } from "react-router-dom";
// import Layout from "./Layout";
import App12 from "./Components/dashboard/MainDashboard";
import Layout from "./Layout";
import BookingDetails from "./Components/dashboard/My Bookings/mybookm";
function App() {
return (
<HashRouter>
<Routes>
<Route path="/" element={<Layout/>} />
<Route  path="/logout" element={<Layout/>}/>
<Route path="/booking/:id" element={<BookingDetails/>} />
<Route path="/booking-details/:id" element={<BookingDetails />} />

</Routes>
</HashRouter>
);
}
export default App;