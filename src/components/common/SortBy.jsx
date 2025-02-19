import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import TitleIcon from "@mui/icons-material/Title";
import EventIcon from "@mui/icons-material/Event";
import StorageIcon from "@mui/icons-material/Storage";
import NotificationImportantIcon from "@mui/icons-material/NotificationImportant";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import "../../styles/SortBy.css";
import { setNotes } from "../../redux/slices/noteSlice"; // Import your action to update notes

export default function SortBy() {
  const [sortBy, setSortBy] = useState(null);
  const darkMode = useSelector((state) => state.settings.darkMode);
  const notes = useSelector((state) => state.note.notes);
  const dispatch = useDispatch();

  const handleSortChange = (event, newSort) => {
    if (newSort !== null) {
      setSortBy(newSort);
      sortNotes(newSort);
    }
  };

  const sortNotes = (criteria) => {
    let sortedNotes = [...notes];

    sortedNotes.sort((a, b) => {
      // Prioritize starred notes first
      if (b.star && !a.star) return 1;
      if (a.star && !b.star) return -1;

      // Apply the selected sorting criteria within each group
      switch (criteria) {
        case "title":
          return a.title_markdown.localeCompare(b.title_markdown);
        case "date":
          return new Date(b.created_at) - new Date(a.created_at); // Newest first
        case "size":
          return b.content_markdown.length - a.content_markdown.length; // Longest first
        case "alert":
          return (b.alert || 0) - (a.alert || 0); // Higher alert first
        default:
          return 0;
      }
    });

    dispatch(setNotes(sortedNotes)); // Update Redux store with sorted notes
  };

  return (
    <ToggleButtonGroup
      value={sortBy}
      exclusive
      onChange={handleSortChange}
      aria-label="Sort by"
      sx={{ display: "flex", gap: 1 }}
    >
      <ToggleButton
        value="title"
        aria-label="Sort by title"
        className={"sortByButton" + (darkMode ? " dark" : "")}
      >
        <TitleIcon className={"iconSortBy" + " " + (darkMode ? "dark" : "")} />
      </ToggleButton>
      <ToggleButton
        value="date"
        aria-label="Sort by date"
        className={"sortByButton" + (darkMode ? " dark" : "")}
      >
        <EventIcon className={"iconSortBy" + " " + (darkMode ? "dark" : "")} />
      </ToggleButton>
      <ToggleButton
        value="size"
        aria-label="Sort by size"
        className={"sortByButton" + (darkMode ? " dark" : "")}
      >
        <StorageIcon className={"iconSortBy" + " " + (darkMode ? "dark" : "")} />
      </ToggleButton>
      <ToggleButton
        value="alert"
        aria-label="Sort by alert"
        className={"sortByButton" + (darkMode ? " dark" : "")}
      >
        <NotificationImportantIcon
          className={"iconSortBy" + " " + (darkMode ? "dark" : "")}
        />
      </ToggleButton>
    </ToggleButtonGroup>
  );
}