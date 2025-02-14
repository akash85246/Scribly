import { useEffect } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import { openToast } from "../../redux/slices/toastSlice";
import { openUpdateMode } from "../../redux/slices/updateSlice";
import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditNoteIcon from "@mui/icons-material/EditNote";
import { Star, StarBorder } from "@mui/icons-material";
import { logout } from "../../redux/slices/authSlice";
import { clearUser } from "../../redux/slices/userSlice";
import { deleteSetting } from "../../redux/slices/settingsSlice";

import { useSelector, useDispatch } from "react-redux";
import "../../styles/Note.css";
import axios from "axios";
import {
  addNote,
  setNotes,
  deleteNote,
  updateNote,
} from "../../redux/slices/noteSlice";

function Note() {
  const dispatch = useDispatch();
  const notes = useSelector((state) => state.note.notes);
  const jwt = useSelector((state) => state.auth.jwt);

  const handleToastClick = (s, m) => {
    dispatch(
      openToast({
        message: m,
        severity: s,
      })
    );
  };

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/note/all`,
          {
            withCredentials: true,
            headers: {
              Authorization: `Bearer ${jwt}`,
            },
          }
        );
        const data = response.data.notes;

        data.map((note) => {
          dispatch(
            addNote({
              id: note.id,
              title: note.title,
              content: note.content,
              alert: note.alert,
              title_markdown: note.title_markdown,
              content_markdown: note.content_markdown,
              position: note.position,
            })
          );
        });
        dispatch(setNotes(data));
      } catch (err) {
        if (err.response && err.response.status === 403) {
          dispatch(logout());
          dispatch(clearUser());
          dispatch(deleteSetting());
        }
      }
    };

    fetchNotes();
  }, [dispatch, jwt]);

  async function handleNoteDelete(id) {
    dispatch(
      deleteNote({
        id: id,
      })
    );
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
      {notes.map((note) => (
        <div className="note" key={note.id}>
          <div className="note-title">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[rehypeRaw]}
            >
              {note.title_markdown}
            </ReactMarkdown>
          </div>
          <div className="note-content">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[rehypeRaw]}
            >
              {note.content_markdown}
            </ReactMarkdown>
          </div>

          <IconButton
            onClick={() => setStarred(note.id)}
            className="note-button star-button"
          >
            {note.star == true ? <Star color="warning" /> : <StarBorder />}
          </IconButton>
          <button
            className="note-button"
            onClick={() => {
              handleEditNote(
                note.id,
                note.title,
                note.content,
                note.alert,
                note.position
              );
            }}
            id={note.id}
          >
            <EditNoteIcon />
          </button>

          <button
            className="note-button"
            onClick={() => {
              handleNoteDelete(note.id);
            }}
            id={note.id}
          >
            <DeleteIcon />
          </button>
        </div>
      ))}
    </>
  );
}

export default Note;
