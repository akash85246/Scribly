import { useSelector } from "react-redux";
import { Avatar, Card, CardContent, Typography, Container } from "@mui/material";
import settingsImage from "../../assets/settings.svg";
import "../../styles/UserInfo.css";

export default function UserInfo() {
  const user = useSelector((state) => state.user);

  return (
    <Container maxWidth="md" className="user-info-container">
      <Card className="user-info__card" elevation={3}>
        <CardContent className="user-info__content">
          <Avatar src={user.profile_picture} alt="avatar" className="user-info__avatar" />
          <div className="user-info__details">
            <Typography variant="h5" className="user-info__name">
              {user.username}
            </Typography>
            <Typography variant="body1" color="textSecondary">
              {user.email}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Last Online: {user.last_online}
            </Typography>
          </div>
        </CardContent>
        <img src={settingsImage} alt="settings" className="user-info__settings" />
      </Card>
    </Container>
  );
}