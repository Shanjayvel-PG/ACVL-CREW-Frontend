import "./App.css";
import React from 'react';


import { HashRouter, Navigate, Route, Routes } from "react-router-dom";
import App12 from "./Components/dashboard/MainDashboard";
import Layout from "./Layout";
import BookingDetails from "./Components/dashboard/My Bookings/mybookm";
import Allbookings from "./Components/dashboard/All Bookings/allbook";
import Addmoves from "./Components/dashboard/Addmoves";
import Storage from "./Components/dashboard/Storage";
function App() {
return (
<HashRouter>
<Routes>
{/* <Route path="/" element={<Layout/>} /> */}
{/* <Route path="/" element={<Allbookings/>} /> */}
<Route path="/" element={<App12/>} />
{/* <Route path="/" element={<Addmoves/>} /> */}
{/* <Route  path="/logout" element={<Layout/>}/> */}
<Route path="/booking/:id" element={<BookingDetails/>} />
<Route path="/booking-details/:id" element={<BookingDetails />} />

</Routes>
</HashRouter>
);
}
export default App;