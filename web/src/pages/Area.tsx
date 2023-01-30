import { CircularProgress } from "@mui/material";
import { useParams } from "react-router-dom";
import { useAreaQuery } from "../services/servicesApi";
import { theme } from "../constants/theme";
import "../styles/Area.css";

const Area = () => {
  const { areaId } = useParams();
  const { data: area, isLoading, isFetching } = useAreaQuery(areaId!);
  if (isLoading || isFetching) return <CircularProgress />;
  return (
    <div className="area-main-container">
      <div className="area-page-action-main-container">
        <div
          className="area-page-if-container"
          style={{ color: theme.palette.primary }}
        >
          If
        </div>
        <div className="area-page-action-container">{area?.action.name}</div>
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
            <div className="area-page-reaction-container">{reaction.name}</div>
          </div>
        );
      })}
    </div>
  );
};

export default Area;
