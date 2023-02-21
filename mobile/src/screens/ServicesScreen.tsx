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
import {MaterialCommunityIcons} from "@expo/vector-icons";
import { Service } from "../redux/models/serviceModels";
import { LogBox } from 'react-native';

import ServiceCard from "../components/Cards/ServiceCard";

LogBox.ignoreLogs([
  'Non-serializable values were found in the navigation state',
]);

interface Props {
  navigation: any;
  route: any;
};

export default function ServicesScreen({ navigation, route }: Props) {
  const { item } = route.params;
  const services: Service[] | null = item.services;
  const typeOfAction: "action" | "reaction" = item.typeOfAction;
  const onClickOnAreasCards: () => void = item.onClickOnAreasCards;


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
              navigation.navigate("ActionsList", { item: { service, typeOfAction, onClickOnAreasCards } })
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
