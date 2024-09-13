import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  Image,
  Dimensions,
} from "react-native";
import Colors from "@/utils/Colors";
//Icon
import LottieView from "lottie-react-native";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

const { height, width } = Dimensions.get("window");

export default function SignInSignUpScreen() {
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
        style={{ position: "absolute", top: 50, left: 20 }}
      >
        <Ionicons name="arrow-back" size={35} color={Colors.light_green} />
      </TouchableOpacity>
      <View style={{ position: "absolute", top: 100 }}>
        <Image
          style={styles.logo}
          source={require("@/assets/images/logo1.png")}
        />
      </View>
      <LottieView
        source={require("@/components/IconAnimation/welcome.json")}
        autoPlay
        loop
        resizeMode="contain"
        style={{ height: 104, width: "85%" }}
      />
      <TouchableOpacity onPress={() => router.navigate("/signIn")}>
        <View style={styles.signinContainer}>
          <Text style={styles.text}>LOGIN</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => router.navigate("/signUp")}>
        <View
          style={[
            styles.signinContainer,
            {
              backgroundColor: Colors.leave_green,
              marginTop: 15,
              borderWidth: 0,
            },
          ]}
        >
          <Text style={[styles.text, { color: "#ffffff" }]}>SIGNUP</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  signinContainer: {
    height: 60,
    width: width - 40,
    borderRadius: 30,
    backgroundColor: "#ffffff",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: Colors.leave_green,
  },
  text: {
    fontSize: 20,
    fontWeight: "600",
  },
  logo: {
    resizeMode: "contain",
    width: 250,
    height: 100,
  },
});
