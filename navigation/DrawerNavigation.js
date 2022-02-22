import React from "react";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
} from "@react-navigation/drawer";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import {
  Box,
  Pressable,
  VStack,
  Text,
  Center,
  HStack,
  Divider,
  Icon,
} from "native-base";
import HomeScreen from "../screens/HomeScreen";
import AboutScreen from "../screens/AboutScreen";
import ContactScreen from "../screens/ContactScreen";

const Drawer = createDrawerNavigator();

const CustomDrawerContent = (props) => {
  return (
    <DrawerContentScrollView {...props}>
      <VStack mt="5">
        <VStack space="3">
          {props.state.routeNames.map((name, index) => (
            <Pressable
              px="5"
              py="3"
              //rounded="md"
              key={index}
              bg={index === props.state.index ? "violet.500" : "transparent"}
              onPress={(event) => {
                props.navigation.navigate(name);
              }}
            >
              <HStack space="7" alignItems="center">
                <Icon
                  color={index === props.state.index ? "white" : "gray.500"}
                  size="5"
                  as={<MaterialCommunityIcons name={getIcon(name)} />}
                />
                <Text
                  fontWeight="500"
                  color={index === props.state.index ? "white" : "gray.700"}
                >
                  {name}
                </Text>
              </HStack>
            </Pressable>
          ))}
        </VStack>
      </VStack>
    </DrawerContentScrollView>
  );
};

const getIcon = (screenName) => {
  switch (screenName) {
    case "Home":
      return "home";
    case "About Us":
      return "bag-personal";
    case "Contact Us":
      return "email";
    default:
      return undefined;
  }
};

const DrawerNavigation = () => {
  return (
    <Box flex={1}>
      <Drawer.Navigator
        drawerContent={(props) => <CustomDrawerContent {...props} />}
      >
        <Drawer.Screen name="Home" component={HomeScreen} />
        <Drawer.Screen name="About Us" component={AboutScreen} />
        <Drawer.Screen name="Contact Us" component={ContactScreen} />
      </Drawer.Navigator>
    </Box>
  );
};

export default DrawerNavigation;
