import React from "react";
import {
  StyleSheet,
  View,
  StatusBar,
  SafeAreaView,
  TouchableOpacity,
  Image,
} from "react-native";

// Icons
import { MaterialCommunityIcons } from "@expo/vector-icons";

// Components
import MyText from "../components/MyText";

export default function OnboardingScreen({ navigation }: any) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={{ marginTop: 20 }}>
        <MyText
          style={{
            fontWeight: "bold",
            fontSize: 35,
            color: "#A37C5B",
          }}
        >
          R<MyText style={{ color: "#0165F5" }}>e</MyText>accoon
        </MyText>
      </View>
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Image
          source={require("../assets/images/reaccoon.png")}
          style={styles.reaccoonPNG}
        />
      </View>
      <TouchableOpacity
        style={styles.letsBeginBtn}
        onPress={() => navigation.navigate("Login")}
      >
        <MyText style={styles.letsBeginBtnText}>Let's Begin</MyText>
        <MaterialCommunityIcons
          name="arrow-collapse-right"
          size={22}
          color="#fff"
        />
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: StatusBar.currentHeight || 0,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFF7FA",
  },
  reaccoonPNG: {
    width: 300,
    height: 300,
  },
  letsBeginBtn: {
    backgroundColor: "#0165F5",
    padding: 20,
    width: "90%",
    borderRadius: 100,
    marginBottom: 50,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  letsBeginBtnText: {
    color: "white",
    fontSize: 18,
    textAlign: "center",
    fontWeight: "bold",
  },
});
