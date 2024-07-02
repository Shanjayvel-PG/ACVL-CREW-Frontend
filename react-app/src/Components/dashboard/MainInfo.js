import React, { useState } from 'react';
import "./asd.css"
import Mybookings from './My Bookings/mybook.js';
import Allbookings from './All Bookings/allbook.js';
import Pastbookings from './Past Bookings/pastbook.js';
import Abbookings from './Alberta Bookings/abbook.js';
import Onbookings from './Toronto Bookings/tobook.js';
import Trabooking from './Trailer Bookings/trabook.js';
import London from './London Hubs/London.js';

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
            case 'postbookings':
                return (
                    <>
                        <Pastbookings/>
                    </>
                );
            case 'trailer':
                return (
                    <>
                    <Trabooking/>
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
            case 'ontario':
                return (
                    <>
                      <Onbookings/>
                    </>
                );
            default:
                return (
                    <>
                    {/* <h2>Welcome to ACVL & M N movers Crew Dashboard</h2> */}
                    <Mybookings/>
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

