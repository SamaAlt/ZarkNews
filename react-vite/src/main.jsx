import React from "react";
import ReactDOM from "react-dom/client";
import { Provider as ReduxProvider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./redux/store"; 
import AppWrapper from "./components/AppWrapper"; 
import "./index.css";

if (import.meta.env.MODE !== "production") {
  window.store = store; // Only keep this if you need to access the store in the console
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ReduxProvider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <AppWrapper /> 
      </PersistGate>
    </ReduxProvider>
  </React.StrictMode>
);