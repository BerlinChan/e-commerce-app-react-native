import { View, StyleSheet, SafeAreaView, Dimensions } from "react-native";
//Icon
import CustomText from "@/components/UI/CustomText";
import Colors from "@/utils/Colors";
import { TouchableOpacity } from "react-native-gesture-handler";
//Icon
import LottieView from "lottie-react-native";
import { router } from "expo-router";

const { height } = Dimensions.get("window");

export default function FinishOrderScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.info}>
        <LottieView
          source={require("@/components/IconAnimation/done.json")}
          autoPlay
          loop={false}
          resizeMode="contain"
          style={{ height: 100, width: 100 }}
        />
        <CustomText style={styles.title}>
          Thank you, your order has been successful ^^
        </CustomText>
      </View>
      <View style={styles.id}>
        <CustomText style={styles.title}>
          We will confirm your order as soon as possible.
        </CustomText>
      </View>
      <View style={styles.buttom}>
        <TouchableOpacity
          onPress={() => router.navigate("/(drawer)/(tabs)/(homeTab)")}
        >
          <CustomText style={{ ...styles.title, color: "#fff" }}>
            Back to home page
          </CustomText>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  info: {
    marginTop: height / 4,
    alignItems: "center",
  },
  id: {
    flexDirection: "row",
  },
  title: {
    textAlign: "center",
    fontSize: 16,
    color: Colors.text,
  },
  buttom: {
    marginTop: 20,
    backgroundColor: Colors.blue,
    width: 200,
    paddingVertical: 10,
    borderRadius: 5,
  },
});
