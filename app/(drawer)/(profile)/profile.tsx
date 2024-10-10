import { useState, useEffect, useRef } from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  Alert,
  Pressable,
  SafeAreaView,
} from "react-native";
import { EditButton, ProfilePic, ProfileBody } from "@/components/Profile";
import { ActionSheetProvider } from "@expo/react-native-action-sheet";
import Loader from "@/components/Loaders/Loader";
import { useProfile } from "@/context/ProfileContext";
import { useNavigation } from "expo-router";
import { DrawerActions } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import Colors from "@/utils/Colors";

const { width, height } = Dimensions.get("window");

export default function ProfileScreen() {
  const navigation = useNavigation();
  const { profile, profileDispatch } = useProfile();
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
        <SafeAreaView style={styles.header}>
          <Pressable
            onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
          >
            <Ionicons
              name="menu-outline"
              size={30}
              color={Colors.lighter_green}
            />
          </Pressable>
        </SafeAreaView>
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
    marginHorizontal: 10,
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
