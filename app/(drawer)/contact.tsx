import React from "react";
import { View, StyleSheet } from "react-native";
import { Header, ContactBody } from "@/components/contact";

export default function ContactScreen() {
  return (
    <View style={styles.container}>
      <Header />
      <ContactBody />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
});
