import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  notes: JSON.parse(localStorage.getItem("notes")) || [],
};

const noteSlice = createSlice({
  name: "note",
  initialState,
  reducers: {
    setNotes: (state, action) => {
      state.notes = action.payload;
      localStorage.setItem("notes", JSON.stringify(action.payload));
    },
    addNote: (state, action) => {
      const newNote = {
        id:action.payload.id ,
        position: action.payload.position,
        title: action.payload.title,
        alert: action.payload.alert,
        content: action.payload.content,
        title_markdown: action.payload.title_markdown ,
        content_markdown: action.payload.content_markdown ,
        star: action.payload.star,
      };
      state.notes.push(newNote); 
      localStorage.setItem("notes", JSON.stringify(state.notes)); 
    },

    updateNote: (state, action) => {
      const index = state.notes.findIndex((note) => note.id === action.payload.id);
      console.log(index);
      if (index !== -1) {
        state.notes[index] = { ...state.notes[index], ...action.payload }; 
        console.log(state.notes[index]);
        localStorage.setItem("notes", JSON.stringify(state.notes));
      }
    },

    deleteNote: (state, action) => {
      state.notes = state.notes.filter((note) => note.id !== action.payload.id);
      localStorage.setItem("notes", JSON.stringify(state.notes));
    },

    clearNotes: (state) => {
      state.notes = [];
      localStorage.removeItem("notes");
    },

  },
});

export const { setNotes,addNote, updateNote, deleteNote, clearNotes } = noteSlice.actions;
export default noteSlice.reducer;