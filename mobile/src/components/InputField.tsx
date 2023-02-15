import React from "react";
import { View, TouchableOpacity, TextInput } from "react-native";

// Components
import MyText from "../components/MyText";

interface Props {
  label?: string;
  icon?: any;
  inputType?: string;
  keyboardType?: any;
  fieldButtonLabel?: string;
  fieldButtonFunction?: any;
  inputTextValue?: any;
}

export default function InputField({
  label,
  icon,
  inputType,
  keyboardType,
  fieldButtonLabel,
  fieldButtonFunction,
  inputTextValue,
}: Props) {
  return (
    <View
      style={{
        flexDirection: "row",
        borderBottomColor: "#ccc",
        borderBottomWidth: 1,
        paddingBottom: 8,
        marginBottom: 25,
      }}
    >
      {icon}
      {inputType == "password" ? (
        <TextInput
          placeholder={label}
          keyboardType={keyboardType}
          style={{ flex: 1, paddingVertical: 0 }}
          secureTextEntry={true}
          onChangeText={inputTextValue}
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
        <MyText style={{ color: "#0165F5", fontWeight: "700" }}>
          {fieldButtonLabel}
        </MyText>
      </TouchableOpacity>
    </View>
  );
}
