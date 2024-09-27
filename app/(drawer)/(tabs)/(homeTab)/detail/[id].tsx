import { DetailScreen as DetailScreenComponent } from "@/components/Screens/DetailScreen";
import { useLocalSearchParams } from "expo-router";

export default function DetailScreen() {
  const { id } = useLocalSearchParams();

  return <DetailScreenComponent id={id} />;
}
