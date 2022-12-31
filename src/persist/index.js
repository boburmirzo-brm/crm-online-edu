import rootReducer from "../context/reducer";
import { legacy_createStore as createStore } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

export const storageName = "__system";

const persistConfig = {
  key: storageName,
  storage,
  blacklist: [],
  whitelist: ["has_interop_upgraded","auth"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);
const store = createStore(persistedReducer);
const persister = persistStore(store);

export {store, persister}