import React, { useEffect, useState } from "react";
import { View, StyleSheet, Switch, Image } from "react-native";
import Colors from "@/utils/Colors";
import CustomText from "@/components/UI/CustomText";
import userMessages from "@/messages/user";
//Authentiation Touch ID Face ID
import * as LocalAuthentication from "expo-local-authentication";
import * as SecureStore from "expo-secure-store";
import { secretKey } from "@/utils/Config";
import { useProfile } from "@/context/ProfileContext";

export const AuthBody = () => {
  const [isEnabled, setIsEnabled] = useState(false);
  const [isSupport, setIsSupport] = useState(false);
  const profile = useProfile();
  const switchHandler = async () => {
    setIsEnabled((previousState) => !previousState);
    if (!isEnabled) {
      await SecureStore.setItemAsync(
        secretKey,
        JSON.stringify({
          email: profile.email,
          password: profile.password,
        })
      );
    } else {
      await SecureStore.deleteItemAsync(secretKey);
    }
  };
  const getData = async () => {
    const resData = await SecureStore.getItemAsync(secretKey);
    const data = await JSON.parse(resData);
    if (resData === null) {
      return;
    } else if (data.email !== user.email) {
      await SecureStore.deleteItemAsync(secretKey);
      return setIsEnabled(false);
    }
    setIsEnabled(true);
  };

  useEffect(() => {
    checkDeviceForHardware();
    checkForFingerprints();
    getData();
  }, [profile.id]);
  const checkDeviceForHardware = async () => {
    let compatible = await LocalAuthentication.hasHardwareAsync();
    setIsSupport(compatible);
  };
  const checkForFingerprints = async () => {
    let fingerprints = await LocalAuthentication.isEnrolledAsync();
    setIsSupport(fingerprints);
  };

  return (
    <View style={styles.container}>
      {!isSupport ? (
        <CustomText style={styles.error}>
          {userMessages["user.touchid.fail"]}!
        </CustomText>
      ) : (
        <></>
      )}
      <View style={styles.circleImage}>
        <Image
          source={require("@/assets/images/faceid.png")}
          style={styles.faceid}
        />
      </View>
      <View style={styles.contentContainer}>
        <CustomText style={styles.text}>
          Unlock with fingerprint or face
        </CustomText>
        <Switch
          trackColor={{ false: "#767577", true: "#60c46b" }}
          thumbColor={isEnabled ? Colors.white : "#f4f3f4"}
          ios_backgroundColor="#3e3e3e"
          onValueChange={switchHandler}
          value={isEnabled}
          disabled={!isSupport}
        />
      </View>
    </View>
  );
};

AuthBody.propTypes = {};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    marginVertical: 20,
    alignItems: "center",
  },
  contentContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 20,
  },
  error: {
    marginVertical: 10,
    color: "red",
    fontFamily: "Roboto-Medium",
    fontSize: 15,
  },
  circleImage: {
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    padding: 20,
    borderRadius: 70,
    borderStyle: "dashed",
    borderColor: Colors.grey,
  },
  faceid: {
    resizeMode: "contain",
    height: 100,
    width: 100,
  },
  text: {
    fontFamily: "Roboto-Medium",
    fontSize: 15,
    color: Colors.lighter_green,
  },
});
