import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { Box, Button, TextField } from "@mui/material";
import { theme } from "../../constants/theme";
import { LoginRequest } from "../../models/authModel";
import { useLoginMutation } from "../../services/servicesApi";
import { setCredentials } from "../../slice/authSlice";
import GoogleIcon from "@mui/icons-material/Google";
import GitHubIcon from "@mui/icons-material/GitHub";
import "../../styles/RegisterForm.css";

const LoginForm = () => {
  const navigate = useNavigate();
  const [login] = useLoginMutation();
  const dispatch = useDispatch();
  const loginUser = async (dataToSend: LoginRequest) => {
    try {
      const result = await login(dataToSend).unwrap();
      if (result.status === 200) {
        dispatch(
          setCredentials({ token: result.accessToken, user: result.user })
        );
        toast.success("Connexion réussie !");
        navigate("/home");
      } else {
        toast.error("Email ou mot de passe invalide ...");
      }
    } catch (e) {
      toast.error("Erreur lors de la connexion ...");
    }
  };
  const onSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    const target = e.target as typeof e.target & {
      email: { value: string };
      password: { value: string };
    };
    const dataToSend: LoginRequest = {
      email: target.email.value,
      password: target.password.value,
    };
    loginUser(dataToSend);
  };
  return (
    <>
      <div className="form-container">
        <div
          className="main-title-container"
          style={{ color: theme.palette.secondary }}
        >
          Connect to your account
        </div>
        <Box component="form" onSubmit={onSubmit}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="password"
            label="Password"
            name="password"
            autoComplete="password"
            type="password"
          />
          <div className="form-buttons-container">
            <Button
              className="underlined"
              onClick={() => navigate("/register")}
            >
              Don't have an account ?
            </Button>
            <Button variant="contained" className="submit-button" type="submit">
              Log In
            </Button>
          </div>
        </Box>
      </div>
      <div className="google-main-container">
        <Button
          color="primary"
          startIcon={<GoogleIcon />}
          fullWidth
          variant="outlined"
        >
          Login in with Google
        </Button>
        <Button
          color="primary"
          startIcon={<GitHubIcon />}
          fullWidth
          variant="outlined"
        >
          Login with Github
        </Button>
      </div>
    </>
  );
};

export default LoginForm;
