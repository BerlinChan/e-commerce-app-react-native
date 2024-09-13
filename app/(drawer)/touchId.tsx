import React from "react";
import { StyleSheet, SafeAreaView, StatusBar, Platform } from "react-native";
import { AuthBody, Header } from "@/components/touchId";

export default function TouchIdScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <AuthBody />
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
});
