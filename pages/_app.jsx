import "tailwindcss/tailwind.css";
import { Provider } from "next-auth/client";

function MyApp({ Component, pageProps }) {
  const getLayout = Component.getLayout || ((page) => page);
  return (
    <Provider
      options={{
        clientMaxAge: 0,
        keepAlive: 0,
      }}
      session={pageProps.session}
    >
      {getLayout(<Component {...pageProps} />)}
    </Provider>
  );
}

export default MyApp;
