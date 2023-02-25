import React, { useState, useEffect } from "react";
import {
  Modal,
  StyleSheet,
  SafeAreaView,
  View,
  Pressable,
  StatusBar,
  TextInput,
  Button,
} from "react-native";

// Redux
import { Service } from "../../redux/models/serviceModels";

import MyText from "../MyText";
import CustomButton from "../CustomButton";
import InputField from "../InputField";

import { Action } from "../../redux/models/actionModels";

// Icons
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { GetParamsDto, PostParamsDto } from "../../redux/models/paramsModel";
import { ScrollView } from "react-native-gesture-handler";

interface Props {
  openFormModal?: boolean;
  setOpenFormModal?: any;
  onSubmitForm: any;
  action: Action;
  params: GetParamsDto[] | null;
  navigation: any;
}

export default function FormModal({
  openFormModal,
  setOpenFormModal,
  onSubmitForm,
  action,
  params,
  navigation,
}: Props) {
  const [paramsState, setParamsState] = useState<PostParamsDto[]>([]);

  useEffect(() => {
    const paramsStateTmp = params
      ? params?.map((param) => {
          return { name: param.name, content: "" };
        })
      : [];
    setParamsState(paramsStateTmp);
  }, [params]);

  const onSubmit = () => {
    onSubmitForm(
      action.type === "action" && action.name,
      action.type === "reaction" && action.name,
      action.uuid,
      paramsState
    );
    navigation.navigate("NewArea");
  };

  // const onSubmit = (e: React.SyntheticEvent) => {
  //   e.preventDefault();
  //   onSubmitForm(
  //     action.type === "action" && action.name,
  //     action.type === "reaction" && action.name,
  //     action.uuid,
  //     paramsState
  //   );
  // };

  const onChangeTextField = (name: string, content: string) => {
    const paramsStateTmp = paramsState.map((elem) => {
      return elem.name === name ? { name: name, content: content } : elem;
    });
    setParamsState(paramsStateTmp);
  };

  return (
    <Modal animationType="slide" visible={openFormModal}>
      <SafeAreaView style={styles.container}>
        <View style={styles.headerContainer}>
          <Pressable
            style={styles.button}
            onPress={() => setOpenFormModal(false)}
          >
            <MaterialCommunityIcons name="close" color={"black"} size={50} />
          </Pressable>
          <MyText style={styles.textHeaderStyle}>
            Fill in the trigger fields
          </MyText>
          <View style={{ flex: 1 }} />
        </View>
        <ScrollView>
          <View style={styles.contentConainter}>
            {/* <MyText>{params}</MyText> */}
            {/* <View
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              marginBottom: 20,
            }}
          >
            <MyText>
              {service?.name}
            </MyText>
          </View>
          <CustomButton label="Connect" onPress={onClickToConnect} /> */}
            {params?.map((param: GetParamsDto, index: number) => {
              return (
                <View key={index}>
                <MyText>{param.name}</MyText>
                <InputField
                  label={"Email Address"}
                  key={param.uuid}
                  icon={
                    <MaterialCommunityIcons
                      name="at"
                      size={20}
                      color="#666"
                      style={{ marginRight: 5 }}
                    />
                  }
                  inputTextValue={(value: string) => onChangeTextField(param.name, value)}
                />
                </View>
              );
            })}
            <Button title="Submit" onPress={onSubmit} />
          </View>
        </ScrollView>
      </SafeAreaView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight || 0,
    backgroundColor: "#FFF7FA",
  },
  headerContainer: {
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
  },
  contentConainter: {
    padding: 20,
  },
  textModal: {
    fontSize: 25,
    fontWeight: "bold",
    color: "#A37C5B",
  },
  button: {
    margin: 10,
  },
  textStyle: {
    color: "black",
    fontWeight: "bold",
    textAlign: "center",
  },
  textHeaderStyle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "black",
    textAlign: "center",
    width: "70%",
  },
});
