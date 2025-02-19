import { useSelector, useDispatch } from "react-redux";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Tooltip,
  Modal,
  Box,
  Typography,
  Button,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import { Star, StarBorder } from "@mui/icons-material";
import EditNoteIcon from "@mui/icons-material/EditNote";
import { useState } from "react";
import ReactMarkdown from "react-markdown";
import axios from "axios";
import { deleteNote, updateNote, setNotes } from "../../redux/slices/noteSlice";
import { openUpdateMode } from "../../redux/slices/updateSlice";
import { logout } from "../../redux/slices/authSlice";
import { clearUser } from "../../redux/slices/userSlice";
import { deleteSetting } from "../../redux/slices/settingsSlice";
import { openToast } from "../../redux/slices/toastSlice";
import "../../styles/NoteTable.css";

export default function NoteTable() {
  const dispatch = useDispatch();
  const jwt = useSelector((state) => state.auth.jwt);
  const notes = useSelector((state) => state.note.notes);
  const darkMode = useSelector((state) => state.settings.darkMode);
  const drag = useSelector((state) => state.settings.drag);
  const [selectedNote, setSelectedNote] = useState(null);
  const [draggedNote, setDraggedNote] = useState(null);

  const handleToastClick = (s, m) => {
    dispatch(
      openToast({
        message: m,
        severity: s,
      })
    );
  };

  const handleDragStart = (e, noteId) => {
    setDraggedNote(noteId);
    const note=document.getElementById(noteId);
    note.style.opacity = "0.4";
    e.dataTransfer.effectAllowed = "move";
   
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = async (e, targetId) => {
    e.preventDefault();
    if (!draggedNote || draggedNote === targetId) return;

    const updatedNotes = notes.map((note) => ({ ...note }));

    const draggedIndex = updatedNotes.findIndex((n) => n.id === draggedNote);
    const targetIndex = updatedNotes.findIndex((n) => n.id === targetId);

    if (draggedIndex === -1 || targetIndex === -1) return;
    if (notes[draggedIndex].star != notes[targetIndex].star) {
      handleToastClick("error", "Cannot swap starred and unstarred notes!");
      return;
    }

    // Swap positions
    const tempPosition = updatedNotes[draggedIndex].position;
    updatedNotes[draggedIndex].position = updatedNotes[targetIndex].position;
    updatedNotes[targetIndex].position = tempPosition;

    // Swap elements
    [updatedNotes[draggedIndex], updatedNotes[targetIndex]] = [
      updatedNotes[targetIndex],
      updatedNotes[draggedIndex],
    ];

    const prevNotes = notes.map((note) => ({ ...note }));
    dispatch(setNotes(updatedNotes));

    const note=document.getElementById(draggedNote);
    note.style.opacity = "1";
    // Reset dragged item
    setDraggedNote(null);

    await axios
      .put(
        `${import.meta.env.VITE_BACKEND_URL}/api/note/position`,
        {
          id1: updatedNotes[draggedIndex].id,
          id2: updatedNotes[targetIndex].id,
        },
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
          withCredentials: true,
        }
      )
      .then((response) => {
        if (response.status == 200) {
          handleToastClick("success", "Note swapped successfully!");
          return;
        }
        dispatch(setNotes(prevNotes));
      })
      .catch((err) => {
        if (err.response && err.response.status === 403) {
          dispatch(logout());
          dispatch(clearUser());
          dispatch(deleteSetting());
        }
        handleToastClick("error", "Failed to swap note!");
        dispatch(setNotes(prevNotes));
      });
  };

  const handleOpen = (note) => {
    setSelectedNote(note);
  };

  const handleClose = () => {
    setSelectedNote(null);
  };

  const truncateText = (text, length = 50) => {
    return text.length > length ? text.substring(0, length) + "..." : text;
  };

  async function handleNoteDelete(id) {
    dispatch(
      deleteNote({
        id: id,
      })
    );
    handleClose();
    await axios
      .delete(`${import.meta.env.VITE_BACKEND_URL}/api/note/delete`, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
        data: { id: id },
        withCredentials: true,
      })
      .then((response) => {
        if (response.status == 200) {
          handleToastClick("success", "Note deleted successfully!");
          handleClose();
        }
      })
      .catch((err) => {
        console.error("Error deleting note:", err);
        if (err.response && err.response.status === 403) {
          dispatch(logout());
          dispatch(clearUser());
          dispatch(deleteSetting());
        }
        handleToastClick("error", "Failed to delete note!");
      });
  }

  async function handleEditNote(id, title, content, alert, position) {
    dispatch(
      openUpdateMode({
        id: id,
        text: title,
        content: content,
        alert: alert,
        position: position,
      })
    );
    handleClose();
  }

  async function setStarred(id) {
    const note = notes.find((note) => note.id === id);
    const star = note.star;

    await axios
      .put(
        `${import.meta.env.VITE_BACKEND_URL}/api/note/mark`,
        {
          id: id,
          star: !star,
        },
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
          withCredentials: true,
        }
      )
      .then((response) => {
        const note = response.data.note;
        if (response.status == 200) {
          handleClose();
          dispatch(updateNote(note));
          handleToastClick("success", "Note updated successfully!");
        }
      })
      .catch((err) => {
        if (err.response && err.response.status === 403) {
          dispatch(logout());
          dispatch(clearUser());
          dispatch(deleteSetting());
        }
        handleToastClick("error", "Failed to update note!");
      });
  }
  return (
    <>
      <TableContainer
        component={Paper}
        className={"table-container" + " " + (darkMode ? "dark" : "light")}
      >
        <Table>
          <TableHead className="table-head">
            <TableRow sx={{ backgroundColor: darkMode ? "#444" : "#ddd" }}>
              <TableCell
                sx={{
                  color: darkMode ? "#fff" : "#000",
                  width: "50px",
                  padding: "auto 5px",
                }}
              >
                Star
              </TableCell>
              <TableCell
                sx={{ color: darkMode ? "#fff" : "#000", minWidth: "250px" }}
              >
                Title
              </TableCell>
              <TableCell
                sx={{ color: darkMode ? "#fff" : "#000", minWidth: "400px" }}
              >
                Note
              </TableCell>
              <TableCell
                sx={{ color: darkMode ? "#fff" : "#000", minWidth: "150px" }}
              >
                Alert
              </TableCell>
              <TableCell
                sx={{
                  color: darkMode ? "#fff" : "#000",
                  width: "80px",
                  padding: "auto 5px",
                  display: "flex",
                  justifyContent: "center",
                  gap: "10px",
                }}
              >
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {notes.map((note, index) => (
              <TableRow
                key={index}
                id={note.id}
                draggable={drag}
                onDragStart={
                  drag ? (e) => handleDragStart(e, note.id) : undefined
                }
                onDragOver={drag ? handleDragOver : undefined}
                onDrop={drag ? (e) => handleDrop(e, note.id) : undefined}
              >
                <TableCell
                  sx={{
                    color: darkMode ? "#fff" : "#000",
                    width: "50px",
                    padding: "0 5px",
                  }}
                >
                  <IconButton
                    onClick={() => setStarred(note.id)}
                    className="note-button star-button"
                  >
                    {note.star == true ? <Star /> : <StarBorder />}
                  </IconButton>
                </TableCell>
                <TableCell
                  sx={{ color: darkMode ? "#ddd" : "#000", minWidth: "250px" }}
                >
                  <Tooltip
                    title=<ReactMarkdown
                      remarkPlugins={[remarkGfm]}
                      rehypePlugins={[rehypeRaw]}
                    >
                      {note.title_markdown}
                    </ReactMarkdown>
                    arrow
                  >
                    <span
                      style={{
                        cursor: "pointer",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        display: "block",
                        maxWidth: "200px",
                      }}
                      onClick={() => handleOpen(note)}
                    >
                      <ReactMarkdown
                        remarkPlugins={[remarkGfm]}
                        rehypePlugins={[rehypeRaw]}
                        className="tool-tip-content"
                      >
                        {truncateText(note.title_markdown, 50)}
                      </ReactMarkdown>
                    </span>
                  </Tooltip>
                </TableCell>
                <TableCell
                  sx={{ color: darkMode ? "#ddd" : "#000", minWidth: "400px" }}
                >
                  <Tooltip
                    title=<ReactMarkdown
                      remarkPlugins={[remarkGfm]}
                      rehypePlugins={[rehypeRaw]}
                      className="tool-tip-content"
                    >
                      {note.content_markdown}
                    </ReactMarkdown>
                    arrow
                  >
                    <span
                      style={{
                        cursor: "pointer",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        display: "block",
                        maxWidth: "350px",
                      }}
                      onClick={() => handleOpen(note)}
                    >
                      <ReactMarkdown
                        remarkPlugins={[remarkGfm]}
                        rehypePlugins={[rehypeRaw]}
                      >
                        {truncateText(note.content_markdown, 50)}
                      </ReactMarkdown>
                    </span>
                  </Tooltip>
                </TableCell>
                <TableCell
                  sx={{ color: darkMode ? "#ddd" : "#000", minWidth: "150px" }}
                >
                  {note.alert
                    ? new Date(note.alert).toLocaleString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })
                    : "None"}
                </TableCell>
                <TableCell className="actionsButton">
                  <IconButton
                    className="action-button"
                    onClick={() => handleNoteDelete(note.id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                  <IconButton
                    className="action-button"
                    onClick={() =>
                      handleEditNote(
                        note.id,
                        note.title,
                        note.content,
                        note.alert,
                        note.position
                      )
                    }
                  >
                    <EditNoteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* MODAL FOR FULL NOTE VIEW */}
      <Modal
        open={!!selectedNote}
        onClose={handleClose}
        aria-labelledby="note-modal"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 500,
            bgcolor: darkMode ? "#222" : "#fff",
            boxShadow: 24,
            p: 3,
            borderRadius: 2,
            color: darkMode ? "#fff" : "#000",
          }}
        >
          {selectedNote && (
            <>
              <Typography variant="h6" sx={{ mb: 2 }} className="modal-title">
                <IconButton
                  onClick={() => setStarred(selectedNote.id)}
                  className="note-button star-button"
                >
                  {selectedNote &&
                  notes.find((note) => note.id === selectedNote.id)?.star ? (
                    <Star />
                  ) : (
                    <StarBorder />
                  )}
                </IconButton>
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  rehypePlugins={[rehypeRaw]}
                  className={"markdown"}
                >
                  {selectedNote.title_markdown}
                </ReactMarkdown>
              </Typography>
              <Box
                sx={{ maxHeight: "400px", overflowY: "auto" }}
                className="modal-content"
              >
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  rehypePlugins={[rehypeRaw]}
                  className={"markdown"}
                >
                  {selectedNote.content_markdown}
                </ReactMarkdown>
              </Box>
              <Box
                sx={{ display: "flex", justifyContent: "space-between", mt: 3 }}
              >
                <Button
                  variant="contained"
                  startIcon={<EditNoteIcon />}
                  className="modal-edit-button"
                  onClick={() =>
                    handleEditNote(
                      selectedNote.id,
                      selectedNote.title,
                      selectedNote.content,
                      selectedNote.alert,
                      selectedNote.position
                    )
                  }
                >
                  Edit
                </Button>
                <Button
                  variant="contained"
                  startIcon={<DeleteIcon />}
                  className="modal-delete-button"
                  onClick={() => handleNoteDelete(selectedNote.id)}
                >
                  Delete
                </Button>
              </Box>
            </>
          )}
        </Box>
      </Modal>
    </>
  );
}
