import { Card, CardActionArea, CardContent } from "@mui/material";
import { theme } from "../../constants/theme";
import { Action } from "../../models/actionModels";
import { GetParamsDto } from "../../models/paramsModel";
import "../../styles/ActionsCards.css";

interface Props {
  actionContent?: string;
  reactionContent?: string;
  uuidOfAction?: string;
  onClick: (
    actionContent?: string,
    reactionContent?: string,
    uuidOfAction?: string,
    params?: GetParamsDto[] | null,
    action?: Action
  ) => void;
  disabled: boolean;
  params: GetParamsDto[] | null;
  action?: Action;
}

const ActionsCards = ({
  actionContent,
  reactionContent,
  onClick,
  uuidOfAction,
  disabled,
  params,
  action,
}: Props) => {
  return (
    <Card sx={{ width: 350, height: 250, borderRadius: 2 }}>
      <CardActionArea
        sx={{ height: "100%" }}
        onClick={() =>
          onClick(
            actionContent && actionContent,
            reactionContent && reactionContent,
            uuidOfAction && uuidOfAction,
            params,
            action
          )
        }
        disabled={disabled}
      >
        <CardContent sx={{ padding: "30px" }}>
          {actionContent && (
            <>
              <div className="card-text-first-bloc">
                <div
                  className="card-text-if"
                  style={{ color: theme.palette.primary }}
                >
                  IF&nbsp;
                </div>

                <div className="card-text-first-line">{actionContent}</div>
              </div>
            </>
          )}
          {reactionContent && (
            <div className="card-text-second-bloc">
              <div
                className="card-text-then"
                style={{ color: theme.palette.primary }}
              >
                THEN&nbsp;
              </div>
              <div className="card-text-second-line">{reactionContent}</div>
            </div>
          )}
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default ActionsCards;
