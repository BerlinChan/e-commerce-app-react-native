import React, { useEffect } from "react";
import { View, StyleSheet, Dimensions, Platform } from "react-native";
import { API_URL } from "../../utils/Config";
import { timeoutPromise } from "../../utils/Tools";
import { Header, OrderBody } from "@/components/order";
import SkeletonLoadingCart from "@/components/Loaders/SkeletonLoadingCart";
import { useAuth } from "@/context/AuthContext";
import { useProfile } from "@/context/ProfileContext";
import { useOrder } from "@/context/OrderContext";

const { height } = Dimensions.get("window");

export default function OrderScreen() {
  const { auth } = useAuth();
  const { profile } = useProfile();
  const { order, orderDispatch } = useOrder();

  async function loadOrders() {
    if (!profile.id) return;
    try {
      orderDispatch({ type: "ORDER_LOADING" });
      const response = await timeoutPromise(
        fetch(`${API_URL}/products`, {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "auth-token": auth.token,
          },
          method: "GET",
        })
      );
      if (!response.ok) {
        orderDispatch({
          type: "ORDER_FAILURE",
        });
        throw new Error("Something went wrong! Can't get your order");
      }
      const resData = await response.json();
      orderDispatch({
        type: "FETCH_ORDER",
        orders: resData,
      });
    } catch (err) {
      orderDispatch({ type: "ORDER_FAILURE" });
      alert(err.message);
    }
  }
  useEffect(() => {
    loadOrders();
  }, [profile?.id]);

  return (
    <View style={styles.container}>
      <Header />
      {order.isLoading ? (
        <View style={styles.centerLoader}>
          <SkeletonLoadingCart />
        </View>
      ) : (
        <OrderBody
          user={profile}
          orders={order.orders}
          isRefreshing={order.isLoading}
          loadOrders={loadOrders}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
