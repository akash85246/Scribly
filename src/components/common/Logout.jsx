import { useDispatch,useSelector } from "react-redux";
import Button from "@mui/material/Button";
import LogoutIcon from '@mui/icons-material/Logout';
import { logout } from "../../redux/slices/authSlice";
import { clearUser } from "../../redux/slices/userSlice";
import { deleteSetting } from "../../redux/slices/settingsSlice";

export default function Logout() {
  const dispatch = useDispatch();
  const bg =useSelector((state) => state.settings.bg);
  async function userLogOut() {
    document.body.style.backgroundImage = `url(${bg})`;
    document.body.classList.remove("dark");
    dispatch(logout());
    dispatch(clearUser());
    dispatch(deleteSetting());
  }

  return (
    <>
      <Button variant="contained" endIcon={<LogoutIcon />} onClick={userLogOut} size="small" sx={{ mt: 2 }}>
        Logout
      </Button>
    </>
  );
}
