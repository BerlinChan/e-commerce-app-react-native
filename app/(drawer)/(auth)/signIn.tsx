import {
  View,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  useWindowDimensions,
} from "react-native";
import { SignInForm } from "@/components/auth/SignInForm";
import { Ionicons } from "@expo/vector-icons";
import Colors from "@/utils/Colors";
import { router } from "expo-router";

export default function SignInScreen() {
  const { height, width } = useWindowDimensions();

  return (
    <View style={styles.container}>
      <ImageBackground
        style={{ flex: 1, position: "absolute", height, width }}
        source={require("@/assets/images/flower3.jpg")}
        blurRadius={10}
      />
      <TouchableOpacity
        onPress={() => {
          router.back();
        }}
        style={{ position: "absolute", top: 50, left: 20, zIndex: 1 }}
      >
        <Ionicons name="arrow-back" size={35} color={Colors.light_green} />
      </TouchableOpacity>
      <SignInForm />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
