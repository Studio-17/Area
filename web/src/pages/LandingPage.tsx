import { useNavigate } from "react-router-dom";
import { theme } from "../constants/theme";
import logo from "../assets/areacoon.png";
import BigRoundedButton from "../components/Buttons/BigRoundedButton";
import "../styles/LandingPage.css";

const LandingPage = () => {
  const navigate = useNavigate();
  return (
    <div
      className="landing-page-main-container"
      style={{
        backgroundColor: theme.palette.background,
        color: theme.palette.secondary,
      }}
    >
      <div className="logo-container">
        <img src={logo} alt="reaccoon"></img>
      </div>
      <div className="main-text-container">
        <div className="welcome-text">
          Welcome dear visitor ! <br /> You found the most usefull app on the
          market !{" "}
        </div>
        <div className="landing-page-buttons-container">
          <BigRoundedButton
            label={"Try for free"}
            color={"primary"}
            onClick={() => navigate("/home")}
          />
          <BigRoundedButton
            label={"Download SDK"}
            color={"primary"}
            onClick={() => navigate("/client.apk")}
          />
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
