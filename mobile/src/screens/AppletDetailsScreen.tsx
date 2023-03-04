import {
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  View,
  ScrollView,
  Alert,
  Pressable,
} from "react-native";

// Icons
import { MaterialCommunityIcons } from "@expo/vector-icons";

// Components
import MyText from "../components/MyText";
import DetailsActionCard from "../components/Cards/DetailsActionCard";

// Redux
import { Action } from "../redux/models/actionModels";
import {
  useAreaQuery,
  useDeleteAreaMutation,
} from "../redux/services/servicesApi";

export default function AppletDetailsScreen({
  route,
  navigation,
}: {
  route: any;
  navigation: any;
}) {
  const { item } = route.params;
  const [deleteArea] = useDeleteAreaMutation();

  const onClickDelete = () => {
    Alert.alert("Delete", "Are you sure you want to delete this area?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Delete",
        onPress: () => {
          deleteArea(item.area.uuid);
          navigation.navigate("Home");
        },
        style: "destructive",
      },
    ]);
  };

  const onClickOnModify = () => {
    navigation.navigate("EditArea", { item: { areaData: item } });
  };

  return (
    <SafeAreaView style={styles.container}>
      <SafeAreaView style={styles.headerContainer}>
        <TouchableOpacity
          style={styles.backIcon}
          onPress={() => navigation.navigate("Home")}
        >
          <MaterialCommunityIcons
            name="chevron-left"
            color={"black"}
            size={50}
          />
        </TouchableOpacity>
        <MyText style={styles.textStyle}>{item.area.name}</MyText>
        <TouchableOpacity style={styles.backIcon} onPress={onClickOnModify}>
          <MaterialCommunityIcons
            name="pencil-outline"
            color={"black"}
            size={30}
          />
        </TouchableOpacity>
      </SafeAreaView>
      <ScrollView style={styles.contentContainer}>
        <MyText style={[styles.actionTitle, { color: "#A04000" }]}>
          Runs every
        </MyText>
        <DetailsActionCard style={{ backgroundColor: "#A04000" }}>
            Hour: {item.action.hour} Minute: {item.action.minute} Second: {item.action.second}
          </DetailsActionCard>
        <MyText style={[styles.actionTitle, { color: "#A37C5B" }]}>
          Action
        </MyText>
        <DetailsActionCard style={{ backgroundColor: "#A37C5B" }}>
          {item.action.name}
        </DetailsActionCard>
        <MyText style={[styles.actionTitle, { color: "#0165F5" }]}>
          Reactions
        </MyText>
        {item.reactions.map((reaction: Action, index: number) => (
          <DetailsActionCard style={{ backgroundColor: "#0165F5" }} key={index}>
            {reaction.name}
          </DetailsActionCard>
        ))}
        <TouchableOpacity style={styles.deleteButton} onPress={onClickDelete}>
          <MyText style={styles.deleteText}>Delete</MyText>
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
    margin: 20,
  },
  backIcon: {
    flex: 1,
  },
  textStyle: {
    fontSize: 25,
    fontWeight: "bold",
    color: "black",
    textAlign: "center",
    width: "70%",
  },
  actionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    width: "70%",
    marginBottom: 20,
  },
  deleteButton: {
    alignContent: "center",
    justifyContent: "center",
  },
  deleteText: {
    marginTop: 20,
    fontSize: 20,
    fontWeight: "bold",
    color: "red",
    textAlign: "center",
  },
});
