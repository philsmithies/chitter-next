import Navbar from "./Navbar";
import Footer from "./Footer";
import SignUpBar from "../components/SignUpBar";
import SideBar from "../components/Sidebar";
import { useSession } from "next-auth/client";

const Layout = ({ children }) => {
  const session = useSession();
  return (
    <>
      <div className="h-screen">
        <div className="flex h-full bg-white pl-5 pr-5 max-w-screen-xl m-auto">
          <SideBar />
          <div className="flex-1">{children}</div>
          <SignUpBar />
        </div>
      </div>

      {!session && <Footer />}
    </>
  );
};

export default Layout;
