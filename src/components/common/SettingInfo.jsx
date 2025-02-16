import {
  toggleDarkMode,
  setNotification,
  setBg,
  setDrag,
} from "../../redux/slices/settingsSlice";
import { useSelector, useDispatch } from "react-redux";
import SettingsIcon from "@mui/icons-material/Settings";
import WallpaperIcon from "@mui/icons-material/Wallpaper";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import PanToolIcon from "@mui/icons-material/PanTool";
import NotificationsIcon from "@mui/icons-material/Notifications";

import {
  Container,
  Card,
  CardContent,
  Typography,
  Switch,
  Box,
  Stack,
} from "@mui/material";

import "../../styles/SettingInfo.css";
import backgrounds from "../specific/Background";
import axios from "axios";
import { openToast } from "../../redux/slices/toastSlice";
import { logout } from "../../redux/slices/authSlice";
import { clearUser } from "../../redux/slices/userSlice";
import { deleteSetting } from "../../redux/slices/settingsSlice";
export default function SettingInfo() {
  const dispatch = useDispatch();

  const darkMode = useSelector((state) => state.settings.darkMode);
  const drag = useSelector((state) => state.settings.drag);
  const notification = useSelector((state) => state.settings.notification);
  const bg = useSelector((state) => state.settings.bg);
  const jwt = useSelector((state) => state.auth.jwt);

  const handleToastClick = (s, m) => {
    dispatch(
      openToast({
        message: m,
        severity: s,
      })
    );
  };
  async function updateDarkMode(value) {
    dispatch(toggleDarkMode(value));
    document.body.className = value ? "dark" : "";
    await axios
      .put(
        `${import.meta.env.VITE_BACKEND_URL}/api/setting/darkmode`,
        {},
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
          withCredentials: true,
        }
      )
      .then((res) => {
        if(res.status == 200){
          handleToastClick("success", "Dark mode updated!");
        }
      })
      .catch((err) => {
        if (err.response && err.response.status === 403) {
          dispatch(logout());
          dispatch(clearUser());
          dispatch(deleteSetting());
        }
        dispatch(toggleDarkMode(!value));
        document.body.className = !value ? "dark" : "";
        handleToastClick("error", "Failed to update dark mode!");
        console.error(err);
      });
  }
  async function updateDrag(value) {
    dispatch(setDrag(value));
    await axios
      .put(
        `${import.meta.env.VITE_BACKEND_URL}/api/setting/drag`,
        {},
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
          withCredentials: true,
        }
      )
      .then((res) => {
        if(res.status == 200){
          handleToastClick("success", "Drag updated!");
        }
      })
      .catch((err) => {
        if (err.response && err.response.status === 403) {
          dispatch(logout());
          dispatch(clearUser());
          dispatch(deleteSetting());
        }
        dispatch(setDrag(!value));
        handleToastClick("error", "Failed to update drag!");
        console.error(err);
      });
  }
  async function updateNotification(value) {
    dispatch(setNotification(value));
    console.log(notification);
    await axios
      .put(
        `${import.meta.env.VITE_BACKEND_URL}/api/setting/notification`,
        {},
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
          withCredentials: true,
        }
      )
      .then((res) => {
        if(res.status == 200){
          handleToastClick("success", "Notification updated!");
        }
      })
      .catch((err) => {
        if (err.response && err.response.status === 403) {
          dispatch(logout());
          dispatch(clearUser());
          dispatch(deleteSetting());
        }
        dispatch(setNotification(!value));
        handleToastClick("error", "Failed to update notification!");
        console.error(err);
      });
  }

  async function updateBackground(value) {
    // console.log("value",value);
    dispatch(setBg(value));
    document.body.style.backgroundImage = `url(${value})`;
    await axios
      .put(
        `${import.meta.env.VITE_BACKEND_URL}/api/setting/bg`,
        {
          bg: value,
        },
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
          withCredentials: true,
        }
      )
      .then((res) => {
        if(res.status == 200){
          handleToastClick("success", "Background updated!");
        }
      })
      .catch((err) => {
        if (err.response && err.response.status === 403) {
          dispatch(logout());
          dispatch(clearUser());
          dispatch(deleteSetting());
        }
        dispatch(setBg(null));
        document.body.style.backgroundImage = `url(${bg})`;
        handleToastClick("error", "Failed to update background!");
        console.error(err);
      });
  }

  return (
    <Container maxWidth="md" className="setting-info-container">
      <Card
        elevation={3}
        sx={{ p: 3, borderRadius: 3 }}
        className={"setting-info__card" + " " + (darkMode ? "dark" : "")}
      >
        <CardContent>
          <Typography
            variant="h5"
            gutterBottom
            sx={{ fontWeight: "bold" }}
            className={"setting-info__title"+ " " + (darkMode ? "dark" : "")}
          >
            <SettingsIcon />
            Settings
          </Typography>

          <Stack spacing={2}>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography variant="body1" className={"setting-info_subtitle"+ " " + (darkMode ? "dark" : "")}>
                <DarkModeIcon />
                Dark Mode
              </Typography>
              <Switch
                checked={darkMode}
                onChange={() => updateDarkMode(!darkMode)}
              />
            </Box>

            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography variant="body1" className={"setting-info_subtitle"+ " " + (darkMode ? "dark" : "")}>
                <PanToolIcon />
                Enable Dragging
              </Typography>
              <Switch checked={drag} onChange={() => updateDrag(!drag)} />
            </Box>

            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography variant="body1" className={"setting-info_subtitle"+ " " + (darkMode ? "dark" : "")}>
                <NotificationsIcon />
                Enable Notifications
              </Typography>
              <Switch
                checked={notification}
                onChange={() => updateNotification(!notification)}
              />
            </Box>
          </Stack>

          {/* Background Selection */}
          <Typography
            variant="h6"
            sx={{ mt: 3, fontWeight: "bold" }}
            className={"setting-info__title"+ " " + (darkMode ? "dark" : "")}
          >
            <WallpaperIcon />
            Select Background:
          </Typography>

          <Box display="flex" gap={2} flexWrap="wrap" mt={2}>
            {backgrounds.map((item, index) => (
              <Box
                key={index}
                component="img"
                src={item.img}
                alt={item.label}
                onClick={() => updateBackground(item.img)}
                sx={{
                  width: 80,
                  height: 60,
                  borderRadius: 2,
                  cursor: "pointer",
                  border:
                    bg == item.img
                      ? "3px solid #1976D2"
                      : "3px solid transparent",
                  transition: "0.3s",
                }}
              />
            ))}
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
}
