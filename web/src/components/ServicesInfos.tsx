import { Alert, CircularProgress, Snackbar } from "@mui/material";
import { useEffect } from "react";
import { theme } from "../constants/theme";
import { Action } from "../models/actionModels";
import { Service } from "../models/serviceModels";
import { useActionsQuery, useServiceQuery } from "../services/servicesApi";
import ActionsCards from "./Cards/ActionsCards";
import axios from "axios";
import "../styles/ServicesInfos.css";

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
  const {
    data: actions,
    isError,
    isLoading,
    isFetching,
  } = useActionsQuery(service.name);
  const { data: serviceInfo } = useServiceQuery(service.name);

  useEffect(() => {
    console.log(actions);
    console.log(serviceInfo);
  }, [actions, serviceInfo]);

  const handleOauthConnection = () => {
    console.log("Handle Oauth");
    axios
      .get(`${API_ENDPOINT}/service/connect/${serviceInfo?.name}`)
      .then((res) => console.log(res));
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
