import {
  createStackNavigator,
  CardStyleInterpolators,
} from "@react-navigation/stack";
import { useEffect } from "react";
import { HomeScreen } from "@/components/Screens/HomeScreen";
import { DetailScreen } from "@/components/Screens/DetailScreen";
import { useRootNavigationState, router } from "expo-router";
import { useProfile, useProfileDispatch } from "@/context/ProfileContext";

const HomeStack = createStackNavigator();
export default function HomeStackScreen() {
  const rootNavigationState = useRootNavigationState();
  const profile = useProfile();
  const profileDispatch = useProfileDispatch()!;

  useEffect(() => {
    if (rootNavigationState?.key && profile?.isFirstOpen) {
      router.navigate("/intro");
      profileDispatch({ type: "setIsFirstOpen", payload: false });
    }
  }, [rootNavigationState?.key, profile?.isFirstOpen]);

  return (
    <HomeStack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
      }}
    >
      <HomeStack.Screen name="Home" component={HomeScreen} />
      <HomeStack.Screen name="Detail" component={DetailScreen} />
      <HomeStack.Screen name="Cart" component={CartStackScreen} />
      <HomeStack.Screen name="Product" component={ProductStackScreen} />
      <HomeStack.Screen name="FinishOrder" component={FinishOrderScreen} />
      <HomeStack.Screen name="ResetPw" component={ResetPwScreen} />
    </HomeStack.Navigator>
  );
}

const ProductStackScreen = () => <></>;
const FinishOrderScreen = () => <></>;
const ResetPwScreen = () => <></>;
const CartStackScreen = () => <></>;
