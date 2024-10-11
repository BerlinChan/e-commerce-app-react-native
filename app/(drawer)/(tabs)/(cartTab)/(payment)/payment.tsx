import { useState, useEffect } from "react";
import { View, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import Colors from "@/utils/Colors";
import Loader from "@/components/Loaders/Loader";
import CustomText from "@/components/UI/CustomText";
import { Header, PaymentBody } from "@/components/Payment";
import { SummaryOrder } from "@/components/PreOrder";
import { useCart } from "@/context/CartContext";
import { router, useLocalSearchParams } from "expo-router";

export default function PaymentScreen() {
  const [loading, setLoading] = useState(true);
  const { cart } = useCart();
  const { token, cardLast4 } = useLocalSearchParams<{
    token: string;
    cardLast4: string;
  }>();
  const [payByCard, setPayByCard] = useState(Boolean(token && cardLast4));

  const total = cart.items.reduce(
    (acc, curr) => acc + curr.price * curr.quantity,
    0
  );

  useEffect(() => {
    (async function () {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setLoading(false);
    })();
  }, []);

  useEffect(() => {
    setPayByCard(Boolean(token && cardLast4));
  }, [token, cardLast4]);

  const addOrderAct = async () => {
    try {
      // await dispatch(addOrder())
      // await dispatch(resetCart(cart.id));
      router.navigate("/(drawer)/(homeTab)/finishOrder");
    } catch (err) {
      alert(err);
    }
  };

  return (
    <View style={styles.container}>
      <Header router={router} />
      {loading || cart.isLoading ? (
        <Loader />
      ) : (
        <>
          <ScrollView>
            <PaymentBody
              navigation={router}
              payByCard={payByCard}
              setPayByCard={setPayByCard}
              token={token}
              cardLast4={cardLast4}
            />
            <SummaryOrder cartItems={cart.items} total={total} />
          </ScrollView>
          <View style={styles.total}>
            <View style={styles.orderButton}>
              <TouchableOpacity onPress={addOrderAct}>
                <CustomText style={{ color: "#fff", fontSize: 16 }}>
                  Place order
                </CustomText>
              </TouchableOpacity>
            </View>
          </View>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.white },
  total: {
    width: "100%",
    position: "absolute",
    bottom: 20,
    left: 0,
    paddingHorizontal: 10,
    backgroundColor: "transparent",
  },
  orderButton: {
    width: "100%",
    height: 50,
    backgroundColor: Colors.red,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
    marginBottom: 5,
  },
});
