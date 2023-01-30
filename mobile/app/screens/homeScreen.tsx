import * as React from "react";
import { SafeAreaView, StyleSheet, FlatList, StatusBar } from "react-native";
import Applet from "../components/applet";

const DATA = [
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
      title: 'First Item',
      color: 'red'
    },
    {
      id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
      title: 'Second Item',
      color: 'blue'
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d72',
      title: 'Third Item',
      color: 'green'
    },
    {
        id: '58694a0f-3dze-471f-bd96-145571e29d72',
        title: 'Fourth Item',
        color: 'yellow'
      },
  ];

export default function HomeScreen({ navigation }: { navigation: any }) {
  return (
    <SafeAreaView style={styles.cardContainer}>
      <FlatList
        data={DATA}
        renderItem={({ item }) => <Applet navigation={navigation} item={item} />}
        keyExtractor={(item) => item.id}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
    backgroundColor: "#FFF7FA",
  },
});
