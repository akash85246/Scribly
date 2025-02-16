import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import UserInfo from "../components/common/UserInfo";
import SettingInfo from "../components/common/SettingInfo";


export default function Home() {
  return (
    <>
      <Navbar />
      <UserInfo/>
      <SettingInfo/>
      <Footer />
    </>
  );
}
