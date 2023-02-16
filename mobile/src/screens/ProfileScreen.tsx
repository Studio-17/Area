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
      <View style={styles.contentContainer}>
        <MyText>Prénom : {user?.firstName}</MyText>
        <MyText>Nom : {user?.lastName}</MyText>
        <MyText>Email : {user?.email}</MyText>
        <TouchableOpacity
          style={styles.disconectionButton}
          onPress={() => handleDeconnection()}
        >
          <MyText>Disconnect</MyText>
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
  disconectionButton: {
    alignItems: "center",
    backgroundColor: "#DDDDDD",
    padding: 10,
  },
  contentContainer: {
    margin: 20,
  },
});
