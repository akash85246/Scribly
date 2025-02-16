import { useSelector} from "react-redux";
import Toast from "../common/Toast";
import "../../styles/Footer.css";
function Footer() {
  const darkMode = useSelector((state) => state.settings.darkMode);

  const year = new Date().getFullYear();
  return (
    <>
      <Toast />
      <footer className={darkMode ? "dark" : ""}>
        <p>Copyright ⓒ {year}</p>
      </footer>
    </>
  );
}

export default Footer;
