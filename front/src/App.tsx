import Header from "./components/Header/Header";
import { createTheme, ThemeProvider } from "@mui/material";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import HeaderApp from "./components/Header/HeaderApp";
import LandingPage from "./pages/LandingPage";
import ListOfAreas from "./pages/ListOfAreas";
import NewArea from "./pages/NewArea";
import { Provider } from "react-redux";
import { store } from "./store/store";
import "./App.css";
import Authentification from "./pages/Authentification";

const theme = createTheme({
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
    path: "/authentification",
    element: (
      <>
      <HeaderApp />
      <Authentification />
      </>
    )
  }
]);

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <Provider store={store}>
          <RouterProvider router={router} />
        </Provider>
      </div>
    </ThemeProvider>
  );
}

export default App;
