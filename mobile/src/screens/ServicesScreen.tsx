import React from "react";
import {
  StyleSheet,
  View,
  SafeAreaView,
  StatusBar,
  Pressable,
} from "react-native";
import {MaterialCommunityIcons} from "@expo/vector-icons";
import { Service } from "../redux/models/serviceModels";

import ServiceCard from "../components/Cards/ServiceCard";

interface Props {
  navigation: any;
  route: any;
};

export default function ServicesScreen({ navigation, route }: Props) {
  const { item } = route.params;
  const services: Service[] | null = item.services;
  const typeOfAction: "action" | "reaction" = item.typeOfAction;

  const handleClose = () => {
    navigation.navigate("NewArea");
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.modalContainer}>
        <Pressable style={styles.button} onPress={handleClose}>
          <MaterialCommunityIcons name="close" color={"black"} size={50} />
        </Pressable>
      </View>
      <View style={{ padding: 10 }}>
        {services?.map((service: Service, index: number) => (
          <ServiceCard
            service={service}
            onClickService={() => {
              navigation.navigate("ActionsList", { item: { service, typeOfAction } })
            }}
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
  }
});
