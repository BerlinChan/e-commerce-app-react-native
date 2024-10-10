import React from "react";
import { View, StyleSheet } from "react-native";
import CustomText from "@/components/UI/CustomText";
import UploadButton from "./UploadButton";
import Detail from "./Detail";
import { StateType as ProfileStateType } from "@/context/ProfileContext";

type Props = {
  user: ProfileStateType;
  uploadButton?: boolean;
  setUploadButton: React.Dispatch<React.SetStateAction<boolean>>;
  setImageUri: React.Dispatch<React.SetStateAction<string>>;
  UploadProfile: () => Promise<void>;
};

export const ProfileBody = ({
  user,
  uploadButton,
  setUploadButton,
  setImageUri,
  UploadProfile,
}: Props) => {
  return (
    <View style={styles.footer}>
      <View style={styles.titleContainer}>
        <CustomText style={styles.title}>Personal information</CustomText>
      </View>
      <Detail
        icon="person"
        content={`${user.name.firstname} ${user.name.lastname}`}
      />
      <Detail icon="email-outline" content={user.email} />
      <Detail
        icon="phone"
        content={user.phone.length === 0 ? "Not added yet" : user.phone}
      />
      <Detail
        icon="location-on"
        content={!user.address.street ? "Not added yet" : user.address.street}
      />
      <UploadButton
        uploadButton={uploadButton}
        setUploadButton={setUploadButton}
        setImageUri={setImageUri}
        UploadProfile={UploadProfile}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  footer: {
    width: "100%",
    marginTop: 20,
    paddingHorizontal: 20,
  },
  titleContainer: {
    height: 30,
  },

  title: {
    fontWeight: "600",
    textTransform: "uppercase",
  },
});
