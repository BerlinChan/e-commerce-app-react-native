import { router } from "expo-router";
import { HomeScreen as HomeScreenComponent } from "@/components/Screens/HomeScreen";

export default function HomeScreen() {
  return <HomeScreenComponent router={router} />;
}
