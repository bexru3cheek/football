import React from "react";
import ReactDOM from "react-dom/client";
// import { ApiProvider } from "@reduxjs/toolkit/query/react";
import { Provider } from "react-redux";

// import categoryServices from "./redux/services/categoryServices.js";
import { store } from "./redux/store/index.js";
import App from "./App.jsx";

import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {/* <ApiProvider api={categoryServices}>
      <App />
    </ApiProvider> */}
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
