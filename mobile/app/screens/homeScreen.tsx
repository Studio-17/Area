import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import Applet from '../components/applet';

export default function HomeScreen({ navigation }: { navigation: any }) {
    return (
        <View style={styles.cardContainer}>
            <Applet />
        </View>
    );
}

const styles = StyleSheet.create({
    cardContainer: {
      marginLeft: 20,
      marginRight: 20,
      marginTop: 20,
      marginBottom: 10,
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center'
    },
});