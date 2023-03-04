import React from "react";
import {
  StyleSheet,
  View,
  SafeAreaView,
  StatusBar,
  Pressable,
  ScrollView,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Service } from "../redux/models/serviceModels";
import { LogBox } from "react-native";
import { images } from "../redux/models/serviceModels";

import ServiceCard from "../components/Cards/ServiceCard";

import MyText from "../components/MyText";

import { GetParamsDto, PostParamsDto } from "../redux/models/paramsModel";
import { Area } from "../redux/models/areaModels";

LogBox.ignoreLogs([
  "Non-serializable values were found in the navigation state",
]);

interface Props {
  navigation: any;
  route: any;
}

export default function ServicesScreen({ navigation, route }: Props) {
  const { item } = route.params;
  const services: Service[] | null = item.services;
  const typeOfAction: "action" | "reaction" = item.typeOfAction;
  const typeOfRequest: "new" | "modify" = item.typeOfRequest;
  const indexBlock: number = item.indexBlock;
  const onClickOnAreasCards: () => void = item.onClickOnAreasCards;
  const toScreen: string = item.toScreen;
  const area: Area = item.area;

  const handleClose = () => {
    navigation.navigate(toScreen, { item: { areaData: area } });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.modalContainer}>
        <Pressable style={styles.button} onPress={handleClose}>
          <MaterialCommunityIcons name="arrow-left" color={"black"} size={50} />
        </Pressable>
        <MyText style={styles.textHeaderStyle}>Choose a service</MyText>
        <View style={{ flex: 1 }} />
      </View>
      <ScrollView>
        <View
          style={{
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "space-between",
            marginLeft: 20,
            marginRight: 20,
          }}
        >
          {services?.map((service, index) => (
            <ServiceCard
              service={service}
              onClickService={() => {
                navigation.navigate("ActionsList", {
                  item: { service, typeOfAction, typeOfRequest, indexBlock, onClickOnAreasCards, toScreen, area },
                });
              }}
              cardGap={20}
              index={index}
              key={index}
              logo={images[service.name]}
            />
          ))}
        </View>
      </ScrollView>
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
  textHeaderStyle: {
    fontSize: 25,
    fontWeight: "bold",
    color: "black",
    textAlign: "center",
    width: "70%",
  },
});
