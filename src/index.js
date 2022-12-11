// @ts-nocheck
import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import App from "./App";
import { BrowserRouter } from "react-router-dom";

import rootReducer from "./context/reducer";
import { legacy_createStore as createStore } from "redux";
import { Provider } from "react-redux";

import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { PersistGate } from "redux-persist/integration/react";
export const storageName = "algoritm-table"

const persistConfig = {
  key: storageName,
  storage,
  blacklist: [],
  whitelist: ["auth", "teacherInfo"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);
const store = createStore(persistedReducer);
const persister = persistStore(store);

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