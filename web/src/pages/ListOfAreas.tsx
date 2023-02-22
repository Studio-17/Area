import { useEffect, useState } from "react";
import { theme } from "../constants/theme";
import AreasCards from "../components/Cards/AreasCards";
import { useNavigate } from "react-router-dom";
import { CircularProgress, Fab } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import "../styles/ListOfAreas.css";
import { useAreasQuery, useDeleteAreaMutation } from "../services/servicesApi";
import { Area } from "../models/areaModels";
import ConfirmActionModal from "../components/Modals/ConfirmActionModal";

const ListOfAreas = () => {
  const navigate = useNavigate();
  const [openConfirmDeleteModal, setConfirmDeleteModal] =
    useState<boolean>(false);
  const [currentAreaIdToDelete, setCurrentAreaIdToDelete] =
    useState<string>("");
  const { data: areas, isLoading, isFetching } = useAreasQuery();
  const [deleteArea] = useDeleteAreaMutation();

  const onClickOnAreaCards: any = (areaUuid: string | undefined) => {
    navigate(`/area/${areaUuid}`);
  };

  const onClickDeleteArea: any = (uuid: string) => {
    setCurrentAreaIdToDelete(uuid);
    setConfirmDeleteModal(true);
  };

  const onRefuseDeleteAreaModal: any = () => {
    setConfirmDeleteModal(false);
  };

  const onConfirmDeleteAreaModal: any = () => {
    deleteArea(currentAreaIdToDelete);
    setConfirmDeleteModal(false);
  };

  if (isLoading || isFetching) return <CircularProgress />;
  return (
    <div
      className="list-of-areas-main-container"
      style={{ backgroundColor: theme.palette.background }}
    >
      <ConfirmActionModal
        open={openConfirmDeleteModal}
        title="Supprimer ce coony ?"
        description="Cette action est irreverible !"
        onConfirm={onConfirmDeleteAreaModal}
        onRefuse={onRefuseDeleteAreaModal}
        confirmText="Oui, supprimer ce coony"
        refuseText="Non"
      />
      <div className="main-text">Your current Coonies ...</div>
      <div className="list-of-areas">
        {areas?.length !== 0 ? (
          <>
            {areas?.map((area: Area, index: number) => (
              <AreasCards
                onClickOnCard={onClickOnAreaCards}
                area={area}
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
