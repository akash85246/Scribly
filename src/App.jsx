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
          if (registration.active) {
            registration.active.postMessage({
              type: "SET_BASE_URL",  
              baseUrl: import.meta.env.VITE_BASE_URL, 
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
