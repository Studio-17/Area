import React from "react";
import {
  Text,
  StyleSheet,
  Pressable,
  View,
} from "react-native";
import AppletServicesScreen from "../../screens/AppletServicesScreen";
import { MaterialCommunityIcons } from "@expo/vector-icons";

interface Props {
  textValue: string;
  color: string;
  navigation: any;
  modalVisible: boolean;
  setModalVisible: any;
}

export default function AddAreaCard({ textValue, color, navigation, modalVisible, setModalVisible }: Props) {
  return (
      <View style={[styles.cardProperties, {backgroundColor: color}]}>
        <Text style={styles.cardTitle}>{textValue}</Text>
        <AppletServicesScreen navigation={navigation} modalVisible={modalVisible} setModalVisible={setModalVisible} />
        <Pressable
          onPress={() => setModalVisible(true)}
          style={styles.cardButton}
        >
          <MaterialCommunityIcons
            name="plus"
            color={"black"}
            size={35}
          />
        </Pressable>
      </View>
  );
}

const styles = StyleSheet.create({
  cardProperties: {
    padding: 15,
    borderRadius: 15,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 30,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
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
    borderRadius: 100,
    height: 50,
    width: 50,
    marginRight: 20,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  }
});