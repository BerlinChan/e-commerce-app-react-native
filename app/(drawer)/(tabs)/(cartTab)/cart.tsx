import React, { useEffect, useState, useCallback } from "react";
import { View, StyleSheet, Platform, Dimensions } from "react-native";
//Redux
// import { useSelector, useDispatch } from 'react-redux';
//Action
// import { fetchCart } from '../../reducers';
//component
import Colors from "@/utils/Colors";
import { Header, CartBody, TotalButton } from "@/components/cartTab";
//Loader
import Loader from "@/components/Loaders/Loader";
import { useProfile } from "@/context/ProfileContext";
import { useCart } from "@/context/CartContext";
import { timeoutPromise } from "@/utils/Tools";
import { API_URL } from "@/utils/Config";

const { height } = Dimensions.get("window");

export default function CartScreen() {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const { profile } = useProfile();
  const { cart, cartDispatch } = useCart();
  const loading = false;
  // const dispatch = useDispatch();
  const total = cart.items.reduce(
    (acc, curr) => acc + curr.price * curr.quantity,
    0
  );

  const loadCarts = useCallback(async () => {
    setIsRefreshing(true);
    try {
      const response = await timeoutPromise(
        fetch(`${API_URL}/carts/user/${profile.id}`, {
          method: "GET",
        })
      );

      if (!response.ok) {
        throw new Error("Something went wrong!, can't get the carts");
      }
      const resData = await response.json();
      // cartDispatch({ type: "FETCH_CART", items: [] });
      // await dispatch(fetchCart());
    } catch (err) {
      alert(err);
    }
    setIsRefreshing(false);
  }, [setIsRefreshing]);
  useEffect(() => {
    loadCarts();
  }, [profile.id]);

  return (
    <View style={styles.container}>
      <Header profile={profile} cart={cart} />
      {loading ? <Loader /> : <></>}
      <CartBody
        profile={profile}
        cart={cart}
        loadCarts={loadCarts}
        isRefreshing={isRefreshing}
      />
      {profile.id && cart.items.length && (
        <TotalButton total={total} cartItems={cart.items} cartId={cart.id} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  header: {
    width: "100%",
    backgroundColor: "#fff",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    height: Platform.OS === "android" ? 70 : height < 668 ? 70 : 90,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  centerLoader: {
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
    width: "100%",
    position: "absolute",
    top: Platform.OS === "android" ? 70 : height < 668 ? 70 : 90,
  },
});
