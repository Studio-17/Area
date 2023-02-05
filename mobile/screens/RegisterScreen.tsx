import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  SafeAreaView,
  Image,
  TouchableOpacity,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
// import { useAppDispatch, useAppSelector } from '../store/store';
// import { RootState } from '../store/store';
// import { registerUser } from '../slice/authSlice';
// import { RegisterRequest } from '../models/authModel';

import InputField from "../components/InputField";
import CustomButton from "../components/CustomButton";

export default function RegisterScreen({ navigation }: any) {
  // const { loading, user, error, success } = useAppSelector(
  //   (state: RootState) => state.auth
  // );

  // const dispatch = useAppDispatch();
  // const [isSuccessfullRegister, setIsSuccessfullRegister] =
  //   useState<boolean>(false);
  // const [isErrorRegister, setIsErrorRegister] = useState<boolean>(false);
  //
  // useEffect(() => {
  //   if (success) navigation("Login");
  // }, [navigation, user, success]);
  //
  // const registerNewUser = async (data: RegisterRequest) => {
  //   dispatch(registerUser(data));
  //   console.log("data:", data);
  // };

  const [ email, setEmail ] = useState<string>("");
  const [ password, setPassword ] = useState<string>("");
  const [ firstName, setFirstName ] = useState<string>("");
  const [ lastName, setLastName ] = useState<string>("");

  const onSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();

    // const target = e.target as typeof e.target & {
    //   firstname: { value: string };
    //   lastname: { value: string };
    //   email: { value: string };
    //   password: { value: string };
    // };

    // console.log("target", target);

    // const dataToSend: RegisterRequest = {
    //   firstName: firstName,
    //   lastName: lastName,
    //   email: email,
    //   password: password,
    // };
    // registerNewUser(dataToSend);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ paddingHorizontal: 25 }}>
        <View style={{ alignItems: 'center' }}>
          <Image source={require('../assets/images/reaccoon.png')} style={{ width: 300, height: 300 }} />
        </View>

        <Text
          style={{
            fontSize: 28,
            fontWeight: 'bold',
            color: '#A37C5B',
            marginBottom: 30,
          }}>
          Create an account
        </Text>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-around',
            marginBottom: 30,
          }}>
          <TouchableOpacity
            onPress={() => {}}
            style={{
              borderColor: '#ddd',
              borderWidth: 2,
              borderRadius: 10,
              paddingHorizontal: 30,
              paddingVertical: 10,
            }}>
            <Image source={require('../assets/images/social/google.png')} style={{ width: 30, height: 30 }} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {}}
            style={{
              borderColor: '#ddd',
              borderWidth: 2,
              borderRadius: 10,
              paddingHorizontal: 30,
              paddingVertical: 10,
            }}>
            <Image source={require('../assets/images/social/twitter.png')} style={{ width: 30, height: 30 }} />
          </TouchableOpacity>
        </View>

        <Text style={{textAlign: 'center', color: '#666', marginBottom: 30}}>
          Or, register with email ...
        </Text>

        <InputField
          label={'First Name'}
          id="firstname"
          icon={
            <MaterialCommunityIcons
              name="account-outline"
              size={20}
              color="#666"
              style={{marginRight: 5}}
            />
          }
          handleChange={(e: any) => {setFirstName(e.target.value)}}
        />

        <InputField
          label={'Last Name'}
          id="lastname"
          icon={
            <MaterialCommunityIcons
              name="account-outline"
              size={20}
              color="#666"
              style={{marginRight: 5}}
            />
          }
          handleChange={(e: any) => {setLastName(e.target.value)}}
        />

        <InputField
          label={'Email Address'}
          id="email"
          icon={
            <MaterialCommunityIcons
              name="at"
              size={20}
              color="#666"
              style={{marginRight: 5}}
            />
          }
          keyboardType="email-address"
          handleChange={(e: any) => {setEmail(e.target.value)}}
        />

        <InputField
          label={'Password'}
          id="password"
          icon={
            <MaterialCommunityIcons
              name="lock-outline"
              size={20}
              color="#666"
              style={{marginRight: 5}}
            />
          }
          inputType="password"
          handleChange={(e: any) => {setPassword(e.target.value)}}
        />

        <CustomButton label={'Register'} onPress={onSubmit} />

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            marginBottom: 30,
          }}>
          <Text>Already have an account ?</Text>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={{color: '#0165F5', fontWeight: '700'}}> Login</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: StatusBar.currentHeight || 0,
    backgroundColor: '#FFF7FA',
  }
});
