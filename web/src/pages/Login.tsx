import LogInForm from "../components/AuthentificationForm/LoginForm";
import { theme } from "../constants/theme";
import "../styles/Authentification.css";

const Login = () => {
  return (
    <div
      className="authentification-main-container"
      style={{ backgroundColor: theme.palette.background }}
    >
      <LogInForm />
    </div>
  );
};

export default Login;
