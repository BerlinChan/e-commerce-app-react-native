import React, { useState, useEffect, useRef } from "react";
import { useIsFocused } from "@react-navigation/native";
import { View, StyleSheet, ScrollView } from "react-native";
//Address
import Address from "@/components/Screens/PreOrderScreen/components/Address";
//Redux
// import { useSelector } from "react-redux";
//Steps
import Colors from "@/utils/Colors";
import {
  Header,
  SummaryOrder,
  TotalButton,
  UserForm,
} from "@/components/Screens/PreOrderScreen/components";
import Loader from "@/components/Loaders/Loader";
import { router } from "expo-router";
import { useCart } from "@/context/CartContext";

export default function PreOrderScreen() {
  const unmounted = useRef(false);
  const isFocused = useIsFocused();
  const [loading, setLoading] = useState(true);
  const { cart } = useCart();
  // const { cartItems, total, cartId } = props.route.params;
  const [error, setError] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [province, setProvince] = useState("");
  const [town, setTown] = useState("");
  const total = cart.items.reduce(
    (acc, curr) => acc + curr.price * curr.quantity,
    0
  );

  useEffect(() => {
    return () => {
      unmounted.current = true;
    };
  }, []);

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
  const getReceiver = (name, phone, address) => {
    setName(name);
    setPhone(phone);
    setAddress(address);
  };
  const checkValidation = (error) => {
    setError(error);
  };
  let orderItems = [];
  cart.items.map((item) => {
    orderItems.push({ item: item.id, quantity: item.quantity });
  });

  const fullAddress = `${address}, ${town} ,${province}`;
  const toPayment = async () => {
    try {
      if (error == undefined && province.length !== 0 && town.length !== 0) {
        router.navigate("Payment", {
          screen: "PaymentScreen",
          params: {
            fullAddress,
            orderItems,
            name,
            phone,
            total,
            cartId,
            cart,
          },
        });
      } else {
        alert("Please enter complete information.");
      }
    } catch (err) {
      throw err;
    }
    // props.navigation.navigate("Payment", {
    //   screen: "PaymentScreen",
    //   params: {
    //     fullAddress,
    //     orderItems,
    //     name,
    //     phone,
    //     total,
    //     cartId,
    //     carts,
    //   },
    // });
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
            <UserForm
              getReceiver={getReceiver}
              checkValidation={checkValidation}
            />
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
