import React, { useState } from "react";
import {
  StyleSheet,
  ScrollView,
  View,
  StatusBar,
  SafeAreaView,
  Image,
  TouchableOpacity,
} from "react-native";

// Axios
import axios from "axios";

// Icons
import { MaterialCommunityIcons } from "@expo/vector-icons";

// Redux
import { useAppDispatch, useAppSelector } from "../redux/store/store";
import { RootState } from "../redux/store/store";
import { registerUser } from "../redux/slices/authSlice";
import { RegisterRequest } from "../redux/models/authModel";

// Components
import InputField from "../components/InputField";
import CustomButton from "../components/CustomButton";
import MyText from "../components/MyText";

// Navigation
import * as WebBrowser from "expo-web-browser";

export default function RegisterScreen({ navigation }: any) {
  const { loading, user, error, success } = useAppSelector(
    (state: RootState) => state.auth
  );

  const dispatch = useAppDispatch();

  const registerNewUser = async (data: RegisterRequest) => {
    dispatch(registerUser(data));
  };

  // const [isSuccessfullRegister, setIsSuccessfullRegister] =  useState<boolean>(false);
  // const [isErrorRegister, setIsErrorRegister] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");

  const onSubmit = () => {
    const dataToSend: RegisterRequest = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
    };
    registerNewUser(dataToSend);
    navigation.navigate("Login");
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ paddingHorizontal: 25 }}
      >
        <View style={{ alignItems: "center" }}>
          <Image
            source={require("../assets/images/reaccoon.png")}
            style={styles.reaccoonPNG}
          />
        </View>

        <MyText style={styles.createAccountText}>Create an account</MyText>

        <MyText style={styles.otherRegisterMethod}>
          Or, register with email ...
        </MyText>

        <InputField
          label="First Name"
          icon={
            <MaterialCommunityIcons
              name="account-outline"
              size={20}
              color="#666"
              style={{ marginRight: 5 }}
            />
          }
          inputTextValue={(value: string) => setFirstName(value)}
        />

        <InputField
          label="Last Name"
          icon={
            <MaterialCommunityIcons
              name="account-outline"
              size={20}
              color="#666"
              style={{ marginRight: 5 }}
            />
          }
          inputTextValue={(value: string) => setLastName(value)}
        />

        <InputField
          label="Email Address"
          icon={
            <MaterialCommunityIcons
              name="at"
              size={20}
              color="#666"
              style={{ marginRight: 5 }}
            />
          }
          inputTextValue={(value: string) => setEmail(value)}
        />

        <InputField
          label="Password"
          icon={
            <MaterialCommunityIcons
              name="lock-outline"
              size={20}
              color="#666"
              style={{ marginRight: 5 }}
            />
          }
          inputType="password"
          inputTextValue={(value: string) => setPassword(value)}
        />

        <CustomButton label="Register" onPress={onSubmit} />

        <View style={styles.haveAccount}>
          <MyText style={{ color: "#666" }}>Already have an account ? </MyText>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <MyText style={styles.loginTextBtn}>Login</MyText>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: StatusBar.currentHeight || 0,
    backgroundColor: "#FFF7FA",
    flex: 1,
  },
  reaccoonPNG: {
    width: 300,
    height: 300,
  },
  socialmediaBtn: {
    borderColor: "#ddd",
    borderWidth: 2,
    borderRadius: 10,
    paddingHorizontal: 30,
    paddingVertical: 10,
  },
  createAccountText: {
    fontSize: 28,
    // fontWeight: "bold",
    color: "#A37C5B",
    marginBottom: 30,
    textAlign: 'center',
  },
  otherRegisterMethod: {
    textAlign: "center",
    color: "#666",
    marginBottom: 30,
  },
  haveAccount: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 30,
  },
  loginTextBtn: {
    color: "#0165F5",
    // fontWeight: "700",
  },
});
