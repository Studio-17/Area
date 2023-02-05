import * as React from "react";
import { NavigationContainer } from '@react-navigation/native';
// import { Provider } from "react-redux";
// import { store } from "./store/store";


// import MainNavigator from './navigation/MainNavigator';
import AuthNavigator from './navigation/AuthNavigator';


export default function App() {
  return (
    <NavigationContainer>
      <AuthNavigator />
      {/*<MainNavigator />*/}
      {/*<Provider store={store}>*/}
      {/*</Provider>*/}
    </NavigationContainer>
  );
}
