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
import { useProfile, useProfileDispatch } from "@/context/ProfileContext";

const { height } = Dimensions.get("window");

export default function CartScreen() {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const profile = useProfile();
  const carts = { _id: "", items: [] };
  const loading = false;
  const cartItems = carts.items;
  const cartId = carts._id;
  // const dispatch = useDispatch();
  let total = 0;
  carts.items.map((item) => (total += +item.item.price * +item.quantity));
  const loadCarts = useCallback(async () => {
    setIsRefreshing(true);
    try {
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
      <Header user={profile} carts={carts} />
      {loading ? <Loader /> : <></>}
      <CartBody
        user={profile}
        carts={carts}
        loadCarts={loadCarts}
        isRefreshing={isRefreshing}
      />
      {!profile.id ? (
        <></>
      ) : carts.items.length === 0 ? (
        <View />
      ) : (
        <TotalButton total={total} cartItems={cartItems} cartId={cartId} />
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
