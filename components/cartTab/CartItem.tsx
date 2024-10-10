import {
  View,
  Image,
  TouchableOpacity,
  StyleSheet,
  Platform,
  Alert,
} from "react-native";
//Colors
import Colors from "@/utils/Colors";
//NumberFormat
import NumberFormat from "@/components/UI/NumberFormat";
//Icon
import { MaterialCommunityIcons } from "@expo/vector-icons";
import CustomText from "@/components/UI/CustomText";
import { StateType as CartStateType } from "@/context/CartContext";

type Props = {
  item: CartStateType["items"][number];
  onAdd: () => void;
  onDes: () => void;
  onRemove: () => void;
};

export const CartItem = ({ item, onAdd, onDes, onRemove }: Props) => {
  const AddItemHandler = () => {
    onAdd();
  };
  const sum = item.price * item.quantity;
  const checkDesQuantity = () => {
    if (item.quantity === 1) {
      Alert.alert(
        "Delete Cart",
        "Are you sure you want to remove the item from your cart?",
        [
          {
            text: "Cancel",
          },
          {
            text: "Agree",
            onPress: onRemove,
          },
        ]
      );
    } else {
      onDes();
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.left}>
        <Image
          style={{
            width: "100%",
            height: 90,
            resizeMode: "cover",
            borderRadius: 5,
          }}
          source={{ uri: item.image }}
        />
      </View>
      <View style={styles.right}>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <CustomText style={styles.title} numberOfLines={2}>
            {item.title}
          </CustomText>
          <View>
            <TouchableOpacity onPress={onRemove}>
              <MaterialCommunityIcons name="close" size={20} color="#000" />
            </TouchableOpacity>
          </View>
        </View>
        <CustomText style={{ color: Colors.grey, fontSize: 12 }}>
          Provided by Anonymous User
        </CustomText>
        <NumberFormat price={sum.toString()} />
        <View style={styles.box}>
          <TouchableOpacity onPress={checkDesQuantity} style={styles.boxMin}>
            <MaterialCommunityIcons name="minus" size={16} />
          </TouchableOpacity>
          <View>
            <CustomText style={styles.boxText}>{item.quantity}</CustomText>
          </View>
          <TouchableOpacity onPress={AddItemHandler} style={styles.boxMin}>
            <MaterialCommunityIcons name="plus" size={16} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 10,
    height: 110,
    borderBottomWidth: 1,
    borderBottomColor: Colors.light_grey,
    flexDirection: "row",
    paddingVertical: 10,
    alignItems: "center",
    backgroundColor: "#fff",
    paddingHorizontal: 10,
    borderRadius: 5,
    marginTop: 5,
  },
  left: {
    width: "35%",
    height: "100%",
    alignItems: "center",
  },
  right: {
    width: "65%",
    paddingLeft: 15,
    height: 90,
    // overflow: "hidden",
  },
  title: {
    fontSize: 14,
  },
  box: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: Platform.OS === "ios" ? 30 : 25,
    backgroundColor: Colors.light_grey,
    width: 90,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginTop: 5,
  },
  boxMin: {
    width: "30%",
    alignItems: "center",
  },
  boxText: {
    fontSize: 12,
  },
});
