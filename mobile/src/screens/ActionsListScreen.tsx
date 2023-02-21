import React from "react";
import {
  StyleSheet,
  View,
  SafeAreaView,
  TouchableOpacity,
  StatusBar,
  Pressable,
  ScrollView,
  Alert,
} from "react-native";
import {MaterialCommunityIcons} from "@expo/vector-icons";
import { Action } from "../redux/models/actionModels";
import ActionCard from "../components/Cards/ActionCard";
import { useActionsQuery } from "../redux/services/servicesApi";
import { Service } from "../redux/models/serviceModels";

export default function ActionsListScreen(
  {
    navigation,
    route
  }: any) {
  const { item } = route.params;
  const service: Service = item.service;
  const typeOfAction: "action" | "reaction" = item.typeOfAction;
  const onClickOnAreasCards: any = item.onClickOnAreasCards;

  const {
    data: actions,
    isError,
    isLoading,
    isFetching,
  } = useActionsQuery(service.name);

  const handleCloseModal = () => {
    // item.setOpenServicesModal(true);
    navigation.navigate("NewArea");
    // onCloseActionsModal();
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.modalContainer}>
        <Pressable style={styles.button} onPress={handleCloseModal}>
          <MaterialCommunityIcons name="close" color={"black"} size={50} />
        </Pressable>
      </View>
      <View style={{ padding: 10 }}>
        {actions
          ?.filter((action: Action) => action.type === typeOfAction)
          .map((action: Action, index: number) => (
            <ActionCard
              onClose={() => navigation.navigate({name: "NewArea", params: { serviceValue: service }, merge: true})}
              actionContent={
                typeOfAction === "action" ? action.name : undefined
              }
              reactionContent={
                typeOfAction === "reaction" ? action.name : undefined
              }
              onClick={onClickOnAreasCards}
              key={index}
            />
          ))}
      </View>
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
