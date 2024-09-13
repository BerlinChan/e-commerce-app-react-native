import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { IntroScreen } from "@/components/Screens/IntroScreen";

const IntroStack = createStackNavigator();
export default function IntroStackScreen() {
  return (
    <IntroStack.Navigator>
      <IntroStack.Screen
        name="IntroScreen"
        component={IntroScreen}
        options={{ headerShown: false }}
      />
    </IntroStack.Navigator>
  );
}
