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
import { Service, ServiceInfo } from "../../redux/models/serviceModels";

import * as WebBrowser from "expo-web-browser";

import AsyncStorage from "@react-native-async-storage/async-storage";

import { REACT_NATIVE_APP_API_URL } from "@env";

const API_ENDPOINT = REACT_NATIVE_APP_API_URL;

import MyText from "../MyText";
import InputField from "../InputField";

import { Action } from "../../redux/models/actionModels";

import axios from "axios";

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
  serviceInfo: ServiceInfo | undefined;
  refetchServiceInfos: any;
}

export default function FormModal({
  openFormModal,
  setOpenFormModal,
  onSubmitForm,
  action,
  params,
  navigation,
  serviceInfo,
  refetchServiceInfos,
}: Props) {
  const [paramsState, setParamsState] = useState<PostParamsDto[]>([]);

  const handleOauthConnection = async () => {
    const token = await AsyncStorage.getItem("userToken");
    const res =  await axios
      .get(`${API_ENDPOINT}/service/connect/${serviceInfo?.name}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
    const webBrowserResult = await WebBrowser.openBrowserAsync(res.data.url);
    if (webBrowserResult.type === "cancel") {
      const refetch = await refetchServiceInfos();
      if (refetch.data?.isConnected && !params) {
        setOpenFormModal(false);
        navigation.navigate("NewArea");
        onSubmitForm(
          action.type === "action" && action.name,
          action.type === "reaction" && action.name,
          action.uuid,
          paramsState
        );
      }
    }
  };

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
    setOpenFormModal(false);
    navigation.navigate("NewArea");
  };

  const onChangeTextField = (name: string, content: string) => {
    const paramsStateTmp = paramsState.map((elem) => {
      return elem.name === name ? { name: name, content: content } : elem;
    });
    setParamsState(paramsStateTmp);
  };

  return (
    <Modal animationType="slide" visible={openFormModal}>
      <SafeAreaView style={[styles.container, { backgroundColor: (serviceInfo?.color ? serviceInfo.color : "#FFF7FA") }]}>
        <View style={styles.headerContainer}>
          <Pressable
            style={styles.button}
            onPress={() => setOpenFormModal(false)}
          >
            <MaterialCommunityIcons name="close" color={"black"} size={50} />
          </Pressable>
          <MyText style={styles.textHeaderStyle}>
          {!serviceInfo?.isConnected ? ("Connect Service") : ("Fill in the trigger fields")}
          </MyText>
          <View style={{ flex: 1 }} />
        </View>
        <ScrollView>
          <View style={styles.contentConainter}>
            {!serviceInfo?.isConnected ? (
              <>
                <View
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    marginBottom: 20,
                  }}
                >
                  <MyText>Log in to {serviceInfo?.name} to continue</MyText>
                </View>
                <Button title="Connect" onPress={handleOauthConnection} />
              </>
            ) : (
              <View>
                {params?.map((param: GetParamsDto, index: number) => {
                  return (
                    <View key={index}>
                      <MyText>{param.description}</MyText>
                      <InputField
                        label={param.name}
                        key={param.uuid}
                        icon={
                          <MaterialCommunityIcons
                            name="at"
                            size={20}
                            color="#666"
                            style={{ marginRight: 5 }}
                          />
                        }
                        inputTextValue={(value: string) =>
                          onChangeTextField(param.name, value)
                        }
                      />
                    </View>
                  );
                })}
                <Button title="Submit" onPress={onSubmit} />
              </View>
            )}
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
    // backgroundColor: "#FFF7FA",
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
    fontSize: 25,
    fontWeight: "bold",
    color: "black",
    textAlign: "center",
    width: "70%",
  },
});
