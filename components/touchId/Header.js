import { View, StyleSheet, TouchableOpacity } from "react-native";
import Colors from "@/utils/Colors";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

export const Header = () => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => router.back()}>
        <Ionicons name="arrow-back" size={30} color={Colors.lighter_green} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
  },
});
