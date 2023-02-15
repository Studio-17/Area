import * as React from "react";
import { useEffect } from "react";
import {
  SafeAreaView,
  Text,
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
        <Text>Prénom : {user?.firstName}</Text>
        <Text>Nom : {user?.lastName}</Text>
        <Text>Email : {user?.email}</Text>
        <TouchableOpacity
          style={styles.disconectionButton}
          onPress={() => handleDeconnection()}
        >
          <Text>Disconnect</Text>
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
