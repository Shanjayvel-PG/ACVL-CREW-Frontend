import React, { useState } from 'react';
import "./asd.css"
import Mybookings from './My Bookings/mybook.js';
import Allbookings from './All Bookings/allbook.js';
import Pastbookings from './Past Bookings/pastbook.js';
import Abbookings from './Alberta Bookings/abbook.js';
import Onbookings from './Toronto Bookings/tobook.js';
import Trabooking from './Trailer Bookings/trabook.js';
import London from './London Hubs/London.js';
import Calgary from './Calgary Hubs/Calgray.js';
import Toronto from './Toronto Hubs/Toronto.js';
import Addmoves from './Addmoves.js';
import Storage from './Storage.js';
import Finance from './Finance/Finance.js';
import TaskCalendar from './Taskcalendar/Taskcalendar.js';

function Content12({ selectedContent }) {
    const getContent = () => {
        switch (selectedContent) {
            case 'mybookings':
                return (
                    <>
                    <Mybookings/>
                    </>
                );
            case 'allbookings':
                return (
                    <>
                     <Allbookings/>
                    </>
                );
            case 'taskcalender':
                return (
                    <>
                     <TaskCalendar/>
                    </>
                );
            case 'postbookings':
                return (
                    <>
                        <Pastbookings/>
                    </>
                );
            case 'alberta':
                return (
                    <>
                      <Abbookings/>
                    </>
                );
            case 'london':
                return (
                    <>
                        <London/>
                    </>
                );
            case 'calgary':
                    return (
                        <>
                         <Calgary/>
                        </>
                    );
            case 'toronto':
                    return (
                        <>
                            <Toronto/>
                        </>
                        );
            case 'ontario':
                return (
                    <>
                      <Onbookings/>
                    </>
                );
            case 'Addmoves':
                return (
                    <>
                      <Addmoves/>
                    </>
                );
            case 'Storage':
               return (
                    <>
                      <Storage/>
                    </>
                ); 
            case 'finance':
               return (
                    <>
                      <Finance/>
                    </>
                ); 
            default:
                return (
                    <>
                    <Allbookings/>
                    </>
                );
        }
    };
    return (
        <div className="content">
            {getContent()}
        </div>
    );
}

export default Content12;

