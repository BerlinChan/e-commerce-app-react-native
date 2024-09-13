import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity, FlatList } from "react-native";
//Colors
import Colors from "@/utils/Colors";
//Item
import ItemList from "@/components/Screens/PreOrderScreen/components/PreOrderItem";
//Number format
import NumberFormat from "@/components/UI/NumberFormat";
//PropTypes check
import PropTypes from "prop-types";
import CustomText from "@/components/UI/CustomText";
import Steps from "@/components/UI/Steps";

export const OrderItem = ({ order }) => {
  const [showDetails, setShowDetails] = useState(false);
  const status = () => {
    switch (order.id) {
      case 1:
        return 0;
      case 2:
        return 1;
      case 3:
        return 2;
      default:
        return 3;
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.summary}>
        <View style={styles.textContainer}>
          <CustomText style={styles.text}>Single code: </CustomText>
          <CustomText style={styles.detail}>CT-{order.id}</CustomText>
        </View>

        <View style={styles.textContainer}>
          <CustomText style={styles.text}>Date booked: </CustomText>
          <CustomText style={styles.detail}>
            {order.date}
            format("Do MMMM YYYY, hh:mm a ")
          </CustomText>
        </View>
        <View style={styles.detailButtom}>
          <TouchableOpacity onPress={() => setShowDetails((prev) => !prev)}>
            <CustomText style={{ fontSize: 15, color: "#fff" }}>
              {showDetails ? "Hide order" : "Order details"}
            </CustomText>
          </TouchableOpacity>
        </View>
        {showDetails ? (
          <View>
            <View style={styles.textContainer}>
              <CustomText style={styles.text}>Recipient name: </CustomText>
              <CustomText style={styles.detail}>
                {order.name ?? "order.name"}
              </CustomText>
            </View>

            <View style={styles.textContainer}>
              <CustomText style={styles.text}>Address: </CustomText>
              <CustomText style={styles.detail}>
                {order.address ?? "order.address"}
              </CustomText>
            </View>
            <View style={styles.textContainer}>
              <CustomText style={styles.text}>Phone number: </CustomText>
              <CustomText style={styles.detail}>
                {order.phone ?? "order.phone"}
              </CustomText>
            </View>
            <View style={styles.textContainer}>
              <CustomText style={styles.text}>Payment method:</CustomText>
              <CustomText style={styles.detail}>
                {order.paymentMethod ?? "order.paymentMethod"}
              </CustomText>
            </View>
            <View style={styles.steps}>
              <Steps position={status()} />
            </View>

            <CustomText style={styles.text}>Products ordered:</CustomText>
            <FlatList
              data={order.items ?? []}
              keyExtractor={(item) => item.item.id}
              renderItem={({ item }) => {
                return <ItemList item={item} />;
              }}
            />
            <View
              style={{
                ...styles.textContainer,
                marginTop: 10,
                justifyContent: "space-between",
              }}
            >
              <CustomText style={styles.text}>Total amount:</CustomText>
              <NumberFormat
                price={(order.totalAmount ?? 15).toString()}
                style={{ fontSize: 15 }}
              />
            </View>
          </View>
        ) : (
          <View />
        )}
      </View>
    </View>
  );
};

OrderItem.propTypes = {
  order: PropTypes.object.isRequired,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderWidth: 1,
    borderColor: Colors.grey,
    backgroundColor: Colors.white,
    borderRadius: 5,
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  detailButtom: {
    backgroundColor: Colors.lighter_green,
    alignItems: "center",
    paddingVertical: 10,
    borderRadius: 5,
    marginVertical: 15,
  },
  textContainer: {
    flexDirection: "row",
    marginVertical: 5,
  },
  detail: {
    color: Colors.lighter_green,
  },
  steps: {
    width: "100%",
    height: 100,
  },
});

export default OrderItem;
