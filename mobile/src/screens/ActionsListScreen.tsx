import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  SafeAreaView,
  StatusBar,
  Pressable,
  ScrollView,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

// Redux
import {
  useActionsQuery,
  useServiceQuery,
} from "../redux/services/servicesApi";
import { Service } from "../redux/models/serviceModels";
import { Action } from "../redux/models/actionModels";
import { GetParamsDto, PostParamsDto } from "../redux/models/paramsModel";

// Components
import ActionCard from "../components/Cards/ActionCard";
import FormModal from "../components/Modals/FormModal";
import MyText from "../components/MyText";

export default function ActionsListScreen({ navigation, route }: any) {
  const { item } = route.params;
  const service: Service = item.service;
  const typeOfAction: "action" | "reaction" = item.typeOfAction;
  const onClickOnAreasCards: (
    serviceSelected?: Service | undefined,
    actionContent?: string,
    responseContent?: string,
    uuidOfAction?: string,
    params?: PostParamsDto[] | null
  ) => void = item.onClickOnAreasCards;

  const [openFormModal, setOpenFormModal] = useState<boolean>(false);

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
    refetchServiceInfos();
  }, []);

  const onSubmitActionParamsForm = (
    actionContent?: string,
    reactionContent?: string,
    uuidOfAction?: string,
    params?: PostParamsDto[]
  ) => {
    setCurrentActionParams(null);
    onClickOnAreasCards(
      service,
      actionContent,
      reactionContent,
      uuidOfAction,
      params
    );
  };

  const handleCloseActionsListScreen = () => {
    navigation.goBack();
  };

  const onClickOnActionCardsCheck = (
    actionContent?: string,
    reactionContent?: string,
    uuidOfAction?: string,
    params?: GetParamsDto[] | null,
    action?: Action
  ) => {
    if (params || !serviceInfo?.isConnected) {
      setCurrentActionParams(params!);
      setCurrentAction(action);
      setOpenFormModal(true);
    } else {
      onClickOnAreasCards(
        service,
        actionContent,
        reactionContent,
        uuidOfAction,
        params
      );
      navigation.navigate("NewArea");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.modalContainer}>
        <Pressable style={styles.button} onPress={handleCloseActionsListScreen}>
          <MaterialCommunityIcons name="arrow-left" color={"black"} size={50} />
        </Pressable>
        <MyText style={styles.textHeaderStyle}>Choose a trigger</MyText>
        <View style={{ flex: 1 }} />
      </View>
      <ScrollView>
        <View style={{ padding: 10 }}>
          {actions
            ?.filter((action: Action) => action.type === typeOfAction)
            .map((element: Action, index: number) => (
              <ActionCard
                onClick={onClickOnActionCardsCheck}
                actionContent={
                  typeOfAction === "action" ? element.name : undefined
                }
                reactionContent={
                  typeOfAction === "reaction" ? element.name : undefined
                }
                uuidOfAction={element.uuid}
                key={index}
                params={element.params}
                action={element}
                color={(service.color ? service.color : "grey")}
              />
            ))}
        </View>
      </ScrollView>
      <FormModal
        openFormModal={openFormModal}
        setOpenFormModal={setOpenFormModal}
        action={currentAction}
        params={currentActionParams}
        onSubmitForm={onSubmitActionParamsForm}
        navigation={navigation}
        serviceInfo={serviceInfo}
        refetchServiceInfos={() => refetchServiceInfos()}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight || 0,
    backgroundColor: "#FFF7FA",
  },
  modalContainer: {
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
  },
  textHeaderStyle: {
    fontSize: 25,
    fontWeight: "bold",
    color: "black",
    textAlign: "center",
    width: "70%",
  },
  textModal: {
    fontSize: 25,
    fontWeight: "bold",
    color: "#A37C5B",
  },
  button: {
    margin: 10,
  },
  textStyle: {
    color: "black",
    fontWeight: "bold",
    textAlign: "center",
  },
});
