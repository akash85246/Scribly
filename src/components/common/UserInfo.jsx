import { useSelector } from "react-redux";
import {
  Avatar,
  Card,
  CardContent,
  Typography,
  Container,
} from "@mui/material";
import settingsImage from "../../assets/settings.svg";
import Logout from "./Logout";
import "../../styles/UserInfo.css";

export default function UserInfo() {
  const user = useSelector((state) => state.user);
  const darkMode = useSelector((state) => state.settings.darkMode);

  return (
    <Container maxWidth="md" className="user-info-container">
      <Card
        className={"user-info__card" + " " + (darkMode ? "dark" : "")}
        elevation={3}
      >
        <CardContent className="user-info__content">
          <Avatar
            src={user.profile_picture}
            alt="avatar"
            className="user-info__avatar"
          />
          <div className={"user-info__details" + " " + (darkMode ? "dark" : "")}>
            <Typography variant="h5" className={"user-info__name"+ " " + (darkMode ? "dark" : "")}>
              {user.username}
            </Typography>
            <Typography variant="body1" color="textSecondary">
              {user.email}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Last Online: {user.last_online}
            </Typography>
            <Logout />
          </div>
        </CardContent>
        <img
          src={settingsImage}
          alt="settings"
          className="user-info__settings"
        />
      </Card>
    </Container>
  );
}
