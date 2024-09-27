import React, { useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import InputField from "@/components/InputField";
import renderField from "./RenderField";
//Colors
import Colors from "@/utils/Colors";
import CustomText from "@/components/UI/CustomText";
//PropTypes check
import PropTypes from "prop-types";
import { useForm, Controller, SubmitHandler } from "react-hook-form";

//Validation
const validate = (values) => {
  const errors = {};
  if (!values.phone) {
    errors.phone = "Phone number cannot be empty";
  } else if (values.phone.length !== 10) {
    errors.phone = "Phone number must be 10 characters ";
  } else {
    errors.phone = "";
  }
  if (!values.address) {
    errors.address = "Address cannot be empty";
  } else if (values.address.length < 6) {
    errors.address = "Address must be more than or equal to 6 characters";
  } else {
    errors.address = "";
  }

  return errors;
};

type FormType = { receiverName: string; phone: string; address: string };

export const UserForm = ({ getReceiver, checkValidation }) => {
  const [receiverName, setReceiverName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  const {
    control,
    handleSubmit,
    formState: { errors, touchedFields, isLoading },
    reset,
  } = useForm<FormType>({
    defaultValues: {
      receiverName: "",
      phone: "",
      address: "",
    },
  });

  useEffect(() => {
    getReceiver(receiverName, phone, address);
  }, [receiverName, phone, address]);

  return (
    <View style={styles.container}>
      <CustomText style={styles.title}>Delivery Information</CustomText>
      <View style={styles.inputContainer}>
        <Controller
          name="receiverName"
          control={control}
          rules={{
            required: "Full name cannot be blank",
            minLength: {
              value: 6,
              message: "Full name must be more than or equal to 6 characters",
            },
          }}
          render={({
            field: { onChange, value },
            fieldState: { isTouched },
          }) => (
            <InputField
              keyboardType="default"
              label="Full Name"
              maxLength={35}
              input={{ onChange, value }}
              meta={{
                error: errors.receiverName?.message,
                touched: isTouched,
              }}
            />
          )}
        />

        {/* <Field
          component={renderField}
          onChangeText={(value) => setReceiverName(value)}
          checkValidation={checkValidation}
        />
        <Field
          name="phone"
          maxLength={10}
          label="Phone Number"
          component={renderField}
          onChangeText={(value) => setPhone(value)}
          keyboardType="numeric"
          returnKeyType="done"
          checkValidation={checkValidation}
        />
        <Field
          name="address"
          maxLength={35}
          label="Address"
          component={renderField}
          onChangeText={(value) => setAddress(value)}
          keyboardType="default"
          checkValidation={checkValidation}
        /> */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  title: {
    fontSize: 15,
    color: Colors.text,
    fontWeight: "500",
    marginVertical: 10,
    marginHorizontal: 10,
  },
  inputContainer: { backgroundColor: "#fff ", paddingHorizontal: 10 },
});
