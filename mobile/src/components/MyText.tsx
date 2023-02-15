import * as React from 'react';
import { Text, StyleSheet } from 'react-native';
import { useFonts } from 'expo-font';

export default function MyText({ children, style }: { children: any, style?: any }) {

    const [loaded] = useFonts({
        'TitanOne': require('../assets/fonts/TitanOne-Regular.ttf'),
    });

    if (!loaded) {
        return null;
    }

  return (
    <Text style={[styles.text, style]}>{children}</Text>
  );
}

const styles = StyleSheet.create({
    text: {
        fontFamily: 'TitanOne',
    },
});