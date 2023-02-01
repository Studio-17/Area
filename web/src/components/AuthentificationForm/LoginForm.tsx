import React, { useEffect } from "react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { GoogleLogin } from "@react-oauth/google";
import { Box, Button, TextField } from "@mui/material";
import { theme } from "../../constants/theme";
import { LoginRequest } from "../../models/authModel";
import { useLoginMutation } from "../../services/servicesApi";
import { setCredentials, loginUser } from "../../slice/authSlice";
import "../../styles/RegisterForm.css";
import { RootState, useAppDispatch, useAppSelector } from "../../store/store";

const LoginForm = () => {
  const navigate = useNavigate();
  const { loading, error, user } = useAppSelector(
    (state: RootState) => state.auth
  );
  const dispatch = useAppDispatch();
  const dispatchLoginUser = async (dataToSend: LoginRequest) => {
    dispatch(loginUser(dataToSend));
  };

  useEffect(() => {
    if (user) {
      toast.success("Connexion réussie !")
      navigate("/home");
      console.log(user);
    }
  }, [navigate, user]);

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
    dispatchLoginUser(dataToSend);
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
        {/* <Button
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
  </Button> */}
        <GoogleLogin
          onSuccess={(credentialResponse) => {
            console.log(credentialResponse);
          }}
          onError={() => console.log("login failed")}
        />
      </div>
    </>
  );
};

export default LoginForm;
