import React, { useState } from "react";
import {
  View,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  Text,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import AddAreaCard from "../components/Cards/AddAreaCard";
import { Service } from "../redux/models/serviceModels";

export default function NewAppletScreen({ navigation }: { navigation: any }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [serviceSelected, setServiceSelected] = useState<Service | null>(null);

  return (
    <SafeAreaView style={styles.screenContainer}>
      <View style={styles.headerContainer}>
        <TouchableOpacity
          style={{ flex: 1 }}
          onPress={() => navigation.goBack()}
        >
          <MaterialCommunityIcons
            name="close"
            color={"black"}
            size={50}
          />
        </TouchableOpacity>
        <Text style={styles.textHeaderStyle}>Create</Text>
        <View style={{ flex: 1 }} />
      </View>
      <View style={styles.contentContainer}>
        <AddAreaCard
          textValue="If"
          color="#A37C5B"
          navigation={navigation}
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
        />
        {/* <AddAreaCard
          textValue="Then"
          color="#0165F5"
          navigation={navigation}
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
        /> */}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
    backgroundColor: "#FFF7FA",
  },
  contentContainer: {
    marginTop: 20,
    paddingVertical: 13,
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
  },
  textHeaderStyle: {
    fontSize: 30,
    fontWeight: "bold",
    color: "black",
  },
});
