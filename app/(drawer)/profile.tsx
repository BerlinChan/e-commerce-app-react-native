import React, { useState, useEffect, useRef } from "react";
import { View, StyleSheet, Dimensions, Alert } from "react-native";
import {
  EditButton,
  ProfilePic,
  ProfileBody,
} from "@/components/Screens/ProfileScreen/components";
import { ActionSheetProvider } from "@expo/react-native-action-sheet";
import Loader from "@/components/Loaders/Loader";
import { useProfile, useProfileDispatch } from "@/context/ProfileContext";

const { width, height } = Dimensions.get("window");

export default function ProfileScreen() {
  const profile = useProfile();
  const profileDispatch = useProfileDispatch();
  const [imageUri, setImageUri] = useState("");
  const [filename, setFilename] = useState("");
  const [type, setType] = useState("");
  const [uploadButton, setUploadButton] = useState(true);

  // const dispatch = useDispatch();
  const unmounted = useRef(false);
  useEffect(() => {
    return () => {
      unmounted.current = true;
    };
  }, []);
  const UploadProfile = async () => {
    try {
      // await dispatch(UploadProfilePic(imageUri, filename, type));
      setUploadButton(true);
      if (!unmounted.current) {
        Alert.alert("Update", "Update successful", [
          {
            text: "Ok",
          },
        ]);
      }
    } catch (err) {
      alert(err);
    }
  };

  return (
    <ActionSheetProvider>
      <View style={styles.container}>
        <View style={styles.header}></View>
        {profile.loading ? <Loader /> : <></>}
        <View style={styles.profileContainer}>
          <View style={styles.profileBox}>
            <EditButton user={profile} />
            <ProfilePic
              user={profile}
              imageUri={imageUri}
              setImageUri={setImageUri}
              setType={setType}
              setFilename={setFilename}
              setUploadButton={setUploadButton}
            />
            <ProfileBody
              user={profile}
              uploadButton={uploadButton}
              setUploadButton={setUploadButton}
              setImageUri={setImageUri}
              loading={profile.loading}
              UploadProfile={UploadProfile}
            />
          </View>
        </View>
      </View>
    </ActionSheetProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    width,
    flexDirection: "row",
    height: 0.15 * height,
    justifyContent: "center",
  },
  profileContainer: {
    width,
    justifyContent: "center",
    alignItems: "center",
  },
  profileBox: {
    backgroundColor: "#fff",
    borderRadius: 20,
    width,
    alignItems: "center",
  },
});
