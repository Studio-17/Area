import {
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  View,
  ScrollView,
} from "react-native";

// Icons
import { MaterialCommunityIcons } from "@expo/vector-icons";

// Components
import MyText from "../components/MyText";

// Redux
import { useAddAreaMutation } from "../redux/services/servicesApi";

export default function CreateAreaScreen({
  route,
  navigation,
}: {
  route: any;
  navigation: any;
}) {
  const { item } = route.params;
  const [addArea] = useAddAreaMutation();

  const onClickOnSaveButton = () => {
    const reactions: any = [];
    item.blocksState
      .filter((value: any, index: number) => index !== 0)
      .map((block: any) => reactions.push(block.uuid));
    const areaToSend = {
      action: item.blocksState[0].uuid,
      reactions: reactions,
    };
    addArea(areaToSend);
    item.setBlockState([]);
    item.setthensInstance([]);
    navigation.navigate("NewArea");
    navigation.navigate("Home");
  };

  return (
    <SafeAreaView style={styles.container}>
      <SafeAreaView style={styles.headerContainer}>
        <TouchableOpacity
          style={styles.backIcon}
          onPress={() => navigation.navigate("NewArea")}
        >
          <MaterialCommunityIcons
            name="chevron-left"
            color={"black"}
            size={50}
          />
        </TouchableOpacity>
        <MyText style={styles.textStyle}>Verify and Finish</MyText>
        <View style={{ flex: 1 }} />
      </SafeAreaView>
      <ScrollView >
        <TouchableOpacity style={styles.finishButton} onPress={() => onClickOnSaveButton()}>
          <MyText>Finish</MyText>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight || 0,
    backgroundColor: "#FFF7FA",
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  contentContainer: {
    flex: 5,
    backgroundColor: "#FFF7FA",
  },
  backIcon: {
    flex: 1,
  },
  textStyle: {
    fontSize: 25,
    fontWeight: "bold",
    color: "black",
    textAlign: "center",
  },
  finishButton: {
    padding: 10,
    borderRadius: 15,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    backgroundColor: "#0165F5",
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});
