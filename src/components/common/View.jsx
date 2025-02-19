import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import ViewModuleIcon from "@mui/icons-material/ViewModule";
import TableChartIcon from "@mui/icons-material/TableChart";
import { useSelector } from "react-redux";
import {setViews} from "../../redux/slices/viewSlice";
import { useDispatch } from "react-redux";
import "../../styles/View.css";

export default function View() {
  const dispatch = useDispatch();
  const view = useSelector((state) => state.view.views);
  const darkMode = useSelector((state) => state.settings.darkMode);

  const handleViewChange = async(event, newView) => {
    if (newView !== null) {
     dispatch(setViews(newView));
    }
  };

  return (
    <ToggleButtonGroup
      value={view}
      exclusive
      onChange={handleViewChange}
      aria-label="View mode"
      sx={{ display: "flex", gap: 1 }}
    >
      <ToggleButton
        value="card"
        aria-label="Card View"
        className={"viewButton" + (darkMode ? " dark" : "")}
      >
        <ViewModuleIcon
          className={darkMode ? "iconView dark" : "iconView"}
        />
      </ToggleButton>
      <ToggleButton
        value="table"
        aria-label="Table View"
        className={"viewButton" + (darkMode ? " dark" : "")}
      >
        <TableChartIcon
          className={darkMode ? "iconView dark" : "iconView"}
        />
      </ToggleButton>
    </ToggleButtonGroup>
  );
}