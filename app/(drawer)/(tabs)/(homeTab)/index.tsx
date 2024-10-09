import { router } from "expo-router";
import { HomeScreen as HomeScreenComponent } from "@/components/Screens/HomeScreen";

export default function HomeScreen() {
  // TODO: cleanup components/Screens
  return <HomeScreenComponent router={router} />;
}
