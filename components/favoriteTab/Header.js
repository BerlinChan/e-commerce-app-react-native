import {
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Platform,
} from "react-native";
//Color
import Colors from "@/utils/Colors";
//Icon
import { MaterialCommunityIcons, Ionicons } from "@expo/vector-icons";
//Text
import CustomText from "@/components/UI/CustomText";
import { router } from "expo-router";

const { height } = Dimensions.get("window");

export const Header = () => {
  return (
    <View style={styles.header}>
      <View style={{ position: "absolute", bottom: 10, left: 15, zIndex: 10 }}>
        <TouchableOpacity onPress={() => router.navigate("/")}>
          <Ionicons name="arrow-back" size={28} color={Colors.lighter_green} />
        </TouchableOpacity>
      </View>
      <CustomText style={styles.title}>Favorite Products</CustomText>
      <View style={{ position: "absolute", bottom: 5, right: 15, zIndex: 10 }}>
        <MaterialCommunityIcons
          style={{ marginBottom: 10 }}
          name="heart-multiple"
          size={25}
          color={Colors.red}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    width: "100%",
    backgroundColor: "#fff",
    justifyContent: "flex-end",
    height: Platform.OS === "android" ? 70 : height < 668 ? 70 : 90,
    paddingVertical: 10,
    shadowColor: "black",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 2,
    elevation: 1,
  },
  title: {
    textAlign: "center",
    color: Colors.lighter_green,
    fontSize: 20,
    fontFamily: "Roboto-Medium",
    paddingBottom: 5,
  },
});
