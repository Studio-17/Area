import { Box, Button, TextField } from "@mui/material";
import { useEffect } from "react";
import { theme } from "../../constants/theme";
import { GetParamsDto } from "../../models/paramsModel";

import "../../styles/RegisterForm.css";

interface Props {
  params: GetParamsDto[] | null;
}

const ActionParamsForm = ({ params }: Props) => {
  const onSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    console.log(e.target);
  };

  useEffect(() => {
    params && console.log(params[0]);
    params && console.log(params[0]["name"]);
  }, [params]);
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
