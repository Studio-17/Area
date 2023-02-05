import * as React from "react";
import { NavigationContainer } from '@react-navigation/native';
import MainNavigator from './navigation/MainNavigator';
import AuthNavigator from './navigation/AuthNavigator';

export default function App() {
  return (
    <NavigationContainer>
      {/*<MainNavigator />*/}
      <AuthNavigator />
    </NavigationContainer>
  );
}
