import { CircularProgress, IconButton } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { useAreaQuery, useDeleteAreaMutation } from "../services/servicesApi";
import { theme } from "../constants/theme";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

import "../styles/Area.css";

const Area = () => {
  const navigate = useNavigate();
  const { areaId } = useParams();
  const { data: area, isLoading, isFetching } = useAreaQuery(areaId!);
  const [deleteArea] = useDeleteAreaMutation();
  if (isLoading || isFetching) return <CircularProgress />;
  console.log(area);
  const onClickOnDeleteArea = (areaId: string) => {
    deleteArea(areaId);
    navigate("/home");
  };
  return (
    <div className="area-main-container">
      <div className="area-control-container">
        <IconButton
          style={{ position: "absolute", right: 20, top: 20 }}
          onClick={() => onClickOnDeleteArea(area?.area.uuid!)}
          size="large"
        >
          <DeleteIcon fontSize="large" />
        </IconButton>
        <IconButton
          style={{ position: "absolute", right: 60, top: 20 }}
          onClick={() => navigate(`/edit-area/${areaId}`)}
          size="large"
        >
          <EditIcon fontSize="large" />
        </IconButton>
      </div>
      <div className="area-page-action-main-container">
        <div
          className="area-page-if-container"
          style={{ color: theme.palette.primary }}
        >
          If
        </div>
        <div className="area-page-action-container">
          {area?.action.name} from{" "}
          <span style={{ color: theme.palette.primary }}>
            {area?.action.service}
          </span>
        </div>
      </div>
      {area?.reactions.map((reaction) => {
        return (
          <div className="area-page-reaction-main-container">
            <div
              className="area-page-then-container"
              style={{ color: theme.palette.secondary }}
            >
              Then
            </div>
            <div className="area-page-reaction-container">
              {reaction.name} from{" "}
              <span style={{ color: theme.palette.secondary }}>
                {reaction.service}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Area;
