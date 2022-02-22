// https://firebase.google.com/docs/database/security/indexing-data
import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { NativeBaseProvider, Text } from "native-base";
// import DrawerNavigation from "./navigation/DrawerNavigation";
import StackNavigation from "./navigation/StackNavigation";

export default function App() {
  return (
    <NavigationContainer>
      <NativeBaseProvider>
        {/* <DrawerNavigation /> */}
        <StackNavigation />
      </NativeBaseProvider>
    </NavigationContainer>
  );
}
