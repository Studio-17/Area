import * as React from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  SafeAreaView, StatusBar
} from "react-native"

import NewAppletHeader from "../components/NewAppletHeader";
import ActionCard from "../components/ActionCard";

export default function NewAppletScreen({ navigation }: { navigation: any }) {
  return (
    <SafeAreaView style={styles.applet}>
      <NewAppletHeader navigation={navigation} />
      <View style={{ marginTop: 20 }}>
        <ActionCard textValue="IF" color="#A37C5B" />
        <ActionCard textValue="Then" color="#0165F5" />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  applet: {
    marginTop: StatusBar.currentHeight || 0,
    backgroundColor: "#FFF7FA",
  },
  textStyle: {
    color: 'black',
    fontWeight: 'bold',
    textAlign: 'center',
  }
});

// {/*<Text style={styles.textStyle}>Hide Modal</Text>*/}
// {/*<Button onPress={() => navigation.goBack()} title="Dismiss" />*/}