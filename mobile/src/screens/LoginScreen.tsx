import React, { useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  Image,
  Keyboard,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { RootState, useAppDispatch, useAppSelector } from "../redux/store/store";
import { loginUser } from "../redux/slices/authSlice";
import { LoginRequest } from "../redux/models/authModel";

import InputField from "../components/InputField";
import CustomButton from "../components/CustomButton";


export default function LoginScreen({ navigation }: any) {
  const { loading, error, user } = useAppSelector(
    (state: RootState) => state.auth
  );
  const dispatch = useAppDispatch();
  const dispatchLoginUser = async (dataToSend: LoginRequest) => {
    dispatch(loginUser(dataToSend));
  };

  // console.log('error: ', error);
  // console.log('loading: ', loading);

  const [ email, setEmail ] = useState<string>("");
  const [ password, setPassword ] = useState<string>("");

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
        <View style={{ alignItems: 'center' }}>
          <Image source={require('../assets/images/reaccoon.png')} style={styles.reaccoonPNG} />
        </View>

        <Text
          style={{
            fontSize: 28,
            fontWeight: 'bold',
            color: '#A37C5B',
            marginBottom: 30,
          }}>
          Connect to your account
        </Text>

        <InputField
          label={'Email Address'}
          icon={
            <MaterialCommunityIcons
              name="at"
              size={20}
              color="#666"
              style={{ marginRight: 5 }}
            />
          }
          inputTextValue={(value: string) => setEmail(value)}
          // onFocus={() => {}}
        />

        <InputField
          label={'Password'}
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
          // onFocus={() => {}}
        />

        <CustomButton label="Login" onPress={onSubmit} />

        <Text style={styles.otherLoginMethod}>
          Or, login with ...
        </Text>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-around',
            marginBottom: 30,
          }}>
          <TouchableOpacity style={styles.socialmediaBtn}>
            <Image source={require('../assets/images/social/google.png')} style={{ width: 30, height: 30 }} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.socialmediaBtn}>
            <Image source={require('../assets/images/social/twitter.png')} style={{ width: 30, height: 30 }} />
          </TouchableOpacity>
        </View>

        <View style={styles.dontHaveAccount}>
          <Text>Don't have an account ? </Text>
          <TouchableOpacity
            onPress={() => navigation.navigate('Register')}
          >
            <Text style={styles.registerTextBtn}>Register</Text>
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
    height: 300
  },
  socialmediaBtn: {
    borderColor: '#ddd',
    borderWidth: 2,
    borderRadius: 10,
    paddingHorizontal: 30,
    paddingVertical: 10,
  },
  dontHaveAccount: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 30
  },
  registerTextBtn: {
    color: '#0165F5',
    fontWeight: '700'
  },
  otherLoginMethod: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 30
  }
});
