// TODO: remove React import
import React, { useState, useEffect, useRef } from "react";
import { useIsFocused } from "@react-navigation/native";
import { View, StyleSheet, ScrollView } from "react-native";
//Address
import Address from "@/components/PreOrder/Address";
//Redux
// import { useSelector } from "react-redux";
//Steps
import Colors from "@/utils/Colors";
import {
  Header,
  SummaryOrder,
  TotalButton,
  UserForm,
} from "@/components/PreOrder";
import Loader from "@/components/Loaders/Loader";
import { router } from "expo-router";
import { useCart } from "@/context/CartContext";

export default function PreOrderScreen() {
  const userFormRef = useRef(null);
  const isFocused = useIsFocused();
  const [loading, setLoading] = useState(true);
  const { cart } = useCart();
  const [province, setProvince] = useState("");
  const [town, setTown] = useState("");
  const total = cart.items.reduce(
    (acc, curr) => acc + curr.price * curr.quantity,
    0
  );

  useEffect(() => {
    if (isFocused) {
      setLoading(true);
      const interval = setInterval(() => {
        setLoading(false);
      }, 1000);
      return () => clearInterval(interval);
    }
    return;
  }, [isFocused]);

  const getInfo = (province, town) => {
    setProvince(province);
    setTown(town);
  };

  const toPayment = async () => {
    userFormRef.current?.onSubmit(({ receiverName, phone, address }) => {
      const fullAddress = `${address}, ${town} ,${province}`;
      const orderItems = cart.items.map((item) => ({
        item: item.id,
        quantity: item.quantity,
      }));
      if (receiverName && phone && address && province && town) {
        router.navigate("/(cartTab)/payment", {
          params: {
            fullAddress,
            orderItems,
            name: receiverName,
            phone,
            total,
            cart,
          },
        });
      } else {
        alert("Please enter complete information.");
      }
    })();
  };

  useEffect(() => {
    if (cart.items.length === 0) {
      router.back();
    }
  }, [cart.items]);

  return (
    <View style={styles.container}>
      <Header navigation={router} />
      {loading ? (
        <Loader />
      ) : (
        <>
          <ScrollView>
            <UserForm ref={userFormRef} />
            <Address getInfo={getInfo} />
            <SummaryOrder cartItems={cart.items} total={total} />
          </ScrollView>
          <TotalButton toPayment={toPayment} />
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.white },
});
