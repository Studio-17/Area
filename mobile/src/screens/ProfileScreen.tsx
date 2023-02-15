import * as React from "react";
import { SafeAreaView, Text, StyleSheet, StatusBar } from "react-native";
import MainHeader from "../components/MainHeader";
import { logoutUser } from "../redux/slices/authSlice";
import { RootState, useAppDispatch, useAppSelector } from "../redux/store/store";
import { useEffect } from "react";
import { Button } from 'react-native';
import { TouchableOpacity } from "react-native";

export default function ProfileScreen({ navigation }: { navigation: any }) {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state: RootState) => state.auth);

  useEffect(() => {
    console.log("User profile: user: ", user);
  }, [user]);

  const dispatchDeconnection = () => {
    dispatch(logoutUser());
  };

  const handleDeconnection = () => {
    dispatchDeconnection();
  };

  return (
    <SafeAreaView style={styles.screenContainer}>
      <MainHeader />
      <Text>Prénom : {user?.firstName}</Text>
      <Text>Nom : {user?.lastName}</Text>
      <Text>Email : {user?.email}</Text>
      <TouchableOpacity style={styles.disconectionButton} onPress={() => handleDeconnection()}>
        <Text>Disconnect</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
    backgroundColor: "#FFF7FA",
    margin: 10,
  },
  disconectionButton: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10,
  },
});