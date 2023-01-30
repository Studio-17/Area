import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  IconButton,
} from "@mui/material";
import { theme } from "../../constants/theme";
import { Area } from "../../models/areaModels";
import DeleteIcon from "@mui/icons-material/Delete";
import "../../styles/AreasCards.css";

interface Props {
  area: Area | undefined;
  onClickOnCard: (
    areaUid: string | undefined
  ) => React.MouseEventHandler<HTMLButtonElement> | undefined;
  onClickDeleteArea: any;
}

const AreasCards = ({ area, onClickOnCard, onClickDeleteArea }: Props) => {
  return (
    <Card
      sx={{ width: 350, height: 250, borderRadius: 2, position: "relative" }}
    >
      <IconButton
        style={{ position: "absolute", right: 0, bottom: 0 }}
        onClick={() => onClickDeleteArea(area?.area.uuid)}
        size="large"
      >
        <DeleteIcon fontSize="medium" />
      </IconButton>
      <CardActionArea
        sx={{ height: "82%" }}
        onClick={() => onClickOnCard(area?.area.uuid)}
      >
        <CardContent sx={{ padding: "30px" }}>
          <div className="card-text-first-bloc">
            <div
              className="card-text-if"
              style={{ color: theme.palette.primary }}
            >
              IF&nbsp;
            </div>

            <div className="card-text-first-line">{area?.action.name}</div>
          </div>
          <div className="card-text-second-bloc">
            <div
              className="card-text-then"
              style={{ color: theme.palette.primary }}
            >
              THEN&nbsp;
            </div>
            <div className="card-text-second-line">
              {area?.reactions[0].name}
            </div>
          </div>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default AreasCards;
