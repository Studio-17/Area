import { Box, Button, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { theme } from "../../constants/theme";
import { Action } from "../../models/actionModels";
import { GetParamsDto } from "../../models/paramsModel";
import { PostParamsDto } from "../../models/paramsModel";

import "../../styles/RegisterForm.css";

interface Props {
  params: GetParamsDto[] | null;
  onSubmitForm: any;
  action: Action;
}

const ActionParamsForm = ({ params, onSubmitForm, action }: Props) => {
  const [paramsState, setParamsState] = useState<PostParamsDto[]>([]);

  useEffect(() => {
    const paramsStateTmp = params
      ? params?.map((param) => {
          return { name: param.name, content: "" };
        })
      : [];
    setParamsState(paramsStateTmp);
  }, []);

  const onSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    onSubmitForm(
      action.type === "action" && action.name,
      action.type === "reaction" && action.name,
      action.uuid,
      paramsState
    );
  };
  const onChangeTextField = (name: string, content: string) => {
    const paramsStateTmp = paramsState.map((elem) => {
      return elem.name === name ? { name: name, content: content } : elem;
    });
    setParamsState(paramsStateTmp);
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
          {params?.map((param: GetParamsDto, index: number) => {
            return (
              <TextField
                key={param.uuid}
                margin="normal"
                fullWidth
                id={param.name}
                label={param.name}
                name={param.name}
                autoComplete={param.description}
                onChange={(e) => onChangeTextField(param.name, e.target.value)}
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
