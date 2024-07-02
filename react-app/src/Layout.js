import React, { useEffect, useState } from "react";
import LoginPage from "./Loginpage";
import App12 from "../src/Components/dashboard/MainDashboard";
import "./Layout.css";

function Layout() {
    const [isUserAuthenticated, setIsUserAuthenticated] = useState(false);
    const [isFetching, setIsFetching] = useState(true);
    const [userDetails, setUserDetails] = useState({
        firstName: "",
        lastName: "",
        mailid: "",
        timeZone: "",
        createdTime: "",
        userid:"",
roledetails: {
    rolename: "",
    roleid: ""
  }
    });

    useEffect(() => {
        window.catalyst.auth
            .isUserAuthenticated()
            .then((result) => {
                let userDetails = {
                    firstName: result.content.first_name,
                    lastName: result.content.last_name,
                    mailid: result.content.email_id,
                    timeZone: result.content.time_zone,
                    createdTime: result.content.created_time,
                    userid: result.content.user_id,
roledetails: {
    rolename: result.content.role_details.role_name,
    roleid: result.content.role_details.role_id,
  }
                };
                setUserDetails(userDetails);
                setIsUserAuthenticated(true);
            })
            .catch((err) => {})
            .finally(() => {
                setIsFetching(false);
            });
    }, []);

    return (
        <>
            {isFetching ? (
                <p>Loading ….</p>
            ) : isUserAuthenticated ? (
                <div className="main-layout">
                    <App12 userDetails={userDetails} />
                </div>
            ) : (
                <LoginPage />
            )}
        </>
    );
}

export default Layout;
