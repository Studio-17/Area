import { theme } from "../../constants/theme";
import AddIcon from "@mui/icons-material/Add";
import { Alert, CircularProgress, Fab, Snackbar } from "@mui/material";
import { useEffect, useState } from "react";
import ServicesModal from "../../components/Modals/ServicesModal";
import ServicesInfos from "../../components/ServicesInfos";
import "../../styles/NewArea.css";
import BigRoundedButton from "../../components/Buttons/BigRoundedButton";
import {
  useAreaQuery,
  useEditAreaMutation,
  useServicesQuery,
} from "../../services/servicesApi";
import { Service } from "../../models/serviceModels";
import { useParams } from "react-router-dom";
import { PostParamsDto } from "../../models/paramsModel";
import { Action } from "../../models/actionModels";
import { updateAreaDto } from "../../models/areaModels";

const EditAreaForm = () => {
  const { areaId } = useParams();
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [blockNumberSelected, setBlockNumberSelected] = useState<number>(0);
  const [serviceSelected, setServiceSelected] = useState<Service | null>(null);
  const [blocksState, setBlocksState] = useState<any>([]);
  const [typeSelected, setTypeSelected] = useState<"action" | "reaction">(
    "action"
  );

  const { data: services, isError, isLoading } = useServicesQuery();
  const { data: area } = useAreaQuery(areaId!);
  const [editArea, status] = useEditAreaMutation();

  useEffect(() => {
    if (area) {
      const actionTmp = {
        name: area.action.name,
        service: area.action.service,
        uuid: area.action.uuid,
        params: area.action.params,
      };
      const reactionsTmp = area.reactions.map((reaction: Action) => {
        return {
          name: reaction.name,
          service: reaction.service,
          uuid: reaction.uuid,
          params: reaction.params,
        };
      });
      const blocksStateTmp = [actionTmp].concat(reactionsTmp);
      setBlocksState(blocksStateTmp);
    }
  }, [area]);

  const onClickOpenModal = (
    index: number,
    typeOfAction: "action" | "reaction"
  ) => {
    setTypeSelected(typeOfAction);
    setOpenModal(true);
    setBlockNumberSelected(index);
  };

  const onClickOnAction: any = (
    actionContent?: string,
    reactionContent?: string,
    uuidOfAction?: string,
    params?: PostParamsDto[]
  ) => {
    actionContent &&
      setBlocksState(
        blocksState.map((value: any, index: number) => {
          console.log(value);
          return index === 0
            ? {
                name: actionContent,
                service: serviceSelected?.name,
                uuid: uuidOfAction,
                params: params ? params : null,
              }
            : value;
        })
      );
    reactionContent &&
      setBlocksState(
        blocksState.map((value: any, index: number) => {
          return index === 1
            ? {
                name: reactionContent,
                service: serviceSelected?.name,
                uuid: uuidOfAction,
                params: params ? params : null,
              }
            : value;
        })
      );
    setServiceSelected(null);
  };

  const onClickOnSaveButton = () => {
    const reactionsTmp: any = [];
    blocksState
      .filter((value: any, index: number) => index !== 0)
      .map((block: any) =>
        reactionsTmp.push({ id: block.uuid, params: block.params })
      );
    const areaToUpdate: updateAreaDto = {
      action: { id: blocksState[0].uuid, params: blocksState[0].params },
      reactions: reactionsTmp,
      name: area?.area.name,
      hour: area?.action.hour,
      minute: area?.action.minute,
      second: area?.action.second,
    };
    areaId && editArea({ areaToUpdate, areaId });
  };

  if (isLoading) return <CircularProgress />;

  return (
    <>
      <>
        {!serviceSelected ? (
          <div
            className="new-area-main-container"
            style={{ backgroundColor: theme.palette.background }}
          >
            <div className="main-text">Edit : {area?.area.name}</div>
            <div className="if-then-container">
              <div
                className="if-container"
                style={{ backgroundColor: theme.palette.secondary }}
              >
                {blocksState[0] ? (
                  <>
                    <div className="if-text">
                      <span style={{ margin: "0px 2vw" }}>IF</span>
                    </div>
                    <div className="infos-container">
                      <div className="action-service">
                        {blocksState[0].service}
                      </div>
                      <div className="action-name">{blocksState[0].name}</div>
                    </div>
                  </>
                ) : (
                  <div className="if-text">
                    <span style={{ margin: "0px 2vw" }}>IF</span>
                  </div>
                )}
                <Fab
                  style={{
                    position: "absolute",
                    right: 26,
                    width: 50,
                    height: 50,
                  }}
                  color="warning"
                  onClick={() => onClickOpenModal(0, "action")}
                >
                  <AddIcon />
                </Fab>
              </div>
              {blocksState
                .filter((value: any, index: number) => index !== 0)
                .map((block: any, index: number) => (
                  <>
                    <div
                      className="link"
                      style={{ backgroundColor: theme.palette.common.grey }}
                      key={index}
                    ></div>
                    <div
                      className="then-container"
                      style={{ backgroundColor: theme.palette.primary }}
                    >
                      {blocksState[index + 1] ? (
                        <>
                          <div className="if-text">
                            <span style={{ margin: "0px 2vw" }}>then</span>
                          </div>
                          <div className="infos-container">
                            <div className="action-service">
                              {blocksState[index + 1].service}
                            </div>
                            <div className="action-name">
                              {blocksState[index + 1].name}
                            </div>
                          </div>
                        </>
                      ) : (
                        <div className="if-text">
                          <span style={{ margin: "0px 2vw" }}>then</span>
                        </div>
                      )}
                      <Fab
                        style={{
                          position: "absolute",
                          right: 26,
                          width: 50,
                          height: 50,
                        }}
                        color="warning"
                        onClick={() => onClickOpenModal(index + 1, "reaction")}
                      >
                        <AddIcon />
                      </Fab>
                    </div>
                  </>
                ))}
            </div>
            <div className="save-button-container">
              <BigRoundedButton
                label="Edit coony"
                color="primary"
                onClick={onClickOnSaveButton}
              />
            </div>
          </div>
        ) : (
          <ServicesInfos
            onClickOnActionCards={onClickOnAction}
            service={serviceSelected}
            typeSelected={typeSelected}
          />
        )}
      </>
      <ServicesModal
        setServiceSelected={setServiceSelected}
        open={openModal}
        onClose={() => setOpenModal(false)}
        services={services}
      />
      <Snackbar open={isError}>
        <Alert severity="error">Error while fetching services</Alert>
      </Snackbar>
      <Snackbar open={status.isSuccess}>
        <Alert severity="success">Successfully edited your coony !</Alert>
      </Snackbar>
    </>
  );
};

export default EditAreaForm;
