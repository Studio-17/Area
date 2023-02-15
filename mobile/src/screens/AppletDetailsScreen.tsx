import {
  SafeAreaView,
  Text,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  View,
} from "react-native";

// Icons
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function AppletDetailsScreen({
  route,
  navigation,
}: {
  route: any;
  navigation: any;
}) {
  const { item } = route.params;
  return (
    <SafeAreaView style={styles.cardContainer}>
      <View style={styles.headerContainer}>
        <TouchableOpacity
          style={styles.backIcon}
          onPress={() => navigation.goBack()}
        >
          <MaterialCommunityIcons
            name="chevron-left"
            color={"black"}
            size={50}
          />
        </TouchableOpacity>
        <Text style={styles.textStyle}>{item.name}</Text>
        <View style={{ flex: 1 }} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    display: "flex",
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
    backgroundColor: "#FFF7FA",
  },
  headerContainer: {
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  backIcon: {
    flex: 1,
  },
  textStyle: {
    fontSize: 35,
    fontWeight: "bold",
    color: "black",
    margin: 10,
  },
});
