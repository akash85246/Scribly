import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setUser, clearUser } from "../redux/slices/userSlice";
import { toggleDarkMode } from "../redux/slices/settingsSlice";

const Profile = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const darkMode = useSelector((state) => state.settings.darkMode);

  const handleLogin = () => {
    dispatch(setUser({ id: 1, name: "Akash", email: "akash@example.com" }));
  };

  const handleLogout = () => {
    dispatch(clearUser());
  };

  return (
    <div>
      <h1>Welcome, {user.name || "Guest"}</h1>
      <button onClick={handleLogin}>Login</button>
      <button onClick={handleLogout}>Logout</button>
      <button onClick={() => dispatch(toggleDarkMode())}>
        Toggle Dark Mode (Current: {darkMode ? "On" : "Off"})
      </button>
    </div>
  );
};

export default Profile;