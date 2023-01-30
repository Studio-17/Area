import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import MainContainer from "./navigation/MainContainer";

export default function App() {
  return (
    <NavigationContainer>
      <MainContainer />
    </NavigationContainer>
  );
}
