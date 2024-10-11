import {
  View,
  StyleSheet,
  Dimensions,
  Platform,
  Pressable,
} from "react-native";
import Colors from "@/utils/Colors";
//Text
import CustomText from "@/components/UI/CustomText";
//Steps
import OrderSteps from "@/components/UI/OrderSteps";
import { Ionicons } from "@expo/vector-icons";
import { Router } from "expo-router";

const { width, height } = Dimensions.get("window");

type Props = { router: Router };

export const Header = ({ router }: Props) => {
  return (
    <View style={styles.header}>
      <View style={styles.innerHeader}>
        <View
          style={{ position: "absolute", bottom: 20, left: 15, zIndex: 10 }}
        >
          <Pressable onPress={() => router.back()}>
            <Ionicons
              name="arrow-back"
              size={28}
              color={Colors.lighter_green}
            />
          </Pressable>
        </View>
        <View style={styles.orderStepsContainer}>
          <CustomText style={styles.title}> Payment Methods </CustomText>
          <View style={styles.orderSteps}>
            <OrderSteps position={2} />
          </View>
        </View>
        <View />
      </View>
    </View>
  );
};

// TODO: remove propTypes
// TODO: convert to tsx file

const styles = StyleSheet.create({
  header: {
    width: width,
    backgroundColor: "#fff",
    // TODO: replace with SafeArea
    height: Platform.OS === "android" ? 100 : height > 667 ? 130 : 110,
  },
  innerHeader: {
    height: "96%",
    width: "100%",
    backgroundColor: "#fff",
    shadowColor: "black",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 2,
    elevation: 1,
  },
  title: {
    textAlign: "center",
    color: Colors.lighter_green,
    fontSize: 18,
    fontFamily: "Roboto-Medium",
  },
  orderStepsContainer: {
    flexDirection: "column",
    alignItems: "center",
    height: "100%",
    justifyContent: "flex-end",
  },
  orderSteps: {
    width: (width * 50) / 100,
    marginVertical: 5,
  },
});
