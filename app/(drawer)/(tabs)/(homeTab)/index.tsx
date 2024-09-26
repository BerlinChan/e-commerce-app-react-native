import { useNavigation } from "expo-router";
import { HomeScreen } from "@/components/Screens/HomeScreen";

export default function HomeStackScreen() {
  const navigation = useNavigation();

  return <HomeScreen navigation={navigation} />;
}
