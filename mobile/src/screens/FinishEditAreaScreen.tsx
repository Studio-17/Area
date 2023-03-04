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
import DateTimePickerModal from "react-native-modal-datetime-picker";

// Icons
import { MaterialCommunityIcons } from "@expo/vector-icons";

// Components
import MyText from "../components/MyText";

// Redux
import { useEditAreaMutation } from "../redux/services/servicesApi";
import { Area } from "../redux/models/areaModels";

export default function FinishEditAreaScreen(
  {
    route,
    navigation,
  }: {
  route: any;
  navigation: any;
}) {
  const { item } = route.params;
  const [editArea, error] = useEditAreaMutation();
  const toScreen = item.toScreen;
  const area: Area = item.area;

  const [title, setTitle] = useState<string>(item.title);
  const [isTimePickerVisible, setTimePickerVisibility] = useState(false);
  const [hours, setHours] = useState(item.hours);
  const [minutes, setMinutes] = useState(item.minutes);
  const [seconds, setSeconds] = useState(item.seconds);
  const [color, setColorSelected] = useState(item.color);
  // console.log("color: ", color);

  const onClickOnSaveButton = () => {
    const reactions: any = [];
    item.blocksState
      .filter((value: any, index: number) => index !== 0)
      .map((block: any) =>
        reactions.push({ id: block.uuid, params: block.params })
      );
    const areaToUpdate = {
      action: {
        id: item.blocksState[0].uuid,
        params: item.blocksState[0].params,
      },
      reactions: reactions,
      name: title,
      hour: hours.toString() === "00" ? "*" : hours.toString(),
      minute: minutes.toString() === "00" ? "*" : minutes.toString(),
      second: seconds.toString() === "00" ? "*" : seconds.toString(),
      color: color,
    };
    editArea({areaToUpdate, areaId: area?.area.uuid});
    console.log(areaToUpdate);
    item.setBlockState([]);
    item.setthensInstance([]);
    navigation.navigate(toScreen);
  };

  const showTimePicker = () => {
    setTimePickerVisibility(true);
  };

  const hideTimePicker = () => {
    setTimePickerVisibility(false);
  };

  const handleConfirm = (time: any) => {
    const dt = new Date(time);
    const x = dt.toLocaleTimeString();
    const finalTime = x.split(":", 2);
    setHours(finalTime[0]);
    setMinutes(finalTime[1]);
    setSeconds("0");
    hideTimePicker();
  };

  return (
    <SafeAreaView style={styles.container}>
      <SafeAreaView style={styles.headerContainer}>
        <TouchableOpacity
          style={styles.backIcon}
          onPress={() => navigation.navigate(toScreen, { item: { areaData: area } })}
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
        <MyText style={[styles.textStyle, { color: "#A37C5B" }]}>Title:</MyText>
        <View style={styles.titleInput}>
          <TextInput
            editable
            multiline
            numberOfLines={4}
            maxLength={50}
            onChangeText={(text) => setTitle(text)}
            value={title}
            style={styles.textTitleInput}
          />
        </View>
        <MyText style={[styles.textStyle, { color: "#A37C5B" }]}>
          Run every:
        </MyText>
        <TouchableOpacity
          style={styles.selectTimeButton}
          onPress={showTimePicker}
        >
          <MyText style={styles.textTitleInput}>
            Hours: {hours} Minutes: {minutes}
          </MyText>
        </TouchableOpacity>
        <DateTimePickerModal
          isVisible={isTimePickerVisible}
          mode="time"
          onConfirm={handleConfirm}
          onCancel={hideTimePicker}
        />
        <MyText style={[styles.textStyle, { color: "#A37C5B" }]}>
          Area Color:
        </MyText>
        <View style={styles.colorContainer}>
          <View style={styles.colorInput}>
            <TextInput
              maxLength={7}
              onChangeText={(textColor) => setColorSelected(textColor)}
              value={color}
              placeholder="#"
              style={styles.textTitleInput}
            />
          </View>
          <View style={[styles.colorResult, { backgroundColor: color }]} />
        </View>
        {color.length === 7 ? null : (<MyText style={[{ color: "red" }]}>Please add an existant hexacode color</MyText>)}
        {title && color.length === 7  ? (
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
  colorContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  colorInput: {
    backgroundColor: "#FFFFFF",
    borderRadius: 15,
    borderColor: "#A37C5B",
    borderWidth: 3,
    width: "80%",
  },
  colorResult: {
    backgroundColor: "#FFFFFF",
    borderRadius: 15,
    borderColor: "#A37C5B",
    borderWidth: 3,
    width: "15%",
  },
  timeContainer: {
    backgroundColor: "#FFFFFF",
    borderRadius: 15,
    borderColor: "#A37C5B",
    borderWidth: 3,
  },
  textTitleInput: {
    fontSize: 17,
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
  selectTimeButton: {
    borderRadius: 15,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    borderColor: "#A37C5B",
    backgroundColor: "#FFFFFF",
    borderWidth: 3,
    marginBottom: 20,
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
