import { theme } from "../constants/theme";
import AddIcon from "@mui/icons-material/Add";
import { Alert, CircularProgress, Fab, Snackbar } from "@mui/material";
import { useEffect, useState } from "react";
import ServicesModal from "../components/Modals/ServicesModal";
import ServicesInfos from "../components/ServicesInfos";
import BigRoundedButtonOutlined from "../components/Buttons/BigRoundedButtonOutlined";
import "../styles/NewArea.css";
import BigRoundedButton from "../components/Buttons/BigRoundedButton";
import { useAddAreaMutation, useServicesQuery } from "../services/servicesApi";
import { Service } from "../models/serviceModels";
import { useNavigate } from "react-router-dom";
import NewAreaForm from "../components/NewAreaForm/NewAreaForm";
import { PostParamsDto } from "../models/paramsModel";
import { motion } from "framer-motion";

const NewArea = () => {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [blockNumberSelected, setBlockNumberSelected] = useState<number>(0);
  const [serviceSelected, setServiceSelected] = useState<Service | null>(null);
  const [blocksState, setBlockState] = useState<any>([]);
  const [thensInstance, setthensInstance] = useState<any>([]);
  const [typeSelected, setTypeSelected] = useState<"action" | "reaction">(
    "action"
  );

  const [isInAreaForm, setIsInAreaForm] = useState<boolean>(false);
  const navigate = useNavigate();

  const { data: services, isError, isLoading } = useServicesQuery();

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
      setBlockState((state: any) => [
        ...state,
        {
          name: actionContent,
          service: serviceSelected?.name,
          uuid: uuidOfAction,
          params: params ? params : null,
        },
      ]);
    reactionContent &&
      setBlockState((state: any) => [
        ...state,
        {
          name: reactionContent,
          service: serviceSelected?.name,
          uuid: uuidOfAction,
          params: params ? params : null,
        },
      ]);
    setServiceSelected(null);
  };

  const onClickAddthens = () => {
    setthensInstance((thens: any) => [...thens, { type: "then" }]);
  };

  const onClickOnSaveButton = () => {
    setIsInAreaForm(true);
  };

  if (isLoading) return <CircularProgress />;

  return (
    <>
      {!isInAreaForm ? (
        <>
          {!serviceSelected ? (
            <div
              className="new-area-main-container"
              style={{ backgroundColor: theme.palette.background }}
            >
              <div className="main-text">New coonie u said ?</div>
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
                {thensInstance.map((block: any, index: number) => (
                  <>
                    <motion.div
                      className="link"
                      style={{ backgroundColor: theme.palette.common.grey }}
                      key={index}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.2 }}
                    ></motion.div>
                    <motion.div
                      className="then-container"
                      style={{ backgroundColor: theme.palette.primary }}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{
                        default: { duration: 0.2 },
                        scale: {
                          type: "spring",
                          damping: 5,
                          stiffness: 100,
                          restDelta: 0.001,
                        },
                      }}
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
                    </motion.div>
                  </>
                ))}
                <div className="more-thens-button">
                  <BigRoundedButtonOutlined
                    label="Add thens"
                    color="primary"
                    onClick={onClickAddthens}
                  />
                </div>
              </div>
              <div className="save-button-container">
                <BigRoundedButton
                  label="Save"
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
      ) : (
        <>
          <NewAreaForm blocksState={blocksState} />
        </>
      )}
      <ServicesModal
        setServiceSelected={setServiceSelected}
        open={openModal}
        onClose={() => setOpenModal(false)}
        services={services}
      />
      <Snackbar open={isError}>
        <Alert severity="error">Error while fetching services</Alert>
      </Snackbar>
    </>
  );
};

export default NewArea;
