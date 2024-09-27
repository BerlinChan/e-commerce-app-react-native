import {
  View,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Alert,
} from "react-native";
//Text
import CustomText from "@/components/UI/CustomText";
//Colors
import Colors from "@/utils/Colors";
import { CartItem } from "./CartItem";
import Messages from "@/messages/user";
//PropTypes check
import PropTypes from "prop-types";
import { router } from "expo-router";
import { useCart } from "@/context/CartContext";

export const CartBody = ({ profile, cart, loadCarts, isRefreshing }) => {
  const { cartDispatch } = useCart();

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
            cartDispatch({ type: "REMOVE_FROM_CART", itemId });
          },
        },
      ]
    );
  };

  return (
    <View style={styles.footer}>
      {!profile.id ? (
        <View style={styles.center}>
          <CustomText>{Messages["user.login.require"]}</CustomText>
          <View style={styles.nextButton}>
            <TouchableOpacity
              onPress={() => router.navigate("/(auth)/signInSignUp")}
            >
              <CustomText style={{ color: "#fff" }}>Continue</CustomText>
            </TouchableOpacity>
          </View>
        </View>
      ) : cart.items.length === 0 ? (
        <View style={styles.center}>
          <CustomText style={{ fontSize: 16 }}>
            There are no products in the cart.
          </CustomText>
        </View>
      ) : (
        <View style={{ flex: 1 }}>
          <FlatList
            data={cart.items}
            onRefresh={loadCarts}
            refreshing={isRefreshing}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => {
              return (
                <CartItem
                  item={item}
                  onRemove={() => onRemove(item.id)}
                  onAdd={() => {
                    cartDispatch({ type: "ADD_TO_CART", item });
                  }}
                  onDes={() => {
                    cartDispatch({
                      type: "DEC_CART_QUANTITY",
                      itemId: item.id,
                    });
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
  profile: PropTypes.object.isRequired,
  cart: PropTypes.object.isRequired,
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
