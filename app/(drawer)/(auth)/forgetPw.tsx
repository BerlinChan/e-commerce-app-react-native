import React, { useRef, useEffect } from "react";
import {
  View,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import CustomText from "@/components/UI/CustomText";
import ForgetRenderField from "@/components/ForgetPassword/ForgetRenderField";
//Colors
import Colors from "@/utils/Colors";
//Icon
import { Feather } from "@expo/vector-icons";
import { useAuth } from "@/context/AuthContext";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { router } from "expo-router";

type FormType = {
  email: string;
};
export default function ForgetPwScreen(props) {
  const {
    control,
    handleSubmit,
    formState: { isLoading },
    reset,
  } = useForm<FormType>({
    defaultValues: {
      email: "anonymousUser@mail.com",
    },
  });
  const { auth, authDispatch } = useAuth();
  // const dispatch = useDispatch();

  const submit = async (values) => {
    try {
      // await authDispatch(ForgetPassword(values.email));
      props.navigation.navigate("FinishResetScreen", {
        value: values,
      });
    } catch (err) {
      alert(err);
    }
  };

  // TODO: uniform the usage of back arrow icon
  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity
        onPress={() => {
          router.back();
        }}
        style={{ position: "absolute", top: 30, left: 20 }}
      >
        <Feather name="arrow-left" size={30} color={Colors.lighter_green} />
      </TouchableOpacity>
      <View style={styles.content}>
        <CustomText style={styles.title}> Forget Password </CustomText>
        <Controller
          name="email"
          control={control}
          rules={{
            required: "Email cannot be empty",
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
              message: "Invalid email",
            },
          }}
          render={({
            field: { onChange, onBlur, value },
            fieldState: { error, isTouched },
          }) => (
            <ForgetRenderField
              keyboardType="email-address"
              label="Email"
              icon="email"
              input={{ onBlur, onChange, value }}
              meta={{
                error: error?.message,
                touched: isTouched,
              }}
            />
          )}
        />
        <TouchableOpacity
          onPress={handleSubmit(submit)}
          style={{ marginVertical: 10, alignItems: "center" }}
        >
          <View style={styles.signIn}>
            {auth.loading ? (
              <ActivityIndicator size="small" color="#fff" />
            ) : (
              <CustomText style={styles.textSign}>NEXT</CustomText>
            )}
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  content: {
    marginTop: "20%",
    height: 300,
    paddingHorizontal: 20,
  },
  title: {
    color: Colors.lighter_green,
    fontSize: 30,
  },
  signIn: {
    width: "100%",
    height: 45,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    flexDirection: "row",
    marginBottom: 10,
    backgroundColor: Colors.lighter_green,
  },
  textSign: {
    fontSize: 15,
    color: "#fff",
    fontWeight: "500",
  },
});
