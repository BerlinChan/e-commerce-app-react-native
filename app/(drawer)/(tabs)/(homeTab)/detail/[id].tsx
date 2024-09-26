import { DetailScreen } from "@/components/Screens/DetailScreen";
import { useLocalSearchParams } from "expo-router";

export default function HomeStackScreen() {
  const { id } = useLocalSearchParams();

  return <DetailScreen id={id} />;
}
