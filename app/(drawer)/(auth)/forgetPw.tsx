import {
  View,
  StyleSheet,
  SafeAreaView,
  Pressable,
  ActivityIndicator,
} from "react-native";
import CustomText from "@/components/UI/CustomText";
import ForgetRenderField from "@/components/ForgetPassword/ForgetRenderField";
//Colors
import Colors from "@/utils/Colors";
//Icon
import { Feather } from "@expo/vector-icons";
import { useAuth } from "@/context/AuthContext";
import { useForm, Controller } from "react-hook-form";
import { router } from "expo-router";

type FormData = {
  email: string;
};

export default function ForgetPwScreen() {
  const {
    control,
    handleSubmit,
    // TODO: use isSubmitting to forms
    formState: { isSubmitting },
    reset,
  } = useForm<FormData>({
    defaultValues: {
      email: "",
    },
  });
  const { auth, authDispatch } = useAuth();

  const submit = async ({ email }: FormData) => {
    try {
      authDispatch({ type: "SET_LOADING", loading: true });
      await new Promise((resolve) => setTimeout(resolve, 1000));
      // TODO: correct history stack
      router.replace(`/(auth)/finishReset?email=${email}`);
    } catch (err) {
      alert(err);
    } finally {
      authDispatch({ type: "SET_LOADING", loading: false });
      reset();
    }
  };

  // TODO: uniform the usage of back arrow icon
  return (
    <SafeAreaView style={styles.container}>
      <Pressable
        onPress={() => {
          router.back();
        }}
        style={{ position: "absolute", top: 30, left: 20 }}
      >
        <Feather name="arrow-left" size={30} color={Colors.lighter_green} />
      </Pressable>
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
              icon="email"
              input={{
                onBlur,
                onChange,
                value,
                disabled: isSubmitting,
                keyboardType: "email-address",
                placeholder: "Email",
              }}
              meta={{
                error: error?.message,
                touched: isTouched,
              }}
            />
          )}
        />
        <Pressable
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
        </Pressable>
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
