import { useState } from "react";
import LogInForm from "../components/AuthentificationForm/LogInForm";
import RegisterForm from "../components/AuthentificationForm/RegisterForm";
import { theme } from "../constants/theme";
import "../styles/Authentification.css";

const Authentification = () => {
  const [isRegisterForm, setIsRegisterForm] = useState<boolean>(false);
  return (
    <div
      className="authentification-main-container"
      style={{ backgroundColor: theme.palette.background }}
    >
      {isRegisterForm ? <RegisterForm setIsRegisterForm={setIsRegisterForm}/> : <LogInForm setIsRegisterForm={setIsRegisterForm} />}
    </div>
  );
};

export default Authentification;
