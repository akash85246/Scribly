import { Button, Container, Paper, Typography } from "@mui/material";
import { Google } from "@mui/icons-material";
import login from "../../assets/login.svg";

import "../../styles/Login.css";

export default function Login() {
  function handleGoogleLogin() {
    //using navbar google button to login
    const google=document.getElementsByClassName("google-signin")[0];
    google.click();
  }
  return (
    <Container
      maxWidth="xs"
      className="container"
    >
      <Paper elevation={3} sx={{ p: 4, textAlign: "center", borderRadius: 3 }}>
      <Typography className="phrase1">
       Capture your thoughts instantly, organize effortlessly, and never let an idea slip away. Your digital sticky notes, reimagined!
        </Typography>
        <img src={login} alt="login" width={350} />
        <Typography className="phrase2">
          Welcome Back!
        </Typography>
        <Button
          variant="contained"
          startIcon={<Google />}
          sx={{
            backgroundColor: "#DB4437",
            color: "white",
            "&:hover": { backgroundColor: "#C1351D" },
          }}
          onClick={handleGoogleLogin}
        >
          Sign in with Google
        </Button>
      </Paper>
    </Container>
  );
}
