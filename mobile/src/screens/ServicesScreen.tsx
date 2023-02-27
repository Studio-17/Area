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

import ServiceCard from "../components/Cards/ServiceCard";

import MyText from "../components/MyText";

import { GetParamsDto, PostParamsDto } from "../redux/models/paramsModel";

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
  const onClickOnAreasCards: (
    serviceSelected?: Service | undefined,
    actionContent?: string,
    responseContent?: string,
    uuidOfAction?: string,
    params?: PostParamsDto[] | null
  ) => void = item.onClickOnAreasCards;

  const handleClose = () => {
    navigation.navigate("NewArea");
  };

  interface Images {
    [key: string]: any;
  }

  const images: Images = {
    deezer: require("../assets/services/deezer.png"),
    discord: require("../assets/services/discord.png"),
    dropbox: require("../assets/services/dropbox.png"),
    github: require("../assets/services/github.png"),
    google: require("../assets/services/google.png"),
    miro: require("../assets/services/miro.png"),
    notion: require("../assets/services/notion.png"),
    spotify: require("../assets/services/spotify.png"),
    twitch: require("../assets/services/twitch.png"),
    typeform: require("../assets/services/typeform.png"),
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
                  item: { service, typeOfAction, onClickOnAreasCards },
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
