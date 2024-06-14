import React from "react";
import "./index.css";
import App from "./App";
import { UserProvider } from './Components/UserContext';
import * as ReactDOM from "react-dom/client";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(

<React.StrictMode>
<UserProvider>
<App />
</UserProvider>
</React.StrictMode>
);