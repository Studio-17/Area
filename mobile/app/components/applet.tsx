import * as React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function Applet() {
    return (
        // Create a card that displays the applet's name, description, and icon
        <View style={styles.cardProperties}>
            <Text
                onPress={() => alert('This is the "Applet" screen.')}
                style={{ fontSize: 26, fontWeight: 'bold' }}>Applet Screen</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    cardProperties: {
        backgroundColor: '#F5F5F5',
        height: 200,
        width: '100%',
    },
});