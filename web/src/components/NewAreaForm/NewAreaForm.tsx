import { Box, Button, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { theme } from "../../constants/theme";
import { useAddAreaMutation } from "../../services/servicesApi";
import "../../styles/RegisterForm.css";

interface Props {
  blocksState: any;
}

const NewAreaForm = ({ blocksState }: Props) => {
  const navigate = useNavigate();
  const [addArea] = useAddAreaMutation();

  const onSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    const reactions: any = [];
    blocksState
      .filter((value: any, index: number) => index !== 0)
      .map((block: any) => reactions.push(block.uuid));
    const target = e.target as typeof e.target & {
      name: { value: string };
      hour: { value: number };
      minute: { value: number };
      second: { value: number };
    };
    const areaToSend = {
      action: blocksState[0].uuid,
      reactions: reactions,
      name: target?.name.value,
      hour: target?.hour.value.toString() && target?.hour.value.toString(),
      minute: target?.minute.value.toString() && target?.minute.value.toString(),
      second: target?.second.value.toString() && target?.second.value.toString(),
    };
    addArea(areaToSend);
    navigate("/home");
  };
  return (
    <>
      <div className="form-container">
        <div
          className="main-title-container"
          style={{ color: theme.palette.secondary }}
        >
          Customize your area
        </div>
        <Box component="form" onSubmit={onSubmit}>
          <TextField
            margin="normal"
            fullWidth
            id="name"
            label="Name"
            name="name"
            autoComplete="name"
            required
          />
          <TextField
            margin="normal"
            fullWidth
            id="hour"
            label="Hours"
            name="hour"
            type="number"
            autoComplete="name"
            required
          />
          <TextField
            margin="normal"
            fullWidth
            id="minute"
            label="Minutes"
            name="minute"
            autoComplete="name"
            required
          />
          <TextField
            margin="normal"
            fullWidth
            id="seconds"
            label="Seconds"
            name="second"
            autoComplete="name"
            required
          />
          <div className="form-buttons-container">
            <Button variant="contained" className="submit-button" type="submit">
              Save area
            </Button>
          </div>
        </Box>
      </div>
    </>
  );
};

export default NewAreaForm;