import { Alert, Box, Button, Snackbar, TextField } from "@mui/material";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { theme } from "../../constants/theme";
import { LoginRequest } from "../../models/authModel";
import { useLoginMutation } from "../../services/servicesApi";
import { setCredentials } from "../../slice/authSlice";
import "../../styles/RegisterForm.css";

const LoginForm = () => {
  const navigate = useNavigate();
  const [isErrorLogin, setIsErrorLogin] = useState<boolean>(false);
  const [login] = useLoginMutation();
  const dispatch = useDispatch();
  const loginUser = async (dataToSend: LoginRequest) => {
    try {
      const result = await login(dataToSend).unwrap();
      if (result.status !== 200) {
        setIsErrorLogin(true);
      }
      dispatch(
        setCredentials({ token: result.accessToken, user: result.user })
      );
      navigate("/home");
    } catch (e) {
      setIsErrorLogin(true);
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
    <div className="form-container">
      <Snackbar open={isErrorLogin} onClose={() => setIsErrorLogin(false)}>
        <Alert onClose={() => setIsErrorLogin(false)} severity="error">
          La connexion a échoué ...
        </Alert>
      </Snackbar>
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
  );
};

export default LoginForm;
