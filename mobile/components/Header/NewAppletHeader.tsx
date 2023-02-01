import {
  SafeAreaView,
  Text,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  View,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function NewAppletHeader({ navigation }: { navigation: any }) {
  return (
    <SafeAreaView style={styles.cardContainer}>
      <View style={styles.headerContainer}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
        >
          <MaterialCommunityIcons
            name="chevron-left"
            color={"black"}
            size={50}
          />
        </TouchableOpacity>
        <Text style={styles.textStyle}>New Applet</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    // marginTop: StatusBar.currentHeight || 0,
  },
  headerContainer: {
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
  },
  textStyle: {
    fontSize: 25,
    fontWeight: "bold",
    color: "#A37C5B",
  },
});
