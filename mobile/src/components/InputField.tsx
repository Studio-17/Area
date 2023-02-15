import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput
} from 'react-native';

interface Props {
  label?: string;
  icon?: any;
  inputType?: string;
  keyboardType?: any;
  fieldButtonLabel?: string;
  fieldButtonFunction?: any;
  inputTextValue?: any;
  onFocus?: any;
  error?: any;
}


export default function InputField(
  {
    label,
    icon,
    inputType,
    keyboardType,
    fieldButtonLabel,
    fieldButtonFunction,
    inputTextValue,
    onFocus,
    error,
  }: Props) {
  const [isFocused, setIsFocused] = React.useState(false);

  // const handleFocus = () => {
  //   onFocus();
  //   // setIsFocused(true);
  // };

  return (
    <View
      style={{
        flexDirection: 'row',
        borderBottomColor: '#ccc',
        borderBottomWidth: 1,
        paddingBottom: 8,
        marginBottom: 25,
      }}>
      {icon}
      {inputType == 'password' ? (
        <TextInput
          placeholder={label}
          keyboardType={keyboardType}
          style={{ flex: 1, paddingVertical: 0 }}
          secureTextEntry={true}
          onChangeText={inputTextValue}
          // onFocus={() => onFocus()}
        />
      ) : (
        <TextInput
          placeholder={label}
          keyboardType={keyboardType}
          style={{ flex: 1, paddingVertical: 0 }}
          onChangeText={inputTextValue}
        />
      )}
      <TouchableOpacity onPress={fieldButtonFunction}>
        <Text style={{color: '#0165F5', fontWeight: '700'}}>{fieldButtonLabel}</Text>
      </TouchableOpacity>
      {error && (
        <Text style={{marginTop: 7, color: "red", fontSize: 12}}>
          {error}
        </Text>
      )}
    </View>
  );
}
