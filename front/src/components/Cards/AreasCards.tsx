import {
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
    <Card sx={{ width: 350, height: 250, borderRadius: 2 }}>
      <CardActionArea
        sx={{ height: "100%" }}
        onClick={() => onClickOnCard(area?.uuid)}
      >
        <CardContent sx={{ padding: "30px" }}>
          <div className="card-text-first-bloc">
            <div
              className="card-text-if"
              style={{ color: theme.palette.primary }}
            >
              IF&nbsp;
            </div>

            <div className="card-text-first-line">
              {area?.action.description}
            </div>
          </div>
          <div className="card-text-second-bloc">
            <div
              className="card-text-then"
              style={{ color: theme.palette.primary }}
            >
              THEN&nbsp;
            </div>
            <div className="card-text-second-line">
              {area?.reactions[0].description}
            </div>
          </div>
        </CardContent>
        <CardActions>
          <IconButton onClick={() => onClickDeleteArea(area?.uuid)}>
            <DeleteIcon />
          </IconButton>
        </CardActions>
      </CardActionArea>
    </Card>
  );
};

export default AreasCards;
