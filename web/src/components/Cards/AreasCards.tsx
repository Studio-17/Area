import { Card, CardActionArea, CardContent, IconButton } from "@mui/material";
import { theme } from "../../constants/theme";
import { Area } from "../../models/areaModels";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import "../../styles/AreasCards.css";
import { useNavigate } from "react-router-dom";

interface Props {
  area: Area | undefined;
  onClickOnCard: (
    areaUid: string | undefined
  ) => React.MouseEventHandler<HTMLButtonElement> | undefined;
  onClickDeleteArea: any;
}

const AreasCards = ({ area, onClickOnCard, onClickDeleteArea }: Props) => {
  const navigate = useNavigate();
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
      <IconButton
        style={{ position: "absolute", bottom: 0, right: 40 }}
        onClick={() => navigate(`/edit-area/${area?.area.uuid}`)}
        size="large"
      >
        <EditIcon fontSize="medium" />
      </IconButton>
      <CardActionArea
        sx={{ height: "82%" }}
        onClick={() => onClickOnCard(area?.area.uuid)}
      >
        <CardContent
          sx={{
            padding: "30px",
            display: area?.area.name ? "flex" : "",
            justifyContent: area?.area.name ? "center" : "",
          }}
        >
          {area?.area.name ? (
            <div className="area-name">{area?.area.name}</div>
          ) : (
            <>
              <div className="card-text-first-bloc">
                <div
                  className="card-text-if"
                  style={{ color: theme.palette.primary }}
                >
                  IF&nbsp;
                </div>

                <div className="card-text-first-line">{area?.action?.name}</div>
              </div>
              <div className="card-text-second-bloc">
                <div
                  className="card-text-then"
                  style={{ color: theme.palette.primary }}
                >
                  THEN&nbsp;
                </div>
                <div className="card-text-second-line">
                  {area?.reactions[0]?.name}
                </div>
              </div>
            </>
          )}
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default AreasCards;
