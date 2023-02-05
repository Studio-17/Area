import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  StatusBar,
  SafeAreaView,
  TouchableOpacity,
  Image
} from 'react-native';

import { MaterialCommunityIcons } from "@expo/vector-icons";


export default function OnboardingScreen({ navigation }: any) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={{marginTop: 20}}>
        <Text
          style={{
            fontWeight: 'bold',
            fontSize: 35,
            color: '#A37C5B',
        }}>
          R<Text style={{ color: '#0165F5' }}>e</Text>accoon
        </Text>
      </View>
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Image source={require('../assets/images/reaccoon.png')} style={{width: 300, height: 300 }} />
      </View>
      <TouchableOpacity
        style={{
          backgroundColor: '#0165F5',
          padding: 20,
          width: '90%',
          borderRadius: 100,
          marginBottom: 50,
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}
        onPress={() => navigation.navigate('Login')}>
        <Text
          style={{
            color: 'white',
            fontSize: 18,
            textAlign: 'center',
            fontWeight: 'bold',
          }}>
          Let's Begin
        </Text>
        <MaterialCommunityIcons name="arrow-collapse-right" size={22} color="#fff" />
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: StatusBar.currentHeight || 0,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF7FA',
  }
});