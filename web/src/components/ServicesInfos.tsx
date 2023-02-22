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
import { GetParamsDto } from "../models/paramsModel";
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
    console.log(actions);
    console.log("Service info", serviceInfo);
    console.log("Is fetching service info", isFetchingServiceInfo);
    serviceInfo && setIsServiceConnected(serviceInfo?.isConnected);
  }, [actions, serviceInfo, isFetchingServiceInfo]);

  const handleOauthConnection = async () => {
    console.log("Handle Oauth");
    const token = localStorage.getItem("userToken");
    axios
      .get(`${API_ENDPOINT}/service/connect/${serviceInfo?.name}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        var myWindow = window.open(res.data.url, "");
        if (myWindow)
          myWindow.onunload = function () {
            console.log("Refetch service info");
            refetchServiceInfos();
          };
      });
  };

  const onClickOnActionCardsCheck = (
    actionContent?: string,
    reactionContent?: string,
    uuidOfAction?: string,
    params?: GetParamsDto[] | null
  ) => {
    if (params) {
      setShouldPrintActionParamsForm(true);
      setCurrentActionParams(params);
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
                  />
                ))}
            </div>
            <Snackbar open={isError}>
              <Alert severity="error">Error while fetching services</Alert>
            </Snackbar>
          </div>
        </>
      ) : (
        <ActionParamsForm params={currentActionParams} />
      )}
    </>
  );
};

export default ServicesInfos;
