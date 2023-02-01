import React, { useState } from "react";
import {
  View,
  StyleSheet,
  SafeAreaView,
  StatusBar,
} from "react-native"

import NewAppletHeader from "../components/Header/NewAppletHeader";
import AddAreaCard from "../components/Card/AddAreaCard";

const DataServices = [
  {
    id: '1',
    title: "Google",
    color: "#4285F4",
  },
  {
    id: '2',
    title: "Facebook",
    color: "#3B5998",
  },
  {
    id: '3',
    title: "Twitter",
    color: "#1DA1F2",
  }
];


export default function NewAppletScreen({ navigation }: { navigation: any }) {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <SafeAreaView style={styles.screenContainer}>
      <NewAppletHeader navigation={navigation} />
      <View style={styles.contentContainer}>
        <AddAreaCard textValue="If" color="#A37C5B" navigation={navigation} modalVisible={modalVisible} setModalVisible={setModalVisible} />
        <AddAreaCard textValue="Then" color="#0165F5" navigation={navigation} modalVisible={modalVisible} setModalVisible={setModalVisible} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screenContainer: {
    marginTop: StatusBar.currentHeight || 0,
    backgroundColor: "#FFF7FA",
  },
  contentContainer: {
    marginTop: 20,
    paddingVertical: 13,
    paddingHorizontal: 40
  },
  textStyle: {
    color: "black",
    fontWeight: "bold",
    textAlign: "center",
  },
});
