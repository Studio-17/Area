import { Alert, CircularProgress, Snackbar } from "@mui/material";
import { useEffect } from "react";
import { theme } from "../constants/theme";
import { Action } from "../models/actionModels";
import { Service } from "../models/serviceModels";
import {
  useActionsQuery,
  useLoginGoogleServiceQuery,
} from "../services/servicesApi";
import { RootState, useAppSelector } from "../store/store";
import "../styles/ServicesInfos.css";
import ActionsCards from "./Cards/ActionsCards";

interface Props {
  service: Service;
  onClickOnAreasCards: any;
  typeSelected: "action" | "reaction";
}

const ServicesInfos = ({
  service,
  onClickOnAreasCards,
  typeSelected,
}: Props) => {
  const {
    data: actions,
    isError,
    isLoading,
    isFetching,
  } = useActionsQuery(service.uuid);
  const { user } = useAppSelector((state: RootState) => state.auth);

    const { data: result } = useLoginGoogleServiceQuery(user.id);

  useEffect(() => {
    console.log(user);
    console.log(result);
  }, []);

  useEffect(() => {
    if (result) window.open(result.url, "", "popup,width=1020,height=1020");
  }, [result]);

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
              onClick={onClickOnAreasCards}
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
