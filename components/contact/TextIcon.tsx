import { View, StyleSheet, TouchableOpacity, Linking } from "react-native";
//Text
import CustomText from "@/components/UI/CustomText";
import LottieView, { LottieViewProps } from "lottie-react-native";

type PropTypes = {
  icon: LottieViewProps["source"];
  text: string;
  url: string;
};

export const TextIcon = ({ icon, text, url }: PropTypes) => {
  return (
    <View style={styles.detailContainer}>
      <LottieView
        source={icon}
        autoPlay
        loop
        resizeMode="contain"
        style={{ height: 50, marginRight: 20 }}
      />
      <TouchableOpacity
        onPress={() => {
          Linking.openURL(url);
        }}
      >
        <CustomText style={styles.text}>{text}</CustomText>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  detailContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  text: {
    fontSize: 16,
    fontWeight: "500",
  },
});
