import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { createStackNavigator } from "@react-navigation/stack";
import { Action } from "../redux/models/actionModels";
import { Service } from "../redux/models/serviceModels";

import ServicesModal from "../components/Modals/ServicesModal";

const Stack = createStackNavigator();

export default function NewAppletStack() {
  return (
    <Stack.Navigator
      initialRouteName="NewApplet"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="NewApplet" component={NewAppletScreen} />
    </Stack.Navigator>
  );
}

function NewAppletScreen({ navigation }: { navigation: any }) {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [blockNumberSelected, setBlockNumberSelected] = useState<number>(0);
  const [serviceSelected, setServiceSelected] = useState<Service | null>(null);
  const [actionSelected, setActionSelected] = useState<Action | null>(null);
  const [blocksState, setBlockState] = useState<any>([]);
  const [thensInstance, setthensInstance] = useState<any>([]);
  const [typeSelected, setTypeSelected] = useState<"action" | "reaction">(
    "action"
  );

  const services = [
    {
      name: "Service 1",
      uuid: "uuid1",
      description: "Description 1",
    },
    {
      name: "Service 2",
      uuid: "uuid2",
      description: "Description 2",
    },
    {
      name: "Service 3",
      uuid: "uuid3",
      description: "Description 3",
    },
  ];

  const onClickOpenModal = (
    index: number,
    typeOfAction: "action" | "reaction"
  ) => {
    setTypeSelected(typeOfAction);
    setOpenModal(true);
    setBlockNumberSelected(index);
  };

  const onClickOnAreasCards: any = (
    actionContent?: string,
    reactionContent?: string,
    uuidOfAction?: string
  ) => {
    actionContent &&
      setBlockState((state: any) => [
        ...state,
        {
          name: actionContent,
          service: serviceSelected?.name,
          uuid: uuidOfAction,
        },
      ]);
    reactionContent &&
      setBlockState((state: any) => [
        ...state,
        {
          name: reactionContent,
          service: serviceSelected?.name,
          uuid: uuidOfAction,
        },
      ]);
  };

  return (
    <SafeAreaView style={styles.screenContainer}>
      <View style={styles.headerContainer}>
        <Text style={styles.textHeaderStyle}>New coonie u said ?</Text>
      </View>
      <View style={styles.contentContainer}>
        <ServicesModal open={openModal} onClose={() => setOpenModal(false)} services={services} setServiceSelected={setServiceSelected} setActionSelected={setActionSelected} />
        {blocksState[0] ? (
          <View style={styles.cardProperties}>
            <Text style={styles.cardTitle}>IF</Text>
            <Text>{serviceSelected?.name}</Text>
            <TouchableOpacity style={styles.cardButton}>
              <MaterialCommunityIcons name="minus" color={"black"} size={35} />
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.cardProperties}>
            <Text style={styles.cardTitle}>IF</Text>
            {/*<Text>Yo</Text>*/}
            <Text>{actionSelected?.name}</Text>
            <TouchableOpacity
              style={styles.cardButton}
              onPress={() => onClickOpenModal(0, "action")}
            >
              <MaterialCommunityIcons name="plus" color={"black"} size={35} />
            </TouchableOpacity>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    paddingTop: StatusBar.currentHeight || 0,
    backgroundColor: "#FFF7FA",
  },
  contentContainer: {
    marginTop: 20,
    paddingVertical: 13,
    paddingHorizontal: 40,
  },
  textStyle: {
    color: "black",
    fontWeight: "bold",
    textAlign: "center",
  },
  cardContainer: {
    marginTop: StatusBar.currentHeight || 0,
  },
  headerContainer: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "center",
  },
  textHeaderStyle: {
    fontSize: 25,
    fontWeight: "bold",
    color: "black",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  cardProperties: {
    padding: 15,
    borderRadius: 15,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 30,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    backgroundColor: "grey",
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  cardTitle: {
    margin: "auto",
    padding: 10,
    color: "black",
    fontSize: 35,
    fontWeight: "bold",
  },
  cardButton: {
    backgroundColor: "white",
    borderRadius: 50,
    height: 50,
    width: 50,
    marginRight: 20,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
});
