import { Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import ProtectedRoute from "./components/common/ProtectedRoute";
import Home from "./pages/home";
import Profile from "./pages/profile";
import "./App.css";

const App = () => {
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/sw.js")
        .then((registration) => {
          console.log("Service Worker Registered");
          if (registration.active) {
            console.log('Service Worker registered with scope:', registration.scope);
            registration.active.postMessage({
              type: "SET_BASE_URL",  
              baseUrl: import.meta.env.VITE_BACKEND_URL, 
            });
          }
        })
        .catch((err) =>
          console.error("Service Worker Registration Failed", err)
        );
    }
  }, []);
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

export default App;
