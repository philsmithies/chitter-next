import Navbar from "./Navbar";
import Footer from "./Footer";
import SignUpBar from "../components/SignUpBar";
import SideBar from "../components/Sidebar";

const Layout = ({ children }) => {
  return (
    <>
      <Navbar />
      <div className="h-screen">
        <div className="flex h-full bg-white pl-5 pr-5 max-w-screen-xl m-auto">
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
