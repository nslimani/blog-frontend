import "../styles/globals.css";
import { AppContextProvider } from "../components/AppContext";
import { Navbar } from "../components/NavBar.jsx";
function MyApp({ Component, pageProps, ...otherProps }) {
  return (
    <AppContextProvider>
      <Navbar />
      <Component {...pageProps} {...otherProps} />
    </AppContextProvider>
  );
}

export default MyApp;
