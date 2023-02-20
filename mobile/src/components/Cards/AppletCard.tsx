import * as React from "react";
import { StyleSheet, StatusBar, Pressable } from "react-native";

// Components
import MyText from "../MyText";

// Redux
import { Area } from "../../redux/models/areaModels";

interface AppletProps {
  navigation: any;
  area: Area | undefined;
}

export default function AppletCard({ navigation, area}: AppletProps) {
  const onPressFunction = () => {
    navigation.navigate("AppletDetailsScreen", { navigation: navigation, item: area });
  };

  return (
    <Pressable style={styles.cardProperties} onPress={onPressFunction}>
      <MyText style={styles.appletContainer}>
        <MyText style={styles.textProperties}>{area?.area.name}Name</MyText>
      </MyText>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
    backgroundColor: "#FFF7FA",
  },
  cardProperties: {
    backgroundColor: "grey",
    padding: 20,
    height: 200,
    marginVertical: 10,
    marginHorizontal: 20,
    borderRadius: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  appletContainer: {
    margin: 20,
    fontSize: 23,
    fontWeight: "bold",
  },
  textProperties: {
    color: "#000002",
  },
});
