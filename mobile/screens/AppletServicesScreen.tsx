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

interface Props {
  navigation: any;
  modalVisible: boolean;
  setModalVisible: any;
}

export default function AppletServicesScreen({
  navigation,
  modalVisible,
  setModalVisible,
}: Props) {
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
            <Text style={styles.textStyle}>Hide Modal</Text>
          </Pressable>
        </View>
        {/* <View style={{ padding: 10 }}>
        <FlatList
          data={data}
          renderItem={({ item }) => <Service item={item} />}
          keyExtractor={(item) => item.id}
        />
      </View> */}
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
    borderRadius: 20,
    padding: 20,
    elevation: 2,
  },
  textStyle: {
    color: "black",
    fontWeight: "bold",
    textAlign: "center",
  },
});
