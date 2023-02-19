import React, { useState } from "react";
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

// Icons
import { MaterialCommunityIcons } from "@expo/vector-icons";

// Navigation
import { createStackNavigator } from "@react-navigation/stack";

// Redux
import { Service } from "../redux/models/serviceModels";
import { useAddAreaMutation, useServicesQuery } from "../redux/services/servicesApi";

// Components
import ServicesModal from "../components/Modals/ServicesModal";
import ActionsModal from "../components/Modals/ActionsModal";
import MyText from "../components/MyText";

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
  const [typeSelected, setTypeSelected] = useState<"action" | "reaction">(
    "action"
  );

  const { data: services, isError, isLoading } = useServicesQuery();
  const [addArea] = useAddAreaMutation();

  const onCloseServiceModal = () => {
    setOpenServicesModal(false);
    setServiceSelected(null);
  };

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

  const canAddThen = () => {
    if (blocksState[thensInstance.length] != null)
      return true;
    else
      return false;
  };

  const canSave = () => {
    if (blocksState.length > 1 && blocksState[thensInstance.length] != null)
      return true;
    else
      return false;
  };

  const onClickOnSaveButton = () => {
    const reactions: any = [];
    blocksState
      .filter((value: any, index: number) => index !== 0)
      .map((block: any) => reactions.push(block.uuid));
    const areaToSend = {
      action: blocksState[0].uuid,
      reactions: reactions,
    };
    addArea(areaToSend);
    navigation.navigate("Home");
  };

  const onClickAddthens = () => {
    setthensInstance((thens: any) => [...thens, { type: "then" }]);
  };

  const onClickRemoveBlock = (index: number) => {
    setBlockState(
      blocksState.filter((block: any, i: number) => i !== index + 1)
    );
    setthensInstance(
      thensInstance.filter((then: any, i: number) => i !== index)
    );
  };

  const onClickReset = () => {
    Alert.alert("Reset", "Are you sure you want to reset?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Reset",
        onPress: () => {
          setBlockState([]);
          setthensInstance([]);
        },
        style: "destructive",
      },
    ]);
  };

  const onClickCantSave = () => {
    Alert.alert("Save", "Please add at least 1 Action and 1 Reaction", [
      {
        text: "Ok",
        style: "cancel",
      }
    ]);
  };

  return (
    <SafeAreaView style={styles.screenContainer}>
      {!serviceSelected ? (
        <>
          <View style={styles.headerContainer}>
            <MyText style={styles.textHeaderStyle}>New coonie u said ?</MyText>
          </View>
          <ScrollView>
            <View style={styles.contentContainer}>
              {blocksState[0] ? (
                <View style={styles.cardPropertiesServiceSelected}>
                  <MyText style={styles.cardTitle}>IF</MyText>
                  <MyText>{blocksState[0].name}</MyText>
                  <TouchableOpacity style={styles.cardButton}>
                    <MaterialCommunityIcons
                      name="minus"
                      color={"black"}
                      size={35}
                    />
                  </TouchableOpacity>
                </View>
              ) : (
                <View style={styles.cardPropertiesServiceSelected}>
                  <MyText style={styles.cardTitle}>IF</MyText>
                  <TouchableOpacity
                    style={styles.cardButton}
                    onPress={() => onClickOpenModal(0, "action")}
                  >
                    <MaterialCommunityIcons
                      name="plus"
                      color={"black"}
                      size={35}
                    />
                  </TouchableOpacity>
                </View>
              )}
            </View>
            {thensInstance.map((block: any, index: number) => (
              <View
                key={index}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <View
                  style={{
                    backgroundColor: "#E2DDFF",
                    width: 10,
                    height: 30,
                  }}
                />
                <View style={styles.thenContainer}>
                  {blocksState[index + 1] ? (
                    <View style={styles.thenCardProperties}>
                      <MyText style={styles.cardTitle}>Then</MyText>
                      <MyText>{blocksState[index + 1].name}</MyText>
                      <TouchableOpacity
                        style={styles.cardButton}
                        onPress={() => onClickRemoveBlock(index)}
                      >
                        <MaterialCommunityIcons
                          name="minus"
                          color={"black"}
                          size={35}
                        />
                      </TouchableOpacity>
                    </View>
                  ) : (
                    <View style={styles.thenCardProperties}>
                      <MyText style={styles.cardTitle}>Then</MyText>
                      <TouchableOpacity
                        style={styles.cardButton}
                        onPress={() => onClickOpenModal(index + 1, "reaction")}
                      >
                        <MaterialCommunityIcons
                          name="plus"
                          color={"black"}
                          size={35}
                        />
                      </TouchableOpacity>
                    </View>
                  )}
                </View>
              </View>
            ))}
            {canAddThen() ? (
            <Pressable
              style={{
                borderRadius: 15,
                borderColor: "#0165F5",
                borderWidth: 3,
                padding: 15,
                margin: 40,
              }}
              onPress={onClickAddthens}
            >
              <MyText
                style={{
                  textAlign: "center",
                  color: "#0165F5",
                  fontSize: 20,
                }}
              >
                Add a reaction
              </MyText>
            </Pressable>
          ) : (<></>)}
          </ScrollView>
          <View style={styles.footerContainer}>
            <TouchableOpacity
              style={[styles.footerButtons, { backgroundColor: "#E6566E" }]}
              onPress={onClickReset}
            >
              <MyText style={styles.footerButtonsText}>Reset</MyText>
            </TouchableOpacity>
            {canSave() ? (
            <TouchableOpacity style={[styles.footerButtons, { backgroundColor: "#54EE51" }]} onPress={onClickOnSaveButton}>
              <MyText style={styles.footerButtonsText}>Save</MyText>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity style={styles.footerButtons} onPress={onClickCantSave}>
              <MyText style={styles.footerButtonsText}>Save</MyText>
            </TouchableOpacity>
          )}
          </View>
        </>
      ) : (
        <ActionsModal
          openActionsModal={openActionsModal}
          onCloseActionsModal={() => setOpenActionsModal(false)}
          onCloseServicesModal={() => setOpenServicesModal(false)}
          setOpenServicesModal={setOpenServicesModal}
          onClickOnAreasCards={onClickOnAreasCards}
          typeSelected={typeSelected}
          service={serviceSelected}
        />
      )}
      <ServicesModal
        openServicesModal={openServicesModal}
        onCloseServicesModal={onCloseServiceModal}
        setOpenServicesModal={setOpenServicesModal}
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
    padding: 10,
  },
  textHeaderStyle: {
    fontSize: 25,
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
  footerContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10,
    marginLeft: 20,
    marginRight: 20,
  },
  footerButtons: {
    width: "45%",
    height: 50,
    padding: 10,
    marginLeft: 10,
    marginRight: 10,
    borderRadius: 15,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
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
  footerButtonsText: {
    color: "black",
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
  cardTitle: {
    margin: "auto",
    padding: 10,
    color: "black",
    fontSize: 30,
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
  },
  scrollView: {
    backgroundColor: "pink",
    marginHorizontal: 20,
  },
});
