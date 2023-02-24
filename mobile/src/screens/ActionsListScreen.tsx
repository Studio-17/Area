import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  SafeAreaView,
  StatusBar,
  Pressable,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import * as WebBrowser from 'expo-web-browser';

// WebBrowser.maybeCompleteAuthSession();

// Redux
import axios from "axios";
import { useActionsQuery, useServiceQuery } from "../redux/services/servicesApi";
import { Service } from "../redux/models/serviceModels";
import { Action } from "../redux/models/actionModels";
import { GetParamsDto, PostParamsDto } from "../redux/models/paramsModel";
import { REACT_NATIVE_APP_API_URL } from "@env";

const API_ENDPOINT = REACT_NATIVE_APP_API_URL;

// Components
import ActionCard from "../components/Cards/ActionCard";
import ConnectionToServiceModal from "../components/Modals/ConnectionToServiceModal";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function ActionsListScreen(
  {
    navigation,
    route
  }: any) {
  const { item } = route.params;
  const service: Service = item.service;
  const typeOfAction: "action" | "reaction" = item.typeOfAction;
  const onClickOnAreasCards: (serviceSelected?: Service | undefined, actionContent?: string, responseContent?: string, uuidOfAction?: string) => void = item.onClickOnAreasCards;

  const [isServiceConnected, setIsServiceConnected] = useState<boolean>(false);
  const [shouldPrintActionParamsForm, setShouldPrintActionParamsForm] = useState<boolean>(false);
  const [currentActionParams, setCurrentActionParams] = useState<GetParamsDto[] | null>(null);
  const [openConnectToServiceModal, setOpenConnectToServiceModal] = useState<boolean>(false);

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
    const token = await AsyncStorage.getItem("userToken");
    console.log(`${API_ENDPOINT}/service/connect/${serviceInfo?.name}`);
    axios
      .get(`${API_ENDPOINT}/service/connect/${serviceInfo?.name}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        console.log(res.data.url);
        WebBrowser.openBrowserAsync(res.data.url);
      })
      //   var myWindow = window.open(res.data.url, "");
      //   if (myWindow)
      //     myWindow.onunload = function () {
      //       refetchServiceInfos();
      //     };
      // });
  };

  const handleCloseActionsListScreen = () => {
    navigation.goBack();
  };

  const onClickOnActionCardsCheck = (
    actionContent?: string,
    reactionContent?: string,
    uuidOfAction?: string,
    // params?: GetParamsDto[] | null,
  ) => {
    if (!serviceInfo?.isConnected) {
      setOpenConnectToServiceModal(true);
    } else {
      setOpenConnectToServiceModal(false);
      onClickOnAreasCards(service, actionContent, reactionContent, uuidOfAction);
      navigation.navigate("NewArea");
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.modalContainer}>
        <Pressable style={styles.button} onPress={handleCloseActionsListScreen}>
          <MaterialCommunityIcons name="arrow-left" color={"black"} size={50} />
        </Pressable>
      </View>
      <View style={{ padding: 10 }}>
        {actions
          ?.filter((action: Action) => action.type === typeOfAction)
          .map((action: Action, index: number) => (
            <ActionCard
              onClick={onClickOnActionCardsCheck}
              actionContent={
                typeOfAction === "action" ? action.name : undefined
              }
              reactionContent={
                typeOfAction === "reaction" ? action.name : undefined
              }
              uuidOfAction={action.uuid}
              key={index}
            />
          ))}
      </View>
      <ConnectionToServiceModal openConnectToServiceModal={openConnectToServiceModal} setOpenConnectToServiceModal={setOpenConnectToServiceModal} service={service} onClickToConnect={handleOauthConnection} />
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
    backgroundColor: "FFF7FA",
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
