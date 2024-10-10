import React, { useState, useEffect } from "react";
import { View, StyleSheet, Pressable, SafeAreaView } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
// TODO: replace TouchableOpacity with Pressable
// TODO: remove unused import
import { TextInput, Button } from "react-native-paper";
import Colors from "@/utils/Colors";
import Loader from "@/components/Loaders/Loader";
import { useProfile } from "@/context/ProfileContext";
import { router } from "expo-router";
import { useForm, Controller } from "react-hook-form";
import InputField from "@/components/InputField";

type FormData = {
  phone: string;
  address: string;
};

export default function EditProfileScreen() {
  const { profile, profileDispatch } = useProfile();
  const [disableButton, setDisableBotton] = useState(true);
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
    reset,
    watch,
  } = useForm<FormData>({
    defaultValues: {
      phone: profile.phone,
      address: profile.address.street,
    },
  });
  const watchFields = watch();

  useEffect(() => {
    setDisableBotton(
      watchFields.phone === profile.phone &&
        watchFields.address === profile.address.street
    );
  }, [watchFields]);

  const onSubmit = async (fields: FormData) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      profileDispatch({
        type: "EDIT_PROFILE",
        payload: { phone: fields.phone, street: fields.address },
      });
      router.back();
      reset();
    } catch (err) {
      alert(err);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {profile.loading ? <Loader /> : null}
      <View style={styles.backIcon}>
        <Pressable onPress={() => router.back()}>
          <MaterialCommunityIcons name="arrow-left" size={30} color="black" />
        </Pressable>
      </View>
      <View>
        <View style={styles.infoContainer}>
          <TextInput
            label="Email"
            value={profile.email}
            disabled
            mode="outlined"
            theme={{ colors: { primary: Colors.leave_green } }}
            selectionColor={Colors.leave_green}
            style={{ marginVertical: 10 }}
          />
          <Controller
            name="phone"
            control={control}
            rules={{
              maxLength: 20,
              required: "Phone cannot be blank",
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
                  label: "Phone",
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
              maxLength: 50,
              required: "Address cannot be blank",
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
                  label: "Address",
                  autoCapitalize: "words",
                }}
                meta={{
                  error: error?.message,
                  touched: isTouched || invalid,
                }}
              />
            )}
          />
        </View>
        <View style={styles.button}>
          <Button
            icon="update"
            mode="contained"
            loading={profile.loading || isSubmitting}
            disabled={disableButton}
            onPress={handleSubmit(onSubmit)}
            style={{
              height: 50,
              justifyContent: "center",
              backgroundColor: Colors.leave_green,
              marginHorizontal: 10,
            }}
          >
            Update Your Information
          </Button>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backIcon: {
    marginVertical: 10,
    marginHorizontal: 10,
  },
  infoContainer: {
    paddingHorizontal: 10,
  },
  button: {
    marginTop: 30,
  },
});
