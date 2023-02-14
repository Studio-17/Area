import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  StatusBar,
  Pressable
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { createStackNavigator } from "@react-navigation/stack";
import { Service } from "../redux/models/serviceModels";
import { useServicesQuery } from "../redux/services/servicesApi";

import ServicesModal from "../components/Modals/ServicesModal";
import ActionsModal from "../components/Modals/ActionsModal";

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
  const [openServicesModal, setOpenServicesModal] = useState<boolean>(false);
  const [openActionsModal, setOpenActionsModal] = useState<boolean>(false);
  const [serviceSelected, setServiceSelected] = useState<Service | null>(null);
  const [blocksState, setBlockState] = useState<any>([]);
  const [thensInstance, setthensInstance] = useState<any>([]);
  const [typeSelected, setTypeSelected] = useState<"action" | "reaction">("action");
  // const [blockNumberSelected, setBlockNumberSelected] = useState<number>(0);

  const { data: services, isError, isLoading } = useServicesQuery();

  const onCloseServiceModal = () => {
    setOpenServicesModal(false);
    setServiceSelected(null);
  }

  const onClickOpenModal = (
    index: number,
    typeOfAction: "action" | "reaction"
  ) => {
    setTypeSelected(typeOfAction);
    setOpenServicesModal(true);
    // setBlockNumberSelected(index);
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
    setServiceSelected(null);
  };

  const onClickAddthens = () => {
    setthensInstance((thens: any) => [...thens, { type: "then" }]);
  };

  return (
    <SafeAreaView style={styles.screenContainer}>
      {!serviceSelected ? (
        <>
          <View style={styles.headerContainer}>
            <Text style={styles.textHeaderStyle}>New coonie u said ?</Text>
          </View>
          <View style={styles.contentContainer}>
            {blocksState[0] ? (
              <View style={styles.cardPropertiesServiceSelected}>
                <Text style={styles.cardTitle}>IF</Text>
                <Text>{blocksState[0].name}</Text>
                <TouchableOpacity style={styles.cardButton}>
                  <MaterialCommunityIcons name="minus" color={"black"} size={35} />
                </TouchableOpacity>
              </View>
            ) : (
              <View style={styles.cardProperties}>
                <Text style={styles.cardTitle}>IF</Text>
                <TouchableOpacity
                  style={styles.cardButton}
                  onPress={() => onClickOpenModal(0, "action")}
                >
                  <MaterialCommunityIcons name="plus" color={"black"} size={35} />
                </TouchableOpacity>
              </View>
            )}
          </View>
          {thensInstance.map((block: any, index: number) => (
            <View key={index} style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}>
              <View style={{
                backgroundColor: "#E2DDFF",
                width: 10,
                height: 30,
              }} />
              <View style={styles.thenContainer}>
                {blocksState[index + 1] ? (
                  <View style={styles.thenCardProperties}>
                    <Text style={styles.cardTitle}>Then</Text>
                    <Text>{blocksState[index + 1].name}</Text>
                    <TouchableOpacity style={styles.cardButton}>
                      <MaterialCommunityIcons name="minus" color={"black"} size={35} />
                    </TouchableOpacity>
                  </View>
                ): (
                  <View style={styles.thenCardProperties}>
                    <Text style={styles.cardTitle}>Then</Text>
                    <TouchableOpacity
                      style={styles.cardButton}
                      onPress={() => onClickOpenModal(index + 1, "reaction")}
                    >
                      <MaterialCommunityIcons name="plus" color={"black"} size={35} />
                    </TouchableOpacity>
                  </View>
                )}
              </View>
            </View>
          ))}
          <Pressable
            style={{
              borderRadius: 15,
              borderColor: "#0165F5",
              borderWidth: 3,
              padding: 15,
              marginVertical: 15,
              marginHorizontal: 40,
            }}
            onPress={onClickAddthens}
          >
            <Text style={{
              textAlign: "center",
              color: "#0165F5",
              fontWeight: "bold",
              fontSize: 20,
            }}>
              Add thens
            </Text>
          </Pressable>
        </>
      ) : (
        <ActionsModal
          openActionsModal={openActionsModal}
          onCloseActionsModal={() => setOpenActionsModal(false)}
          onCloseServicesModal={() => setOpenServicesModal(false)}
          onClickOnAreasCards={onClickOnAreasCards}
          typeSelected={typeSelected}
          service={serviceSelected}
        />
      )}
      <ServicesModal
        openServicesModal={openServicesModal}
        onCloseServicesModal={onCloseServiceModal}
        setOpenActionModal={setOpenActionsModal}
        setServiceSelected={setServiceSelected}
        services={services}
      />
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
    paddingTop: 13,
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
  cardPropertiesServiceSelected: {
    padding: 10,
    borderRadius: 15,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    // marginBottom: 30,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    backgroundColor: "#A37C5B",
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  cardTitle: {
    margin: "auto",
    padding: 10,
    color: "black",
    fontSize: 30,
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
  thenContainer: {
    width: "100%",
    paddingHorizontal: 40,
  },
  thenCardProperties: {
    padding: 10,
    borderRadius: 15,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    backgroundColor: "#0165F5",
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  }
});
