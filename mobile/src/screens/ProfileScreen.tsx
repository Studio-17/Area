import * as React from "react";
import { useEffect } from "react";
import {
  SafeAreaView,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  View,
} from "react-native";

// Redux
import {
  RootState,
  useAppDispatch,
  useAppSelector,
} from "../redux/store/store";
import { logoutUser } from "../redux/slices/authSlice";

// Components
import MainHeader from "../components/MainHeader";
import MyText from "../components/MyText";

export default function ProfileScreen({ navigation }: { navigation: any }) {
  const dispatch = useAppDispatch();
  const { user, token } = useAppSelector((state: RootState) => state.auth);

  useEffect(() => {
    console.log("User profile: user: ", user);
    console.log("User profile: token: ", token)
  }, [user, token]);

  const dispatchDeconnection = () => {
    dispatch(logoutUser());
  };

  const handleDeconnection = () => {
    dispatchDeconnection();
  };

  return (
    <SafeAreaView style={styles.screenContainer}>
      <MainHeader />
      <View style={styles.contentContainer}>
        <MyText style={styles.text}>Prénom : {user?.firstName}</MyText>
        <MyText style={styles.text}>Nom : {user?.lastName}</MyText>
        <MyText style={styles.text}>Email : {user?.email}</MyText>
        <TouchableOpacity
          style={[styles.disconnectionButton, {padding: 15}]}
          onPress={() => handleDeconnection()}
        >
          <MyText style={styles.text}>Disconnect</MyText>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
    backgroundColor: "#FFF7FA",
  },
  contentContainer: {
    margin: 20,
  },
  disconnectionButton: {
    marginTop: 20,
    borderRadius: 10,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    backgroundColor: "#E6566E",
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    marginBottom: 20,
  },
  text: {
    margin: "auto",
    color: "black",
    fontSize: 20,
  },
});
