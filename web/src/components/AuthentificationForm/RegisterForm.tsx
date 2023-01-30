import { Box, Button, TextField } from "@mui/material";
import { theme } from "../../constants/theme";
import "../../styles/RegisterForm.css";

interface Props {
  setIsRegisterForm: any;
}

const RegisterForm = ({ setIsRegisterForm }: Props) => {
  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log(data.get("password"));
  };
  return (
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
          autoFocus
        />
        <TextField
          margin="normal"
          required
          fullWidth
          id="password"
          label="Password"
          name="password"
          autoComplete="password"
          autoFocus
        />
        <div className="form-buttons-container">
          <Button
            className="underlined"
            onClick={() => setIsRegisterForm(false)}
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

export default RegisterForm;
