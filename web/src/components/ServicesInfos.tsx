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
  }, [actions, serviceInfo]);

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
    uuidOfAction?: string
  ) => {
    console.log("Check");
    if (serviceInfo?.type === "external" && !serviceInfo.isConnected)
      handleOauthConnection();
    else
      onClickOnActionCards(
        actionContent && actionContent,
        reactionContent && reactionContent,
        uuidOfAction && uuidOfAction
      );
  };

  if (isLoading || isFetching) return <CircularProgress />;

  return (
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
                typeSelected === "action" ? element.description : undefined
              }
              reactionContent={
                typeSelected === "reaction" ? element.description : undefined
              }
              onClick={onClickOnActionCardsCheck}
              uuidOfAction={element.uuid}
              disabled={!isServiceConnected}
            />
          ))}
      </div>
      <Snackbar open={isError}>
        <Alert severity="error">Error while fetching services</Alert>
      </Snackbar>
    </div>
  );
};

export default ServicesInfos;
