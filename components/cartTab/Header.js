import {
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Platform,
} from "react-native";
//Text
import CustomText from "@/components/UI/CustomText";
//Icon
import { Ionicons } from "@expo/vector-icons";
//Colors
import Colors from "@/utils/Colors";
//PropTypes check
import PropTypes from "prop-types";
import { router } from "expo-router";

const { height } = Dimensions.get("window");

export const Header = ({ profile, cart }) => {
  return (
    <View style={styles.header}>
      <TouchableOpacity
        onPress={() => {
          router.back();
        }}
      >
        <Ionicons name="arrow-back" size={30} color={Colors.lighter_green} />
      </TouchableOpacity>
      <CustomText style={styles.titleHeader}>
        Shopping Cart
        {!profile.id || cart.items.length === 0 ? "" : `(${cart.items.length})`}
      </CustomText>
      <View style={{ width: 15 }} />
    </View>
  );
};

Header.propTypes = {
  profile: PropTypes.object.isRequired,
  cart: PropTypes.object.isRequired,
};

const styles = StyleSheet.create({
  header: {
    width: "100%",
    backgroundColor: "#fff",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    height: Platform.OS === "android" ? 70 : height < 668 ? 70 : 90,
    paddingVertical: 10,
    paddingHorizontal: 20,
    shadowColor: "black",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 2,
    elevation: 1,
  },
  titleHeader: {
    textAlign: "center",
    color: Colors.lighter_green,
    fontSize: 20,
    paddingBottom: 5,
    fontFamily: "Roboto-Medium",
  },
});
