import {
  View,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Alert,
} from "react-native";
//Redux
// import { useDispatch } from "react-redux";
//Action
// import { removeFromCart, addToCart, decCartQuantity } from "../../../reducers";
//Text
import CustomText from "@/components/UI/CustomText";
//Colors
import Colors from "@/utils/Colors";
import { CartItem } from "./CartItem";
import Messages from "@/messages/user";
//PropTypes check
import PropTypes from "prop-types";
import { router } from "expo-router";
import { useAuth } from "@/context/AuthContext";

export const CartBody = ({ user, carts, loadCarts, isRefreshing }) => {
  const auth = useAuth();
  // const dispatch = useDispatch();

  const onRemove = (itemId) => {
    Alert.alert(
      "Abandon Cart",
      "Are you sure you want to remove the item from your cart?",
      [
        {
          text: "Cancel",
        },
        {
          text: "Agree",
          onPress: () => {
            // dispatch(removeFromCart(carts._id, itemId));
          },
        },
      ]
    );
  };

  return (
    <View style={styles.footer}>
      {!user.id === 0 ? (
        <View style={styles.center}>
          <CustomText>{Messages["user.login.require"]}</CustomText>
          <View style={styles.nextButton}>
            <TouchableOpacity onPress={() => router.navigate("SignUp")}>
              <CustomText style={{ color: "#fff" }}>Continue</CustomText>
            </TouchableOpacity>
          </View>
        </View>
      ) : carts.items.length === 0 ? (
        <View style={styles.center}>
          <CustomText style={{ fontSize: 16 }}>
            There are no products in the cart.
          </CustomText>
        </View>
      ) : (
        <View style={{ marginBottom: 80 }}>
          <FlatList
            data={carts.items}
            onRefresh={loadCarts}
            refreshing={isRefreshing}
            keyExtractor={(item) => item.item._id}
            renderItem={({ item }) => {
              return (
                <CartItem
                  item={item}
                  onRemove={() => onRemove(item.item._id)}
                  onAdd={() => {
                    // dispatch(addToCart(item.item, auth.token));
                  }}
                  onDes={() => {
                    // dispatch(decCartQuantity(carts._id, item.item._id));
                  }}
                />
              );
            }}
          />
        </View>
      )}
    </View>
  );
};

CartBody.propTypes = {
  user: PropTypes.object.isRequired,
  carts: PropTypes.object.isRequired,
  loadCarts: PropTypes.func.isRequired,
  isRefreshing: PropTypes.bool.isRequired,
};
const styles = StyleSheet.create({
  footer: {
    flex: 1,
  },
  nextButton: {
    borderWidth: 1,
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: Colors.lighter_green,
    borderRadius: 5,
    borderColor: Colors.lighter_green,
    marginTop: 10,
  },
  center: {
    height: "100%",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
});
