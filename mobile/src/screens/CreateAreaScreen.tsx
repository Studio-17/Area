import { useState } from "react";
import {
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  View,
  ScrollView,
  TextInput,
  Button,
} from "react-native";
import { Platform } from "react-native";
import { TimePicker } from 'react-native-simple-time-picker';

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

  const getTitle = () => {
    let title = "If " + item.blocksState[0].name;
    item.blocksState.slice(1).map((block: any) => {
      title += " Then " + block.name;
    });
    return title;
  };
  const [title, setTitle] = useState<string>(getTitle);

  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const handleChange = (value: { hours: number, minutes: number, seconds: number }) => {
    setHours(value.hours);
    setMinutes(value.minutes);
    setSeconds(value.seconds);
  };
  const handleReset = () => {
    setHours(0);
    setMinutes(0);
    setSeconds(0);
  };

  const onClickOnSaveButton = () => {
    const reactions: any = [];
    item.blocksState
      .filter((value: any, index: number) => index !== 0)
      .map((block: any) => reactions.push(block.uuid));
    const areaToSend = {
      action: item.blocksState[0].uuid,
      reactions: reactions,
      name: title,
      hour: hours.toString(),
      minute: minutes.toString(),
      second: seconds.toString(),
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
      <ScrollView style={styles.contentContainer}>
        <MyText style={[styles.textStyle, { color: "#A37C5B" }]}>Title</MyText>
        <View style={styles.titleInput}>
          <TextInput
            editable
            multiline
            numberOfLines={4}
            maxLength={140}
            onChangeText={(text) => setTitle(text)}
            value={title}
            style={[styles.textTitleInput]}
          />
        </View>
        <MyText style={[styles.textStyle, { color: "#A37C5B" }]}>Timer (hours - minutes)</MyText>
        <View style={styles.timeContainer}>
        <TimePicker value={{ hours, minutes, seconds }} onChange={handleChange} itemStyle={
          {
            borderColor: '#A37C5B',
            alignItems: 'center',
            justifyContent: 'center',
          }
        } />
        </View>
        {title ? (
        <TouchableOpacity
          style={styles.finishButton}
          onPress={() => onClickOnSaveButton()}
        >
          <MyText style={styles.textStyle}>Finish</MyText>
        </TouchableOpacity>
        ) : null}
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
  titleInput: {
    backgroundColor: "#FFFFFF",
    borderRadius: 15,
    height: 100,
    borderColor: "#A37C5B",
    borderWidth: 3,
    marginBottom: 20,
  },
  timeContainer: {
    backgroundColor: "#FFFFFF",
    borderRadius: 15,
    borderColor: "#A37C5B",
    borderWidth: 3,
  },
  textTitleInput: {
    fontSize: 15,
    fontWeight: "bold",
    color: "black",
    padding: 10,
    fontFamily: "TitanOne",
  },
  contentContainer: {
    margin: 20,
  },
  backIcon: {
    flex: 1,
  },
  textStyle: {
    fontSize: 25,
    fontWeight: "bold",
    color: "black",
  },
  finishButton: {
    marginTop: 20,
    padding: 10,
    borderRadius: 15,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
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
  datePicker: {
    justifyContent: "center",
    alignItems: "flex-start",
    width: 320,
    height: 260,
    display: "flex",
  },
});
