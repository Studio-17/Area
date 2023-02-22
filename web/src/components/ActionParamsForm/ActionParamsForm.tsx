import { Box, Button, TextField } from "@mui/material";
import { theme } from "../../constants/theme";
import { Action } from "../../models/actionModels";
import { GetParamsDto } from "../../models/paramsModel";

import "../../styles/RegisterForm.css";

interface Props {
  params: GetParamsDto[] | null;
  onSubmitForm: any;
  action: Action;
}

const ActionParamsForm = ({ params, onSubmitForm, action }: Props) => {
  const onSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    onSubmitForm(
      e,
      action.type === "action" && action.name,
      action.type === "reaction" && action.name,
      action.uuid
    );
  };
  return (
    <>
      <div
        className="form-container"
        style={{ backgroundColor: theme.palette.background }}
      >
        <div
          className="main-title-container"
          style={{ color: theme.palette.secondary }}
        >
          Add parameters to this action
        </div>
        <Box component="form" onSubmit={onSubmit}>
          {params?.map((param: GetParamsDto) => {
            return (
              <TextField
                margin="normal"
                fullWidth
                id={param.name}
                label={param.name}
                name={param.name}
                autoComplete={param.description}
                required
              />
            );
          })}
          <div className="form-buttons-container">
            <Button variant="contained" className="submit-button" type="submit">
              Add action
            </Button>
          </div>
        </Box>
      </div>
    </>
  );
};

export default ActionParamsForm;
