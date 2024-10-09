import { useState } from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import {
  CreditCardView,
  CreditCardInput,
  CreditCardFormData,
  CreditCardFormField,
} from "react-native-credit-card-input";
import { FontAwesome } from "@expo/vector-icons";
import Colors from "@/utils/Colors";
// TODO: remove PropTypes check
import PropTypes from "prop-types";

export const PaymentFormView = (props) => {
  const { onSubmit, submitted, error } = props;
  const [cardData, setCardData] = useState<CreditCardFormData>();
  const [focusedField, setFocusedField] = useState<CreditCardFormField>();

  return (
    <View style={styles.container}>
      <View>
        <CreditCardView
          focusedField={focusedField}
          type={cardData?.values.type}
          number={cardData?.values.number}
          expiry={cardData?.values.expiry}
          cvc={cardData?.values.cvc}
          style={styles.cardView}
        />
        <CreditCardInput
          onChange={setCardData}
          onFocusField={setFocusedField}
        />
      </View>
      <View
        style={[
          styles.buttonWrapper,
          {
            backgroundColor: cardData?.valid ? Colors.grey : "#fff",
          },
        ]}
      >
        <Button
          title="Confirm"
          disabled={!cardData?.valid || submitted}
          onPress={() => onSubmit(cardData)}
        />
        {/* Show errors */}
        {error && (
          <View style={styles.alertWrapper}>
            <View style={styles.alertIconWrapper}>
              <FontAwesome
                name="exclamation-circle"
                size={20}
                style={{ color: "#c22" }}
              />
            </View>
            <View style={styles.alertTextWrapper}>
              <Text style={styles.alertText}>{error}</Text>
            </View>
          </View>
        )}
      </View>
    </View>
  );
};

PaymentFormView.propTypes = {
  onSubmit: PropTypes.func,
  submitted: PropTypes.bool,
  error: PropTypes.string,
};

// TODO: clean styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: 20,
  },
  cardView: {
    alignSelf: "center",
    marginTop: 15,
  },
  buttonWrapper: {
    width: "100%",
    padding: 5,
    zIndex: 100,
    borderRadius: 10,
    marginHorizontal: 20,
  },
  alertTextWrapper: {
    flex: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  alertIconWrapper: {
    padding: 5,
    flex: 4,
    justifyContent: "center",
    alignItems: "center",
  },
  alertText: {
    color: "#c22",
    fontSize: 16,
    fontWeight: "400",
  },
  alertWrapper: {
    backgroundColor: "#ecb7b7",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    flexWrap: "wrap",
    borderRadius: 5,
    paddingVertical: 5,
    marginTop: 10,
  },
});
