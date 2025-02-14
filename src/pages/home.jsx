import Navbar from "../components/layout/Navbar";
import { useSelector } from "react-redux";
import Footer from "../components/layout/Footer";
import CreateArea from "../components/common/CreateArea";
import Note from "../components/common/Note";
import Login from "../components/common/Login";

export default function Home() {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  return (
    <>
      <Navbar />
      {isAuthenticated ? (
        <>
          <CreateArea></CreateArea>
          <Note></Note>
        </>
      ) : (
        <Login />
      )}
      <Footer />
    </>
  );
}
