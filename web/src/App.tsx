import Header from "./components/Header/Header";
import { createTheme, ThemeProvider } from "@mui/material";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";

import HeaderApp from "./components/Header/HeaderApp";
import LandingPage from "./pages/LandingPage";
import ListOfAreas from "./pages/ListOfAreas";
import NewArea from "./pages/NewArea";
import { Provider } from "react-redux";
import { store } from "./store/store";
import { theme } from "./constants/theme";
import "./App.css";
import Area from "./pages/Area";
import Register from "./pages/Register";
import Login from "./pages/Login";
import UserProfile from "./pages/UserProfile";

const GOOGLE_CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID;

const themeMUI = createTheme({
  palette: {
    primary: {
      main: "#0165F5",
    },
    secondary: {
      main: "#a37c5b",
    },
    warning: {
      main: "#FFF7FA",
    },
  },
});

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <Header />
        <LandingPage />
      </>
    ),
  },
  {
    path: "/home",
    element: (
      <>
        <HeaderApp />
        <ListOfAreas />
      </>
    ),
  },
  {
    path: "/new-area",
    element: (
      <>
        <HeaderApp />
        <NewArea />
      </>
    ),
  },
  {
    path: "/register",
    element: (
      <>
        <Register />
      </>
    ),
  },
  {
    path: "/login",
    element: (
      <>
        <Login />
      </>
    ),
  },
  {
    path: `/area/:areaId`,
    element: (
      <>
        <HeaderApp />
        <Area />
      </>
    ),
  },
  {
    path: "/user-profile",
    element: (
      <>
        <HeaderApp />
        <UserProfile />
      </>
    ),
  },
]);

function App() {
  return (
    <ThemeProvider theme={themeMUI}>
      <div
        className="App"
        style={{ backgroundColor: theme.palette.background }}
      >
        <Provider store={store}>
          <GoogleOAuthProvider
            clientId={GOOGLE_CLIENT_ID ? GOOGLE_CLIENT_ID : ""}
          >
            <RouterProvider router={router} />
          </GoogleOAuthProvider>
        </Provider>
      </div>
    </ThemeProvider>
  );
}

export default App;
