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

interface Props {
  navigation: any;
  blockState: any;
}

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
    item
      .filter((value: any, index: number) => index !== 0)
      .map((block: any) => reactions.push(block.uuid));
    const areaToSend = {
      action: item[0].uuid,
      reactions: reactions,
    };
    addArea(areaToSend);
    navigation.navigate("Home");
  };

  console.log(item);

  return (
    <SafeAreaView style={styles.container}>
      <SafeAreaView style={styles.headerContainer}>
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
        <MyText style={styles.textStyle}>Verify and Finish</MyText>
        <View style={{ flex: 1 }} />
      </SafeAreaView>
      <ScrollView>
        <TouchableOpacity onPress={() => onClickOnSaveButton()}>
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
});
