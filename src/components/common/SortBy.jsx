import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import TitleIcon from "@mui/icons-material/Title";
import EventIcon from "@mui/icons-material/Event";
import StorageIcon from "@mui/icons-material/Storage";
import NotificationImportantIcon from "@mui/icons-material/NotificationImportant";
import { useState } from "react";
import { useSelector } from "react-redux";
import "../../styles/SortBy.css";
export default function SortBy() {
  const [sortBy, setSortBy] = useState(null);
  const darkMode = useSelector((state) => state.settings.darkMode);

  const handleSortChange = (event, newSort) => {
    if (newSort !== null) {
      setSortBy(newSort);
    }
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
        <StorageIcon
          className={"iconSortBy" + " " + (darkMode ? "dark" : "")}
        />
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
