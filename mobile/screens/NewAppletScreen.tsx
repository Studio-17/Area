import React, { useState } from "react";
import {
  View,
  StyleSheet,
  SafeAreaView,
  StatusBar,
} from "react-native"

import NewAppletHeader from "../components/Header/NewAppletHeader";
import ActionCard from "../components/Card/ActionCard";
import AllServicesModal from "../components/Modal/AllServicesModal";

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
    <SafeAreaView style={styles.applet}>
      <NewAppletHeader navigation={navigation} />
      <View style={{ marginTop: 20 }}>
        <ActionCard textValue="IF" color="#A37C5B" handleFunction={() => setModalVisible(true)} />
        <ActionCard textValue="Then" color="#0165F5" handleFunction={() => alert('this is a reaction!')} />
        <AllServicesModal name="service" modalVisible={modalVisible} setModalVisible={setModalVisible} data={DataServices} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  applet: {
    marginTop: StatusBar.currentHeight || 0,
    backgroundColor: "#FFF7FA",
  },
  textStyle: {
    color: "black",
    fontWeight: "bold",
    textAlign: "center",
  },
});
