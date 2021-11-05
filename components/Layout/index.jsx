import Footer from "../Footer";
import SignUpBar from "../SignUpBar";
import SideBar from "../Sidebar";
import { useSession } from "next-auth/client";
import styles from "./layout.module.css";

const Layout = ({ children }) => {
  const session = useSession();
  return (
    <>
      <div className="h-screen">
        <div className={styles.layoutWrapper}>
          <SideBar />
          <div className="flex-1">{children}</div>
          <SignUpBar />
        </div>
      </div>
      {session[0] == null ? <Footer /> : ""}
    </>
  );
};

export default Layout;
