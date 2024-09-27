import { useState } from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Keyboard,
  TouchableWithoutFeedback,
  ActivityIndicator,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  Image,
  Alert,
  Dimensions,
} from "react-native";
//Colors
import Colors from "@/utils/Colors";
import CustomText from "@/components/UI/CustomText";
import InputField from "@/components/InputField";
//Authentiation Touch ID Face ID
import * as LocalAuthentication from "expo-local-authentication";
import * as SecureStore from "expo-secure-store";
import { secretKey } from "@/utils/Config";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { API_URL } from "@/utils/Config";
import { timeoutPromise } from "@/utils/Tools";
import { useAuth } from "@/context/AuthContext";
import { useProfile } from "@/context/ProfileContext";
import { router } from "expo-router";

const { height } = Dimensions.get("window");

type FormType = { username: string; password: string };

export const SignInForm: React.FC = () => {
  const {
    control,
    handleSubmit,
    formState: { errors, touchedFields, isLoading },
    reset,
  } = useForm<FormType>({
    defaultValues: {
      username: "johnd",
      password: "m38rmF$",
    },
  });
  const [showPass, setShowPass] = useState(false);
  const { authDispatch } = useAuth();
  const { profileDispatch } = useProfile();

  const scanFingerprintOrFaceId = async () => {
    const resData = await SecureStore.getItemAsync(secretKey);
    if (resData === null) {
      return alert("You have to enable LOGIN by touch/face ID");
    }
    const result = await LocalAuthentication.authenticateAsync({
      promptMessage: "Authenticating",
    });
    if (result.success) {
      const data = await JSON.parse(resData);
      // dispatch(LoginAction(data.email, data.password));
    }
  };

  const showAndroidAlert = () => {
    Alert.alert(
      "Fingerprint Scan",
      "Place your finger over the touch sensor and press scan.",
      [
        {
          text: "Scan",
          onPress: () => {
            scanFingerprintOrFaceId();
          },
        },
        {
          text: "Cancel",
          onPress: () => console.log("Cancel"),
          style: "cancel",
        },
      ]
    );
  };

  const onSubmit: SubmitHandler<FormType> = async ({ username, password }) => {
    try {
      const responseSignIn = await timeoutPromise(
        fetch(`${API_URL}/auth/login`, {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          method: "POST",
          body: JSON.stringify({
            username,
            password,
          }),
        })
      );
      if (!responseSignIn.ok) {
        const errorResData = await responseSignIn.json();
        throw new Error(errorResData.err);
      }
      const resToken = await responseSignIn.json();
      authDispatch({ type: "setToken", token: resToken.token });

      const responseProfile = await timeoutPromise(
        fetch(`${API_URL}/users/1`, {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "auth-token": resToken.token,
          },
          method: "GET",
        })
      );
      if (!responseProfile.ok) {
        const errorResData = await responseProfile.json();
        throw new Error(errorResData.err);
      }
      const resProfile = await responseProfile.json();
      profileDispatch({ type: "SET_PROFILE", profile: resProfile });

      reset();
      router.navigate("/(drawer)/(tabs)");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS == "ios" ? "position" : "height"}
    >
      <View style={styles.header}>
        <View>
          <CustomText style={styles.title}>Sign In</CustomText>
        </View>
      </View>
      <ScrollView>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View
            style={{
              flexDirection: "column",
              marginHorizontal: 10,
              zIndex: -1,
            }}
          >
            <View>
              <Controller
                name="username"
                control={control}
                rules={{
                  required: "Username must not be empty",
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <InputField
                    keyboardType="default"
                    label="Username"
                    icon="account"
                    input={{ onBlur, onChange, value }}
                    meta={{
                      error: errors.username?.message,
                      touched: touchedFields.username,
                    }}
                  />
                )}
              />

              <Controller
                name="password"
                control={control}
                rules={{
                  min: {
                    value: 6,
                    message: "Password must be 6 characters or more",
                  },
                  maxLength: 100,
                  required: "Password must not be empty",
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <InputField
                    keyboardType="default"
                    label="Password"
                    secureTextEntry={showPass ? false : true}
                    passIcon="eye"
                    icon="lock"
                    showPass={showPass}
                    setShowPass={setShowPass}
                    input={{ onBlur, onChange, value }}
                    meta={{
                      error: errors.password?.message,
                      touched: touchedFields.password,
                    }}
                  />
                )}
              />
            </View>
            <View style={styles.group}>
              <TouchableOpacity
                onPress={() => {
                  router.navigate("/forgetPw");
                }}
              >
                <CustomText
                  style={{
                    ...styles.textSignSmall,
                    fontFamily: "Roboto-Medium",
                  }}
                >
                  Forget Password ?
                </CustomText>
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              onPress={handleSubmit(onSubmit)}
              style={{ marginVertical: 10, alignItems: "center" }}
            >
              <View style={styles.signIn}>
                {isLoading ? (
                  <ActivityIndicator size="small" color="#fff" />
                ) : (
                  <CustomText style={styles.textSign}>Log in</CustomText>
                )}
              </View>
            </TouchableOpacity>
          </View>
        </TouchableWithoutFeedback>
        <View style={styles.center}>
          <CustomText style={styles.loginOpt}>
            Or login with face/fingerprint
          </CustomText>
          <View style={styles.circleImage}>
            <TouchableOpacity
              onPress={
                Platform.OS === "android"
                  ? showAndroidAlert
                  : scanFingerprintOrFaceId
              }
            >
              <Image
                source={require("@/assets/images/faceid.png")}
                style={styles.faceid}
              />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  group: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginVertical: 10,
  },
  header: {
    marginTop: height * 0.2,
    marginBottom: 10,
    marginHorizontal: 20,
  },
  title: {
    color: Colors.light_green,
    fontSize: 40,
    letterSpacing: 5,
    fontFamily: "Roboto-Bold",
    textAlign: "center",
  },
  text: {
    color: "#fff",
  },
  signIn: {
    width: "100%",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    flexDirection: "row",
    backgroundColor: Colors.lighter_green,
  },
  textSign: {
    fontSize: 15,
    color: "#fff",
    fontFamily: "Roboto-Medium",
  },
  textSignSmall: {
    color: Colors.lighter_green,
    textAlign: "center",
  },
  center: {
    alignItems: "center",
  },
  circleImage: {
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    padding: 20,
    borderRadius: 55,
    borderStyle: "dashed",
    borderColor: Colors.grey,
  },
  faceid: {
    resizeMode: "contain",
    height: 70,
    width: 70,
  },
  loginOpt: {
    color: Colors.lighter_green,
    fontFamily: "Roboto-Medium",
    marginBottom: 10,
  },
});
