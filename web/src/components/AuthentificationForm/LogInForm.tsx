import { Box, Button, TextField } from "@mui/material";
import { theme } from "../../constants/theme";
import "../../styles/RegisterForm.css";

interface Props {
  setIsRegisterForm: any;
}

const LogInForm = ({ setIsRegisterForm }: Props) => {
  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log(data.get("email"));
  };
  return (
    <div className="form-container">
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
        <TextField
          margin="normal"
          required
          fullWidth
          id="firstname"
          label="FirstName"
          name="firstname"
          autoComplete="firstname"
          autoFocus
        />
        <TextField
          margin="normal"
          required
          fullWidth
          id="lastname"
          label="Lastname"
          name="lastname"
          autoComplete="lastname"
          autoFocus
        />
        <div className="form-buttons-container">
          <Button className="underlined" onClick={() => setIsRegisterForm(true)}>
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

export default LogInForm;
