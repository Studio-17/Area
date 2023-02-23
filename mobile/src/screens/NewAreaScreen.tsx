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

// Redux
import { Service } from "../redux/models/serviceModels";
import { useServicesQuery } from "../redux/services/servicesApi";

// Components
import MyText from "../components/MyText";

export default function NewAreaScreen(
  {
    navigation
  }: {
    navigation: any
  }) {
  const { data: services, isError, isLoading } = useServicesQuery();

  // const [serviceSelected, setServiceSelected] = useState<Service | null>(null);
  const [blocksState, setBlockState] = useState<any>([]);
  const [thensInstance, setthensInstance] = useState<any>([]);

  // useEffect(() => {
  //   if (route.params?.serviceValue || route.params?.actionContent || route.params?.reactionContent) {
  //     setServiceSelected(route.params?.serviceValue);
  //     onClickOnAreasCards(serviceSelected, route.params?.actionContent, route.params?.reactionContent, route.params?.uuidOfAction);
  //   }
  // }, [route.params?.serviceValue, route.params?.actionContent, route.params?.reactionContent, route.params?.uuidOfAction]);

  const onClickOnAreasCards = (
    serviceSelected?: Service | undefined,
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
    // setServiceSelected(null);
  };

  const onClickOpenServiceNavigator = (
    index: number,
    typeOfAction: "action" | "reaction",
    onClickOnAreasCards: (serviceSelected?: Service, actionContent?: string, responseContent?: string, uuidOfAction?: string) => void
  ) => {
    navigation.navigate("Services", {item: { services, typeOfAction, onClickOnAreasCards }})
  };

  const canAddThen = () => {
    if (blocksState[thensInstance.length] != null) return true;
    else return false;
  };

  const canContinue = () => {
    if (blocksState.length > 1 && blocksState[thensInstance.length] != null)
      return true;
    else return false;
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
  // console.log("\nblockstate :", blocksState);
  // console.log("thenstate :", thensInstance);

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

  const onClickCantContinue = () => {
    Alert.alert(
      "Continue",
      "Please add at least 1 Action and 1 Reaction and fill all the values",
      [
        {
          text: "Ok",
          style: "cancel",
        },
      ]
    );
  };

  const changeThenButton = (index: number) => {
    console.log("index :", index);
    Alert.alert("Modify the reaction", "", [
    {
      text: "Modify",
      onPress: () => {
        onClickOpenServiceNavigator(index + 1, "reaction", onClickOnAreasCards)
      },
    },
    {
      text: "Delete",
      onPress: () => {
        onClickRemoveBlock(index);
      },
      style: "destructive",
    },
    {
      text: "Cancel",
      style: "cancel",
    },
  ]);
  };


  const onClickContinue = () => {
    navigation.navigate("FinishArea", {
      item: { blocksState, setBlockState, setthensInstance },
    });
  };

  return (
    <SafeAreaView style={styles.screenContainer}>
      <>
        <View style={styles.headerContainer}>
          <MyText style={styles.textHeaderStyle}>New coonie u said ?</MyText>
        </View>
        <ScrollView>
          <View style={styles.contentContainer}>
            {blocksState[0] ? (
              <TouchableOpacity
              style={styles.cardPropertiesServiceSelected}
              onPress={() => onClickOpenServiceNavigator(0, "action", onClickOnAreasCards)}
              >
                <MyText style={styles.cardTitle}>IF</MyText>
                <MyText>{blocksState[0].name}</MyText>
              </TouchableOpacity>
            ) : (
              <View style={styles.cardPropertiesServiceSelected}>
                <MyText style={styles.cardTitle}>IF</MyText>
                <TouchableOpacity
                  style={styles.cardButton}
                  onPress={() => onClickOpenServiceNavigator(0, "action", onClickOnAreasCards)}
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
                  <TouchableOpacity
                    style={styles.thenCardProperties}
                    onPress={() => changeThenButton(index)}
                  >
                    <MyText style={styles.cardTitle}>Then</MyText>
                    <MyText>{blocksState[index + 1].name}</MyText>
                  </TouchableOpacity>
                ) : (
                  <View style={styles.thenCardProperties}>
                    <MyText style={styles.cardTitle}>Then</MyText>
                    <TouchableOpacity
                      style={styles.cardButton}
                      onPress={() => onClickOpenServiceNavigator(index + 1, "reaction", onClickOnAreasCards)}
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
            {canContinue() ? (
              <TouchableOpacity
                style={[styles.footerButtons, { backgroundColor: "#54EE51" }]}
                onPress={onClickContinue}
              >
                <MyText style={styles.footerButtonsText}>Continue</MyText>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={styles.footerButtons}
                onPress={onClickCantContinue}
              >
                <MyText style={styles.footerButtonsText}>Continue</MyText>
              </TouchableOpacity>
            )}
          </View>
      </>
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
