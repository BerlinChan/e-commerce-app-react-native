import { router } from "expo-router";
import { HomeScreen } from "@/components/Screens/HomeScreen";

export default function HomeStackScreen() {
  return <HomeScreen router={router} />;
}
