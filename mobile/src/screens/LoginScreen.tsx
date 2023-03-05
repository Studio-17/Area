import React, { useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  View,
  StatusBar,
  TouchableOpacity,
  Image,
  Keyboard,
  LogBox,
} from "react-native";

// Icons
import { MaterialCommunityIcons } from "@expo/vector-icons";

// Redux
import { loginUser, loginUserGoogle } from "../redux/slices/authSlice";
import { LoginRequest, LogInGoogleRequest } from "../redux/models/authModel";
import {
  RootState,
  useAppDispatch,
  useAppSelector,
} from "../redux/store/store";
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";

// Navigation
import InputField from "../components/InputField";
import CustomButton from "../components/CustomButton";

// Components
import MyText from "../components/MyText";

LogBox.ignoreLogs([
  "You are not currently signed in to Expo on your development machine",
]);

WebBrowser.maybeCompleteAuthSession();

export default function LoginScreen({ navigation }: any) {
  const { loading, error, user } = useAppSelector(
    (state: RootState) => state.auth
  );
  const dispatch = useAppDispatch();
  const dispatchLoginUser = async (dataToSend: LoginRequest) => {
    dispatch(loginUser(dataToSend));
  };
  const dispatchLoginUserGoogle = async (dataToSend: LogInGoogleRequest) => {
    dispatch(loginUserGoogle(dataToSend));
  };

  const [request, response, promptAsync] = Google.useAuthRequest({
    selectAccount: true,
    shouldAutoExchangeCode: false,
    expoClientId:
      "760928825534-9f7c3d69o48jl3nrj4mnlnar1qbe91d3.apps.googleusercontent.com",
  });

  React.useEffect(() => {
    if (response?.type === "success") {
      const { authentication } = response;
      const dataToSend: LogInGoogleRequest = {
        token: authentication?.accessToken,
      };
      dispatchLoginUserGoogle(dataToSend);
    }
  }, [response]);

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const onSubmit = () => {
    const dataToSend: LoginRequest = {
      email: email,
      password: password,
    };
    dispatchLoginUser(dataToSend);
  };

  const validate = async () => {
    Keyboard.dismiss();
    let isValid = true;
    if (!email) {
      // handleError('Please input email', 'email');
      isValid = false;
    }
    if (!password) {
      // handleError('Please input password', 'password');
      isValid = false;
    }
    // if (isValid) {
    //   login();
    // }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ paddingHorizontal: 25 }}>
        <View style={{ alignItems: "center" }}>
          <Image
            source={require("../assets/images/reaccoon.png")}
            style={styles.reaccoonPNG}
          />
        </View>

        <MyText
          style={{
            fontSize: 28,
            // fontWeight: 'bold',
            color: "#A37C5B",
            marginBottom: 30,
            textAlign: "center",
          }}
        >
          Connect to your account
        </MyText>

        <InputField
          label={"Email Address"}
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
          label={"Password"}
          icon={
            <MaterialCommunityIcons
              name="lock-outline"
              size={20}
              color="#666"
              style={{ marginRight: 5 }}
            />
          }
          inputType="password"
          fieldButtonLabel={"Forgot?"}
          inputTextValue={(value: string) => setPassword(value)}
        />

        <CustomButton label="Login" onPress={onSubmit} />

        <MyText style={styles.otherLoginMethod}>Or, login with ...</MyText>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            marginBottom: 30,
          }}
        >
          <TouchableOpacity
            style={styles.socialmediaBtn}
            disabled={!request}
            onPress={() => {
              promptAsync();
            }}
          >
            <Image
              source={require("../assets/images/social/google.png")}
              style={{ width: 30, height: 30 }}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.dontHaveAccount}>
          <MyText style={{ color: "#666" }}>Don't have an account ? </MyText>
          <TouchableOpacity onPress={() => navigation.navigate("Register")}>
            <MyText style={styles.registerTextBtn}>Register</MyText>
          </TouchableOpacity>
        </View>
      </View>
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
  dontHaveAccount: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 30,
  },
  registerTextBtn: {
    color: "#0165F5",
    // fontWeight: '700'
  },
  otherLoginMethod: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 30,
    color: "#666",
    textAlign: "center",
  },
});
