import {
  View,
  StyleSheet,
  Image,
  StatusBar,
  Alert,
  Text,
  Platform,
} from "react-native";
import {
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from "@react-navigation/drawer";
import Colors from "@/utils/Colors";
import CustomText from "@/components/UI/CustomText";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { OpenURL } from "@/utils/Tools";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useProfile } from "@/context/ProfileContext";
import { useAuth } from "@/context/AuthContext";
import { router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

const fbURL = "https://www.facebook.com/daquyankhangthinhvuong/";
const youtubeURL = "https://www.youtube.com/";

export default (props) => {
  const { profile, profileDispatch } = useProfile();
  const { authDispatch } = useAuth();

  const Logout = () => {
    Alert.alert("Log Out", "Are you sure you want to log out?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Agree",
        onPress: async () => {
          await AsyncStorage.removeItem("skipIntro");
          authDispatch({ type: "SIGN_OUT" });
          profileDispatch({ type: "SIGN_OUT" });
          router.navigate("/intro");
        },
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <DrawerContentScrollView {...props}>
        {!profile.id ? (
          <View style={{ alignItems: "center", marginVertical: 20 }}>
            <Image
              style={styles.logo}
              source={require("@/assets/images/logo1.png")}
            />
          </View>
        ) : (
          <>
            <View style={styles.profileContainer}>
              <TouchableOpacity
                onPress={() => router.navigate("/(drawer)/(profile)")}
              >
                <Image
                  style={styles.profilePic}
                  source={
                    profile.profilePicture.length === 0
                      ? require("@/assets/images/defaultprofile.png")
                      : { uri: profile.profilePicture }
                  }
                />
              </TouchableOpacity>
              <View style={{ justifyContent: "center" }}>
                <Text
                  style={{
                    color: Colors.green,
                    fontSize: 18,
                    paddingHorizontal: 10,
                    paddingVertical: 0,
                  }}
                >
                  {profile.name.firstname}
                </Text>
                <Text
                  style={{
                    color: Colors.grey,
                    fontSize: 15,
                    paddingHorizontal: 10,
                  }}
                >
                  See your profile
                </Text>
              </View>
            </View>
          </>
        )}
        <View>
          <DrawerItemList {...props} />
          <View style={styles.social}>
            <OpenURL url={fbURL}>
              <Image
                style={{ resizeMode: "contain", width: 80, height: 80 }}
                source={require("@/assets/images/social1.png")}
              />
            </OpenURL>
            <OpenURL url={youtubeURL}>
              <Image
                style={{ resizeMode: "contain", width: 80, height: 80 }}
                source={require("@/assets/images/social3.png")}
              />
            </OpenURL>
            <OpenURL url={fbURL}>
              <Image
                style={{ resizeMode: "contain", width: 80, height: 80 }}
                source={require("@/assets/images/social2.png")}
              />
            </OpenURL>
          </View>
        </View>
      </DrawerContentScrollView>
      {profile.id && (
        <DrawerItem
          onPress={Logout}
          label={() => (
            <View style={styles.logout}>
              <MaterialCommunityIcons
                name="logout"
                size={25}
                style={{ marginRight: 30 }}
                color={Colors.dark}
              />
              <CustomText
                style={{
                  fontSize: 14,
                  color: Colors.dark,
                  fontWeight: "500",
                  fontFamily: "Roboto-Medium",
                }}
              >
                Sign Out
              </CustomText>
            </View>
          )}
        />
      )}

      <View style={styles.version}>
        <DrawerItem
          onPress={() => {}}
          label={() => (
            <CustomText
              style={{ color: Colors.grey, fontFamily: "Roboto-LightItalic" }}
            >
              e-commerce App Version 1.0
            </CustomText>
          )}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  profileContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 20,
    marginVertical: 20,
  },
  profilePic: {
    resizeMode: Platform.OS === "android" ? "cover" : "contain",
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  logo: {
    resizeMode: "contain",
    width: "80%",
    height: 100,
  },
  logoutSection: {
    backgroundColor: Colors.lighter_green,
    borderRadius: 5,
    marginHorizontal: 10,
    height: 50,
    marginVertical: 20,
  },
  actionButton: {
    flexDirection: "row",
    marginHorizontal: 10,
    height: 40,
    marginBottom: 10,
  },
  social: {
    marginTop: 20,
    marginHorizontal: 10,
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: Colors.grey,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  logout: {
    flexDirection: "row",
    alignItems: "center",
  },
  version: {
    height: 60,
    borderTopWidth: 1,
    borderTopColor: Colors.light_grey,
  },
});
