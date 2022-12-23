import rootReducer from "../context/reducer";
import { legacy_createStore as createStore } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

export const storageName = "algoritm-table";

const persistConfig = {
  key: storageName,
  storage,
  blacklist: [],
  whitelist: ["auth", "getOneStudent", "getOneGroup"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);
const store = createStore(persistedReducer);
const persister = persistStore(store);

export {store, persister}