import { Text, StyleSheet } from "react-native";
// Text.defaultProps.allowFontScaling = false;

const CustomText = (props) => {
  return (
    <Text
      allowFontScaling={false}
      selectable={props.selectable}
      style={{ ...styles.text, ...props.style }}
      numberOfLines={props.numberOfLines}
    >
      {props.children}
    </Text>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 14,
    // fontFamily: "Roboto-Regular",
  },
});

export default CustomText;
