import * as React from "react";
import { StyleSheet, StatusBar, Text, Pressable } from "react-native";

interface AppletProps {
    navigation: any;
    item: any;
}

export default function AppletCard ({ navigation, item }: AppletProps) {
    const onPressFunction = () => {
      navigation.navigate("AppletDetailsScreen", { item: item });
    };

    return (
      <Pressable style={styles.cardProperties} onPress={onPressFunction}>
        <Text style={styles.appletContainer}>
          <Text style={styles.textProperties}>{item.name}</Text>
        </Text>
      </Pressable>
    );
  }

const styles = StyleSheet.create({
    cardContainer: {
      flex: 1,
      marginTop: StatusBar.currentHeight || 0,
      backgroundColor: "#FFF7FA",
    },
    cardProperties: {
      backgroundColor: '#f9c2ff',
      padding: 20,
      height: 200,
      marginVertical: 10,
      marginHorizontal: 20,
      borderRadius: 15,
    },
    appletContainer: {
      margin: 20,
      fontSize: 23,
      fontWeight: "bold",
    },
    textProperties: {
      color: "#000002",
    },
  });