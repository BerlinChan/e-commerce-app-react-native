import { View, StyleSheet, TouchableOpacity } from "react-native";
//Text
import CustomText from "@/components/UI/CustomText";
//Colors
import Colors from "@/utils/Colors";
import NumberFormat from "@/components/UI/NumberFormat";
//PropTypes check
import PropTypes from "prop-types";
import { router } from "expo-router";

export const TotalButton = ({ total, cartItems, cartId }) => {
  return (
    <View style={styles.total}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <CustomText
          style={{ fontSize: 14, fontWeight: "500", color: Colors.text }}
        >
          Total amount
        </CustomText>
        <NumberFormat price={total.toString()} style={{ fontSize: 14 }} />
      </View>

      <TouchableOpacity
        onPress={() => {
          router.navigate("/(tabs)/(cartTab)/preOrder", {
            cartItems,
            total,
            cartId,
          });
        }}
      >
        <View style={styles.btn}>
          <CustomText style={{ color: "#fff", fontSize: 16 }}>
            Place order
          </CustomText>
        </View>
      </TouchableOpacity>
    </View>
  );
};

TotalButton.propTypes = {
  total: PropTypes.number.isRequired,
  cartItems: PropTypes.array.isRequired,
  cartId: PropTypes.string,
};

const styles = StyleSheet.create({
  total: {
    bottom: 0,
    left: 0,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  btn: {
    width: "100%",
    height: 50,
    backgroundColor: Colors.red,
    marginTop: 5,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
  },
  price: {
    color: "red",
    fontSize: 16,
  },
});
