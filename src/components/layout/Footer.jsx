import Toast from "../common/Toast";
import "../../styles/Footer.css";
function Footer() {
  const year = new Date().getFullYear();
  return (
    <>
      <Toast />
      <footer>
        <p>Copyright ⓒ {year}</p>
      </footer>
    </>
  );
}

export default Footer;
