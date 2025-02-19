import Navbar from "../components/layout/Navbar";
import { useSelector } from "react-redux";
import Footer from "../components/layout/Footer";
import CreateArea from "../components/common/CreateArea";
import Note from "../components/common/Note";
import Login from "../components/common/Login";
import View from "../components/common/View";
import SortBy from "../components/common/SortBy";
import NoteTable from "../components/common/NoteTable";
import "../styles/Home.css";
export default function Home() {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const views = useSelector((state) => state.view.views);
  return (
    <>
      <Navbar />
      {isAuthenticated ? (
        <>
          <div className="view-container">
            <View />
            <SortBy />
          </div>
          <CreateArea></CreateArea>
          {views === "card" ? <Note /> : <NoteTable />}
        </>
      ) : (
        <Login />
      )}
      <Footer />
    </>
  );
}
