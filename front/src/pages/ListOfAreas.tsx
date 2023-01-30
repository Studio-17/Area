import { theme } from "../constants/theme";
import AreasCards from "../components/Cards/AreasCards";
import { useNavigate } from "react-router-dom";
import { CircularProgress, Fab } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import "../styles/ListOfAreas.css";
import { useAreasQuery, useDeleteAreaMutation } from "../services/servicesApi";

const ListOfAreas = () => {
  const navigate = useNavigate();
  const { data: areas, isLoading, isFetching } = useAreasQuery();
  const [deleteArea] = useDeleteAreaMutation();

  const onClickOnAreaCards: any = (areaUuid: string | undefined) => {
    console.log(areaUuid);
    navigate(`/area/${areaUuid}`);
  };

  const onClickDeleteArea: any = (uuid: string) => {
    console.log(uuid);
    deleteArea(uuid);
  };

  if (isLoading || isFetching) return <CircularProgress />;
  return (
    <div
      className="list-of-areas-main-container"
      style={{ backgroundColor: theme.palette.background }}
    >
      <div className="main-text">Your current Coonies ...</div>
      <div className="list-of-areas">
        {areas?.length !== 0 ? (
          <>
            {areas?.map((area, index) => (
              <AreasCards
                onClickOnCard={onClickOnAreaCards}
                area={undefined}
                key={index}
                onClickDeleteArea={onClickDeleteArea}
              />
            ))}
          </>
        ) : (
          <div className="no-data-container">No coonies yet ...</div>
        )}
      </div>
      <Fab
        style={{
          position: "fixed",
          bottom: 36,
          right: 36,
          width: 70,
          height: 70,
        }}
        color="primary"
        onClick={() => navigate("/new-area")}
      >
        <AddIcon />
      </Fab>
    </div>
  );
};

export default ListOfAreas;
