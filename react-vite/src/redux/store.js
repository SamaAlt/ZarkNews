// src/redux/store.js
import {
  legacy_createStore as createStore,
  applyMiddleware,
  compose,
  combineReducers,
} from "redux";
import thunk from "redux-thunk";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // Defaults to localStorage
import sessionReducer from "./session";

// Persist configuration
const persistConfig = {
  key: "root", // Key for the persisted state
  storage, // Storage method (localStorage)
  whitelist: ["session"], // Only persist the session slice
};

const rootReducer = combineReducers({
  session: persistReducer(persistConfig, sessionReducer), // Persist the session slice
});

let enhancer;
if (import.meta.env.MODE === "production") {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = (await import("redux-logger")).default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer);
};

export const store = configureStore();
export const persistor = persistStore(store); // Create the persistor

export default configureStore;