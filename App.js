import React from 'react';

import { NativeBaseProvider } from "native-base";
import { NavigationContainer } from "@react-navigation/native";
import AppDrawer from './navigation/AppDrawer';

export default function App() {
  return (
    <NativeBaseProvider>
      <NavigationContainer>
        <AppDrawer />
      </NavigationContainer>
    </NativeBaseProvider>
  );
}