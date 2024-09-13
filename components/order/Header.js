import {
  View,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Platform,
} from "react-native";
//Icon
import { Ionicons } from "@expo/vector-icons";
import CustomText from "@/components/UI/CustomText";
//Colors
import Colors from "@/utils/Colors";
import { useNavigation } from "expo-router";
import { DrawerActions } from "@react-navigation/native";

const { height } = Dimensions.get("window");

export const Header = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.header}>
      <View style={{ position: "absolute", bottom: 15, left: 15, zIndex: 10 }}>
        <TouchableOpacity
          onPress={() => {
            navigation.dispatch(DrawerActions.openDrawer());
          }}
        >
          <Ionicons name="menu-outline" size={25} color={Colors.light_green} />
        </TouchableOpacity>
      </View>
      <CustomText style={styles.titleHeader}>Order Tracking</CustomText>
      <View />
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
    fontWeight: "500",
    shadowColor: "black",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 2,
    elevation: 1,
  },
  titleHeader: {
    textAlign: "center",
    color: Colors.light_green,
    fontSize: 20,
  },
});
