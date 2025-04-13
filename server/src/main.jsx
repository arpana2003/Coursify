import { Toaster } from "react-hot-toast";
import App from "./App.jsx";
import "./index.css";

import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import store from "./Redux/store.js";
import { Provider } from 'react-redux';

//React Router is a standard library for routing in React. It enables navigation between views from different components in a React application, allows the browser URL to be changed, and keeps the UI in sync with the URL.
createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
      <Toaster />
    </BrowserRouter>
  </Provider>
);
