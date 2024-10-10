import { View, StyleSheet, ColorValue } from "react-native";
//Color
import Colors from "@/utils/Colors";
//number format
import { NumericFormat } from "react-number-format";
//Text
import CustomText from "./CustomText";

type Props = {
  price?: number | string;
  color?: ColorValue;
};

const NumberFormat = ({ price, color }: Props) => {
  return (
    <NumericFormat
      value={price}
      displayType={"text"}
      thousandSeparator={true}
      suffix={" $"}
      renderText={(formattedValue) => (
        <View
          style={
            color
              ? { ...styles.priceContainer, backgroundColor: color }
              : styles.container
          }
        >
          <CustomText style={{ color: color ? "#fff" : Colors.red }}>
            {formattedValue}
          </CustomText>
        </View>
      )}
    />
  );
};

const styles = StyleSheet.create({
  container: {},
  priceContainer: {
    paddingHorizontal: 7,
    paddingVertical: 5,
    borderRadius: 5,
    shadowColor: "black",
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 2 },
    elevation: 1,
  },
});

export default NumberFormat;
