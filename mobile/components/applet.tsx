import * as React from "react";
import { Text, StyleSheet, Pressable } from "react-native";

interface AppletProps {
    navigation: any;
    item: AppletItem;
}

interface AppletItem {
    title: string;
    color: string;
}

export default function Applet({ navigation, item }: AppletProps) {
  const onPressFunction = () => {
    navigation.navigate('AppletContentScreen');
  };

  var divStyle2 = { backgroundColor: item.color};

  return (
    <Pressable style={[styles.cardProperties, divStyle2 ]} onPress={onPressFunction}>
      <Text style={styles.cardContainer}>
        <Text style={styles.textProperties}>{item.title}</Text>
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  cardProperties: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    height: 250,
    marginVertical: 10,
    marginHorizontal: 20,
    borderRadius: 20,
  },
  cardContainer: {
    margin: 20,
    fontSize: 23,
    fontWeight: "bold",
  },
  textProperties: {
    color: "#000002",
  },
});
