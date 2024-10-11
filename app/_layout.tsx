import { GestureHandlerRootView } from "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import LocalNotification from "@/components/Notification/LocalNotification";
import { useEffect } from "react";
import * as SplashScreen from "expo-splash-screen";
import { useAssets } from "expo-asset";
import { useFonts } from "expo-font";
import { Host } from "react-native-portalize";
import { AuthProvider } from "@/context/AuthContext";
import { ProfileProvider } from "@/context/ProfileContext";
import { CartProvider } from "@/context/CartContext";
import { OrderProvider } from "@/context/OrderContext";
import { Stack } from "expo-router";

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

export default function Layout() {
  const [loadedFonts, errorFonts] = useFonts({
    "Roboto-Bold": require("@/assets/fonts/Roboto-Bold.ttf"),
    "Roboto-BoldItalic": require("@/assets/fonts/Roboto-BoldItalic.ttf"),
    "Roboto-Italic": require("@/assets/fonts/Roboto-Italic.ttf"),
    "Roboto-LightItalic": require("@/assets/fonts/Roboto-LightItalic.ttf"),
    "Roboto-Medium": require("@/assets/fonts/Roboto-Medium.ttf"),
    "Roboto-MediumItalic": require("@/assets/fonts/Roboto-MediumItalic.ttf"),
    "Roboto-Regular": require("@/assets/fonts/Roboto-Regular.ttf"),
  });
  const [loadedAssets, errorAssets] = useAssets([
    require("@/assets/images/banner1.jpg"),
    require("@/assets/images/banner3.jpg"),
    require("@/assets/images/banner4.jpg"),
    require("@/assets/images/banner5.jpg"),
    require("@/assets/images/banner6.jpg"),
    require("@/assets/images/bg1.jpg"),
    require("@/assets/images/bg2.jpg"),
    require("@/assets/images/bg3.jpg"),
    require("@/assets/images/defaultprofile.jpg"),
    require("@/assets/images/flower3.jpg"),
    require("@/assets/images/logoNoText.png"),
    require("@/assets/images/logo1.png"),
    require("@/assets/images/logoTextWhite.png"),
    require("@/assets/images/slide1.png"),
    require("@/assets/images/slide2.png"),
    require("@/assets/images/slide3.png"),
    require("@/assets/images/social1.png"),
    require("@/assets/images/social2.png"),
    require("@/assets/images/social3.png"),
    require("@/assets/images/creditcards.png"),
    require("@/assets/images/faceid.png"),
  ]);

  useEffect(() => {
    if ((loadedAssets && loadedFonts) || errorAssets || errorFonts) {
      SplashScreen.hideAsync();
    }
  }, [loadedFonts, loadedAssets, errorFonts, errorAssets]);

  if ((!loadedAssets && !errorAssets) || (!loadedFonts && !errorFonts)) {
    return null;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Host>
        <AuthProvider>
          <ProfileProvider>
            <CartProvider>
              <OrderProvider>
                <StatusBar style="dark" />
                <LocalNotification />
                <Stack
                  initialRouteName="intro"
                  screenOptions={{ headerShown: false }}
                />
              </OrderProvider>
            </CartProvider>
          </ProfileProvider>
        </AuthProvider>
      </Host>
    </GestureHandlerRootView>
  );
}
