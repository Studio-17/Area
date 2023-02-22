import { Alert, CircularProgress, Snackbar } from "@mui/material";
import { useEffect, useState } from "react";
import { theme } from "../constants/theme";
import { Action } from "../models/actionModels";
import { Service } from "../models/serviceModels";
import { useActionsQuery, useServiceQuery } from "../services/servicesApi";
import DoneIcon from "@mui/icons-material/Done";
import ActionsCards from "./Cards/ActionsCards";
import axios from "axios";
import "../styles/ServicesInfos.css";
import BigRoundedButtonOutlined from "./Buttons/BigRoundedButtonOutlined";
import { GetParamsDto, PostParamsDto } from "../models/paramsModel";
import ActionParamsForm from "./ActionParamsForm/ActionParamsForm";

const API_ENDPOINT = process.env.REACT_APP_API_URL;

interface Props {
  service: Service;
  onClickOnActionCards: any;
  typeSelected: "action" | "reaction";
}

const ServicesInfos = ({
  service,
  onClickOnActionCards,
  typeSelected,
}: Props) => {
  const [isServiceConnected, setIsServiceConnected] = useState<boolean>(false);
  const [shouldPrintActionParamsForm, setShouldPrintActionParamsForm] =
    useState<boolean>(false);
  const [currentActionParams, setCurrentActionParams] = useState<
    GetParamsDto[] | null
  >(null);
  const [currentAction, setCurrentAction] = useState<any | null>(null);
  const {
    data: actions,
    isError,
    isLoading,
    isFetching,
  } = useActionsQuery(service.name);
  const {
    data: serviceInfo,
    refetch: refetchServiceInfos,
    isFetching: isFetchingServiceInfo,
  } = useServiceQuery(service.name);

  useEffect(() => {
    serviceInfo && setIsServiceConnected(serviceInfo?.isConnected);
  }, [actions, serviceInfo, isFetchingServiceInfo]);

  const handleOauthConnection = async () => {
    const token = localStorage.getItem("userToken");
    axios
      .get(`${API_ENDPOINT}/service/connect/${serviceInfo?.name}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        var myWindow = window.open(res.data.url, "");
        if (myWindow)
          myWindow.onunload = function () {
            refetchServiceInfos();
          };
      });
  };

  const onSubmitActionParamsForm = (
    actionContent?: string,
    reactionContent?: string,
    uuidOfAction?: string,
    params?: PostParamsDto[]
  ) => {
    setShouldPrintActionParamsForm(false);
    setCurrentActionParams(null);
    onClickOnActionCards(
      actionContent && actionContent,
      reactionContent && reactionContent,
      uuidOfAction && uuidOfAction,
      params && params
    );
  };

  const onClickOnActionCardsCheck = (
    actionContent?: string,
    reactionContent?: string,
    uuidOfAction?: string,
    params?: GetParamsDto[] | null,
    action?: Action
  ) => {
    if (params) {
      setShouldPrintActionParamsForm(true);
      setCurrentActionParams(params);
      setCurrentAction(action);
    } else {
      onClickOnActionCards(
        actionContent && actionContent,
        reactionContent && reactionContent,
        uuidOfAction && uuidOfAction
      );
    }
  };

  if (isLoading || isFetching) return <CircularProgress />;

  return (
    <>
      {!shouldPrintActionParamsForm ? (
        <>
          <div
            className="services-infos-main-container"
            style={{ backgroundColor: theme.palette.background }}
          >
            <div className="main-name" style={{ color: theme.palette.primary }}>
              {service.name}
              <div className="connection-status-container">
                {serviceInfo?.isConnected ? (
                  <DoneIcon />
                ) : (
                  <BigRoundedButtonOutlined
                    label="Connect"
                    color="primary"
                    onClick={() => handleOauthConnection()}
                  />
                )}
              </div>
            </div>
            <div className="subtext">Choose one ...</div>
            <div className="list-of-cards-container">
              {actions
                ?.filter((action: Action) => action.type === typeSelected)
                .map((element: Action, index: number) => (
                  <ActionsCards
                    key={index}
                    actionContent={
                      typeSelected === "action" ? element.name : undefined
                    }
                    reactionContent={
                      typeSelected === "reaction" ? element.name : undefined
                    }
                    onClick={onClickOnActionCardsCheck}
                    uuidOfAction={element.uuid}
                    disabled={!isServiceConnected}
                    params={element.params}
                    action={element}
                  />
                ))}
            </div>
            <Snackbar open={isError}>
              <Alert severity="error">Error while fetching services</Alert>
            </Snackbar>
          </div>
        </>
      ) : (
        <ActionParamsForm
          params={currentActionParams}
          action={currentAction}
          onSubmitForm={onSubmitActionParamsForm}
        />
      )}
    </>
  );
};

export default ServicesInfos;
