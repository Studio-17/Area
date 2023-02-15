import * as React from "react";
import {
  FlatList,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  SafeAreaView,
  View,
  Pressable,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Service from "../components/Cards/ServiceCard";

interface Props {
  navigation: any;
  modalVisible: boolean;
  setModalVisible: any;
}

const DATA = [
  {
    id: "1",
    title: "Google",
    color: "#4285F4",
  },
  {
    id: "2",
    title: "Spotify",
    color: "#1DB954",
  },
  {
    id: "3",
    title: "Netflix",
    color: "#E50914",
  },
];

export default function AppletServicesScreen({
  navigation,
  modalVisible,
  setModalVisible,
}: Props) {
  const data = DATA;

  return (
    <Modal
      animationType="slide"
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(!modalVisible);
      }}
    >
      <SafeAreaView>
        <View style={styles.modalContainer}>
          <Pressable
            style={styles.button}
            onPress={() => setModalVisible(!modalVisible)}
          >
            <MaterialCommunityIcons name="close" color={"black"} size={50} />
          </Pressable>
        </View>
        <View style={{ padding: 10 }}>
          <FlatList
            data={data}
            renderItem={({ item }) => <Service item={item} />}
            keyExtractor={(item) => item.id}
          />
        </View>
      </SafeAreaView>
    </Modal>
  );
}

const styles = StyleSheet.create({
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