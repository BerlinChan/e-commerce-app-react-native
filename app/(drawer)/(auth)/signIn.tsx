import {
  View,
  StyleSheet,
  ImageBackground,
  Dimensions,
  TouchableOpacity,
} from "react-native";
//Components
import { SignInForm } from "@/components/auth/SignInForm";
import { Ionicons } from "@expo/vector-icons";
import Colors from "@/utils/Colors";
import { router } from "expo-router";

const { height, width } = Dimensions.get("window");

export default function SignIn() {
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
