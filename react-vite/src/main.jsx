// src/main.jsx
import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";
import { Provider as ReduxProvider, useDispatch } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { RouterProvider } from "react-router-dom";
import { store, persistor } from "./redux/store"; // Import store and persistor
import { router } from "./router";
import * as sessionActions from "./redux/session";
import { thunkRestoreUser } from "./redux/session"; // Import thunkRestoreUser
import "./index.css";

// Wrapper component to handle session restoration
function AppWrapper() {
  const dispatch = useDispatch();

  // Restore user session on app load
  useEffect(() => {
    dispatch(thunkRestoreUser());
  }, [dispatch]);

  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

if (import.meta.env.MODE !== "production") {
  window.store = store;
  window.sessionActions = sessionActions;
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ReduxProvider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <AppWrapper /> {/* Use the wrapper component */}
      </PersistGate>
    </ReduxProvider>
  </React.StrictMode>
);