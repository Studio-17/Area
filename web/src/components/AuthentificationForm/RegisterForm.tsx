import { Alert, Box, Button, Snackbar, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { theme } from "../../constants/theme";
import { RegisterRequest } from "../../models/authModel";
import { useRegisterMutation } from "../../services/servicesApi";

import { useAppDispatch, useAppSelector } from "../../store/store";
import "../../styles/RegisterForm.css";
import { registerUser } from "../../slice/authSlice";
import { RootState } from "../../store/store";

const RegisterForm = () => {
  const { loading, user, error, success } = useAppSelector(
    (state: RootState) => state.auth
  );

  const dispatch = useAppDispatch();

  const navigate = useNavigate();
  const [isSuccessfullRegister, setIsSuccessfullRegister] =
    useState<boolean>(false);
  const [isErrorRegister, setIsErrorRegister] = useState<boolean>(false);

  useEffect(() => {
    if (success) navigate("/login");
  }, [navigate, user, success]);

  const registerNewUser = async (data: RegisterRequest) => {
    dispatch(registerUser(data));
  };

  const onSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    const target = e.target as typeof e.target & {
      firstname: { value: string };
      lastname: { value: string };
      email: { value: string };
      password: { value: string };
    };
    const dataToSend: RegisterRequest = {
      firstName: target.firstname.value,
      lastName: target.lastname.value,
      email: target.email.value,
      password: target.password.value,
    };
    registerNewUser(dataToSend);
  };
  return (
    <div className="form-container">
      <Snackbar
        open={isSuccessfullRegister}
        onClose={() => setIsSuccessfullRegister(false)}
      >
        <Alert severity="success">Votre compte a bien été crée !</Alert>
      </Snackbar>
      <Snackbar
        open={isErrorRegister}
        onClose={() => setIsErrorRegister(false)}
      >
        <Alert severity="error">Erreur lors de la création du compte ...</Alert>
      </Snackbar>
      <div
        className="main-title-container"
        style={{ color: theme.palette.secondary }}
      >
        Create an account
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
        <TextField
          margin="normal"
          required
          fullWidth
          id="firstname"
          label="FirstName"
          name="firstname"
          autoComplete="firstname"
        />
        <TextField
          margin="normal"
          required
          fullWidth
          id="lastname"
          label="Lastname"
          name="lastname"
          autoComplete="lastname"
        />
        <div className="form-buttons-container">
          <Button className="underlined" onClick={() => navigate("/login")}>
            Already have an account ?
          </Button>
          <Button variant="contained" className="submit-button" type="submit">
            Create account
          </Button>
        </div>
      </Box>
    </div>
  );
};

export default RegisterForm;
