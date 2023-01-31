import RegisterForm from "../components/AuthentificationForm/RegisterForm";
import { theme } from "../constants/theme";
import "../styles/Authentification.css";

const Register = () => {
  return (
    <div
      className="authentification-main-container"
      style={{ backgroundColor: theme.palette.background }}
    >
      <RegisterForm />
    </div>
  );
};

export default Register;
