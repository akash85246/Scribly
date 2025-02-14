import { Snackbar, Alert } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import {closeToast } from "../../redux/slices/toastSlice";

export default function Toast() {
    const dispatch = useDispatch();
  const open = useSelector((state) => state.toast.open);
  const message = useSelector((state) => state.toast.message);
  const severity = useSelector((state) => state.toast.severity);

  const handleToastClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    dispatch(closeToast());
  };
  return (
    <Snackbar
      open={open}
      autoHideDuration={3000}
      onClose={handleToastClose}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
    >
      <Alert
        onClose={handleToastClose}
        severity={severity}
        sx={{ width: "100%" }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
}
