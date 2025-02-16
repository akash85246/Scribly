import { useState, useEffect } from "react";
import { Box, Card, CardContent, TextField, Fab, Zoom } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import AddIcon from "@mui/icons-material/Add";
import ChangeCircleIcon from "@mui/icons-material/ChangeCircle";
import { useSelector, useDispatch } from "react-redux";
import { addNote, updateNote } from "../../redux/slices/noteSlice";
import { openToast } from "../../redux/slices/toastSlice";
import { logout } from "../../redux/slices/authSlice";
import { clearUser } from "../../redux/slices/userSlice";
import { deleteSetting } from "../../redux/slices/settingsSlice";

import "../../styles/CreateArea.css";
import axios from "axios";
import { closeUpdateMode } from "../../redux/slices/updateSlice";

function CreateArea() {
  const [isClicked, setIsClicked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const darkMode = useSelector((state) => state.settings.darkMode);

  const dispatch = useDispatch();

  const update = useSelector((state) => state.update);
  const [note, setNote] = useState({ title: "", content: "", alert: null });

  useEffect(() => {
    if (update.update) {
      setIsClicked(true);
      setNote({
        title: update.text,
        content: update.content,
        alert: update.alert,
      });
    }
  }, [update]);

  const handleToastClick = (s, m) => {
    dispatch(
      openToast({
        message: m,
        severity: s,
      })
    );
  };

  const jwt = useSelector((state) => state.auth.jwt);

  function handleChange(event) {
    const { name, value } = event.target;
    setNote((prevNote) => ({
      ...prevNote,
      [name]: value,
    }));
  }
  function handleDateChange(newDate) {
    const parsedDate = dayjs(newDate);

  if (parsedDate.isValid()) {
    setNote((prevNote) => ({
      ...prevNote,
      alert: parsedDate.toISOString(),
    }));
  } else {
    setNote((prevNote) => ({
      ...prevNote,
      alert: null, 
    }));
  }
  }

  async function handleSubmit(event) {
    if (!note.content) {
      handleToastClick("error", "Note content cannot be empty!");
      return;
    }
    setIsLoading(true);
    await axios
      .post(
        `${import.meta.env.VITE_BACKEND_URL}/api/note/add`,
        {
          title: note.title,
          content: note.content,
          alert: note.alert,
        },
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
          withCredentials: true,
        }
      )
      .then((res) => {
        const newNote = res.data.note[0];
        dispatch(addNote(newNote));
        handleToastClick("success", "Note added successfully!");
      })
      .catch((err) => {
        if (err.response && err.response.status === 403) {
          dispatch(logout());
          dispatch(clearUser());
          dispatch(deleteSetting());
        }
        handleToastClick("error", "Failed to add note!");
        console.error(err);
      });
    setIsLoading(false);
    setNote({ title: "", content: "", alert: null });
    setIsClicked((prev) => !prev);
    event.preventDefault();
  }

  async function handleUpdateSubmit(event) {
    if (!note.content) {
      handleToastClick("error", "Note content cannot be empty!");
      return;
    }
    setIsLoading(true);
    await axios
      .put(
        `${import.meta.env.VITE_BACKEND_URL}/api/note/update`,
        {
          id: update.id,
          title: note.title,
          content: note.content,
          alert: note.alert,
          position: update.position,
          star: update.star,
        },
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
          withCredentials: true,
        }
      )
      .then((res) => {
        const newNote = res.data.note;
        dispatch(updateNote(newNote));
        dispatch(closeUpdateMode());
        handleToastClick("success", "Note added successfully!");
      })
      .catch((err) => {
        if (err.response && err.response.status === 403) {
          dispatch(logout());
          dispatch(clearUser());
          dispatch(deleteSetting());
        }
        handleToastClick("error", "Failed to add note!");
        console.error(err);
      });
    setIsLoading(false);
    setNote({ title: "", content: "", alert: null });
    setIsClicked((prev) => !prev);
    event.preventDefault();
  }

  return (
    <Box className="box">
      <Card className={"card" + " " + (darkMode ? " dark" : "")}>
        <CardContent className="card-content">
          <form className={"create-note" + " " + (darkMode ? " dark" : "")}>
            {isClicked && (
              <TextField
                name="title"
                label="Title"
                className={"titleInput" + " " + (darkMode ? " dark" : "")}
                fullWidth
                variant="outlined"
                value={note.title}
                onChange={handleChange}
                sx={{ mb: 2 }}
              />
            )}

            <TextField
              name="content"
              label="Take a note..."
              className={"noteInput" + " " + (darkMode ? " dark" : "")}
              fullWidth
              multiline
              rows={isClicked ? 3 : 1}
              variant="outlined"
              value={note.content}
              onChange={handleChange}
              onClick={() => setIsClicked(true)}
              sx={isClicked ? { mb: 2 } : {}}
              required
            />
            {isClicked && (
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="Select Date"
                  name="alert"
                  fullWidth
                  className={"alertInput" + " " + (darkMode ? " dark" : "")}
                  value={note.alert ? dayjs(note.alert) : null}
                  onChange={handleDateChange}
                  sx={{ mb: 2 }}
                  renderInput={(params) => <TextField {...params} fullWidth />}
                />
              </LocalizationProvider>
            )}

            <Zoom in={isClicked} className={"addButton" + " " + (darkMode ? " dark" : "")}>
              {update.update ? (
                <Fab onClick={handleUpdateSubmit} disabled={isLoading}>
                  <ChangeCircleIcon />
                </Fab>
              ) : (
                <Fab onClick={handleSubmit} disabled={isLoading}>
                  <AddIcon />
                </Fab>
              )}
            </Zoom>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
}

export default CreateArea;
