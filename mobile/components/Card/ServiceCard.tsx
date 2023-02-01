import * as React from "react";
import {
  Text,
  StyleSheet,
  Pressable
} from "react-native";

interface AppletProps {
  item: AppletItem;
}

interface AppletItem {
  title: string;
  color: string;
}

export default function Service({ item }: AppletProps) {
  const onPressFunction = () => {
    alert("You pressed service: " + item.title);
  };

  return (
    <Pressable style={[ styles.cardProperties, { backgroundColor: item.color } ]} onPress={onPressFunction}>
      <Text style={styles.cardContainer}>
        <Text style={styles.textProperties}>{item.title}</Text>
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  cardProperties: {
    padding: 10,
    borderRadius: 20,
    marginVertical: 5,
  },
  cardContainer: {
    margin: "auto",
    fontSize: 15,
    fontWeight: "bold",
  },
  textProperties: {
    color: "#000002",
  },
});
