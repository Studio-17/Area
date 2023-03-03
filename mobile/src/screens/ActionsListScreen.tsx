import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  SafeAreaView,
  StatusBar,
  Pressable,
  ScrollView,
  Image,
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
import { images } from "../redux/models/serviceModels";

export default function ActionsListScreen({ navigation, route }: any) {
  const { item } = route.params;
  const service: Service = item.service;
  const typeOfAction: "action" | "reaction" = item.typeOfAction;
  const typeOfRequest: "new" | "modify" = item.typeOfRequest;
  const indexBlock: number = item.indexBlock;
  const onClickOnAreasCards: any = item.onClickOnAreasCards;

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
    params?: PostParamsDto[],
    indexBlock?: number
  ) => {
    setCurrentActionParams(null);
    if (typeOfRequest === "modify") {
      onClickOnAreasCards(
        service,
        actionContent,
        reactionContent,
        uuidOfAction,
        params,
        indexBlock
      );
    } else {
      onClickOnAreasCards(
        service,
        actionContent,
        reactionContent,
        uuidOfAction,
        params,
        indexBlock
      );
    }
  };

  const handleCloseActionsListScreen = () => {
    navigation.goBack();
  };

  const capitalizeFirstLetter = (string: string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const onClickOnActionCardsCheck = (
    actionContent?: string,
    reactionContent?: string,
    uuidOfAction?: string,
    params?: GetParamsDto[] | null,
    action?: Action
  ) => {
    if (params || (!serviceInfo?.isConnected && serviceInfo?.type === "external")) {
      setCurrentActionParams(params!);
      setCurrentAction(action);
      setOpenFormModal(true);
    } else {
      if (typeOfRequest === "modify") {
        onClickOnAreasCards(
          service,
          actionContent,
          reactionContent,
          uuidOfAction,
          params,
          indexBlock
        );
      } else {
        onClickOnAreasCards(
          service,
          actionContent,
          reactionContent,
          uuidOfAction,
          params,
          indexBlock
        );
      }
      navigation.navigate("NewArea");
    }
  };

  if (isLoading || isFetching || isFetchingServiceInfo) {
    return <MyText>Loading...</MyText>;
  }

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
        <View style={{ display: "flex", padding: 20 }}>
          <View style={styles.descriptionContainer}>
            <Image source={images[service.name]} style={styles.logo} />
            <MyText style={[styles.textHeaderStyle, { marginBottom: 10 }]}>
              {capitalizeFirstLetter(service.name)}
            </MyText>
            <MyText style={styles.textContentStyle}>
              {service.description}
            </MyText>
          </View>
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
                color={service.color ? service.color : "grey"}
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
        indexBlock={indexBlock}
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
  textContentStyle: {
    fontSize: 17,
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
  descriptionContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  logo: {
    width: 50,
    height: 50,
    marginBottom: 10,
  },
});
