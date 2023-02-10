import * as React from "react";
import { NavigationContainer } from '@react-navigation/native';
import { Provider, useSelector } from "react-redux";
import { RootState, store } from "./src/redux/store/store";

import MainNavigator from './src/navigation/MainNavigator';
import AuthNavigator from './src/navigation/AuthNavigator';


function Routes() {
  const token = useSelector((state: RootState) => state.auth.token);

  return (
    <NavigationContainer>
      { token ? <MainNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <Provider store={store}>
      <Routes />
    </Provider>
  );
}
