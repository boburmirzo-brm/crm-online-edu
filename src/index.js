// @ts-nocheck
import React from "react";
import ReactDOM from "react-dom/client";
import "./style/index.css";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";

import "./static/methods";
import "number-brm";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { persister, store } from "./persist";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <React.StrictMode>
  <Provider store={store}>
    <PersistGate loading={null} persistor={persister}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </PersistGate>
  </Provider>
  // </React.StrictMode>
);

serviceWorkerRegistration.register();
