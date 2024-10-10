import React, { useEffect, forwardRef, useImperativeHandle } from "react";
import { View, StyleSheet } from "react-native";
import InputField from "@/components/InputField";
//Colors
import Colors from "@/utils/Colors";
import CustomText from "@/components/UI/CustomText";
import { useForm, Controller } from "react-hook-form";

type FormData = { receiverName: string; phone: string; address: string };

export const UserForm = forwardRef((props, ref) => {
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
    reset,
  } = useForm<FormData>({
    defaultValues: {
      receiverName: "Anonymous User",
      phone: "1234123123",
      address: "Recepient's Address",
    },
  });

  useEffect(() => {
    return () => {
      reset();
    };
  }, []);

  useImperativeHandle(ref, () => ({
    onSubmit: handleSubmit,
  }));

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
            field: { onChange, onBlur, value },
            fieldState: { isTouched, error, invalid },
          }) => (
            <InputField
              input={{
                onChange,
                onBlur,
                value,
                disabled: isSubmitting,
                keyboardType: "default",
                maxLength: 35,
                placeholder: "Full Name",
              }}
              meta={{
                error: error?.message,
                touched: isTouched || invalid,
              }}
            />
          )}
        />
        <Controller
          name="phone"
          control={control}
          rules={{
            required: "Address cannot be empty",
          }}
          render={({
            field: { onChange, onBlur, value },
            fieldState: { isTouched, error, invalid },
          }) => (
            <InputField
              input={{
                onChange,
                onBlur,
                value,
                disabled: isSubmitting,
                keyboardType: "numeric",
                returnKeyType: "done",
                maxLength: 20,
                placeholder: "Phone Number",
              }}
              meta={{
                error: error?.message,
                touched: isTouched || invalid,
              }}
            />
          )}
        />
        <Controller
          name="address"
          control={control}
          rules={{
            required: "Phone number cannot be empty",
          }}
          render={({
            field: { onChange, onBlur, value },
            fieldState: { error, isTouched, invalid },
          }) => (
            <InputField
              input={{
                onChange,
                onBlur,
                value,
                disabled: isSubmitting,
                keyboardType: "default",
                maxLength: 50,
                placeholder: "Address",
              }}
              meta={{
                error: error?.message,
                touched: isTouched || invalid,
              }}
            />
          )}
        />
      </View>
    </View>
  );
});

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
