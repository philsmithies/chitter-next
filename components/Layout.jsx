import Navbar from "./Navbar";
import Footer from "./Footer";
import SignUpBar from "../components/SignUpBar";
import SideBar from "../components/Sidebar";

const Layout = ({ children }) => {
  return (
    <>
      <Navbar />
      <div className="bg-black h-screen w-screen">
        <div className="flex h-full bg-white justify-evenly">
          <SideBar />
          <div className="flex-1">{children}</div>
          <SignUpBar />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Layout;
