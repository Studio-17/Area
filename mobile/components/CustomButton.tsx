import React from 'react';
import {
  Text,
  TouchableOpacity
} from 'react-native';


export default function CustomButton({ label, onPress }: any) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        backgroundColor: '#0165F5',
        padding: 20,
        borderRadius: 100,
        marginBottom: 30,
      }}>
      <Text
        style={{
          textAlign: 'center',
          fontWeight: '700',
          fontSize: 16,
          color: '#fff',
        }}>
        {label}
      </Text>
    </TouchableOpacity>
  );
}
