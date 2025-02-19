import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { login, logout } from "../../redux/slices/authSlice";
import { setUser, clearUser } from "../../redux/slices/userSlice";
import { setSetting, deleteSetting } from "../../redux/slices/settingsSlice";
import {
  AppBar,
  Toolbar,
  Typography,
  Avatar,
  Button,
  Box,
  Icon,
} from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
import axios from "axios";
import "../../styles/Navbar.css";

function Navbar() {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const jwt = useSelector((state) => state.auth.jwt);
  const user = useSelector((state) => state.user);
  const darkMode = useSelector((state) => state.settings.darkMode);
  const drag = useSelector((state) => state.settings.drag);
  const bg = useSelector((state) => state.settings.bg);
  //set background image here to make it load faster on reload
  document.body.style.backgroundImage = `url(${bg})`;
  //set dark mode here to make it load faster on reload
  if (darkMode) {
    document.body.className = "dark";
  }
  if (drag) {
    const note = document.getElementsByClassName("note");
    for (let i = 0; i < note.length; i++) {
      note[i].style.cursor = "grab";
    }
  }

  const handleGoogleLogin = async () => {
    const googleAuthWindow = window.open(
      `${import.meta.env.VITE_BACKEND_URL}/api/auth/signin`,
      "_blank",
      "width=500,height=600"
    );

    //  Polling to check when the popup closes
    const checkPopupClosed = setInterval(() => {
      if (googleAuthWindow?.closed) {
        clearInterval(checkPopupClosed);
        window.location.reload();
      }
    }, 1000);
  };

  useEffect(() => {
    const receiveMessage = async (event) => {
      if (event.origin !== `${import.meta.env.VITE_BACKEND_URL}`) {
        // console.warn("Ignoring message from unknown origin:", event.origin);
        return;
      }

      const { success, token } = event.data || {};
      if (!success || !token) {
        console.warn("Invalid data received:", event.data);
        return;
      }
      dispatch(login({ jwt: token }));
    };
    window.addEventListener("message", receiveMessage);

    return () => {
      window.removeEventListener("message", receiveMessage);
    };
  }, [dispatch]);

  //get user info
  useEffect(() => {
    if (isAuthenticated) {
      axios
        .get(`${import.meta.env.VITE_BACKEND_URL}/api/auth/user`, {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        })
        .then((res) => {
          dispatch(setUser(res.data.user));
        })
        .catch((err) => {
          if (err.response && err.response.status === 403) {
            dispatch(logout());
            dispatch(clearUser());
            dispatch(deleteSetting());
          }
          console.error("Error fetching user:", err);
        });

      axios
        .put(
          `${import.meta.env.VITE_BACKEND_URL}/api/auth/updateLogin`,
          {},
          {
            withCredentials: true,
            headers: {
              Authorization: `Bearer ${jwt}`,
            },
          }
        )
        .then((res) => {
          if (res.status === 200) {
            return;
          }
        })
        .catch((err) => {
          if (err.response && err.response.status === 403) {
            dispatch(logout());
            dispatch(clearUser());
            dispatch(deleteSetting());
          }
          console.error("Error updating login", err);
        });
    }
  }, [isAuthenticated, jwt, dispatch]);

  useEffect(() => {
    if (isAuthenticated) {
      axios
        .get(`${import.meta.env.VITE_BACKEND_URL}/api/setting`, {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        })
        .then((res) => {
          const newSetting = res.data.setting;
          if (!newSetting) {
            console.error("Error: Setting data is undefined");
            return;
          }
          const formattedSetting = {
            darkMode: newSetting.darkmode,
            notification: newSetting.notification,
            drag: newSetting.drag,
            bg: newSetting.bg,
          };

          document.body.style.backgroundImage = `url(${formattedSetting.bg})`;
          if (formattedSetting.darkMode) {
            document.body.className = "dark";
          }
          dispatch(setSetting(formattedSetting));
        })
        .catch((err) => {
          if (err.response && err.response.status === 403) {
            dispatch(logout());
            dispatch(clearUser());
            dispatch(deleteSetting());
          }

          console.error("Error fetching user:", err);
        });
    }
  }, [isAuthenticated, jwt, dispatch]);

  return (
    <AppBar className={"app-bar" + " " + (darkMode ? "dark" : "")}>
      <Toolbar className="tool-bar">
        {/* Logo & Title */}
        <a href="/">
          <Box className="box">
            <Icon baseClassName="material-icons-two-tone" className="icon">
              <img src="/logo.png" alt="Logo" />
            </Icon>
            <Typography
              variant="h4"
              fontWeight="semibold"
              className={"app-name" + " " + (darkMode ? "dark" : "")}
            >
              Scribly
            </Typography>
          </Box>
        </a>

        {isAuthenticated ? (
          <a href="/profile">
            <Avatar
              className="avatar"
              src={user.profile_picture}
              alt={user?.username}
            />
          </a>
        ) : (
          <Button
            variant="contained"
            startIcon={<GoogleIcon className="google-icon" />}
            onClick={handleGoogleLogin}
            className={"google-signin" + " " + (darkMode ? "dark" : "")}
          >
            Sign in with Google
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
