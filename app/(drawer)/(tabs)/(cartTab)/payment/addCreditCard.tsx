import { useState } from "react";
import { View, StyleSheet, Pressable, SafeAreaView } from "react-native";
import { AddSubscriptionView } from "@/components/Payment";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { getCreditCardToken } from "@/utils/Tools";
import { router } from "expo-router";

const STRIPE_ERROR = "Payment service error. Try again later.";

export default function AddCreditCardScreen() {
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(null);

  // Handles submitting the payment request
  const onSubmit = async (creditCardInput) => {
    // Disable the Submit button after the request is sent
    // console.log(creditCardInput);
    setSubmitted(true);
    let creditCardToken;
    try {
      // Create a credit card token
      creditCardToken = await getCreditCardToken(creditCardInput);
      if (creditCardToken.error) {
        // Reset the state if Stripe responds with an error
        // Set submitted to false to let the user subscribe again
        setSubmitted(false);
        setError(STRIPE_ERROR);
        return;
      }
    } catch (e) {
      // Reset the state if the request was sent with an error
      // Set submitted to false to let the user subscribe again
      setSubmitted(false);
      setError(STRIPE_ERROR);
      return;
    } // Send a request to your server with the received credit card token
    router.navigate("/(cartTab)/payment", { token: creditCardToken });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.backIcon}>
        <Pressable onPress={() => router.back()}>
          <MaterialCommunityIcons name="arrow-left" size={30} color="black" />
        </Pressable>
      </View>
      <AddSubscriptionView
        error={error}
        submitted={submitted}
        onSubmit={onSubmit}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backIcon: {
    marginTop: 20,
    marginHorizontal: 20,
    marginBottom: 20,
  },
});
