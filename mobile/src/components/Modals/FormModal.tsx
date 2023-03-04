import React, { useState, useEffect } from "react";
import {
  Modal,
  StyleSheet,
  SafeAreaView,
  View,
  Pressable,
  StatusBar,
  Button,
  Image,
  TouchableOpacity,
} from "react-native";

// Redux
import { ServiceInfo } from "../../redux/models/serviceModels";
import { Area } from "../../redux/models/areaModels";

import * as WebBrowser from "expo-web-browser";

import AsyncStorage from "@react-native-async-storage/async-storage";

// import { REACT_NATIVE_APP_API_URL } from "@env";

const API_ENDPOINT = "http://localhost:8080/api/reaccoon";

import MyText from "../MyText";
import InputField from "../InputField";
import { capitalizeNames } from "../../components/Cards/CapitalizeNames";

import { Action } from "../../redux/models/actionModels";

import axios from "axios";

// Icons
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { GetParamsDto, PostParamsDto } from "../../redux/models/paramsModel";
import { ScrollView } from "react-native-gesture-handler";
import { images } from "../../redux/models/serviceModels";

interface Props {
  openFormModal?: boolean;
  setOpenFormModal?: any;
  onSubmitForm: any;
  action: Action;
  params: GetParamsDto[] | null;
  navigation: any;
  serviceInfo: ServiceInfo | undefined;
  refetchServiceInfos: any;
  indexBlock?: number;
  toScreen: string;
  area: Area;
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
  indexBlock,
  toScreen,
  area
}: Props) {
  const [paramsState, setParamsState] = useState<PostParamsDto[]>([]);

  const handleOauthConnection = async () => {
    const token = await AsyncStorage.getItem("userToken");
    const res = await axios
      .get(`${API_ENDPOINT}/service/connect/${serviceInfo?.name}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => res);
    const webBrowserResult = await WebBrowser.openAuthSessionAsync(res.data.url, `${API_ENDPOINT}/service/connect/${serviceInfo?.name}/redirect`);
    if (webBrowserResult.type === "cancel") {
      const refetch = await refetchServiceInfos();
      if (refetch.data?.isConnected && !params) {
        onSubmit();
      }
    }
  };

  const connectBotToDiscord = async () => {
    await WebBrowser.openBrowserAsync(
      "https://discord.com/oauth2/authorize?client_id=1073274269133455460&scope=bot&permissions=1503507196976"
    );
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
      action.type === "action" ? action.name : undefined,
      action.type === "reaction" ? action.name : undefined,
      action.uuid,
      paramsState,
      indexBlock
    );
    setOpenFormModal(false);
    navigation.navigate(toScreen, { item: { areaData: area } });
  };

  const onChangeTextField = (name: string, content: string) => {
    const paramsStateTmp = paramsState.map((elem) => {
      return elem.name === name ? { name: name, content: content } : elem;
    });
    setParamsState(paramsStateTmp);
  };

  return (
    <Modal animationType="slide" visible={openFormModal}>
      <SafeAreaView
        style={[
          styles.container,
          {
            backgroundColor: serviceInfo?.color ? serviceInfo.color : "#FFF7FA",
          },
        ]}
      >
        <View style={styles.headerContainer}>
          <Pressable
            style={styles.button}
            onPress={() => setOpenFormModal(false)}
          >
            <MaterialCommunityIcons name="close" color={"black"} size={50} />
          </Pressable>
          <MyText style={styles.textHeaderStyle}>
            {!serviceInfo?.isConnected
              ? "Connect Service"
              : "Fill in the trigger fields"}
          </MyText>
          <View style={{ flex: 1 }} />
        </View>
        <ScrollView>
          <View style={styles.contentConainter}>
            {(!serviceInfo?.isConnected && serviceInfo?.type === "external") ? (
              <>
                <View
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    marginBottom: 20,
                  }}
                >
                  <Image
                    source={
                      images[serviceInfo?.name ? (serviceInfo?.name).replace("-", "_") : "loading"]
                    }
                    style={styles.logo}
                  />
                  <MyText style={[styles.textStyle, { fontSize: 25 }]}>
                    Log in to {capitalizeNames(serviceInfo?.name ? serviceInfo.name : "loading")} to continue
                  </MyText>
                </View>
                <TouchableOpacity
                  style={{
                    padding: 10,
                    borderRadius: 15,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    width: "100%",
                    borderColor: "black",
                    borderWidth: 3,
                  }}
                  onPress={handleOauthConnection}
                >
                  <MyText style={{ color: "black", fontSize: 20 }}>
                    Connect
                  </MyText>
                </TouchableOpacity>
              </>
            ) : (
              <View>
                {serviceInfo?.name === "discord" && (
                  <TouchableOpacity
                    style={[styles.buttonContainer, { marginBottom: 20 }]}
                    onPress={connectBotToDiscord}
                  >
                    <MyText
                      style={[
                        styles.textStyle,
                        { fontSize: 17 },
                      ]}
                    >
                      Connect the Bot
                    </MyText>
                  </TouchableOpacity>
                )}
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
                <TouchableOpacity
                  style={styles.buttonContainer}
                  onPress={onSubmit}
                >
                  <MyText
                    style={[
                      styles.textStyle,
                      { fontSize: 20 },
                    ]}
                  >
                    Submit
                  </MyText>
                </TouchableOpacity>
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
  logo: {
    width: 100,
    height: 100,
    marginBottom: 10,
  },
  buttonContainer: {
    padding: 10,
    borderRadius: 15,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    borderColor: "black",
    borderWidth: 3,
    justifyContent: "center",
    alignItems: "center",
  },
});
