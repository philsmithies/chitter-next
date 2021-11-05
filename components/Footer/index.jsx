import Composer from "../../public/assets/composer-icon.svg";
import styles from "./Footer.module.css";

const Footer = () => {
  return (
    <div className="relative">
      {/* <div className="fill-current text-yellow-300 p-10">
        <button>
          <Composer className="w-12 fixed bottom-24 right-52 border-2 rounded-full bg-white" />
        </button>
      </div> */}
      <div className={styles.footerWrapper}>
        <div className="flex">
          <div className="flex flex-col mr-24">
            <h2 className="font-extrabold">Don't miss what's happening.</h2>
            <p>People on Chitter are the first to know.</p>
          </div>
          <div className="flex items-center">
            <a href="/auth/signup" className={styles.footerBtn}>
              Sign Up
            </a>
            <a href="/auth/signin" className={styles.footerBtn}>
              Log In
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
