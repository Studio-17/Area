import { Alert, CircularProgress, Snackbar } from "@mui/material";
import { theme } from "../constants/theme";
import { Service } from "../models/serviceModels";
import { useActionsQuery } from "../services/servicesApi";
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
        {actions?.map((element, index) => (
          <ActionsCards
            key={index}
            actionContent={typeSelected === "action" ? element.description : undefined}
            reactionContent={typeSelected === "reaction" ? element.description : undefined}
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
